import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export function GuestRoute() {
  const { authenticated } = useAuth()
  if (authenticated) {
    return <Navigate to="/dashboard" replace />
  }
  return <Outlet />
}
