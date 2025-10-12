import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthProvider'

export const AdminRoute = () => {
  const { profile, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <img
            src="https://img.usecurling.com/i?q=saas-omnichannel&color=gradient"
            alt="Logo"
            className="h-16 w-16 animate-pulse"
          />
          <p className="text-muted-foreground">Verificando permissões...</p>
        </div>
      </div>
    )
  }

  if (profile?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
