import React, { Dispatch, SetStateAction } from "react";

type MenuButtonsProps<T = unknown> = {
  setCurrent: Dispatch<SetStateAction<any>>;
  current: any;
  options: any[];
};

const MenuButtons = ({ setCurrent, current, options }: MenuButtonsProps) => {
  const yearStyle = {
    color: "gray",
  };

  return (
    <h1>
      {options.map((year) => (
        <span
          style={current !== year ? yearStyle : undefined}
          key={year}
          onClick={() => setCurrent(year)}
        >
          {year}
        </span>
      ))}
    </h1>
  );
};

export default MenuButtons;
