import React from "react";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import PropTypes from "prop-types";

export default class Task extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    setStatus: PropTypes.func,
    deleteTask: PropTypes.func,
    id: PropTypes.number,
  };

  static defaultProps = {
    text: "Default String.",
  };

  state = {
    time: new Date(),
  };

  render() {
    return (
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">{this.props.text}</span>
          <span className="created">
            Created{" "}
            {formatDistanceToNow(this.state.time, {
              includeSeconds: true,
              addSuffix: true,
            })}{" "}
          </span>
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
