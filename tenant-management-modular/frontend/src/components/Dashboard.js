import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState({
    tenants: 0,
    properties: 0,
    transactions: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [tenantsRes, propertiesRes, transactionsRes] = await Promise.all([
        axios.get('/api/tenants'),
        axios.get('/api/properties'),
        axios.get('/api/transactions')
      ]);

      setStats({
        tenants: tenantsRes.data.total || tenantsRes.data.length || 0,
        properties: propertiesRes.data.length || 0,
        transactions: transactionsRes.data.length || 0
      });
    } catch (error) {
      toast.error('Failed to fetch dashboard statistics');
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="grid grid-cols-3">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Total Tenants</h3>
          </div>
          <div className="stat-value">{stats.tenants}</div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Total Properties</h3>
          </div>
          <div className="stat-value">{stats.properties}</div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Total Transactions</h3>
          </div>
          <div className="stat-value">{stats.transactions}</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button 
            className="btn btn-primary"
            onClick={() => window.location.href = '/tenants'}
          >
            Manage Tenants
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.href = '/properties'}
          >
            Manage Properties
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.href = '/transactions'}
          >
            View Transactions
          </button>
          <button 
            className="btn btn-secondary"
            onClick={async () => {
              try {
                await axios.get('/api/backup');
                toast.success('Database backup downloaded successfully');
              } catch (error) {
                toast.error('Failed to download backup');
              }
            }}
          >
            Download Backup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
