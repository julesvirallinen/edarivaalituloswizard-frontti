import React, { useState } from "react";
import MenuButtons from "../Components/MenuButtons";
import FilterForm from "../Components/FilterForm";
import { YEARS } from "../dataUtils/years";
import styled from "styled-components";
import { TCandidate } from "../types/candidate";
import { useGetData } from "../hooks/useGetData";
import { GroupBadge } from "../Components/GroupName";

type TCandidateProps = {
  candidates: TCandidate[];
  setting: "votes" | "average" | "year";
  filter: string;
  setCurrentCandidate: (candidate: string) => void;
  selectedYear: number;
};

type TDisplayTopCandidateProps = {
  candidate: TCandidate;
  index: number;
  setting: "votes" | "average" | "year";
  setCurrentCandidate: (candidate: string) => void;
  selectedYear: number;
};

const Candidate = styled.span`
  display: flex;
  gap: 0.5rem;
`;

const getYear = (candidate: TCandidate, year: number) => {
  return candidate.years.find((y) => y.year === year);
};

const DisplayTopCandidate = ({
  candidate,
  index,
  setCurrentCandidate,
  setting,
  selectedYear,
}: TDisplayTopCandidateProps) => {
  let groups = Array.from(
    new Set(
      Object.values(candidate.years).map((year) => year.group.toLowerCase()),
    ),
  );

  if (setting === "year")
    groups = [getYear(candidate, selectedYear).group.toLowerCase()];

  const groupBadges = groups.map((group) => (
    <GroupBadge groupName={group} key={group + candidate.name} />
  ));

  const basicData = (
    <>
      {index + 1}. {candidate.name}
      {groupBadges}
    </>
  );

  return (
    <div>
      <Candidate
        className="candidate"
        key={candidate.name}
        onClick={() => setCurrentCandidate(candidate.name)}
      >
        {basicData}
        {setting === "votes" ? (
          <span>
            <b>{candidate.totalVotes}</b> <i>{candidate.times}x</i>
          </span>
        ) : setting === "average" ? (
          <span>
            {candidate.totalVotes}/<i>{candidate.times}</i> ={" "}
            <b>{Math.round(candidate.totalVotes / candidate.times)}</b>
          </span>
        ) : (
          <span>
            <b>{getYear(candidate, selectedYear).votes}</b>
          </span>
        )}
        <br />
      </Candidate>
    </div>
  );
};

const filterCandidate =
  (filter: string, year?: number) => (candidate: TCandidate) => {
    return (
      (
        JSON.stringify(year ? candidate.years[year] : candidate) +
        candidate.name
      )
        .toLowerCase()
        .includes(filter) || candidate.name.toLowerCase().includes(filter)
    );
  };

const DisplayTopCandidates = ({
  candidates,
  setting,
  filter,
  setCurrentCandidate,
  selectedYear,
}: TCandidateProps) => {
  const filteredCandidates = candidates.filter(
    filterCandidate(filter, setting === "year" ? selectedYear : undefined),
  );
  return (
    <div>
      {filteredCandidates.map((candidate, index) => (
        <DisplayTopCandidate
          candidate={candidate}
          index={index}
          setCurrentCandidate={setCurrentCandidate}
          setting={setting}
          key={candidate.name}
          selectedYear={selectedYear}
        />
      ))}
    </div>
  );
};

type TopCandidatesProps = {
  setCurrentCandidate: (candidate: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
};

const TopCandidates = ({
  setCurrentCandidate,
  filter,
  setFilter,
}: TopCandidatesProps) => {
  const { candidateList } = useGetData();

  const settings = ["votes", "average", "year"];

  const [setting, setSetting] = useState<"votes" | "average" | "year">("votes");
  const [selectedYear, setSelectedYear] = useState(2024);

  if (candidateList.length === 0) return "";

  function compare(a: TCandidate, b: TCandidate) {
    return b.totalVotes - a.totalVotes;
  }

  function compareByYear(year: number) {
    return function compare(a: TCandidate, b: TCandidate) {
      return getYear(b, year).votes - getYear(a, year).votes;
    };
  }

  function compareAverage(a: TCandidate, b: TCandidate) {
    return b.totalVotes / b.times - a.totalVotes / a.times;
  }
  let sortedCandidateList = [...candidateList];

  if (setting === "votes") {
    sortedCandidateList = sortedCandidateList.sort(compare).slice(0, 600);
  } else if (setting === "average") {
    sortedCandidateList = candidateList
      .sort(compareAverage)
      .filter((c) => c.times > 1)
      .slice(0, 300);
  } else if (setting === "year") {
    sortedCandidateList = sortedCandidateList.filter((c) => {
      const years = c.years.map((y) => y.year);
      return years.includes(selectedYear);
    });
    sortedCandidateList = sortedCandidateList.sort(compareByYear(selectedYear));
  }

  return (
    <div>
      <>
        <FilterForm filter={filter} setFilter={setFilter} />
        <MenuButtons
          current={setting}
          setCurrent={setSetting}
          options={settings}
        />
      </>
      {setting === "year" && (
        <MenuButtons
          current={selectedYear}
          setCurrent={setSelectedYear}
          options={YEARS}
        />
      )}
      <DisplayTopCandidates
        candidates={sortedCandidateList}
        setting={setting}
        filter={filter}
        setCurrentCandidate={setCurrentCandidate}
        selectedYear={selectedYear}
      />
    </div>
  );
};

export default TopCandidates;
