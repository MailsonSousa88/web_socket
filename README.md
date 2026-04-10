# Construindo um WebSocket Server e um Client do Zero

### Tecnologia em Análise e Desenvolvimento de Sistemas
### Aluno: Francisco Mailson da Silva Sousa
### Disciplina: Redes de Computadores
### Professor: Iallen Gábio
### Mod: III

---

## Visão geral

Este projeto demonstra uma aplicação cliente/servidor baseada em WebSocket.
O cliente web envia requisições de cálculo para o servidor, que processa a operação e devolve o resultado via socket.

## Estrutura do projeto

### `meu_cliente`

- Aplicação front-end em TypeScript, HTML e CSS.
- Bundled com `Parcel` (`parcel` na `devDependencies`).
- Arquivos principais:
  - `client/index.html` — interface com formulário e área de logs.
  - `client/client.ts` — lógica do WebSocket, envio de operação e exibição de logs.
  - `client/style.css` — estilo da aplicação.
- Funcionalidade:
  - Conecta em `ws://localhost:7001`.
  - Envia mensagens de texto com o formato:
    - `OPERATION: ADD|SUB|MUL|DIV`
    - `OPERAND1: <numero>`
    - `OPERAND2: <numero>`
  - Exibe logs de conexão, envio e resposta do servidor.

### `meu_servidor`

- Servidor backend em Node.js com TypeScript.
- Usa o pacote `ws` para WebSocket e `http` para criar o servidor HTTP base.
- Dependências:
  - `ws` — servidor WebSocket.
  - `typescript` e `ts-node` — compilação/executação TypeScript.
  - `@types/ws` — tipos para o pacote `ws`.
- Arquivos principais:
  - `server/server.ts` — cria o servidor HTTP e o `WebSocketServer`.
  - `protocol/requestParser.ts` — parseia as mensagens recebidas do cliente.
  - `protocol/calculator.ts` — executa operações matemáticas simples.
  - `protocol/responseSerializer.ts` — formata resposta de sucesso ou erro.
- Funcionalidade:
  - Recebe mensagens do cliente via WebSocket.
  - Processa operações `ADD`, `SUB`, `MUL` e `DIV`.
  - Retorna resultado ou mensagem de erro em texto.

## Como executar

### 1. Instalar dependências

No diretório `meu_cliente`:

```bash
cd meu_cliente
npm install
```

No diretório `meu_servidor`:

```bash
cd meu_servidor
npm install
```

### 2. Executar o servidor

No diretório `meu_servidor`:

```bash
npm run build
npm start
```

O servidor deve ficar escutando em `http://localhost:7001` para conexões WebSocket.

### 3. Executar o cliente

No diretório `meu_cliente`:

```bash
npm run dev
```

Depois abra o navegador no endereço indicado pelo Parcel e use o formulário para enviar operações.

## Observações

- O cliente e o servidor foram construídos com foco em aprendizado e demonstração do fluxo de comunicação WebSocket.
- A aplicação usa TypeScript em ambos os lados para aumentar a segurança de tipos e facilitar a manutenção.

