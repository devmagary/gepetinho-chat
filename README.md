# Chat Gepetinho 🤖💬

Um aplicativo de chat estilo P2P (Peer-to-Peer) moderno, construído com **React Native (Expo)** e **Firebase**.

## 🚀 Sobre o Projeto

Este aplicativo permite que usuários entrem com email/senha e conversem em uma sala de chat global em tempo real. As mensagens são sincronizadas instantaneamente entre todos os dispositivos conectados.

**Tecnologias:**
- **Frontend:** React Native (Expo Framework)
- **Backend:** Google Firebase (Auth & Firestore)

## 📦 Instalação

1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

## ⚙️ Configuração

Antes de rodar, você **PRECISA** configurar o Firebase.
1. Abra o arquivo `firebaseConfig.js` na raiz do projeto.
2. Siga o manual `MANUAL_FIREBASE.md` para obter suas chaves de acesso.
3. Cole as chaves no arquivo `firebaseConfig.js`.

## ▶️ Como Rodar

Para iniciar o aplicativo no seu celular (via aplicativo Expo Go) ou em um emulador:

```bash
npx expo start
```

- Escaneie o QR Code com o app **Expo Go** (Android/iOS).
- Ou pressione `a` para abrir no Emulador Android (se configurado).
- Ou pressione `w` para abrir no navegador (limitado).

## 🤝 Contribuição

Contribuições são bem-vindas!
1. Faça um Fork.
2. Crie uma branch (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças.
4. Push para a branch.
5. Abra um Pull Request.
