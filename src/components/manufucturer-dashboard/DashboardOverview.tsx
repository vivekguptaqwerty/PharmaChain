import { Package, ShoppingCart, AlertTriangle, TrendingUp, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../UI/card';
import { Button } from '../UI/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../UI/table';

const statsData = [
  {
    title: 'Total Products',
    value: '156',
    icon: Package,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    title: 'Active Orders',
    value: '23',
    icon: ShoppingCart,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    title: 'Out of Stock',
    value: '8',
    icon: AlertTriangle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    title: 'Monthly Revenue',
    value: '₹2.4L',
    icon: TrendingUp,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
];

const recentOrders = [
  {
    id: 'ORD-001',
    buyer: 'HealthPlus Pharmacy',
    date: '2024-01-15',
    quantity: '500 Units',
    status: 'Pending',
    amount: '₹15,000',
  },
  {
    id: 'ORD-002',
    buyer: 'MediCare Distributors',
    date: '2024-01-14',
    quantity: '1200 Units',
    status: 'Approved',
    amount: '₹36,000',
  },
  {
    id: 'ORD-003',
    buyer: 'City Medical Store',
    date: '2024-01-13',
    quantity: '300 Units',
    status: 'Shipped',
    amount: '₹9,000',
  },
  {
    id: 'ORD-004',
    buyer: 'Regional Pharma Hub',
    date: '2024-01-12',
    quantity: '800 Units',
    status: 'Delivered',
    amount: '₹24,000',
  },
  {
    id: 'ORD-005',
    buyer: 'Metro Drug Store',
    date: '2024-01-11',
    quantity: '150 Units',
    status: 'Pending',
    amount: '₹4,500',
  },
];

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
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, MedLife Pharmaceuticals!</h1>
        <p className="text-blue-100">Manage your pharmaceutical supply chain efficiently</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="outline" size="sm">
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
                <TableHead>Date</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.buyer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{order.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">New order received from HealthPlus Pharmacy</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Low stock alert: Paracetamol 500mg running low</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Order ORD-002 has been successfully delivered</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}