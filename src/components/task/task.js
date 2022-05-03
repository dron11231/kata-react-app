import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PropTypes from 'prop-types'

import Timer from '../timer/timer'

export default class Task extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    setStatus: PropTypes.func,
    deleteTask: PropTypes.func,
    id: PropTypes.number,
  }

  static defaultProps = {
    text: 'Default String.',
  }

  state = {
    time: new Date(),
  }

  render() {
    return (
      <div className="view">
        <input className="toggle" type="checkbox" id={this.props.id} />
        <label htmlFor={this.props.id}>
          <span className="title">{this.props.text}</span>
          <span className="description">
            <Timer
              id={this.props.id}
              timerValue={this.props.timerValue}
              startTimer={this.props.startTimer}
              taskList={this.props.taskList}
              stopTimer={this.props.stopTimer}
            />
          </span>
          <span className="description">
            Created{' '}
            {formatDistanceToNow(this.state.time, {
              includeSeconds: true,
              addSuffix: true,
            })}{' '}
          </span>
        </label>
        <button
          className="icon icon-edit"
          onClick={() => {
            this.props.setStatus(this.props.id, null, 'editing')
          }}
        ></button>
        <button
          className="icon icon-destroy"
          onClick={() => {
            this.props.deleteTask(this.props.id)
          }}
        ></button>
      </div>
    )
  }
}
