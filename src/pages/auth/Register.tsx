import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { signUp } from '@/services/auth'

const registerSchema = z
  .object({
    name: z.string().min(1, { message: 'O nome é obrigatório.' }),
    email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
    password: z
      .string()
      .min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true)
    try {
      await signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
          },
        },
      })
      toast({
        title: 'Conta criada com sucesso!',
        description: 'Verifique seu e-mail para confirmar sua conta.',
      })
      navigate('/login')
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erro no registro',
        description:
          error.message || 'Ocorreu um erro. Por favor, tente novamente.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md animate-fade-in-up">
        <CardHeader className="text-center">
          <img
            src="https://img.usecurling.com/i?q=saas-omnichannel&color=gradient"
            alt="SaaS Omnichannel Logo"
            className="w-24 h-24 mx-auto mb-4"
          />
          <CardTitle className="text-2xl font-bold">Crie sua conta</CardTitle>
          <CardDescription>É rápido e fácil. Vamos começar.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" {...field} />
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
                      <Input placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Crie uma senha forte"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirme sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Registrar'
                )}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Já tem uma conta?{' '}
            <Link
              to="/login"
              className="font-semibold text-primary hover:underline"
            >
              Faça login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
