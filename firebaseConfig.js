import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ATENÇÃO: Substitua os valores abaixo pelos dados do seu projeto Firebase
// Você encontra esses dados no Console do Firebase -> Configurações do Projeto -> Geral -> Seus aplicativos
const firebaseConfig = {
  apiKey: "AIzaSyDFbXprYinh-cF4kqcUUTrMGANmulgO5c8",
  authDomain: "gepetinho-8b647.firebaseapp.com",
  projectId: "gepetinho-8b647",
  storageBucket: "gepetinho-8b647.firebasestorage.app",
  messagingSenderId: "668830828230",
  appId: "1:668830828230:web:92310b4e8cc6407a28b9c7"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Auth com persistência (para manter o login ao fechar o app)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Inicializa Firestore
const db = getFirestore(app);

export { auth, db };
