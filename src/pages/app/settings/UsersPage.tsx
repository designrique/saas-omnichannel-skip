import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { PlusCircle, AlertCircle, Users } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  getUsers,
  type UserProfile,
  type UserRole,
  type SubscriptionStatus,
} from '@/services/users'
import { useToast } from '@/components/ui/use-toast'
import { UserFormDialog } from '@/components/settings/UserFormDialog'

const roleMap: Record<UserRole, string> = { admin: 'Admin', user: 'Usuário' }
const statusMap: Record<
  SubscriptionStatus,
  { label: string; variant: 'default' | 'secondary' | 'destructive' }
> = {
  pro: { label: 'Pro', variant: 'default' },
  free: { label: 'Gratuito', variant: 'secondary' },
  inactive: { label: 'Inativo', variant: 'destructive' },
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState<{
    role?: UserRole
    subscription_status?: SubscriptionStatus
  }>({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null)
  const { toast } = useToast()

  const PER_PAGE = 10

  const fetchUsers = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const { users: fetchedUsers, count } = await getUsers({
        page,
        perPage: PER_PAGE,
        filters,
      })
      setUsers(fetchedUsers)
      setTotalPages(Math.ceil(count / PER_PAGE))
    } catch (err) {
      setError('Não foi possível carregar os usuários.')
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Falha ao buscar usuários.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [page, filters])

  const handleFilterChange = (
    type: 'role' | 'subscription_status',
    value: string,
  ) => {
    setPage(1)
    setFilters((prev) => ({
      ...prev,
      [type]: value === 'all' ? undefined : value,
    }))
  }

  const handleSuccess = () => {
    fetchUsers()
    setIsDialogOpen(false)
    setEditingUser(null)
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Users className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Gerenciamento de Usuários
            </h1>
            <p className="text-muted-foreground">
              Adicione, edite e gerencie os usuários da plataforma.
            </p>
          </div>
        </div>
        <Button
          onClick={() => {
            setEditingUser(null)
            setIsDialogOpen(true)
          }}
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Criar Usuário
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
          <CardDescription>
            Filtre e gerencie os usuários cadastrados.
          </CardDescription>
          <div className="flex items-center gap-4 pt-4">
            <Select
              onValueChange={(value) => handleFilterChange('role', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por Cargo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Cargos</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">Usuário</SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) =>
                handleFilterChange('subscription_status', value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por Plano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Planos</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="free">Gratuito</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead>
                  <span className="sr-only">Ações</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-5 w-40" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-8" />
                      </TableCell>
                    </TableRow>
                  ))
                : users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="font-medium">{user.full_name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell>{roleMap[user.role]}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            statusMap[user.subscription_status ?? 'inactive']
                              .variant
                          }
                        >
                          {
                            statusMap[user.subscription_status ?? 'inactive']
                              .label
                          }
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(user.created_at), 'dd/MM/yyyy', {
                          locale: ptBR,
                        })}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingUser(user)
                            setIsDialogOpen(true)
                          }}
                        >
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setPage((p) => Math.max(1, p - 1))
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <span className="px-4 text-sm">
                  Página {page} de {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setPage((p) => Math.min(totalPages, p + 1))
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
      <UserFormDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        user={editingUser}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
