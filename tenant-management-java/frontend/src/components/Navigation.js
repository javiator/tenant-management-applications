
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Button color={isActive('/') ? 'secondary' : 'inherit'} component={Link} to="/" sx={{ fontWeight: isActive('/') ? 700 : 400 }}>Dashboard</Button>
          <Button color={isActive('/tenants') ? 'secondary' : 'inherit'} component={Link} to="/tenants" sx={{ fontWeight: isActive('/tenants') ? 700 : 400 }}>Tenants</Button>
          <Button color={isActive('/properties') ? 'secondary' : 'inherit'} component={Link} to="/properties" sx={{ fontWeight: isActive('/properties') ? 700 : 400 }}>Properties</Button>
          <Button color={isActive('/transactions') ? 'secondary' : 'inherit'} component={Link} to="/transactions" sx={{ fontWeight: isActive('/transactions') ? 700 : 400 }}>Transactions</Button>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, ml: 2 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Property Management
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
