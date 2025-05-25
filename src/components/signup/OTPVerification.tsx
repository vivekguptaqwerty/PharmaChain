import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../UI/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../UI/input-otp';

interface OTPVerificationProps {
  phone: string;
  onNext: () => void;
  onBack: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ phone, onNext, onBack }) => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [error, setError] = useState('');

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

  const handleVerify = () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    
    // Simulate OTP verification
    if (otp === '123456') {
      onNext();
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleResend = () => {
    setTimeLeft(30);
    setIsResendDisabled(true);
    setOtp('');
    setError('');
    console.log('OTP resent to', phone);
  };

  return (
    <div>
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 p-0 h-auto font-normal text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Verify Phone Number</h2>
        <p className="text-gray-600">
          We've sent a 6-digit code to{' '}
          <span className="font-medium text-gray-900">{phone}</span>
        </p>
      </div>

      <div className="space-y-6">
        {/* OTP Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Enter OTP</label>
          <div className="flex justify-center">
            <InputOTP value={otp} onChange={handleOTPChange} maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        </div>

        {/* Resend Timer */}
        <div className="text-center">
          {isResendDisabled ? (
            <p className="text-sm text-gray-500">
              Resend OTP in {timeLeft} seconds
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-sm text-blue-600 hover:text-blue-500 font-medium"
            >
              Resend OTP
            </button>
          )}
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          disabled={otp.length !== 6}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 cursor-pointer shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Verify & Continue
        </Button>
      </div>

      {/* Demo Note */}
      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-600">
          <strong>Demo:</strong> Use OTP <span className="font-mono">123456</span> to continue
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;