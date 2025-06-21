import { useState } from 'react';
import BasicInfoForm from '../components/signup/BasicInfoForm';
import EmailOTPVerification from '../components/signup/EmailOTPVerification';
import RoleSelection from '../components/signup/RoleSelection';
import DocumentUpload from '../components/signup/DocumentUpload';
import SuccessScreen from '../components/signup/SuccessScreen';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

export interface SignupData {
  id: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  businessName: string;
  address: string;
  role: string;
  documents: {
    aadhaar?: File;
    pan?: File;
    gst?: File;
    drugLicense?: File;
  };
}

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState<SignupData>({
    id: '',
    name: '',
    phone: '',
    email: '',
    password: '',
    businessName: '',
    address: '',
    role: '',
    documents: {},
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const totalSteps = 5;

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const updateSignupData = (data: Partial<SignupData>) => {
    setSignupData((prev) => ({ ...prev, ...data }));
  };

  const handleVerificationSuccess = (userId: string) => {
    updateSignupData({ id: userId });
    handleNext();
  };

  const renderStep = () => {
    if (loading) return <Loader />;

    switch (currentStep) {
      case 1:
        return (
          <BasicInfoForm
            data={signupData}
            onNext={handleNext}
            onUpdate={updateSignupData}
            setLoading={setLoading}
          />
        );
      case 2:
        if (!signupData.email || !signupData.name || !signupData.phone || !signupData.password || !signupData.businessName || !signupData.address) {
          navigate('/signup');
          return null;
        }
        return (
          <EmailOTPVerification
            email={signupData.email}
            type="signup"
            formData={signupData}
            onBack={handleBack}
            onSuccess={handleVerificationSuccess}
            setLoading={setLoading}
          />
        );
      case 3:
        return (
          <RoleSelection
            id={signupData.id}
            selectedRole={signupData.role}
            onNext={handleNext}
            onBack={handleBack}
            onUpdate={updateSignupData}
            setLoading={setLoading}
          />
        );
      case 4:
        return (
          <DocumentUpload
            id={signupData.id}
            documents={signupData.documents}
            onNext={handleNext}
            onBack={handleBack}
            onUpdate={updateSignupData}
            setLoading={setLoading}
          />
        );
      case 5:
        return <SuccessScreen />;
      default:
        return null;
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
          <p className="text-gray-600">Join our pharmaceutical network</p>
        </div>

        {currentStep < 5 && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Step {currentStep} of {totalSteps - 1}</span>
              <span>{Math.round((currentStep / (totalSteps - 1)) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-8">{renderStep()}</div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 PharmaChain. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
