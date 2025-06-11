import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/UI/card';
import { Button } from '../../components/UI/button';
import { Input } from '../../components/UI/input';
import { Badge } from '../../components/UI/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/UI/select';
import { Search, ShoppingCart, Plus, X, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function BrowseMedicines() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState('');
  type Medicine = {
    id: number;
    name: string;
    brand: string;
    price: number;
    stock: number;
    expiry: string;
    category: string;
    seller: string;
  };

  type CartItem = Medicine & { quantity: number };

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const medicines = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      brand: 'ABC Pharma',
      price: 45,
      stock: 500,
      expiry: '2025-12-31',
      category: 'Tablet',
      seller: 'MediWholesale Ltd',
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      brand: 'MediCore Labs',
      price: 120,
      stock: 300,
      expiry: '2025-08-15',
      category: 'Capsule',
      seller: 'HealthDistro Inc',
    },
    {
      id: 3,
      name: 'Vitamin D3 Capsules',
      brand: 'Health Plus',
      price: 89,
      stock: 200,
      expiry: '2026-03-20',
      category: 'Capsule',
      seller: 'VitaSupply Co',
    },
    {
      id: 4,
      name: 'Cough Syrup',
      brand: 'ABC Pharma',
      price: 85,
      stock: 150,
      expiry: '2025-09-20',
      category: 'Syrup',
      seller: 'MediWholesale Ltd',
    },
    {
      id: 5,
      name: 'Insulin Injection',
      brand: 'DiaCare Pharma',
      price: 350,
      stock: 80,
      expiry: '2025-06-15',
      category: 'Injection',
      seller: 'SpecialtyMeds Hub',
    },
  ];

  const brands = [...new Set(medicines.map(med => med.brand))];
  const priceRanges = [
    { value: '0-50', label: '₹0 - ₹50' },
    { value: '51-100', label: '₹51 - ₹100' },
    { value: '101-200', label: '₹101 - ₹200' },
    { value: '201+', label: '₹201+' },
  ];

  const addToCart = (medicine: Medicine) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === medicine.id);
      if (existing) {
        return prev.map(item => 
          item.id === medicine.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...medicine, quantity: 1 }];
    });
  };

  const removeFromCart = (medicineId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== medicineId));
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBrand('');
    setPriceRange('');
  };

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBrand = !selectedBrand || medicine.brand === selectedBrand;
    
    let matchesPrice = true;
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
      if (max) {
        matchesPrice = medicine.price >= parseInt(min) && medicine.price <= parseInt(max);
      } else {
        matchesPrice = medicine.price >= parseInt(min);
      }
    }
    
    return matchesSearch && matchesBrand && matchesPrice;
  });

  const hasActiveFilters = selectedBrand || priceRange || searchTerm;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Browse Medicines</h1>
          <p className="text-gray-600">Discover quality medicines from verified suppliers</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            {filteredMedicines.length} Products Available
          </Badge>
          {cartItems.length > 0 && (
            <Button 
              onClick={() => navigate('/cart')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <ShoppingCart className="h-4 w-4" />
              Cart ({cartItems.length})
            </Button>
          )}
        </div>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search medicines by name or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Filter Options */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>
              
              {/* Brand Filter */}
              <div className="min-w-[180px]">
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Price Range Filter */}
              <div className="min-w-[150px]">
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearFilters}
                  className="flex items-center gap-2"
                >
                  <X className="h-3 w-3" />
                  Clear Filters
                </Button>
              )}
            </div>
            
            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {selectedBrand && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Brand: {selectedBrand}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSelectedBrand('')}
                    />
                  </Badge>
                )}
                {priceRange && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Price: {priceRanges.find(r => r.value === priceRange)?.label}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setPriceRange('')}
                    />
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Cart Preview */}
      {cartItems.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-blue-900">Shopping Cart</h3>
                <p className="text-sm text-blue-700">{cartItems.length} items • Total: ₹{getTotalAmount()}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCartItems([])}
                >
                  Clear Cart
                </Button>
                <Button 
                  onClick={() => navigate('/cart')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  View Cart
                </Button>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {cartItems.map((item) => (
                <Badge key={item.id} variant="secondary" className="flex items-center gap-1">
                  {item.name} (x{item.quantity})
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeFromCart(item.id)}
                  />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Results Message */}
      {filteredMedicines.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No medicines found</h3>
              <p className="mb-4">Try adjusting your search or filter criteria</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Medicine Grid */}
      {filteredMedicines.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMedicines.map((medicine) => (
            <Card key={medicine.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{medicine.name}</CardTitle>
                    <p className="text-sm text-gray-600">{medicine.brand}</p>
                    <p className="text-xs text-blue-600">by {medicine.seller}</p>
                  </div>
                  <Badge variant="secondary">{medicine.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price per unit:</span>
                    <span className="font-semibold text-green-600">₹{medicine.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Stock:</span>
                    <span className={medicine.stock > 100 ? 'text-green-600' : 'text-orange-600'}>
                      {medicine.stock} units
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Expiry:</span>
                    <span className="text-gray-900">{medicine.expiry}</span>
                  </div>
                  <Button 
                    onClick={() => addToCart(medicine)} 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}