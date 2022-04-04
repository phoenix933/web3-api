import { OPENSEA_API_URL } from "@shared/constants";
import axios from "axios";
import { wait } from "@utils/wait";

function createAPI() {
  const {
    get,
    post,
    put,
    delete: deleteFunc,
  } = axios.create({
    baseURL: OPENSEA_API_URL,
  });

  let lastRequest = Date.now();

  // Prevent OpenSea's Testnet API's from throwing a "Too many requests" error
  const throttleGet = async (url: string) => {
    const now = Date.now();

    if (now - lastRequest < 1000) {
      await wait(1000);
    }

    lastRequest = Date.now();

    return get(url);
  };

  return {
    get: throttleGet,
    delete: deleteFunc,
    post,
    put,
  };
}

export const openSeaApi = createAPI();
