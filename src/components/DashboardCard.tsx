import { ArrowDown, ArrowUp } from 'lucide-react';
import { ChartCard } from './ChartCard';

interface DashboardCardProps {
  title: string;
  icon: JSX.Element;
  number: number;
  fluctuation: number;
}

export const DashboardCard = ({ title, icon, number, fluctuation }: DashboardCardProps) => {
  const editFluctuationNumber = () => {
    return (
      <>
        {fluctuation > 0 ? (
          <div className='flex items-center'>
            <ArrowUp strokeWidth={1.25} className='text-meta-3' />
            <span>{fluctuation}</span>
          </div>
        ) : (
          <div className='flex items-center'>
            <ArrowDown strokeWidth={1.25} className='text-meta-1'/>
            <span>{fluctuation}</span>
          </div>
        )}
      </>
    );
  };

  return (
    <ChartCard>
      <div className='bg-meta-2 text-primary dark:bg-meta-10 rounded-full p-3 duration-300 w-12 mb-3'>
        {icon}
      </div>
      <div>
        <h4 className='text-2xl font-bold mb-1'>{number}</h4>
        <span className='text-gray text-sm font-medium dark:text-[#A9A9A9]'>{title}</span>
      </div>
      <span className='absolute right-7 bottom-6 text-sm'>{editFluctuationNumber()}</span>
    </ChartCard>
  );
};
