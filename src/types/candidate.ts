export type Year = {
  year: number
  votes: number
  elected: boolean
  coalition: string
  group: string
  nickname?: string
}

export type TCandidate = {
  name: string
  totalVotes: number
  times: number
  years: Year[]
}
