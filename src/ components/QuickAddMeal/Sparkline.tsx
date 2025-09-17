import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, G, Line } from 'react-native-svg';
import { COLORS, SPACING, TYPOGRAPHY } from '../../utils/constants';

interface Props {
  data: number[];
  width?: number;
  height?: number;
}

export const Sparkline: React.FC<Props> = ({
  data,
  width = 300,
  height = 80,
}) => {
  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Calorie Trend</Text>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            Add meals to see your calorie trend
          </Text>
        </View>
      </View>
    );
  }

  const maxValue = Math.max(...data, 1);
  const minValue = Math.min(...data, 0);
  const padding = 15;

  const getXPosition = (index: number) => {
    return padding + (index * (width - 2 * padding)) / (data.length - 1 || 1);
  };

  const getYPosition = (value: number) => {
    return (
      height -
      padding -
      ((value - minValue) / (maxValue - minValue || 1)) * (height - 2 * padding)
    );
  };

  const createPath = () => {
    if (data.length === 0) return '';

    let path = `M ${getXPosition(0)} ${getYPosition(data[0])}`;

    for (let i = 1; i < data.length; i++) {
      path += ` L ${getXPosition(i)} ${getYPosition(data[i])}`;
    }

    return path;
  };

  const createAreaPath = () => {
    if (data.length === 0) return '';

    let path = `M ${getXPosition(0)} ${getYPosition(data[0])}`;

    for (let i = 1; i < data.length; i++) {
      path += ` L ${getXPosition(i)} ${getYPosition(data[i])}`;
    }

    path += ` L ${getXPosition(data.length - 1)} ${height - padding}`;
    path += ` L ${padding} ${height - padding} Z`;

    return path;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calorie Trend (Last {data.length} Meals)</Text>
      <Svg width={width} height={height} style={styles.svg}>
        <Path
          d={createAreaPath()}
          fill={COLORS.primaryLight}
          fillOpacity={0.2}
        />
        <Path
          d={createPath()}
          stroke={COLORS.primary}
          strokeWidth={2.5}
          fill="none"
        />
        {data.map((value, index) => (
          <G key={index}>
            <Line
              x1={getXPosition(index)}
              y1={height - padding}
              x2={getXPosition(index)}
              y2={getYPosition(value)}
              stroke={COLORS.divider}
              strokeWidth={1}
              strokeDasharray="3,3"
            />
            <Circle
              cx={getXPosition(index)}
              cy={getYPosition(value)}
              r={4}
              fill={COLORS.primary}
            />
          </G>
        ))}
      </Svg>
    </View>
  );
};

const Circle = ({
  cx,
  cy,
  r,
  fill,
}: {
  cx: number;
  cy: number;
  r: number;
  fill: string;
}) => {
  return (
    <Path
      d={`M ${cx} ${cy} m -${r}, 0 a ${r},${r} 0 1,0 ${
        r * 2
      },0 a ${r},${r} 0 1,0 -${r * 2},0`}
      fill={fill}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  svg: {
    marginVertical: SPACING.sm,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    marginBottom: SPACING.sm,
    fontWeight: '700',
  },
  placeholder: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
