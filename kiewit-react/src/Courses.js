import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { course } from "./propTypes";
import Spinner from "./shared/Spinner/Spinner";

//function component - React components should start with a capital letter
//this is a convention of the framework - it looks for components when caps used
function Courses({ courses, loadCourses, deleteCourse }) {
  useEffect(() => {
    if (courses.length === 0) loadCourses();
  }, [courses.length, loadCourses]);

  return (
    <>
      <h1>Courses</h1>{" "}
      <Link to="course" className="btn btn-primary">
        Add Course
      </Link>
      {courses.length < 1 && <Spinner />}
      {courses.length > 0 && (
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
            {courses.map(c => (
              <tr key={c.id}>
                <td>
                  <button onClick={() => deleteCourse(c.id)}>Delete</button>
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
      )}
    </>
  );
}

Courses.propTypes = {
  courses: PropTypes.arrayOf(course).isRequired,
  loadCourses: PropTypes.func.isRequired
};
//convention of react to export default
export default Courses;
