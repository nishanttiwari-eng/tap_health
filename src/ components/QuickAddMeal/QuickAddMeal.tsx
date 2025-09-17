import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { useTodayMeals } from '../../hooks/useTodayMeals';
import { useDebounce } from '../../hooks/useDebounce';
import { searchFoodItems } from '../../utils/normalizer';
import { Input } from '../common/Input';
import { SearchResults } from './SearchResults';
import { MealTotals } from './MealTotals';
import { Sparkline } from './Sparkline';
import { COLORS, SPACING } from '../../utils/constants';
import foodsData from '../../data/foods.json';

export const QuickAddMeal: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 300);
  const { addMeal, totals, lastEightCalories, meals } = useTodayMeals();

  const searchResults = useMemo(() => {
    return searchFoodItems(debouncedQuery, foodsData).slice(0, 5);
  }, [debouncedQuery]);

  const handleSelectFood = (item: any) => {
    addMeal(item);
    setSearchQuery('');
    Keyboard.dismiss();
    setIsSearchFocused(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Input
          placeholder="Search food..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          autoCorrect={false}
          autoCapitalize="none"
        />

        {isSearchFocused && searchResults.length > 0 && (
          <View style={styles.resultsContainer}>
            <SearchResults
              results={searchResults}
              onSelect={handleSelectFood}
            />
          </View>
        )}

        <MealTotals totals={totals} mealCount={meals.length} />

        <Sparkline data={lastEightCalories} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
  },
  resultsContainer: {
    maxHeight: 300,
  },
});
