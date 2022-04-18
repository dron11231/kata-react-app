import React from "react";

import "./new-task-form.css";

export default class NewTaskForm extends React.Component {
  state = {
    text: "",
  };

  onToggleText = (e) => {
    this.setState(() => {
      return {
        text: e.target.value,
      };
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTask(this.state.text);
    this.setState(() => {
      return {
        text: "",
      };
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onToggleText}
          value={this.state.text}
        />
      </form>
    );
  }
}
