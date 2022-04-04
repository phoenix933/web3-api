export function removeDuplicates(array: any[], key: string) {
  const keys = array.map((obj) => obj[key]);

  return array.filter((obj, index) => !keys.includes(obj[key], index + 1));
}
