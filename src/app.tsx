import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { TextInput } from './components/text-input';
import './styles/global.css';

const authenticateUserFormSchema = z.object({
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

type AuthenticateUserFormProps = z.infer<typeof authenticateUserFormSchema>;

export function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authenticateUserFormSchema),
  });

  function authenticateUser(data: AuthenticateUserFormProps) {
    console.log(data);
  }

  return (
    <main className='bg-zinc-50font-inter flex h-screen flex-col items-center gap-2 p-4 sm:items-baseline'>
      <div className='grid w-full grid-flow-row grid-cols-[30%_70%] grid-rows-1 place-items-center gap-5 md:grid-cols-[20%_60%_20%]'>
        <img
          className='justify-self-start md:h-20 md:w-38'
          src='../src/assets/images/horizontal-logo.png'
          alt='Logo'
        />
        <h1 className='font-inter-semibold text-xl text-wrap text-gray-900 sm:text-2xl'>
          Sistema Gerenciador de Notas - Uniceplac
        </h1>
      </div>

      <form
        className='flex h-full w-fit flex-col items-center justify-center gap-6 px-4'
        onSubmit={handleSubmit(authenticateUser)}
      >
        <TextInput
          label='Acesso:'
          id='email'
          type='email'
          placeholder='Digite seu e-mail'
          {...register('email')}
          error={!!errors.email}
          errorMessage={errors.email?.message}
        />

        <TextInput
          label='Senha:'
          id='password'
          type='password'
          name='password'
          placeholder='Digite sua senha'
          {...register('password')}
          error={!!errors.password}
          errorMessage={errors.password?.message}
        />

        <button
          type='submit'
          className='bg-primary-green-400 font-inter-bold hover:bg-primary-green-500 h-10 w-full transform rounded-sm text-white shadow-sm transition duration-300 hover:shadow-md'
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
