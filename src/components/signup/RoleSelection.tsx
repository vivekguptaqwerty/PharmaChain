import React, { useState } from 'react';
import { ArrowLeft, Factory, Truck, Store, ShoppingBag } from 'lucide-react';
import { Button } from '../UI/button';
import type { SignupData } from '../../pages/Signup';

interface RoleSelectionProps {
  selectedRole: string;
  id: string; // ✅ updated from userId
  onNext: () => void;
  onBack: () => void;
  onUpdate: (data: Partial<SignupData>) => void;
}


const roles = [
  {
    id: 'manufacturer',
    title: 'Manufacturer',
    description: 'Produce pharmaceutical products',
    icon: Factory,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'wholesaler',
    title: 'Wholesaler',
    description: 'Distribute products in bulk',
    icon: Truck,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'distributor',
    title: 'Distributor',
    description: 'Supply to retail networks',
    icon: Store,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'retailer',
    title: 'Retailer',
    description: 'Sell directly to customers',
    icon: ShoppingBag,
    color: 'from-orange-500 to-orange-600'
  }
];

const RoleSelection: React.FC<RoleSelectionProps> = ({ selectedRole, id, onNext, onBack, onUpdate }) => {
  const [role, setRole] = useState(selectedRole);

  const handleRoleSelect = (roleId: string) => {
    setRole(roleId);
  };

  const handleContinue = async () => {
    if (role) {
      try {
        const response = await fetch("http://localhost:5000/api/auth/choose-role", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, role }) // Use userId from props
        });

        const result = await response.json();
        if (response.ok) {
          onUpdate({ role });
          onNext();
        } else {
          alert(result.message);
        }
      } catch (err) {
        alert("Failed to submit role. Try again.");
      }
    }
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
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Select Your Role</h2>
        <p className="text-gray-600">Choose your business type in the pharmaceutical supply chain</p>
      </div>

      <div className="space-y-4 mb-6">
        {roles.map((roleOption) => {
          const IconComponent = roleOption.icon;
          const isSelected = role === roleOption.id;
          
          return (
            <div
              key={roleOption.id}
              onClick={() => handleRoleSelect(roleOption.id)}
              className={`
                relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <div className="flex items-center space-x-4">
                <div className={`
                  w-12 h-12 rounded-lg bg-gradient-to-r ${roleOption.color} 
                  flex items-center justify-center flex-shrink-0
                `}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{roleOption.title}</h3>
                  <p className="text-sm text-gray-600">{roleOption.description}</p>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Button
        onClick={handleContinue}
        disabled={!role}
        className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 cursor-pointer shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Continue
      </Button>
    </div>
  );
};

export default RoleSelection;