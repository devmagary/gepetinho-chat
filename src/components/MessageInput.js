import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Send } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSize, borderRadius } from '../theme';

export function MessageInput({ onSend, disabled }) {
  const { colors } = useTheme();
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const canSend = message.trim() && !disabled;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: `${colors.card}E6`, borderTopColor: `${colors.border}80` }]}>
      <View style={styles.container}>
        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: colors.card,
              borderColor: colors.border,
              color: colors.foreground,
            }
          ]}
          placeholder="Digite sua mensagem..."
          placeholderTextColor={colors.mutedForeground}
          value={message}
          onChangeText={setMessage}
          editable={!disabled}
          onSubmitEditing={handleSend}
          returnKeyType="send"
          multiline
          maxLength={1000}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            { backgroundColor: canSend ? colors.primary : colors.muted },
          ]}
          onPress={handleSend}
          disabled={!canSend}
          activeOpacity={0.7}
        >
          <Send size={20} color={canSend ? colors.primaryForeground : colors.mutedForeground} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    borderTopWidth: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.md,
    padding: spacing.lg,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSize.base,
    maxHeight: 120,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
