import { AlignJustify } from 'lucide-react';
import { DarkModeSwitcher } from './DarkModeSwitcher';
import avatar from '/img/avatar.png';
import { Dispatch, SetStateAction } from 'react';

export const Header = ({isOpen, setIsOpen} : {isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>}) => {
  return (
    <header className='flex items-center gap-6 h-16 sticky top-0 left-0 z-40 bg-white px-4 shadow-sm dark:bg-boxdark'>
      <button onClick={()=>setIsOpen(!isOpen)} className='hover:bg-bodydark1 rounded-full p-2 duration-300 dark:hover:bg-dark'>
        <div className='text-dark dark:text-white'><AlignJustify/></div>
      </button>
      <div className='flex w-full mr-auto justify-end items-center'>
        <div className='flex items-center gap-4'>
          <DarkModeSwitcher />
          <div className='text-right mr-4'>
            <div className='text-sm font-medium'>Thomas Anree</div>
            <div className='text-gray text-xs'>Ux Designer</div>
          </div>
          <div>
            <img src={avatar}></img>
          </div>
        </div>
      </div>
    </header>
  );
};
