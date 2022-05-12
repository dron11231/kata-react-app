import React, { useState } from 'react'

import './new-task-form.css'

function NewTaskForm({ addTask }) {
  const [textField, setText] = useState('')
  const [secondsField, setSeconds] = useState('')
  const [minutesField, setMinutes] = useState('')

  const onToggleText = (e) => {
    setText(e.target.value)
  }

  const onToggleMinutes = (e) => {
    e.target.value = e.target.value.replace(/[^\d]/g, '')
    setMinutes(e.target.value)
  }

  const onToggleSeconds = (e) => {
    e.target.value = e.target.value.replace(/[^\d]/g, '')
    setSeconds(e.target.value)
  }

  const onSubmit = () => {
    addTask(textField, minutesField, secondsField)
    setText('')
    setMinutes('')
    setSeconds('')
  }

  return (
    <form
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onSubmit()
        }
      }}
      className="new-todo-form"
    >
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={onToggleText}
        value={textField}
      />
      <input
        className="new-todo-form__timer input-timer-minutes"
        placeholder="Min"
        onChange={onToggleMinutes}
        value={minutesField}
        maxLength={2}
        autoFocus
      />
      <input
        className="new-todo-form__timer input-timer-seconds"
        placeholder="Sec"
        onChange={onToggleSeconds}
        value={secondsField}
        maxLength={2}
        autoFocus
      />
    </form>
  )
}

class NewTaskFormm extends React.Component {
  state = {
    text: '',
    seconds: '',
    minutes: '',
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

export default NewTaskForm
