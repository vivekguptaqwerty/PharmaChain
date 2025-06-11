import { useState } from 'react';
import { Card, CardContent } from '../../components/UI/card';
import { Button } from '../../components/UI/button';
import { Badge } from '../../components/UI/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/UI/select';
import { Eye, Filter, Package, Truck, CheckCircle, Clock, X } from 'lucide-react';

export function MyOrders() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      items: 3,
      total: 450,
      status: 'delivered',
      supplier: 'MediWholesale Ltd',
      estimatedDelivery: '2024-01-18',
    },
    {
      id: 'ORD-002',
      date: '2024-01-20',
      items: 5,
      total: 780,
      status: 'in-transit',
      supplier: 'HealthDistro Inc',
      estimatedDelivery: '2024-01-25',
    },
    {
      id: 'ORD-003',
      date: '2024-01-22',
      items: 2,
      total: 290,
      status: 'pending',
      supplier: 'VitaSupply Co',
      estimatedDelivery: '2024-01-27',
    },
    {
      id: 'ORD-004',
      date: '2024-01-25',
      items: 4,
      total: 620,
      status: 'processing',
      supplier: 'SpecialtyMeds Hub',
      estimatedDelivery: '2024-01-30',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-transit':
        return <Truck className="h-4 w-4 text-blue-600" />;
      case 'processing':
        return <Package className="h-4 w-4 text-orange-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-orange-100 text-orange-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesDate = dateFilter === 'all' || 
      (dateFilter === 'recent' && new Date(order.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (dateFilter === 'month' && new Date(order.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    
    return matchesStatus && matchesDate;
  });

  const clearFilters = () => {
    setStatusFilter('all');
    setDateFilter('all');
  };

  const hasActiveFilters = statusFilter !== 'all' || dateFilter !== 'all';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600">Track and manage your medicine orders</p>
        </div>
        <Badge variant="outline" className="text-blue-600 border-blue-200">
          {filteredOrders.length} Orders
        </Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            {/* Status Filter */}
            <div className="min-w-[180px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="in-transit">In Transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Date Filter */}
            <div className="min-w-[150px]">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="recent">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearFilters}
                className="flex items-center gap-2"
              >
                <X className="h-3 w-3" />
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Order {order.id}</h3>
                  <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                  <p className="text-sm text-blue-600">from {order.supplier}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('-', ' ')}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-600">Items:</span>
                  <p className="font-medium">{order.items} products</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Total Amount:</span>
                  <p className="font-medium text-green-600">₹{order.total}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Est. Delivery:</span>
                  <p className="font-medium">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  View Details
                </Button>
                {order.status === 'in-transit' && (
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Track Order
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-4">
              {hasActiveFilters 
                ? "Try adjusting your filters to see more orders"
                : "You haven't placed any orders yet"
              }
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
