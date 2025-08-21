import DashboardLayout from '../components/DashboardLayout';

export default function FinanceDashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-4">
        <h1>Finance Dashboard</h1>
        <p>Welcome, Finance Team! Here you can view financial reports and analytics.</p>
        {/* Finance-specific components will go here */}
      </div>
    </DashboardLayout>
  );
}
