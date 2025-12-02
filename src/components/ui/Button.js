import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { borderRadius, spacing, fontSize, fontWeight } from '../../theme';

const getVariants = (colors) => ({
  default: {
    bg: colors.primary,
    text: colors.primaryForeground,
  },
  secondary: {
    bg: colors.secondary,
    text: colors.secondaryForeground,
  },
  ghost: {
    bg: 'transparent',
    text: colors.mutedForeground,
  },
  destructive: {
    bg: colors.destructive,
    text: colors.destructiveForeground,
  },
  gradient: {
    bg: colors.primary,
    text: colors.primaryForeground,
  },
});

const sizes = {
  sm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    fontSize: fontSize.sm,
  },
  md: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    fontSize: fontSize.md,
  },
  lg: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    fontSize: fontSize.base,
  },
  icon: {
    padding: spacing.md,
    width: 44,
    height: 44,
  },
};

export function Button({
  children,
  variant = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  onPress,
  style,
  textStyle,
}) {
  const { colors } = useTheme();
  const variants = getVariants(colors);
  const variantStyles = variants[variant] || variants.default;
  const sizeStyles = sizes[size] || sizes.md;

  const isIconButton = size === 'icon';

  return (
    <TouchableOpacity
      style={[
        styles.base,
        {
          backgroundColor: disabled ? colors.muted : variantStyles.bg,
          paddingVertical: isIconButton ? 0 : sizeStyles.paddingVertical,
          paddingHorizontal: isIconButton ? 0 : sizeStyles.paddingHorizontal,
          width: isIconButton ? sizeStyles.width : undefined,
          height: isIconButton ? sizeStyles.height : undefined,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles.text} size="small" />
      ) : typeof children === 'string' ? (
        <Text
          style={[
            styles.text,
            {
              color: disabled ? colors.mutedForeground : variantStyles.text,
              fontSize: sizeStyles.fontSize || fontSize.md,
            },
            textStyle,
          ]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: fontWeight.semibold,
    textAlign: 'center',
  },
});
