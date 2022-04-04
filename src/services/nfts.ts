import { OPENSEA_API_URL } from "@shared/constants";
import axios from "axios";
import { wait } from "@utils/wait";
import { User } from "@models/User";
import { walletsService } from "./wallets";

function initService() {
  let lastRequest = Date.now();

  // Prevent OpenSea's Testnet API's from throwing a "Too many requests" error
  const throttleGet = async (url: string) => {
    const now = Date.now();

    if (now - lastRequest < 1000) {
      await wait(1000);
    }

    lastRequest = Date.now();

    return axios.get(url);
  };

  // This is obviously not the best way to implement this as there's no separation of concerns.
  // However, this is a mock API so it's a good enough solution.
  const formatAsset = (asset: any, user: User) => {
    const { owner, creator } = asset;

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
      const url = `${OPENSEA_API_URL}/asset/${contractAddress}/${tokenId}`;

      const { data: asset } = await throttleGet(url);

      return formatAsset(asset, user);
    },
    getAllForCollection: async (collection: string, user: User) => {
      const url = `${OPENSEA_API_URL}/assets?collection=${collection}`;

      const { data } = await throttleGet(url);

      return {
        ...data,
        assets: data.assets.map((a: any) => formatAsset(a, user)),
      };
    },
  };
}

export const nftsService = initService();
