
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/UI/card';
import { Button } from '../../components/UI/button';
import { Input } from '../../components/UI/input';
import { Badge } from '../../components/UI/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/UI/select';
import { Search, Filter, ShoppingCart, Plus, Eye, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Medicine {
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  stock: number;
  minQuantity: number;
  expiry: string;
  category: string;
  type: string;
}

interface Category {
  value: string;
  label: string;
}

export function BrowseMedicines() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const categories: Category[] = [
    { value: 'tablet', label: 'Tablet' },
    { value: 'capsule', label: 'Capsule' },
    { value: 'syrup', label: 'Syrup' },
    { value: 'injection', label: 'Injection' },
    { value: 'ointment', label: 'Ointment' },
    { value: 'drops', label: 'Drops' },
    { value: 'powder', label: 'Powder' },
    { value: 'inhaler', label: 'Inhaler' },
  ];

  useEffect(() => {
    fetchMedicines();
  }, [searchTerm, selectedManufacturer, selectedCategory]);

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get('https://pharmachain-backend-production-6ecf.up.railway.app/api/user/medicines', {
        headers: { Authorization: `Bearer ${token}` },
        params: { search: searchTerm, manufacturer: selectedManufacturer, category: selectedCategory },
      });

      setMedicines(response.data.medicines);
      const uniqueManufacturers = [...new Set(response.data.medicines.map((med: Medicine) => med.manufacturer))] as string[];
      setManufacturers(uniqueManufacturers);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (medicine: Medicine) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === medicine.id);

    if (existingItem) {
      if (existingItem.quantity < medicine.stock) {
        existingItem.quantity = Math.max(existingItem.quantity + medicine.minQuantity, medicine.minQuantity);
      }
    } else {
      cart.push({ ...medicine, quantity: medicine.minQuantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedManufacturer('');
    setSelectedCategory('');
  };

  const filteredMedicines = medicines;

  const hasActiveFilters = selectedManufacturer || selectedCategory || searchTerm;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Browse Medicines</h1>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            {filteredMedicines.length} Products Available
          </Badge>
          <Button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <ShoppingCart className="h-4 w-4" />
            View Cart
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search medicines by name or manufacturer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>
              <div className="min-w-[200px]">
                <Select value={selectedManufacturer} onValueChange={setSelectedManufacturer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Manufacturer" />
                  </SelectTrigger>
                  <SelectContent>
                    {manufacturers.map((manufacturer) => (
                      <SelectItem key={manufacturer} value={manufacturer}>
                        {manufacturer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="min-w-[180px]">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {selectedManufacturer && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Manufacturer: {selectedManufacturer}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setSelectedManufacturer('')}
                    />
                  </Badge>
                )}
                {selectedCategory && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Category: {categories.find((c) => c.value === selectedCategory)?.label}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setSelectedCategory('')}
                    />
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {loading && <p>Loading medicines...</p>}
      {!loading && filteredMedicines.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-500">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No medicines found</h3>
              <p className="mb-4">Try adjusting your search or filter criteria</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!loading && filteredMedicines.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMedicines.map((medicine) => (
            <Card key={medicine.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{medicine.name}</CardTitle>
                    <p className="text-sm text-gray-600">{medicine.manufacturer}</p>
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
                    <span className="text-gray-600">Min Order:</span>
                    <span className="text-gray-900">{medicine.minQuantity} units</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Expiry:</span>
                    <span className="text-gray-900">{medicine.expiry}</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button onClick={() => addToCart(medicine)} className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
