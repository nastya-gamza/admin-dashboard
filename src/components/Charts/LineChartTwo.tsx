import axios from 'axios';
import { Chart as ChartJS, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, } from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  month: string;
  amount: string;
}

export const LineChartTwo = () => {
  const [revenue, setRevenue] = useState<ChartData[]>([]);
  const [costs, setCosts] = useState<ChartData[]>([]);
  const baseUrl = 'http://localhost:5000/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}revenue`);
        const latestData = data.slice(0, 6);
        console.log(data)
        setRevenue(latestData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const {data} = await axios.get(`${baseUrl}costs`);
        setCosts(data)
      } catch (err) {
        console.log(err);
      }
    } 
    fetchData();
  }, []);

  const data = {
    labels: revenue.map(i => i.month),
    datasets: [
      {
        label: 'Revenue',
        data: revenue.map(i => i.amount),
        borderColor: '#3C50E0',
        backgroundColor: '#3C50E0',
      },
      {
        label: 'Costs',
        data: costs.map(i => i.amount),
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

  return revenue.length&&costs.length ? <Line options={options} data={data} /> : null;
};