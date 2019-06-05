import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//render into the root div on index.html
//with most apps you give the top level component here and you only do this once
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
