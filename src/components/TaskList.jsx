import { useTaskContext } from '../context/TaskContext'
import TaskItems from './TaskItems'

const TaskList = () => {
  const { tasks, taskStatus } = useTaskContext()

  if (tasks.length === 0) {
    return (
      <div className='emptySearch'>
        <h3>No Task Forund</h3>
        <p>Add a task to get Statrted</p>
      </div>
    )
  }

  return (
    <div className='tasklist'>
      <div className='taskStats'>
        <span>Total: {taskStatus.total}</span>
        <span>Completed: {taskStatus.completed}</span>
        <span>Pending: {taskStatus.pending}</span>
      </div>

      <div className='tasks'>
        {tasks.map((task) => (
          <TaskItems key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default TaskList
