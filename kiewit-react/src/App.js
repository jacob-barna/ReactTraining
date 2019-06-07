import React, { useState } from "react";
import Home from "./Home";
import Nav from "./Nav";
//import Courses from "./Courses";
import { Route, Switch } from "react-router-dom";
import ManageCourse from "./ManageCourse";
import * as api from "./api/courseApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "./UserContext";
import PageNotFound from "./PageNotFound";
import Spinner from "./shared/Spinner/Spinner";
const Courses = React.lazy(() => import("./Courses"));

const App = () => {
  const userState = useState({
    id: 1,
    email: "jake@jake.com"
  });

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
      setCourses(courses.filter(course => course.id !== id));
      toast.success("Delete successful");
      await api.deleteCourse(id);
    } catch (error) {
      toast.error("🦄🦄 Something bad happened 🦄🦄");
    }
  }

  return (
    <>
      <UserContext.Provider value={userState}>
        <ToastContainer />
        <Nav />
        <React.Suspense fallback={Spinner}>
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
              path="/course/:slug?"
              //<!-- render props pattern -->
              render={props => (
                <ManageCourse
                  {...props}
                  loadCourses={loadCourses}
                  courses={courses}
                />
              )}
            />
            <Route path="/404" component={PageNotFound} />
            <Route component={PageNotFound} />
          </Switch>
        </React.Suspense>
      </UserContext.Provider>
    </>
  );
};

export default App;
