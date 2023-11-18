import { ChartCard } from "./ChartCard";

interface DashboardCardProps {
  title: string;
  icon: JSX.Element;
  number: number;
  fluctuation: number;
}

export const DashboardCard = ({ title, icon, number, fluctuation }: DashboardCardProps) => {
  return (
    <ChartCard>
      <div className='bg-meta-2 text-primary dark:text-white dark:bg-meta-4 rounded-full p-3 duration-300 w-12 mb-3'>{icon}</div>
      <div>
        <h4 className='text-2xl font-bold mb-1'>{number}</h4>
        <span className='text-gray text-sm font-medium dark:text-black'>{title}</span>
      </div>
      <span className='absolute right-7 bottom-6 text-sm'>{fluctuation}</span>
    </ChartCard>
  );
};
