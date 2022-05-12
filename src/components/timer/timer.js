import React from 'react'

function Timer({ id, startTimer, stopTimer, timerValue }) {
  return (
    <React.Fragment>
      <button
        className="icon icon-play"
        onClick={() => {
          startTimer(id)
        }}
      ></button>
      <button
        className="icon icon-pause"
        onClick={() => {
          stopTimer(id)
        }}
      ></button>
      <span className="time">{timerValue}</span>
    </React.Fragment>
  )
}

export default Timer
