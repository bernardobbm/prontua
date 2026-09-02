import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import UniceplacLogo from '@/assets/images/uniceplac-logo.svg?react';
import { TextInput } from '@/components/text-input';

export const Route = createFileRoute('/__auth/sign-in')({
  component: SignIn,
  head: () => ({
    meta: [
      {
        title: 'Sign-In - Sistema Gerenciador de Notas',
      },
    ],
  }),
});

const SignInFormSchema = z.object({
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .trim()
    .refine((email) => z.email().safeParse(email).success, 'E-mail inválido'),
  password: z
    .string()
    .nonempty('A senha precisa ser preenchida')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type SignInFormProps = z.infer<typeof SignInFormSchema>;

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInFormSchema),
  });

  function authenticateUser(data: SignInFormProps) {
    console.log(data);
  }

  return (
    <main className='font-inter bg-primary-green-400 flex h-screen flex-col justify-center gap-2 p-4 sm:items-baseline'>
      <div className='m-auto flex flex-col items-center gap-10'>
        <h1 className='font-inter-semibold text-xl text-wrap text-zinc-100 sm:text-2xl'>
          PRONTUA - Prontuário Acadêmico Uniceplac
        </h1>

        <div className='flex h-96 w-4xl flex-row items-center rounded-xl bg-zinc-100 shadow-2xl'>
          <UniceplacLogo className='-ml-28 h-2/4 w-fit rotate-90' />

          <form
            className='flex h-full w-fit flex-col items-center justify-center gap-4 px-4'
            onSubmit={handleSubmit(authenticateUser)}
          >
            <TextInput
              label='Acesso:'
              id='email'
              type='email'
              placeholder='Digite seu e-mail'
              {...register('email')}
              error={!!errors.email}
              errorMessage={errors.email?.message ?? null}
            />

            <TextInput
              label='Senha:'
              id='password'
              type='password'
              placeholder='Digite sua senha'
              {...register('password')}
              error={!!errors.password}
              errorMessage={errors.password?.message ?? null}
            />

            <button
              type='submit'
              className='bg-primary-green-400 font-inter-bold hover:bg-primary-green-500 h-10 w-full transform rounded-sm text-white shadow-sm transition duration-300 hover:shadow-md'
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
