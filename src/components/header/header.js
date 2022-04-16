import React from "react";

import NewTaskForm from "../new-task-form/new-task-form";

const Header = function (props) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm />
    </header>
  );
};

export default Header;
