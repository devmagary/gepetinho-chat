import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Shield, Copy, Check, RefreshCw } from 'lucide-react-native';
import { GlassCard } from './ui/Card';
import { Button } from './ui/Button';
import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSize, borderRadius } from '../theme';

export function IdCard({ peerId, onRegenerate, isRegenerating }) {
  const { colors } = useTheme();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (peerId) {
      Clipboard.setString(peerId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <GlassCard style={styles.card}>
      <View style={styles.header}>
        <Shield size={20} color={colors.primary} />
        <Text style={[styles.headerText, { color: colors.mutedForeground }]}>Seu ID Privado</Text>
      </View>

      <TouchableOpacity onPress={copyToClipboard} activeOpacity={0.8}>
        <View
          style={[
            styles.idContainer,
            { backgroundColor: `${colors.secondary}80`, borderColor: colors.border },
            copied && { borderColor: colors.primary, backgroundColor: `${colors.accent}80` },
          ]}
        >
          <Text style={[styles.idText, { color: colors.foreground }]} numberOfLines={2}>
            {peerId || 'Gerando...'}
          </Text>

          <View style={[
            styles.copyOverlay, 
            { backgroundColor: `${colors.primary}15` },
            copied && { opacity: 1, backgroundColor: `${colors.primary}25` }
          ]}>
            {copied ? (
              <View style={styles.copyRow}>
                <Check size={20} color={colors.primary} />
                <Text style={[styles.copyText, { color: colors.primary }]}>Copiado!</Text>
              </View>
            ) : (
              <View style={styles.copyRow}>
                <Copy size={20} color={colors.primary} />
                <Text style={[styles.copyText, { color: colors.primary }]}>Toque para copiar</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>

      <Button
        variant="ghost"
        size="sm"
        onPress={onRegenerate}
        disabled={isRegenerating}
        style={styles.renewButton}
      >
        <View style={styles.renewRow}>
          <RefreshCw
            size={16}
            color={colors.mutedForeground}
            style={isRegenerating ? styles.spinning : undefined}
          />
          <Text style={[styles.renewText, { color: colors.mutedForeground }]}>
            {isRegenerating ? 'Gerando...' : 'Gerar novo ID'}
          </Text>
        </View>
      </Button>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  headerText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  idContainer: {
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    position: 'relative',
    overflow: 'hidden',
  },
  idText: {
    fontFamily: 'monospace',
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  copyOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
  },
  copyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  copyText: {
    fontWeight: '500',
    fontSize: fontSize.md,
  },
  renewButton: {
    marginTop: spacing.lg,
    width: '100%',
  },
  renewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  renewText: {
    fontSize: fontSize.sm,
  },
  spinning: {
    // Note: React Native doesn't support CSS animations directly
  },
});
