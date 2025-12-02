import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { collection, addDoc, orderBy, query, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef();

  // Botão de sair no topo
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Escutar mensagens em tempo real
  useEffect(() => {
    const collectionRef = collection(db, 'messages');
    const q = query(collectionRef, orderBy('createdAt', 'asc')); // Ordena por data

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map(doc => ({
          _id: doc.id,
          createdAt: doc.data().createdAt?.toDate(), // Converte timestamp do Firestore
          text: doc.data().text,
          user: doc.data().user,
          email: doc.data().email
        }))
      );
    });

    return unsubscribe;
  }, []);

  const handleSignOut = () => {
    signOut(auth).catch(error => console.log('Erro ao sair: ', error));
  };

  const handleSend = async () => {
    if (newMessage.trim().length === 0) return;

    const textToSend = newMessage;
    setNewMessage(''); // Limpa input imediatamente

    try {
      await addDoc(collection(db, 'messages'), {
        text: textToSend,
        createdAt: serverTimestamp(),
        user: auth.currentUser.uid,
        email: auth.currentUser.email
      });
    } catch (error) {
      console.error("Erro ao enviar mensagem: ", error);
    }
  };

  const renderItem = ({ item }) => {
    const isMyMessage = item.user === auth.currentUser?.uid;

    return (
      <View style={[
        styles.messageBubble, 
        isMyMessage ? styles.myMessage : styles.otherMessage
      ]}>
        <Text style={styles.senderName}>
          {isMyMessage ? 'Você' : item.email?.split('@')[0]}
        </Text>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        onLayout={() => flatListRef.current?.scrollToEnd()}
        style={styles.list}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma mensagem..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
    marginLeft: 50,
  },
  otherMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
    marginRight: 50,
  },
  senderName: {
    fontSize: 10,
    color: '#555',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: '#fafafa',
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginRight: 15,
  },
  logoutText: {
    color: 'red',
    fontWeight: 'bold'
  }
});
