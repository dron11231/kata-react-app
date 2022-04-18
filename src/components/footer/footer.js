import React from "react";

import TasksFilter from "../tasks-filter/tasks-filter";
import "./footer.css";

const Footer = function ({ setVisibility, clearCompleted, todos }) {
  let activeTaskCount = 0;
  todos.forEach((el) => {
    if (el.status === "active") {
      activeTaskCount++;
    }
  });
  return (
    <footer className="footer">
      <span className="todo-count">{activeTaskCount} items left</span>
      <TasksFilter setVisibility={setVisibility} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
