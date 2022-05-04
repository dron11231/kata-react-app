import React from 'react'

import Header from '../header/header'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'
import './todo-app.css'

export default class TodoApp extends React.Component {
  maxId = 3
  timer = null

  state = {
    taskList: [
      { text: 'Completed task', status: 'active', visible: 'visible', timerId: null, timerValue: '00:00', id: 1 },
      { text: 'Active task', status: 'active', visible: 'visible', timerId: null, timerValue: '00:00', id: 2 },
    ],
    filter: 'all',
  }

  startTimer = (id) => {
    this.setState(() => {
      const arr = [...this.state.taskList]
      const index = arr.findIndex((el) => el.id === id)
      if (arr[index].timerId !== null || arr[index].status === 'completed') {
        return
      }
      arr[index].timerId = setInterval(() => {
        const newArr = [...this.state.taskList]
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
          clearInterval(this.state.taskList[idx].timerId)
        }
        const newTime = this.setTimer(minutes, seconds)
        newArr[idx].timerValue = newTime
        this.setState({ taskList: newArr })
      }, 1000)

      return {
        taskList: arr,
      }
    })
  }

  setTimer = (min = '00', sec = '00') => {
    if (min === '') {
      min = '00'
    }
    if (sec === '') {
      sec = '00'
    }
    let minutes = min
    let seconds = sec
    let newTime = []

    if (sec > 60) {
      seconds = 60
    }
    minutes = minutes.toString()
    seconds = seconds.toString()
    if (minutes.length < 2) {
      minutes = '0' + minutes
    }
    if (seconds.length < 2) {
      seconds = '0' + seconds
    }
    newTime.push(minutes, seconds)
    newTime = newTime.join(':')
    return newTime
  }

  stopTimer = (id) => {
    const newArr = [...this.state.taskList]
    const idx = newArr.findIndex((el) => el.id === id)
    clearInterval(this.state.taskList[idx].timerId)
    newArr[idx].timerId = null
    this.setState(() => {
      return {
        taskList: newArr,
      }
    })
  }

  visibleHandler = (filter) => {
    this.setState((state) => {
      const newArr = [...state.taskList]
      let prevFilter = state.filter

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

      return {
        taskList: newArr,
        filter: prevFilter,
      }
    })
  }

  deleteHandler = (id) => {
    this.setState((state) => {
      const newArr = [...state.taskList]
      const idx = newArr.findIndex((el) => el.id === id)
      clearInterval(newArr[idx].timerId)
      newArr.splice(idx, 1)
      return {
        taskList: newArr,
      }
    })
  }

  clearCompleted = () => {
    this.state.taskList.forEach((el) => {
      if (el.status === 'completed') {
        this.deleteHandler(el.id)
      }
    })
  }

  editHandler = (id, text) => {
    this.setState((state) => {
      const newArr = [...state.taskList]
      const idx = newArr.findIndex((el) => el.id === id)
      newArr[idx].text = text
      return {
        taskList: newArr,
      }
    })
  }

  filterChecker = () => {
    const filter = this.state.filter
    this.visibleHandler(filter)
  }

  statusHandler = (id, checkboxState, status) => {
    this.setState((state) => {
      const newArr = [...state.taskList]
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
      return {
        taskList: newArr,
      }
    })
  }

  addTask = (text, min, sec) => {
    this.setState((state) => {
      const newArr = [...state.taskList]
      if (text !== '' && text.charAt(0) !== ' ') {
        newArr.push({
          text: text,
          status: 'active',
          visible: true,
          timerId: null,
          timerValue: this.setTimer(min, sec),
          id: this.maxId++,
        })
        return {
          taskList: newArr,
        }
      }
    })
  }

  render() {
    return (
      <section className="todoapp">
        <Header addTask={this.addTask} setTimer={this.setTimer} />
        <section className="main">
          <TaskList
            todos={this.state.taskList}
            setStatus={this.statusHandler}
            setText={this.editHandler}
            deleteTask={this.deleteHandler}
            setVisibility={this.visibleHandler}
            filterChecker={this.filterChecker}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
          />
          <Footer
            todos={this.state.taskList}
            filter={this.state.filter}
            setVisibility={this.visibleHandler}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    )
  }
}
