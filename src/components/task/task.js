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

export default Task
