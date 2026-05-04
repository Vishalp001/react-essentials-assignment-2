import React from 'react'
import './App.css'
import { TaskProvider } from './context/TaskContext'
import TaskForm from './components/TaskForm'
import FilterControl from './components/FilterControl'

import TaskList from './components/TaskList'
const App = () => {
  return (
    <TaskProvider>
      <div className='App'>
        <div className='blueBg' />
        <div className='appHeader'>
          <h1>Task Manager</h1>
          <main className='appMain'>
            <div className='sideBar'>
              <TaskForm />
            </div>

            <div className='content'>
              <FilterControl />
              <TaskList />
            </div>
          </main>
        </div>
      </div>
    </TaskProvider>
  )
}

export default App
