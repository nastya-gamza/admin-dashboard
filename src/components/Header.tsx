import { AlignJustify } from 'lucide-react';
import { DarkModeSwitcher } from './DarkModeSwitcher';
import avatar from '/img/avatar.png';
import { Dispatch, SetStateAction } from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppDispatch } from '@/hooks/useRedux';
import { removeUser } from '@/redux/userSlice';

export const Header = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { email } = useAuth();

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
    localStorage.removeItem('userAuth')
  }

  return (
    <header className='flex items-center gap-6 h-16 sticky top-0 left-0 z-40 bg-white px-4 shadow-sm dark:bg-boxdark'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='hover:bg-bodydark1 rounded-full p-2 duration-300 dark:hover:bg-dark'>
        <div className='text-dark dark:text-white'>
          <AlignJustify />
        </div>
      </button>
      <div className='flex w-full mr-auto justify-end items-center'>
        <div className='flex items-center gap-4'>
          <DarkModeSwitcher />
          <div className='text-right mr-3'>
            <div className='text-sm font-medium'>{email.split('@')[0]}</div>
            <div className='text-gray text-xs'>Developer</div>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className='focus-visible:outline-none'>
                <img src={avatar}></img>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='mr-5'>
                <DropdownMenuLabel className='grid'>Profile <span className='text-xs text-gray font-thin'>{email}</span></DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
