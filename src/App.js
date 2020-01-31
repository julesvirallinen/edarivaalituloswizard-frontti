import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ElectionData from './Components/ElectionData'
import MenuButtons from './Components/YearButtons'
import ViewSingleCandidate from './Components/ViewSingleCandidate'
import TopCandidates from './Components/TopCandidates'
import FilterForm from './Components/FilterForm'

function App() {
  const [yearlyData, setYearlyData] = useState({})
  const [currentYear, setCurrentYear] = useState(2018)
  const [candidateData, setCandidateData] = useState({})
  const [currentCandidate, setCurrentCandidate] = useState('')
  const [currentPage, setCurrentPage] = useState('yearly')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/api/sample').then(response => {
      setYearlyData(response.data)
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3001/api/candidate').then(response => {
      setCandidateData(response.data)
    })
  }, [])

  const menuOptions = ['yearly', 'top candidates']

  if (currentCandidate !== '') {
    return (
      <div>
        <ViewSingleCandidate
          currentCandidate={currentCandidate}
          candidate={candidateData[currentCandidate]}
          setCurrentCandidate={setCurrentCandidate}
        />
      </div>
    )
  }
  if (currentPage === 'yearly') {
    return (
      <div>
        <MenuButtons
          setCurrent={setCurrentPage}
          current={currentPage}
          options={menuOptions}
        />
        <MenuButtons
          setCurrent={setCurrentYear}
          current={currentYear}
          options={Object.keys(yearlyData)}
        />
        <FilterForm filter={filter} setFilter={setFilter} />

        <ElectionData
          candidateData={yearlyData[currentYear]}
          setCurrentCandidate={setCurrentCandidate}
          filter={filter}
        />
      </div>
    )
  }

  if (currentPage === 'top candidates') {
    return (
      <div>
        <MenuButtons
          setCurrent={setCurrentPage}
          current={currentPage}
          options={menuOptions}
        />
        <FilterForm filter={filter} setFilter={setFilter} />

        <TopCandidates
          candidateData={candidateData}
          setCurrentCandidate={setCurrentCandidate}
          filter={filter}
        />
      </div>
    )
  }
}

export default App
