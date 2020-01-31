import React from 'react'
import { Form, Input } from 'reactstrap'

const FilterForm = ({ filter, setFilter }) => {
  const handleDataChange = event => {
    setFilter(event.target.value)
  }

  const InputField = {
    marginBottom: '10px',
  }

  return (
    <Form>
      <Input
        type="text"
        placeholder="Try 'HYAL' or 'Laura'"
        value={filter}
        onChange={handleDataChange}
        style={InputField}
      />
    </Form>
  )
}

export default FilterForm
