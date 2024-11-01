import SearchFilter from "@/components/filters/SearchFilter";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getCollections } from "@/wix-api/collections";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const wixServerClient = await getWixServerClient();
  const collections = await getCollections(wixServerClient);

  return <SearchFilter collections={collections}>{children}</SearchFilter>;
}
