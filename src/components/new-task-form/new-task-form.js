import React from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends React.Component {
  state = {
    text: '',
    seconds: '',
    minutes: '',
  }

  static propTypes = {
    addTask: PropTypes.func,
  }

  onToggleText = (e) => {
    this.setState({ text: e.target.value })
  }

  onToggleMinutes = (e) => {
    e.target.value = e.target.value.replace(/[^\d]/g, '')
    this.setState({ minutes: e.target.value })
  }

  onToggleSeconds = (e) => {
    e.target.value = e.target.value.replace(/[^\d]/g, '')
    this.setState({ seconds: e.target.value })
  }

  onSubmit = () => {
    this.props.addTask(this.state.text, this.state.minutes, this.state.seconds)
    this.setState(() => {
      return {
        text: '',
        minutes: '',
        seconds: '',
      }
    })
  }

  render() {
    return (
      <form
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            this.onSubmit()
          }
        }}
        className="new-todo-form"
      >
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onToggleText}
          value={this.state.text}
        />
        <input
          className="new-todo-form__timer input-timer-minutes"
          placeholder="Min"
          onChange={this.onToggleMinutes}
          value={this.state.minutes}
          maxLength={2}
          autoFocus
        />
        <input
          className="new-todo-form__timer input-timer-seconds"
          placeholder="Sec"
          onChange={this.onToggleSeconds}
          value={this.state.seconds}
          maxLength={2}
          autoFocus
        />
      </form>
    )
  }
}
