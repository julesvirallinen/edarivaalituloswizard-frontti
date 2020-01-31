import React, { useState } from 'react'
import { Collapse, Badge, CardBody, Card, CardHeader } from 'reactstrap'

const ViewCandidate = ({ candidate, setCurrentCandidate }) => {
  var candidateName = candidate.name.replace(/\s/g, '')
  var nickname = ''
  if (candidateName.includes("'")) {
    nickname = candidateName.split("'")[1].split("'")[0]
    candidateName = candidateName.split("'")[0]
  }
  const nameParts = candidateName.split(',')
  candidateName = `${nameParts[1]} ${nameParts[0]}`

  return (
    <div>
      <span
        className="candidate"
        onClick={() => setCurrentCandidate(candidateName)}
      >
        {candidateName} / {candidate.value} {candidate.seats ? '/ ★' : ''}
      </span>
    </div>
  )
}

const ViewGroup = ({ group, setCurrentCandidate, filter }) => {
  const divStyle = {
    margin: '10px'
  }

  return (
    <div style={divStyle}>
      <h3>{group.name}</h3>
      Votes: {group.value} Seats: {group.seats}
      <br />
      {group.children.map(candidate =>
        candidate.name.toLowerCase().includes(filter) ? (
          <ViewCandidate
            candidate={candidate}
            key={candidate.name}
            setCurrentCandidate={setCurrentCandidate}
          />
        ) : (
          ''
        )
      )}
    </div>
  )
}

const ViewCoalition = ({ coalition, setCurrentCandidate, filter }) => {
  const [isOpen, setIsOpen] = useState(true)

  const toggle = () => setIsOpen(!isOpen)

  const divStyle = {
    marginTop: '10px'
  }

  return (
    <div style={divStyle}>
      <Card>
        <CardHeader onClick={() => toggle()}>
          <h4>
            {coalition.name} <Badge color="warning">{coalition.seats}</Badge>
          </h4>
        </CardHeader>
        <Collapse isOpen={isOpen}>
          <CardBody>
            Votes: {coalition.value} Seats: {coalition.seats}
            {coalition.children.map(group =>
              JSON.stringify(group)
                .toLowerCase()
                .includes(filter) ? (
                <ViewGroup
                  group={group}
                  key={group.name}
                  setCurrentCandidate={setCurrentCandidate}
                  filter={filter}
                />
              ) : (
                ''
              )
            )}
          </CardBody>
        </Collapse>
      </Card>
    </div>
  )
}

const ElectionData = ({ candidateData, setCurrentCandidate, filter }) => {
  if (candidateData === undefined) return ''

  return (
    <>
      {candidateData.children.map(coalition =>
        JSON.stringify(coalition)
          .toLowerCase()
          .includes(filter) ? (
          <ViewCoalition
            coalition={coalition}
            key={coalition.name}
            setCurrentCandidate={setCurrentCandidate}
            filter={filter}
          />
        ) : (
          ''
        )
      )}
    </>
  )
}

export default ElectionData
