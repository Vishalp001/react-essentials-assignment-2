import React from 'react'
import { useTaskContext } from '../context/TaskContext'
const FilterControl = () => {
  const { filter, searchTerm, setFilter, setSearch } = useTaskContext()

  return (
    <div className='filterControls'>
      <div className='searchSection'>
        <input
          type='text'
          placeholder='Search tasks...'
          onChange={(e) => setSearch(e.target.value)}
          className='searchInput'
        />

        <div className='filterSection'>
          <div className='filterButtons'>
            {['all', 'completed', 'pending'].map((filterOption) => {
              return (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={filter === filterOption ? 'active' : ''}
                >
                  {filterOption.charAt(0).toLocaleUpperCase() +
                    filterOption.slice(1)}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterControl
