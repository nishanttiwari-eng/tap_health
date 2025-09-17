import { useState, useEffect } from 'react';
import { Meal, MealTotals } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'meals:';

export const useTodayMeals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTodayKey = (): string => {
    const today = new Date().toISOString().split('T')[0];
    return `${STORAGE_KEY}${today}`;
  };

  useEffect(() => {
    const loadMeals = async () => {
      try {
        const stored = await AsyncStorage.getItem(getTodayKey());
        if (stored) {
          setMeals(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading meals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMeals();
  }, []);

  useEffect(() => {
    const saveMeals = async () => {
      try {
        await AsyncStorage.setItem(getTodayKey(), JSON.stringify(meals));
      } catch (error) {
        console.error('Error saving meals:', error);
      }
    };

    if (meals.length > 0) {
      saveMeals();
    }
  }, [meals]);

  const addMeal = (item: any) => {
    const newMeal: Meal = {
      ...item,
      dateAdded: new Date().toISOString(),
      consumedAt: new Date().toLocaleTimeString(),
    };

    setMeals(prev => [...prev, newMeal]);
  };

  const totals: MealTotals = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.kcal,
      protein: acc.protein + meal.protein,
    }),
    { calories: 0, protein: 0 },
  );

  const lastEightCalories = meals.slice(-8).map(meal => meal.kcal);

  return {
    meals,
    addMeal,
    totals,
    lastEightCalories,
    isLoading,
  };
};
