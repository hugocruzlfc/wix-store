import { wixBrowserClient } from "@/lib/wix-client.browser";
import {
  updateCartItemQuantity,
  UpdateCartItemQuantityValues,
} from "@/wix-api/cart";
import {
  MutationKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";
import { useToast } from "./use-toast";
import { queryKey } from "./useCart";

export function useUpdateCartItemQuantity() {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const mutationKey: MutationKey = ["updateCartItemQuantity"];

  return useMutation({
    mutationKey,
    mutationFn: (values: UpdateCartItemQuantityValues) =>
      updateCartItemQuantity(wixBrowserClient, values),
    onMutate: async ({ productId, newQuantity }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousState =
        queryClient.getQueryData<currentCart.Cart>(queryKey);

      queryClient.setQueryData<currentCart.Cart>(queryKey, (oldData) => ({
        ...oldData,
        lineItems: oldData?.lineItems?.map((lineItem) =>
          lineItem._id === productId
            ? { ...lineItem, quantity: newQuantity }
            : lineItem,
        ),
      }));

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    },
    onSettled() {
      if (queryClient.isMutating({ mutationKey }) === 1) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });
}
