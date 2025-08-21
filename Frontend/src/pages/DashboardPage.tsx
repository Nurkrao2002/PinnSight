import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import DashboardLayout from '../components/DashboardLayout';
import DashboardHeader from '../components/DashboardHeader';
import StatCard from '../components/StatCard';
import SalesChart from '../components/SalesChart';
import RecentActivityTable from '../components/RecentActivityTable';
import { getStatCardData } from '../services/api';
import * as Icon from 'react-bootstrap-icons';

// Define the type for the stat card data
interface StatCardData {
  title: string;
  value: string;
  iconName: keyof typeof Icon;
}

export default function DashboardPage() {
  const [statCards, setStatCards] = useState<StatCardData[]>([]);

  useEffect(() => {
    getStatCardData().then(data => {
      setStatCards(data as StatCardData[]);
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardHeader />
      <div className="p-4">
        <Row className="mb-4">
          {statCards.map((card, index) => (
            <Col key={index}>
              <StatCard title={card.title} value={card.value} iconName={card.iconName} />
            </Col>
          ))}
        </Row>
        <Row className="mb-4">
          <Col>
            <SalesChart />
          </Col>
        </Row>
        <Row>
          <Col>
            <RecentActivityTable />
          </Col>
        </Row>
      </div>
    </DashboardLayout>
  );
}
