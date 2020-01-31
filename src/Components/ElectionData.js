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
      <span className="candidate" onClick={() => setCurrentCandidate(candidateName)}>
        {candidateName} / {candidate.value} {candidate.seats ? '/ ★' : ''}
      </span>
    </div>
  )
}

const InfoCard = ({ votes, candidates }) => {
  return (
    <Card className="statBox">
      <span>
      🗳️:<Badge color="default">{votes}</Badge> 
        {candidates ? <span>👤:<Badge color="default">{candidates}</Badge></span> : ''}
      </span>
    </Card>
  )
}

const ViewGroup = ({ group, setCurrentCandidate, filter }) => {
  const [isOpen, setIsOpen] = useState(true)
  const toggle = () => setIsOpen(!isOpen)

  const divStyle = {
    marginTop: '5px',
    // padding: '5px'
  }

  const cardStyle = {
    display: 'inline-block',
    padding: '5px',
    marginLeft: '20px',
  }

  const candidateCount = group.children.length

  return (
    <div style={divStyle}>
      <Card>
        <CardHeader onClick={() => toggle()}>
          <h5>
            {group.name} <Badge color="danger">{group.seats}</Badge>
          </h5>
          <InfoCard votes={group.value} candidates={candidateCount}/>
        </CardHeader>
        <Collapse isOpen={isOpen}>
          <CardBody>
            {group.children.map(candidate =>
              candidate.name.toLowerCase().includes(filter) ? (
                <ViewCandidate
                  candidate={candidate}
                  key={candidate.name}
                  setCurrentCandidate={setCurrentCandidate}
                />
              ) : (
                ''
              ),
            )}
          </CardBody>
        </Collapse>
      </Card>
    </div>
  )
}

const ViewCoalition = ({ coalition, setCurrentCandidate, filter }) => {
  const [isOpen, setIsOpen] = useState(true)

  const toggle = () => setIsOpen(!isOpen)

  const divStyle = {
    marginTop: '10px',
  }

  const cardStyle = {
    display: 'inline-block',
    padding: '5px',
    marginLeft: '20px',
  }

  //   console.log(coalition.children.reduce((a,b) => a+b))
  //   console.log(coalition.children.map(child => (console.log(child.children.length))))

  return (
    <div style={divStyle}>
      <Card>
        <CardHeader onClick={() => toggle()}>
          <h4>
            {coalition.name} <Badge color="warning">{coalition.seats}</Badge>
          </h4>
          <InfoCard votes={coalition.value}/>
        </CardHeader>
        <Collapse isOpen={isOpen}>
          <CardBody>
            {coalition.children.map(group =>
              JSON.stringify(group)
                .toLowerCase()
                .includes(filter) ? (
                <ViewGroup
                  group={group}
                  key={group.name}
                  setCurrentCandidate={setCurrentCandidate}
                  filter={group.name.toLowerCase().includes(filter) ? '' : filter}
                />
              ) : (
                ''
              ),
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
            filter={coalition.name.toLowerCase().includes(filter) ? '' : filter}
          />
        ) : (
          ''
        ),
      )}
    </>
  )
}

export default ElectionData
