import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { AppRoutes } from '@/app/AppRoutes'
import { AuthSplash } from '@/components/layout/AuthSplash'

function AppShell() {
  const { loading } = useAuth()
  if (loading) {
    return <AuthSplash />
  }
  return <AppRoutes />
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        storageKey="aura-finance-theme"
        disableTransitionOnChange
      >
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
