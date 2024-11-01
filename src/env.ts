import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    WIX_API_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    NEXT_PUBLIC_WIX_CLIENT_ID: z.string().min(1),
    NEXT_PUBLIC_WIX_SITE_ID: z.string().min(1),
  },
  runtimeEnv: {
    WIX_API_KEY: process.env.WIX_API_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_WIX_CLIENT_ID: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
    NEXT_PUBLIC_WIX_SITE_ID: process.env.NEXT_PUBLIC_WIX_SITE_ID,
  },
});

const vercelHost =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    : process.env.NEXT_PUBLIC_VERCEL_URL;
const vercelUrl = vercelHost ? `https://${vercelHost}` : undefined;
const publicUrl = process.env.NEXT_PUBLIC_BASE_URL || vercelUrl;

if (!publicUrl) {
  throw new Error(
    "Missing NEXT_PUBLIC_URL or NEXT_PUBLIC_VERCEL_URL variables!",
  );
}

// force type inference to string
const _publicUrl = publicUrl;
export { _publicUrl as publicUrl };
