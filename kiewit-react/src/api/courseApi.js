import { handleResponse } from "./apiUtils";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function getCourses() {
  try {
    const response = await fetch(`${BASE_URL}courses`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }

  //   .then(handleResponse)
  // .catch(handleError);
}

export async function deleteCourse(courseID) {
  try {
    const response = await fetch(`${BASE_URL}courses/${courseID}`, {
      method: "DELETE"
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }

  // .then(handleResponse)
  // .catch(handleError);
}

export function handleError(error) {
  console.error("API call failed." + error);
  //let caller know that something went wrong
  throw error;
}
