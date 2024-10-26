import React from 'react'
import { Form, Input } from 'reactstrap'

const FilterForm = ({ filter, setFilter }) => {
  const handleDataChange = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const InputField = {
    marginBottom: '10px',
  }

  return (
    <Form>
      <Input
        type="text"
        placeholder="Try 'snäf', 'osy' or 'lauri'"
        value={filter}
        onChange={handleDataChange}
        style={InputField}
      />
    </Form>
  )
}

export default FilterForm
