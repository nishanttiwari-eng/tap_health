import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING } from '../../utils/constants';

interface Props extends ViewProps {
  elevated?: boolean;
}

export const Card: React.FC<Props> = ({
  children,
  style,
  elevated = true,
  ...props
}) => {
  return (
    <View style={[styles.card, elevated && styles.elevated, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});
