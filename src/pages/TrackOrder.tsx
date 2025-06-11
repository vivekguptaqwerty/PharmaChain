import { Card, CardContent, CardHeader, CardTitle } from '../components/UI/card';
import { Button } from '../components/UI/button';
import { Badge } from '../components/UI/badge';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const TrackOrder = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const orderDetails = {
    id: orderId || 'ORD-001',
    status: 'Shipped',
    estimatedDelivery: '2024-01-20',
    items: [
      { name: 'Paracetamol 500mg', quantity: 2, price: 45 },
      { name: 'Amoxicillin 250mg', quantity: 1, price: 120 },
    ],
    total: 269,
    shippingAddress: '123 Medical Street, Healthcare City, State - 123456',
  };

  const trackingSteps = [
    {
      status: 'Ordered',
      timestamp: '2024-01-15 10:30 AM',
      description: 'Order placed successfully',
      completed: true,
      icon: CheckCircle,
    },
    {
      status: 'Confirmed',
      timestamp: '2024-01-15 02:15 PM',
      description: 'Order confirmed by seller',
      completed: true,
      icon: CheckCircle,
    },
    {
      status: 'Packed',
      timestamp: '2024-01-16 11:45 AM',
      description: 'Order packed and ready for dispatch',
      completed: true,
      icon: Package,
    },
    {
      status: 'Shipped',
      timestamp: '2024-01-17 09:20 AM',
      description: 'Order dispatched from warehouse',
      completed: true,
      current: true,
      icon: Truck,
    },
    {
      status: 'Out for Delivery',
      timestamp: '',
      description: 'Order out for delivery',
      completed: false,
      icon: Truck,
    },
    {
      status: 'Delivered',
      timestamp: '',
      description: 'Order delivered successfully',
      completed: false,
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Track Order</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Order {orderDetails.id}</CardTitle>
                  <Badge className="bg-blue-100 text-blue-800">
                    {orderDetails.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Estimated delivery: {orderDetails.estimatedDelivery}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>Delivering to your address</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tracking Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingSteps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed 
                            ? 'bg-green-100 text-green-600' 
                            : step.current 
                              ? 'bg-blue-100 text-blue-600 animate-pulse'
                              : 'bg-gray-100 text-gray-400'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className={`font-medium ${
                              step.completed || step.current ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {step.status}
                            </h3>
                            {step.timestamp && (
                              <span className="text-sm text-gray-500">{step.timestamp}</span>
                            )}
                          </div>
                          <p className={`text-sm ${
                            step.completed || step.current ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{orderDetails.shippingAddress}</p>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-sm">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
                
                <hr />
                
                <div className="flex justify-between font-semibold">
                  <span>Total Paid</span>
                  <span>₹{orderDetails.total}</span>
                </div>
                
                <div className="space-y-2 pt-4">
                  <Button variant="outline" className="w-full">
                    Download Invoice
                  </Button>
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
