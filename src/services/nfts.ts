import { User } from "@models/User";
import { walletsService } from "./wallets";
import { openSeaApi } from "@utils/openSeaApi";

function initService() {
  const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

  // This is obviously not the best way to implement this as there's no separation of concerns.
  // However, this is a mock API so it's a good enough solution.
  const formatAsset = (asset: any, user: User) => {
    const { creator } = asset;
    const owner = asset.owner.address === NULL_ADDRESS ? creator : asset.owner;

    const isOwner = !!walletsService.getUserWallet(user.id, owner.address);
    const isCreator = !!walletsService.getUserWallet(user.id, creator.address);

    return {
      ...asset,
      owner: {
        ...owner,
        real_user: isOwner ? user : null,
      },
      creator: {
        ...creator,
        real_user: isCreator ? user : null,
      },
    };
  };

  return {
    getOne: async (contractAddress: string, tokenId: string, user: User) => {
      const { data: asset } = await openSeaApi.get(
        `/asset/${contractAddress}/${tokenId}`
      );
      const {
        data: { listings },
      } = await openSeaApi.get(`/asset/${contractAddress}/${tokenId}/listings`);

      return formatAsset({ ...asset, listings }, user);
    },
    getAllForCollection: async (collection: string, user: User) => {
      const url = `/assets?collection=${collection}`;

      const { data } = await openSeaApi.get(url);

      return {
        ...data,
        assets: data.assets.map((a: any) => formatAsset(a, user)),
      };
    },
  };
}

export const nftsService = initService();
