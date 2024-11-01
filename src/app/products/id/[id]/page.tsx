import { getWixServerClient } from "@/lib/wix-client.server";
import { getProductById } from "@/wix-api/products";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<any>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { someParam } = await searchParams;

  if (id === "someId") {
    redirect(`/products/i-m-a-product-1?${new URLSearchParams(someParam)}`);
  }

  const wixClient = await getWixServerClient();

  const product = await getProductById(wixClient, id);

  if (!product) notFound();

  redirect(`/products/${product.slug}?${new URLSearchParams(someParam)}`);
}

//${create-review-request-1.productsToReview>id}?createReview=true
