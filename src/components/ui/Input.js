import React from 'react';
import { TextInput as RNTextInput, StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { borderRadius, spacing, fontSize } from '../../theme';

export function Input({
  value,
  onChangeText,
  placeholder,
  label,
  icon,
  disabled = false,
  secureTextEntry = false,
  autoCapitalize = 'none',
  keyboardType = 'default',
  maxLength,
  style,
  inputStyle,
  multiline = false,
}) {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, style]}>
      {label && (
        <View style={styles.labelContainer}>
          {icon}
          <Text style={[styles.label, { color: colors.foreground }]}>{label}</Text>
        </View>
      )}
      <RNTextInput
        style={[
          styles.input,
          { 
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.foreground,
          },
          multiline && styles.multiline,
          disabled && { backgroundColor: colors.muted, opacity: 0.6 },
          inputStyle,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedForeground}
        editable={!disabled}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        maxLength={maxLength}
        multiline={multiline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    fontSize: fontSize.base,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});
