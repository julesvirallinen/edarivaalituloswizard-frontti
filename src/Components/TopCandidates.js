import React, { useState } from 'react'
import MenuButtons from './MenuButtons'
import FilterForm from './FilterForm'

const TopCandidates = ({ candidateData, setCurrentCandidate, filter, setFilter }) => {
  const [setting, setSetting] = useState('top votes')
  const settings = ['top votes', 'best average']

  const candidateList = Object.values(candidateData)
  function compare(a, b) {
    return b.totalVotes - a.totalVotes
  }

  function compareByElection(a, b) {
    return b.totalVotes / b.times - a.totalVotes / a.times
  }
  var sortedCandidateList = candidateList
  if (setting === 'top votes') {
    sortedCandidateList = candidateList.sort(compare).slice(0, 300)
  } else {
    sortedCandidateList = candidateList
      .sort(compareByElection)
      .filter(c => c.times > 1)
      .slice(0, 300)
  }

  return (
    <div>
      <MenuButtons current={setting} setCurrent={setSetting} options={settings}/>
      <FilterForm filter={filter} setFilter={setFilter} />

      {sortedCandidateList.map((candidate, index) =>
        JSON.stringify(candidate)
          .toLowerCase()
          .includes(filter) ? (
          <span
            className="candidate"
            key={candidate.name}
            onClick={() => setCurrentCandidate(candidate.name)}
          >
            {index + 1}. {candidate.name}{' '}
            {setting === 'top votes' ? (
              <span>
                <b>{candidate.totalVotes}</b> <i>{candidate.times}x</i>
              </span>
            ) : (
              <span>
                {candidate.totalVotes}/<i>{candidate.times}</i> ={' '}
                <b>{Math.round(candidate.totalVotes / candidate.times)}</b>
              </span>
            )}
            <br />
          </span>
        ) : (
          ''
        ),
      )}
    </div>
  )
}

export default TopCandidates
