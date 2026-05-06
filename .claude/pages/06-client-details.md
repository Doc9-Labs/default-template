# Página: Client Details

**Arquivo original:** `protend/client-details.html`
**Rota Next.js sugerida:** `/clients/[id]`

## Visão geral

Detalhes de um cliente: identidade (avatar, nome, empresa), métricas, projetos vinculados, histórico de atividades.

## Estrutura

```
[ Sidebar ] [ Topbar ]
[ Main Content ]
  Row 1 — IconCards
  Row 2 — Cabeçalho do cliente
    [Box] avatar + nome + empresa + status + tags + ações
  Row 3 — Duas colunas
    Col-8 esquerda
      [Box] About (descrição)
      [Box] Projects (lista de Project Cards do cliente)
      [Box] Activities (timeline)
    Col-4 direita
      [Box] Contact info
      [Box] Team
      [Box] Documents / Files
```

## Componentes consumidos

| Componente | Documentação |
|-----------|-------------|
| Shell padrão | — |
| `<IconCard />` × 4 | `components/icon-card.md` |
| `<Box />` | `components/box.md` |
| `<AvatarStack />` | `components/avatar-stack.md` |
| `<ProjectCard />` (lista vinculada) | `components/project-card.md` |
| Timeline (custom) | seção própria |
| `<Dropdown />` ações | `components/dropdown.md` |

## Composição React (sugestão)

```tsx
// app/(dashboard)/clients/[id]/page.tsx
import { Mail, Phone, MapPin, Globe, Pencil } from 'lucide-react'

export default async function ClientDetails({ params }: { params: { id: string } }) {
  const client = await getClient(params.id)
  const projects = await getClientProjects(params.id)
  const activities = await getClientActivities(params.id)

  return (
    <div className="space-y-6">
      <IconCardsRow />

      <Box>
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={client.avatarUrl} alt="" className="w-20 h-20 rounded-full" />
            <div>
              <h2 className="text-2xl font-semibold">{client.name}</h2>
              <p className="text-ink-muted">{client.company}</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs bg-[#E6FAF4] text-[#35CF96]">
                {client.status}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">Send Message</Button>
            <Button variant="primary"><Pencil className="w-4 h-4 mr-1" /> Edit</Button>
          </div>
        </header>
      </Box>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Box title="About"><p className="text-ink-muted leading-relaxed">{client.bio}</p></Box>
          <Box title="Projects">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map(p => <ProjectCard key={p.id} project={p} onEdit={…} onDelete={…} />)}
            </div>
          </Box>
          <Box title="Activities"><Timeline items={activities} /></Box>
        </div>

        <div className="space-y-6">
          <Box title="Contact">
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> {client.email}</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> {client.phone}</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {client.address}</li>
              <li className="flex items-center gap-2"><Globe className="w-4 h-4" /> {client.website}</li>
            </ul>
          </Box>
          <Box title="Team"><AvatarStack members={client.team} size={40} max={8} /></Box>
          <Box title="Files"><FileList files={client.files} /></Box>
        </div>
      </div>
    </div>
  )
}
```

## Pontos de atenção

- O status do cliente reusa o esquema de cores do design system (active = verde 8, paused = laranja 7, etc.).
- A timeline pode ser vertical com pontos coloridos por tipo de atividade (criação, comentário, status, etc.).
- Em mobile (≤768px), as duas colunas viram empilhadas.
