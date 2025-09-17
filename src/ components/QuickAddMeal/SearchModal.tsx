import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SearchResult } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../../utils/constants';
import { formatNutrition } from '../../utils/formatters';

interface Props {
  visible: boolean;
  results: SearchResult[];
  onSelect: (item: SearchResult) => void;
  onClose: () => void;
}

export const SearchModal: React.FC<Props> = ({
  visible,
  results,
  onSelect,
  onClose,
}) => {
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
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Search Results</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={results}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            style={styles.resultsList}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  modalTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
  },
  closeButton: {
    padding: SPACING.xs,
  },
  closeText: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
  },
  resultsList: {
    maxHeight: 300,
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
