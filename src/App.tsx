import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import LoginPage from './pages/auth/Login'
import RegisterPage from './pages/auth/Register'
import ForgotPasswordPage from './pages/auth/ForgotPassword'
import DashboardPage from './pages/app/Dashboard'

// Placeholder pages to make routes work
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-full">
    <h1 className="text-3xl font-bold">{title}</h1>
  </div>
)

const App = () => (
  <BrowserRouter>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/app" element={<Layout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route
            path="inbox"
            element={<PlaceholderPage title="Caixa de Entrada" />}
          />
          <Route
            path="contacts"
            element={<PlaceholderPage title="Contatos" />}
          />
          <Route
            path="deals"
            element={<PlaceholderPage title="Funil de Vendas" />}
          />
          <Route path="queues" element={<PlaceholderPage title="Filas" />} />
          <Route
            path="catalog"
            element={<PlaceholderPage title="Catálogo" />}
          />
          <Route path="tasks" element={<PlaceholderPage title="Tarefas" />} />
          <Route
            path="canned-responses"
            element={<PlaceholderPage title="Respostas Rápidas" />}
          />
          <Route
            path="quick-message"
            element={<PlaceholderPage title="Enviar Mensagem" />}
          />
          <Route
            path="broadcasts"
            element={<PlaceholderPage title="Disparos" />}
          />
          <Route
            path="reports"
            element={<PlaceholderPage title="Relatórios" />}
          />
          <Route
            path="automations"
            element={<PlaceholderPage title="Automações" />}
          />
          <Route
            path="settings"
            element={<PlaceholderPage title="Configurações" />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
