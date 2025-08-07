# FRT Server - Sistema de Autenticação

Servidor Express com autenticação JWT, Prisma e SQLite para gerenciamento de usuários.

## 🚀 Tecnologias

- **Express.js** - Framework web
- **JWT** - Autenticação por token
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados
- **bcryptjs** - Hash de senhas
- **express-validator** - Validação de dados

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🛠️ Instalação

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar variáveis de ambiente:**
```bash
cp env.example .env
```

3. **Configurar banco de dados:**
```bash
npm run db:generate
npm run db:push
```

4. **Executar seed (criar usuário admin):**
```bash
npm run db:seed
```

## 🏃‍♂️ Executando o projeto

**Desenvolvimento:**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

## 📊 Usuário Admin Padrão

Após executar o seed, você terá acesso ao usuário admin:

- **Email:** admin@admin
- **Senha:** admin
- **Role:** ADMIN

## 🔐 Endpoints da API

### Autenticação

#### POST `/api/auth/login`
Fazer login de usuário.

**Body:**
```json
{
  "email": "admin@admin",
  "password": "admin"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "user": {
      "id": 1,
      "email": "admin@admin",
      "name": "Administrador",
      "role": "ADMIN",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### GET `/api/auth/profile`
Obter perfil do usuário logado (requer token).

**Headers:**
```
Authorization: Bearer <token>
```

### Usuários (Apenas Admin)

#### GET `/api/users`
Listar todos os usuários.

#### GET `/api/users/:id`
Obter usuário por ID.

#### POST `/api/users`
Criar novo usuário.

**Body:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123",
  "name": "Nome do Usuário",
  "role": "USER"
}
```

#### PUT `/api/users/:id`
Atualizar usuário.

**Body:**
```json
{
  "name": "Novo Nome",
  "email": "novo@email.com",
  "role": "ADMIN"
}
```

#### DELETE `/api/users/:id`
Deletar usuário.

## 🔧 Scripts Disponíveis

- `npm start` - Iniciar servidor em produção
- `npm run dev` - Iniciar servidor em desenvolvimento
- `npm run db:generate` - Gerar cliente Prisma
- `npm run db:push` - Sincronizar schema com banco
- `npm run db:seed` - Executar seed do banco
- `npm run db:studio` - Abrir Prisma Studio

## 📁 Estrutura do Projeto

```
server/
├── src/
│   ├── config/
│   │   └── database.js          # Configuração do Prisma
│   ├── controllers/
│   │   ├── authController.js    # Controller de autenticação
│   │   └── userController.js    # Controller de usuários
│   ├── middleware/
│   │   ├── auth.js             # Middleware de autenticação
│   │   └── validation.js       # Middleware de validação
│   ├── routes/
│   │   ├── authRoutes.js       # Rotas de autenticação
│   │   └── userRoutes.js       # Rotas de usuários
│   └── server.js               # Arquivo principal
├── prisma/
│   ├── schema.prisma           # Schema do banco
│   └── seed.js                 # Seed do banco
├── package.json
├── env.example
└── README.md
```

## 🔒 Segurança

- Senhas são hasheadas com bcrypt
- Tokens JWT com expiração
- Middleware de autenticação em rotas protegidas
- Validação de dados com express-validator
- Headers de segurança com helmet

## 🧪 Testando a API

### 1. Fazer login como admin:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@admin","password":"admin"}'
```

### 2. Usar o token retornado para acessar rotas protegidas:
```bash
curl -X GET http://localhost:3001/api/users \
  -H "Authorization: Bearer <seu_token_aqui>"
```

## 📝 Notas

- O usuário admin não pode ser deletado
- Apenas admins podem gerenciar usuários
- Tokens JWT expiram em 24 horas por padrão
- Banco SQLite é criado automaticamente no diretório `prisma/` 