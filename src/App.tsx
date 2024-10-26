import React, { useState } from 'react'
import ElectionData from './Components/ElectionData.js'
import MenuButtons from './Components/MenuButtons.js'
import ViewSingleCandidate from './Components/ViewSingleCandidate.js'
import TopCandidates from './Components/TopCandidates'
import FilterForm from './Components/FilterForm.js'
import yearlyData from './data/yearlyData.json'
import candidateData from './data/byCandidate.json'
import { YEARS } from './dataUtils/years'

export type TCandidate = (typeof candidateData)['Aino Ikävalko']

function App() {
  const [currentYear, setCurrentYear] = useState(2020)
  const [currentCandidate, setCurrentCandidate] = useState('')
  const [currentPage, setCurrentPage] = useState('top candidates')
  const [filter, setFilter] = useState('')

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
        <MenuButtons setCurrent={setCurrentPage} current={currentPage} options={menuOptions} />
        <MenuButtons setCurrent={setCurrentYear} current={currentYear} options={YEARS} />
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
        <MenuButtons setCurrent={setCurrentPage} current={currentPage} options={menuOptions} />

        <TopCandidates
          candidateData={candidateData}
          setCurrentCandidate={setCurrentCandidate}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
    )
  }
}

export default App
