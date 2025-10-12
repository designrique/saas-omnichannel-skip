import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import {
  createUser,
  updateUser,
  type UserProfile,
  type UserRole,
  type SubscriptionStatus,
} from '@/services/users'

const userFormSchema = z.object({
  full_name: z.string().min(1, 'O nome é obrigatório.'),
  email: z.string().email('E-mail inválido.'),
  role: z.enum(['user', 'admin']),
  subscription_status: z.enum(['free', 'pro', 'inactive']),
})

type UserFormValues = z.infer<typeof userFormSchema>

interface UserFormDialogProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  user: UserProfile | null
  onSuccess: () => void
}

export const UserFormDialog = ({
  isOpen,
  setIsOpen,
  user,
  onSuccess,
}: UserFormDialogProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const isEditing = !!user

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      full_name: '',
      email: '',
      role: 'user',
      subscription_status: 'free',
    },
  })

  useEffect(() => {
    if (user) {
      form.reset({
        full_name: user.full_name ?? '',
        email: user.email ?? '',
        role: user.role,
        subscription_status: user.subscription_status ?? 'free',
      })
    } else {
      form.reset({
        full_name: '',
        email: '',
        role: 'user',
        subscription_status: 'free',
      })
    }
  }, [user, isOpen, form])

  const onSubmit = async (data: UserFormValues) => {
    setIsLoading(true)
    try {
      if (isEditing) {
        await updateUser({
          userId: user.id,
          updates: {
            full_name: data.full_name,
            role: data.role as UserRole,
            subscription_status: data.subscription_status as SubscriptionStatus,
          },
        })
        toast({
          title: 'Sucesso',
          description: 'Usuário atualizado com sucesso.',
        })
      } else {
        await createUser({
          email: data.email,
          full_name: data.full_name,
          role: data.role as UserRole,
          subscription_status: data.subscription_status as SubscriptionStatus,
        })
        toast({
          title: 'Sucesso',
          description: 'Convite enviado para o novo usuário.',
        })
      }
      onSuccess()
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: error.message || 'Falha ao salvar usuário.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Usuário' : 'Criar Novo Usuário'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Atualize as informações do usuário.'
              : 'Preencha os dados para convidar um novo usuário.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isEditing} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="user">Usuário</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subscription_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plano</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="free">Gratuito</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? 'Salvar Alterações' : 'Enviar Convite'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
