import React, { useState } from 'react'
import MenuButtons from './MenuButtons'
import FilterForm from './FilterForm'
import { Badge } from 'reactstrap'

const GroupBadge = ({ groupName }) => {
  const groupColors = {
    tsempp: 'lightblue',
    studo: 'lightgreen',
    nation: 'lightgreen',
    stud: 'lightgreen',
    codtho: 'lightgreen',
    'ämnesf': 'lightgreen',
    agrof:'lightgreen',
    sitvas: 'red',
    hyvi: 'green',
    kok: 'blue',
    maltil:'blue',
    osy: 'lightcoral',
    sd: 'lightcoral',
    lks: 'orange',
    help1: 'orange',
    help2: 'orange',
    help3: 'orange',
    eky: 'orange',
    ekyyfk: 'orange',
    pykälä: 'orange',
    '(h)lks': 'orange',
    'lks/hl': 'orange',
    'viik-n': 'purple',
    kumpu: 'purple',
    viikki: 'purple',
    valt: 'purple',
    human: 'purple',
    teol: 'purple',
    penger: 'purple',
    käytt: 'purple',
    ps: '#856404',
    peruss: '#856404',
    'kesk.': 'yellow',
    kesk: 'yellow'

  }

  const badgeStyle = {
    backgroundColor: groupColors[groupName],
  }
  return (
    <>
      <Badge style={badgeStyle}>{groupName}</Badge>
      {'   '}
    </>
  )
}

const DisplayTopCandidate = ({ candidate, index, setCurrentCandidate, setting }) => {
  const groups = Array.from(new Set(candidate.years.map(year => year.group.toLowerCase())))
  const groupBadges = groups.map(group => (
    <GroupBadge groupName={group} key={group + candidate.name} />
  ))
  return (
    <div>
      <span
        className="candidate"
        key={candidate.name}
        onClick={() => setCurrentCandidate(candidate.name)}
      >
        {index + 1}. {candidate.name}
        {'  '}
        {groupBadges}
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
    </div>
  )
}

const DisplayTopCandidates = ({ candidates, setting, filter, setCurrentCandidate }) => {
  return (
    <div>
      {candidates.map((candidate, index) =>
        JSON.stringify(candidate)
          .toLowerCase()
          .includes(filter) ? (
          <DisplayTopCandidate
            candidate={candidate}
            index={index}
            setCurrentCandidate={setCurrentCandidate}
            setting={setting}
            key={candidate.name}
          />
        ) : (
          ''
        ),
      )}
    </div>
  )
}

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
    sortedCandidateList = candidateList.sort(compare).slice(0, 600)
  } else {
    sortedCandidateList = candidateList
      .sort(compareByElection)
      .filter(c => c.times > 1)
      .slice(0, 300)
  }

  return (
    <div>
      <MenuButtons current={setting} setCurrent={setSetting} options={settings} />
      <FilterForm filter={filter} setFilter={setFilter} />

      <DisplayTopCandidates
        candidates={sortedCandidateList}
        setting={setting}
        filter={filter}
        setCurrentCandidate={setCurrentCandidate}
      />
    </div>
  )
}

export default TopCandidates
