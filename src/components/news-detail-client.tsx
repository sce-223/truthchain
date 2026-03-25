"use client";

import {
  getAddress,
  getNetwork,
  isConnected,
  requestAccess,
} from "@stellar/freighter-api";
import { useEffect, useState } from "react";
import { RefreshCcw, Wallet } from "lucide-react";

import { ConsensusState } from "@/components/consensus-state";
import { NewsCard } from "@/components/news-card";
import { createEmptyConsensusMap } from "@/lib/news";
import { formatDisplayDate } from "@/lib/format";
import type { NewsConsensus, NewsItem, VoteChoice, VoteMode, VoteReceipt } from "@/lib/types";

type ConsensusResponse = {
  ok: boolean;
  account: string;
  horizonUrl: string;
  consensus: Record<string, NewsConsensus>;
};

type VoteResponse = {
  ok: boolean;
  receipt: VoteReceipt;
};

type ErrorResponse = {
  error: string;
};

type WalletBuildResponse = {
  ok: boolean;
  xdr: string;
  memo: string;
};

type NewsDetailClientProps = {
  item: NewsItem;
};

export function NewsDetailClient({ item }: NewsDetailClientProps) {
  const [consensus, setConsensus] = useState<Record<string, NewsConsensus>>(
    createEmptyConsensusMap(),
  );
  const [latestReceipt, setLatestReceipt] = useState<VoteReceipt | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("Mở chi tiết tin, xem context rồi đưa ra vote.");
  const [voteMode, setVoteMode] = useState<VoteMode>("demo");
  const [walletAddress, setWalletAddress] = useState("");
  const currentConsensus = consensus[item.id];

  const refreshConsensus = async (nextMessage?: string) => {
    setRefreshing(true);
    setError("");

    try {
      const response = await fetch("/api/consensus", { cache: "no-store" });
      const payload = (await response.json()) as ConsensusResponse | ErrorResponse;

      if (!response.ok || !("ok" in payload)) {
        throw new Error("error" in payload ? payload.error : "Refresh consensus thất bại.");
      }

      setConsensus(payload.consensus);
      setMessage(nextMessage || "Đã refresh consensus từ Stellar Testnet.");
    } catch (refreshError) {
      setError(refreshError instanceof Error ? refreshError.message : "Refresh thất bại.");
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void refreshConsensus("Đã tải consensus cho tin này.");
  }, []);

  useEffect(() => {
    const bootstrapWallet = async () => {
      try {
        const connection = await isConnected();

        if (connection.error || !connection.isConnected) {
          return;
        }

        const access = await getAddress();

        if (access.error || !access.address) {
          return;
        }

        const network = await getNetwork();

        if (network.error || network.network !== "TESTNET") {
          return;
        }

        setWalletAddress(access.address);
        setVoteMode("wallet");
      } catch {}
    };

    void bootstrapWallet();
  }, []);

  const connectWallet = async () => {
    setError("");

    try {
      const connection = await isConnected();

      if (connection.error || !connection.isConnected) {
        throw new Error("Browser này chưa cài Freighter.");
      }

      const network = await getNetwork();

      if (network.error || network.network !== "TESTNET") {
        throw new Error("Hãy chuyển Freighter sang TESTNET trước khi kết nối.");
      }

      const access = await requestAccess();

      if (access.error || !access.address) {
        throw new Error(access.error || "Wallet access chưa được cấp.");
      }

      setWalletAddress(access.address);
      setVoteMode("wallet");
      setMessage("Đã kết nối wallet ở trang chi tiết.");
    } catch (connectError) {
      setError(
        connectError instanceof Error
          ? connectError.message
          : "Kết nối Freighter thất bại.",
      );
    }
  };

  const useDemoWallet = () => {
    setVoteMode("demo");
    setMessage("Đã chuyển lại sang demo wallet ở trang chi tiết.");
  };

  const handleVote = async (newsId: string, choice: VoteChoice) => {
    setSubmitting(true);
    setError("");

    try {
      if (voteMode === "wallet") {
        if (!walletAddress) {
          throw new Error("Hãy connect Freighter ở trang chủ trước khi wallet voting.");
        }

        const freighterApi = await import("@stellar/freighter-api");
        const stellarSdk = await import("@stellar/stellar-sdk");

        const buildResponse = await fetch("/api/wallet-vote/build", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newsId, choice, sourcePublicKey: walletAddress }),
        });
        const buildPayload = (await buildResponse.json()) as WalletBuildResponse | ErrorResponse;

        if (!buildResponse.ok || !("ok" in buildPayload)) {
          throw new Error(
            "error" in buildPayload ? buildPayload.error : "Không thể chuẩn bị wallet vote.",
          );
        }

        const signed = await freighterApi.signTransaction(buildPayload.xdr, {
          networkPassphrase: stellarSdk.Networks.TESTNET,
          address: walletAddress,
        });

        if (signed.error || !signed.signedTxXdr) {
          throw new Error(signed.error || "Wallet signing đã bị từ chối.");
        }

        const submitResponse = await fetch("/api/wallet-vote/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ signedXdr: signed.signedTxXdr, memo: buildPayload.memo }),
        });
        const submitPayload = (await submitResponse.json()) as VoteResponse | ErrorResponse;

        if (!submitResponse.ok || !("ok" in submitPayload)) {
          throw new Error(
            "error" in submitPayload ? submitPayload.error : "Gửi wallet vote thất bại.",
          );
        }

        setLatestReceipt(submitPayload.receipt);
        await refreshConsensus("Wallet vote đã được ghi và consensus đã refresh.");
        return;
      }

      const response = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newsId, choice }),
      });
      const payload = (await response.json()) as VoteResponse | ErrorResponse;

      if (!response.ok || !("ok" in payload)) {
        throw new Error("error" in payload ? payload.error : "Gửi vote thất bại.");
      }

      setLatestReceipt(payload.receipt);
      await refreshConsensus("Vote đã được ghi và consensus đã refresh.");
    } catch (voteError) {
      setError(voteError instanceof Error ? voteError.message : "Vote thất bại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="detailLayout">
      <section className="detailPanel">
        <span className="detailEyebrow">Chi Tiết Tin</span>
        <h1>{item.title}</h1>
        <p className="detailSummary">{item.summary}</p>

        <div className="detailMetaGrid">
          <div className="detailMetaItem">
            <span>Ngày tạo</span>
            <strong>{formatDisplayDate(item.createdAt)}</strong>
          </div>
          <div className="detailMetaItem">
            <span>Nguồn</span>
            <strong>{item.publisher}</strong>
          </div>
          <div className="detailMetaItem">
            <span>Category</span>
            <strong>{item.category}</strong>
          </div>
          <div className="detailMetaItem">
            <span>Khu vực</span>
            <strong>{item.region}</strong>
          </div>
        </div>

        <div className="detailBlock">
          <span className="detailBlock__label">Claim chính</span>
          <p>{item.claim}</p>
        </div>

        <div className="detailBlock">
          <span className="detailBlock__label">Bối cảnh</span>
          {item.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="detailActionRow">
          <a className="detailSourceLink" href={item.sourceUrl} rel="noreferrer" target="_blank">
            Mở nguồn gốc
          </a>
          {walletAddress ? (
            <button className="walletButton walletButton--secondary" onClick={useDemoWallet} type="button">
              Demo Wallet
            </button>
          ) : (
            <button className="walletButton" onClick={() => void connectWallet()} type="button">
              <Wallet size={16} />
              Kết nối Freighter
            </button>
          )}
          <button
            className="refreshButton"
            disabled={refreshing}
            onClick={() => void refreshConsensus()}
            type="button"
          >
            <RefreshCcw size={16} className={refreshing ? "spin" : ""} />
            Refresh consensus
          </button>
        </div>

        <div className="detailStatus">
          <p>{message}</p>
          {error ? <span className="statusPill statusPill--error">{error}</span> : null}
        </div>

        {refreshing && !currentConsensus.total ? <ConsensusState compact loading /> : null}
        {!refreshing && currentConsensus.total === 0 ? (
          <ConsensusState compact empty />
        ) : null}
      </section>

      <NewsCard
        consensus={currentConsensus}
        isSubmitting={submitting}
        item={item}
        latestReceipt={latestReceipt}
        onVote={handleVote}
        voteMode={voteMode}
      />
    </div>
  );
}
