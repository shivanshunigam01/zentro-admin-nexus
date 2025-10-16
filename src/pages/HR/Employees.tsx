import { useState } from 'react';
import { DataTable } from '@/components/DataTable';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Employees() {
  const [employees] = useState([
    { id: 1, name: 'John Doe', position: 'Software Engineer', department: 'Engineering', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', position: 'Product Manager', department: 'Product', email: 'jane@example.com', status: 'Active' },
    { id: 3, name: 'Bob Johnson', position: 'HR Manager', department: 'Human Resources', email: 'bob@example.com', status: 'Active' },
  ]);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'position', label: 'Position' },
    { key: 'department', label: 'Department' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status' },
  ];

  const handleView = (id: number) => {
    console.log('View employee:', id);
  };

  const handleEdit = (id: number) => {
    console.log('Edit employee:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete employee:', id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employees</h1>
          <p className="text-muted-foreground">Manage employee records</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <DataTable
        data={employees}
        columns={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </motion.div>
  );
}
