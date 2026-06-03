## 📸 Visão Geral

O **Boa Barbearia** é uma aplicação web fullstack que permite ao barbeiro/administrador:

- Criar uma conta protegida por senha com hashing bcrypt
- Fazer login com autenticação JWT via NextAuth.js
- Visualizar um **dashboard** com os agendamentos do dia
- Criar, editar, excluir e listar **todos os agendamentos**
- Gerenciar status dos atendimentos: `agendado`, `concluído` ou `cancelado`

---

## 🚀 Stack de Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript 5 |
| Banco de dados | MongoDB Atlas + Mongoose |
| Autenticação | NextAuth.js v4 (JWT) |
| Estilização | Tailwind CSS v4 + ShadCN/UI |
| Estado global | Zustand |
| Ícones | Lucide React |
| Criptografia | bcryptjs |

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/
│   │   ├── agendamentos/
│   │   │   ├── route.ts          # GET (listar) e POST (criar)
│   │   │   └── [id]/route.ts     # GET, PUT, PATCH e DELETE por ID
│   │   ├── auth/[...nextauth]/   # Handler do NextAuth
│   │   └── register/route.ts     # Cadastro de usuário com bcrypt
│   ├── dashboard/
│   │   ├── layout.tsx            # Layout protegido (getServerSession)
│   │   ├── page.tsx              # Agendamentos do dia
│   │   ├── loading.tsx           # Estado de carregamento
│   │   ├── error.tsx             # Tratamento de erros
│   │   └── agendamentos/
│   │       ├── page.tsx          # Lista completa
│   │       ├── novo/page.tsx     # Formulário de criação
│   │       └── edit/[id]/        # Formulário de edição (rota dinâmica)
│   ├── login/page.tsx
│   └── register/page.tsx
├── components/
│   ├── DeleteButton.tsx          # Client Component com modal Zustand
│   └── ui/button.tsx             # Componente ShadCN customizado
├── lib/
│   ├── auth.ts                   # Configuração NextAuth
│   ├── db.ts                     # Conexão Singleton MongoDB
│   └── utils.ts                  # Utilitários (cn)
├── models/
│   ├── Agendamento.ts            # Schema Mongoose
│   └── User.ts                   # Schema de usuário
├── store/
│   └── uiStore.ts                # Store Zustand (modal)
└── types/
    └── index.ts                  # Tipos TypeScript globais
```

---

## ⚙️ Como Rodar Localmente

### Pré-requisitos

- Node.js 18+
- Conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (plano gratuito funciona)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/BarbeariaFullStack.git
cd BarbeariaFullStack
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# String de conexão do MongoDB Atlas
# Acesse: Atlas → Connect → Drivers → copie a URI
MONGODB_URI=mongodb+srv://<usuario>:<senha>@cluster0.xxxxx.mongodb.net/barbearia?retryWrites=true&w=majority

# Segredo para assinar os tokens JWT do NextAuth
# Gere um com: openssl rand -base64 32
NEXTAUTH_SECRET=seu_segredo_aqui

# URL base da aplicação
NEXTAUTH_URL=http://localhost:3000
```

### 4. Rode o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### 5. Crie seu primeiro usuário

Navegue até `/register` para criar a conta de administrador. Em seguida, faça login em `/login`.

---
