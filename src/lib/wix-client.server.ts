import { Tokens } from "@wix/sdk";
import { cookies } from "next/headers";
import { cache } from "react";
import { WIX_SESSION_COOKIE } from "./constants";
import { getWixClient } from "./wix-client.base";

export const getWixServerClient = cache(async () => {
  let tokens: Tokens | undefined;

  try {
    tokens = JSON.parse((await cookies()).get(WIX_SESSION_COOKIE)?.value || "{}");
  } catch (error) {}

  return getWixClient(tokens);
});