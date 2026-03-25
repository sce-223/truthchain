import type { VoteChoice } from "@/lib/types";

export const buildVoteMemo = (newsId: string, choice: VoteChoice) =>
  `NEWS_${newsId}_${choice}`;

export const parseVoteMemo = (memo: string) => {
  const matched = memo.match(/^NEWS_([^_]+)_(REAL|FAKE)$/);

  if (!matched) {
    return null;
  }

  return {
    newsId: matched[1],
    choice: matched[2] as VoteChoice,
  };
};
