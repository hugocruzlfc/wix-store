import brand from "@/assets/brand.png";
import { getWixClient } from "@/lib/wix-client.base";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getCart } from "@/wix-api/cart";
import Image from "next/image";
import Link from "next/link";



export default async function Navbar() {
  const cart = await getCart(await getWixServerClient());

  const totalQuantity =
    cart?.lineItems.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;

  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-5">
        <Link href="/" className="flex items-center gap-4">
          <Image src={brand} alt="Flow Shop logo" width={150} height={50} />
          {/* <span className="text-xl font-bold">Flow Shop</span> */}
        </Link>
        {totalQuantity} items in your cart
      </div>
    </header>
  );
}