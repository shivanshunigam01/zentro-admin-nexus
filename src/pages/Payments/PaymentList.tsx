import { useState } from 'react';
import { DataTable } from '@/components/DataTable';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function PaymentList() {
  const [payments] = useState([
    { id: 1, invoice: 'INV-001', customer: 'John Doe', amount: '$5,000', status: 'Paid', date: '2025-01-15' },
    { id: 2, invoice: 'INV-002', customer: 'Jane Smith', amount: '$8,500', status: 'Pending', date: '2025-01-14' },
    { id: 3, invoice: 'INV-003', customer: 'Bob Johnson', amount: '$3,200', status: 'Overdue', date: '2025-01-10' },
  ]);

  const columns = [
    { key: 'invoice', label: 'Invoice #' },
    { key: 'customer', label: 'Customer' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
    { key: 'date', label: 'Date' },
  ];

  const handleView = (id: number) => {
    console.log('View payment:', id);
  };

  const handleEdit = (id: number) => {
    console.log('Edit payment:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete payment:', id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground">Track and manage payments</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Record Payment
        </Button>
      </div>

      <DataTable
        data={payments}
        columns={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </motion.div>
  );
}
