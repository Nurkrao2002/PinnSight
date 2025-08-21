import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from 'react-bootstrap';
import { getSalesData } from '../services/api';

// Define the type for the sales data
interface SalesData {
  name: string;
  sales: number;
}

export default function SalesChart() {
  const [data, setData] = useState<SalesData[]>([]);

  useEffect(() => {
    getSalesData().then(data => {
      setData(data as SalesData[]);
    });
  }, []);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Sales Overview</Card.Title>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
}
