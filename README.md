# 💬 Chat em Tempo Real — Teste Técnico Node.js (Nível 2)

Aplicação web de chat em tempo real desenvolvida como desafio técnico, com funcionalidades de cadastro, autenticação e troca de mensagens entre usuários autenticados.

O projeto foi desenvolvido com foco em boas práticas, arquitetura organizada, comunicação em tempo real e experiência do usuário.

---

## 🚀 Tecnologias Utilizadas

### Backend
- Node.js
- NestJS
- MongoDB (Mongoose)
- JWT (JSON Web Token)
- Passport.js
- Socket.IO
- Docker e Docker Compose

### Frontend
- Next.js (React)
- TypeScript
- WebSockets
- CSS Modules
- Axios

---

## 📂 Estrutura do Projeto

```

/
├── backend   # API REST + WebSocket + MongoDB
├── frontend  # Interface Web (Chat)
└── README.md # Documentação geral do projeto

````

---

## ⚙️ Como Executar o Projeto

### 🔹 Configuração de Variáveis de Ambiente (Backend)

Antes de subir o backend, é necessário criar um arquivo `.env` dentro da pasta `backend` com as seguintes variáveis:

```env
JWT_SECRET=supersecret
MONGO_URI=mongodb://mongo:27017/chat
````

Essas variáveis são utilizadas para:

* Assinatura e validação do JWT
* Conexão com o banco de dados MongoDB

---

### 🔹 Backend (com Docker)

O backend possui suporte completo a Docker.

```bash
cd backend
docker-compose up --build
````

A API ficará disponível em:

```
http://localhost:3000
```

📄 Mais detalhes técnicos estão disponíveis no arquivo:

```
backend/README.md
```

---

### 🔹 Frontend

```bash
cd frontend
yarn install
yarn dev
```

A aplicação ficará disponível em:

```
http://localhost:3001
```

---

## 🔐 Autenticação

* Autenticação baseada em JWT
* O token retornado no login é utilizado:

  * em rotas REST protegidas
  * no handshake do WebSocket
* Controle de acesso centralizado via Guards

---

## 💬 Chat em Tempo Real

* Comunicação via WebSocket (Socket.IO)
* Mensagens privadas entre usuários
* Atualização em tempo real
* Persistência das mensagens no MongoDB
* Histórico carregado via REST

---

## 👥 Funcionalidades Implementadas

* Cadastro de usuários
* Login com autenticação JWT
* Lista de usuários online/offline em tempo real
* Chat privado em tempo real
* Persistência de mensagens
* Histórico de conversas
* Notificação de novas mensagens
* Indicador de mensagens não lidas
* Interface moderna e responsiva
* Avatares automáticos por usuário

---

## 🧠 Decisões Técnicas

* Separação clara entre REST (dados e histórico) e WebSocket (tempo real)
* JWT compartilhado entre HTTP e WebSocket
* Gateway de chat isolado
* Arquitetura modular no backend
* Estado do chat controlado no frontend
* Avatares gerados dinamicamente para simplificar a experiência do usuário

---

## ⚠️ Possíveis Melhorias Futuras

* Paginação do histórico de mensagens
* Confirmação de entrega e leitura de mensagens
* Rooms por conversa no WebSocket
* Refresh token
* Upload de avatar personalizado
* Melhor tratamento de erros globais

---

## 📌 Observação

Este projeto foi desenvolvido como desafio técnico, priorizando clareza, organização, boas práticas e escopo adequado ao tempo de execução.

---

## 👨‍💻 Autor

Projeto desenvolvido por **Davi Lima** como teste técnico em Node.js.

