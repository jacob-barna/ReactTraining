import React, { Component } from "react";

class ManageCourse extends Component {
  state = {
    course: {
      title: "",
      authorId: null,
      category: ""
    }
  };

  handleChange = ({ target }) => {
    const course = {
      ...this.state.course,
      [target.name]: target.value
    };

    this.setState({
      course
    });
  };

  handleSubmit = event => {};

  render() {
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

export default ManageCourse;
