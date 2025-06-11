import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/UI/card';
import { ShoppingCart, Package, DollarSign, AlertTriangle, Clock, Eye } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/UI/table';
import { Button } from '../../components/UI/button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../../hooks/use-toast';

export function DashboardOverview() {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState({
    totalOrdersPlaced: 0,
    ordersReceived: 0,
    activeProducts: 0,
    monthlyRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get('https://pharmachain-backend-production-6ecf.up.railway.app/api/user/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMetrics({
        totalOrdersPlaced: response.data.totalOrdersPlaced,
        ordersReceived: response.data.ordersReceived,
        activeProducts: response.data.activeProducts,
        monthlyRevenue: response.data.monthlyRevenue,
      });
      setRecentOrders(response.data.recentOrders);

      // Derive notifications from data
      const lowStock = response.data.products?.filter((p: any) => p.quantity > 0 && p.quantity <= 50) || [];
      const newOrders = response.data.recentOrders?.filter((o: any) => o.status === 'Pending') || [];
      const payments = response.data.recentOrders?.filter((o: any) => o.status === 'Delivered') || [];
      setNotifications([
        ...lowStock.map((p: any) => ({
          message: `Low stock alert: ${p.name}`,
          type: 'warning',
          time: new Date().toLocaleTimeString(),
        })),
        ...newOrders.map((o: any) => ({
          message: `New order from ${o.buyerName}`,
          type: 'info',
          time: new Date(o.orderDate).toLocaleTimeString(),
        })),
        ...payments.map((o: any) => ({
          message: `Payment received for Order #${o._id}`,
          type: 'success',
          time: new Date(o.orderDate).toLocaleTimeString(),
        })),
      ]);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to fetch dashboard data.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

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

  const metricCards = [
    {
      title: 'Total Orders Placed',
      value: metrics.totalOrdersPlaced,
      icon: ShoppingCart,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Orders Received',
      value: metrics.ordersReceived,
      icon: Package,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      title: 'Active Products',
      value: metrics.activeProducts,
      icon: Package,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      title: 'Revenue',
      value: `₹${(metrics.monthlyRevenue / 100000).toFixed(1)}L`,
      icon: DollarSign,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
        <p className="text-blue-100">Manage your pharmaceutical business efficiently with PharmaChain</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((metric, index) => (
          <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
                <div className={`p-3 rounded-full ${metric.bg}`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="outline" size="sm" onClick={() => (window.location.href = '/orders')}>
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="font-medium">{order._id}</TableCell>
                    <TableCell>{order.buyerName || '-'}</TableCell>
                    <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell>{order.totalQuantity || '—'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">₹{order.totalAmount.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Recent Notifications
            </CardTitle>
            <CardDescription>Stay updated with important alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-l-4 ${
                    notification.type === 'warning'
                      ? 'border-orange-500 bg-orange-50'
                      : notification.type === 'success'
                      ? 'border-green-500 bg-green-50'
                      : 'border-blue-500 bg-blue-50'
                  }`}
                >
                  <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}