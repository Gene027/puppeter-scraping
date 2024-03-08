export function findLongestSubArrayIndex(arr: any[]) {
  let longestLength = 0;
  let longestSubArrayIndex = -1;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length > longestLength) {
      longestLength = arr[i].length;
      longestSubArrayIndex = i;
    }
  }

  return longestSubArrayIndex;
}

export const chunkArray = <T>(array: T[], chunkSize: number): T[] => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }

  return chunks;
};
