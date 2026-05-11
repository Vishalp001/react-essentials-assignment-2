import { createContext, useContext, useReducer } from 'react'

// Initial State

const initialState = {
  tasks: [],
  filter: 'all',
  searchTerm: '',
  isLoading: false,
  history: [], // For Undo functionality
}

// Actions types = using Constants prevents typos

export const ACTIONS = {
  ADD_TASK: 'ADD_TASKS',
  DELETE_TASK: 'DELETE_TASK',
  TOGGLE_TASK: 'TOGGLE_TASK',
  EDIT_TASK: 'EDIT_TASK',
  SET_FILTER: 'SET_FILTER',
  SET_SEARCH: 'SET_SEARCH',
  UNDO_ACTION: 'UNDO_ACTION',
  SET_LOADING: 'SET_LOADING',
}

const taskReducer = (state, action) => {
  //always save current state to history before making changes
  const saveToHistory = (currentState) => ({
    ...currentState,
    history: [currentState, ...currentState.history.slice(0, 9)], //keep last 10 state
  })
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      const newTask = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
        priority: action.payload.priority || 'medium',
        createdAt: new Date().toISOString(),
      }

      return saveToHistory({
        ...state,
        tasks: [...state.tasks, newTask],
      })

    case ACTIONS.DELETE_TASK: {
      return saveToHistory({
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      })
    }
    case ACTIONS.TOGGLE_TASK:
      return saveToHistory({
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task,
        ),
      })

    case ACTIONS.EDIT_TASK:
      return saveToHistory({
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, ...action.payload.updates }
            : task,
        ),
      })
    case ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      }
    case ACTIONS.SET_SEARCH:
      return {
        ...state,
        searchTerm: action.payload,
      }

    case ACTIONS.UNDO_ACTION:
      if (state.history.length > 0) {
        const [previousState, ...restHistory] = state.history
        return {
          ...previousState,
          history: restHistory,
        }
      }
      return state
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }

    default:
      throw new Error(`Unhandle action type: ${action.type}`)
  }
}

//Create the context
const TaskContext = createContext()

// Custom Hook for easiear use
export const useTaskContext = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('UseTaskContext must be used within TaskProvider')
  }
  return context
}

// Provider Component

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  const addTask = (taskData) => {
    dispatch({ type: ACTIONS.ADD_TASK, payload: taskData })
  }
  const toggleTask = (taskId) => {
    dispatch({ type: ACTIONS.TOGGLE_TASK, payload: taskId })
  }

  const deleteTask = (taskId) => {
    dispatch({ type: ACTIONS.DELETE_TASK, payload: taskId })
  }
  const editTask = (taskId, updates) => {
    dispatch({ type: ACTIONS.EDIT_TASK, payload: { taskId, updates } })
  }

  const setSearch = (searchTerm) => {
    dispatch({ type: ACTIONS.SET_SEARCH, payload: searchTerm })
  }

  const setFilter = (filter) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: filter })
  }
  const undoAction = () => {
    dispatch({ type: ACTIONS.UNDO_ACTION })
  }

  // Derived States - compiuted values based on current state

  const filteredTasks = state.tasks.filter((task) => {
    const matchedFilter =
      state.filter === 'all' ||
      (state.filter === 'completed' && task.completed) ||
      (state.filter === 'pending' && !task.completed)

    const matchSearch =
      state.searchTerm === '' ||
      task.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(state.searchTerm.toLowerCase())

    return matchedFilter && matchSearch
  })

  const taskStatus = {
    total: state.tasks.length,
    completed: state.tasks.filter((task) => task.completed).length,
    pending: state.tasks.filter((task) => !task.completed).length,
  }

  const value = {
    //State
    tasks: filteredTasks,
    filter: state.filter,
    searchTerm: state.searchTerm,
    isLoading: state.isLoading,
    taskStatus,
    canUndo: state.history.length > 0,

    //Actions
    addTask,
    deleteTask,
    toggleTask,
    editTask,
    setFilter,
    setSearch,
    undoAction,
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
