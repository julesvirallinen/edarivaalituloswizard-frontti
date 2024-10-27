import React, { useState } from "react";
import { useGetData } from "../hooks/useGetData";
import MenuButtons from "../Components/MenuButtons";
import { ViewCoalition } from "../Components/Coalition";

type ElectionDataProps = {
  setCurrentCandidate: (candidate: string) => void;
  filter: string;
};

const ElectionData: React.FC<ElectionDataProps> = ({
  setCurrentCandidate,
  filter,
}) => {
  const { yearlyData, YEARS } = useGetData();
  const latestYear = YEARS[YEARS.length - 1];
  const [currentYear, setCurrentYear] = useState(latestYear);

  const selectedYear = yearlyData[currentYear as keyof typeof yearlyData];

  return (
    <>
      <MenuButtons
        setCurrent={setCurrentYear}
        current={currentYear}
        options={YEARS}
      />
      {selectedYear.children.map((coalition) =>
        JSON.stringify(coalition).toLowerCase().includes(filter) ? (
          <ViewCoalition
            coalition={coalition}
            key={coalition.name}
            setCurrentCandidate={setCurrentCandidate}
            filter={coalition.name.toLowerCase().includes(filter) ? "" : filter}
          />
        ) : (
          ""
        ),
      )}
    </>
  );
};

export default ElectionData;
