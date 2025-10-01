
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Pagination, MenuItem, CircularProgress
} from '@mui/material';
import { Edit, Delete, Add, Download } from '@mui/icons-material';

const initialForm = {
  tenantId: '',
  propertyId: '',
  amount: '',
  transactionDate: '',
  type: '',
  comments: '',
};

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tenants, setTenants] = useState([]);
  const [properties, setProperties] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;


  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/transactions?page=${page}&per_page=${perPage}`);
      let txArr = Array.isArray(res.data) ? res.data : (res.data.transactions || []);
      setTransactions(txArr);
      setTotalPages(res.data.pages || 1);
    } catch (e) {
      toast.error('Failed to fetch transactions');
    }
    setLoading(false);
  }, [page]);

  const fetchTenants = useCallback(async () => {
    try {
      const res = await axios.get(`/api/tenants?page=1&per_page=1000`);
      setTenants(res.data.tenants || res.data || []);
    } catch (e) {
      toast.error('Failed to fetch tenants');
    }
  }, []);

  const fetchProperties = useCallback(async () => {
    try {
      const res = await axios.get(`/api/properties?page=1&per_page=1000`);
      setProperties(res.data.properties || res.data || []);
    } catch (e) {
      toast.error('Failed to fetch properties');
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
    fetchTenants();
    fetchProperties();
  }, [fetchTransactions, fetchTenants, fetchProperties]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (transaction) => {
    setForm({
      tenantId: transaction.tenantId,
      propertyId: transaction.propertyId,
      amount: transaction.amount,
      transactionDate: transaction.transactionDate ? transaction.transactionDate.slice(0, 10) : '',
      type: transaction.type,
      comments: transaction.comments || ''
    });
    setEditingId(transaction.id);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this transaction?')) return;
    try {
      await axios.delete(`/api/transactions/${id}`);
      toast.success('Transaction deleted');
      fetchTransactions();
    } catch (e) {
      toast.error('Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        tenantId: form.tenantId,
        propertyId: form.propertyId,
        amount: form.amount,
        transactionDate: form.transactionDate,
        type: form.type,
        comments: form.comments
      };
      if (editingId) {
        await axios.put(`/api/transactions/${editingId}`, payload);
        toast.success('Transaction updated');
      } else {
        await axios.post('/api/transactions', payload);
        toast.success('Transaction added');
      }
      setForm(initialForm);
      setEditingId(null);
      setOpenForm(false);
      fetchTransactions();
    } catch (e) {
      toast.error('Save failed');
    }
  };

  const handleAdd = () => {
    setForm(initialForm);
    setEditingId(null);
    setOpenForm(true);
  };

  const handleExportCSV = () => {
    const csvRows = [
      ['ID', 'Tenant', 'Property', 'Amount', 'Date', 'Type', 'Comments'],
      ...transactions.map(t => {
        const tenant = tenants.find(ten => ten.id === t.tenantId);
        const property = properties.find(prop => prop.id === t.propertyId);
        return [
          t.id,
          tenant ? tenant.name : t.tenantId,
          property ? property.address : t.propertyId,
          t.amount,
          t.transactionDate || '',
          t.type,
          t.comments || ''
        ];
      })
    ];
    const csvContent = csvRows.map(r => r.map(x => '"' + (x || '') + '"').join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredTransactions = transactions.filter(t =>
    (() => {
      const tenant = tenants.find(ten => ten.id === t.tenantId);
      const property = properties.find(prop => prop.id === t.propertyId);
      return (
        (tenant && tenant.name && tenant.name.toLowerCase().includes(search.toLowerCase())) ||
        (property && property.address && property.address.toLowerCase().includes(search.toLowerCase()))
      );
    })()
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Transactions</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Search by Tenant or Property"
          value={search}
          onChange={e => setSearch(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ width: 300 }}
        />
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAdd}
            sx={{ mr: 1 }}
          >
            Add Transaction
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Download />}
            onClick={handleExportCSV}
          >
            Export CSV
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#f1f1f1', color: '#374151', fontWeight: 600, fontSize: '1rem' }}>ID</TableCell>
              <TableCell sx={{ backgroundColor: '#f1f1f1', color: '#374151', fontWeight: 600, fontSize: '1rem' }}>Tenant</TableCell>
              <TableCell sx={{ backgroundColor: '#f1f1f1', color: '#374151', fontWeight: 600, fontSize: '1rem' }}>Property</TableCell>
              <TableCell sx={{ backgroundColor: '#f1f1f1', color: '#374151', fontWeight: 600, fontSize: '1rem' }}>Amount</TableCell>
              <TableCell sx={{ backgroundColor: '#f1f1f1', color: '#374151', fontWeight: 600, fontSize: '1rem' }}>Date</TableCell>
              <TableCell sx={{ backgroundColor: '#f1f1f1', color: '#374151', fontWeight: 600, fontSize: '1rem' }}>Type</TableCell>
              <TableCell sx={{ backgroundColor: '#f1f1f1', color: '#374151', fontWeight: 600, fontSize: '1rem' }}>Remarks</TableCell>
              <TableCell sx={{ backgroundColor: '#f1f1f1', color: '#374151', fontWeight: 600, fontSize: '1rem' }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : filteredTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              filteredTransactions.map((t) => {
                const tenant = tenants.find(ten => ten.id === t.tenantId);
                const property = properties.find(prop => prop.id === t.propertyId);
                return (
                  <TableRow key={t.id}>
                    <TableCell>{t.id}</TableCell>
                    <TableCell>{tenant ? tenant.name : t.tenantId}</TableCell>
                    <TableCell>{property ? property.address : t.propertyId}</TableCell>
                    <TableCell>{t.amount}</TableCell>
                    <TableCell>{t.transactionDate ? t.transactionDate : ''}</TableCell>
                    <TableCell>{t.type}</TableCell>
                    <TableCell>{t.comments || ''}</TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => handleEdit(t)} size="small">
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(t.id)} size="small">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              select
              label="Tenant"
              name="tenantId"
              value={form.tenantId}
              onChange={e => {
                const selectedTenantId = e.target.value;
                setForm(prev => {
                  const selectedTenant = tenants.find(t => t.id === selectedTenantId);
                  return {
                    ...prev,
                    tenantId: selectedTenantId,
                    propertyId: selectedTenant ? selectedTenant.propertyId : ''
                  };
                });
              }}
              fullWidth
              margin="normal"
              required
            >
              {tenants.map((tenant) => (
                <MenuItem key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Property"
              name="propertyId"
              value={form.propertyId}
              onChange={() => {}}
              fullWidth
              margin="normal"
              required
              InputProps={{ readOnly: true }}
              disabled
            >
              {properties.map((property) => (
                <MenuItem key={property.id} value={property.id}>
                  {property.address}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Amount"
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Date"
              name="transactionDate"
              type="date"
              value={form.transactionDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              select
              label="Type"
              name="type"
              value={form.type}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            >
              <MenuItem value="rent">Rent</MenuItem>
              <MenuItem value="security">Security</MenuItem>
              <MenuItem value="payment_received">Payment Received</MenuItem>
              <MenuItem value="gas">Gas</MenuItem>
              <MenuItem value="electricity">Electricity</MenuItem>
              <MenuItem value="water">Water</MenuItem>
              <MenuItem value="maintenance">Maintenance</MenuItem>
              <MenuItem value="misc">Miscellaneous</MenuItem>
            </TextField>
            <TextField
              label="Remarks"
              name="comments"
              value={form.comments}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenForm(false)} color="secondary">Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {editingId ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default Transactions;
