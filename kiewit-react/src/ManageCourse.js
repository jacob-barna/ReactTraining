import React, { useState, useEffect } from "react";
import { saveCourse } from "./api/courseApi";
import { Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import TextInput from "./shared/TextInput";
import { course } from "./propTypes";
import { toast } from "react-toastify";
import Spinner from "./shared/Spinner/Spinner";
import SubmitButton from "./shared/SubmitButton";
// Hoist funcs that don't need props or state outside of your functions.
// https://overreacted.io/a-complete-guide-to-useeffect/#tldr
function getCourseBySlug(courses, slug) {
  const course = courses.find(course => course.slug === slug);
  return course;
}

function ManageCourse({ courses, loadCourses, match, history }) {
  const [course, setCourse] = useState({
    title: "",
    authorId: null,
    category: ""
  });

  const [isLoading, setIsLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [redirectToCoursesPage, setRedirectToCoursesPage] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const { slug } = match.params;
    if (slug) {
      if (courses.length === 0) {
        loadCourses().then(_courses => {
          const course = getCourseBySlug(_courses, slug);
          setIsLoading(false);
          course ? setCourse(course) : history.push("/404");
        });
      } else {
        const course = getCourseBySlug(courses, slug);
        setIsLoading(false);
        course ? setCourse(course) : history.push("/404");
      }
    } else {
      setIsLoading(false);
    }
  }, [courses, history, loadCourses, match.params]);
  // useEffect(() => {
  //   //tslint:disable-next-line
  //   // async function load() {
  //   //   console.log(errors.title);
  //   const slug = match.params.slug;

  //   //   if (slug) {
  //   //     if (courses.length === 0) {
  //   //       const theCourses = await loadCourses();
  //   //       const course = theCourses.find(course => course.slug === slug);
  //   //       setCourse(course);
  //   //     } else {
  //   //       const course = courses.find(course => course.slug === slug);
  //   //       setCourse(course);
  //   //     }
  //   //   }
  //   // }

  //   // load();

  //   //  if (slug) {
  //   if (courses.length === 0) {
  //     loadCourses().then(theCourses => {
  //       const course = theCourses.find(course => course.slug === slug);
  //       course ? setCourse(course) : history.push("/404");
  //     });
  //     //  }
  //   } else {
  //     const course = courses.find(course => course.slug === slug);
  //     course ? setCourse(course) : history.push("/404");
  //   }
  // }, [courses, history, loadCourses, match.params]);

  function handleChange({ target }) {
    const theCourse = {
      ...course,
      [target.name]: target.name === "authorId" ? +target.value : target.value
    };
    setCourse(theCourse);
  }

  function isValid() {
    const _errors = {};
    if (!course.title) _errors.title = "Title required.";
    if (!course.authorId) _errors.authorId = "authorId required.";
    if (!course.category) _errors.category = "category required.";

    setErrors(_errors);
    console.log(errors.title);
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault(); //no reload
    if (!isValid()) return;
    setFormSubmitted(true);

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

  if (isLoading) {
    return <Spinner />;
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
          error={errors.title}
        />

        <TextInput
          label="Author ID"
          id="authorId"
          name="authorId"
          onChange={handleChange}
          value={course.authorId}
          error={errors.authorId}
        />

        <TextInput
          label="Category"
          id="category"
          name="category"
          onChange={handleChange}
          value={course.category}
          error={errors.category}
        />

        {/* <div>
          <label htmlFor="authorId">Author Id</label>
          <br />
          <input
            id="authorId"
            onChange={handleChange}
            name="authorId"
            type="text"
            value={course.authorId || ""}
            errors={errors.authorId}
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
            errors={errors.category}
          />
        </div> */}
        <SubmitButton value="Save" isLoading={formSubmitted} />
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
