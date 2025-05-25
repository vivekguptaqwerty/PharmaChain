import React, { useState } from 'react';
import { Upload, Save, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../UI/card';
import { Button } from '../UI/button';
import { Input } from '../UI/input';
import { Label } from '../UI/label';
import { Textarea } from '../UI/textarea';

export function AddProduct() {
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    price: '',
    quantity: '',
    batchNumber: '',
    expiryDate: '',
    description: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Product data:', formData);
    // Handle form submission
  };

  const handleReset = () => {
    setFormData({
      productName: '',
      category: '',
      price: '',
      quantity: '',
      batchNumber: '',
      expiryDate: '',
      description: '',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Add New Product</h1>
        <p className="text-gray-600">Add a new pharmaceutical product to your inventory</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Product Details */}
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name *</Label>
                <Input
                  id="productName"
                  placeholder="e.g., Paracetamol 500mg"
                  value={formData.productName}
                  onChange={(e) => handleInputChange('productName', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  aria-label="Category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  <option value="tablets">Tablets</option>
                  <option value="syrup">Syrup</option>
                  <option value="injection">Injection</option>
                  <option value="capsule">Capsule</option>
                  <option value="ointment">Ointment</option>
                  <option value="drops">Drops</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price per Unit (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity in Stock *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="0"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="batchNumber">Batch Number *</Label>
                  <Input
                    id="batchNumber"
                    placeholder="e.g., BTN2024001"
                    value={formData.batchNumber}
                    onChange={(e) => handleInputChange('batchNumber', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date *</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Product description, usage instructions, etc."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Right Column - File Uploads */}
          <Card>
            <CardHeader>
              <CardTitle>Product Documentation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Product Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="product-image" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Upload product image
                      </span>
                      <span className="mt-1 block text-sm text-gray-500">
                        PNG, JPG up to 5MB
                      </span>
                    </label>
                    <input id="product-image" name="product-image" type="file" className="sr-only" accept="image/*" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Drug License (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="drug-license" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Upload drug license
                      </span>
                      <span className="mt-1 block text-sm text-gray-500">
                        PDF, JPG up to 10MB
                      </span>
                    </label>
                    <input id="drug-license" name="drug-license" type="file" className="sr-only" accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button type="submit" className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Save Product
                  </Button>
                  <Button type="button" variant="outline" onClick={handleReset}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Form
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
