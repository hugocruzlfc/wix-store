import { useQuickBuy } from "@/hooks/useQuickBuy";
import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
import { CreditCardIcon } from "lucide-react";
import { ButtonProps } from "../ui/button";
import LoadingButton from "./LoadingButton";

interface BuyNowButtonProps extends ButtonProps {
  product: products.Product;
  quantity: number;
  selectedOptions: Record<string, string>;
}

export default function BuyNowButton({
  product,
  quantity,
  selectedOptions,
  className,
  ...props
}: BuyNowButtonProps) {
  const { startCheckoutFlow, pending } = useQuickBuy();

  return (
    <LoadingButton
      onClick={() => startCheckoutFlow({ product, quantity, selectedOptions })}
      loading={pending}
      variant="secondary"
      className={cn("flex gap-3", className)}
      {...props}
    >
      <CreditCardIcon />
      Buy now
    </LoadingButton>
  );
}