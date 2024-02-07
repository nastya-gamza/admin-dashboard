import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, scales);

interface Revenue {
  month: string;
  amount: string;
}

export const BarChart = () => {
  const [chart, setChart] = useState<Revenue[]>([]);
  const baseUrl = 'http://localhost:5000/revenue';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(baseUrl);
        setChart(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: chart.map(i => i.month),
    datasets: [
      {
        label: 'Revenue',
        data: chart.map(i => i.amount),
        backgroundColor: '#3C50E0',
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

  return chart.length ? (
    <>
      <Bar options={options} data={data} />
      <div className='flex flex-wrap gap-x-4 gap-y-1 justify-center mt-6'>
        <div className='flex items-center gap-1 text-xs'>
          <div className={`w-3 h-3 rounded-full bg-[#3C50E0]`}></div>
          Revenue
        </div>
      </div>
    </>
  ) : null;
};
