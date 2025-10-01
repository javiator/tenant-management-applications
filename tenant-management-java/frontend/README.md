# Tenant Management Frontend

React-based web application for tenant management system with modern UI components and responsive design.

## Technology Stack

- **React 18** with functional components and hooks
- **Axios** for HTTP API communication
- **Tailwind CSS** for styling and responsive design
- **React Router** for client-side routing
- **Nginx** for production serving
- **Docker** for containerization

## Project Structure

```
frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/             # React Components
│   │   ├── Dashboard.js        # Main dashboard
│   │   ├── Navigation.js       # Navigation bar
│   │   ├── Properties.js       # Property management
│   │   ├── Tenants.js          # Tenant management
│   │   ├── Transactions.js     # Transaction management
│   │   ├── TenantDetailsModal.js
│   │   ├── TenantTransactionsModal.js
│   │   └── PropertyTransactionsModal.js
│   ├── App.js                  # Main App component
│   ├── App.css                 # Global styles
│   ├── index.js                # React entry point
│   └── index.css               # Base styles
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind configuration
├── Dockerfile                  # Container configuration
├── nginx.conf                  # Nginx configuration
└── README.md                   # This file
```

## Quick Start

### Development Mode

```bash
# Install dependencies
npm install

# Start development server
npm start

# Access application
# http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Serve with static server (optional)
npx serve -s build
```

### Docker Development

```bash
# Build and run with Docker
docker build -t tenant-management-frontend .
docker run -p 3000:3000 tenant-management-frontend
```

## Features

### Property Management
- **List Properties**: View all properties with details
- **Add Property**: Create new property records
- **Edit Property**: Update property information
- **Delete Property**: Remove property records

### Tenant Management
- **List Tenants**: View all tenants with property associations
- **Add Tenant**: Create new tenant records with property assignment
- **Edit Tenant**: Update tenant information and contracts
- **Delete Tenant**: Remove tenant records
- **Tenant Details**: View detailed tenant information
- **Transaction History**: View tenant-specific transactions

### Transaction Management
- **List Transactions**: View all financial transactions
- **Add Transaction**: Record rent payments and other transactions
- **Edit Transaction**: Update transaction details
- **Delete Transaction**: Remove transaction records
- **Filter by Property/Tenant**: Filter transactions by property or tenant

### Dashboard
- **Overview**: Summary of properties, tenants, and transactions
- **Quick Actions**: Fast access to common operations
- **Statistics**: Key metrics and counts

## API Integration

### Backend Communication
The frontend communicates with the Spring Boot backend via REST API:

```javascript
// API Base URL (configurable)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Example API calls
axios.get(`${API_BASE_URL}/api/properties`)
axios.post(`${API_BASE_URL}/api/tenants`, tenantData)
axios.put(`${API_BASE_URL}/api/tenants/${id}`, updateData)
```

### API Endpoints Used
- `GET /api/properties` - Fetch all properties
- `POST /api/properties` - Create property
- `PUT /api/properties/{id}` - Update property
- `DELETE /api/properties/{id}` - Delete property
- `GET /api/tenants` - Fetch all tenants
- `POST /api/tenants` - Create tenant
- `PUT /api/tenants/{id}` - Update tenant
- `DELETE /api/tenants/{id}` - Delete tenant
- `GET /api/transactions` - Fetch all transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/{id}` - Update transaction
- `DELETE /api/transactions/{id}` - Delete transaction

## Component Architecture

### Main Components

#### Dashboard.js
- Central dashboard with overview statistics
- Quick action buttons for common operations
- Recent activity summary

#### Navigation.js
- Top navigation bar with menu items
- Responsive mobile navigation
- Active route highlighting

#### Properties.js
- Property listing with search and filter
- Property creation and editing forms
- Property deletion with confirmation

#### Tenants.js
- Tenant listing with property associations
- Tenant creation and editing forms
- Tenant deletion with confirmation
- Modal dialogs for detailed views

#### Transactions.js
- Transaction listing with filtering
- Transaction creation and editing forms
- Transaction deletion with confirmation

### Modal Components

#### TenantDetailsModal.js
- Detailed tenant information display
- Edit tenant functionality
- Contract and payment history

#### TenantTransactionsModal.js
- Tenant-specific transaction history
- Add new transactions for tenant
- Transaction filtering and search

#### PropertyTransactionsModal.js
- Property-specific transaction history
- Property financial summary
- Transaction management for property

## Styling & UI

### Tailwind CSS
The application uses Tailwind CSS for styling:

```javascript
// Example Tailwind classes used
<div className="bg-white shadow-lg rounded-lg p-6">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">
    Property Management
  </h2>
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Add Property
  </button>
</div>
```

### Responsive Design
- **Mobile-first**: Optimized for mobile devices
- **Tablet**: Enhanced layout for tablet screens
- **Desktop**: Full-featured desktop experience
- **Breakpoints**: sm, md, lg, xl responsive breakpoints

### UI Components
- **Forms**: Consistent form styling with validation
- **Buttons**: Primary, secondary, and danger button styles
- **Modals**: Overlay dialogs for detailed views
- **Tables**: Responsive data tables with sorting
- **Cards**: Information cards with consistent styling

## Configuration

### Environment Variables
```bash
# Backend API URL
REACT_APP_API_URL=http://localhost:8080

# Development mode
NODE_ENV=development
```

### Package.json Scripts
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

## Application Logs

### Development Mode Logs

#### Direct npm Execution
```bash
# View logs in terminal
npm start

# Enable verbose logging
npm start -- --verbose

# Enable debug logging
DEBUG=* npm start

# Enable React logging
REACT_APP_DEBUG=true npm start
```

#### Log Output Locations
- **Console**: Direct terminal output when running `npm start`
- **Browser Console**: F12 → Console tab in browser
- **Network Tab**: F12 → Network tab for API calls
- **React DevTools**: Browser extension for component debugging

### Docker Logs

#### Docker Compose Logs
```bash
# View all service logs
docker-compose logs

# View frontend logs only
docker-compose logs frontend

# Follow logs in real-time
docker-compose logs -f frontend

# View logs with timestamps
docker-compose logs -t frontend

# View recent logs (last 50 lines)
docker-compose logs --tail=50 frontend

# View logs from specific time
docker-compose logs --since="2024-01-01T00:00:00" frontend
```

#### Individual Container Logs
```bash
# View frontend container logs
docker logs tenant-management-frontend

# Follow logs in real-time
docker logs -f tenant-management-frontend

# View logs with timestamps
docker logs -t tenant-management-frontend
```

### Browser Logs

#### Browser Console
- **Chrome/Edge**: F12 → Console tab
- **Firefox**: F12 → Console tab
- **Safari**: Cmd+Option+I → Console tab

#### React DevTools
- **Install**: Browser extension for React debugging
- **Component Tree**: View component hierarchy
- **Props/State**: Inspect component data
- **Profiler**: Performance analysis

#### Network Logs
- **API Calls**: Monitor HTTP requests/responses
- **CORS Issues**: Check for cross-origin errors
- **Loading Times**: Analyze request performance

### Log Levels and Configuration

#### Available Log Levels
- **Error**: JavaScript errors and exceptions
- **Warn**: Warning messages and deprecations
- **Info**: Informational messages
- **Debug**: Debug-level messages
- **Trace**: Detailed trace information

#### Console Logging
```javascript
// Different log levels
console.error('Error message');
console.warn('Warning message');
console.info('Info message');
console.log('General message');
console.debug('Debug message');
```

#### React Logging Configuration
```javascript
// Enable React logging
if (process.env.NODE_ENV === 'development') {
  console.log('Development mode logging enabled');
}

// API logging
const logApiCall = (method, url, data) => {
  console.log(`API ${method}: ${url}`, data);
};
```

### Log Monitoring

#### Browser DevTools
- **Console**: JavaScript errors and logs
- **Network**: API request/response logs
- **Performance**: Rendering and timing logs
- **Application**: Local storage and session data

#### Nginx Logs (Production)
```bash
# View Nginx access logs
docker exec tenant-management-frontend cat /var/log/nginx/access.log

# View Nginx error logs
docker exec tenant-management-frontend cat /var/log/nginx/error.log

# Follow Nginx logs
docker exec tenant-management-frontend tail -f /var/log/nginx/access.log
```

### Troubleshooting with Logs

#### Common Log Patterns
```bash
# Check for JavaScript errors
docker-compose logs frontend | grep -i "error\|exception"

# Check for API connection issues
docker-compose logs frontend | grep -i "api\|axios\|fetch"

# Check for build issues
docker-compose logs frontend | grep -i "build\|webpack"

# Check for CORS issues
docker-compose logs frontend | grep -i "cors\|origin"
```

#### Log Analysis Commands
```bash
# Filter logs by level
docker-compose logs frontend | grep -i "ERROR\|WARN"

# Search for specific patterns
docker-compose logs frontend | grep -i "tenant\|property\|transaction"

# View logs from specific time range
docker-compose logs --since="1h" frontend
docker-compose logs --until="2024-01-01T12:00:00" frontend
```

### Production Logging

#### Docker Compose with Log Rotation
```yaml
# Add to docker-compose.yml
services:
  frontend:
    # ... existing config
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

#### Log Aggregation
```bash
# Export logs to file
docker-compose logs frontend > frontend.log

# Compress old logs
gzip frontend.log

# View compressed logs
zcat frontend.log.gz | grep ERROR
```

## Docker Deployment

### Development
```bash
# Build development image
docker build -t tenant-frontend-dev .

# Run with volume mounting
docker run -p 3000:3000 -v $(pwd)/src:/app/src tenant-frontend-dev
```

### Production
```bash
# Build production image
docker build -t tenant-frontend-prod .

# Run production container
docker run -p 3000:3000 tenant-frontend-prod
```

### Docker Compose Integration
```yaml
# Full stack deployment
docker-compose up frontend backend postgres
```

## Development

### Prerequisites
- Node.js 16+ 
- npm 8+
- Docker (optional)

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

### Code Quality
```bash
# Check for issues
npm audit

# Update dependencies
npm update

# Clean install
rm -rf node_modules package-lock.json
npm install
```

## State Management

### Component State
- **Local State**: useState for component-specific data
- **Form State**: Controlled components with state management
- **Modal State**: Boolean flags for modal visibility

### Data Flow
1. **API Calls**: Axios for HTTP requests
2. **State Updates**: setState for local state changes
3. **Re-rendering**: React's automatic re-rendering
4. **Error Handling**: Try-catch blocks with user feedback

## Error Handling

### API Errors
```javascript
try {
  const response = await axios.post('/api/tenants', formData);
  // Handle success
} catch (error) {
  console.error('API Error:', error);
  // Show user-friendly error message
}
```

### Form Validation
- **Required Fields**: Client-side validation
- **Data Types**: Number/date coercion
- **Error Messages**: User-friendly error display

## Performance

### Optimization Techniques
- **Code Splitting**: Lazy loading of components
- **Memoization**: React.memo for expensive components
- **Bundle Analysis**: Webpack bundle analyzer
- **Image Optimization**: Optimized images and icons

### Best Practices
- **Component Reusability**: Shared components
- **Props Validation**: PropTypes for type checking
- **Clean Code**: Readable and maintainable code
- **Performance Monitoring**: React DevTools Profiler

## Troubleshooting

### Common Issues

1. **API Connection Failed**: Check backend is running
2. **CORS Errors**: Verify backend CORS configuration
3. **Build Failures**: Check Node.js version compatibility
4. **Styling Issues**: Verify Tailwind CSS configuration

### Debug Mode
```bash
# Enable React DevTools
npm start

# Check console for errors
# Use React DevTools browser extension
```

### Development Tools
- **React DevTools**: Browser extension for debugging
- **Redux DevTools**: State management debugging
- **Network Tab**: API request/response inspection

## Contributing

1. Follow React best practices
2. Use functional components with hooks
3. Maintain consistent code style
4. Add proper error handling
5. Test with different screen sizes
6. Ensure accessibility compliance

## License

This project is licensed under the MIT License.
