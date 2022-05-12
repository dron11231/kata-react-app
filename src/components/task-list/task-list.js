import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task'

import './task-list.css'

const TaskList = function ({ todos, setStatus, setText, deleteTask, filterChecker, startTimer, stopTimer }) {
  const elems = todos.map((el) => {
    const { id, ...itemProps } = el
    return (
      <li
        key={id}
        className={itemProps.status + ' ' + itemProps.visible}
        onChange={(e) => {
          if (e.target.className === 'toggle') {
            setStatus(id, e.target.checked)
            filterChecker()
          }
        }}
      >
        <Task
          {...itemProps}
          id={id}
          setStatus={setStatus}
          deleteTask={deleteTask}
          timerValue={itemProps.timerValue}
          startTimer={startTimer}
          taskList={todos}
          stopTimer={stopTimer}
        />
        <input
          type="text"
          className="edit"
          defaultValue={itemProps.text}
          onKeyDown={(e) => {
            if (e.key === 'Escape' || e.key === 'Enter') {
              setStatus(id)
              setText(id, e.target.value)
            }
          }}
        />
      </li>
    )
  })
  return <ul className="todo-list">{elems}</ul>
}

TaskList.propTypes = {
  /* todos: PropTypes.arrayOf(PropTypes.object).isRequired, */
  setStatus: PropTypes.func,
  setText: PropTypes.func,
}

export default TaskList
