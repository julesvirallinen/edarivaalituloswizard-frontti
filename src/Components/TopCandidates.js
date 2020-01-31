import React, { useState } from 'react'

const TopCandidates = ({ candidateData, setCurrentCandidate, filter }) => {
  const [setting, setSetting] = useState(false)
  const toggle = () => setSetting(!setting)

  const candidateList = Object.values(candidateData)
  function compare(a, b) {
    return b.totalVotes - a.totalVotes
  }

  function compareByElection(a, b) {
    return b.totalVotes / b.times - a.totalVotes / a.times
  }
  const sortedCandidateList = candidateList
    .sort(setting ? compare : compareByElection)
    .slice(0, 300)

  return (
    <div>
      <strong onClick={toggle}>Toggle [top votes all time / best average]</strong> <br/><br/>
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
            {setting ? (
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
