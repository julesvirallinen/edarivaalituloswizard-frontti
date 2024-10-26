import React, { useState } from 'react'
import * as R from 'ramda'
import MenuButtons from './MenuButtons'
import FilterForm from './FilterForm'
import { Badge, Button } from 'reactstrap'

const GroupBadge = ({ groupName }) => {
  const groupColors = {
    tsempp: 'lightblue',
    studo: 'lightgreen',
    nation: 'lightgreen',
    stud: 'lightgreen',
    codtho: 'lightgreen',
    ämnesf: 'lightgreen',
    agrof: 'lightgreen',
    sitvas: 'red',
    hyvi: 'green',
    kok: 'blue',
    maltil: 'blue',
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
    meikku: 'purple',
    käytt: 'purple',
    ps: '#856404',
    peruss: '#856404',
    'kesk.': 'yellow',
    kesk: 'yellow',
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

const getYear = (candidate, year) => {
  return R.find(R.propEq('year', year))(candidate.years)
}
const DisplayTopCandidate = ({ candidate, index, setCurrentCandidate, setting, selectedYear }) => {
  var groups = Array.from(
    new Set(Object.values(candidate.years).map((year) => year.group.toLowerCase())),
  )

  if (setting === 'year') groups = [getYear(candidate, selectedYear).group.toLowerCase()]

  const groupBadges = groups.map((group) => (
    <GroupBadge groupName={group} key={group + candidate.name} />
  ))

  const basicData = (
    <>
      {index + 1}. {candidate.name}
      {'  '}
      {groupBadges}
    </>
  )

  return (
    <div>
      <span
        className="candidate"
        key={candidate.name}
        onClick={() => setCurrentCandidate(candidate.name)}
      >
        {basicData}
        {setting === 'votes' ? (
          <span>
            <b>{candidate.totalVotes}</b> <i>{candidate.times}x</i>
          </span>
        ) : setting === 'average' ? (
          <span>
            {candidate.totalVotes}/<i>{candidate.times}</i> ={' '}
            <b>{Math.round(candidate.totalVotes / candidate.times)}</b>
          </span>
        ) : (
          <span>
            <b>{getYear(candidate, selectedYear).votes}</b>
          </span>
        )}
        <br />
      </span>
    </div>
  )
}

const DisplayTopCandidates = ({
  candidates,
  setting,
  filter,
  setCurrentCandidate,
  selectedYear,
}) => {
  return (
    <div>
      {candidates.map((candidate, index) =>
        (
          JSON.stringify(setting === 'year' ? candidate.years[selectedYear] : candidate) +
          candidate.name
        )
          .toLowerCase()
          .includes(filter) ? (
          <DisplayTopCandidate
            candidate={candidate}
            index={index}
            setCurrentCandidate={setCurrentCandidate}
            setting={setting}
            key={candidate.name}
            selectedYear={selectedYear}
          />
        ) : (
          ''
        ),
      )}
    </div>
  )
}

const TopCandidates = ({ candidateData, setCurrentCandidate, filter, setFilter }) => {
  const [setting, setSetting] = useState('votes')
  const [selectedYear, setSelectedYear] = useState(2020)
  const settings = ['votes', 'average', 'year']

  const candidateList = Object.values(candidateData)
  if (candidateList.length === 0) return ''

  function compare(a, b) {
    return b.totalVotes - a.totalVotes
  }

  function compareByYear(year) {
    return function compare(a, b) {
      return getYear(b, year).votes - getYear(a, year).votes
    }
  }

  function compareAverage(a, b) {
    return b.totalVotes / b.times - a.totalVotes / a.times
  }
  var sortedCandidateList = [...candidateList]

  if (setting === 'votes') {
    sortedCandidateList = sortedCandidateList.sort(compare).slice(0, 600)
  } else if (setting === 'average') {
    sortedCandidateList = candidateList
      .sort(compareAverage)
      .filter((c) => c.times > 1)
      .slice(0, 300)
  } else if (setting === 'year') {
    sortedCandidateList = sortedCandidateList.filter((c) => {
      const years = c.years.map((y) => y.year)
      return years.includes(selectedYear)
    })
    sortedCandidateList = sortedCandidateList.sort(compareByYear(selectedYear))
    console.log(sortedCandidateList)
  }
  const yearStyle = { color: 'gray' }
  const yearSelectionButtons = (
    <p>
      View top candidates for year:{' '}
      {[2012, 2014, 2016, 2018, 2020, 2022, 2024].map((y) => (
        <b
          style={y !== selectedYear ? yearStyle : undefined}
          key={y}
          onClick={() => setSelectedYear(y)}
        >
          {y}
        </b>
      ))}
    </p>
  )

  const menuAndHeader = (
    <>
      <MenuButtons current={setting} setCurrent={setSetting} options={settings} />
      <FilterForm filter={filter} setFilter={setFilter} />
    </>
  )

  return (
    <div>
      {menuAndHeader}
      {setting === 'year' ? yearSelectionButtons : ''}
      <DisplayTopCandidates
        candidates={sortedCandidateList}
        setting={setting}
        filter={filter}
        setCurrentCandidate={setCurrentCandidate}
        selectedYear={selectedYear}
      />
    </div>
  )
}

export default TopCandidates
