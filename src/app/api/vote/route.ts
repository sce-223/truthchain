import { NextResponse } from "next/server";

import { NEWS_ITEMS } from "@/lib/news";
import { submitVoteTransaction } from "@/lib/stellar";
import type { VoteChoice } from "@/lib/types";

export const runtime = "nodejs";

type VotePayload = {
  newsId?: string;
  choice?: VoteChoice;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as VotePayload;
    const newsId = body.newsId?.trim();
    const choice = body.choice;
    const newsExists = NEWS_ITEMS.some((item) => item.id === newsId);

    if (!newsId || !newsExists) {
      return NextResponse.json(
        { error: "Invalid newsId. Expected one of the hardcoded sample news ids." },
        { status: 400 },
      );
    }

    if (choice !== "REAL" && choice !== "FAKE") {
      return NextResponse.json(
        { error: "Invalid vote choice. Expected REAL or FAKE." },
        { status: 400 },
      );
    }

    const receipt = await submitVoteTransaction(newsId, choice);

    return NextResponse.json({ ok: true, receipt });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error while submitting vote.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
