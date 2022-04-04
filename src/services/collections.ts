import { openSeaApi } from "@utils/openSeaApi";

export const collectionsService = {
  getOne: async (slug: string) => {
    const {
      data: { collection },
    } = await openSeaApi.get(`/collection/${slug}`);

    return collection;
  },
};
