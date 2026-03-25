export const getExplorerTxUrl = (hash: string) =>
  `https://testnet.stellarchain.io/tx/${hash}`;

export const getExplorerAccountUrl = (publicKey: string) =>
  `https://testnet.stellarchain.io/account/${publicKey}`;
