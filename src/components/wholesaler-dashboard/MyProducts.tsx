import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/UI/card';
import { Button } from '../../components/UI/button';
import { Input } from '../../components/UI/input';
import { Badge } from '../../components/UI/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/UI/table';
import { Search, Edit, Trash2, AlertTriangle, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useToast } from '../../hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/UI/dialog';

export function MyProducts() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editForm, setEditForm] = useState({ 
    productName: '', 
    category: '', 
    price: '', 
    quantity: '', 
    minQuantity: '',
    expiryDate: '',
    batchNumber: '',
    description: '',
  });
  const limit = 10;

  const token = localStorage.getItem('userToken');

  const fetchProducts = async () => {
    try {
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

  const handleEditClick = (product: any) => {
    setEditingProduct(product);
    setEditForm({
      productName: product.productName || product.name || '',
      category: product.category || '',
      price: product.price || '',
      quantity: product.quantity || '',
      minQuantity: product.minQuantity || '',
      expiryDate: product.expiryDate ? product.expiryDate.slice(0, 10) : '',
      batchNumber: product.batchNumber || '',
      description: product.description || ''
    });
  };

  const handleEditSave = async () => {
    try {
      await axios.put(
        `https://pharmachain-backend-production-6ecf.up.railway.app/api/user/products/${editingProduct._id}`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({ title: 'Success', description: 'Product updated successfully!' });
      setEditingProduct(null);
      fetchProducts();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Update failed.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`https://pharmachain-backend-production-6ecf.up.railway.app/api/user/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: 'Success', description: 'Product deleted successfully!' });
      fetchProducts();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Delete failed.',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Out of Stock') return <Badge variant="destructive">Out of Stock</Badge>;
    if (status === 'Low Stock') return <Badge className="bg-orange-100 text-orange-800">Low Stock</Badge>;
    return <Badge className="bg-green-100 text-green-800">In Stock</Badge>;
  };

  const inStock = products.filter(p => p.quantity > 50).length;
  const lowStock = products.filter(p => p.quantity > 0 && p.quantity <= 50).length;
  const outOfStock = products.filter(p => p.quantity === 0).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => (window.location.href = '/add-product')}>
          <Package className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent><p>Total Products: <strong>{totalProducts}</strong></p></CardContent></Card>
        <Card><CardContent><p className="text-green-600">In Stock: <strong>{inStock}</strong></p></CardContent></Card>
        <Card><CardContent><p className="text-orange-600">Low Stock: <strong>{lowStock}</strong></p></CardContent></Card>
        <Card><CardContent><p className="text-red-600">Out of Stock: <strong>{outOfStock}</strong></p></CardContent></Card>
      </div>

      {/* Stock Alert */}
      {lowStock > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" /> Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {products.filter(p => p.quantity > 0 && p.quantity <= 50).map(p => (
              <div key={p._id} className="flex justify-between p-2 bg-white border border-orange-200 rounded mb-2">
                <span>{p.productName || p.name}</span>
                <Badge className="bg-orange-100 text-orange-800">{p.quantity} units</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Product Inventory</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input className="pl-10" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.productName || product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>₹{product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{new Date(product.expiryDate).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(product.status)}</TableCell>
                  <TableCell>{new Date(product.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditClick(product)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleDelete(product._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <Button variant="outline" disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <span>Page {page} of {Math.ceil(totalProducts / limit)}</span>
            <Button variant="outline" disabled={page >= Math.ceil(totalProducts / limit)} onClick={() => setPage((prev) => prev + 1)}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {editingProduct && (
        <Dialog open={true} onOpenChange={() => setEditingProduct(null)}>
          <DialogContent className="bg-white rounded-lg shadow-xl">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input 
                value={editForm.productName} 
                onChange={(e) => setEditForm({ ...editForm, productName: e.target.value })} 
                placeholder="Product Name" 
              />
              <Input 
                value={editForm.batchNumber} 
                onChange={(e) => setEditForm({ ...editForm, batchNumber: e.target.value })} 
                placeholder="Batch Number" 
              />
              <Input 
                value={editForm.category} 
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} 
                placeholder="Category" 
              />
              <Input 
                type="number" 
                value={editForm.price} 
                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} 
                placeholder="Price" 
              />
              <Input 
                type="number" 
                value={editForm.quantity} 
                onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })} 
                placeholder="Quantity" 
              />
              <Input 
                type="number" 
                value={editForm.minQuantity} 
                onChange={(e) => setEditForm({ ...editForm, minQuantity: e.target.value })} 
                placeholder="Minimum Quantity" 
              />
              <Input 
                type="date" 
                value={editForm.expiryDate} 
                onChange={(e) => setEditForm({ ...editForm, expiryDate: e.target.value })} 
              />
              <Input 
                value={editForm.description} 
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} 
                placeholder="Description" 
              />
              
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingProduct(null)}>Cancel</Button>
              <Button onClick={handleEditSave}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}