import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../UI/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  address: string;
  role: string;
  status: string;
  documents: Record<string, string>;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          navigate('/admin/login');
          return;
        }
        const response = await axios.get('https://pharmachain-backend-production-6ecf.up.railway.app/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch users');
        if (err.response?.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        }
      }
    };
    fetchUsers();
  }, [navigate]);

  const handleVerify = async (userId: string, status: 'approved' | 'rejected') => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }
      await axios.post(
        'https://pharmachain-backend-production-6ecf.up.railway.app/api/admin/verify-user',
        { userId, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map(user => user._id === userId ? { ...user, status } : user));
    } catch (err: any) {
      setError(err.response?.data?.message || `Failed to ${status} user`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-16 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">User Management</h2>
        <Button
          onClick={() => {
            localStorage.removeItem('adminToken');
            navigate('/admin/login');
          }}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Logout
        </Button>
      </div>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.businessName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role || 'Not set'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {Object.keys(user.documents).map(doc => (
                    <a
                      key={doc}
                      href={`https://pharmachain-backend-production-6ecf.up.railway.app/uploads/${user.documents[doc]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-500 mr-2"
                    >
                      {doc}
                    </a>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {user.status === 'pending' && (
                    <>
                      <Button
                        onClick={() => handleVerify(user._id, 'approved')}
                        className="bg-green-600 hover:bg-green-700 text-white mr-2"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" /> Approve
                      </Button>
                      <Button
                        onClick={() => handleVerify(user._id, 'rejected')}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        <XCircle className="h-4 w-4 mr-1" /> Reject
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;