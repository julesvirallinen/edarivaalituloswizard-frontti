import React, { useState } from "react";
import { Card, CardHeader, Collapse, CardBody } from "reactstrap";
import {
  Alliance,
  Coalition,
  TElectionDataCandidate,
} from "../types/candidate";
import { GroupBadge } from "./GroupName";
import styled from "styled-components";

type ViewCandidateProps = {
  candidate: TElectionDataCandidate;
  setCurrentCandidate: (candidate: string) => void;
};

const ViewCandidate: React.FC<ViewCandidateProps> = ({
  candidate,
  setCurrentCandidate,
}) => {
  let candidateName = candidate.name.replace(/\s/g, "");
  //   var nickname = ''
  if (candidateName.includes("'")) {
    // nickname = candidateName.split("'")[1].split("'")[0]
    candidateName = candidateName.split("'")[0];
  }
  const nameParts = candidateName.split(",");
  candidateName = `${nameParts[1]} ${nameParts[0]}`;

  return (
    <div>
      <span
        className="candidate"
        onClick={() => setCurrentCandidate(candidateName)}
      >
        {candidateName} / {candidate.value} {candidate.seats ? "/ ★" : ""}
      </span>
    </div>
  );
};

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

type InfoCardProps = {
  votes: number;
  candidates?: number;
  seats: number;
};

const InfoCard: React.FC<InfoCardProps> = ({ votes, candidates, seats }) => {
  return (
    <Stats className="statBox">
      <b>{seats}</b>
      <span>🗳️:{votes}</span>
      {candidates ? <span>👤:{candidates}</span> : ""}
    </Stats>
  );
};

type ViewGroupProps = {
  group: Alliance;
  setCurrentCandidate: (candidate: string) => void;
  filter: string;
};

const ViewGroup: React.FC<ViewGroupProps> = ({
  group,
  setCurrentCandidate,
  filter,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const divStyle = {
    marginTop: "5px",
    // padding: '5px'
  };

  const candidateCount = group.children.length;

  return (
    <div style={divStyle}>
      <Card>
        <CardHeader onClick={() => toggle()}>
          <b>
            <GroupBadge groupName={group.name} />
          </b>
          <InfoCard
            seats={group.seats}
            votes={group.value}
            candidates={candidateCount}
          />
        </CardHeader>
        <Collapse isOpen={isOpen}>
          <CardBody>
            {group.children.map((candidate) =>
              candidate.name.toLowerCase().includes(filter) ? (
                <ViewCandidate
                  candidate={candidate}
                  key={candidate.name}
                  setCurrentCandidate={setCurrentCandidate}
                />
              ) : (
                ""
              ),
            )}
          </CardBody>
        </Collapse>
      </Card>
    </div>
  );
};

type ViewCoalitionProps = {
  coalition: Coalition;
  setCurrentCandidate: (candidate: string) => void;
  filter: string;
};

export const ViewCoalition: React.FC<ViewCoalitionProps> = ({
  coalition,
  setCurrentCandidate,
  filter,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  let candidateCount = 0;
  coalition.children.forEach(
    (child) => (candidateCount += child.children.length),
  );

  const divStyle = {
    marginTop: "10px",
  };

  return (
    <div style={divStyle}>
      <Card>
        <CardHeader onClick={() => toggle()}>
          <b>{coalition.name}</b>
          <InfoCard
            seats={coalition.seats}
            votes={coalition.value}
            candidates={candidateCount}
          />
        </CardHeader>
        <Collapse isOpen={isOpen}>
          <CardBody>
            {coalition.children.map((group) =>
              JSON.stringify(group).toLowerCase().includes(filter) ? (
                <ViewGroup
                  group={group}
                  key={group.name}
                  setCurrentCandidate={setCurrentCandidate}
                  filter={
                    group.name.toLowerCase().includes(filter) ? "" : filter
                  }
                />
              ) : (
                ""
              ),
            )}
          </CardBody>
        </Collapse>
      </Card>
    </div>
  );
};
