import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MealTotals as MealTotalsType } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../../utils/constants';

interface Props {
  totals: MealTotalsType;
  mealCount: number;
}

export const MealTotals: React.FC<Props> = ({ totals, mealCount }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Nutrition</Text>

      {mealCount === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No meals added today</Text>
          <Text style={styles.hintText}>Search for foods to get started</Text>
        </View>
      ) : (
        <View style={styles.nutritionContainer}>
          <View style={styles.nutritionItem}>
            <Text style={styles.value}>{totals.calories}</Text>
            <Text style={styles.label}>Calories</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.nutritionItem}>
            <Text style={styles.value}>{totals.protein}g</Text>
            <Text style={styles.label}>Protein</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.nutritionItem}>
            <Text style={styles.value}>{mealCount}</Text>
            <Text style={styles.label}>Meals</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.lg,
    marginVertical: SPACING.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    marginBottom: SPACING.md,
    textAlign: 'center',
    fontWeight: '700',
  },
  nutritionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  nutritionItem: {
    alignItems: 'center',
    flex: 1,
  },
  value: {
    ...TYPOGRAPHY.h1,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
    fontWeight: '800',
  },
  label: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  separator: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.divider,
  },
  emptyState: {
    alignItems: 'center',
    padding: SPACING.md,
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    fontWeight: '600',
  },
  hintText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
});