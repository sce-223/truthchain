import { NextResponse } from "next/server";

import { submitSignedTransaction } from "@/lib/stellar";

export const runtime = "nodejs";

type SubmitWalletVotePayload = {
  signedXdr?: string;
  memo?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubmitWalletVotePayload;
    const signedXdr = body.signedXdr?.trim();
    const memo = body.memo?.trim();

    if (!signedXdr) {
      return NextResponse.json({ error: "signedXdr is required." }, { status: 400 });
    }

    const receipt = await submitSignedTransaction(signedXdr);

    return NextResponse.json({
      ok: true,
      receipt: {
        ...receipt,
        memo: memo || "Signed via wallet",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error while submitting wallet vote.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
