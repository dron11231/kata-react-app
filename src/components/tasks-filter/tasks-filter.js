import React from 'react'
import PropTypes from 'prop-types'
import './tasks-filter.css'

export default class TasksFilter extends React.Component {
  static propTypes = {
    setVisibility: PropTypes.func,
  }

  componentDidMount() {
    const btns = document.querySelectorAll('.filter-btn')
    const btnList = document.querySelector('.filters')

    btnList.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        btns.forEach((btn) => {
          btn.classList.remove('selected')
        })
        e.target.classList.add('selected')
      }
    })
  }

  render() {
    return (
      <ul className="filters">
        <li>
          <button
            className="filter-btn selected"
            onClick={() => {
              this.props.setVisibility('all')
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            className="filter-btn"
            onClick={() => {
              this.props.setVisibility('active')
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className="filter-btn"
            onClick={() => {
              this.props.setVisibility('completed')
            }}
          >
            Completed
          </button>
        </li>
      </ul>
    )
  }
}
