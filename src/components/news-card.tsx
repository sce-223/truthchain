"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { getExplorerTxUrl } from "@/lib/explorer";
import type {
  NewsConsensus,
  NewsItem,
  VoteChoice,
  VoteMode,
  VoteReceipt,
} from "@/lib/types";

type NewsCardProps = {
  item: NewsItem;
  consensus: NewsConsensus;
  isSubmitting: boolean;
  voteMode: VoteMode;
  latestReceipt?: VoteReceipt;
  onVote: (newsId: string, choice: VoteChoice) => void;
};

const percentLabel = (value: number) => `${value}%`;

export function NewsCard({
  item,
  consensus,
  isSubmitting,
  voteMode,
  latestReceipt,
  onVote,
}: NewsCardProps) {
  return (
    <article className="newsCard">
      <div className="newsCard__header">
        <span className="newsCard__eyebrow">TIN #{item.id}</span>
        <a
          className="newsCard__source"
          href={item.sourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          {item.sourceLabel}
          <ExternalLink size={14} />
        </a>
      </div>

      <h2>{item.title}</h2>
      <p className="newsCard__summary">{item.summary}</p>
      <Link className="newsCard__detailLink" href={`/news/${item.id}`}>
        Xem chi tiết
      </Link>

      <div className="statsGrid">
        <div className="statBox statBox--real">
          <span>REAL</span>
          <strong>{consensus.realCount}</strong>
          <small>{percentLabel(consensus.realPercent)}</small>
        </div>
        <div className="statBox statBox--fake">
          <span>FAKE</span>
          <strong>{consensus.fakeCount}</strong>
          <small>{percentLabel(consensus.fakePercent)}</small>
        </div>
      </div>

      <div className="progressTrack" aria-hidden="true">
        <div
          className="progressTrack__real"
          style={{ width: `${consensus.realPercent}%` }}
        />
      </div>

      <div className="newsCard__footer">
        <button
          className="voteButton voteButton--real"
          disabled={isSubmitting}
          onClick={() => onVote(item.id, "REAL")}
          type="button"
        >
          {voteMode === "wallet" ? "Wallet REAL" : "Chọn REAL"}
        </button>
        <button
          className="voteButton voteButton--fake"
          disabled={isSubmitting}
          onClick={() => onVote(item.id, "FAKE")}
          type="button"
        >
          {voteMode === "wallet" ? "Wallet FAKE" : "Chọn FAKE"}
        </button>
      </div>

      {latestReceipt ? (
        <div className="receiptPanel">
          <span>Tx hash mới nhất</span>
          <code>{latestReceipt.hash}</code>
          <a
            className="receiptPanel__link"
            href={getExplorerTxUrl(latestReceipt.hash)}
            rel="noreferrer"
            target="_blank"
          >
            Mở trên StellarChain Explorer
            <ExternalLink size={14} />
          </a>
        </div>
      ) : null}
    </article>
  );
}
