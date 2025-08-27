import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Store, User } from 'lucide-react';

interface FormData {
  // Vendor Info
  fullName: string;
  phone: string;
  email: string;
  businessType: string;
  gstin: string;
  
  // Store Info
  storeName: string;
  storeAddress: string;
  storePhone: string;
  storeType: string;
  whatsappOptIn: boolean;
  workingHours: string;
}

interface FormErrors {
  [key: string]: string;
}

const businessTypes = [
  'Grocery',
  'Pharmacy',
  'Electronics',
  'Fashion',
  'Restaurant',
  'Hardware',
  'Beauty & Wellness',
  'Automotive',
  'Education',
  'Healthcare',
  'Other'
];

const storeTypes = [
  'Local Store',
  'Chain Store',
  'Franchise'
];

const VendorRegistration = () => {
  const navigate = useNavigate();
  const { role,username,token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email:  '',
    businessType: '',
    gstin: '',
    storeName: '',
    storeAddress: '',
    storePhone: '',
    storeType: '',
    whatsappOptIn: false,
    workingHours: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    // Check if user is already registered
    checkRegistrationStatus();
  }, []);

  const checkRegistrationStatus = async () => {
    try {
      if (!token) {
        navigate('/login');
        return;
      }
  
      const response = await fetch('http://localhost:5050/api/vendor/isregistered', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.registered) {
          navigate('/vendor-dashboard');
          return;
        }
      }
      navigate('/vendor/registration')

    } catch (error) {
      console.error('Error checking registration status:', error);
    }
  };
  

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Vendor validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.businessType) {
      newErrors.businessType = 'Business type is required';
    }

    // GSTIN validation (optional but if provided, validate format)
    if (formData.gstin.trim() && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstin)) {
      newErrors.gstin = 'Invalid GSTIN format';
    }

    // Store validation
    if (!formData.storeName.trim()) {
      newErrors.storeName = 'Store name is required';
    }

    if (!formData.storeAddress.trim()) {
      newErrors.storeAddress = 'Store address is required';
    }

    if (!formData.storePhone.trim()) {
      newErrors.storePhone = 'Store phone is required';
    } else if (!/^\d{10}$/.test(formData.storePhone.replace(/\D/g, ''))) {
      newErrors.storePhone = 'Store phone must be 10 digits';
    }

    if (!formData.storeType) {
      newErrors.storeType = 'Store type is required';
    }

    if (!formData.workingHours.trim()) {
      newErrors.workingHours = 'Working hours are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);

    try {
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5050/api/vendor/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Registration successful!');
        navigate('/vendor-dashboard');
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Complete Your Vendor Profile</h1>
          <p className="text-muted-foreground mt-2">
            Set up your store details to start using BillBox
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Vendor Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Vendor Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    className={errors.fullName ? 'border-red-500' : ''}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500">{errors.fullName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="10-digit phone number"
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={formData.email}
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email is fetched from your Cognito account
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type *</Label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) => handleInputChange('businessType', value)}
                  >
                    <SelectTrigger className={errors.businessType ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.businessType && (
                    <p className="text-sm text-red-500">{errors.businessType}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gstin">GSTIN/PAN (Optional)</Label>
                  <Input
                    id="gstin"
                    value={formData.gstin}
                    onChange={(e) => handleInputChange('gstin', e.target.value)}
                    placeholder="Enter GSTIN or PAN"
                    className={errors.gstin ? 'border-red-500' : ''}
                  />
                  {errors.gstin && (
                    <p className="text-sm text-red-500">{errors.gstin}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Store Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="w-5 h-5" />
                Store Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name *</Label>
                  <Input
                    id="storeName"
                    value={formData.storeName}
                    onChange={(e) => handleInputChange('storeName', e.target.value)}
                    placeholder="Enter store name"
                    className={errors.storeName ? 'border-red-500' : ''}
                  />
                  {errors.storeName && (
                    <p className="text-sm text-red-500">{errors.storeName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storePhone">Store Phone *</Label>
                  <Input
                    id="storePhone"
                    value={formData.storePhone}
                    onChange={(e) => handleInputChange('storePhone', e.target.value)}
                    placeholder="10-digit phone number"
                    className={errors.storePhone ? 'border-red-500' : ''}
                  />
                  {errors.storePhone && (
                    <p className="text-sm text-red-500">{errors.storePhone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeType">Store Type *</Label>
                  <Select
                    value={formData.storeType}
                    onValueChange={(value) => handleInputChange('storeType', value)}
                  >
                    <SelectTrigger className={errors.storeType ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select store type" />
                    </SelectTrigger>
                    <SelectContent>
                      {storeTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.storeType && (
                    <p className="text-sm text-red-500">{errors.storeType}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workingHours">Working Hours *</Label>
                  <Input
                    id="workingHours"
                    value={formData.workingHours}
                    onChange={(e) => handleInputChange('workingHours', e.target.value)}
                    placeholder="e.g., 9:00 AM - 8:00 PM"
                    className={errors.workingHours ? 'border-red-500' : ''}
                  />
                  {errors.workingHours && (
                    <p className="text-sm text-red-500">{errors.workingHours}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeAddress">Store Address *</Label>
                <Textarea
                  id="storeAddress"
                  value={formData.storeAddress}
                  onChange={(e) => handleInputChange('storeAddress', e.target.value)}
                  placeholder="Enter complete store address"
                  rows={3}
                  className={errors.storeAddress ? 'border-red-500' : ''}
                />
                {errors.storeAddress && (
                  <p className="text-sm text-red-500">{errors.storeAddress}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="whatsappOptIn"
                  checked={formData.whatsappOptIn}
                  onCheckedChange={(checked) => handleInputChange('whatsappOptIn', checked as boolean)}
                />
                <Label htmlFor="whatsappOptIn">
                  Enable WhatsApp integration for customer communication
                </Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="min-w-[200px]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Registering...
                </>
              ) : (
                'Complete Registration'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorRegistration; 