import { Link, useLocation, useNavigate } from 'react-router-dom'
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
  Shield,
  Users2,
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
import { signOut } from '@/services/auth'
import { useAuth } from '@/contexts/AuthProvider'

const menuItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/inbox', icon: Inbox, label: 'Caixa de Entrada' },
  { path: '/contacts', icon: Users, label: 'Contatos' },
  { path: '/deals', icon: Filter, label: 'Funil de Vendas' },
  { path: '/queues', icon: UsersRound, label: 'Filas' },
  { path: '/catalog', icon: Book, label: 'Catálogo' },
  { path: '/tasks', icon: ListTodo, label: 'Tarefas' },
  { path: '/canned-responses', icon: Zap, label: 'Respostas Rápidas' },
  {
    path: '/quick-message',
    icon: MessageSquarePlus,
    label: 'Enviar Mensagem',
  },
  { path: '/broadcasts', icon: Send, label: 'Disparos' },
  { path: '/reports', icon: BarChart3, label: 'Relatórios' },
  { path: '/automations', icon: Bot, label: 'Automações' },
]

const getInitials = (name: string | null | undefined) => {
  if (!name) return 'U'
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export const AppSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { profile } = useAuth()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  const isLinkActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <Sidebar>
      <SidebarContent className="flex flex-col">
        <SidebarHeader>
          <Link to="/" className="flex items-center gap-2">
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
                isActive={isLinkActive(item.path)}
                tooltip={item.label}
              >
                <Link to={item.path}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          {profile?.role === 'admin' && (
            <>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isLinkActive('/admin')}
                  tooltip="Painel Admin"
                >
                  <Link to="/admin">
                    <Shield className="h-5 w-5" />
                    <span>Painel Admin</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isLinkActive('/settings/users')}
                  tooltip="Usuários"
                >
                  <Link to="/settings/users">
                    <Users2 className="h-5 w-5" />
                    <span>Usuários</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          )}
        </SidebarMenu>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={
                  isLinkActive('/settings') && !isLinkActive('/settings/users')
                }
                tooltip="Configurações"
              >
                <Link to="/settings">
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
                      <AvatarImage
                        src={`https://img.usecurling.com/ppl/thumbnail?seed=${profile?.id}`}
                      />
                      <AvatarFallback>
                        {getInitials(profile?.full_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left overflow-hidden">
                      <p className="font-semibold text-sm truncate">
                        {profile?.full_name ?? 'Usuário'}
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
                  <DropdownMenuItem onSelect={handleLogout}>
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}
