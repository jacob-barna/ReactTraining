import React from "react";

//function component - React components should start with a capital letter
//this is a convention of the framework - it looks for components when caps used
function App() {
  const courses = [
    { id: 1, title: "Clean Code" },
    { id: 2, title: "React Fundamentals" }
  ];
  return (
    <>
      <h1>Courses</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

//convention of react to export default
export default App;
