# Página: Clients (Manager Client)

**Arquivo original:** `protend/clients.html`
**Modificador no `<main>`:** `.main-content.client`
**Rota Next.js sugerida:** `/clients`

## Visão geral

Listagem de clientes com filtros e duas visualizações: lista (DataTable) e board (cards). Botão para adicionar novo cliente.

## Estrutura

```
[ Sidebar ] [ Topbar ]
[ Main Content "client" ]
  Row 1 — IconCards
  Row 2 — Box com filtros + alternador de visualização
    [Search input + Select empresa + Search button]
    [Toggle list/board + botão "Add Client"]
  Row 3 — Conteúdo
    Modo lista: DataTable de clientes
    Modo board: grade de ClientCards
  + modal #add_client (form de criação)
```

## Componentes consumidos

| Componente | Documentação |
|-----------|-------------|
| Shell (`<Sidebar/>`, `<Topbar />`) | shell padrão |
| `<IconCard />` × 4 | `components/icon-card.md` |
| `<Field />` + `<Select />` (filtros) | `components/form-controls.md` |
| `<Button variant="primary">Search</Button>` | `components/form-controls.md` |
| `<ClientsTable />` | `components/data-table.md` |
| `<ClientCard />` (modo board) | similar a `components/project-card.md` |
| `<Modal />` `#add_client` | `components/modal.md` |

## Filtros e alternador (markup-resumo)

```html
<div class="box-body d-flex justify-content-between">
  <div class="search-form d-flex">
    <input type="text" placeholder="Client Name" class="form-control">
    <select class="form-control">
      <option>Select Company Name</option>
      <option>Company 1</option>
    </select>
    <button class="search d-flex"><i class="fas fa-search"></i>Search</button>
  </div>
  <div class="list-action">
    <a class="list" href="#" onclick="liststyle()"><i class='bx bx-menu'></i></a>
    <a class="list-board active" href="#" onclick="listboard()"><i class='bx bxs-dashboard'></i></a>
    <a href="#" class="add" data-toggle="modal" data-target="#add_client">Add Client<i class="fas fa-plus-circle"></i></a>
  </div>
</div>
```

## Libs JS específicas

- DataTables.net + responsive (visão de lista)
- Bootstrap (modal)

## Composição React (sugestão)

```tsx
// app/(dashboard)/clients/page.tsx
'use client'
import { useState } from 'react'
import { Plus, Menu, LayoutDashboard } from 'lucide-react'

export default function ClientsPage() {
  const [view, setView] = useState<'list' | 'board'>('list')
  const [search, setSearch] = useState('')
  const [company, setCompany] = useState<string>('')

  const filtered = useFilteredClients({ search, company })

  return (
    <div className="space-y-6">
      <IconCardsRow />

      <Box>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Client Name"
                   className="h-11 px-4 rounded-lg bg-surface-alt outline-none focus:ring-2 ring-brand" />
            <select value={company} onChange={e => setCompany(e.target.value)}
                    className="h-11 px-4 rounded-lg bg-surface-alt">
              <option value="">Select Company</option>
              {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <Button variant="primary">Search</Button>
          </div>

          <div className="flex items-center gap-2">
            <button data-active={view === 'list'} onClick={() => setView('list')}
                    className="p-2 rounded data-[active=true]:bg-brand-softer data-[active=true]:text-brand">
              <Menu className="w-5 h-5" />
            </button>
            <button data-active={view === 'board'} onClick={() => setView('board')}
                    className="p-2 rounded data-[active=true]:bg-brand-softer data-[active=true]:text-brand">
              <LayoutDashboard className="w-5 h-5" />
            </button>
            <Button variant="primary" onClick={() => setOpen(true)} className="inline-flex items-center gap-2">
              Add Client <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Box>

      {view === 'list'
        ? <Box><ClientsTable data={filtered} /></Box>
        : <ClientsBoard data={filtered} />}

      <AddClientModal open={open} onOpenChange={setOpen} onSubmit={createClient} />
    </div>
  )
}
```

## Pontos de atenção

- O alternador list/board é controlado por JS no template (`liststyle()` / `listboard()`). Em React, é simplesmente um state.
- A coluna "Action" da tabela linka para `client-details.html` no template — em Next.js, link para `/clients/[id]`.
- O botão "Add Client" sempre abre modal — não navega.
