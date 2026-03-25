import { NextResponse } from "next/server";

import { NEWS_ITEMS } from "@/lib/news";
import { fetchConsensusSnapshot } from "@/lib/stellar";

export const runtime = "nodejs";

export async function GET() {
  try {
    const snapshot = await fetchConsensusSnapshot();

    return NextResponse.json({
      ok: true,
      news: NEWS_ITEMS,
      account: snapshot.account,
      horizonUrl: snapshot.horizonUrl,
      consensus: snapshot.consensus,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error while refreshing consensus.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
