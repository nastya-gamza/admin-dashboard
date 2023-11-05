import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const MainLayout = () => {
  const [isOpen, setIsOpen] = useLocalStorage<boolean>('open', true);

  return (
    <div className='flex dark:bg-boxdark-2 h-full'>
      <Sidebar isOpen={isOpen}/>
      <div className= {`${isOpen ? 'w-open left-72' : 'w-close left-20'} text-black relative transition-all duration-300 ease-in-out dark:text-white`}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className='p-7 h-full bg-whiten dark:bg-boxdark-2'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
