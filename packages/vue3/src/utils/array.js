export function sortArrayByPropertyArray(array, sortOrder, key) {
  const result = [];
  const remaining = new Set(array.map((item) => item[key])); // 剩余未排序的元素集合

  sortOrder.forEach((order) => {
    if (order === "|") {
      result.push({ [key]: "|" }); // 插入特殊元素
    } else {
      const index = array.findIndex((item) => item[key] === order);
      if (index !== -1) {
        result.push(array[index]); // 插入匹配元素
        remaining.delete(order); // 从未排序集合中移除
      }
    }
  });

  // 将剩余元素追加到末尾
  const remainingArray = array.filter((item) => remaining.has(item[key]));
  return result.concat(remainingArray);
}
