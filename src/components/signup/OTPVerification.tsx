import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../UI/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../UI/input-otp';
import { auth, RecaptchaVerifier } from '../../firebaseConfig';
import { signInWithPhoneNumber } from 'firebase/auth';

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
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  // Setup Firebase Recaptcha + send OTP
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'invisible',
          callback: () => {},
        }
      );
    }

    const sendOTP = async () => {
      try {
        const appVerifier = window.recaptchaVerifier;
        const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
        setConfirmationResult(confirmation);
        console.log('OTP sent');
      } catch (err) {
        console.error('OTP error', err);
      }
    };

    sendOTP();
  }, [phone]);

  // Timer countdown for resend
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
    if (otp.length !== 6 || !confirmationResult) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      const firebaseUserCredential = await confirmationResult.confirm(otp);
      const idToken = await firebaseUserCredential.user.getIdToken();

      // Store firebase user globally (optional for later use)
      window.firebaseUser = firebaseUserCredential.user;

      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken, phone }),
      });

      const result = await response.json();
      if (response.ok) {
        onNext();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('OTP verification failed');
      console.error('OTP verification error:', err);
    }
  };

  const handleResend = () => {
    setTimeLeft(30);
    setIsResendDisabled(true);
    setOtp('');
    setError('');
    console.log('Resending OTP not yet implemented.');
    // You can call sendOTP() here again if needed
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
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 cursor-pointer shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Verify & Continue
        </Button>
      </div>

      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-600">
          <strong>Demo:</strong> Use OTP <span className="font-mono">123456</span> to continue
        </p>
      </div>

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default OTPVerification;
