import { FoodItem } from './food';

export interface Meal extends FoodItem {
  dateAdded: string;
  consumedAt: string;
}

export interface MealTotals {
  calories: number;
  protein: number;
}

export interface TodayMealsContextType {
  meals: Meal[];
  addMeal: (item: FoodItem) => void;
  totals: MealTotals;
  lastEightCalories: number[];
}
