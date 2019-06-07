import React from "react";
import PropTypes from "prop-types";
import Spinner from "../Spinner/Spinner";

const SubmitButton = ({ label, onClick, isLoading }) => {
  return (
    <>
      <input
        disabled={isLoading}
        type="submit"
        value={label}
        class="btn btn-primary"
      />{" "}
      {isLoading && <Spinner />}
    </>
  );
};

SubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

SubmitButton.defaultProps = {
  isLoading: false
};
export default SubmitButton;
