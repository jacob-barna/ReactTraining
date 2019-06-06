import React, { useState } from "react";
import Home from "./Home";
import Nav from "./Nav";
import Courses from "./Courses";
import { Route, Switch } from "react-router-dom";
import ManageCourse from "./ManageCourse";
import * as api from "./api/courseApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  //we can send a list of courses and a setter to the child components
  const [courses, setCourses] = useState([]);

  async function loadCourses() {
    return api
      .getCourses()
      .then(courses => {
        setCourses(courses);
        return courses;
      })
      .catch(() => {
        toast.error("🦄🦄 Something bad happened 🦄🦄");
      });
  }

  async function deleteCourse(id) {
    try {
      await api.deleteCourse(id);

      //this.setState({
      setCourses(courses.filter(course => course.id !== id));
      toast.success("Delete successful");
      // });
    } catch (error) {
      toast.error("🦄🦄 Something bad happened 🦄🦄");
    }
  }

  return (
    <>
      <ToastContainer />
      <Nav />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route
          path="/courses"
          render={props => (
            <Courses
              loadCourses={loadCourses}
              deleteCourse={deleteCourse}
              courses={courses}
              {...props}
            />
          )}
        />
        <Route
          path="/course/:slug"
          //<!-- render props pattern -->
          render={props => (
            <ManageCourse
              {...props}
              loadCourses={loadCourses}
              courses={courses}
            />
          )}
        />
        <Route
          path="/course"
          //<!-- render props pattern -->
          render={props => (
            <ManageCourse
              {...props}
              loadCourses={loadCourses}
              courses={courses}
            />
          )}
        />
      </Switch>
    </>
  );
};

export default App;
