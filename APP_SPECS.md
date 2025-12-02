# Especificações de Design e Funcionalidades - Chat Gepetinho

Este documento detalha as funcionalidades atuais, fluxo do usuário e elementos de interface do aplicativo para orientar o desenvolvimento de um novo Front-end.

## 📱 Visão Geral
O **Chat Gepetinho** é um aplicativo de mensagens instantâneas Peer-to-Peer (P2P). O foco do design deve ser na **privacidade**, **simplicidade** e **feedback visual** do status da conexão, já que não há servidor central.

## 🛠 Funcionalidades Principais

1.  **Geração de Identidade (Peer ID)**: O usuário recebe um ID único ao abrir o app.
2.  **Renovação de Identidade**: O usuário pode gerar um novo ID se desejar.
3.  **Identificação (Nickname)**: O usuário define um apelido para ser visto pelos outros.
4.  **Conexão Direta**: Conexão manual através da troca de IDs.
5.  **Chat em Tempo Real**: Troca de mensagens de texto.
6.  **Contador de Participantes**: Visualização de quantas pessoas estão conectadas na sessão.
7.  **Feedback de Status**: Indicadores visuais de conexão, desconexão e erros.

---

## 🎨 Elementos de Interface (UI)

### 1. Tela Inicial (Home)
A porta de entrada do aplicativo. Precisa passar confiança e clareza sobre como conectar.

**Elementos Obrigatórios:**
*   **Display do ID do Usuário**:
    *   Deve ser proeminente.
    *   **Ação**: Toque para copiar (Clipboard).
    *   *Sugestão de Design*: Estilo "Cartão" ou "Badge" grande.
*   **Botão "Renovar ID"**:
    *   Permite gerar um novo UUID.
    *   *Estado*: Deve indicar carregamento enquanto conecta ao servidor de sinalização.
*   **Input de Nickname**:
    *   Campo de texto para o usuário digitar seu nome.
    *   *Validação*: Obrigatório para conectar.
*   **Input de ID do Destinatário**:
    *   Campo para colar o ID do amigo.
*   **Botão "Conectar"**:
    *   Ação principal da tela.
    *   Deve estar desabilitado ou validar se os campos (Nickname e ID do Amigo) estão preenchidos.
*   **Indicador de Status**:
    *   Texto ou ícone mostrando: "Conectando...", "Online", "Erro".
*   **Área de Feedback de Erro**:
    *   Espaço para exibir mensagens de erro amigáveis (ex: "Falha na conexão").

### 2. Tela de Chat
A interface de conversa ativa.

**Elementos Obrigatórios:**
*   **Cabeçalho (Header)**:
    *   Deve mostrar o status da sala.
    *   **Contador de Participantes**: Ex: "Chat (2 pessoas)".
*   **Lista de Mensagens**:
    *   **Balão do Usuário (Eu)**: Alinhado à direita, cor de destaque.
    *   **Balão do Outro (Amigo)**: Alinhado à esquerda, cor neutra.
    *   **Conteúdo do Balão**:
        *   **Nickname**: Exibido acima da mensagem (apenas para mensagens recebidas).
        *   **Texto da Mensagem**.
        *   **Horário**: Hora do envio (ex: 14:30).
*   **Barra de Entrada (Input Bar)**:
    *   Fixada na parte inferior.
    *   **Campo de Texto**: Para digitar a mensagem.
    *   **Botão Enviar**: Para disparar a mensagem.

---

## 🧠 Fluxo de Dados e Estados (Para o Desenvolvedor Front-end)

Ao redesenhar, considere que a interface precisa reagir a estes eventos do `P2PService`:

1.  **`onIdReceived`**: O ID chegou -> Habilitar botão de cópia, remover loading.
2.  **`onConnectionOpened`**: Conexão estabelecida -> Navegar para tela de Chat.
3.  **`onMessageReceived`**: Nova mensagem -> Adicionar à lista com animação suave.
4.  **`onConnectionListChanged`**: Alguém entrou/saiu -> Atualizar contador no header.
5.  **`onDisconnected`**: O outro saiu -> Mostrar alerta e voltar para Home ou desabilitar chat.
6.  **`onError`**: Algo deu errado -> Mostrar Toast ou Banner de erro.

## 💡 Sugestões para o Novo Design

*   **Tema**: Adotar um tema moderno (Dark/Light mode).
*   **Animações**:
    *   Micro-interação ao copiar o ID.
    *   Transição suave ao entrar mensagens.
*   **Acessibilidade**:
    *   Cores com bom contraste.
    *   Inputs com labels claros.
    *   Botões com tamanho de toque adequado (min 44px).
