export const filterByDate = (
  dateString: string,
  filterType: string
): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const thisWeek = new Date(today);
  thisWeek.setDate(thisWeek.getDate() - today.getDay());
  const thisMonth = new Date(today);
  thisMonth.setDate(1);
  const thisYear = new Date(today);
  thisYear.setMonth(0, 1);

  switch (filterType) {
    case "All Time":
      return true;
    case "Today":
      return date >= today;
    case "Yesterday":
      return date >= yesterday && date < today;
    case "This Week":
      return date >= thisWeek && date < today;
    case "This Month":
      return date >= thisMonth && date < today;
    case "This Year":
      return date >= thisYear && date < today;
    default:
      throw new Error("Invalid filter type");
  }
};
