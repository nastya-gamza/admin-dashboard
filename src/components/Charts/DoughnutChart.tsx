import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Products {
  id: number;
  name: string;
  orders: string;
}

export const DoughnutChart = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const baseUrl = 'http://localhost:3000/products';

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
    labels: products.map(i => i.name),
    datasets: [
      {
        label: 'Orders',
        data: products.map(i => i.orders),
        backgroundColor: [
          '#3C50E0',
          '#6577F3',
          '#80CAEE',
          '#0FADCF',
          '#A9BDFF',
        ],
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

  return products.length ? <Doughnut options={options} data={data} /> : null;
};
