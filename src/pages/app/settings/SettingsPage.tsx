import { Link } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Users, Shield, CreditCard } from 'lucide-react'
import { useAuth } from '@/contexts/AuthProvider'

export default function SettingsPage() {
  const { profile } = useAuth()

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <Link to="/settings/profile">
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Perfil</CardTitle>
              <CardDescription>
                Gerencie suas informações pessoais e de conta.
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>

        {profile?.role === 'admin' && (
          <Card>
            <Link to="/settings/users">
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Gerenciamento de Usuários</CardTitle>
                <CardDescription>
                  Adicione, edite e gerencie usuários da plataforma.
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>
        )}

        <Card>
          <Link to="/settings/billing">
            <CardHeader>
              <CreditCard className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Assinatura e Faturamento</CardTitle>
              <CardDescription>
                Veja e gerencie seu plano e histórico de pagamentos.
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </div>
    </div>
  )
}
