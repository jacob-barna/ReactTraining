import React from "react";
import * as api from "./api/courseApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

//function component - React components should start with a capital letter
//this is a convention of the framework - it looks for components when caps used
class Courses extends React.Component {
  //experimental - can use with babel until part of ecmascript
  // this can replace the constructor
  // state = {
  //   courses: [
  //     {id: 1, title: 'clean'} ///etc...
  //   ]
  // };

  constructor(props) {
    //props -> like args
    super(props);

    this.state = {
      courses: []
    };
  }

  componentDidMount() {
    api
      .getCourses()
      .then(courses => this.setState({ courses }))
      .catch(() => {
        toast.error("🦄🦄 Something bad happened 🦄🦄");
      });
    //setState({courses: api.getCourses()})
  }

  async deleteCourse(id) {
    try {
      await api.deleteCourse(id);

      //      .then(() => {
      this.setState({
        courses: this.state.courses.filter(course => course.id !== id)
      });
    } catch (error) {
      toast.error("🦄🦄 Something bad happened 🦄🦄");
    }

    //    })
    //.catch(() => toast.error("🦄🦄 Something bad happened 🦄🦄")); //.then(response => alert(response));
  }

  render() {
    return (
      <>
        <h1>Courses</h1>
        <ToastContainer />
        <table className="table">
          <thead>
            <tr>
              <th />
              <th>Id</th>
              <th>Title</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {this.state.courses.map(c => (
              <tr key={c.id}>
                <td>
                  <button onClick={() => this.deleteCourse(c.id)}>
                    Delete
                  </button>
                </td>
                <td>{c.id}</td>
                <td>
                  <Link to={`/course/${c.slug}`}>{c.title}</Link>{" "}
                </td>
                <td>{c.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

//convention of react to export default
export default Courses;
