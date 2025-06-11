import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/UI/card';
import { Button } from '../../components/UI/button';
import { Input } from '../../components/UI/input';
import { Label } from '../../components/UI/label';
import { Badge } from '../../components/UI/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/UI/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/UI/avatar';
import { Building2, Shield, Upload, Save, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export function Profile() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    role: '',
    address: '',
    gstNumber: '',
    drugLicenseNumber: '',
    panNumber: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [documents, setDocuments] = useState({
    gstCertificate: null as File | null,
    drugLicense: null as File | null,
  });
  const [verificationStatus, setVerificationStatus] = useState({
    email: false,
    phone: false,
    kyc: false,
  });

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get('https://pharmachain-backend-production-6ecf.up.railway.app/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = response.data;
      setProfileData({
        businessName: user.businessName || '',
        contactPerson: user.contactPerson || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || '',
        address: user.address || '',
        gstNumber: user.gstNumber || '',
        drugLicenseNumber: user.drugLicenseNumber || '',
        panNumber: user.panNumber || '',
      });
      setVerificationStatus({
        email: !!user.email,
        phone: !!user.phone,
        kyc: user.status === 'approved',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to fetch profile.',
        variant: 'destructive',
      });
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Clear token
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
    });
    navigate('/login'); // Redirect to login page
  };



  useEffect(() => {
    fetchProfile();
  }, []);

  const handleInputChange = (field: keyof typeof profileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: keyof typeof passwordData, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDocumentChange = (field: keyof typeof documents, file: File | null) => {
    setDocuments((prev) => ({ ...prev, [field]: file }));
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('userToken');
      await axios.put('https://pharmachain-backend-production-6ecf.up.railway.app/api/user/profile', profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        title: 'Profile Updated',
        description: 'Your profile information has been saved successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update profile.',
        variant: 'destructive',
      });
    }
  };

  const handleSaveDocuments = async () => {
    try {
      const data = new FormData();
      if (documents.gstCertificate) data.append('gstCertificate', documents.gstCertificate);
      if (documents.drugLicense) data.append('drugLicense', documents.drugLicense);

      const token = localStorage.getItem('userToken');
      await axios.post('https://pharmachain-backend-production-6ecf.up.railway.app/api/user/documents', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        title: 'Documents Updated',
        description: 'Your documents have been uploaded successfully.',
      });
      setDocuments({ gstCertificate: null, drugLicense: null });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to upload documents.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdatePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'New passwords do not match.',
        variant: 'destructive',
      });
      return;
    }
    try {
      const token = localStorage.getItem('userToken');
      await axios.put('https://pharmachain-backend-production-6ecf.up.railway.app/api/user/password', passwordData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        title: 'Password Updated',
        description: 'Your password has been changed successfully.',
      });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update password.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Profile Management</h1>
        <div className="flex gap-x-2">
      <Button onClick={handleSaveProfile} className="bg-blue-300 hover:bg-blue-700 cursor-pointer">
        <Save className="h-4 w-4 mr-2" />
        Save Changes
      </Button>
      <Button onClick={handleLogout} variant="outline" className="text-red-600 border-red-600 hover:bg-red-300 cursor-pointer">
        Logout
      </Button>
      </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                    {profileData.businessName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{profileData.businessName}</CardTitle>
              <div className="flex justify-center">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {profileData.role}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Upload Logo
              </Button>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email Verified</span>
                  {verificationStatus.email ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Phone Verified</span>
                  {verificationStatus.phone ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>


                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">KYC Status</span>
                  {verificationStatus.kyc ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
                      Pending
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="business" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="business">Business Info</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="business" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Business Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        value={profileData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Contact Person</Label>
                      <Input
                        id="contactPerson"
                        value={profileData.contactPerson}
                        onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" value={profileData.phone} disabled />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Legal Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gstNumber">GST Number</Label>
                      <div className="flex gap-2">
                        <Input
                          id="gstNumber"
                          value={profileData.gstNumber}
                          onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                        />

                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="drugLicenseNumber">Drug License Number</Label>
                      <div className="flex gap-2">
                        <Input
                          id="drugLicenseNumber"
                          value={profileData.drugLicenseNumber}
                          onChange={(e) => handleInputChange('drugLicenseNumber', e.target.value)}
                        />

                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="panNumber">PAN Number</Label>
                    <Input
                      id="panNumber"
                      value={profileData.panNumber}
                      onChange={(e) => handleInputChange('panNumber', e.target.value)}
                    />
                  </div>
                  <div className="space-y-4 pt-4">
                    <h4 className="font-medium">Document Uploads</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Upload GST Certificate</p>
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.png"
                          onChange={(e) => handleDocumentChange('gstCertificate', e.target.files?.[0] || null)}
                          className="hidden"
                          id="gst-upload"
                        />
                        <label htmlFor="gst-upload">
                          <Button variant="outline" size="sm" className="mt-2" asChild>
                            <span>Choose File</span>
                          </Button>
                        </label>
                      </div>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Upload Drug License</p>
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.png"
                          onChange={(e) => handleDocumentChange('drugLicense', e.target.files?.[0] || null)}
                          className="hidden"
                          id="drug-upload"
                        />
                        <label htmlFor="drug-upload">
                          <Button variant="outline" size="sm" className="mt-2" asChild>
                            <span>Choose File</span>
                          </Button>
                        </label>
                      </div>
                    </div>
                    <Button onClick={handleSaveDocuments} className="bg-blue-600 hover:bg-blue-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save Documents
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                        placeholder="Enter current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                      placeholder="Confirm new password"
                    />
                  </div>
                  <Button onClick={handleUpdatePassword} className="bg-blue-600 hover:bg-blue-700">
                    Update Password
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}