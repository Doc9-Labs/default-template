# Página: Message

**Arquivo original:** `protend/message.html`
**Modificador no `<main>`:** `.main-content.message`
**Rota Next.js sugerida:** `/messages`

## Visão geral

Inbox de mensagens estilo chat — lista de conversas à esquerda, thread aberta à direita.

## Estrutura

```
[ Sidebar ] [ Topbar ]
[ Main Content "message" ]
  Row 1 — IconCards
  Row 2 — Duas colunas
    Col-4 esquerda  — Caixa de mensagens
      [Box] header com avatar + nome + status "Active"
      [Box] busca + "Recent Message" + lista de conversas
    Col-8 direita  — Thread
      [Box] header (avatar do contato + nome + ações)
      [Box body] mensagens (alternando direita/esquerda)
      [Box footer] input de mensagem + anexos + emoji + send
```

## Componentes consumidos

| Componente | Documentação |
|-----------|-------------|
| Shell padrão | — |
| `<IconCard />` × 4 | `components/icon-card.md` |
| `<Box />` | `components/box.md` |
| `<Avatar />` com `pulse-css` (status online) | inline |
| `<MessageList />` (custom) | seção própria |
| `<MessageThread />` (custom) | seção própria |
| `<Dropdown />` (ações da conversa) | `components/dropdown.md` |

## Identidade do usuário (cabeçalho da coluna esquerda)

```html
<div class="box-info-messager">
  <div class="box-body d-flex align-items-start">
    <div class="left w-90">
      <div class="message-pic big">
        <img src="./images/avatar/avt-mess.png" alt="">
        <div class="pulse-css"></div>            <!-- status online verde -->
      </div>
      <div class="content">
        <div class="username"><h5 class="fs-24">Randy Riley</h5></div>
        <p class="pb-5 mt-9 mb-0">Lead UX/UI Designer</p>
        <div class="checkbox">
          <input type="checkbox" name="check" checked>
          <span class="ml-10">Active</span>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="dropdown">…⚙ Edit/Delete…</div>
    </div>
  </div>
</div>
```

## Item de conversa (lista)

```html
<li class="d-flex no-seen">                       <!-- não-lida = destaque -->
  <div class="img-mess"><img src="…"></div>
  <div class="info flex-1">
    <div class="d-flex justify-content-between">
      <a class="font-w600">Maria Silva</a>
      <span class="time fs-12">10:32</span>
    </div>
    <p class="pb-0 mb-0 line-h14">Last message preview…</p>
  </div>
  <span class="badge bg-primary">3</span>          <!-- contador opcional -->
</li>
```

## Composição React

```tsx
'use client'
import { useState } from 'react'
import { Search, Paperclip, Smile, Send, Settings } from 'lucide-react'

export default function MessagesPage() {
  const [activeId, setActiveId] = useState<string>(conversations[0].id)
  const conversation = conversations.find(c => c.id === activeId)!

  return (
    <div className="space-y-6">
      <IconCardsRow />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-4 space-y-6">
          <Box>
            <div className="flex items-start gap-4">
              <div className="relative">
                <img src={me.avatarUrl} className="w-20 h-20 rounded-full" alt="" />
                <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-[#00BC39] ring-2 ring-box" />
              </div>
              <div className="flex-1">
                <h5 className="text-2xl font-semibold">{me.name}</h5>
                <p className="text-ink-muted mt-1">{me.role}</p>
                <label className="flex items-center gap-2 mt-3 text-sm">
                  <input type="checkbox" defaultChecked /> Active
                </label>
              </div>
              <DropdownMenu />
            </div>
          </Box>

          <Box>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
              <input className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-alt outline-none focus:ring-2 ring-brand"
                     placeholder="Search" />
            </div>
            <header className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">Recent Message</h4>
              <DropdownMenu />
            </header>
            <ul className="space-y-1 max-h-[60vh] overflow-y-auto">
              {conversations.map(c => (
                <li key={c.id}>
                  <button onClick={() => setActiveId(c.id)}
                          className={`w-full flex items-start gap-3 px-3 py-3 rounded-lg
                                      ${activeId === c.id ? 'bg-brand-softer' : 'hover:bg-surface-alt'}`}>
                    <img src={c.avatarUrl} className="w-11 h-11 rounded-full" alt="" />
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{c.name}</span>
                        <span className="text-xs text-ink-muted">{c.time}</span>
                      </div>
                      <p className="text-sm text-ink-muted line-clamp-1 mt-1">{c.preview}</p>
                    </div>
                    {c.unread > 0 && (
                      <span className="grid place-items-center bg-brand text-white text-xs rounded-full w-5 h-5">
                        {c.unread}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </Box>
        </aside>

        <section className="lg:col-span-8">
          <Box className="h-full flex flex-col">
            <header className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center gap-3">
                <img src={conversation.avatarUrl} className="w-12 h-12 rounded-full" alt="" />
                <div>
                  <h5 className="font-semibold">{conversation.name}</h5>
                  <span className="text-sm text-ink-muted">Online</span>
                </div>
              </div>
              <DropdownMenu />
            </header>

            <ol className="flex-1 overflow-y-auto space-y-3 max-h-[55vh]">
              {conversation.messages.map(m => (
                <li key={m.id} className={`flex ${m.fromMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-2xl px-4 py-2.5
                                   ${m.fromMe ? 'bg-brand text-white' : 'bg-surface-alt'}`}>
                    {m.text}
                  </div>
                </li>
              ))}
            </ol>

            <form className="mt-4 flex items-center gap-2">
              <button type="button"><Paperclip className="w-5 h-5" /></button>
              <button type="button"><Smile className="w-5 h-5" /></button>
              <input className="flex-1 h-11 px-4 rounded-lg bg-surface-alt outline-none focus:ring-2 ring-brand"
                     placeholder="Type a message…" />
              <Button type="submit" variant="primary"><Send className="w-4 h-4" /></Button>
            </form>
          </Box>
        </section>
      </div>
    </div>
  )
}
```

## Pontos de atenção

- O `pulse-css` é um indicador animado verde — substitua por um `<span>` com `animate-ping` em Tailwind.
- A coluna direita deve ter `flex-col` + `overflow-y-auto` na área de mensagens para o input ficar fixo no fim.
- Em mobile, alterne entre lista e thread (não mostrar as duas) — preserve UX de WhatsApp Web.
