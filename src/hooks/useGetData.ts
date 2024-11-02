import yearlyData from "../data/yearlyData.json";
import candidateData from "../data/byCandidate.json";
import { TCandidate } from "../types/candidate";
import * as R from "ramda";

type GroupDef = {
  name: string;
  aliases: string[];
  color: string;
  isGroup?: (group: unknown) => boolean;
};

const SITVAS = {
  name: "SitVas",
  aliases: ["SitVas", "Sitvas"],
  color: "#D44343",
};

const Kokoomus = {
  name: "Kokoomus",
  aliases: ["Kok", "Kok.", "KOK"],
  color: "#0800FF",
};

const Kesk = {
  name: "Keskusta",
  aliases: ["Kesk", "Keskusta"],
  color: "#43A15B",
};

const HyVi = {
  name: "HYY:n Vihreät",
  aliases: ["HyVi"],
  color: "#43D45B",
};

const HYAL = {
  name: "HYAL",
  aliases: ["HYAL", "HYALTs"],
  isGroup: (group) => group.coalition === "HYAL",
  color: "#C76AD5",
};

const HELP = {
  name: "HELP",
  aliases: ["HELP", "Help"],
  isGroup: (group) => group.coalition === "HELP",
  color: "#E0C342",
};

const MP = {
  name: "Maailmanpyörä",
  aliases: ["MP", "MPTsem"],
  color: "#D44343",
};

const LIB = {
  name: "Liberaalit",
  aliases: ["Lib", "LIB", "Liber", "Liberaalit"],
  color: "#457EAC",
};

const Perus = {
  name: "Perus",
  aliases: ["Perus", "PerusS", "PS"],
  color: "#856404",
};

const Tsemppi = {
  name: "Tsemppi",
  aliases: ["Tsemppi", "Tsempp"],
  color: "#99779E",
};

const Edistykselliset = {
  name: "Edistykselliset",
  aliases: ["Edist", "Edis", "OikeaS", "Edisty", "Maltil"],
  color: "#0800FF",
};

const Piraatit = {
  name: "Piraatit",
  aliases: ["PIR", "Pir", "Piraat"],
  color: "#856404",
};

const Keskusta = {
  name: "Keskusta",
  aliases: ["Kesk", "Keskusta", "Kesk."],
  color: "#457EAC",
};

const SD = {
  name: "OSY",
  aliases: ["SD", "OSY", "sd"],
  color: "#006C67",
};

const Osakunnat = {
  name: "Osakunnat",
  aliases: ["Osak", "Os-SNÄ"],
  isGroup: (group) => group.coalition === "Osakunnat" && group.name !== "SNÄf",
  color: "#99779E",
};

const SNÄF = {
  name: "SNÄf",
  aliases: ["SNÄf"],
  isGroup: (group) => group.coalition === "SNÄf",
  color: "#ADF5BB",
};

const coalitions = [
  MP,
  SNÄF,
  LIB,
  HYAL,
  LIB,
  Perus,
  SD,
  Edistykselliset,
  Piraatit,
  Osakunnat,
  HELP,
];

const groups: GroupDef[] = [
  Tsemppi,
  Keskusta,
  Kokoomus,
  SITVAS,
  HyVi,
  HYAL,
  SD,
  Kesk,
  ...coalitions,
];

export type TGroupedAlliance = {
  alliance: GroupDef;
  coalition: string;
  ogNames?: string[];
  year: number;
  name: string;
  seats: number;
  votes: number;
};

export const useGetData = () => {
  const getCandidate = (name: string): TCandidate => {
    return candidateData[name];
  };

  const YEARS = Object.keys(yearlyData).map((year) =>
    parseInt(year),
  ) as unknown as (keyof typeof yearlyData)[];

  const candidateList: TCandidate[] = Object.values(candidateData);

  const allCoalitions = Object.entries(yearlyData)
    .map(([year, data]) => {
      return data.children.map(
        (
          coalition: (typeof yearlyData)["2012"]["children"][number],
        ): {
          coalition: GroupDef;
          year: number;
          name: string;
          seats: number;
          votes: number;
          alliances: TGroupedAlliance[];
        } => {
          const coalitionData = coalitions.find((c) =>
            c.aliases.includes(coalition.name),
          ) || {
            name: coalition.name,
            aliases: [],
            color:
              // random color
              "#" + Math.floor(Math.random() * 16777215).toString(16),
          };
          return {
            coalition: coalitionData,
            year: +year,
            name: coalitionData.name,
            seats: coalition.seats,
            votes: coalition.value,
            alliances: coalition.children
              .map((alliance): TGroupedAlliance & { ogName: string } => {
                const group = groups.find((g) =>
                  g.isGroup
                    ? g.isGroup({
                        coalition: coalitionData.name,
                        name: alliance.name,
                      })
                    : g.aliases.includes(alliance.name),
                ) || {
                  name: alliance.name,
                  aliases: [],
                  color:
                    "#" + Math.floor(Math.random() * 16777215).toString(16),
                };
                return {
                  alliance: group,
                  coalition: coalitionData.name,
                  ogName: alliance.name,
                  year: +year,
                  name: group.name,
                  seats: alliance.seats,
                  votes: alliance.value,
                };
              })
              .reduce(
                (acc, alliance) => {
                  const existing = acc.find((a) => a.name === alliance.name);
                  if (existing) {
                    existing.seats += alliance.seats;
                    existing.votes += alliance.votes;
                    existing.ogNames ??= [];
                    existing.ogNames.push(alliance.ogName);
                  } else {
                    acc.push({
                      ...R.without(["ogName"], alliance),
                      ogNames: [alliance.ogName],
                    });
                  }

                  return acc;
                },
                [] as (Omit<TGroupedAlliance, "ogName"> & {
                  ogNames: string[];
                })[],
              ),
          };
        },
      );
    })
    .flat();

  const allGroups = allCoalitions.map((co) => co.alliances).flat();
  const byCoalition = R.groupBy((co) => co.coalition.name, allCoalitions);
  const byGroup = R.groupBy((alliance) => alliance.alliance.name, allGroups);
  console.log("🚀 ~ useGetData ~ byGroup:", byGroup);

  return {
    getCandidate,
    yearlyData,
    candidateData,
    candidateList,
    YEARS,
    allCoalitions,
    byCoalition,
    byGroup,
  };
};
