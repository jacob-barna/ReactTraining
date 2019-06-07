import React from "react";
import PropTypes from "prop-types";
import styles from "./TextInput.module.scss";

const TextInput = ({ id, label, name, onChange, value, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <br />
      <input
        id={id}
        type="text"
        name={name}
        onChange={onChange}
        value={value}
      />
      {error && (
        <div role="alert" className={styles.error}>
          {error}
        </div>
      )}
    </div>
  );
};
TextInput.propTypes = {
  /** The HTML ID */
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default TextInput;
