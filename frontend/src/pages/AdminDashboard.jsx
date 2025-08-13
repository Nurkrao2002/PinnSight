import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const AdminDashboard = () => {
  const [tenants, setTenants] = useState([]);
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const [tenantsRes, usersRes, ticketsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/tenants`, config),
          axios.get(`${API_BASE_URL}/users`, config),
          axios.get(`${API_BASE_URL}/support-tickets`, config),
        ]);
        setTenants(tenantsRes.data);
        setUsers(usersRes.data);
        setTickets(ticketsRes.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load dashboard data. Please try again later.');
        if (err.response && err.response.status === 401) {
            handleLogout(); // Token might be expired
        }
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Platform Admin Dashboard</h1>
        <div>
            <span>Welcome, {user?.name} ({user?.role})</span>
            <button onClick={handleLogout} style={{ marginLeft: '20px', padding: '8px 15px', cursor: 'pointer' }}>
                Logout
            </button>
        </div>
      </header>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <section>
          <h2>Tenants ({tenants.length})</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #555', padding: '8px', textAlign: 'left' }}>Name</th>
                <th style={{ border: '1px solid #555', padding: '8px', textAlign: 'left' }}>Plan</th>
                <th style={{ border: '1px solid #555', padding: '8px', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map(tenant => (
                <tr key={tenant.id}>
                  <td style={{ border: '1px solid #555', padding: '8px' }}>{tenant.name}</td>
                  <td style={{ border: '1px solid #555', padding: '8px' }}>{tenant.plan}</td>
                  <td style={{ border: '1px solid #555', padding: '8px' }}>{tenant.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2>Users ({users.length})</h2>
           <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #555', padding: '8px', textAlign: 'left' }}>Name</th>
                <th style={{ border: '1px solid #555', padding: '8px', textAlign: 'left' }}>Email</th>
                <th style={{ border: '1px solid #555', padding: '8px', textAlign: 'left' }}>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td style={{ border: '1px solid #555', padding: '8px' }}>{user.name}</td>
                  <td style={{ border: '1px solid #555', padding: '8px' }}>{user.email}</td>
                  <td style={{ border: '1px solid #555', padding: '8px' }}>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
       <section style={{marginTop: '20px'}}>
          <h2>Support Tickets ({tickets.length})</h2>
           <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #555', padding: '8px', textAlign: 'left' }}>Subject</th>
                <th style={{ border: '1px solid #555', padding: '8px', textAlign: 'left' }}>Tenant</th>
                <th style={{ border: '1px solid #555', padding: '8px', textAlign: 'left' }}>Priority</th>
                <th style={{ border: '1px solid #555', padding: '8px', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket.id}>
                  <td style={{ border: '1px solid #555', padding: '8px' }}>{ticket.subject}</td>
                  <td style={{ border: '1px solid #555', padding: '8px' }}>{ticket.tenant_name}</td>
                  <td style={{ border: '1px solid #555', padding: '8px' }}>{ticket.priority}</td>
                  <td style={{ border: '1px solid #555', padding: '8px' }}>{ticket.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
    </div>
  );
};

export default AdminDashboard;
