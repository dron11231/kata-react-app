import React, { useState } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PropTypes from 'prop-types'

import Timer from '../timer/timer'

function Task({ id, timerValue, startTimer, taskList, stopTimer, text, setStatus, deleteTask }) {
  const [time, setTime] = useState(new Date())
  return (
    <div className="view">
      <input className="toggle" type="checkbox" id={id} />
      <label htmlFor={id}>
        <span className="title">{text}</span>
        <span className="description">
          <Timer id={id} timerValue={timerValue} startTimer={startTimer} taskList={taskList} stopTimer={stopTimer} />
        </span>
        <span className="description">
          Created{' '}
          {formatDistanceToNow(time, {
            includeSeconds: true,
            addSuffix: true,
          })}{' '}
        </span>
      </label>
      <button
        className="icon icon-edit"
        onClick={() => {
          setStatus(id, null, 'editing')
        }}
      ></button>
      <button
        className="icon icon-destroy"
        onClick={() => {
          deleteTask(id)
        }}
      ></button>
    </div>
  )
}

class Taskk extends React.Component {
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

export default Task
