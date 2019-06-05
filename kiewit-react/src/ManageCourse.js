import React, { Component } from "react";
import { saveCourse } from "./api/courseApi";
import { Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import { course } from "./propTypes";

class ManageCourse extends Component {
  state = {
    course: {
      title: "",
      authorId: null,
      category: ""
    },
    redirectToCoursesPage: false
  };

  handleChange = ({ target }) => {
    const course = {
      ...this.state.course,
      [target.name]: target.name === "authorId" ? +target.value : target.value
    };

    this.setState({
      course
    });
  };

  handleSubmit = event => {
    event.preventDefault(); //no reload
    saveCourse(this.state.course).then(() => {
      //save complete
      this.setState({ redirectToCoursesPage: true });
    });
  };

  render() {
    if (this.state.redirectToCoursesPage) {
      return <Redirect to="courses" />;
    }

    return (
      <>
        <h1>Manage Course</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <br />
            <input
              id="title"
              onChange={this.handleChange}
              name="title"
              type="text"
              value={this.state.course.title}
            />
          </div>
          <div>
            <label htmlFor="authorId">Author Id</label>
            <br />
            <input
              id="authorId"
              onChange={this.handleChange}
              name="authorId"
              type="text"
              value={this.state.course.authorId || ""}
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <br />
            <input
              id="category"
              onChange={this.handleChange}
              name="category"
              type="text"
              value={this.state.course.category}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Save" />
        </form>
      </>
    );
  }
}

ManageCourse.propTypes = {
  courses: PropTypes.arrayOf(course).isRequired,
  loadCourses: PropTypes.func.isRequired
};
export default ManageCourse;
