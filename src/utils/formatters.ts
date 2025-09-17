export const formatNutrition = (calories: number, protein: number): string => {
  return `${calories} kcal • ${protein}g protein`;
};

export const formatServing = (serving: string): string => {
  return `Serving: ${serving}`;
};
