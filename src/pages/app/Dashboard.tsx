import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import {
  Activity,
  ArrowUpRight,
  DollarSign,
  Users,
  MessageSquare,
  Phone,
} from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const funnelData = [
  { stage: 'Novos Leads', value: 120, fill: 'hsl(var(--chart-1))' },
  { stage: 'Qualificação', value: 90, fill: 'hsl(var(--chart-2))' },
  { stage: 'Proposta', value: 60, fill: 'hsl(var(--chart-3))' },
  { stage: 'Negociação', value: 30, fill: 'hsl(var(--chart-4))' },
]

const leadsByChannelData = [
  { name: 'WhatsApp', value: 400, fill: 'hsl(var(--chart-1))' },
  { name: 'Instagram', value: 300, fill: 'hsl(var(--chart-2))' },
  { name: 'Website', value: 200, fill: 'hsl(var(--chart-3))' },
  { name: 'Outros', value: 100, fill: 'hsl(var(--chart-4))' },
]

const recentActivities = [
  {
    description: 'Novo contato "Maria Silva" adicionado.',
    time: '5 min atrás',
  },
  {
    description: 'Mensagem recebida de "Carlos Pereira".',
    time: '15 min atrás',
  },
  {
    description: 'Negócio "Projeto Alpha" movido para "Proposta".',
    time: '1 hora atrás',
  },
  {
    description: 'Tarefa "Follow-up com cliente X" concluída.',
    time: '3 horas atrás',
  },
]

export default function DashboardPage() {
  // TODO: Implement role-based content display
  // Example:
  // const { user } = useAuth()
  // const userRole = fetchUserRole(user.id)
  // {userRole === 'admin' && <AdminDashboard />}

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 animate-fade-in-up">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Novos Leads Hoje
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+20.1% desde ontem</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversas Ativas
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +180.1% desde a última hora
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Negócios em Andamento
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">
              +19% desde o mês passado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Valor Total em Funil
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 45.231,89</div>
            <p className="text-xs text-muted-foreground">
              +201 desde o mês passado
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Funil de Vendas</CardTitle>
            <CardDescription>
              Distribuição de negócios pelas etapas.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer>
                <BarChart
                  data={funnelData}
                  layout="vertical"
                  margin={{ left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="stage"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Leads por Canal</CardTitle>
            <CardDescription>Origem dos leads no período.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer>
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie
                    data={leadsByChannelData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Atividades Recentes</CardTitle>
              <CardDescription>
                Últimas ações realizadas na plataforma.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link to="/activities">
                Ver Todas
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-right">Horário</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((activity, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="font-medium">{activity.description}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      {activity.time}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="col-span-full lg:col-span-3">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Atalhos para as funcionalidades mais usadas.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button asChild className="w-full">
              <Link to="/contacts/new">
                <Users className="mr-2 h-4 w-4" /> Novo Contato
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/settings/integrations/whatsapp">
                <Phone className="mr-2 h-4 w-4" /> Integrar WhatsApp
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
