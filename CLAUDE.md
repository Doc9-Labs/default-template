# Doc9 Hub App — Claude Code Instructions

## Contexto
Este app faz parte do **Doc9 Hub** (hub.doc9lawtech.com.br) — uma plataforma de deploy automático de apps. Este repositório foi criado automaticamente a partir do template padrão.

## Stack
- **Frontend**: React + Vite (em `src/`)
- **Backend**: Node.js + Express (em `server.js`)
- **Estilo**: Vanilla CSS com Design System Doc9 (em `src/style.css`)
- **Deploy**: Automático via GitHub Actions no push para `main`

## Design System
O design system completo está documentado na pasta `.claude/`. **Sempre siga estes padrões ao criar ou editar componentes visuais.**

### Referências rápidas:
- **Tokens de design**: `.claude/design-system/tokens.md` — cores, tipografia, espaçamento, sombras
- **Tema dark/light**: `.claude/design-system/theme-darkmode.md` — como implementar temas
- **Layout**: `.claude/design-system/layout.md` — estrutura de página, grid, breakpoints
- **Ícones**: `.claude/design-system/icons.md` — ícones disponíveis
- **Componentes**: `.claude/components/` — specs de cada componente (sidebar, box, modal, form, table, etc.)
- **Páginas**: `.claude/pages/` — exemplos de composição de página

### Regras de estilo obrigatórias:
1. **Fonte**: Poppins (Google Fonts), pesos 300-700
2. **Cor principal da marca**: `#3C21F7` (roxo), gradient: `#3C21F7 → #9B8DFF`
3. **Cards/Boxes**: fundo `var(--box-bg)`, radius `10px`, sombra `var(--shadow)`
4. **Inputs**: radius `8px`, foco com borda `#3C21F7` e glow `rgba(60,33,247,0.15)`
5. **Botões primários**: gradient da marca, sombra roxa
6. **Dark mode**: classe `.dark` no `<html>`, CSS variables mudam automaticamente
7. **Nunca use Tailwind** a menos que explicitamente solicitado

## Estrutura de Arquivos
```
├── server.js          # Express server (porta via env PORT)
├── db.js              # Helper PostgreSQL (pool com schema isolado)
├── claude.js          # Helper Claude AI (client Anthropic pré-configurado)
├── src/
│   ├── main.jsx       # Entry point React
│   └── style.css      # Design system CSS
├── index.html         # HTML base (Vite)
├── vite.config.js     # Config Vite
├── .env               # Variáveis locais (PORT, APP_SUBDOMAIN, DATABASE_URL, DB_SCHEMA)
├── .env.shared        # Variáveis compartilhadas do hub (auto-sincronizadas)
├── .env.app           # Variáveis específicas do app (gerenciadas pelo Hub)
├── .claude/           # Referência do design system (não editar)
└── .github/workflows/deploy.yml  # CI/CD automático
```

## Deploy
- O deploy é automático: faça push para `main` e a GitHub Action conecta via SSH no servidor, puxa as mudanças, instala dependências e reinicia via PM2.
- Variáveis de ambiente compartilhadas entre apps são gerenciadas pelo Hub.

## Banco de Dados (PostgreSQL)

Cada app possui acesso a um banco PostgreSQL compartilhado, com **schema isolado** para seus dados. As variáveis são configuradas automaticamente pelo Hub.

### Variáveis de ambiente disponíveis
| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DATABASE_URL` | String de conexão PostgreSQL | `postgresql://doc9_app:senha@localhost:5432/doc9_hub_db` |
| `DB_SCHEMA` | Schema isolado do app | `app_suporte` |

> Essas variáveis estão no `.env` do app e são carregadas automaticamente pelo `server.js`.

### Helper `db.js`

O arquivo `db.js` na raiz do projeto fornece um pool de conexão pré-configurado que **já aponta para o schema do app automaticamente**. Basta importar e usar:

```js
const db = require('./db');
```

### Criação de tabelas

As tabelas são criadas dentro do schema do app. Não é necessário especificar o schema — o `search_path` é configurado automaticamente.

```js
await db.query(`
  CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE,
    telefone TEXT,
    criado_em TIMESTAMP DEFAULT NOW()
  )
`);
```

### CRUD — Exemplos completos

**Inserir:**
```js
const { rows } = await db.query(
  'INSERT INTO clientes (nome, email) VALUES ($1, $2) RETURNING *',
  ['João Silva', 'joao@email.com']
);
const novoCliente = rows[0];
```

**Buscar:**
```js
// Todos
const { rows: todos } = await db.query('SELECT * FROM clientes ORDER BY criado_em DESC');

// Com filtro
const { rows } = await db.query('SELECT * FROM clientes WHERE email = $1', ['joao@email.com']);

// Com paginação
const { rows } = await db.query('SELECT * FROM clientes ORDER BY id LIMIT $1 OFFSET $2', [10, 0]);
```

**Atualizar:**
```js
await db.query(
  'UPDATE clientes SET nome = $1, telefone = $2 WHERE id = $3',
  ['João S.', '11999999999', 1]
);
```

**Deletar:**
```js
await db.query('DELETE FROM clientes WHERE id = $1', [1]);
```

### Transações

Para operações que precisam ser atômicas, use `getClient()`:

```js
const client = await db.getClient();
try {
  await client.query('BEGIN');
  await client.query('INSERT INTO pedidos (cliente_id, total) VALUES ($1, $2)', [1, 150.00]);
  await client.query('UPDATE clientes SET ultimo_pedido = NOW() WHERE id = $1', [1]);
  await client.query('COMMIT');
} catch (e) {
  await client.query('ROLLBACK');
  throw e;
} finally {
  client.release();
}
```

### Uso em rotas Express

```js
const db = require('./db');

app.get('/api/clientes', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM clientes ORDER BY nome');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/clientes', async (req, res) => {
  const { nome, email } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO clientes (nome, email) VALUES ($1, $2) RETURNING *',
      [nome, email]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

### Regras importantes
1. **Sempre use `$1, $2, ...`** para parâmetros — nunca concatene strings SQL (evita SQL injection)
2. **Não edite o `search_path` manualmente** — o `db.js` já configura para o schema do app
3. **Cada app tem seu schema isolado** — tabelas de um app não interferem em outro
4. **Não é necessário instalar `pg`** — já está nas dependências do projeto
5. **O banco é compartilhado** — use apenas para dados do seu app, não tente acessar schemas de outros apps

## Claude AI (Anthropic)

Cada app pode usar a **Claude API** diretamente. O Hub gerencia o workspace e a API key é configurada via variável de ambiente.

### Variável de ambiente
| Variável | Descrição |
|----------|-----------|
| `ANTHROPIC_API_KEY` | API key da Anthropic associada ao workspace do app |

> A key é configurada pelo admin no painel do Hub como variável de ambiente do app.

### Helper `claude.js`

O arquivo `claude.js` na raiz fornece um client pré-configurado:

```js
const claude = require('./claude');
```

### Enviar uma mensagem simples

```js
const resposta = await claude.message('Explique o que é machine learning em 2 frases');
console.log(resposta); // texto da resposta
```

### Enviar com system prompt

```js
const resposta = await claude.message('Analise este contrato...', {
  system: 'Você é um assistente jurídico especializado em contratos.',
  max_tokens: 2048,
});
```

### Conversação (chat)

```js
const resposta = await claude.chat([
  { role: 'user', content: 'Olá, quem é você?' },
  { role: 'assistant', content: 'Sou o Claude, um assistente de IA.' },
  { role: 'user', content: 'Me ajude a escrever um email profissional.' },
], {
  system: 'Responda sempre em português formal.',
});
```

### Uso em rotas Express

```js
const claude = require('./claude');

app.post('/api/ask', express.json(), async (req, res) => {
  try {
    const resposta = await claude.message(req.body.pergunta);
    res.json({ resposta });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

### Client avançado (SDK completo)

```js
const claude = require('./claude');
const client = claude.getClient();

const result = await client.messages.create({
  model: 'claude-sonnet-4-20250514',
  max_tokens: 4096,
  messages: [
    { role: 'user', content: [{ type: 'text', text: 'Descreva esta imagem...' }] }
  ]
});
```

### Regras importantes
1. **Nunca commite a API key** — ela deve estar apenas na variável de ambiente
2. **Cada app tem seu workspace** — o consumo é rastreado separadamente
3. **Não é necessário instalar `@anthropic-ai/sdk`** — já está nas dependências
4. **Use `claude.message()` para casos simples** — evite complexidade desnecessária
5. **Monitore o consumo** no painel Claude AI do Hub

## Comandos
```bash
npm run dev    # Desenvolvimento local (Vite)
npm run build  # Build de produção
node server.js # Inicia o servidor Express
```
