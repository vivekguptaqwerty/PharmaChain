import { useState } from 'react';
import { Search, Edit, Trash2, Plus, Image, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../UI/card';
import { Button } from '../UI/button';
import { Input } from '../UI/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../UI/table';

const mockProducts = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    category: 'Tablets',
    price: 2.50,
    quantity: 1200,
    expiryDate: '2025-12-15',
    status: 'Active',
    image: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Amoxicillin 250mg',
    category: 'Capsule',
    price: 8.75,
    quantity: 800,
    expiryDate: '2025-08-20',
    status: 'Active',
    image: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Cough Syrup',
    category: 'Syrup',
    price: 45.00,
    quantity: 0,
    expiryDate: '2024-06-30',
    status: 'Out of Stock',
    image: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Insulin Injection',
    category: 'Injection',
    price: 120.00,
    quantity: 150,
    expiryDate: '2025-03-10',
    status: 'Active',
    image: '/placeholder.svg'
  },
  {
    id: 5,
    name: 'Antiseptic Cream',
    category: 'Ointment',
    price: 25.00,
    quantity: 300,
    expiryDate: '2026-01-15',
    status: 'Active',
    image: '/placeholder.svg'
  }
];

export function MyProduct() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-600 bg-green-100';
      case 'Out of Stock':
        return 'text-red-600 bg-red-100';
      case 'Expiring Soon':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (mockProducts.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">My Products</h1>
            <p className="text-gray-600">Manage your pharmaceutical inventory</p>
          </div>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Package className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Yet</h3>
            <p className="text-gray-500 mb-6 text-center">Start building your inventory by adding your first pharmaceutical product</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Products</h1>
          <p className="text-gray-600">Manage your pharmaceutical inventory</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Product
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                aria-label="Filter by category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Tablets">Tablets</option>
                <option value="Syrup">Syrup</option>
                <option value="Injection">Injection</option>
                <option value="Capsule">Capsule</option>
                <option value="Ointment">Ointment</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price (₹)</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Image className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>₹{product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.expiryDate}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
