import { wixBrowserClient } from "@/lib/wix-client.browser";
import { getCart } from "@/wix-api/cart";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";

export const queryKey: QueryKey = ["cart"];

export function useCart(initialData: currentCart.Cart | null) {
  return useQuery({
    queryKey,
    queryFn: () => getCart(wixBrowserClient),
    initialData,
  });
}
