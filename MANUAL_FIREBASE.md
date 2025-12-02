# 📖 Manual de Configuração do Firebase

Este guia passo-a-passo vai te ensinar a configurar o "cérebro" do seu aplicativo de chat.

## 1. Criar o Projeto no Firebase
1. Acesse o [Console do Firebase](https://console.firebase.google.com/).
2. Clique em **"Adicionar projeto"** (ou "Create a project").
3. Dê um nome ao projeto (ex: `ChatGepetinho`).
4. Desative o Google Analytics (não é necessário agora) e clique em **"Criar projeto"**.
5. Aguarde e clique em **"Continuar"**.

## 2. Configurar Autenticação (Login)
1. No menu lateral esquerdo, clique em **"Criação"** -> **"Authentication"**.
2. Clique em **"Primeiros passos"**.
3. Na aba **"Sign-in method"**, selecione **"E-mail/senha"**.
4. Ative a opção **"Ativar"** (Enable) e clique em **"Salvar"**.
   * *Não precisa ativar o "Link do e-mail (login sem senha)".*

## 3. Configurar o Banco de Dados (Firestore)
1. No menu lateral esquerdo, clique em **"Criação"** -> **"Firestore Database"**.
2. Clique em **"Criar banco de dados"**.
3. Escolha a localização (pode deixar a padrão, ex: `nam5` ou `us-central`).
4. **IMPORTANTE:** Na etapa de regras de segurança, escolha **"Iniciar no modo de teste"**.
   * *Isso permite que qualquer pessoa com o app leia/escreva mensagens por 30 dias. Para produção, você precisará configurar regras de segurança.*
5. Clique em **"Criar"**.

## 4. Obter as Chaves de Acesso (API Keys)
1. No menu lateral esquerdo, clique na engrenagem **(⚙️)** ao lado de "Visão geral do projeto" -> **"Configurações do projeto"**.
2. Role a página até o final, na seção **"Seus aplicativos"**.
3. Clique no ícone **</>** (Web) para criar um app web (o React Native usa a SDK Web do Firebase).
4. Dê um apelido para o app (ex: `ChatApp`) e clique em **"Registrar app"**.
5. O Firebase vai mostrar um código com `const firebaseConfig = { ... }`.
6. **COPIE** apenas o conteúdo dentro das chaves `{ ... }`:
   * `apiKey`
   * `authDomain`
   * `projectId`
   * `storageBucket`
   * `messagingSenderId`
   * `appId`

## 5. Conectar no Aplicativo
1. Volte para o código do projeto no seu computador.
2. Abra o arquivo `firebaseConfig.js`.
3. Substitua os valores de exemplo pelos valores que você copiou do Firebase.

Exemplo de como deve ficar:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "chat-gepetinho.firebaseapp.com",
  projectId: "chat-gepetinho",
  // ... outros campos
};
```

Pronto! Seu aplicativo já pode fazer login e enviar mensagens. 🚀
