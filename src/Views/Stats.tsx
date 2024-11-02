import styled from "styled-components";
import React from "react";
import { TGroupedAlliance, useGetData } from "../hooks/useGetData";
import { ResponsiveLine, Serie } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import { mergeAll, keys, uniq, without } from "ramda";

const StyledStats = styled.div`
  width: 100%;
  min-height: 40rem;
`;

const StyledBar = styled.div`
  height: 20rem;
`;

const LineChart: React.FC<{ data: Serie[] }> = ({ data, ...rest }) => (
  <ResponsiveLine
    // keys={without(["year"], uniq(keys(mergeAll(barData))))}
    data={data}
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: false,
      reverse: false,
    }}
    colors={{
      datum: "color",
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "year",
      legendOffset: 36,
      legendPosition: "middle",
      truncateTickAt: 0,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "seats",
      legendOffset: -40,
      legendPosition: "middle",
      truncateTickAt: 0,
    }}
    pointSize={5}
    pointBorderWidth={2}
    pointLabel="data.yFormatted"
    pointLabelYOffset={-12}
    enableTouchCrosshair={true}
    useMesh={true}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    {...rest}
  />
);

export const Stats: React.FC<{ filter: string }> = ({ filter }) => {
  const { byCoalition, byGroup } = useGetData();

  const barData = Object.values(byGroup)
    .flat()
    .reduce(
      (
        acc: ({ year: number } & Record<string, number>)[],
        group: TGroupedAlliance,
      ) => {
        const existingYear = acc.find((a) => a.year === group.year);
        if (existingYear) {
          existingYear[group.name] = group.seats;
        } else {
          acc.push({
            year: group.year,
            [group.name]: group.seats,
          });
        }
        return acc;
      },
      [] as Serie[],
    );

  const lineData = Object.values(byCoalition)
    .filter((a) => JSON.stringify(a).toLowerCase().includes(filter))
    .map((allianceYears) => ({
      id: allianceYears[0].name,
      color: allianceYears[0].coalition.color,
      data: allianceYears
        // @ts-expect-error afad
        .map((year) => ({
          x: +year.year,
          y: +year.seats,
        }))
        .sort((a, b) => +a.x - +b.x),
    }));

  const allianceLineData = Object.values(byGroup)
    .filter((years: { seats: number }[]) => {
      const hasAnySpotsEver = years.some((year) => year.seats > 0);

      return hasAnySpotsEver;
    })
    .filter((a) => JSON.stringify(a).toLowerCase().includes(filter))
    .map((allianceYears) => ({
      id: allianceYears[0].name,
      color: allianceYears[0].alliance.color,
      data: allianceYears
        // @ts-expect-error afad
        .map((year) => ({
          x: +year.year,
          y: +year.seats,
        }))
        .sort((a, b) => +a.x - +b.x),
    }));
  return (
    <StyledStats>
      <StyledBar>
        <LineChart data={allianceLineData} />
        <LineChart
          data={lineData}
          // keys={without(["year"], uniq(keys(mergeAll(barData))))}
        />
        <ResponsiveBar
          data={barData as Serie[]}
          keys={without(["year"], uniq(keys(mergeAll(barData))))}
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          indexBy={"year"}
        />
      </StyledBar>
    </StyledStats>
  );
};
