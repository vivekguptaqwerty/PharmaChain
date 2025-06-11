import { Card, CardContent, CardHeader, CardTitle } from '../../components/UI/card';
import { Button } from '../../components/UI/button';
import { Badge } from '../../components/UI/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/UI/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/UI/table';
import { Eye, Download, CheckCircle, X, Truck, Filter } from 'lucide-react';

export function Orders() {
  const ordersPlaced = [
    {
      id: 'ORD-001',
      seller: 'ABC Pharma Ltd',
      items: 'Paracetamol 500mg, Amoxicillin 250mg',
      date: '2024-01-15',
      amount: 2450,
      status: 'Shipped',
    },
    {
      id: 'ORD-002',
      seller: 'MediCore Labs',
      items: 'Vitamin D3 Capsules',
      date: '2024-01-14',
      amount: 890,
      status: 'Delivered',
    },
    {
      id: 'ORD-003',
      seller: 'Health Plus',
      items: 'Metformin 500mg',
      date: '2024-01-13',
      amount: 1340,
      status: 'Processing',
    },
  ];

  const ordersReceived = [
    {
      id: 'ORD-R001',
      buyer: 'Apollo Pharmacy',
      products: 'Paracetamol 500mg',
      quantity: 100,
      date: '2024-01-15',
      amount: 4500,
      paymentStatus: 'Paid',
      status: 'Pending',
    },
    {
      id: 'ORD-R002',
      buyer: 'MedPlus',
      products: 'Vitamin C Tablets',
      quantity: 50,
      date: '2024-01-14',
      amount: 2250,
      paymentStatus: 'Pending',
      status: 'Accepted',
    },
  ];

  type StatusKey = 'Delivered' | 'Shipped' | 'Processing' | 'Pending' | 'Accepted' | 'Paid';
  const getStatusBadge = (status: string) => {
    const statusConfig: Record<StatusKey, { color: string; text: string }> = {
      Delivered: { color: 'bg-green-100 text-green-800', text: status },
      Shipped: { color: 'bg-blue-100 text-blue-800', text: status },
      Processing: { color: 'bg-yellow-100 text-yellow-800', text: status },
      Pending: { color: 'bg-orange-100 text-orange-800', text: status },
      Accepted: { color: 'bg-green-100 text-green-800', text: status },
      Paid: { color: 'bg-green-100 text-green-800', text: status },
    };
    
    const config = statusConfig[status as StatusKey] || { color: 'bg-gray-100 text-gray-800', text: status };
    return <Badge variant="secondary" className={config.color}>{config.text}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter Orders
        </Button>
      </div>

      <Tabs defaultValue="placed" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="placed">Orders Placed ({ordersPlaced.length})</TabsTrigger>
          <TabsTrigger value="received">Orders Received ({ordersReceived.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="placed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Orders You Placed</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordersPlaced.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.seller}</TableCell>
                      <TableCell className="max-w-xs truncate" title={order.items}>
                        {order.items}
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell className="font-semibold">₹{order.amount}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Truck className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Order Tracking Section */}
          <Card>
            <CardHeader>
              <CardTitle>Track Order Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Order #ORD-001</span>
                    <span className="text-sm text-gray-600">Estimated delivery: Jan 18, 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="ml-2 text-sm">Ordered</span>
                      </div>
                      <div className="w-8 h-px bg-green-500"></div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="ml-2 text-sm">Approved</span>
                      </div>
                      <div className="w-8 h-px bg-green-500"></div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="ml-2 text-sm font-medium">Shipped</span>
                      </div>
                      <div className="w-8 h-px bg-gray-300"></div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <span className="ml-2 text-sm text-gray-500">Delivered</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="received" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Orders from Retailers</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Buyer (Retailer)</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordersReceived.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.buyer}</TableCell>
                      <TableCell>{order.products}</TableCell>
                      <TableCell>{order.quantity} units</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell className="font-semibold">₹{order.amount}</TableCell>
                      <TableCell>{getStatusBadge(order.paymentStatus)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Truck className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
