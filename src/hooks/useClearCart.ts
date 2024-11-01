import { wixBrowserClient } from "@/lib/wix-client.browser";
import { clearCart } from "@/wix-api/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "./useCart";

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => clearCart(wixBrowserClient),
    onSuccess() {
      queryClient.setQueryData(queryKey, null);
      queryClient.invalidateQueries({ queryKey });
    },
    retry: 3,
  });
}
