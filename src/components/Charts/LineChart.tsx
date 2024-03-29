import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartData {
  month: string;
  amount: string;
}

export const LineChart = () => {
  const [sales, setSales] = useState<ChartData[]>([]);
  const baseUrl = 'http://localhost:5000/sales';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(baseUrl);
        setSales(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: sales.map(i => i.month),
    datasets: [
      {
        label: 'Sales',
        lineTension: 0.5,
        data: sales.map(i => i.amount),
        borderColor: '#80CAEE',
        backgroundColor: '#80CAEE',
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
    scales: {
      x: {
        ticks: {
          color: '#A9A9A9',
        },
      },
      y: {
        ticks: {
          color: '#A9A9A9',
        },
      },
    },
  };

  return sales.length ? (
    <>
      <Line options={options} data={data} />
      <div className='flex flex-wrap gap-x-4 gap-y-1 justify-center mt-6'>
        <div className='flex items-center gap-1 text-xs'>
          <div className={`w-3 h-3 rounded-full bg-[#80CAEE]`}></div>
          Sales
        </div>
      </div>
    </>
  ) : null;
};
