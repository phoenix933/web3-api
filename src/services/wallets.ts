// mockDB
function initDatabase() {
  const walletMap: Map<string, { address: string; chainId: number }> = new Map(
    []
  );

  const getAll = () => {
    return [...walletMap.values()];
  };

  const getOne = (address: string) => {
    return walletMap.get(address);
  };

  const add = (address: string, chainId: number) => {
    walletMap.set(address, { address, chainId });
  };

  const remove = (address: string) => {
    walletMap.delete(address);
  };

  return {
    getAll,
    getOne,
    add,
    remove,
  };
}

export const walletsService = initDatabase();
