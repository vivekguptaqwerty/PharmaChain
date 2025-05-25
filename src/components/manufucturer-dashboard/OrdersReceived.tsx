import { useState } from 'react';
import { Eye, Download, Filter, Check, X, Truck } from 'lucide-react';
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

const mockOrders = [
  {
    id: 'ORD-001',
    buyer: 'HealthPlus Pharmacy',
    contact: 'Dr. Ramesh Kumar',
    orderDate: '2024-01-15',
    quantity: '500 Units',
    products: ['Paracetamol 500mg', 'Amoxicillin 250mg'],
    status: 'Pending',
    totalAmount: 15000,
  },
  {
    id: 'ORD-002',
    buyer: 'MediCare Distributors',
    contact: 'Ms. Priya Sharma',
    orderDate: '2024-01-14',
    quantity: '1200 Units',
    products: ['Insulin Injection', 'Cough Syrup'],
    status: 'Approved',
    totalAmount: 36000,
  },
  {
    id: 'ORD-003',
    buyer: 'City Medical Store',
    contact: 'Mr. Anil Patel',
    orderDate: '2024-01-13',
    quantity: '300 Units',
    products: ['Antiseptic Cream'],
    status: 'Shipped',
    totalAmount: 9000,
  },
  {
    id: 'ORD-004',
    buyer: 'Regional Pharma Hub',
    contact: 'Dr. Sunita Verma',
    orderDate: '2024-01-12',
    quantity: '800 Units',
    products: ['Paracetamol 500mg', 'Antiseptic Cream'],
    status: 'Delivered',
    totalAmount: 24000,
  },
  {
    id: 'ORD-005',
    buyer: 'Metro Drug Store',
    contact: 'Mr. Rajesh Singh',
    orderDate: '2024-01-11',
    quantity: '150 Units',
    products: ['Cough Syrup'],
    status: 'Pending',
    totalAmount: 4500,
  },
];

export function OrdersReceived() {
  const [statusFilter, setStatusFilter] = useState('');

  const filteredOrders = mockOrders.filter(order => {
    return !statusFilter || order.status === statusFilter;
  });

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

  const getActionButtons = (status: string) => {
    switch (status) {
      case 'Pending':
        return (
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
              <Check className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
              <X className="w-4 h-4" />
            </Button>
          </div>
        );
      case 'Approved':
        return (
          <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
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

      {/* Filters */}
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

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
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
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.buyer}</div>
                      <div className="text-sm text-gray-500">{order.contact}</div>
                    </div>
                  </TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {order.products.map((product, index) => (
                        <div key={index}>{product}</div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">₹{order.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    {getActionButtons(order.status)}
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
