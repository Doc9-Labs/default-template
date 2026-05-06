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
├── src/
│   ├── main.jsx       # Entry point React
│   └── style.css      # Design system CSS
├── index.html         # HTML base (Vite)
├── vite.config.js     # Config Vite
├── .env               # Variáveis locais (PORT, APP_SUBDOMAIN)
├── .env.shared        # Variáveis compartilhadas do hub (auto-sincronizadas)
├── .claude/           # Referência do design system (não editar)
└── .github/workflows/deploy.yml  # CI/CD automático
```

## Deploy
- O deploy é automático: faça push para `main` e a GitHub Action conecta via SSH no servidor, puxa as mudanças, instala dependências e reinicia via PM2.
- Variáveis de ambiente compartilhadas entre apps são gerenciadas pelo Hub.

## Comandos
```bash
npm run dev    # Desenvolvimento local (Vite)
npm run build  # Build de produção
node server.js # Inicia o servidor Express
```
