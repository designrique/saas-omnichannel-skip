import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShieldCheck } from 'lucide-react'

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 animate-fade-in-up">
      <div className="flex items-center gap-4">
        <ShieldCheck className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">
          Painel do Administrador
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Área Restrita</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Bem-vindo à área administrativa. Aqui você pode gerenciar as
            configurações globais da aplicação.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
