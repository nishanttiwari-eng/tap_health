import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SearchResult } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../../utils/constants';
import { formatNutrition } from '../../utils/formatters';

interface Props {
  results: SearchResult[];
  onSelect: (item: SearchResult) => void;
}

export const SearchResults: React.FC<Props> = ({ results, onSelect }) => {
  const renderItem = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity style={styles.resultItem} onPress={() => onSelect(item)}>
      <Text style={styles.resultName}>{item.name}</Text>
      <Text style={styles.resultDetails}>
        {formatNutrition(item.kcal, item.protein)} • {item.defaultServing}
      </Text>
      {item.matchType === 'start' && (
        <Text style={styles.matchBadge}>Exact match</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={results}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      style={styles.resultsList}
      keyboardShouldPersistTaps="always"
    />
  );
};

const styles = StyleSheet.create({
  resultsList: {
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderRadius: 8,
  },
  resultItem: {
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  resultName: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  resultDetails: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  matchBadge: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
    fontWeight: '600',
  },
});
