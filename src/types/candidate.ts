export type Year = {
  year: number;
  votes: number;
  elected: number;
  coalition: string;
  group: string;
  nickname?: string;
};

export type TCandidate = {
  name: string;
  totalVotes: number;
  times: number;
  years: Year[];
};

export type TElectionDataCandidate = {
  name: string;
  value: number;
  seats: number;
  role: string;
  co_prop: number;
  al_prop: number;
};

export type Alliance = {
  name: string;
  seats: number;
  value: number;
  children: TElectionDataCandidate[];
};

export type Coalition = {
  name: string;
  value: number;
  seats: number;
  children: Alliance[];
};
