import React, { useState } from 'react';
import { ArrowLeft, Upload, CheckCircle, X } from 'lucide-react';
import { Button } from '../button';
import type { SignupData } from '../../pages/signup';

interface DocumentUploadProps {
  documents: SignupData['documents'];
  onNext: () => void;
  onBack: () => void;
  onUpdate: (data: Partial<SignupData>) => void;
}

const documentTypes = [
  { id: 'aadhaar', label: 'Aadhaar Card', required: true },
  { id: 'pan', label: 'PAN Card', required: true },
  { id: 'gst', label: 'GST Certificate', required: true },
  { id: 'drugLicense', label: 'Drug License', required: true }
];

const DocumentUpload: React.FC<DocumentUploadProps> = ({ documents, onNext, onBack, onUpdate }) => {
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, File>>(documents);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileUpload = (docType: string, file: File | null) => {
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          [docType]: 'Please upload a PDF or JPG file'
        }));
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          [docType]: 'File size should be less than 5MB'
        }));
        return;
      }

      setUploadedDocs(prev => ({ ...prev, [docType]: file }));
      setErrors(prev => ({ ...prev, [docType]: '' }));
    }
  };

  const removeFile = (docType: string) => {
    setUploadedDocs(prev => {
      const updated = { ...prev };
      delete updated[docType];
      return updated;
    });
  };

  const handleContinue = () => {
    const newErrors: Record<string, string> = {};
    
    documentTypes.forEach(doc => {
      if (doc.required && !uploadedDocs[doc.id]) {
        newErrors[doc.id] = `${doc.label} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onUpdate({ documents: uploadedDocs });
    onNext();
  };

  const FileUploadBox = ({ docType, label, required }: { docType: string; label: string; required: boolean }) => {
    const file = uploadedDocs[docType];
    const error = errors[docType];

    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        {!file ? (
          <div className="relative">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(docType, e.target.files?.[0] || null)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title={`Upload ${label}`}
              placeholder={`Upload ${label}`}
            />
            <div className={`
              border-2 border-dashed rounded-lg p-6 text-center transition-colors
              ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
            `}>
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PDF, JPG up to 5MB
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFile(docType)}
              className="text-gray-400 hover:text-red-500"
              title={`Remove ${label}`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
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
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Upload Documents</h2>
        <p className="text-gray-600">Please upload the required documents for verification</p>
      </div>

      <div className="space-y-6 mb-6">
        {documentTypes.map(doc => (
          <FileUploadBox
            key={doc.id}
            docType={doc.id}
            label={doc.label}
            required={doc.required}
          />
        ))}
      </div>

      <Button
        onClick={handleContinue}
        className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 cursor-pointer shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit Application
      </Button>

      <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
        <p className="text-xs text-yellow-800">
          <strong>Note:</strong> All documents will be reviewed by our admin team for verification.
        </p>
      </div>
    </div>
  );
};

export default DocumentUpload;