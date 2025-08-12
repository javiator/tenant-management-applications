


import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Pagination, CircularProgress
} from '@mui/material';
import { Edit, Delete, Add, Download, Visibility, ReceiptLong } from '@mui/icons-material';
import PropertyTransactionsModal from './PropertyTransactionsModal';

const initialForm = {
  address: '',
  rent: '',
  maintenance: '',
};

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openTransactions, setOpenTransactions] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/properties?page=${page}&per_page=${perPage}`);
      setProperties(res.data.properties || res.data || []);
      setTotalPages(res.data.pages || 1);
    } catch (e) {
      toast.error('Failed to fetch properties');
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (property) => {
    setForm({ ...property });
    setEditingId(property.id);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this property?')) return;
    try {
      await axios.delete(`/api/properties/${id}`);
      toast.success('Property deleted');
      fetchProperties();
    } catch (e) {
      toast.error('Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/properties/${editingId}`, form);
        toast.success('Property updated');
      } else {
        await axios.post('/api/properties', form);
        toast.success('Property added');
      }
      setForm(initialForm);
      setEditingId(null);
      setOpenForm(false);
      fetchProperties();
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
  ['ID', 'Address', 'Rent', 'Maintenance', 'Created Date'],
  ...properties.map(p => [p.id, p.address, p.rent, p.maintenance, p.created_date])
    ];
    const csvContent = csvRows.map(r => r.map(x => '"' + (x || '') + '"').join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'properties.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShowTransactions = (property) => {
    setSelectedProperty(property);
    setOpenTransactions(true);
  };

  const filteredProperties = properties.filter(p =>
    p.address && p.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Properties</Typography>
        <Box>
          <Button variant="contained" color="success" startIcon={<Download />} onClick={handleExportCSV} sx={{ mr: 1 }}>Export CSV</Button>
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAdd}>Add Property</Button>
        </Box>
      </Box>
      <TextField
        label="Search by address"
        value={search}
        onChange={e => setSearch(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ mb: 2, width: { xs: '100%', sm: '50%', md: '33%' } }}
      />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#f1f1f1', color: '#374151', fontWeight: 600, fontSize: '1rem' }}>ID</TableCell>
                <TableCell sx={{ backgroundColor: '#f1f1f1', color: '#374151', fontWeight: 600, fontSize: '1rem' }}>Address</TableCell>
                <TableCell sx={{ backgroundColor: '#f1f1f1', color: '#374151', fontWeight: 600, fontSize: '1rem' }}>Rent</TableCell>
                <TableCell sx={{ backgroundColor: '#f1f1f1', color: '#374151', fontWeight: 600, fontSize: '1rem' }}>Maintenance</TableCell>
                <TableCell sx={{ backgroundColor: '#f1f1f1', color: '#374151', fontWeight: 600, fontSize: '1rem' }}>Created Date</TableCell>
                <TableCell sx={{ backgroundColor: '#f1f1f1', color: '#374151', fontWeight: 600, fontSize: '1rem' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProperties.map(property => (
                <TableRow key={property.id}>
                  <TableCell>{property.id}</TableCell>
                  <TableCell>
                    {property.address}
                  </TableCell>
                  <TableCell>{property.rent}</TableCell>
                  <TableCell>{property.maintenance}</TableCell>
                  <TableCell>{property.created_date ? property.created_date.slice(0, 10) : ''}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleShowTransactions(property)} size="small" title="Transactions"><ReceiptLong /></IconButton>
                    <IconButton color="info" onClick={() => handleEdit(property)} size="small"><Edit /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(property.id)} size="small"><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination count={totalPages} page={page} onChange={(_, val) => setPage(val)} color="primary" />
      </Box>

      {/* Add/Edit Dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit Property' : 'Add Property'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <TextField name="address" label="Address" value={form.address} onChange={handleChange} required fullWidth />
            <TextField name="rent" label="Rent" type="number" value={form.rent} onChange={handleChange} fullWidth />
            <TextField name="maintenance" label="Maintenance" type="number" value={form.maintenance} onChange={handleChange} fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenForm(false)} color="secondary">Cancel</Button>
            <Button type="submit" variant="contained" color="primary">{editingId ? 'Update' : 'Add'} Property</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Transactions Dialog */}
      <PropertyTransactionsModal 
        open={openTransactions}
        propertyId={selectedProperty ? selectedProperty.id : null}
        propertyAddress={selectedProperty ? selectedProperty.address : ''}
        onClose={() => setOpenTransactions(false)}
      />
    </Box>
  );
};

export default Properties;
