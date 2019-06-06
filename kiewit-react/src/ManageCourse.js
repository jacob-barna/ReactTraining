import React, { useState, useEffect } from "react";
import { saveCourse } from "./api/courseApi";
import { Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import TextInput from "./TextInput";
import { course } from "./propTypes";
import { toast } from "react-toastify";

function ManageCourse({ courses, loadCourses, match }) {
  const [course, setCourse] = useState({
    title: "",
    authorId: null,
    category: ""
  });

  const [redirectToCoursesPage, setRedirectToCoursesPage] = useState(false);

  useEffect(() => {
    //tslint:disable-next-line
    async function load() {
      const slug = match.params.slug;

      if (slug) {
        if (courses.length === 0) {
          const theCourses = await loadCourses();
          const course = theCourses.find(course => course.slug === slug);
          setCourse(course);
        } else {
          const course = courses.find(course => course.slug === slug);
          setCourse(course);
        }
      }
    }

    load();
  }, [courses, loadCourses, match.params]);

  function handleChange({ target }) {
    const theCourse = {
      ...course,
      [target.name]: target.name === "authorId" ? +target.value : target.value
    };
    setCourse(theCourse);
  }

  function handleSubmit(event) {
    event.preventDefault(); //no reload
    saveCourse(course).then(() => {
      //load courses again so that the saved record is reflected on the courses page
      loadCourses().then(() => {
        //save complete
        toast.success("Save complete.");
        setRedirectToCoursesPage({ redirectToCoursesPage: true });
      });
    });
  }

  if (redirectToCoursesPage) {
    return <Redirect to="/courses" />;
  }

  return (
    <>
      <h1>Manage Course</h1>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label htmlFor="title">Title</label>
          <br />
          <input
            id="title"
            onChange={handleChange}
            name="title"
            type="text"
            value={course.title}
          />
        </div> */}

        <TextInput
          label="Title"
          id="title"
          name="title"
          onChange={handleChange}
          value={course.title}
        />

        <div>
          <label htmlFor="authorId">Author Id</label>
          <br />
          <input
            id="authorId"
            onChange={handleChange}
            name="authorId"
            type="text"
            value={course.authorId || ""}
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <br />
          <input
            id="category"
            onChange={handleChange}
            name="category"
            type="text"
            value={course.category}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Save" />
      </form>
    </>
  );
}

// class ManageCourse extends Component {
//   handleChange = ({ target }) => {
//     const course = {
//       ...this.state.course,
//       [target.name]: target.name === "authorId" ? +target.value : target.value
//     };

//     this.setState({
//       course
//     });
//   };

//   render() {
//     if (this.state.redirectToCoursesPage) {
//       return <Redirect to="/courses" />;
//     }

//     return (
//       <>
//         <h1>Manage Course</h1>
//         <form onSubmit={this.handleSubmit}>
//           <div>
//             <label htmlFor="title">Title</label>
//             <br />
//             <input
//               id="title"
//               onChange={this.handleChange}
//               name="title"
//               type="text"
//               value={this.state.course.title}
//             />
//           </div>
//           <div>
//             <label htmlFor="authorId">Author Id</label>
//             <br />
//             <input
//               id="authorId"
//               onChange={this.handleChange}
//               name="authorId"
//               type="text"
//               value={this.state.course.authorId || ""}
//             />
//           </div>
//           <div>
//             <label htmlFor="category">Category</label>
//             <br />
//             <input
//               id="category"
//               onChange={this.handleChange}
//               name="category"
//               type="text"
//               value={this.state.course.category}
//             />
//           </div>
//           <input type="submit" className="btn btn-primary" value="Save" />
//         </form>
//       </>
//     );
//   }
// }

ManageCourse.propTypes = {
  courses: PropTypes.arrayOf(course).isRequired,
  loadCourses: PropTypes.func.isRequired
};

export default ManageCourse;
