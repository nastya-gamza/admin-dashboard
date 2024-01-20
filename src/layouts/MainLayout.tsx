import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export const MainLayout = () => {
  const [isOpen, setIsOpen] = useLocalStorage<boolean>('open', true);

  return (
    <div className='flex dark:bg-boxdark-2 h-full'>
      <Sidebar isOpen={isOpen} />
      <div
        className={`${
          isOpen ? 'w-open left-72' : 'w-close left-20'
        } text-black relative transition-all duration-300 ease-in-out dark:text-white`}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className='p-7 h-full bg-whiten dark:bg-boxdark-2'>
          <Suspense
            fallback={
              <div className='fixed left-2/4 top-2/4 z-50'>
                <LoadingSpinner />
              </div>
            }>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};
