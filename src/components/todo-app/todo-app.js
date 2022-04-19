import React from "react";

import Header from "../header/header";
import TaskList from "../task-list/task-list";
import Footer from "../footer/footer";
import "./todo-app.css";

export default class TodoApp extends React.Component {
  maxId = 3;

  state = {
    taskList: [
      { text: "Completed task", status: "active", visible: "visible", id: 1 },
      { text: "Active task", status: "active", visible: "visible", id: 2 },
    ],
  };

  visibleHandler = (filter) => {
    this.setState((state) => {
      const newArr = [...state.taskList];

      switch (filter) {
        case "all":
          newArr.forEach((el) => (el.visible = "visible"));
          break;
        case "active":
          newArr.forEach((el) => {
            if (el.status === "active") {
              el.visible = "visible";
            } else {
              el.visible = "invisible";
            }
          });
          break;
        case "completed":
          newArr.forEach((el) => {
            if (el.status === "completed") {
              el.visible = "visible";
            } else {
              el.visible = "invisible";
            }
          });
          break;
        default:
      }

      return {
        taskList: newArr,
      };
    });
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

  clearCompleted = () => {
    this.state.taskList.forEach((el) => {
      if (el.status === "completed") {
        this.deleteHandler(el.id);
      }
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

  addTask = (text) => {
    this.setState((state) => {
      const newArr = [...state.taskList];
      newArr.push({
        text: text,
        status: "active",
        visible: true,
        id: this.maxId++,
      });
      return {
        taskList: newArr,
      };
    });
  };

  render() {
    return (
      <section className="todoapp">
        <Header addTask={this.addTask} />
        <section className="main">
          <TaskList
            todos={this.state.taskList}
            setStatus={this.statusHandler}
            setText={this.editHandler}
            deleteTask={this.deleteHandler}
          />
          <Footer
            todos={this.state.taskList}
            setVisibility={this.visibleHandler}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}
