# 📚 Documentação da API - Portal do Candidato

## 🎯 Visão Geral

Esta API foi criada usando **Next.js 15 API Routes** e conecta-se ao banco de dados **MySQL** compartilhado com o portal Laravel (gestor).

---

## 🚀 Instalação e Configuração

### 1. Dependências Instaladas

```bash
npm install mysql2
```

### 2. Estrutura de Arquivos Criada

```
src/
├── lib/
│   └── db.ts                          # Configuração da conexão MySQL
└── app/
    └── api/
        ├── test-db/
        │   └── route.ts               # Testar conexão com BD
        ├── candidatos/
        │   ├── route.ts               # GET (listar) e POST (criar)
        │   └── [id]/
        │       └── route.ts           # GET, PUT, DELETE por ID
        └── salas/
            ├── route.ts               # GET (listar salas com imagens)
            └── [id]/
                └── route.ts           # GET (buscar sala por ID)
```

---

## ⚙️ Configuração do Banco de Dados

### Arquivo: `.env.local`

Edite o arquivo `.env.local` na raiz do projeto com as credenciais do seu MySQL:

```env
# URL base do portal gestor Laravel para acesso a imagens
NEXT_PUBLIC_STORAGE_URL=http://127.0.0.1:8000/storage

# Configurações do Banco de Dados MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_DATABASE=nome_do_banco_laravel
```

⚠️ **IMPORTANTE:**
- Use as **mesmas credenciais** do seu projeto Laravel
- Configure `NEXT_PUBLIC_STORAGE_URL` com a URL do portal gestor Laravel
- O arquivo `.env.local` não é commitado no git por segurança

---

## 🔧 Ajustes Necessários

### Alterar Nome das Tabelas

Nos arquivos de rota, ajuste o nome da tabela conforme seu banco Laravel:

**Arquivos a editar:**
- `src/app/api/candidatos/route.ts`
- `src/app/api/candidatos/[id]/route.ts`

**Exemplo:**
```typescript
// ANTES
const sql = `SELECT * FROM users WHERE id = ?`;

// DEPOIS (use o nome correto da sua tabela)
const sql = `SELECT * FROM candidatos WHERE id = ?`;
```

---

## 🏃 Como Executar

### Iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O servidor estará rodando em: `http://localhost:3000`

---

## 📡 Endpoints da API

### 1. **Testar Conexão com Banco de Dados**

```http
GET /api/test-db
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "message": "Conexão com MySQL estabelecida com sucesso!",
  "timestamp": "2025-10-12T10:30:00.000Z"
}
```

**Resposta de Erro:**
```json
{
  "success": false,
  "message": "Falha ao conectar com MySQL. Verifique as credenciais no .env.local"
}
```

---

### 2. **Listar Todos os Candidatos**

```http
GET /api/candidatos
```

**Query Parameters (opcionais):**
- `limit` - Limita o número de resultados (padrão: 100)

**Exemplos:**
- `GET /api/candidatos` - Todos os candidatos (máx. 100)
- `GET /api/candidatos?limit=10` - Primeiros 10 candidatos
- `GET /api/candidatos?limit=50` - Primeiros 50 candidatos

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "João Silva",
      "email": "joao@example.com",
      "created_at": "2025-01-15T10:00:00.000Z",
      "updated_at": "2025-01-15T10:00:00.000Z"
    },
    {
      "id": 2,
      "name": "Maria Santos",
      "email": "maria@example.com",
      "created_at": "2025-01-16T14:30:00.000Z",
      "updated_at": "2025-01-16T14:30:00.000Z"
    }
  ],
  "count": 2
}
```

---

### 3. **Criar Novo Candidato**

```http
POST /api/candidatos
Content-Type: application/json
```

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta de Sucesso (201):**
```json
{
  "success": true,
  "message": "Candidato criado com sucesso",
  "data": {
    "insertId": 3,
    "affectedRows": 1
  }
}
```

**Resposta de Erro (400):**
```json
{
  "success": false,
  "message": "Nome, email e senha são obrigatórios"
}
```

---

### 4. **Buscar Candidato por ID**

```http
GET /api/candidatos/[id]
```

**Exemplo:**
- `GET /api/candidatos/1`

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@example.com",
    "created_at": "2025-01-15T10:00:00.000Z",
    "updated_at": "2025-01-15T10:00:00.000Z"
  }
}
```

**Resposta de Erro (404):**
```json
{
  "success": false,
  "message": "Candidato não encontrado"
}
```

---

### 5. **Atualizar Candidato**

```http
PUT /api/candidatos/[id]
Content-Type: application/json
```

**Body (envie apenas os campos que deseja atualizar):**
```json
{
  "name": "João Silva Atualizado",
  "email": "joao.novo@example.com"
}
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "message": "Candidato atualizado com sucesso",
  "data": {
    "affectedRows": 1,
    "changedRows": 1
  }
}
```

**Resposta de Erro (400):**
```json
{
  "success": false,
  "message": "Nenhum campo para atualizar"
}
```

---

### 6. **Remover Candidato**

```http
DELETE /api/candidatos/[id]
```

**Exemplo:**
- `DELETE /api/candidatos/1`

**Resposta de Sucesso:**
```json
{
  "success": true,
  "message": "Candidato removido com sucesso",
  "data": {
    "affectedRows": 1
  }
}
```

---

### 7. **Listar Todas as Salas com Imagens**

```http
GET /api/salas
```

**Query Parameters (opcionais):**
- `limit` - Limita o número de resultados (padrão: 100)
- `localID` - Filtrar por local específico
- `provinciaID` - Filtrar por província
- `Em_Uso` - Filtrar por uso (valores: "Sim" ou "Não")

**Exemplos:**
- `GET /api/salas` - Todas as salas (máx. 100)
- `GET /api/salas?limit=10` - Primeiras 10 salas
- `GET /api/salas?localID=1` - Salas do local ID 1
- `GET /api/salas?Em_Uso=Sim` - Apenas salas em uso
- `GET /api/salas?localID=1&provinciaID=1&Em_Uso=Sim` - Combinação de filtros

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "localID": 1,
      "provinciaID": 1,
      "No_Sala": "A101",
      "Andar": "1º Andar",
      "Em_Uso": "Sim",
      "latitude": -25.965,
      "longitute": 32.583,
      "caminho_ficheiro": "salas/a101.png",
      "estado": 1,
      "created_at": "2025-05-08T14:11:09.000Z",
      "updated_at": "2025-09-28T16:54:06.000Z",
      "imagens": [
        {
          "id": 1,
          "nome_arquivo": "1759663665_0.png",
          "caminho_arquivo": "salas_imagens/1759663665_0.png",
          "tipo_mime": "image/png",
          "tamanho_arquivo": 869715,
          "descricao": null,
          "principal": 1,
          "estado": 1,
          "ordem": 0
        },
        {
          "id": 2,
          "nome_arquivo": "1759663665_1.jpg",
          "caminho_arquivo": "salas_imagens/1759663665_1.jpg",
          "tipo_mime": "image/jpeg",
          "tamanho_arquivo": 245890,
          "descricao": "Vista lateral",
          "principal": 0,
          "estado": 1,
          "ordem": 1
        }
      ]
    },
    {
      "id": 2,
      "localID": 1,
      "provinciaID": 1,
      "No_Sala": "B202",
      "Andar": "2º Andar",
      "Em_Uso": "Não",
      "latitude": -25.966,
      "longitute": 32.584,
      "caminho_ficheiro": "",
      "estado": 1,
      "created_at": "2025-05-10T10:20:30.000Z",
      "updated_at": "2025-09-25T12:30:00.000Z",
      "imagens": []
    }
  ],
  "count": 2,
  "filters": {
    "localID": null,
    "provinciaID": null,
    "Em_Uso": null
  }
}
```

**Características:**
- ✅ Retorna apenas salas ativas (`estado = 1`)
- ✅ Imagens ordenadas automaticamente (principal primeiro, depois por ordem)
- ✅ Suporta salas sem imagens (array vazio)
- ✅ Suporta múltiplas imagens por sala
- ✅ Filtros combinados para busca precisa

---

### 8. **Buscar Sala Específica por ID**

```http
GET /api/salas/[id]
```

**Exemplo:**
- `GET /api/salas/1`
- `GET /api/salas/15`

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "localID": 1,
    "provinciaID": 1,
    "No_Sala": "A101",
    "Andar": "1º Andar",
    "Em_Uso": "Sim",
    "latitude": -25.965,
    "longitute": 32.583,
    "caminho_ficheiro": "salas/a101.png",
    "estado": 1,
    "created_at": "2025-05-08T14:11:09.000Z",
    "updated_at": "2025-09-28T16:54:06.000Z",
    "imagens": [
      {
        "id": 1,
        "nome_arquivo": "1759663665_0.png",
        "caminho_arquivo": "salas_imagens/1759663665_0.png",
        "tipo_mime": "image/png",
        "tamanho_arquivo": 869715,
        "descricao": null,
        "principal": 1,
        "estado": 1,
        "ordem": 0
      }
    ]
  }
}
```

**Resposta de Erro (404):**
```json
{
  "success": false,
  "message": "Sala não encontrada"
}
```

**Uso recomendado:**
Esta rota é ideal para exibir detalhes completos de uma sala específica ao candidato, incluindo todas as suas imagens para facilitar o reconhecimento visual da localização.

---

## 🧪 Testando a API

### Usando o Navegador (apenas GET)

Abra no navegador:
- `http://localhost:3000/api/test-db`
- `http://localhost:3000/api/candidatos`
- `http://localhost:3000/api/candidatos/1`
- `http://localhost:3000/api/salas`
- `http://localhost:3000/api/salas?limit=5`
- `http://localhost:3000/api/salas/1`

### Usando cURL

**Testar conexão:**
```bash
curl http://localhost:3000/api/test-db
```

**Listar candidatos:**
```bash
curl http://localhost:3000/api/candidatos
```

**Criar candidato:**
```bash
curl -X POST http://localhost:3000/api/candidatos \
  -H "Content-Type: application/json" \
  -d '{"name":"João Silva","email":"joao@example.com","password":"senha123"}'
```

**Buscar candidato por ID:**
```bash
curl http://localhost:3000/api/candidatos/1
```

**Atualizar candidato:**
```bash
curl -X PUT http://localhost:3000/api/candidatos/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"João Silva Atualizado"}'
```

**Remover candidato:**
```bash
curl -X DELETE http://localhost:3000/api/candidatos/1
```

**Listar salas:**
```bash
curl http://localhost:3000/api/salas
```

**Listar salas com filtros:**
```bash
curl "http://localhost:3000/api/salas?limit=10&Em_Uso=Sim"
```

**Buscar sala por ID:**
```bash
curl http://localhost:3000/api/salas/1
```

### Usando Thunder Client / Postman / Insomnia

1. Importe as requisições acima
2. Configure a base URL: `http://localhost:3000`
3. Teste cada endpoint

**Exemplos de requisições no Postman para Salas:**

**1. Listar todas as salas:**
- Método: `GET`
- URL: `http://localhost:3000/api/salas`

**2. Listar salas filtradas:**
- Método: `GET`
- URL: `http://localhost:3000/api/salas?localID=1&Em_Uso=Sim`

**3. Buscar sala específica:**
- Método: `GET`
- URL: `http://localhost:3000/api/salas/1`

---

## 🛠️ Funções Auxiliares (src/lib/db.ts)

### `query<T>(sql: string, params?: any[])`

Executa uma query SQL com prepared statements (proteção contra SQL injection).

**Exemplo de uso:**
```typescript
import { query } from '@/lib/db';

// SELECT
const users = await query('SELECT * FROM users WHERE id = ?', [userId]);

// INSERT
const result = await query(
  'INSERT INTO users (name, email) VALUES (?, ?)',
  ['João', 'joao@example.com']
);

// UPDATE
await query('UPDATE users SET name = ? WHERE id = ?', ['Novo Nome', userId]);

// DELETE
await query('DELETE FROM users WHERE id = ?', [userId]);
```

### `testConnection()`

Testa se a conexão com o MySQL está funcionando.

**Exemplo:**
```typescript
import { testConnection } from '@/lib/db';

const isConnected = await testConnection();
if (isConnected) {
  console.log('✅ Conectado ao MySQL!');
}
```

---

## 🔒 Segurança

### ✅ Implementado:
- **Prepared Statements** - Proteção contra SQL Injection
- **Connection Pool** - Gerenciamento eficiente de conexões
- **Variáveis de ambiente** - Credenciais não no código

### ⚠️ Recomendações:
- Adicione autenticação JWT antes de usar em produção
- Valide todos os inputs (use Zod ou Yup)
- Implemente rate limiting
- Hash de senhas com bcrypt antes de salvar no banco
- Configure CORS adequadamente

---

## 📝 Próximos Passos

### 1. Adicionar Autenticação
```typescript
// Exemplo com JWT
import { verify } from 'jsonwebtoken';

export async function GET(request: Request) {
  const token = request.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  // Verificar token...
}
```

### 2. Adicionar Validação de Dados
```bash
npm install zod
```

```typescript
import { z } from 'zod';

const candidatoSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6)
});

export async function POST(request: Request) {
  const body = await request.json();
  const validated = candidatoSchema.parse(body); // Lança erro se inválido
}
```

### 3. Criar Mais Endpoints

Baseie-se nos exemplos existentes para criar rotas para:
- Vagas
- Candidaturas
- Documentos
- etc.

---

## 🐛 Troubleshooting

### Erro: "Cannot connect to MySQL"
- Verifique se o MySQL está rodando
- Confirme as credenciais no `.env.local`
- Teste a conexão com `GET /api/test-db`

### Erro: "Table doesn't exist"
- Altere o nome da tabela nos arquivos de rota
- Verifique se a tabela existe no banco Laravel

### Erro: "Port 3000 already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3000
kill -9 <PID>
```

---

## 📞 Suporte

Para mais informações sobre Next.js API Routes:
- [Documentação oficial Next.js](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [MySQL2 no NPM](https://www.npmjs.com/package/mysql2)

---

**Criado em:** 2025-10-12
**Framework:** Next.js 15.3.2
**Database:** MySQL com mysql2