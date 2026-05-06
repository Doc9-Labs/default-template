# Página: User Login

**Arquivo original:** `protend/user-login.html`
**Rota Next.js sugerida:** `/login` — fora do grupo `(dashboard)`

## Visão geral

Tela de autenticação. Layout em duas colunas: ilustração à esquerda, formulário à direita.

## Estrutura

```
<body class="loginpage">
  <div class="row vh-100">
    <div class="col-md-6 d-none d-md-flex">
      <img src="./images/bg/bg-login.svg" />
    </div>
    <div class="col-md-6 d-flex align-items-center">
      <form class="form-signin w-75 mx-auto">
        <h1>Welcome Back!</h1>
        <p>Sign in to continue</p>
        [Field "Email"]
        [Field "Password"]
        [Checkbox "Remember me" + Link "Forgot password?"]
        [Button "Sign In"]
        [Divisor "or"]
        [Botões sociais: Google, Facebook]
        <p>Don't have an account? <a href="new-account.html">Sign Up</a></p>
      </form>
    </div>
  </div>
</body>
```

## Componentes consumidos

| Componente | Documentação |
|-----------|-------------|
| `<Field />` (email + password) | `components/form-controls.md` |
| `<Checkbox />` Remember me | `components/form-controls.md` |
| `<Button />` Sign in + sociais | `components/form-controls.md` |

## Composição React

```tsx
// app/login/page.tsx
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { signIn } from 'next-auth/react' // se for usar Auth.js
import { FcGoogle } from 'react-icons/fc'
import { Facebook } from 'lucide-react'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Required'),
  remember: z.boolean().optional(),
})
type LoginInput = z.infer<typeof schema>

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>({ resolver: zodResolver(schema) })

  async function onSubmit(data: LoginInput) {
    await signIn('credentials', { email: data.email, password: data.password, callbackUrl: '/' })
  }

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <aside className="hidden md:flex items-center justify-center bg-brand-soft">
        <img src="/bg-login.svg" alt="" className="max-w-md" />
      </aside>
      <section className="flex items-center justify-center p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-5">
          <header>
            <h1 className="text-3xl font-semibold">Welcome Back!</h1>
            <p className="text-ink-muted mt-2">Sign in to continue</p>
          </header>

          <Field label="Email" type="email" {...register('email')} error={errors.email?.message} />
          <Field label="Password" type="password" {...register('password')} error={errors.password?.message} />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register('remember')} /> Remember me
            </label>
            <Link href="/forgot" className="text-brand">Forgot password?</Link>
          </div>

          <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Signing in…' : 'Sign In'}
          </Button>

          <div className="flex items-center gap-3 text-ink-muted text-sm">
            <hr className="flex-1" /> or <hr className="flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="light" type="button" onClick={() => signIn('google')}>
              <FcGoogle className="w-5 h-5" /> Google
            </Button>
            <Button variant="light" type="button" onClick={() => signIn('facebook')}>
              <Facebook className="w-5 h-5 text-[#1877F2]" /> Facebook
            </Button>
          </div>

          <p className="text-sm text-center text-ink-muted">
            Don&apos;t have an account? <Link href="/signup" className="text-brand font-semibold">Sign Up</Link>
          </p>
        </form>
      </section>
    </main>
  )
}
```

## Pontos de atenção (segurança)

- **Nunca envie senha como query string** ou exibida em URL.
- Use **OAuth** (Google/Facebook) com o provider apropriado (Auth.js, Clerk, Firebase Auth, ou implementação custom).
- Se for autenticação por senha:
  - hashing **server-side** (bcrypt/argon2);
  - rate limiting;
  - auditoria (`login_success`, `login_failed` com `email_hash`, `ip`, `user_agent`);
  - HttpOnly Secure SameSite=Lax cookies para a sessão;
  - **2FA** — recomendável para Doc9 dado o nível de criticidade do produto;
  - mensagens de erro genéricas ("invalid credentials" — nunca diga se é email errado vs senha errada).
- Adicione [security headers](https://owasp.org/www-project-secure-headers/) no Next.js (`next.config.js`).
- A página deve ser acessível em HTTPS apenas.
