

import React, { useEffect, useState, useCallback } from 'react';
import TenantTransactionsModal from './TenantTransactionsModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Pagination, MenuItem, CircularProgress
} from '@mui/material';
import { Edit, Delete, Visibility, Add, Download, ReceiptLong } from '@mui/icons-material';

const initialForm = {
  name: '',
  property_id: '',
  passport: '',
  passport_validity: '',
  aadhar_no: '',
  employment_details: '',
  permanent_address: '',
  contact_no: '',
  emergency_contact_no: '',
  rent: '',
  security: '',
  move_in_date: '',
  contract_start_date: '',
  contract_expiry_date: '',
};

const Tenants = () => {
  const [tenants, setTenants] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [detailsTenant, setDetailsTenant] = useState(null);
  const [openTxModal, setOpenTxModal] = useState(false);
  const [txTenant, setTxTenant] = useState({ id: null, name: '' });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;


  const fetchTenants = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/tenants?page=${page}&per_page=${perPage}`);
      let tenantsArr = Array.isArray(res.data) ? res.data : (res.data.tenants || []);
      setTenants(tenantsArr);
      setTotalPages(res.data.pages || 1);
    } catch (e) {
      toast.error('Failed to fetch tenants');
    }
    setLoading(false);
  }, [page]);

  const fetchProperties = useCallback(async () => {
    try {
      const res = await axios.get(`/api/properties?page=1&per_page=1000`);
      setProperties(res.data.properties || res.data || []);
    } catch (e) {
      toast.error('Failed to fetch properties');
    }
  }, []);

  useEffect(() => {
    fetchTenants();
    fetchProperties();
  }, [fetchTenants, fetchProperties]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (tenant) => {
    setForm({ ...tenant,
      passport_validity: tenant.passport_validity ? tenant.passport_validity.slice(0, 10) : '',
      move_in_date: tenant.move_in_date ? tenant.move_in_date.slice(0, 10) : '',
      contract_start_date: tenant.contract_start_date ? tenant.contract_start_date.slice(0, 10) : '',
      contract_expiry_date: tenant.contract_expiry_date ? tenant.contract_expiry_date.slice(0, 10) : '',
    });
    setEditingId(tenant.id);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this tenant?')) return;
    try {
      await axios.delete(`/api/tenants/${id}`);
      toast.success('Tenant deleted');
      fetchTenants();
    } catch (e) {
      toast.error('Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/tenants/${editingId}`, form);
        toast.success('Tenant updated');
      } else {
        await axios.post('/api/tenants', form);
        toast.success('Tenant added');
      }
      setForm(initialForm);
      setEditingId(null);
      setOpenForm(false);
      fetchTenants();
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
      [
        'ID', 'Name', 'Property', 'Passport', 'Passport Validity', 'Aadhar No', 'Employment', 'Permanent Address', 'Contact', 'Emergency Contact', 'Rent', 'Security', 'Move In', 'Contract Start', 'Contract Expiry'
      ],
      ...tenants.map(t => [
        t.id, t.name, t.property_address, t.passport, t.passport_validity, t.aadhar_no, t.employment_details, t.permanent_address, t.contact_no, t.emergency_contact_no, t.rent, t.security, t.move_in_date, t.contract_start_date, t.contract_expiry_date
      ])
    ];
    const csvContent = csvRows.map(r => r.map(x => '"' + (x || '') + '"').join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tenants.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShowDetails = (tenant) => {
    setDetailsTenant(tenant);
    setOpenDetails(true);
  };

  const filteredTenants = tenants.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    (t.property_address && t.property_address.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Tenants</Typography>
        <Box>
          <Button variant="contained" color="success" startIcon={<Download />} onClick={handleExportCSV} sx={{ mr: 1 }}>Export CSV</Button>
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAdd}>Add Tenant</Button>
        </Box>
      </Box>
      <TextField
        label="Search by name or property"
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
                <TableCell sx={{ backgroundColor: '#f1f1f1', color: '#374151', fontWeight: 600, fontSize: '1rem' }}>Name</TableCell>
                <TableCell sx={{ backgroundColor: '#f1f1f1', color: '#374151', fontWeight: 600, fontSize: '1rem' }}>Property</TableCell>
                <TableCell sx={{ backgroundColor: '#f1f1f1', color: '#374151', fontWeight: 600, fontSize: '1rem' }}>Contact No</TableCell>
                <TableCell sx={{ backgroundColor: '#f1f1f1', color: '#374151', fontWeight: 600, fontSize: '1rem' }}>Rent</TableCell>
                <TableCell sx={{ backgroundColor: '#f1f1f1', color: '#374151', fontWeight: 600, fontSize: '1rem' }}>Contract Expiry Date</TableCell>
                <TableCell sx={{ backgroundColor: '#f1f1f1', color: '#374151', fontWeight: 600, fontSize: '1rem' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTenants.map(tenant => (
                <TableRow key={tenant.id}>
                  <TableCell>{tenant.id}</TableCell>
                  <TableCell>
                    <span>{tenant.name}</span>
                  </TableCell>
                  <TableCell>{tenant.property_address}</TableCell>
                  <TableCell>{tenant.contact_no}</TableCell>
                  <TableCell>{tenant.rent}</TableCell>
                  <TableCell>
                    {(() => {
                      if (tenant.contract_expiry_date) {
                        const expiry = new Date(tenant.contract_expiry_date);
                        const now = new Date();
                        const twoMonthsFromNow = new Date();
                        twoMonthsFromNow.setMonth(now.getMonth() + 2);
                        if (expiry > now && expiry < twoMonthsFromNow) {
                          return <span style={{ color: 'red', fontWeight: 'bold' }}>{tenant.contract_expiry_date}</span>;
                        }
                      }
                      return tenant.contract_expiry_date;
                    })()}
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleShowDetails(tenant)} size="small" title="Details" sx={{ mr: 0.5 }}><Visibility /></IconButton>
                    <IconButton color="info" onClick={() => { setTxTenant({ id: tenant.id, name: tenant.name }); setOpenTxModal(true); }} size="small" title="Transactions" sx={{ mr: 1 }}>
                      <ReceiptLong />
                    </IconButton>
                    <IconButton color="info" onClick={() => handleEdit(tenant)} size="small"><Edit /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(tenant.id)} size="small"><Delete /></IconButton>
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
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingId ? 'Edit Tenant' : 'Add Tenant'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
            <TextField name="name" label="Name" value={form.name} onChange={handleChange} required fullWidth />
            <TextField
              select
              name="property_id"
              label="Property"
              value={form.property_id || ''}
              onChange={handleChange}
              required
              fullWidth
            >
              <MenuItem value="">Select Property</MenuItem>
              {properties.map(p => (
                <MenuItem key={p.id} value={p.id}>{p.address}</MenuItem>
              ))}
            </TextField>
            <TextField name="passport" label="Passport" value={form.passport} onChange={handleChange} fullWidth />
            <TextField name="passport_validity" label="Passport Validity" type="date" value={form.passport_validity} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
            <TextField name="aadhar_no" label="Aadhar No" value={form.aadhar_no} onChange={handleChange} fullWidth />
            <TextField name="employment_details" label="Employment Details" value={form.employment_details} onChange={handleChange} fullWidth />
            <TextField name="permanent_address" label="Permanent Address" value={form.permanent_address} onChange={handleChange} fullWidth />
            <TextField name="contact_no" label="Contact No" value={form.contact_no} onChange={handleChange} fullWidth />
            <TextField name="emergency_contact_no" label="Emergency Contact No" value={form.emergency_contact_no} onChange={handleChange} fullWidth />
            <TextField name="rent" label="Rent" type="number" value={form.rent} onChange={handleChange} fullWidth />
            <TextField name="security" label="Security" type="number" value={form.security} onChange={handleChange} fullWidth />
            <TextField name="move_in_date" label="Move In Date" type="date" value={form.move_in_date} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
            <TextField name="contract_start_date" label="Contract Start Date" type="date" value={form.contract_start_date} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
            <TextField name="contract_expiry_date" label="Contract Expiry Date" type="date" value={form.contract_expiry_date} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenForm(false)} color="secondary">Cancel</Button>
            <Button type="submit" variant="contained" color="primary">{editingId ? 'Update' : 'Add'} Tenant</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="md" fullWidth>
        <DialogTitle>Tenant Details</DialogTitle>
        <DialogContent>
          {detailsTenant && (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              {Object.entries(detailsTenant).map(([k, v]) => (
                <Typography key={k}><b>{k.replace(/_/g, ' ')}:</b> {v?.toString()}</Typography>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetails(false)} color="secondary">Close</Button>
        </DialogActions>
      </Dialog>
      <TenantTransactionsModal
        tenantId={txTenant.id}
        tenantName={txTenant.name}
        open={openTxModal}
        onClose={() => setOpenTxModal(false)}
      />
    </Box>
  );
};

export default Tenants;
