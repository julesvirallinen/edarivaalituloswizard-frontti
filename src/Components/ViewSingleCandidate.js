import React from 'react'

const ViewSingleCandidate = ({
    currentCandidate,
    candidate,
    setCurrentCandidate
  }) => {
    if (candidate === undefined) return ''
    console.log(candidate)
    return (
      <div>
        <h1>{currentCandidate}</h1>
        Total votes: {candidate.totalVotes} <br />
        Times up for election: {candidate.times} 
        {candidate.years.map(year => (
          <div key={year.year}>
            <b>{year.year} </b>
            votes: {year.votes} {year.elected ? '/ ★' : ''} ({year.coalition}/
            {year.group})
            <br />
          </div>
        ))}
        <button onClick={() => setCurrentCandidate('')}>Return </button>
      </div>
    )
  }

export default ViewSingleCandidate