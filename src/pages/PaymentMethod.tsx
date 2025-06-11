import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/UI/card';
import { Button } from '../components/UI/button';
import { Input } from '../components/UI/input';
import { Label } from '../components/UI/label';
import { ArrowLeft, CreditCard, Wallet, Building, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentMethod = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const subtotal = cartItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0);
    setTotal(Math.round(subtotal * 1.18)); // Include 18% GST
  }, []);

  const handlePayment = async () => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo') || '{}');

    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.post(
        'https://pharmachain-backend-production-6ecf.up.railway.app/api/user/orders',
        { shippingInfo, cartItems },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { razorpayOrder } = response.data;

      const options = {
        key: razorpayOrder.key,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        order_id: razorpayOrder.id,
        name: 'PharmaChain',
        description: 'Order Payment',
        handler: async (response: any) => {
          try {
            const verifyResponse = await axios.post(
              'https://pharmachain-backend-production-6ecf.up.railway.app/api/user/orders/verify',
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                cartItems: response,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            localStorage.removeItem('cart');
            localStorage.removeItem('shippingInfo');
            navigate('/payment-success', { state: verifyResponse.data });
          } catch (error) {
            console.error('Payment verification failed:', error);
            navigate('/payment-error');
          }
        },
        prefill: {
          email: 'user@example.com',
          contact: shippingInfo.phone || '',
        },
        theme: { color: '#0066cc' },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Order creation failed:', error);
      navigate('/error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/place-order')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Payment Method</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">PharmaChain Payment</h2>
                  <p className="text-blue-100">Secure payment powered by Razorpay</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">₹{total}</p>
                  <p className="text-blue-100">Total Amount</p>
                </div>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Select Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedMethod('card')}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">Credit/Debit Card</h3>
                      <p className="text-sm text-gray-600">Visa, Mastercard, RuPay accepted</p>
                    </div>
                  </div>
                </div>
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedMethod === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedMethod('upi')}
                >
                  <div className="flex items-center gap-3">
                    <Wallet className="h-6 w-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold">UPI</h3>
                      <p className="text-sm text-gray-600">Pay using Google Pay, PhonePe, Paytm</p>
                    </div>
                  </div>
                </div>
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedMethod === 'netbanking' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedMethod('netbanking')}
                >
                  <div className="flex items-center gap-3">
                    <Building className="h-6 w-6 text-purple-600" />
                    <div>
                      <h3 className="font-semibold">Net Banking</h3>
                      <p className="text-sm text-gray-600">All major banks supported</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {selectedMethod === 'card' && (
              <Card>
                <CardHeader>
                  <CardTitle>Card Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails((prev) => ({ ...prev, number: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails((prev) => ({ ...prev, expiry: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails((prev) => ({ ...prev, cvv: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      placeholder="Name on card"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
            {selectedMethod === 'upi' && (
              <Card>
                <CardHeader>
                  <CardTitle>UPI Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input id="upiId" placeholder="yourname@paytm" />
                  </div>
                </CardContent>
              </Card>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
              <Shield className="h-4 w-4 text-green-600" />
              <span>Your payment information is secured with 256-bit SSL encryption</span>
            </div>
          </div>
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{Math.round(total / 1.18)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹{Math.round(total - total / 1.18)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                  onClick={handlePayment}
                >
                  Pay ₹{total}
                </Button>
                <div className="text-center">
                  <img
                    src="https://razorpay.com/assets/razorpay-logo.svg"
                    alt="Powered by Razorpay"
                    className="h-6 mx-auto opacity-60"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;