import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/__app/')({
  component: Home,
  head: () => ({
    meta: [
      {
        title: 'Home - Sistema Gerenciador de Notas',
      },
    ],
  }),
});

function Home() {
  return (
    <div className='p-4'>
      <p>Página inicial teste</p>
    </div>
  );
}
