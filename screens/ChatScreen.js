import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { ChatHeader } from '../src/components/ChatHeader';
import { MessageList } from '../src/components/MessageList';
import { MessageInput } from '../src/components/MessageInput';
import { useTheme } from '../src/theme/ThemeContext';
import P2PService from '../services/P2PService';

export default function ChatScreen({ route, navigation }) {
  const { colors } = useTheme();
  const { peerId, nickname } = route.params || { peerId: 'Desconhecido', nickname: 'Anônimo' };
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [status, setStatus] = useState('online');

  useEffect(() => {
    // Hide default header since we use custom ChatHeader
    navigation.setOptions({ headerShown: false });

    // Set initial participant list
    setParticipants(P2PService.getConnections());

    // Listener for changes in connection list
    P2PService.onConnectionListChanged = (connections) => {
      setParticipants(connections);
    };

    // Configurar o listener para receber mensagens
    P2PService.onMessageReceived = (data, senderId, senderNickname) => {
      // Ignore non-chat messages
      if (data.type !== 'CHAT_MESSAGE') return;

      const incomingMsg = {
        id: Math.random().toString(),
        content: data.payload.text,
        createdAt: new Date(data.payload.createdAt),
        sender: senderId,
        senderNickname: senderNickname || 'Anônimo',
        isOwn: false,
      };
      setMessages(prev => [...prev, incomingMsg]);
    };

    P2PService.onDisconnected = (disconnectedPeerId) => {
      Alert.alert('Desconectado', `O usuário saiu da conversa.`);
      setStatus('offline');
      // If no more connections, go back
      if (P2PService.getConnections().length === 0) {
        navigation.goBack();
      }
    };

    P2PService.onError = (errorMessage) => {
      setStatus('error');
    };

    return () => {
      // Limpa listeners ao sair da tela
      P2PService.onMessageReceived = null;
      P2PService.onDisconnected = null;
      P2PService.onConnectionListChanged = null;
      P2PService.onError = null;
    };
  }, [navigation]);

  const handleSendMessage = (content) => {
    const messagePayload = {
      type: 'CHAT_MESSAGE',
      payload: {
        text: content,
        createdAt: new Date().toISOString(),
      }
    };

    // Envia via P2P
    P2PService.sendMessage(messagePayload);

    // Adiciona na nossa lista local para vermos o que enviamos
    const myMsg = {
      id: Math.random().toString(),
      content: content,
      createdAt: new Date(),
      sender: 'ME',
      senderNickname: nickname,
      isOwn: true,
    };

    setMessages(prev => [...prev, myMsg]);
  };

  const handleDisconnect = () => {
    Alert.alert(
      'Sair do Chat',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          style: 'destructive',
          onPress: () => {
            // Notifica outros peers antes de sair
            P2PService.disconnect();
            navigation.goBack();
          }
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ChatHeader
        participants={participants}
        status={status}
        onDisconnect={handleDisconnect}
      />
      
      <KeyboardAvoidingView 
        style={styles.content} 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <MessageList messages={messages} />
        <MessageInput 
          onSend={handleSendMessage} 
          disabled={status !== 'online'} 
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});