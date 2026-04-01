import { describe, it, expect, beforeEach } from 'vitest'
import { FirebaseError } from 'firebase/app'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { signIn } from '@/services/auth'

const hasTestUserCredentials = Boolean(
  import.meta.env.VITE_TEST_USER_EMAIL?.trim() &&
    import.meta.env.VITE_TEST_USER_PASSWORD,
)

describe('auth engine (Firebase real)', () => {
  beforeEach(async () => {
    try {
      await signOut(auth)
    } catch {
      /* sessão já ausente */
    }
  })

  it('login com credenciais inválidas retorna erro Firebase (code auth/*)', async () => {
    try {
      await signIn('nao-existe@aura-finance.invalid', 'SenhaErrada999!')
      expect.fail('deveria lançar FirebaseError')
    } catch (e) {
      expect(e).toBeInstanceOf(FirebaseError)
      expect((e as FirebaseError).code).toMatch(/^auth\//)
    }
  })

  it.skipIf(!hasTestUserCredentials)(
    'login com sucesso retorna o usuário e persiste a sessão no auth',
    async () => {
      const email = import.meta.env.VITE_TEST_USER_EMAIL!
      const password = import.meta.env.VITE_TEST_USER_PASSWORD!

      const cred = await signIn(email.trim(), password)
      expect(cred.user.email).toBe(email.trim())
      expect(cred.user.uid.length).toBeGreaterThan(0)
      expect(auth.currentUser?.uid).toBe(cred.user.uid)

      await signOut(auth)
    },
  )
})
