# Modal

Diálogos modais — o template usa **Bootstrap 5 Modal** (`data-bs-toggle="modal"`).

## Modais existentes

| ID | Onde | Função |
|----|------|--------|
| `#add_project` | Dashboard, Project, Board | Criar novo projeto |
| `#edit_project` | Project cards | Editar projeto existente |
| `#delete_project` | Project cards | Confirmar exclusão |
| `#add_client` | Clients | Criar cliente |
| `#edit_client` | Clients | Editar cliente |
| `#add_card` | Board | Criar tarefa numa coluna |

## Markup-padrão

```html
<div class="modal fade" id="add_project" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Add Project</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
        <form>
          <div class="form-group mb-3">
            <label class="form-label">Project Name</label>
            <input type="text" class="form-control" placeholder="Enter name">
          </div>
          <!-- mais campos -->
        </form>
      </div>

      <div class="modal-footer">
        <button class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
        <button class="btn btn-primary">Save</button>
      </div>
    </div>
  </div>
</div>
```

## Substituto React (Radix UI Dialog)

```bash
npm install @radix-ui/react-dialog
```

```tsx
'use client'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { Button } from './Button'
import { Field } from './Field'

export function AddProjectModal({ open, onOpenChange, onSubmit }: {
  open: boolean
  onOpenChange: (o: boolean) => void
  onSubmit: (data: { name: string; description: string }) => void
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                     w-[min(540px,90vw)] bg-box rounded-[10px] p-6 shadow-2xl"
        >
          <header className="flex items-center justify-between mb-5">
            <Dialog.Title className="text-xl font-semibold">Add Project</Dialog.Title>
            <Dialog.Close className="p-1 rounded hover:bg-surface-alt">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </header>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              const fd = new FormData(e.currentTarget as HTMLFormElement)
              onSubmit({
                name: String(fd.get('name')),
                description: String(fd.get('description')),
              })
            }}
            className="space-y-4"
          >
            <Field label="Project Name" name="name" placeholder="Enter name" required />
            <div className="space-y-2">
              <label className="text-sm font-semibold">Description</label>
              <textarea name="description" rows={4}
                        className="w-full p-3 rounded-lg bg-surface-alt outline-none focus:ring-2 ring-brand" />
            </div>
            <footer className="flex justify-end gap-3 pt-2">
              <Dialog.Close asChild>
                <Button type="button" variant="light">Cancel</Button>
              </Dialog.Close>
              <Button type="submit" variant="primary">Save</Button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
```

## Padrão "Confirm delete"

```tsx
<Dialog.Content className="…">
  <Dialog.Title className="text-xl font-semibold">Delete project?</Dialog.Title>
  <Dialog.Description className="text-ink-muted mt-2">
    This action cannot be undone.
  </Dialog.Description>
  <footer className="flex justify-end gap-3 mt-6">
    <Dialog.Close asChild><Button variant="light">Cancel</Button></Dialog.Close>
    <Button variant="danger" onClick={onConfirm}>Delete</Button>
  </footer>
</Dialog.Content>
```

## Pontos de atenção

- O Bootstrap original anima fade + slide. Radix Dialog aceita `data-state="open|closed"` para animar via Tailwind.
- Sempre devolva o **focus trap** dentro do modal — Radix faz nativamente. Em vanilla, o Bootstrap também já cuida.
- Para acessibilidade, mantenha sempre `aria-labelledby` apontando para o `<Dialog.Title>`.
