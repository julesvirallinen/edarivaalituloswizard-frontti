import React from "react";
import { useGetData } from "../hooks/useGetData";

type ViewCancidateProps = {
  currentCandidate: string;
  setCurrentCandidate: (candidate: string) => void;
};

const ViewSingleCandidate = ({
  currentCandidate,
  setCurrentCandidate,
}: ViewCancidateProps) => {
  const { getCandidate } = useGetData();
  const candidate = getCandidate(currentCandidate);
  if (candidate === undefined) return "";
  const nicknames = Array.from(
    new Set(Object.values(candidate.years).map((year) => year.nickname)),
  ).filter(Boolean);

  const formatNicknames = nicknames.map(
    (item, index) => (index ? ", " : "") + item,
  );

  return (
    <div>
      <h1>{currentCandidate}</h1>
      {nicknames.length !== 0 ? <h2>({formatNicknames})</h2> : ""}
      Total votes: {candidate.totalVotes} <br />
      Times up for election: {candidate.times}
      {Object.values(candidate.years).map((year) => (
        <div key={year.year}>
          <b>{year.year} </b>
          votes: {year.votes} {year.elected ? "/ ★" : ""} ({year.coalition}/
          {year.group})
          <br />
        </div>
      ))}
      <button onClick={() => setCurrentCandidate("")}>Return </button>
    </div>
  );
};

export default ViewSingleCandidate;
