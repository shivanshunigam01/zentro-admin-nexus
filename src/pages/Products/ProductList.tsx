import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/DataTable';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const ProductList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [products] = useState([
    { id: '1', name: 'Product A', category: 'Electronics', price: '$299', stock: 45, status: 'In Stock' },
    { id: '2', name: 'Product B', category: 'Clothing', price: '$49', stock: 120, status: 'In Stock' },
    { id: '3', name: 'Product C', category: 'Electronics', price: '$599', stock: 0, status: 'Out of Stock' },
    { id: '4', name: 'Product D', category: 'Home', price: '$149', stock: 23, status: 'Low Stock' },
  ]);

  const columns = [
    { key: 'name', label: 'Product Name' },
    { 
      key: 'category', 
      label: 'Category',
      render: (value: string) => (
        <Badge variant="outline">{value}</Badge>
      )
    },
    { key: 'price', label: 'Price' },
    { key: 'stock', label: 'Stock' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <Badge 
          variant={
            value === 'In Stock' ? 'default' : 
            value === 'Low Stock' ? 'secondary' : 
            'destructive'
          }
        >
          {value}
        </Badge>
      )
    },
  ];

  const handleView = (product: any) => {
    navigate(`/products/${product.id}`);
  };

  const handleEdit = (product: any) => {
    navigate(`/products/${product.id}/edit`);
  };

  const handleDelete = (product: any) => {
    toast({
      title: 'Product Deleted',
      description: `${product.name} has been removed.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your product inventory</p>
        </div>
        <Button
          onClick={() => navigate('/products/new')}
          className="gradient-primary text-white shadow-elegant"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={products}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ProductList;
