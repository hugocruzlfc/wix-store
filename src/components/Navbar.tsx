import brand from "@/assets/brand.png";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getCart } from "@/wix-api/cart";
import { getLoggedInMember } from "@/wix-api/members";
import Image from "next/image";
import Link from "next/link";
import ShoppingCartButton from "./buttons/ShopingCartButon";
import UserButton from "./buttons/UserButton";

export default async function Navbar() {
  const wixClient = await getWixServerClient();

  const [cart, loggedInMember] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
  ]);

  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-5">
        <Link href="/" className="flex items-center gap-4">
          <Image src={brand} alt="Flow Shop logo" width={150} height={50} />
          {/* <span className="text-xl font-bold">Flow Shop</span> */}
        </Link>
        <div className="flex items-center justify-center gap-5">
          <UserButton loggedInMember={loggedInMember} />
          <ShoppingCartButton initialData={cart} />
        </div>
      </div>
    </header>
  );
}
