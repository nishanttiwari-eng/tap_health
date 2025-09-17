export const normalizeString = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
};

export const searchFoodItems = (query: string, foodItems: any[]): any[] => {
  if (!query.trim()) return [];

  const normalizedQuery = normalizeString(query);
  const startsWithMatches: any[] = [];
  const containsMatches: any[] = [];

  foodItems.forEach(food => {
    const normalizedName = normalizeString(food.name);
    if (normalizedName.startsWith(normalizedQuery)) {
      startsWithMatches.push({ ...food, matchType: 'start' as const });
    } else if (normalizedName.includes(normalizedQuery)) {
      containsMatches.push({ ...food, matchType: 'contains' as const });
    }
  });

  return [...startsWithMatches, ...containsMatches];
};
