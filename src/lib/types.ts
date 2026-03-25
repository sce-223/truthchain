export type VoteChoice = "REAL" | "FAKE";

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  content: string[];
  createdAt: string;
  publisher: string;
  category: string;
  region: string;
  claim: string;
  sourceUrl: string;
  sourceLabel: string;
};

export type NewsConsensus = {
  newsId: string;
  realCount: number;
  fakeCount: number;
  total: number;
  realPercent: number;
  fakePercent: number;
};

export type VoteReceipt = {
  hash: string;
  memo: string;
  ledger: number;
  createdAt: string;
};

export type VoteMode = "demo" | "wallet";
