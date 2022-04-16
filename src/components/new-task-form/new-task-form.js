import React from "react";

import "./new-task-form.css";

const NewTaskForm = function () {
  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus
    />
  );
};

export default NewTaskForm;
