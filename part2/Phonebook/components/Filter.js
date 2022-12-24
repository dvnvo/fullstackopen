import React from 'react'

const Filter = (props) => {
  const {
    searchName,
    handleSearchChange,
  } = props

  return (
    <div>
    <div>filter shown with</div>
    <input
      value={searchName}
      onChange={handleSearchChange}
    />
    </div>
  )
}

export default Filter
