import DashboardLayout from '../components/DashboardLayout';

export default function AdminDashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-4">
        <h1>Admin Dashboard</h1>
        <p>Welcome, Admin! Here you can manage users and system settings.</p>
        {/* Admin-specific components will go here */}
      </div>
    </DashboardLayout>
  );
}
