import { readFile } from "node:fs/promises";
import path from "node:path";

const DEFAULT_HORIZON_URL = "https://horizon-testnet.stellar.org";
const CONFIG_PATH = path.join(process.cwd(), "config.json");

type AppConfig = {
  stellarSecretKey: string;
  stellarPublicKey: string;
  horizonUrl: string;
};

const normalize = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

export const loadAppConfig = async (): Promise<AppConfig> => {
  let parsed: unknown;

  try {
    const raw = await readFile(CONFIG_PATH, "utf8");
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(
      "Missing or invalid config.json. Copy config.json.example to config.json and fill in your Stellar Testnet keys.",
    );
  }

  if (!parsed || typeof parsed !== "object") {
    throw new Error("config.json must be a JSON object.");
  }

  const config = {
    stellarSecretKey: normalize(
      Reflect.get(parsed, "stellarSecretKey"),
    ),
    stellarPublicKey: normalize(
      Reflect.get(parsed, "stellarPublicKey"),
    ),
    horizonUrl:
      normalize(Reflect.get(parsed, "horizonUrl")) || DEFAULT_HORIZON_URL,
  };

  if (!config.stellarSecretKey) {
    throw new Error("config.json is missing stellarSecretKey.");
  }

  if (!config.stellarPublicKey) {
    throw new Error("config.json is missing stellarPublicKey.");
  }

  return config;
};
