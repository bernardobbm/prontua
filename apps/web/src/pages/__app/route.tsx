import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from '@tanstack/react-router';

const condition = false;

export const Route = createFileRoute('/__app')({
  component: AppLayout,
  beforeLoad: async () => {
    //todo: verify if user is authenticated
    if (condition) {
      throw redirect({
        to: '/sign-in',
      });
    }
  },
});

function AppLayout() {
  return (
    <div className='bg-primary-green-400 flex h-screen w-screen items-center'>
      <nav className='ml-10 flex h-1/2 w-60 list-none flex-col items-center justify-center gap-12 text-xl text-zinc-100'>
        <li>
          <Link to='/'>Eixo Cognitivo</Link>
        </li>
        <li>
          <Link to='/'>Eixo Habilidades</Link>
        </li>
        <li>
          <Link to='/'>Eixo Morfologia</Link>
        </li>
        <li>
          <Link to='/'>Eixo PISSCO</Link>
        </li>
      </nav>

      <div className='absolute mt-28 ml-80 h-screen w-screen rounded-tl-2xl bg-zinc-100'>
        <Outlet />
      </div>
    </div>
  );
}
