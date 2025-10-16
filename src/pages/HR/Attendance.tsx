import { useState } from 'react';
import { DataTable } from '@/components/DataTable';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Attendance() {
  const [attendance] = useState([
    { id: 1, employee: 'John Doe', date: '2025-01-15', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present' },
    { id: 2, employee: 'Jane Smith', date: '2025-01-15', checkIn: '08:45 AM', checkOut: '05:45 PM', status: 'Present' },
    { id: 3, employee: 'Bob Johnson', date: '2025-01-15', checkIn: '-', checkOut: '-', status: 'Absent' },
  ]);

  const columns = [
    { key: 'employee', label: 'Employee' },
    { key: 'date', label: 'Date' },
    { key: 'checkIn', label: 'Check In' },
    { key: 'checkOut', label: 'Check Out' },
    { key: 'status', label: 'Status' },
  ];

  const handleView = (id: number) => {
    console.log('View attendance:', id);
  };

  const handleEdit = (id: number) => {
    console.log('Edit attendance:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete attendance:', id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance</h1>
          <p className="text-muted-foreground">Monitor employee attendance records</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Mark Attendance
        </Button>
      </div>

      <DataTable
        data={attendance}
        columns={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </motion.div>
  );
}
