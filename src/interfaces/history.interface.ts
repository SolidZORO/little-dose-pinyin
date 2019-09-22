export interface IHistory {
  timestamp: number;
  score: number;
  examRange: string[];
  rawChars: string[];
  inputChars: string[];
  rightChars: string[];
  wrongChars: string[];
}

export interface IHistoryStorage {
  historyName: string;
  data: IHistory[];
}
