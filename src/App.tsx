import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import LoginPage from './pages/auth/Login'
import RegisterPage from './pages/auth/Register'
import ForgotPasswordPage from './pages/auth/ForgotPassword'
import DashboardPage from './pages/app/Dashboard'
import { AuthProvider } from './contexts/AuthProvider'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PublicRoute } from './components/PublicRoute'
import { AdminRoute } from './components/AdminRoute'
import AdminDashboardPage from './pages/app/AdminDashboard'
import SettingsPage from './pages/app/settings/SettingsPage'
import UsersPage from './pages/app/settings/UsersPage'

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-full">
    <h1 className="text-3xl font-bold">{title}</h1>
  </div>
)

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPasswordPage />
              </PublicRoute>
            }
          />

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route
                path="/inbox"
                element={<PlaceholderPage title="Caixa de Entrada" />}
              />
              <Route
                path="/contacts"
                element={<PlaceholderPage title="Contatos" />}
              />
              <Route
                path="/deals"
                element={<PlaceholderPage title="Funil de Vendas" />}
              />
              <Route
                path="/queues"
                element={<PlaceholderPage title="Filas" />}
              />
              <Route
                path="/catalog"
                element={<PlaceholderPage title="Catálogo" />}
              />
              <Route
                path="/tasks"
                element={<PlaceholderPage title="Tarefas" />}
              />
              <Route
                path="/canned-responses"
                element={<PlaceholderPage title="Respostas Rápidas" />}
              />
              <Route
                path="/quick-message"
                element={<PlaceholderPage title="Enviar Mensagem" />}
              />
              <Route
                path="/broadcasts"
                element={<PlaceholderPage title="Disparos" />}
              />
              <Route
                path="/reports"
                element={<PlaceholderPage title="Relatórios" />}
              />
              <Route
                path="/automations"
                element={<PlaceholderPage title="Automações" />}
              />
              <Route path="/settings" element={<SettingsPage />} />
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/settings/users" element={<UsersPage />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
