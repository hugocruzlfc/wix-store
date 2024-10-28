import { WixClient } from "@/lib/wix-client.base";
import { collections } from "@wix/stores";
import { cache } from "react";

export const getCollectionBySlug = cache(
  async (wixClient: WixClient, slug: string) => {
    const { collection } =
      await wixClient.collections.getCollectionBySlug(slug);

    return collection || null;
  },
);

export const getCollections = cache(
  async (wixClient: WixClient): Promise<collections.Collection[]> => {
    const collections = await wixClient.collections
      .queryCollections()
      .ne("_id", "00000000-000000-000000-000000000001") // all products
      .ne("_id", "dc79ba54-1b7b-a9b3-1968-7c5b6f929a67") // featured products
      .find();

    return collections.items;
  },
);

//https://manage.wix.com/dashboard/1c2915d6-5090-46b8-acda-eb591bdbc593/store/categories/list/category/dc79ba54-1b7b-a9b3-1968-7c5b6f929a67
