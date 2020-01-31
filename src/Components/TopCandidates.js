import React from 'react'

const TopCandidates = ({ candidateData, setCurrentCandidate, filter }) => {
    const candidateList = Object.values(candidateData)
    function compare(a, b) {
      return b.totalVotes - a.totalVotes
    }
    const sortedCandidateList = candidateList.sort(compare).slice(0, 300)
  
    return (
      <div>
        {sortedCandidateList.map((candidate, index) => (
            JSON.stringify(candidate).toLowerCase().includes(filter) ? 
          <span
            className="candidate"
            key={candidate.name}
            onClick={() => setCurrentCandidate(candidate.name)}
          >
            {index + 1}. {candidate.name} <b>{candidate.totalVotes}</b>{' '}
            <i>{candidate.times}x</i>
            <br />
          </span> :''
        ))}
      </div>
    )
  }

  export default TopCandidates