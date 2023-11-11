import { Link, NavLink } from 'react-router-dom';
import logo from '/icons/logo.svg';
import {
  CalendarDays,
  LayoutGrid,
  ListOrdered,
  PackageOpen,
  Settings,
  Users,
} from 'lucide-react';

export const Sidebar = ({isOpen}: {isOpen: boolean}) => {

  const navItems = [
    { title: 'Dashboard', src: '/', icon: <LayoutGrid /> },
    { title: 'Customers', src: 'customers', icon: <Users /> },
    { title: 'Products', src: 'products', icon: <PackageOpen /> },
    { title: 'Orders', src: 'orders', icon: <ListOrdered /> },
    { title: 'Calendar', src: 'calendar', icon: <CalendarDays /> },
    { title: 'Settings', src: 'settings', icon: <Settings /> },
  ];
  return (
    <aside
      className={`${
        isOpen ? 'w-72' : 'w-20'
      } transition-all duration-300 ease-in-out fixed top-0 left-0 z-50 h-screen bg-boxdark p-6 pt-9`}>
      <Link to='/' className='flex items-center gap-2 transition-all duration-300 ease-in-out'>
        <img src={logo} alt='logo' />
        <h1
          className={`origin-left text-3xl text-white font-medium duration-200 ${
            !isOpen && 'scale-0'
          }`}>
          TailAdmin
        </h1>
      </Link>
      <nav>
        <ul className='w-full text-bodydark1 pt-16'>
          {navItems.map(({ title, src, icon }) => (
            <li key={title} className='h-11 hover:bg-darkhovered rounded-md mb-2 duration-300'>
              <NavLink
                to={src}
                className={navData =>
                  `w-full h-full flex items-center gap-3 px-2 rounded-md ${!isOpen && 'justify-center'} ${
                    navData.isActive && 'bg-darkhovered'
                  }`
                }>
                <div>{icon}</div>
                <span className={`${!isOpen && 'hidden'}`}>{title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
