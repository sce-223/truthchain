import { Keypair } from "@stellar/stellar-sdk";
import { NextResponse } from "next/server";

import { NEWS_ITEMS } from "@/lib/news";
import { buildWalletVoteTransaction } from "@/lib/stellar";
import type { VoteChoice } from "@/lib/types";

export const runtime = "nodejs";

type BuildVotePayload = {
  newsId?: string;
  choice?: VoteChoice;
  sourcePublicKey?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BuildVotePayload;
    const newsId = body.newsId?.trim();
    const choice = body.choice;
    const sourcePublicKey = body.sourcePublicKey?.trim();
    const newsExists = NEWS_ITEMS.some((item) => item.id === newsId);

    if (!newsId || !newsExists) {
      return NextResponse.json({ error: "Invalid newsId." }, { status: 400 });
    }

    if (choice !== "REAL" && choice !== "FAKE") {
      return NextResponse.json({ error: "Invalid vote choice." }, { status: 400 });
    }

    if (!sourcePublicKey) {
      return NextResponse.json(
        { error: "sourcePublicKey is required for wallet voting." },
        { status: 400 },
      );
    }

    Keypair.fromPublicKey(sourcePublicKey);

    const payload = await buildWalletVoteTransaction(sourcePublicKey, newsId, choice);

    return NextResponse.json({ ok: true, ...payload });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error while building wallet vote.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
