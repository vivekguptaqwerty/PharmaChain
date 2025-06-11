import React, { useState } from 'react';
import { Button } from '../UI/button';
import { Input } from '../UI/input';
import { useToast } from '../../hooks/use-toast';
import axios from 'axios';

interface BasicInfoFormProps {
  data: {
    name: string;
    phone: string;
    email: string;
    password: string;
    businessName: string;
    address: string;
  };
  onNext: () => void;
  onUpdate: (data: Partial<BasicInfoFormProps['data']>) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ data, onNext, onUpdate }) => {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState<Partial<BasicInfoFormProps['data']>>({});
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Partial<BasicInfoFormProps['data']> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Valid 10-digit phone number is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.password.trim() || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      onUpdate(formData); // Update signupData in parent
      await axios.post('https://pharmachain-backend-production-6ecf.up.railway.app/api/auth/send-email-otp', {
        email: formData.email,
        type: 'signup',
      });
      toast({ title: 'Success', description: 'OTP sent to your email' });
      onNext(); // Move to next step (EmailOTPVerification in Signup.tsx)
    } catch (err: any) {
      setErrors({ email: err.response?.data?.message || 'Failed to send OTP' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 h-12 border-gray-300 rounded-lg"
          placeholder="Enter your full name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <Input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 h-12 border-gray-300 rounded-lg"
          placeholder="Enter your phone number"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email Address</label>
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 h-12 border-gray-300 rounded-lg"
          placeholder="Enter your email"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <Input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 h-12 border-gray-300 rounded-lg"
          placeholder="Create a password"
        />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Business Name</label>
        <Input
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          className="mt-1 h-12 border-gray-300 rounded-lg"
          placeholder="Enter your business name"
        />
        {errors.businessName && <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="mt-1 w-full border-gray-300 rounded-lg p-3"
          rows={3}
          placeholder="Enter your business address"
        />
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
      </div>

      <Button
        type="submit"
        className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg"
      >
        Continue
      </Button>
    </form>
  );
};

export default BasicInfoForm;