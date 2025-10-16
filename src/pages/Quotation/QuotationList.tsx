import { useState } from 'react';
import { DataTable } from '@/components/DataTable';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function QuotationList() {
  const [quotations] = useState([
    { id: 1, number: 'QT-001', customer: 'John Doe', amount: '$5,000', status: 'Pending', date: '2025-01-15' },
    { id: 2, number: 'QT-002', customer: 'Jane Smith', amount: '$8,500', status: 'Approved', date: '2025-01-14' },
    { id: 3, number: 'QT-003', customer: 'Bob Johnson', amount: '$3,200', status: 'Rejected', date: '2025-01-13' },
  ]);

  const columns = [
    { key: 'number', label: 'Quotation #' },
    { key: 'customer', label: 'Customer' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
    { key: 'date', label: 'Date' },
  ];

  const handleView = (id: number) => {
    console.log('View quotation:', id);
  };

  const handleEdit = (id: number) => {
    console.log('Edit quotation:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete quotation:', id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quotations</h1>
          <p className="text-muted-foreground">Manage customer quotations</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Quotation
        </Button>
      </div>

      <DataTable
        data={quotations}
        columns={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </motion.div>
  );
}
