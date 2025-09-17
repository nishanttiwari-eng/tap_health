export interface FoodItem {
  id: string;
  name: string;
  kcal: number;
  protein: number;
  defaultServing: string;
}

export interface SearchResult extends FoodItem {
  matchType: 'start' | 'contains';
}
