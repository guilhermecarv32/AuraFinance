import { Navigate, Route, Routes } from 'react-router-dom'
import { GuestRoute } from '@/components/auth/GuestRoute'
import { PrivateRoute } from '@/components/auth/PrivateRoute'
import { LoginPage } from '@/pages/LoginPage'
import { MainLayout } from '@/components/layout/MainLayout'
import { DashboardOverview } from '@/pages/dashboard/DashboardOverview'
import { FinanceiroPage } from '@/pages/dashboard/FinanceiroPage'
import { PatrimonioPage } from '@/pages/dashboard/PatrimonioPage'
import { EstrategiaPage } from '@/pages/dashboard/EstrategiaPage'
import { RootRedirect } from '@/app/RootRedirect'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="financeiro" element={<FinanceiroPage />} />
          <Route path="patrimonio" element={<PatrimonioPage />} />
          <Route path="estrategia" element={<EstrategiaPage />} />
        </Route>
      </Route>

      <Route path="/" element={<RootRedirect />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
