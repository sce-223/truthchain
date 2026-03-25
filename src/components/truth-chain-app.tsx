"use client";

import Image from "next/image";
import { startTransition, useEffect, useState } from "react";
import {
  getAddress,
  getNetwork,
  isConnected,
  requestAccess,
  signTransaction,
} from "@stellar/freighter-api";
import { Networks } from "@stellar/stellar-sdk";
import { ExternalLink, RefreshCcw, ShieldCheck, Wallet } from "lucide-react";

import { ConsensusState } from "@/components/consensus-state";
import { NewsCard } from "@/components/news-card";
import { getExplorerAccountUrl } from "@/lib/explorer";
import { NEWS_ITEMS, createEmptyConsensusMap } from "@/lib/news";
import type {
  NewsConsensus,
  VoteChoice,
  VoteMode,
  VoteReceipt,
} from "@/lib/types";

type ConsensusResponse = {
  ok: boolean;
  news: typeof NEWS_ITEMS;
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
  destination: string;
  amount: string;
};

const sortNewsByInteractions = (
  items: typeof NEWS_ITEMS,
  consensus: Record<string, NewsConsensus>,
) =>
  [...items].sort((left, right) => {
    const rightInteractions = consensus[right.id]?.total ?? 0;
    const leftInteractions = consensus[left.id]?.total ?? 0;

    if (rightInteractions !== leftInteractions) {
      return rightInteractions - leftInteractions;
    }

    return (
      new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
    );
  });

export function TruthChainApp() {
  const [consensus, setConsensus] = useState<Record<string, NewsConsensus>>(
    createEmptyConsensusMap(),
  );
  const [latestReceipts, setLatestReceipts] = useState<Record<string, VoteReceipt>>({});
  const [account, setAccount] = useState("");
  const [horizonUrl, setHorizonUrl] = useState("");
  const [message, setMessage] = useState("Đang kết nối Stellar Testnet và đọc consensus từ vote memos.");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [submittingNewsId, setSubmittingNewsId] = useState<string | null>(null);
  const [voteMode, setVoteMode] = useState<VoteMode>("demo");
  const [walletAddress, setWalletAddress] = useState("");
  const sortedNewsItems = sortNewsByInteractions(NEWS_ITEMS, consensus);
  const totalInteractions = Object.values(consensus).reduce(
    (sum, item) => sum + item.total,
    0,
  );

  const refreshConsensus = async (messageOverride?: string) => {
    setRefreshing(true);
    setError("");

    try {
      const response = await fetch("/api/consensus", { cache: "no-store" });
      const payload = (await response.json()) as ConsensusResponse | ErrorResponse;

      if (!response.ok || !("ok" in payload)) {
        throw new Error(
          "error" in payload ? payload.error : "Failed to refresh consensus.",
        );
      }

      startTransition(() => {
        setConsensus(payload.consensus);
        setAccount(payload.account);
        setHorizonUrl(payload.horizonUrl);
        setMessage(messageOverride || "Đã refresh consensus từ Stellar Testnet.");
      });
    } catch (refreshError) {
      setError(refreshError instanceof Error ? refreshError.message : "Refresh thất bại.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void refreshConsensus("Đã tải live consensus từ Stellar Testnet.");
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
      setMessage("Đã kết nối wallet. Bây giờ bạn có thể ký vote trực tiếp bằng Freighter.");
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
    setMessage("Đã chuyển lại sang shared demo wallet.");
  };

  const handleVote = async (newsId: string, choice: VoteChoice) => {
    setSubmittingNewsId(newsId);
    setError("");

    try {
      if (voteMode === "wallet") {
        if (!walletAddress) {
          throw new Error("Không tìm thấy địa chỉ wallet đã kết nối.");
        }

        const buildResponse = await fetch("/api/wallet-vote/build", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newsId, choice, sourcePublicKey: walletAddress }),
        });
        const buildPayload = (await buildResponse.json()) as
          | WalletBuildResponse
          | ErrorResponse;

        if (!buildResponse.ok || !("ok" in buildPayload)) {
          throw new Error(
            "error" in buildPayload
              ? buildPayload.error
              : "Không thể chuẩn bị wallet transaction.",
          );
        }

        const signed = await signTransaction(buildPayload.xdr, {
          networkPassphrase: Networks.TESTNET,
          address: walletAddress,
        });

        if (signed.error || !signed.signedTxXdr) {
          throw new Error(signed.error || "Wallet signing đã bị từ chối.");
        }

        const submitResponse = await fetch("/api/wallet-vote/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            signedXdr: signed.signedTxXdr,
            memo: buildPayload.memo,
          }),
        });
        const submitPayload = (await submitResponse.json()) as VoteResponse | ErrorResponse;

        if (!submitResponse.ok || !("ok" in submitPayload)) {
          throw new Error(
            "error" in submitPayload ? submitPayload.error : "Wallet vote thất bại.",
          );
        }

        setLatestReceipts((current) => ({
          ...current,
          [newsId]: submitPayload.receipt,
        }));
        setMessage(`Wallet vote đã được ghi on-chain với memo ${submitPayload.receipt.memo}.`);

        await refreshConsensus("Consensus đã cập nhật sau wallet-signed vote.");
        return;
      }

      const response = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newsId, choice }),
      });

      const payload = (await response.json()) as VoteResponse | ErrorResponse;

      if (!response.ok || !("ok" in payload)) {
        throw new Error("error" in payload ? payload.error : "Gửi vote thất bại.");
      }

      setLatestReceipts((current) => ({
        ...current,
        [newsId]: payload.receipt,
      }));
      setMessage(`Vote đã được ghi on-chain với memo ${payload.receipt.memo}.`);

      await refreshConsensus("Consensus đã cập nhật sau on-chain vote.");
    } catch (voteError) {
      setError(voteError instanceof Error ? voteError.message : "Vote thất bại.");
    } finally {
      setSubmittingNewsId(null);
    }
  };

  return (
    <main className="shell">
      <section className="hero">
        <div className="hero__copy">
          <div className="brandLockup">
            <Image
              alt="TruthChain logo"
              className="brandLockup__image"
              height={112}
              priority
              src="/truthchain-logo.png"
              width={240}
            />
            <div className="hero__badge">
              <ShieldCheck size={16} />
              TruthChain
            </div>
          </div>
          <h1>Nền tảng news consensus phi tập trung trên Stellar Testnet.</h1>
          <p>
            Mỗi vote `REAL` hoặc `FAKE` sẽ được submit thành một Stellar transaction
            thật, với memo theo format <code>NEWS_&lt;id&gt;_REAL</code> hoặc{" "}
            <code>NEWS_&lt;id&gt;_FAKE</code>.
          </p>
        </div>

        <div className="hero__panel">
          <div>
            <span className="panelLabel">Collector Wallet</span>
            {account ? (
              <a className="walletLink" href={getExplorerAccountUrl(account)} rel="noreferrer" target="_blank">
                {account}
                <ExternalLink size={14} />
              </a>
            ) : (
              <code>Đang chờ consensus API...</code>
            )}
          </div>
          <div>
            <span className="panelLabel">Horizon</span>
            <a href={horizonUrl || "#"} target="_blank" rel="noreferrer">
              {horizonUrl || "Chưa tải"}
            </a>
          </div>
          <div>
            <span className="panelLabel">Wallet</span>
            {walletAddress ? (
              <a
                className="walletLink"
                href={getExplorerAccountUrl(walletAddress)}
                rel="noreferrer"
                target="_blank"
              >
                {walletAddress}
                <ExternalLink size={14} />
              </a>
            ) : (
              <button className="walletButton" onClick={() => void connectWallet()} type="button">
                <Wallet size={16} />
                Kết nối Freighter
              </button>
            )}
            {walletAddress ? (
              <button className="walletButton walletButton--secondary" onClick={useDemoWallet} type="button">
                Quay về Demo Wallet
              </button>
            ) : null}
          </div>
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
      </section>

      <section className="statusRow">
        <p>{message}</p>
        {loading ? <span className="statusPill">Đang tải</span> : null}
        {refreshing ? <span className="statusPill">Đang refresh</span> : null}
        {error ? <span className="statusPill statusPill--error">{error}</span> : null}
      </section>

      {loading ? <ConsensusState loading /> : null}
      {!loading && totalInteractions === 0 ? <ConsensusState empty /> : null}

      <section className="cardGrid">
        {sortedNewsItems.map((item) => (
          <NewsCard
            key={item.id}
            consensus={consensus[item.id]}
            isSubmitting={submittingNewsId === item.id}
            item={item}
            latestReceipt={latestReceipts[item.id]}
            onVote={handleVote}
            voteMode={voteMode}
          />
        ))}
      </section>
    </main>
  );
}
