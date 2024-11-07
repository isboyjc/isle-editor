export function sortArrayByPropertyArray(array, sortOrder, key) {
  const propertyOrderMap = new Map(sortOrder.map((value, index) => [value, index]));

  return array.sort((a, b) => {
    const indexA = propertyOrderMap.get(a[key]);
    const indexB = propertyOrderMap.get(b[key]);
    return indexA - indexB;
  });
}