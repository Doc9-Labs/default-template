# Notification List (popover de mensagens)

Painel flutuante exibido ao clicar no IconCard "Message" no topo das páginas. Lista mensagens com avatar + autor + preview.

## Markup-fonte

```html
<div class="notification-list card">
  <div class="top box-header">
    <h5>Notification</h5>
  </div>
  <div class="pd-1r"><div class="divider"></div></div>

  <div class="box-body">
    <ul class="list">
      <li class="d-flex no-seen">                      <!-- não-lida -->
        <div class="img-mess"><img class="mr-14" src="./images/avatar/avt-1.png" alt="avt"></div>
        <div class="info">
          <a href="#" class="font-w600 mb-0 color-primary">Elizabeth Holland</a>
          <p class="pb-0 mb-0 line-h14 mt-6">Proin ac quam et lectus vestibulum</p>
        </div>
      </li>
      <li class="d-flex">                              <!-- lida -->
        <!-- mesma estrutura -->
      </li>
    </ul>
    <div class="btn-view">
      <a class="font-w600 h5" href="message.html">View All</a>
    </div>
  </div>
</div>
```

## Classes

| Classe | Função |
|--------|--------|
| `.notification-list` | Wrapper do popover (oculto por padrão; abre via `.click-c` no IconCard pai). |
| `.top` + `.box-header` | Cabeçalho com título "Notification". |
| `.divider` | Linha horizontal. |
| `.list` | `<ul>` com itens. |
| `.no-seen` | Item ainda não lido (background levemente colorido). |
| `.img-mess` | Wrapper do avatar (44px). |
| `.info` | Container do nome + preview. |
| `.btn-view` | Bloco do "View All". |

## Comportamento

`js/main.js` faz toggle de `.show` no `.notification-list` quando o usuário clica em `.click-c`. Fora dele, fecha.

## Componente React

```tsx
import { useEffect, useRef, useState } from 'react'

type NotificationItem = {
  id: string
  author: string
  preview: string
  avatarUrl: string
  read: boolean
}

export function NotificationList({ items }: { items: NotificationItem[] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(o => !o)} aria-expanded={open}>…</button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-[360px] bg-box rounded-[10px] shadow-xl z-40">
          <header className="px-5 py-4">
            <h5 className="font-semibold text-lg">Notification</h5>
          </header>
          <div className="border-t border-ring-light dark:border-ring-dark" />
          <ul className="max-h-80 overflow-y-auto">
            {items.map(it => (
              <li key={it.id}
                  className={`flex gap-3 px-5 py-3 ${!it.read ? 'bg-brand-softer' : ''}`}>
                <img src={it.avatarUrl} alt="" className="w-11 h-11 rounded-full" />
                <div className="flex-1">
                  <a className="font-semibold text-brand">{it.author}</a>
                  <p className="text-sm leading-tight mt-1 text-ink-muted">{it.preview}</p>
                </div>
              </li>
            ))}
          </ul>
          <a href="/messages" className="block text-center font-semibold py-3 border-t border-ring-light">
            View All
          </a>
        </div>
      )}
    </div>
  )
}
```
