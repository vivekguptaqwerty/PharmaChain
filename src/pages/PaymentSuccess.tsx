import { Card, CardContent } from '../components/UI/card';
import { Button } from '../components/UI/button';
import { CheckCircle, Download, Eye } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order || {};

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto pt-12">
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
              <p className="text-gray-600">Your order has been confirmed and is being processed</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Order ID</p>
                  <p className="font-semibold">{order.orderId || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Amount Paid</p>
                  <p className="font-semibold text-green-600">₹{order.totalAmount || 0}</p>
                </div>
                <div>
                  <p className="text-gray-600">Payment Method</p>
                  <p className="font-semibold">{order.paymentMethod || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Transaction ID</p>
                  <p className="font-semibold">{order.transactionId || 'N/A'}</p>
                </div>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <p className="text-gray-600">
                A confirmation email has been sent to your registered email address.
              </p>
              <p className="text-gray-600">
                Estimated delivery: <span className="font-semibold">3-5 business days</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => navigate(`/track-order/${order.orderId}`)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Eye className="h-4 w-4" />
                Track Order
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => alert('Invoice download not implemented')}
              >
                <Download className="h-4 w-4" />
                Download Invoice
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/browse-medicines')}
              >
                Continue Shopping
              </Button>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Need help? Contact our support team at <br />
                <span className="text-blue-600">support@pharmachain.com</span> or call <span className="text-blue-600">1800-123-4567</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;
