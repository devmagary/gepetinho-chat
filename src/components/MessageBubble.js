import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSize, borderRadius } from '../theme';

export function MessageBubble({ message }) {
  const { colors } = useTheme();
  const timeString = message.createdAt.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <View
      style={[
        styles.container,
        message.isOwn ? styles.ownContainer : styles.otherContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          message.isOwn 
            ? [styles.ownBubble, { backgroundColor: colors.messageOwn }] 
            : [styles.otherBubble, { backgroundColor: colors.messageOther }],
        ]}
      >
        {!message.isOwn && (
          <Text style={[styles.nickname, { color: colors.primary }]}>{message.senderNickname}</Text>
        )}
        <Text
          style={[
            styles.content,
            { color: message.isOwn ? colors.messageOwnForeground : colors.messageOtherForeground },
          ]}
        >
          {message.content}
        </Text>
        <Text
          style={[
            styles.time,
            { color: message.isOwn ? `${colors.messageOwnForeground}B3` : `${colors.messageOtherForeground}80` },
          ]}
        >
          {timeString}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  ownContainer: {
    alignItems: 'flex-end',
  },
  otherContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  ownBubble: {
    borderBottomRightRadius: spacing.xs,
  },
  otherBubble: {
    borderBottomLeftRadius: spacing.xs,
  },
  nickname: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  content: {
    fontSize: fontSize.base,
  },
  time: {
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
    textAlign: 'right',
  },
});
