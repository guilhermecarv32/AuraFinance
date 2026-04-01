import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import type { User } from 'firebase/auth'
import { AuthContext, type AuthContextValue } from '@/context/AuthContext'
import { AppRoutes } from '@/app/AppRoutes'
import { ThemeProvider } from 'next-themes'

function makeAuthValue(
  overrides: Partial<AuthContextValue> & Pick<AuthContextValue, 'user' | 'loading' | 'authenticated'>,
): AuthContextValue {
  return {
    signIn: vi.fn(),
    signOut: vi.fn(),
    ...overrides,
  }
}

const mockUser = { uid: 'u1', email: 'logado@test.com', emailVerified: true } as User

function renderRoutes(initialPath: string, auth: AuthContextValue) {
  return render(
    <ThemeProvider attribute="class" defaultTheme="light" storageKey="aura-test-theme">
      <AuthContext.Provider value={auth}>
        <MemoryRouter initialEntries={[initialPath]}>
          <AppRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    </ThemeProvider>,
  )
}

describe('proteção de rotas', () => {
  it('usuário deslogado acessando /dashboard é redirecionado para /login', async () => {
    renderRoutes(
      '/dashboard',
      makeAuthValue({
        user: null,
        loading: false,
        authenticated: false,
      }),
    )

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /aura finance/i })).toBeInTheDocument()
    })
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })

  it('usuário logado acessando /login é redirecionado para /dashboard', async () => {
    renderRoutes(
      '/login',
      makeAuthValue({
        user: mockUser,
        loading: false,
        authenticated: true,
      }),
    )

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /visão geral/i }),
      ).toBeInTheDocument()
    })
  })
})
