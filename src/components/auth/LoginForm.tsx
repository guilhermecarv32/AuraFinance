import { FirebaseError } from 'firebase/app'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { cn } from '@/lib/utils'

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function LoginForm() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [firebaseError, setFirebaseError] = useState<string | null>(null)

  const emailInvalid =
    emailTouched && (!email.trim() || !isValidEmail(email))
  const passwordInvalid = passwordTouched && password.length < 6

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setEmailTouched(true)
    setPasswordTouched(true)
    setFirebaseError(null)

    if (!email.trim() || !isValidEmail(email) || password.length < 6) {
      return
    }

    setSubmitting(true)
    try {
      await signIn(email.trim(), password)
    } catch (err) {
      const message =
        err instanceof FirebaseError
          ? mapFirebaseAuthMessage(err.code)
          : 'Não foi possível entrar. Tente novamente.'
      setFirebaseError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, hsl(var(--primary) / 0.15), transparent 45%),
            radial-gradient(circle at 80% 0%, hsl(270 55% 45% / 0.1), transparent 40%)`,
        }}
      />

      <div className="absolute right-4 top-4 z-10">
        <ThemeToggle variant="outline" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-md border-border/50 bg-card/95 backdrop-blur-sm">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <span className="text-lg font-bold tracking-tight">AF</span>
            </div>
            <CardTitle className="text-balance">Aura Finance</CardTitle>
            <CardDescription>
              Gestão financeira premium. Entre com sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  error={emailInvalid}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  placeholder="voce@empresa.com"
                />
                {emailInvalid ? (
                  <p className="text-xs text-destructive" role="alert">
                    Informe um e-mail válido.
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  error={passwordInvalid}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setPasswordTouched(true)}
                  placeholder="••••••••"
                />
                {passwordInvalid ? (
                  <p className="text-xs text-destructive" role="alert">
                    Mínimo de 6 caracteres.
                  </p>
                ) : null}
              </div>

              {firebaseError ? (
                <p
                  className={cn(
                    'rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive',
                  )}
                  role="alert"
                >
                  {firebaseError}
                </p>
              ) : null}

              <Button
                type="submit"
                className="w-full"
                disabled={submitting}
                aria-busy={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin" aria-hidden />
                    Entrando…
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function mapFirebaseAuthMessage(code: string): string {
  const map: Record<string, string> = {
    'auth/invalid-credential': 'E-mail ou senha incorretos.',
    'auth/wrong-password': 'E-mail ou senha incorretos.',
    'auth/user-not-found': 'E-mail ou senha incorretos.',
    'auth/too-many-requests': 'Muitas tentativas. Aguarde e tente de novo.',
    'auth/user-disabled': 'Esta conta foi desativada.',
    'auth/network-request-failed': 'Falha de rede. Verifique sua conexão.',
  }
  return map[code] ?? 'Não foi possível autenticar. Verifique os dados.'
}
