export const filterByDate = (
  dateString: string,
  filterType: string
): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 6);
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const thisYear = new Date(today.getFullYear(), 0, 1);

  switch (filterType) {
    case "All Time":
      return true;
    case "Today":
      return date >= today;
    case "Yesterday":
      return date >= yesterday && date < today;
    case "This Week":
      return date >= lastWeek && date <= endOfDay;
    case "This Month":
      return date >= thisMonth && date <= endOfDay;
    case "This Year":
      return date >= thisYear && date <= endOfDay;
    default:
      throw new Error("Invalid filter type");
  }
};
