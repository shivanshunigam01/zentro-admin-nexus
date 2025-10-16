import { useState } from 'react';
import { DataTable } from '@/components/DataTable';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Salary() {
  const [salaries] = useState([
    { id: 1, employee: 'John Doe', amount: '$5,000', month: 'January 2025', status: 'Paid' },
    { id: 2, employee: 'Jane Smith', amount: '$6,500', month: 'January 2025', status: 'Paid' },
    { id: 3, employee: 'Bob Johnson', amount: '$5,500', month: 'January 2025', status: 'Pending' },
  ]);

  const columns = [
    { key: 'employee', label: 'Employee' },
    { key: 'amount', label: 'Amount' },
    { key: 'month', label: 'Month' },
    { key: 'status', label: 'Status' },
  ];

  const handleView = (id: number) => {
    console.log('View salary:', id);
  };

  const handleEdit = (id: number) => {
    console.log('Edit salary:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete salary:', id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Salary Management</h1>
          <p className="text-muted-foreground">Track and manage employee salaries</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Process Salary
        </Button>
      </div>

      <DataTable
        data={salaries}
        columns={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </motion.div>
  );
}
