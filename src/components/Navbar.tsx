import brand from "@/assets/brand.png";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getCart } from "@/wix-api/cart";
import Image from "next/image";
import Link from "next/link";
import ShoppingCartButton from "./buttons/ShopingCartButon";

export default async function Navbar() {
  const cart = await getCart(await getWixServerClient());

  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-5">
        <Link href="/" className="flex items-center gap-4">
          <Image src={brand} alt="Flow Shop logo" width={150} height={50} />
          {/* <span className="text-xl font-bold">Flow Shop</span> */}
        </Link>
        <ShoppingCartButton initialData={cart} />
      </div>
    </header>
  );
}
