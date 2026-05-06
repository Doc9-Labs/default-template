# Avatar Stack

Pilha de avatares circulares sobrepostos. Aparece em **project cards**, **kanban cards**, e nos detalhes de board/projeto.

## Markup-fonte

```html
<ul class="user-list">
  <li><img src="./images/avatar/user-1.png" alt="user"></li>
  <li><img src="./images/avatar/user-2.png" alt="user"></li>
  <li><img src="./images/avatar/user-3.png" alt="user"></li>
  <li><img src="./images/avatar/user-4.png" alt="user"></li>
  <li><img src="./images/avatar/user-5.png" alt="user"></li>
</ul>
```

Variação maior (board): `<ul class="user-list s2">`.

## CSS chave

- `<ul.user-list>` é flex.
- Cada `<li>` tem `margin-left` negativo para sobrepor (ex.: `-8px`).
- `<img>` tem `border-radius: 50%`, `border: 2px solid var(--box-bg)` (cria o "anel" entre cada um).
- Tamanhos no template:
  - Default: 32px
  - `.s2`: ~40px

## Componente React

```tsx
type Member = { id: string; avatarUrl: string; name: string }

export function AvatarStack({ members, max = 5, size = 32 }: { members: Member[]; max?: number; size?: 32 | 40 }) {
  const visible = members.slice(0, max)
  const overflow = members.length - visible.length

  return (
    <ul className="flex -space-x-2" aria-label={`${members.length} members`}>
      {visible.map(m => (
        <li key={m.id}>
          <img
            src={m.avatarUrl} alt={m.name}
            title={m.name}
            className={`rounded-full ring-2 ring-box`}
            style={{ width: size, height: size }}
          />
        </li>
      ))}
      {overflow > 0 && (
        <li className="grid place-items-center rounded-full ring-2 ring-box bg-surface-alt text-xs font-semibold"
            style={{ width: size, height: size }}>
          +{overflow}
        </li>
      )}
    </ul>
  )
}
```

## Pontos de atenção

- `ring-box` significa "anel da cor do background do card" — preserva a estética de "ilhas" entre avatares.
- Acessibilidade: passe `alt` com o nome real e adicione `<title>` (tooltip nativo) ou Tooltip do Radix se o design exigir.
- Na variação `.s2`, os avatares são maiores **e** ganham mais sobreposição (`-12px`).
