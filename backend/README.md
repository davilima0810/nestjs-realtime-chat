# Desafio Técnico – Chat em Tempo Real (Node.js + NestJS)

Este projeto implementa um backend para cadastro, autenticação e troca de mensagens em tempo real entre usuários.

A aplicação foi desenvolvida com foco em boas práticas, arquitetura modular e uso correto de autenticação e WebSocket.

---

## Tecnologias Utilizadas

- Node.js
- NestJS
- MongoDB (Mongoose)
- JWT (JSON Web Token)
- Passport.js
- Socket.IO
- Docker e Docker Compose
- Yarn

---

## Arquitetura do Projeto

O projeto segue a arquitetura modular recomendada pelo NestJS.

src/
- auth/        Autenticação (JWT, Passport)
- users/       Cadastro de usuários
- chat/        Gateway WebSocket (chat em tempo real)
- messages/    Persistência e histórico de mensagens
- app.module.ts
- main.ts

---

## Autenticação

A autenticação é feita utilizando JWT.

- O login retorna um access_token
- O token é utilizado:
  - em rotas REST protegidas
  - no handshake do WebSocket

Exemplo de header:

Authorization: Bearer TOKEN

---

## Comunicação em Tempo Real (WebSocket)

- Implementada com Socket.IO
- Autenticação feita no handshake com JWT
- Cada usuário entra em uma sala baseada no seu userId
- Mensagens são enviadas apenas ao destinatário correto

Eventos principais:
- send_message: envio de mensagem privada
- new_message: recebimento de mensagem em tempo real

---

## Persistência de Mensagens

As mensagens são armazenadas no MongoDB com os campos:

- from (ObjectId)
- to (ObjectId)
- content (string)
- createdAt (date)

Isso permite histórico completo e ordenado das conversas.

---

## Endpoints REST

### Registro de usuário
POST /auth/register

Body:
{
  "name": "Davi",
  "username": "davi",
  "password": "123456"
}

---

### Login
POST /auth/login

Body:
{
  "username": "davi",
  "password": "123456"
}

---

### Histórico de mensagens
GET /messages/:userId

Header:
Authorization: Bearer TOKEN

Retorna o histórico da conversa entre o usuário autenticado e o usuário informado.

---

## Executando com Docker

1. Criar o arquivo .env na raiz do backend:

JWT_SECRET=supersecret
MONGO_URI=mongodb://mongo:27017/chat

2. Subir os containers:

docker-compose up --build

A aplicação ficará disponível em:
http://localhost:3000

---

## Executando localmente (sem Docker)

Pré-requisitos:
- Node.js
- MongoDB
- Yarn

Passos:

yarn install
yarn start:dev

---

## Decisões Técnicas

- JWT configurado via ConfigService para evitar problemas de ambiente
- JwtModule compartilhado entre REST e WebSocket
- Chat isolado em Gateway próprio para evitar múltiplas instâncias
- Separação clara entre:
  - REST (histórico)
  - WebSocket (tempo real)
- Uso de rooms por usuário para mensagens privadas

---

## Requisitos Atendidos

- Cadastro de usuários
- Autenticação com JWT
- Chat em tempo real
- Persistência no MongoDB
- Histórico de mensagens
- WebSocket autenticado
- Docker configurado
- Arquitetura modular

---

## Autor

Projeto desenvolvido como desafio técnico, com foco em boas práticas, organização e escalabilidade.
