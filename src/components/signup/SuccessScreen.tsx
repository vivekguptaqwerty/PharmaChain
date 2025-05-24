import { CheckCircle, Clock, Mail, Phone } from 'lucide-react';
import { Button } from '../button';

const SuccessScreen = () => {
  return (
    <div className="text-center">
      <div className="mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Application Submitted!</h2>
        <p className="text-gray-600">
          Thank you for joining PharmaConnect. Your application is now under review.
        </p>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-center mb-4">
          <Clock className="h-8 w-8 text-blue-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Awaiting Verification by Admin</h3>
        <p className="text-sm text-gray-600 mb-4">
          Our admin team will review your documents and verify your account within 2-3 business days.
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="h-4 w-4 mr-2 text-blue-500" />
            You'll receive an email confirmation once approved
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-2 text-blue-500" />
            We may contact you if additional information is needed
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={() => window.location.href = '/'}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 cursor-pointer"
        >
          Back to Login
        </Button>
        
        <button className="w-full text-sm text-gray-600 hover:text-gray-800">
          Need help? Contact support
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">What happens next?</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Admin reviews your application and documents</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Account activation email sent upon approval</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Start using PharmaConnect platform</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
