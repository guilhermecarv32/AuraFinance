import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export function RootRedirect() {
  const { authenticated } = useAuth()
  return <Navigate to={authenticated ? '/dashboard' : '/login'} replace />
}
