import React from "react";
import { Badge } from "reactstrap";
import styled from "styled-components";
import { GROUP_MAPPINGS } from "../data/groupMappings";

const StyledBadge = styled(Badge)`
  background-color: ${(props) => props.color};
`;

export const getGroupColor = (groupName: string) => {
  const lowerCase = groupName.toLowerCase();
  return GROUP_MAPPINGS[lowerCase];
};

export const GroupBadge = ({ groupName }: { groupName: string }) => {
  const color = getGroupColor(groupName);
  return (
    <>
      <StyledBadge color={color}>{groupName}</StyledBadge>
    </>
  );
};
