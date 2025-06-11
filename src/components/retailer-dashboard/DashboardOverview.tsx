import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/UI/card';
import { TrendingUp, ShoppingCart, Package, DollarSign, AlertTriangle, Clock, Star } from 'lucide-react';

export function DashboardOverview() {
  const metrics = [
    { title: 'Total Orders', value: '23', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Orders This Month', value: '8', icon: Package, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Total Spent', value: '₹45,670', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Pending Orders', value: '3', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const recentOrders = [
    { id: 'ORD-001', supplier: 'MediWholesale Ltd', amount: '₹2,450', status: 'delivered', date: '2 days ago' },
    { id: 'ORD-002', supplier: 'HealthDistro Inc', amount: '₹3,780', status: 'in-transit', date: '3 days ago' },
    { id: 'ORD-003', supplier: 'VitaSupply Co', amount: '₹1,290', status: 'processing', date: '5 days ago' },
  ];

  const topSuppliers = [
    { name: 'MediWholesale Ltd', orders: 8, rating: 4.8 },
    { name: 'HealthDistro Inc', orders: 5, rating: 4.6 },
    { name: 'VitaSupply Co', orders: 4, rating: 4.7 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'in-transit':
        return 'text-blue-600 bg-blue-100';
      case 'processing':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back to PharmaChain!</h1>
        <p className="text-blue-100">Discover quality medicines from trusted suppliers across India</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
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
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              Recent Orders
            </CardTitle>
            <CardDescription>Your latest medicine purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.supplier}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{order.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Suppliers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-orange-600" />
              Top Suppliers
            </CardTitle>
            <CardDescription>Your most trusted medicine suppliers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSuppliers.map((supplier) => (
                <div key={supplier.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{supplier.name}</p>
                    <p className="text-sm text-gray-600">{supplier.orders} orders placed</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{supplier.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Quick Actions
          </CardTitle>
          <CardDescription>Get started with your medicine procurement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <ShoppingCart className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900 mb-1">Browse Medicines</h3>
              <p className="text-sm text-gray-600">Find quality medicines from verified suppliers</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <Package className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900 mb-1">Track Orders</h3>
              <p className="text-sm text-gray-600">Monitor your order status and delivery</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg text-center">
              <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900 mb-1">Reorder Fast</h3>
              <p className="text-sm text-gray-600">Quickly reorder your frequently purchased items</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
