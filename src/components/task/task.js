import React from "react";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default class Task extends React.Component {
  render() {
    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          /* onClick={() => {
            this.props.setStatus(this.props.id);
          }} */
        />
        <label>
          <span className="description">{this.props.text}</span>
          <span className="created">created 17 seconds ago</span>
        </label>
        <button
          className="icon icon-edit"
          onClick={() => {
            this.props.setStatus(this.props.id, null, "editing");
          }}
        ></button>
        <button
          className="icon icon-destroy"
          onClick={() => {
            this.props.deleteTask(this.props.id);
          }}
        ></button>
      </div>
    );
  }
}
