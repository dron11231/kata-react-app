import React from "react";

import Header from "../header/header";
import TaskList from "../task-list/task-list";
import Footer from "../footer/footer";
import "./todo-app.css";

export default class TodoApp extends React.Component {
  state = {
    taskList: [
      { text: "Completed task", status: "active", id: 1 },
      { text: "Active task", status: "active", id: 2 },
    ],
  };

  deleteHandler = (id) => {
    this.setState((state) => {
      const newArr = [...state.taskList];
      const idx = newArr.findIndex((el) => el.id === id);
      newArr.splice(idx, 1);
      return {
        taskList: newArr,
      };
    });
  };

  editHandler = (id, text) => {
    this.setState((state) => {
      const newArr = [...state.taskList];
      const idx = newArr.findIndex((el) => el.id === id);
      newArr[idx].text = text;
      return {
        taskList: newArr,
      };
    });
  };

  statusHandler = (id, checkboxState, status) => {
    this.setState((state) => {
      const newArr = [...state.taskList];
      const idx = newArr.findIndex((el) => el.id === id);

      if (status) {
        newArr[idx].status = status;
      } else {
        if (checkboxState) {
          newArr[idx].status = "completed";
        } else {
          newArr[idx].status = "active";
        }
      }
      return {
        taskList: newArr,
      };
    });
  };

  render() {
    return (
      <section className="todoapp">
        <Header />
        <section className="main">
          <TaskList
            todos={this.state.taskList}
            setStatus={this.statusHandler}
            setText={this.editHandler}
            deleteTask={this.deleteHandler}
          />
          <Footer />
        </section>
      </section>
    );
  }
}

/* else {
        if (state.taskList[idx].status === "completed") {
          newArr[idx].status = "active";
        } else if (state.taskList[idx].status === "active") {
          newArr[idx].status = "completed";
        }
      } */
