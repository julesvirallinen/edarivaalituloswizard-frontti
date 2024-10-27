// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import React from "react";
import { ResponsivePie } from "@nivo/pie";

type PieProps = {
  setActiveId?: (id: string) => void;
  activeId?: string;
  data: unknown[];
};

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const PieChart: React.FC<PieProps> = ({
  data /* see data tab */,
  setActiveId,
  activeId,
}) => (
  <ResponsivePie
    data={data}
    activeId={activeId}
    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    onActiveIdChange={(id) => setActiveId && id && setActiveId(id?.toString())}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 2]],
    }}
    colors={({ data }) => data["color"]}
    defs={[
      {
        background: "#43D45B",
        color: "#d06a6a",
        id: "dots",
        type: "patternDots",
        size: 24,
        padding: 18,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: "MP",
        },
        id: "dots",
      },
    ]}
    // legends={[
    //   {
    //     anchor: "bottom",
    //     direction: "row",
    //     justify: false,
    //     translateX: 0,
    //     translateY: 56,
    //     itemsSpacing: 0,
    //     itemWidth: 100,
    //     itemHeight: 18,
    //     itemTextColor: "#999",
    //     itemDirection: "left-to-right",
    //     itemOpacity: 1,
    //     symbolSize: 18,
    //     symbolShape: "circle",
    //     effects: [
    //       {
    //         on: "hover",
    //         style: {
    //           itemTextColor: "#000",
    //         },
    //       },
    //     ],
    //   },
    // ]}
  />
);
