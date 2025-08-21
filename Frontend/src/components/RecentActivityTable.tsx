import { useState, useEffect } from 'react';
import { Table, Card } from 'react-bootstrap';
import { getRecentActivity } from '../services/api';

// Define the type for the activity data
interface ActivityData {
  id: string;
  user: string;
  amount: string;
  date: string;
  status: string;
}

export default function RecentActivityTable() {
  const [data, setData] = useState<ActivityData[]>([]);

  useEffect(() => {
    getRecentActivity().then(data => {
      setData(data as ActivityData[]);
    });
  }, []);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Recent Activity</Card.Title>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>User</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.user}</td>
                <td>{row.amount}</td>
                <td>{row.date}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
