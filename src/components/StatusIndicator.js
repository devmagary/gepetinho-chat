import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSize } from '../theme';

export function StatusIndicator({ status, showLabel = true, style }) {
  const { colors } = useTheme();
  
  const statusConfig = {
    offline: {
      label: 'Desconectado',
      color: colors.statusOffline,
      pulse: false,
    },
    connecting: {
      label: 'Conectando...',
      color: colors.statusConnecting,
      pulse: true,
    },
    online: {
      label: 'Online',
      color: colors.statusOnline,
      pulse: false,
      glow: true,
    },
    error: {
      label: 'Erro',
      color: colors.statusError,
      pulse: false,
    },
  };

  const config = statusConfig[status] || statusConfig.offline;

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.dot,
          { backgroundColor: config.color },
          config.glow && {
            shadowColor: config.color,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.6,
            shadowRadius: 4,
            elevation: 4,
          },
        ]}
      />
      {showLabel && <Text style={[styles.label, { color: colors.mutedForeground }]}>{config.label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
});
