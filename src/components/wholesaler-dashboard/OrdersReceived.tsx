import { useState, useEffect } from 'react';
import { Eye, Download, Filter, Check, X, Truck, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/UI/card';
import { Button } from '../../components/UI/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/UI/table';
import axios from 'axios';
import { useToast } from '../../hooks/use-toast';

export function OrdersReceived() {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get(
        `https://pharmachain-backend-production-6ecf.up.railway.app/api/user/orders?status=${statusFilter}&page=${page}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(response.data.orders);
      setTotalOrders(response.data.total);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to fetch orders.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, page]);

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const token = localStorage.getItem('userToken');
      await axios.put(
        `https://pharmachain-backend-production-6ecf.up.railway.app/api/user/orders/${orderId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({
        title: 'Success',
        description: `Order ${orderId} updated to ${status}.`,
      });
      fetchOrders();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update order.',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'text-orange-600 bg-orange-100';
      case 'Approved':
        return 'text-blue-600 bg-blue-100';
      case 'Shipped':
        return 'text-purple-600 bg-purple-100';
      case 'Delivered':
        return 'text-green-600 bg-green-100';
      case 'Rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getActionButtons = (order: any) => {
    switch (order.status) {
      case 'Pending':
        return (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="text-green-600 hover:text-green-700"
              onClick={() => updateOrderStatus(order._id, 'Approved')}
            >
              <Check className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700"
              onClick={() => updateOrderStatus(order._id, 'Rejected')}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        );
      case 'Approved':
        return (
          <Button
            variant="ghost"
            size="sm"
            className="text-purple-600 hover:text-purple-700"
            onClick={() => updateOrderStatus(order._id, 'Shipped')}
          >
            <Truck className="w-4 h-4" />
          </Button>
        );
      default:
        return (
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Orders Received</h1>
          <p className="text-gray-600">Manage incoming orders from wholesalers and distributors</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              aria-label="Filter orders by status"
              className="flex h-10 w-48 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Orders</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Orders ({totalOrders})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Buyer Details</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">{order._id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.buyer}</div>
                      <div className="text-sm text-gray-500">{order.contact}</div>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {order.products.map((product: any, index: number) => (
                        <div key={index}>{product.name}</div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{order.totalQuantity}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">₹{order.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>{getActionButtons(order)}</TableCell>
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
              Page {page} of {Math.ceil(totalOrders / limit)}
            </span>
            <Button
              variant="outline"
              disabled={page >= Math.ceil(totalOrders / limit)}
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