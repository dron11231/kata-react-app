import React from 'react'

export default class Timer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <button
          className="icon icon-play"
          onClick={() => {
            this.props.startTimer(this.props.id)
          }}
        ></button>
        <button
          className="icon icon-pause"
          onClick={() => {
            this.props.stopTimer(this.props.id)
          }}
        ></button>
        <span className="time">{this.props.timerValue}</span>
      </React.Fragment>
    )
  }
}
