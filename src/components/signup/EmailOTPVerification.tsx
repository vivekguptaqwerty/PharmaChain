import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../UI/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../UI/input-otp';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '../../hooks/use-toast';

interface EmailOTPVerificationProps {
  email?: string;
  type?: 'signup' | 'password_reset';
  formData?: any;
  onBack?: () => void;
  onSuccess?: (userId: string) => void;
}

const EmailOTPVerification: React.FC<EmailOTPVerificationProps> = ({ email: propEmail, type: propType, formData, onBack, onSuccess }) => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();

  const { email: stateEmail, type: stateType } = location.state || {};
  const email = propEmail || stateEmail;
  const type = propType || stateType;

  useEffect(() => {
    if (!email || !type) {
      navigate(type === 'signup' ? '/signup' : '/login');
    }
  }, [email, type, navigate]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [timeLeft]);

  const handleOTPChange = (value: string) => {
    setOtp(value);
    setError('');
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      if (type === 'signup') {
        if (!formData || !formData.name || !formData.phone || !formData.email || !formData.password || !formData.businessName || !formData.address) {
          setError('Missing required signup information. Please go back and complete the form.');
          return;
        }

        console.log('Sending registration request with data:', { ...formData, otp }); // Debug log
        const response = await axios.post('https://pharmachain-backend-production-6ecf.up.railway.app/api/auth/register', {
          ...formData,
          otp,
        });
        console.log('Registration response:', response.data); // Debug log
        toast({ title: 'Success', description: 'Account created successfully' });
        if (onSuccess) {
          console.log('Calling onSuccess with userId:', response.data.userId); // Debug log
          onSuccess(response.data.userId);
        } else {
          console.log('onSuccess callback not provided'); // Debug log
        }
      } else if (type === 'password_reset') {
        await axios.post('https://pharmachain-backend-production-6ecf.up.railway.app/api/auth/verify-email-otp', { email, otp, type });
        toast({ title: 'Success', description: 'OTP verified' });
        navigate('/reset-password', { state: { email } });
      }
    } catch (err: any) {
      console.error('OTP verification error:', err.response?.data || err.message); // Debug log
      setError(err.response?.data?.message || 'OTP verification failed');
    }
  };

  const handleResend = async () => {
    setTimeLeft(30);
    setIsResendDisabled(true);
    setOtp('');
    setError('');

    try {
      await axios.post('https://pharmachain-backend-production-6ecf.up.railway.app/api/auth/send-email-otp', { email, type });
      toast({ title: 'Success', description: 'OTP resent to your email' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    }
  };

  if (!email || !type) {
    return null;
  }

  return (
    <div>
      <div className="mb-6">
        {onBack && (
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 p-0 h-auto font-normal text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Verify Email</h2>
        <p className="text-gray-600">
          We've sent a 6-digit code to{' '}
          <span className="font-medium text-gray-900">{email}</span>
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Enter OTP</label>
          <div className="flex justify-center">
            <InputOTP value={otp} onChange={handleOTPChange} maxLength={6}>
              <InputOTPGroup>
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        </div>

        <div className="text-center">
          {isResendDisabled ? (
            <p className="text-sm text-gray-500">Resend OTP in {timeLeft} seconds</p>
          ) : (
            <button
              onClick={handleResend}
              className="text-sm text-blue-600 hover:text-blue-500 font-medium"
            >
              Resend OTP
            </button>
          )}
        </div>

        <Button
          onClick={handleVerify}
          disabled={otp.length !== 6}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg"
        >
          Verify & Continue
        </Button>
      </div>

      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-600">
          <strong>Demo:</strong> Use OTP <span className="font-mono">123456</span> to continue
        </p>
      </div>
    </div>
  );
};

export default EmailOTPVerification;