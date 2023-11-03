import { CircleDollarSign, PackageSearch, ShoppingCart, Users2 } from 'lucide-react';
import { DashboardCard } from '@/components/DashboardCard';

export const Home = () => {
  const dashboardCards = [
    { title: 'Total Profit', icon: <CircleDollarSign />, number: 45.2, fluctuation: 0.43 },
    { title: 'Total Orders', icon: <ShoppingCart />, number: 3472, fluctuation: 2.59 },
    { title: 'Total Product', icon: <PackageSearch />, number: 2738, fluctuation: 4.35 },
    { title: 'Total Customers', icon: <Users2 />, number: 3921, fluctuation: -0.95 },
  ];

  return (
    <div className='grid grid-cols-auto-fit grid-cols-layout gap-6 mt-8'>
      {dashboardCards.map(({ title, icon, number, fluctuation }) => (
        <DashboardCard key={title} title={title} icon={icon} number={number} fluctuation={fluctuation} />
      ))}
    </div>
  );
};
