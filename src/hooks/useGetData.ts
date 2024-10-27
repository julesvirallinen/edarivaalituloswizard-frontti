import yearlyData from "../data/yearlyData.json";
import candidateData from "../data/byCandidate.json";
import { TCandidate } from "../types/candidate";

export const useGetData = () => {
  const getCandidate = (name: string): TCandidate => {
    return candidateData[name];
  };

  const YEARS = Object.keys(yearlyData).map((year) =>
    parseInt(year),
  ) as unknown as (keyof typeof yearlyData)[];

  const candidateList: TCandidate[] = Object.values(candidateData);

  return { getCandidate, yearlyData, candidateData, candidateList, YEARS };
};
