import React, { useState } from 'react'

import { useTaskContext } from '../context/TaskContext'

const TaskForm = () => {
  const { addTask } = useTaskContext()

  const [formData, setformData] = useState({
    title: '',
    description: '',
    priority: 'medium',
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.title.trim()) return

    addTask(formData)
    setformData({ title: '', description: '', priority: 'medium' })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className='taskForm'>
      <h2>Add new task</h2>
      <div className='formGroup'>
        <label htmlFor='title'>Title *</label>
        <input
          type='text'
          id='title'
          name='title'
          value={formData.title}
          onChange={handleChange}
          required
          placeholder='Enter task title...'
        />
      </div>

      <div className='formGroup'>
        <label htmlFor='description'>Description </label>
        <textarea
          id='description'
          name='description'
          value={formData.description}
          onChange={handleChange}
          placeholder='Enter task description...'
          rows='3'
        />
      </div>

      <div className='formGroup'>
        <label htmlFor='priority'>Priority </label>
        <select
          name='priority'
          id='priority'
          value={formData.priority}
          onChange={handleChange}
        >
          <option value='low'>Low</option>
          <option value='medium'>Medium</option>
          <option value='high'>High</option>
        </select>
      </div>

      <button type='submit' disabled={!formData.title.trim()}>
        Add Task
      </button>
    </form>
  )
}

export default TaskForm
