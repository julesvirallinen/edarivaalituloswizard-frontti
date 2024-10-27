import React from "react";
import styled from "styled-components";
import { Coalition } from "../types/candidate";
import { getGroupColor } from "./GroupName";
import { PieChart } from "./PieChart";

const StyledPie = styled(PieChart)`
  width: 20rem;
  height: 20rem;
`;

const ElectionPie = styled.div`
  min-height: 20rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

type CoalitionPiesProps = {
  coalitions: Coalition[];
  activeCoalitionState: [string, React.Dispatch<React.SetStateAction<string>>];
};

export const CoalitionPies: React.FC<CoalitionPiesProps> = ({
  coalitions,
  activeCoalitionState,
}) => {
  const activeCoalition =
    coalitions.find(
      (coalition) => coalition.name === activeCoalitionState[0],
    ) || coalitions[0];

  const alliancePieData = activeCoalition.children
    .map((coalition) => ({
      id: coalition.name,
      label: `${coalition.name} (${coalition.seats})`,
      value: coalition.seats,
      color: getGroupColor(coalition.name),
    }))
    .sort((a, b) => a.id.localeCompare(b.id));

  return (
    <ElectionPie>
      <StyledPie
        data={[
          ...coalitions.map((coalition) => ({
            id: coalition.name,
            label: coalition.name,
            value: coalition.seats,
            color: getGroupColor(coalition.children[0].name),
          })),
        ]}
        activeId={activeCoalitionState[0]}
        setActiveId={activeCoalitionState[1]}
      />
      <StyledPie data={alliancePieData} />
    </ElectionPie>
  );
};
