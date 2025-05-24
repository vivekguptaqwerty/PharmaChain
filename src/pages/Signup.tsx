import { useState } from 'react';
import BasicInfoForm from '../components/signup/BasicInfoForm';
import OTPVerification from '../components/signup/OTPVerification';
import RoleSelection from '../components/signup/RoleSelection';
import DocumentUpload from '../components/signup/DocumentUpload';
import SuccessScreen from '../components/signup/SuccessScreen';

export interface SignupData {
  name: string;
  phone: string;
  email: string;
  password: string;
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
    name: '',
    phone: '',
    email: '',
    password: '',
    role: '',
    documents: {}
  });

  const totalSteps = 5;

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const updateSignupData = (data: Partial<SignupData>) => {
    setSignupData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoForm
            data={signupData}
            onNext={handleNext}
            onUpdate={updateSignupData}
          />
        );
      case 2:
        return (
          <OTPVerification
            phone={signupData.phone}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <RoleSelection
            selectedRole={signupData.role}
            onNext={handleNext}
            onBack={handleBack}
            onUpdate={updateSignupData}
          />
        );
      case 4:
        return (
          <DocumentUpload
            documents={signupData.documents}
            onNext={handleNext}
            onBack={handleBack}
            onUpdate={updateSignupData}
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
        {/* Logo/Branding */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-xl">PC</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PharmaChain</h1>
          <p className="text-gray-600">Join our pharmaceutical network</p>
        </div>

        {/* Progress Bar */}
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

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 PharmaChain. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;