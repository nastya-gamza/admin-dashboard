import { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Products {
  title: string;
  sales: number;
}

export const DoughnutChart = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const baseUrl = 'http://localhost:5000/topProducts';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(baseUrl);
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: products.map(i => i.title),
    datasets: [
      {
        label: 'Sales',
        data: products.map(i => i.sales),
        backgroundColor: ['#3C50E0', '#6577F3', '#80CAEE', '#0FADCF', '#A9BDFF'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const colors = ['bg-primary', 'bg-[#6577F3]', 'bg-[#80CAEE]', 'bg-[#0FADCF]', 'bg-[#A9BDFF]'];

  return (
    products.length && (
      <>
        <Doughnut options={options} data={data} />
        <div className='flex flex-wrap gap-x-4 gap-y-1 justify-center mt-4'>
          {products.map((el, i) => (
            <div key={i} className='flex items-center gap-1 text-xs'>
              <div className={`w-3 h-3 rounded-full ${colors[i]}`}></div>
              {el.title}
            </div>
          ))}
        </div>
      </>
    )
  );
};
