import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { addToCart,  AddToCartValues } from "@/wix-api/cart";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import { queryKey } from "./useCart";

export function useAddItemToCart() {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  return useMutation({
    mutationFn: (values: AddToCartValues) =>
      addToCart(wixBrowserClient, values),
    onSuccess(data) {
      toast({ description: "Item added to cart" });
      queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData(queryKey, data.cart);
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to add item to cart. Please try again.",
      });
    },
  });
}