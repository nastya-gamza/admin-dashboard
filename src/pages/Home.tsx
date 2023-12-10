import { CircleDollarSign, PackageSearch, ShoppingCart, Users2 } from 'lucide-react';
import { DashboardCard } from '@/components/DashboardCard';
import { GroupBarChart } from '@/components/Charts/GroupBarChart';
import { BarChart } from '@/components/Charts/BarChart';
import { DoughnutChart } from '@/components/Charts/DoughnutChart';
import { LineChart } from '@/components/Charts/LineChart';
import { ChartCard } from '@/components/ChartCard';
import { MapChart } from '@/components/Charts/MapChart';
import { LineChartTwo } from '@/components/Charts/LineChartTwo';

export const Home = () => {
  const dashboardCards = [
    { title: 'Total Profit', icon: <CircleDollarSign />, number: 45.2, fluctuation: 0.43 },
    { title: 'Total Orders', icon: <ShoppingCart />, number: 3472, fluctuation: 2.59 },
    { title: 'Total Product', icon: <PackageSearch />, number: 2738, fluctuation: 4.35 },
    { title: 'Total Customers', icon: <Users2 />, number: 3921, fluctuation: -0.95 },
  ];

  return (
    <>
      <section className='grid items-stretch lg:grid-cols-4 grid-cols-2 gap-6 md:gap-4 mt-2 h-full'>
        {dashboardCards.map(({ title, icon, number, fluctuation }) => (
          <DashboardCard
            key={title}
            title={title}
            icon={icon}
            number={number}
            fluctuation={fluctuation}
          />
        ))}
        <div className='col-span-2'>
          <ChartCard>
            <h3 className='font-bold mb-3 text-center'>Budget vs Costs</h3>
            <GroupBarChart />
          </ChartCard>
        </div>
        <div className='col-span-2'>
          <ChartCard>
            <h3 className='font-bold text-center'>Customer location</h3>
            <MapChart/>
          </ChartCard>
        </div>
        <div>
          <ChartCard>
            <h3 className='font-bold mb-7 text-center'>Top 5 products</h3>
            <DoughnutChart />
          </ChartCard>
        </div>
        <div>
          <ChartCard>
            <h3 className='font-bold mb-7 text-center'>Last orders</h3>
            </ChartCard>
        </div>
        <div className='col-span-2'>
          <ChartCard>
            <h3 className='font-bold mb-3 text-center'>Total sales</h3>
            <LineChart />
          </ChartCard>
        </div>
        <div className='col-span-2'>
          <ChartCard>
            <h3 className='font-bold mb-3 text-center'>Costs vs Revenue</h3>
            <LineChartTwo />
          </ChartCard>
        </div>
        <div className='col-span-2'>
          <ChartCard>
            <h3 className='font-bold mb-3 text-center'>Revenue</h3>
            <BarChart />
          </ChartCard>
        </div>
      </section>
    </>
  );
};
