import React, { useRef, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { MessageSquare } from 'lucide-react-native';
import { MessageBubble } from './MessageBubble';
import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSize } from '../theme';

export function MessageList({ messages }) {
  const { colors } = useTheme();
  const flatListRef = useRef();

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const renderItem = ({ item }) => <MessageBubble message={item} />;

  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIcon, { backgroundColor: colors.secondary }]}>
        <MessageSquare size={32} color={colors.mutedForeground} />
      </View>
      <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
        Nenhuma mensagem ainda.
      </Text>
      <Text style={[styles.emptyHint, { color: colors.mutedForeground }]}>
        Diga olá! 👋
      </Text>
    </View>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={EmptyComponent}
      onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    paddingVertical: spacing.lg,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  emptyText: {
    fontSize: fontSize.base,
    textAlign: 'center',
  },
  emptyHint: {
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
});
