import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './tasks-filter.css'

function TasksFilter({ setVisibility }) {
  useEffect(() => {
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
  }, [])

  return (
    <ul className="filters">
      <li>
        <button
          className="filter-btn selected"
          onClick={() => {
            setVisibility('all')
          }}
        >
          All
        </button>
      </li>
      <li>
        <button
          className="filter-btn"
          onClick={() => {
            setVisibility('active')
          }}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className="filter-btn"
          onClick={() => {
            setVisibility('completed')
          }}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

export default TasksFilter
