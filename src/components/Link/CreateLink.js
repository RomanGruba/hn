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
    <form className="flex flex-column mt-3">
      <input
        name="description"
        placeholder="A description for your link"
        autoComplete="off"
        type="text"
      />
      <input
        name="url"
        placeholder="The URL for the link"
        autoComplete="off"
        type="text"
      />
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
}

export default CreateLink;
