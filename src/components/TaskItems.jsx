import { useState } from 'react'
import { useTaskContext } from '../context/TaskContext'

const TaskItems = ({ task }) => {
  const { deleteTask, toggleTask, editTask } = useTaskContext()

  const [isEditing, setIsEditing] = useState(false)

  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    createdAt: task.createdAt,
  })

  const handleEdit = () => {
    editTask(task.id, editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      createdAt: task.createdAt,
    })
    setIsEditing(false)
  }

  const getPriority = (priority) => {
    switch (priority) {
      case 'high':
        return '#ff4757'
      case 'medium':
        return '#ffa502'
      case 'low':
        return '#26de81'
      default:
        return '#ddd'
    }
  }

  const [showMore, setShowMore] = useState(false)

  if (isEditing) {
    return (
      <div className='taskItem editing'>
        <input
          value={editData.title}
          onChange={(e) =>
            setEditData((prev) => ({ ...prev, title: e.target.value }))
          }
          type='text'
          name=''
          id=''
          maxLength={200}
          placeholder='Task title...'
        />
        <p>
          {editData.title.length}/200{' '}
          {editData.title.length >= 200 && (
            <small>Maximum 200 characters allowed</small>
          )}
        </p>

        <textarea
          value={editData.description}
          onChange={(e) =>
            setEditData((prev) => ({ ...prev, description: e.target.value }))
          }
          name=''
          id=''
          placeholder='Task Description...'
        />

        <select
          value={editData.priority}
          onChange={(e) =>
            setEditData((prev) => ({ ...prev, priority: e.target.value }))
          }
          name=''
          id=''
        >
          <option value='low'>Low</option>
          <option value='medium'>Medium</option>
          <option value='high'>High</option>
        </select>

        <div className='editActions'>
          <button onClick={handleEdit} className='save'>
            Save
          </button>
          <button onClick={handleCancel} className='cancle'>
            cancle
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`taskItem ${task.completed ? 'completed' : ''}`}>
      <div className='taskContent'>
        <div className='taskHeader'>
          <h3>{editData.title}</h3>
          <span
            className='priorityBadge'
            style={{ backgroundColor: getPriority(editData.priority) }}
          >
            {editData.priority}
          </span>
        </div>
        {editData.description.length > 200 ? (
          <p className='taskDesc'>
            {showMore ? (
              <>
                {editData.description}{' '}
                <span className='showBtns' onClick={() => setShowMore(false)}>
                  show less
                </span>
              </>
            ) : (
              <>
                {editData.description.slice(0, 200)}...
                <span className='showBtns' onClick={() => setShowMore(true)}>
                  show more
                </span>
              </>
            )}
          </p>
        ) : (
          <p className='taskDesc'>{editData.description}</p>
        )}

        <div className='taskMeta'>
          <small>
            Created: {new Date(editData.createdAt).toLocaleDateString()}
          </small>
        </div>
        <div className='taskActions'>
          <button
            className={`toggleBtn ${task.completed ? 'completed' : 'pending'}`}
            onClick={() => toggleTask(task.id)}
          >
            {task.completed ? 'Completed' : 'Pending'}
          </button>

          <button onClick={() => setIsEditing(true)}>Edit </button>

          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default TaskItems
