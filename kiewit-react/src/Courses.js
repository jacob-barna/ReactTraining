import React from "react";

import { Link } from "react-router-dom";

//function component - React components should start with a capital letter
//this is a convention of the framework - it looks for components when caps used
class Courses extends React.Component {
  componentDidMount() {
    this.props.loadCourses();
  }

  render() {
    return (
      <>
        <h1>Courses</h1>
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
            {this.props.courses.map(c => (
              <tr key={c.id}>
                <td>
                  <button onClick={() => this.props.deleteCourse(c.id)}>
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
