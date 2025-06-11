import React, { useState } from 'react';
  import { Eye, EyeOff, Phone, Lock, Mail } from 'lucide-react';
  import { Button } from '../components/UI/button';
  import { Input } from '../components/UI/input';
  import { Label } from '../components/UI/label';
  import { Link as RouterLink, useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import { useToast } from '../hooks/use-toast';

  const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLoginSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError('');

      try {
        console.log('Login request payload:', { phone: phoneNumber, password }); // Debug log
        const response = await axios.post('https://pharmachain-backend-production-6ecf.up.railway.app/api/auth/login', {
          phone: phoneNumber,
          password,
        });

        setIsLoading(false);
        localStorage.setItem('userToken', response.data.token);

        const role = response.data.user.role;
        switch (role) {
          case 'manufacturer':
            navigate('/manufacturer');
            break;
          case 'wholesaler':
            navigate('/wholesaler');
            break;
          case 'distributor':
            navigate('/distributor');
            break;
          case 'retailer':
            navigate('/retailer');
            break;
          default:
            setError('Invalid role assigned. Contact support.');
        }
      } catch (err: any) {
        setIsLoading(false);
        setError(err.response?.data?.message || 'Login failed. Please try again.');
      }
    };

    const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError('');

      try {
        await axios.post('https://pharmachain-backend-production-6ecf.up.railway.app/api/auth/request-password-reset', { email });
        toast({ title: 'Success', description: 'OTP sent to your email' });
        navigate('/verify-email-otp', { state: { email, type: 'password_reset' } });
      } catch (err: any) {
        setIsLoading(false);
        setError(err.response?.data?.message || 'Failed to send OTP');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-xl">PC</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">PharmaChain</h1>
            <p className="text-gray-600">Secure pharmaceutical supply chain</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {isForgotPassword ? 'Reset Password' : 'Welcome back'}
              </h2>
              <p className="text-gray-600">
                {isForgotPassword ? 'Enter your email to reset your password' : 'Sign in to your account to continue'}
              </p>
            </div>

            {error && <p className="text-sm text-red-600 mb-4 text-center">{error}</p>}

            {!isForgotPassword ? (
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(true)}
                    className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending OTP...
                      </div>
                    ) : (
                      'Send OTP'
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setIsForgotPassword(false)}
                    className="flex-1 h-12 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            {!isForgotPassword && (
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Not registered yet?{' '}
                  <RouterLink to="/signup" className="text-blue-600 hover:text-blue-500 font-medium">
                    Sign up
                  </RouterLink>
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>© 2025 PharmaChain. All rights reserved.</p>
          </div>
        </div>
      </div>
    );
  };

  export default Login;