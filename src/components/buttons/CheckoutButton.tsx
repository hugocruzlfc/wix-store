import { useCartCheckout } from "@/hooks/useCheckout";
import { ButtonProps } from "../ui/button";
import LoadingButton from "./LoadingButton";

export default function CheckoutButton(props: ButtonProps) {
  const { startCheckoutFlow, pending } = useCartCheckout();

  return (
    <LoadingButton onClick={startCheckoutFlow} loading={pending} {...props}>
      Checkout
    </LoadingButton>
  );
}
