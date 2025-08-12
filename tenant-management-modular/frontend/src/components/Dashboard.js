
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Box, Typography, Grid, Card, CardContent, CardHeader, Avatar, Button, Stack } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const Dashboard = () => {
  const [stats, setStats] = useState({
    tenants: 0,
    properties: 0,
    transactions: 0
  });
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const enableBackup = params.get('download') === 'true';

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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3 }}>
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: 'primary.main' }}><PeopleIcon /></Avatar>}
              title={<Typography variant="h6">Total Tenants</Typography>}
            />
            <CardContent>
              <Typography variant="h3" color="primary">{stats.tenants}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3 }}>
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}><HomeWorkIcon /></Avatar>}
              title={<Typography variant="h6">Total Properties</Typography>}
            />
            <CardContent>
              <Typography variant="h3" color="secondary">{stats.properties}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3 }}>
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: 'success.main' }}><ReceiptLongIcon /></Avatar>}
              title={<Typography variant="h6">Total Transactions</Typography>}
            />
            <CardContent>
              <Typography variant="h3" color="success.main">{stats.transactions}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Card sx={{ boxShadow: 2 }}>
        <CardHeader title={<Typography variant="h6">Quick Actions</Typography>} />
        <CardContent>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button variant="contained" color="primary" onClick={() => window.location.href = '/tenants'}>Manage Tenants</Button>
            <Button variant="contained" color="primary" onClick={() => window.location.href = '/properties'}>Manage Properties</Button>
            <Button variant="contained" color="primary" onClick={() => window.location.href = '/transactions'}>View Transactions</Button>
            <Button
              variant="outlined"
              color="secondary"
              disabled={!enableBackup}
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
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
