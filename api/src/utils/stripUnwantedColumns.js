export default function stripTimeStamps(result) {
  return result.map((item) => {
    const { created_at, updated_at, ...filteredItem } = item;
    return filteredItem;
  });
}
