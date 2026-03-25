import { NEWS_ITEMS, createEmptyConsensusMap } from "@/lib/news";
import { parseVoteMemo } from "@/lib/memo";
import type { NewsConsensus } from "@/lib/types";

type HorizonTransactionRecord = {
  memo?: string;
};

export const tallyConsensus = (
  transactions: HorizonTransactionRecord[],
): Record<string, NewsConsensus> => {
  const consensusMap = createEmptyConsensusMap();
  const knownIds = new Set(NEWS_ITEMS.map((item) => item.id));

  for (const transaction of transactions) {
    if (!transaction.memo) {
      continue;
    }

    const parsed = parseVoteMemo(transaction.memo);

    if (!parsed || !knownIds.has(parsed.newsId)) {
      continue;
    }

    if (parsed.choice === "REAL") {
      consensusMap[parsed.newsId].realCount += 1;
    } else {
      consensusMap[parsed.newsId].fakeCount += 1;
    }
  }

  for (const item of NEWS_ITEMS) {
    const entry = consensusMap[item.id];
    entry.total = entry.realCount + entry.fakeCount;
    entry.realPercent =
      entry.total === 0 ? 0 : Math.round((entry.realCount / entry.total) * 100);
    entry.fakePercent =
      entry.total === 0 ? 0 : Math.round((entry.fakeCount / entry.total) * 100);
  }

  return consensusMap;
};
