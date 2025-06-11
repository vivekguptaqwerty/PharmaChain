import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/UI/card';
import { Button } from '../../components/UI/button';
import { Input } from '../../components/UI/input';
import { Badge } from '../../components/UI/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/UI/table';
import { Search, Edit, Trash2, AlertTriangle, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useToast } from '../../hooks/use-toast';

export function MyProducts() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get(
        `https://pharmachain-backend-production-6ecf.up.railway.app/api/user/products?search=${encodeURIComponent(searchTerm)}&page=${page}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(response.data.products);
      setTotalProducts(response.data.total);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to fetch products.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, page]);

  const getStatusBadge = (status: string) => {
    if (status === 'Out of Stock') {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (status === 'Low Stock') {
      return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Low Stock</Badge>;
    } else {
      return <Badge variant="secondary" className="bg-green-100 text-green-800">In Stock</Badge>;
    }
  };

  const inStockProducts = products.filter((p) => p.quantity > 50).length;
  const lowStockProducts = products.filter((p) => p.quantity > 0 && p.quantity <= 50).length;
  const outOfStockProducts = products.filter((p) => p.quantity === 0).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => (window.location.href = '/add-product')}>
          <Package className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold">{totalProducts}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Stock</p>
                <p className="text-2xl font-bold text-green-600">{inStockProducts}</p>
              </div>
              <Package className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-orange-600">{lowStockProducts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{outOfStockProducts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {lowStockProducts > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {products
                .filter((p) => p.quantity > 0 && p.quantity <= 50)
                .map((product) => (
                  <div
                    key={product._id}
                    className="flex justify-between items-center p-2 bg-white rounded border border-orange-200"
                  >
                    <span className="font-medium">{product.name}</span>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      {product.quantity} units remaining
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Product Inventory</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price (₹)</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>₹{product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span
                      className={`font-medium ${
                        product.quantity === 0
                          ? 'text-red-600'
                          : product.quantity <= 50
                          ? 'text-orange-600'
                          : 'text-green-600'
                      }`}
                    >
                      {product.quantity}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(product.expiryDate).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(product.status)}</TableCell>
                  <TableCell>{new Date(product.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <span>
              Page {page} of {Math.ceil(totalProducts / limit)}
            </span>
            <Button
              variant="outline"
              disabled={page >= Math.ceil(totalProducts / limit)}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}