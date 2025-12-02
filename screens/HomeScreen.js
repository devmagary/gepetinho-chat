import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { MessageCircle, Sun, Moon } from 'lucide-react-native';
import { IdCard } from '../src/components/IdCard';
import { ConnectionForm } from '../src/components/ConnectionForm';
import { useTheme } from '../src/theme/ThemeContext';
import { spacing, fontSize } from '../src/theme';
import P2PService from '../services/P2PService';

export default function HomeScreen({ navigation }) {
  const { colors, isDark, toggleTheme } = useTheme();
  const [peerId, setPeerId] = useState('');
  const [nickname, setNickname] = useState('');
  const [friendId, setFriendId] = useState('');
  const [status, setStatus] = useState('connecting'); // 'offline' | 'connecting' | 'online' | 'error'
  const [error, setError] = useState(null);

  useEffect(() => {
    // Inicializa o serviço P2P ao abrir o app
    P2PService.initialize((id) => {
      setPeerId(id);
      setStatus('offline'); // Ready to connect, but not connected yet
      setError(null);
    });

    // Configura listener de erro
    P2PService.onError = (errorMessage) => {
      setStatus('error');
      setError(errorMessage);
    };

    // Configura listeners para navegar quando conectar
    P2PService.onConnectionOpened = (remotePeerId) => {
      setStatus('online');
      navigation.navigate('Chat', { 
        peerId: remotePeerId, 
        nickname: nickname || 'Anônimo' 
      });
    };

    return () => {
      P2PService.onConnectionOpened = null;
      P2PService.onError = null;
    };
  }, [nickname, navigation]);

  const handleRegenerate = () => {
    setStatus('connecting');
    setPeerId('');
    P2PService.renewId();
  };

  const handleConnect = () => {
    if (!nickname.trim()) {
      setError('Por favor, digite seu apelido');
      return;
    }
    if (!friendId.trim()) {
      setError('Por favor, cole o ID do seu amigo');
      return;
    }
    if (friendId === peerId) {
      setError('Você não pode conectar com você mesmo');
      return;
    }

    setError(null);
    setStatus('connecting');
    P2PService.setNickname(nickname);
    P2PService.connectToPeer(friendId);
  };

  const isRegenerating = status === 'connecting' && !peerId;
  const isConnecting = status === 'connecting' && !!friendId;

  return (
    <ScrollView 
      style={[styles.scrollView, { backgroundColor: colors.background }]} 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <View style={styles.header}>
        {/* Theme Toggle Button */}
        <TouchableOpacity 
          style={[styles.themeToggle, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={toggleTheme}
        >
          {isDark ? (
            <Sun size={20} color={colors.primary} />
          ) : (
            <Moon size={20} color={colors.primary} />
          )}
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <View style={[styles.logoIcon, { backgroundColor: `${colors.primary}15` }]}>
            <MessageCircle size={24} color={colors.primary} />
          </View>
          <Text style={[styles.title, { color: colors.foreground }]}>
            Chat <Text style={[styles.titleHighlight, { color: colors.primary }]}>Gepetinho</Text>
          </Text>
        </View>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          Mensagens privadas peer-to-peer
        </Text>
      </View>

      {/* Main Content */}
      <View style={styles.main}>
        <IdCard
          peerId={peerId}
          onRegenerate={handleRegenerate}
          isRegenerating={isRegenerating}
        />

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          <Text style={[styles.dividerText, { color: colors.mutedForeground }]}>Conectar com amigo</Text>
          <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
        </View>

        <ConnectionForm
          nickname={nickname}
          onNicknameChange={setNickname}
          friendId={friendId}
          onFriendIdChange={setFriendId}
          status={peerId ? (friendId ? status : 'offline') : 'connecting'}
          error={error}
          onConnect={handleConnect}
          isConnecting={isConnecting}
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.mutedForeground }]}>
          Conexão direta • Sem servidor central • Privado
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  themeToggle: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
  },
  titleHighlight: {},
  subtitle: {
    fontSize: fontSize.sm,
  },
  main: {
    flex: 1,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: spacing.md,
    fontSize: fontSize.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  footer: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    paddingVertical: spacing.lg,
  },
  footerText: {
    fontSize: fontSize.xs,
  },
});