import React from "react";
import useFormValidation from "../Auth/useFormValidation";
import validateCreateLink from "../Auth/validateCreateLink";

const INITIAL_STATE = {
  description: "",
  url: ""
};

function CreateLink(props) {
  const { handleSubmit, handleChange, values, errors } = useFormValidation(
    INITIAL_STATE,
    validateCreateLink,
    handleCreateLink
  );

  function handleCreateLink() {
    console.log("link created");
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-column mt-3">
      <input
        name="description"
        onChange={handleChange}
        value={values.description}
        placeholder="A description for your link"
        autoComplete="off"
        type="text"
        className={errors.description && "error-input"}
      />
      {errors.description && <p className="error-text">{errors.description}</p>}
      <input
        name="url"
        onChange={handleChange}
        value={values.url}
        placeholder="The URL for the link"
        autoComplete="off"
        type="text"
        className={errors.url && "error-input"}
      />
      {errors.url && <p className="error-text">{errors.url}</p>}
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
}

export default CreateLink;
