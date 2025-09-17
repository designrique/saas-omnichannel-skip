import { Link, useLocation } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar'
import {
  LayoutDashboard,
  Inbox,
  Users,
  Filter,
  UsersRound,
  Book,
  ListTodo,
  Send,
  BarChart3,
  Bot,
  Settings,
  MessageSquarePlus,
  Zap,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const menuItems = [
  { path: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/app/inbox', icon: Inbox, label: 'Caixa de Entrada' },
  { path: '/app/contacts', icon: Users, label: 'Contatos' },
  { path: '/app/deals', icon: Filter, label: 'Funil de Vendas' },
  { path: '/app/queues', icon: UsersRound, label: 'Filas' },
  { path: '/app/catalog', icon: Book, label: 'Catálogo' },
  { path: '/app/tasks', icon: ListTodo, label: 'Tarefas' },
  { path: '/app/canned-responses', icon: Zap, label: 'Respostas Rápidas' },
  {
    path: '/app/quick-message',
    icon: MessageSquarePlus,
    label: 'Enviar Mensagem',
  },
  { path: '/app/broadcasts', icon: Send, label: 'Disparos' },
  { path: '/app/reports', icon: BarChart3, label: 'Relatórios' },
  { path: '/app/automations', icon: Bot, label: 'Automações' },
]

export const AppSidebar = () => {
  const location = useLocation()

  return (
    <Sidebar>
      <SidebarContent className="flex flex-col">
        <SidebarHeader>
          <Link to="/app/dashboard" className="flex items-center gap-2">
            <img
              src="https://img.usecurling.com/i?q=saas-omnichannel&color=gradient"
              alt="Logo"
              className="h-8 w-8"
            />
            <span className="font-semibold text-lg">Omnichannel</span>
          </Link>
        </SidebarHeader>
        <SidebarMenu className="flex-grow">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname.startsWith(item.path)}
                tooltip={item.label}
              >
                <Link to={item.path}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={location.pathname.startsWith('/app/settings')}
                tooltip="Configurações"
              >
                <Link to="/app/settings">
                  <Settings className="h-5 w-5" />
                  <span>Configurações</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-pointer w-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1" />
                      <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <div className="text-left overflow-hidden">
                      <p className="font-semibold text-sm truncate">
                        João Pedro
                      </p>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="right"
                  align="start"
                  className="mb-2"
                >
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Meu Perfil</DropdownMenuItem>
                  <DropdownMenuItem>Configurações da Conta</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sair</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}
