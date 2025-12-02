import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { ArrowLeft, Users } from 'lucide-react-native';
import { StatusIndicator } from './StatusIndicator';
import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSize, borderRadius } from '../theme';

export function ChatHeader({ participants, status, onDisconnect }) {
  const { colors } = useTheme();
  const participantCount = participants.length + 1; // +1 for self

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: `${colors.card}E6`, borderBottomColor: `${colors.border}80` }]}>
      <View style={styles.container}>
        <View style={styles.left}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={onDisconnect}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color={colors.foreground} />
          </TouchableOpacity>
          
          <View style={styles.info}>
            <Text style={[styles.title, { color: colors.foreground }]}>Chat Gepetinho</Text>
            <View style={styles.participantsRow}>
              <Users size={14} color={colors.mutedForeground} />
              <Text style={[styles.participantsText, { color: colors.mutedForeground }]}>
                {participantCount} pessoa{participantCount !== 1 ? 's' : ''}
              </Text>
            </View>
          </View>
        </View>

        <StatusIndicator status={status} showLabel={false} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    borderBottomWidth: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    gap: 2,
  },
  title: {
    fontSize: fontSize.base,
    fontWeight: '600',
  },
  participantsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  participantsText: {
    fontSize: fontSize.sm,
  },
});
