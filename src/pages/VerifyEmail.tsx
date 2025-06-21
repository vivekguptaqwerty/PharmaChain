import { useNavigate, useLocation } from 'react-router-dom';
import EmailOTPVerification from '../components/signup/EmailOTPVerification';
import { useState } from 'react';
import Loader from './Loader';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, type } = location.state || {};
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="loader-wrapper" style={{ display: loading ? 'flex' : 'none' }}>
      <Loader />
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
          <EmailOTPVerification
            email={email}
            type={type}
            onBack={handleBack}
            setLoading={setLoading}
            
          />
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 PharmaChain. All rights reserved.</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default VerifyEmail;