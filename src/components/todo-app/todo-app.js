import React, { useState } from 'react'

import { useSetTimer } from '../../hooks/hooks'
import Header from '../header/header'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'
import './todo-app.css'

let maxId = 3
let newArr = []
function TodoApp() {
  const todoList = [
    {
      text: 'Completed Task',
      status: 'active',
      visible: 'visible',
      timerId: null,
      timerValue: '00:00',
      id: 1,
    },
    { text: 'Active task', status: 'active', visible: 'visible', timerId: null, timerValue: '00:00', id: 2 },
  ]
  const [taskList, setTaskList] = useState(todoList)
  const [filter, setFilter] = useState('all')
  newArr = [...taskList]
  const startTimer = (id) => {
    setTaskList(() => {
      const arr = [...taskList]
      const index = arr.findIndex((el) => el.id === id)
      if (arr[index].timerId !== null || arr[index].status === 'completed') {
        return taskList
      }
      arr[index].timerId = setInterval(() => {
        const idx = newArr.findIndex((el) => el.id === id)
        const time = newArr[idx].timerValue.split(':')
        let minutes = time[0]
        let seconds = time[1]
        if (minutes > 0) {
          if (seconds >= 0) {
            seconds--
          }
          if (seconds < 0) {
            minutes--
            seconds = 59
          }
        } else if (seconds > 0) {
          seconds--
        } else {
          clearInterval(taskList[idx].timerId)
        }
        const newTime = useSetTimer(minutes, seconds)
        newArr[idx].timerValue = newTime
        setTaskList(() => newArr)
      }, 1000)

      return arr
    })
  }

  const stopTimer = (id) => {
    const newArr = [...taskList]
    const idx = newArr.findIndex((el) => el.id === id)
    clearInterval(taskList[idx].timerId)
    newArr[idx].timerId = null
    setTaskList(() => newArr)
  }

  const deleteHandler = (id) => {
    setTaskList((taskList) => {
      const newArr = [...taskList]
      const idx = newArr.findIndex((el) => el.id === id)
      clearInterval(newArr[idx].timerId)
      newArr.splice(idx, 1)
      return newArr
    })
  }

  const clearCompleted = () => {
    taskList.forEach((el) => {
      if (el.status === 'completed') {
        deleteHandler(el.id)
      }
    })
  }

  const statusHandler = (id, checkboxState, status) => {
    setTaskList((taskList) => {
      const newArr = [...taskList]
      const idx = newArr.findIndex((el) => el.id === id)
      if (status) {
        newArr[idx].status = status
      } else {
        if (checkboxState) {
          newArr[idx].status = 'completed'
          clearInterval(newArr[idx].timerId)
          newArr[idx].timerId = null
        } else {
          newArr[idx].status = 'active'
        }
      }
      return newArr
    })
  }

  const editHandler = (id, text) => {
    setTaskList((taskList) => {
      const newArr = [...taskList]
      const idx = newArr.findIndex((el) => el.id === id)
      newArr[idx].text = text
      return newArr
    })
  }

  const filterChecker = () => {
    visibleHandler(filter)
  }

  const visibleHandler = (filter) => {
    setTaskList((todo) => {
      const newArr = [...todo]
      let prevFilter = filter
      switch (filter) {
        case 'all':
          newArr.forEach((el) => (el.visible = 'visible'))
          prevFilter = 'all'
          break

        case 'active':
          newArr.forEach((el) => {
            if (el.status === 'active') {
              el.visible = 'visible'
            } else {
              el.visible = 'invisible'
            }
          })

          prevFilter = 'active'
          break
        case 'completed':
          console.log(newArr)
          newArr.forEach((el) => {
            if (el.status === 'completed') {
              el.visible = 'visible'
            } else {
              el.visible = 'invisible'
            }
          })
          prevFilter = 'completed'
          break
        default:
      }
      setFilter(prevFilter)
      return newArr
    })
  }

  const addTask = (text, min, sec) => {
    setTaskList((taskList) => {
      const newArr = [...taskList]
      if (text !== '' && text.charAt(0) !== ' ') {
        newArr.push({
          text: text,
          status: 'active',
          visible: 'visible',
          timerId: null,
          timerValue: useSetTimer(min, sec),
          id: maxId++,
        })
        return newArr
      }
      return newArr
    })
    visibleHandler(filter)
  }

  return (
    <section className="todoapp">
      <Header addTask={addTask} />
      <section className="main">
        <TaskList
          todos={taskList}
          setStatus={statusHandler}
          setText={editHandler}
          deleteTask={deleteHandler}
          setVisibility={visibleHandler}
          filterChecker={filterChecker}
          startTimer={startTimer}
          stopTimer={stopTimer}
        />
        <Footer todos={taskList} filter={filter} setVisibility={visibleHandler} clearCompleted={clearCompleted} />
      </section>
    </section>
  )
}

export default TodoApp
