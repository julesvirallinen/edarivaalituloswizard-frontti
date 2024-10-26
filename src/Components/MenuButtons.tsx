import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

type MenuButtonsProps = {
  setCurrent: Dispatch<SetStateAction<any>>;
  current: any;
  options: any[];
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

const MenuButtons = ({ setCurrent, current, options }: MenuButtonsProps) => {
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
