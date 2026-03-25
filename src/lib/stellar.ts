import {
  Asset,
  BASE_FEE,
  Horizon,
  Keypair,
  Memo,
  Networks,
  Operation,
  Transaction,
  TransactionBuilder,
} from "@stellar/stellar-sdk";

import { loadAppConfig } from "@/lib/config";
import { buildVoteMemo } from "@/lib/memo";
import { tallyConsensus } from "@/lib/consensus";
import type { VoteChoice } from "@/lib/types";

const STELLAR_TESTNET_PASSPHRASE = Networks.TESTNET;
const STROOP_PAYMENT = "0.0000001";

export const getServer = async () => {
  const config = await loadAppConfig();
  return new Horizon.Server(config.horizonUrl);
};

export const getDemoKeypair = async () => {
  const config = await loadAppConfig();
  const secretKey = config.stellarSecretKey;
  const publicKey = config.stellarPublicKey;
  const keypair = Keypair.fromSecret(secretKey);

  if (keypair.publicKey() !== publicKey) {
    throw new Error(
      "config.json stellarPublicKey does not match stellarSecretKey.",
    );
  }

  return { keypair, publicKey };
};

export const submitVoteTransaction = async (newsId: string, choice: VoteChoice) => {
  const server = await getServer();
  const { keypair, publicKey } = await getDemoKeypair();
  const sourceAccount = await server.loadAccount(publicKey);
  const memo = buildVoteMemo(newsId, choice);

  const transaction = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase: STELLAR_TESTNET_PASSPHRASE,
  })
    .addOperation(
      Operation.payment({
        destination: publicKey,
        asset: Asset.native(),
        amount: STROOP_PAYMENT,
      }),
    )
    .addMemo(Memo.text(memo))
    .setTimeout(30)
    .build();

  transaction.sign(keypair);

  const response = await server.submitTransaction(transaction);

  return {
    hash: response.hash,
    memo,
    ledger: response.ledger,
    createdAt: new Date().toISOString(),
  };
};

export const buildWalletVoteTransaction = async (
  sourcePublicKey: string,
  newsId: string,
  choice: VoteChoice,
) => {
  const server = await getServer();
  const { publicKey: collectorPublicKey } = await getDemoKeypair();
  const sourceAccount = await server.loadAccount(sourcePublicKey);
  const memo = buildVoteMemo(newsId, choice);

  const transaction = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase: STELLAR_TESTNET_PASSPHRASE,
  })
    .addOperation(
      Operation.payment({
        destination: collectorPublicKey,
        asset: Asset.native(),
        amount: STROOP_PAYMENT,
      }),
    )
    .addMemo(Memo.text(memo))
    .setTimeout(30)
    .build();

  return {
    xdr: transaction.toXDR(),
    memo,
    destination: collectorPublicKey,
    amount: STROOP_PAYMENT,
  };
};

export const submitSignedTransaction = async (signedXdr: string) => {
  const server = await getServer();
  const transaction = new Transaction(signedXdr, STELLAR_TESTNET_PASSPHRASE);
  const response = await server.submitTransaction(transaction);

  return {
    hash: response.hash,
    ledger: response.ledger,
    createdAt: new Date().toISOString(),
  };
};

export const fetchConsensusSnapshot = async () => {
  const server = await getServer();
  const { publicKey } = await getDemoKeypair();
  const config = await loadAppConfig();
  const transactions = await server
    .transactions()
    .forAccount(publicKey)
    .order("desc")
    .limit(200)
    .call();

  return {
    account: publicKey,
    horizonUrl: config.horizonUrl,
    consensus: tallyConsensus(transactions.records),
  };
};
