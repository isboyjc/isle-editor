export function sortArrayByPropertyArray(array, sortOrder, key) {
  const propertyOrderMap = new Map(sortOrder.map((value, index) => [value, index]));

  return array.sort((a, b) => {
    const indexA = propertyOrderMap.get(a[key]);
    const indexB = propertyOrderMap.get(b[key]);
    
    if (indexA === undefined && indexB === undefined) return 0;
    
    if (indexA === undefined) return 1;
    if (indexB === undefined) return -1;
    
    return indexA - indexB;
  });
}