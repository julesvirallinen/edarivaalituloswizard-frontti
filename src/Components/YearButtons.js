import React from 'react'

const MenuButtons = ({ setCurrent, current, options }) => {
    const yearStyle = {
      color: 'gray'
    }
  
    return (
      <h1>
        {options.map(year => (
          <span
            style={current != year ? yearStyle : undefined}
            key={year}
            onClick={() => setCurrent(year)}
          >
            {' '}
            {year}
          </span>
        ))}
      </h1>
    )
  }

export default MenuButtons