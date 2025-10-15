import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/DataTable';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const UserList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [users] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'Inactive' },
    { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Editor', status: 'Active' },
  ]);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { 
      key: 'role', 
      label: 'Role',
      render: (value: string) => (
        <Badge variant="secondary">{value}</Badge>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'Active' ? 'default' : 'outline'}>
          {value}
        </Badge>
      )
    },
  ];

  const handleView = (user: any) => {
    navigate(`/users/${user.id}`);
  };

  const handleEdit = (user: any) => {
    navigate(`/users/${user.id}/edit`);
  };

  const handleDelete = (user: any) => {
    toast({
      title: 'User Deleted',
      description: `${user.name} has been removed.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Users</h1>
          <p className="text-muted-foreground mt-1">Manage user accounts and permissions</p>
        </div>
        <Button
          onClick={() => navigate('/users/new')}
          className="gradient-primary text-white shadow-elegant"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={users}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UserList;
