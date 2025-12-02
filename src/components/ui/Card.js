import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { borderRadius, spacing } from '../../theme';

export function Card({ children, style }) {
  const { colors } = useTheme();
  return (
    <View style={[
      styles.card,
      { backgroundColor: colors.card },
      style
    ]}>
      {children}
    </View>
  );
}

export function GlassCard({ children, style }) {
  const { colors } = useTheme();
  return (
    <View style={[
      styles.glassCard,
      { 
        backgroundColor: `${colors.card}E6`,
        borderColor: `${colors.border}80`,
      },
      style
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  glassCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
});
