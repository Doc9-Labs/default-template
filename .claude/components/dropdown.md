# Dropdown

Menus suspensos. O template usa o **dropdown nativo do Bootstrap 5** (`data-bs-toggle="dropdown"`).

## Markup-padrão

```html
<div class="dropdown">
  <a class="btn-link" data-bs-toggle="dropdown" aria-expanded="false">
    <i class='bx bx-dots-vertical-rounded'></i>
  </a>
  <div class="dropdown-menu dropdown-menu-end">
    <a class="dropdown-item" href="#"><i class="bx bx-edit"></i> Edit</a>
    <a class="dropdown-item" href="#"><i class="bx bx-trash"></i> Delete</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item text-danger" href="#"><i class="bx bx-power-off"></i> Logout</a>
  </div>
</div>
```

| Classe | Função |
|--------|--------|
| `.dropdown` | Wrapper relativo. |
| `.dropdown-menu` | Painel flutuante. |
| `.dropdown-menu-end` | Alinha à direita. |
| `.dropdown-item` | Link/botão dentro do menu. |
| `.dropdown-divider` | Linha horizontal. |
| `.dropdown-toggle` | Adicionada ao botão para a setinha automática. |

## Onde aparece no template

| Página | Dropdown |
|--------|----------|
| Topbar | Idiomas, perfil, busca mobile |
| Project cards (carousel + grid) | Kebab `⋮` com Edit/Delete |
| Board | Kebab nas colunas e nos cards |
| Header de boxes | Filtros (esta semana / mês / ano) |

## Substituto React (Radix UI)

```bash
npm install @radix-ui/react-dropdown-menu
```

```tsx
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'

export function ProjectMenu({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button aria-label="Options" className="p-1 rounded hover:bg-surface-alt">
          <MoreVertical className="w-5 h-5" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end" sideOffset={6}
          className="min-w-[180px] bg-box rounded-lg shadow-xl py-2 z-50"
        >
          <DropdownMenu.Item
            onSelect={onEdit}
            className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-brand-softer outline-none"
          >
            <Pencil className="w-4 h-4" /> Edit
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={onDelete}
            className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-brand-softer outline-none text-[#F7284A]"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
```

## Pontos de atenção

- Bootstrap 5 dropdowns dependem de Popper.js (já incluso no `bootstrap.bundle.js`). Em React, Radix faz o mesmo papel.
- O dropdown da topbar **abre/fecha clicando fora** — Radix faz isso automaticamente; em código vanilla, há um listener global.
- Bandeiras de idioma (`<img>`) podem virar emoji ou componente.
