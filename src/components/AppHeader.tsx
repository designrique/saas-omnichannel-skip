import { Bell, HelpCircle, Menu, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSidebar } from '@/components/ui/sidebar'
import { useLocation, useNavigate } from 'react-router-dom'
import { signOut } from '@/services/auth'

const pageTitles: { [key: string]: string } = {
  '/app/dashboard': 'Dashboard',
  '/app/inbox': 'Caixa de Entrada',
  '/app/contacts': 'Contatos',
  '/app/deals': 'Funil de Vendas',
  '/app/queues': 'Filas',
  '/app/catalog': 'Catálogo',
  '/app/tasks': 'Tarefas',
  '/app/broadcasts': 'Disparos',
  '/app/reports': 'Relatórios',
  '/app/automations': 'Automações',
  '/app/settings': 'Configurações',
  '/app/canned-responses': 'Respostas Rápidas',
  '/app/quick-message': 'Enviar Mensagem',
}

export const AppHeader = () => {
  const { toggleSidebar } = useSidebar()
  const location = useLocation()
  const navigate = useNavigate()
  const title = pageTitles[location.pathname] || 'SaaS Omnichannel'

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Button
        size="icon"
        variant="outline"
        className="sm:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <h1 className="text-xl font-semibold hidden sm:block">{title}</h1>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Pesquisar..."
          className="w-full rounded-lg bg-secondary pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Notificações</span>
      </Button>
      <Button variant="ghost" size="icon">
        <HelpCircle className="h-5 w-5" />
        <span className="sr-only">Ajuda</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Avatar>
              <AvatarImage
                src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1"
                alt="Avatar do usuário"
              />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Meu Perfil</DropdownMenuItem>
          <DropdownMenuItem>Configurações da Conta</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleLogout}>Sair</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
