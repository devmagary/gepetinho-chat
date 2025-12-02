# Chat Gepetinho P2P 🔗💬

Um aplicativo de chat **100% Peer-to-Peer (P2P)** usando WebRTC. As mensagens viajam diretamente de um celular para o outro, sem passar por servidores centrais e sem serem armazenadas em bancos de dados.

## ✨ Características

- 🔒 **Privacidade Total**: Mensagens diretas entre dispositivos
- 🚫 **Sem Servidor Central**: Nenhum dado é armazenado na nuvem
- ⚡ **Tempo Real**: Comunicação instantânea via WebRTC
- 📱 **React Native**: App nativo para Android
- 🌙 **Modo Escuro/Claro**: Tema personalizável com persistência
- 👤 **Nicknames**: Identificação personalizada sem registro
- 🔄 **Renovação de ID**: Gere novos IDs de conexão quando quiser
- 👥 **Contador de Participantes**: Saiba quantas pessoas estão na sala

## 🚀 Como Funciona

```
┌─────────────┐         ┌─────────────────────┐         ┌─────────────┐
│  Celular A  │◄───────►│ Servidor PeerJS     │◄───────►│  Celular B  │
│  ID: abc123 │         │ (só sinalização)    │         │  ID: xyz789 │
└──────┬──────┘         └─────────────────────┘         └──────┬──────┘
       │                                                       │
       └───────────────── Conexão DIRETA P2P ──────────────────┘
                     (mensagens não passam pelo servidor)
```

1. **Abra o app:** Defina seu Nickname e receba um **ID único**.
2. **Compartilhe:** Envie esse ID para seu amigo (WhatsApp, SMS, etc.).
3. **Conecte:** Seu amigo cola o SEU ID no app dele e clica em "Conectar & Conversar".
4. **Converse:** Uma conexão direta é estabelecida. Troquem mensagens em tempo real!

> ⚠️ **Nota:** Se um dos dois sair do app ou perder a internet, a conexão é encerrada e as mensagens são perdidas (não há servidor para salvá-las).

## 🛠 Tecnologias

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| React Native | 0.76.6 | Framework mobile |
| react-native-webrtc | 124.0.4 | Comunicação P2P via WebRTC |
| PeerJS | 1.5.5 | Biblioteca para sinalização WebRTC |
| React Navigation | 7.x | Navegação entre telas |
| AsyncStorage | Latest | Persistência de tema (Dark/Light) |

## 📋 Pré-requisitos

- Node.js 18+
- Android SDK (API 24+)
- Java JDK 17+
- ADB configurado no PATH

## ⚡ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/ChatGepetinho.git
cd ChatGepetinho

# Instale as dependências
npm install

# ⚠️ IMPORTANTE: O projeto já inclui patches para o PeerJS funcionar com Hermes
```

## 🚀 Como Executar

### Desenvolvimento (com Metro)

```bash
# Terminal 1: Inicie o Metro bundler
npx react-native start

# Terminal 2: Instale e rode no Android
npx react-native run-android
```

### Build de Release (APK)

```bash
# Gerar o bundle JavaScript
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

# Compilar o APK
cd android
./gradlew assembleRelease
cd ..

# O APK estará em: android/app/build/outputs/apk/release/app-release.apk
```

## 🔧 Configurações Importantes

### Permissões Android (AndroidManifest.xml)

O app requer as seguintes permissões para WebRTC funcionar:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE" />
```

### Nova Arquitetura React Native

A nova arquitetura (Fabric/TurboModules) está **desabilitada** por incompatibilidade com `react-native-webrtc`:

```properties
# android/gradle.properties
newArchEnabled=false
```

### Patch do PeerJS

O PeerJS usa `URLSearchParams.set()` que não é suportado pelo Hermes. Um patch foi aplicado nos arquivos:
- `node_modules/peerjs/dist/bundler.mjs`
- `node_modules/peerjs/dist/bundler.cjs`

## 📁 Estrutura do Projeto

```
ChatGepetinho/
├── index.js              # Entry point com polyfills
├── App.js                # Navegação principal
├── src/
│   ├── components/       # Componentes UI reutilizáveis
│   └── theme/            # Contexto de tema (Dark/Light)
├── screens/
│   ├── HomeScreen.js     # Tela inicial (gera ID, conecta)
│   └── ChatScreen.js     # Tela de conversa
├── services/
│   └── P2PService.js     # Serviço WebRTC/PeerJS
├── android/              # Código nativo Android
└── assets/               # Recursos estáticos
```

## 🐛 Troubleshooting

### Erro: "URLSearchParams.set is not implemented"
O Hermes engine não implementa `URLSearchParams.set()`. Verifique se o patch do PeerJS foi aplicado corretamente.

### Erro: "ACCESS_NETWORK_STATE permission"
Verifique se as permissões estão no `AndroidManifest.xml`.

### App fecha ao conectar
Desabilite a nova arquitetura em `android/gradle.properties`:
```properties
newArchEnabled=false
```

### Erro: "Unable to load script"
Gere o bundle manualmente:
```bash
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle
```

## 🤝 Como o ID é Único?

O PeerJS usa um servidor de sinalização que:
1. Gera UUIDs (128 bits) - chance de colisão: ~1 em 5.3×10³⁶
2. Mantém lista temporária de peers online
3. **NÃO armazena mensagens** - apenas facilita a conexão inicial

Após a conexão, toda comunicação é **direta entre os dispositivos**.

## 📄 Licença

MIT License - Sinta-se livre para usar e modificar!

---

Feito com ❤️ usando React Native + WebRTC