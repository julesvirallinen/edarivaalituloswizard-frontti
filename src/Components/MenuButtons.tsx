import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

type MenuButtonsProps<T extends string | number> = {
  setCurrent: Dispatch<SetStateAction<T>>;
  current: T;
  options: T[];
};

const Menu = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
  font-weight: bold;
  span {
    margin: 0 1rem;
    cursor: pointer;
  }
`;

const MenuButtons = <T extends string | number>({
  setCurrent,
  current,
  options,
}: MenuButtonsProps<T>) => {
  const yearStyle = {
    color: "gray",
  };

  return (
    <Menu>
      {options.map((year) => (
        <span
          style={current !== year ? yearStyle : undefined}
          key={year}
          onClick={() => setCurrent(year)}
        >
          {year}
        </span>
      ))}
    </Menu>
  );
};

export default MenuButtons;
