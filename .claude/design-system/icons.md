# Ícones

O template carrega **três bibliotecas de ícones** simultaneamente. Para um port limpo, escolha **uma**.

## Bibliotecas usadas

| Lib | Origem | Prefixo de classe | Onde aparece |
|-----|--------|-------------------|--------------|
| **Boxicons 2.0.7** | CDN (`https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css`) | `bx bx-*`, `bx bxs-*`, `bx bxl-*` | Maioria dos ícones (sidebar, header, cards, botões) |
| **Font Awesome 5** | local (`css/fontawesome.css`, `fonts/fa-*`) | `fas fa-*`, `far fa-*`, `fab fa-*` | Tags, kanban, alguns botões |
| **IcoMoon custom** | local (`css/icomoon.css`, `fonts/icomoon.*`) | `icomoon` | Variações decorativas raras |

Os 4 HTMLs em `protend/fonts/*.html` (`fa-brands-400.html`, `fa-solid-900.html`, `fa-regular-400.html`, `boxicons.html`) são apenas grids de glifos para preview — não fazem parte da app.

## Inventário Boxicons mais usado

Coletado das páginas:

| Classe | Onde |
|--------|------|
| `bx bxs-home` | Sidebar — Dashboard |
| `bx bxs-bolt` | Sidebar — Project |
| `bx bxs-user` | Sidebar — Client |
| `bx bxs-dashboard` | Sidebar — Board |
| `bx bx-calendar` | Sidebar — Calendar / IconCard "Calendar" |
| `bx bxs-message-rounded-detail` | Sidebar — Message |
| `bx bxs-component` | Sidebar — Components |
| `bx bx-cog` | Sidebar — Dark mode toggle |
| `bx bx-left-arrow-alt` | Botão fechar sidebar |
| `bx bx-menu` | Hamburger mobile |
| `bx bx-search-alt` | Header — busca |
| `bx bx-caret-down`, `bx bx-chevron-down` | Setas de dropdown |
| `bx bxs-bell`, `bx bx-tada` | IconCard "Notification" (com animação) |
| `bx bxs-message-rounded` | IconCard "Message" |
| `bx bx-plus` | IconCard "Create New Project" |
| `bx bx-wallet`, `bx bx-wrench`, `bx bx-lock-open`, `bx bx-power-off` | Dropdown perfil |
| `bx bxs-up-arrow`, `bxs-down-arrow` | Indicadores de variação % |
| `bx bx-trash`, `bx bx-edit` | Ações em dropdown de cards |
| `bx bxs-star` | Marcar projeto como favorito |
| `bx bx-dots-vertical-rounded` | Menu kebab |
| `bx bxl-google`, `bxl-facebook` | Social login (em login/new-account) |

## Inventário FontAwesome mais usado

| Classe | Onde |
|--------|------|
| `fas fa-tags` | Tag de "Team Name" no kanban |
| `fas fa-user-plus` | Botão "Invite People" |
| `fas fa-caret-down` | Selectores |
| `fas fa-paperclip`, `far fa-comment` | Cards do board |
| `fas fa-search` | Busca em algumas páginas |

## Mapeamento sugerido para `lucide-react`

Se for migrar para Next.js, **lucide-react** cobre 100% dos ícones do template:

| Boxicons | Lucide |
|----------|--------|
| `bx bxs-home` | `Home` |
| `bx bxs-bolt` | `Zap` |
| `bx bxs-user` | `User` |
| `bx bxs-dashboard` | `LayoutDashboard` |
| `bx bx-calendar` | `Calendar` |
| `bx bxs-message-rounded-detail` | `MessageSquareText` |
| `bx bxs-component` | `Component` |
| `bx bx-cog` | `Settings` |
| `bx bx-left-arrow-alt` | `ChevronsLeft` |
| `bx bx-menu` | `Menu` |
| `bx bx-search-alt` | `Search` |
| `bx bx-chevron-down` / `bx bx-caret-down` | `ChevronDown` |
| `bx bxs-bell` | `Bell` |
| `bx bxs-message-rounded` | `MessageCircle` |
| `bx bx-plus` | `Plus` |
| `bx bx-wallet` | `Wallet` |
| `bx bx-wrench` | `Wrench` |
| `bx bx-lock-open` | `Unlock` |
| `bx bx-power-off` | `Power` |
| `bx bxs-up-arrow` | `ArrowUp` |
| `bx bxs-down-arrow` | `ArrowDown` |
| `bx bx-trash` | `Trash2` |
| `bx bx-edit` | `Pencil` |
| `bx bxs-star` | `Star` |
| `bx bx-dots-vertical-rounded` | `MoreVertical` |
| `bx bxl-google` | `(react-icons/fc) FcGoogle` ou SVG dedicado |
| `bx bxl-facebook` | `Facebook` |
| `fas fa-tags` | `Tag` |
| `fas fa-user-plus` | `UserPlus` |
| `fas fa-paperclip` | `Paperclip` |
| `far fa-comment` | `MessageCircle` (outline) |

## Padrões de uso

### Ícone simples

```html
<i class='bx bxs-home'></i>
```

### Ícone animado (Boxicons)

```html
<i class='bx bxs-bell bx-tada'></i>          <!-- toca sino -->
<i class='bx bx-spin bxs-loader'></i>        <!-- gira -->
```

### Ícone num círculo gradiente

Padrão dos `IconCard`:

```html
<div class="icon bg-icon-3"><i class='bx bx-calendar'></i></div>
```

`.icon` é um square arredondado; `.bg-icon-N` aplica o gradiente da paleta (ver `tokens.md`).

### Equivalente React

```tsx
import { Bell } from 'lucide-react'

<div className="grid place-items-center w-12 h-12 rounded-xl
                bg-gradient-to-b from-[#3C21F7] to-[#9B8DFF] text-white">
  <Bell className="w-5 h-5" />
</div>
```

## Recomendação final

- **Use lucide-react** como padrão único.
- **Remova** os imports de Boxicons, FontAwesome e IcoMoon do `<head>`.
- Para os ícones brand (Google/Facebook em telas de login), prefira componentes específicos (`react-icons/fc`).
