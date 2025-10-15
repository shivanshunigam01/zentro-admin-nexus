# Zentroverse Admin Panel

A comprehensive, full-featured admin dashboard built with React, TypeScript, Tailwind CSS, and shadcn/ui components. Features a beautiful dark-mode design matching the Zentroverse brand identity.

## 🎨 Design System

- **Primary Color**: `#0f172a` (Deep Navy)
- **Accent Color**: `#4f46e5` (Zentroverse Purple)
- **Secondary**: `#facc15` (Gold/Yellow)
- **Font**: Inter & Poppins
- **Theme**: Dark-mode friendly, clean minimalist design

## ✨ Features

### Core Functionality
- ✅ Authentication (Login/Logout)
- ✅ Responsive sidebar navigation (collapsible on mobile)
- ✅ Dashboard with KPI cards and activity feed
- ✅ CRUD operations for multiple models
- ✅ Data tables with search, filter, and pagination
- ✅ Modal forms for creating/editing records
- ✅ Toast notifications for user feedback
- ✅ Beautiful animations with Framer Motion

### Pages Included
1. **Login** - Secure authentication page
2. **Dashboard** - Overview with stats and recent activity
3. **Users** - Manage user accounts
4. **Products** - Product inventory management
5. **Leads** - Lead tracking and management
6. **Blogs** - Content management
7. **Categories** - Category organization
8. **Contacts** - Contact management
9. **Settings** - User preferences and account settings

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone <repo-url>

# Navigate to project directory
cd zentroverse-admin

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://api.zentroverse.com/api
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Sidebar.tsx     # Navigation sidebar
│   ├── Topbar.tsx      # Top navigation bar
│   ├── DataTable.tsx   # Reusable data table
│   ├── ModalForm.tsx   # Modal form component
│   └── StatCard.tsx    # Statistics card component
├── pages/              # Page components
│   ├── Login.tsx       # Authentication page
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Settings.tsx    # Settings page
│   └── Users/          # User management pages
│       └── UserList.tsx
├── layouts/            # Layout components
│   └── DashboardLayout.tsx
├── services/           # API services
│   └── api.ts         # Axios configuration & API calls
├── hooks/              # Custom React hooks
│   └── useFetch.ts    # Data fetching hook
└── lib/               # Utility functions
    └── utils.ts
```

## 🔧 Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Component library
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Hook Form** - Form management
- **Zod** - Schema validation

## 🎯 Key Components

### DataTable
Reusable table component with search, filtering, and CRUD actions:
```tsx
<DataTable
  columns={columns}
  data={data}
  onView={handleView}
  onEdit={handleEdit}
  onDelete={handleDelete}
  searchable={true}
/>
```

### API Service
Centralized API configuration with interceptors:
```tsx
import { crudService } from '@/services/api';

// Get all records
const users = await crudService.getAll('users');

// Create record
await crudService.create('users', payload);

// Update record
await crudService.update('users', id, payload);

// Delete record
await crudService.delete('users', id);
```

## 📱 Responsive Design

- Mobile-first approach
- Collapsible sidebar on mobile (hamburger menu)
- Responsive grid layouts
- Touch-friendly UI elements
- Optimized for 360px+ viewports

## 🔐 Authentication

The app uses token-based authentication with localStorage. Protected routes automatically redirect to login if the user is not authenticated.

To bypass authentication for testing, you can temporarily set a token:
```javascript
localStorage.setItem('auth_token', 'demo-token');
```

## 🎨 Design System Usage

All colors and styles are managed through CSS variables in `src/index.css`:

```tsx
// Use semantic color classes
<Button className="gradient-primary text-white shadow-elegant">
  Click Me
</Button>

// Available utility classes:
.gradient-primary    // Purple gradient
.gradient-secondary  // Gold gradient  
.gradient-dark       // Dark gradient
.shadow-elegant      // Elevated shadow with color
.shadow-soft         // Subtle shadow
.transition-smooth   // Smooth transitions
```

## 🚧 Development Notes

### Adding New Models

1. Create a new page in `src/pages/ModelName/`
2. Add route in `src/App.tsx`
3. Add navigation item in `src/components/Sidebar.tsx`
4. Use DataTable component for list views

### API Integration

The API service is configured in `src/services/api.ts`. Update the base URL in `.env` to point to your backend.

## 📝 License

© 2025 Zentroverse. All rights reserved.
