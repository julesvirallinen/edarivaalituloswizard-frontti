import React from "react";
import { Badge } from "reactstrap";
import styled from "styled-components";
import { GROUP_MAPPINGS } from "../data/groupMappings";

const StyledBadge = styled(Badge)`
  background-color: ${(props) => props.color};
`;

export const GroupBadge = ({ groupName }: { groupName: string }) => {
  const lowerCase = groupName.toLowerCase();
  return (
    <>
      <StyledBadge color={GROUP_MAPPINGS[lowerCase]}>{groupName}</StyledBadge>
    </>
  );
};
