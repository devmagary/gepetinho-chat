import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User, Link2 } from 'lucide-react-native';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { StatusIndicator } from './StatusIndicator';
import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSize, borderRadius } from '../theme';

export function ConnectionForm({
  nickname,
  onNicknameChange,
  friendId,
  onFriendIdChange,
  status,
  error,
  onConnect,
  isConnecting,
}) {
  const { colors } = useTheme();
  const canConnect = nickname.trim() && friendId.trim() && !isConnecting;

  return (
    <View style={styles.container}>
      <Input
        label="Seu apelido"
        icon={<User size={16} color={colors.mutedForeground} />}
        placeholder="Digite seu nome..."
        value={nickname}
        onChangeText={onNicknameChange}
        maxLength={30}
        autoCapitalize="words"
      />

      <Input
        label="ID do amigo"
        icon={<Link2 size={16} color={colors.mutedForeground} />}
        placeholder="Cole o ID do seu amigo aqui..."
        value={friendId}
        onChangeText={onFriendIdChange}
        style={styles.inputSpacing}
      />

      {error && (
        <View style={[styles.errorBox, { backgroundColor: `${colors.destructive}15`, borderColor: `${colors.destructive}30` }]}>
          <Text style={[styles.errorText, { color: colors.destructive }]}>{error}</Text>
        </View>
      )}

      <View style={styles.footer}>
        <StatusIndicator status={status} />

        <Button
          variant="gradient"
          size="lg"
          onPress={onConnect}
          disabled={!canConnect}
          loading={isConnecting}
          style={styles.connectButton}
        >
          {isConnecting ? 'Conectando' : 'Conectar'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xl,
  },
  inputSpacing: {
    marginTop: spacing.lg,
  },
  errorBox: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  errorText: {
    fontSize: fontSize.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  connectButton: {
    minWidth: 140,
  },
});
