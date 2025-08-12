import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          Property Management
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/" className={isActive('/')}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/tenants" className={isActive('/tenants')}>
              Tenants
            </Link>
          </li>
          <li>
            <Link to="/properties" className={isActive('/properties')}>
              Properties
            </Link>
          </li>
          <li>
            <Link to="/transactions" className={isActive('/transactions')}>
              Transactions
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
