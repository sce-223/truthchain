# TruthChain

## Project Title

TruthChain: Decentralized News Consensus Platform on Stellar

## Project Description

TruthChain is a student-built MVP web app that lets users review viral news claims, vote `REAL` or `FAKE`, and store each vote on Stellar Testnet using real transactions with transaction memos.

Instead of using a complex smart contract flow, this project uses the simplest working Stellar-native mechanism for a hackathon demo:

- each vote sends a valid Stellar Testnet transaction
- each transaction stores a memo in the format `NEWS_<id>_REAL` or `NEWS_<id>_FAKE`
- the app reads transaction history from Horizon
- the app rebuilds community consensus directly from on-chain vote activity

The application also supports Freighter wallet connection, so other users can connect their own wallet and sign votes from the browser.

## Project Vision

Our vision is to make online information verification more transparent, participatory, and auditable.

Today, fake news spreads quickly because users often see isolated claims without a reliable public record of how other people evaluated them. TruthChain explores a simple alternative:

- anyone can inspect the same news item
- anyone can vote on whether it appears `REAL` or `FAKE`
- every vote is recorded on-chain
- consensus is not hidden in a private database
- community sentiment becomes traceable, shareable, and harder to manipulate quietly

In the long term, this model could evolve into a broader trust layer for social news, citizen fact-checking, and open reputation systems.

## Key Features

- News feed with 20 sample news items
- Each news item supports `REAL` and `FAKE` voting
- Each vote is written to Stellar Testnet through a real transaction
- Vote memos follow a deterministic format for easy indexing
- Consensus is rebuilt by reading blockchain transaction history from Horizon
- News cards are ranked by interaction count so the most active items appear first
- Detail page for each news item with metadata, claim, context, and live vote panel
- Freighter wallet integration for browser-based signing
- Explorer links for transaction hashes and wallet addresses
- LAN-ready mode for live hackathon demos across multiple devices

## Deployed Smartcontract Details

This MVP does **not** deploy a separate Stellar smart contract.

Current on-chain architecture:

- Network: Stellar Testnet
- Storage model: transaction memo-based voting
- Contract ID: `N/A`
- Reason: the MVP intentionally uses the simplest deployable Stellar pattern for a fast and reliable hackathon demo

Explorer evidence for the live on-chain flow should be captured from:

- the collector wallet account page on Stellar Expert
- a submitted vote transaction showing:
  - successful payment
  - Stellar Testnet
  - memo such as `NEWS_1_REAL`

Recommended README screenshot for submission:

- Screenshot of a Stellar Expert transaction page showing one successful TruthChain vote
- Screenshot of the collector wallet account showing transaction history used for consensus

If your rubric strictly requires a contract screenshot, add a note in the submission that this version uses memo-based Stellar transactions rather than a custom deployed contract.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- `@stellar/stellar-sdk`
- `@stellar/freighter-api`
- Horizon Testnet API

## Project Structure

```text
src/
  app/
    api/
      consensus/route.ts
      vote/route.ts
      wallet-vote/build/route.ts
      wallet-vote/submit/route.ts
    news/[id]/page.tsx
    globals.css
    layout.tsx
    page.tsx
  components/
    news-card.tsx
    news-detail-client.tsx
    truth-chain-app.tsx
  lib/
    config.ts
    consensus.ts
    explorer.ts
    format.ts
    memo.ts
    news.ts
    stellar.ts
    types.ts
public/
  truthchain-logo.png
config.json.example
```

## How It Works

1. A user opens the news feed and chooses a news item.
2. The user votes `REAL` or `FAKE`.
3. The app submits a real Stellar Testnet transaction.
4. The transaction memo is saved in this format:
   - `NEWS_<id>_REAL`
   - `NEWS_<id>_FAKE`
5. The app fetches transaction history from Horizon.
6. The app counts all matching memos per `newsId`.
7. The UI shows:
   - real count
   - fake count
   - total interactions
   - percentage split

## Wallet Mode

- Users can connect Freighter in the browser
- Freighter authorization is origin-based, so `localhost` and LAN IPs are treated as different app origins
- Freighter must be switched to `TESTNET`
- Wallet-signed votes still send funds to the shared collector wallet so consensus can be rebuilt from one account history

## Run Locally

### 1. Install packages

```bash
npm install
```

### 2. Create a Stellar Testnet wallet

You can use Stellar Laboratory, Freighter, or generate one with Node:

```bash
node -e "const { Keypair } = require('@stellar/stellar-sdk'); const kp = Keypair.random(); console.log('PUBLIC=', kp.publicKey()); console.log('SECRET=', kp.secret());"
```

### 3. Fund the testnet account

[https://friendbot.stellar.org](https://friendbot.stellar.org)

Or:

```bash
curl "https://friendbot.stellar.org/?addr=YOUR_PUBLIC_KEY"
```

### 4. Create the config file

```bash
cp config.json.example config.json
```

Windows PowerShell:

```powershell
Copy-Item config.json.example config.json
```

Example:

```json
{
  "stellarSecretKey": "SB...",
  "stellarPublicKey": "GB...",
  "horizonUrl": "https://horizon-testnet.stellar.org"
}
```

### 5. Start the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Stable LAN Demo Mode

For hackathon demos across multiple devices on the same network:

```bash
npm run build
npm run start:lan
```

Then open:

```text
http://YOUR_LAN_IP:3000
```

Example:

```text
http://10.70.0.146:3000
```

## API Overview

### `POST /api/vote`

Submits a vote using the shared demo wallet from `config.json`.

### `GET /api/consensus`

Reads the collector wallet transaction history from Horizon and rebuilds vote totals.

### `POST /api/wallet-vote/build`

Builds an unsigned XDR for a connected Freighter wallet to sign.

### `POST /api/wallet-vote/submit`

Submits the signed XDR to Stellar Testnet.

## Deployment Notes

### Vercel

1. Push the repo to GitHub
2. Import the repo into Vercel
3. Provide the same configuration values used in `config.json`
4. Deploy

### Netlify

This project is easier to deploy on Vercel because it uses Next.js server routes.

## Notes

- This MVP uses one collector wallet for consensus rebuilding
- Consensus is based only on memo counting
- The app reads the latest 200 transactions from Horizon for demo simplicity
- `config.json` contains secrets and must not be committed
