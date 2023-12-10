import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartData {
  month: string;
  amount: string;
}

export const GroupBarChart = () => {
  const [budget, setBudget] = useState<ChartData[]>([]);
  const [costs, setCosts] = useState<ChartData[]>([]);
  const baseUrl = 'http://localhost:5000/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}budget`);
        setBudget(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}costs`);
        setCosts(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: budget.map(i => i.month),
    datasets: [
      {
        label: 'Budget',
        data: budget.map(i => i.amount),
        backgroundColor: '#3C50E0',
      },
      {
        label: 'Costs',
        data: costs.map(i => i.amount),
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

  return budget.length && costs.length ? (
    <>
      <Bar options={options} data={data} />{' '}
      <div className='flex flex-wrap gap-x-4 gap-y-1 justify-center mt-4'>
        <div className='flex items-center gap-1 text-xs'>
          <div className={`w-3 h-3 rounded-full bg-[#3C50E0]`}></div>
          Budget
        </div>
        <div className='flex items-center gap-1 text-xs'>
          <div className={`w-3 h-3 rounded-full bg-[#80CAEE]`}></div>
          Costs
        </div>
      </div>
    </>
  ) : null;
};
