import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [expandedUser, setExpandedUser] = useState<string | null>(null);
    const navigate = useNavigate();

    const toggleUserDocs = (userId: string) => {
        setExpandedUser(prev => (prev === userId ? null : userId));
    };

    const fetchUnverifiedUsers = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            const res = await fetch("http://localhost:5000/api/admin/unverified-users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 401) {
                localStorage.removeItem("adminToken");
                navigate("/admin/login");
                return;
            }

            const data = await res.json();
            setUsers(data.users);
        } catch (err) {
            console.error("Error fetching users", err);
        }
    };

    useEffect(() => {
        fetchUnverifiedUsers();
    }, []);

    const handleAction = async (userId: string, approve: boolean) => {
        const token = localStorage.getItem("adminToken");

        const res = await fetch("http://localhost:5000/api/admin/verify-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId, verify: approve }),
        });

        const data = await res.json();
        if (res.ok) {
            fetchUnverifiedUsers();
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <h2 className="text-xl font-semibold mb-4">Unverified Users</h2>

            {Array.isArray(users) && users.length === 0 ? (
                <p className="text-gray-500">No pending users for verification.</p>
            ) : (
                <div className="space-y-6">
                    {users.map((user) => (
                        <div key={user._id} className="bg-white shadow rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold">{user.name}</h3>
                                    <p className="text-sm text-gray-500">{user.email} • {user.phone}</p>
                                    <p className="text-sm text-gray-500">Role: {user.role || "N/A"}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        className="text-blue-600 underline text-sm"
                                        onClick={() => toggleUserDocs(user._id)}
                                    >
                                        {expandedUser === user._id ? "Hide" : "View"} Documents
                                    </button>
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        onClick={() => handleAction(user._id, true)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        onClick={() => handleAction(user._id, false)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>

                            {expandedUser === user._id && (
                                <div className="mt-4 border-t pt-4 space-y-2 text-sm text-gray-700">
                                    {(Object.entries(user.documents || {}) as [string, string][]).map(([key, path]) => (
                                        <div key={key}>
                                            <span className="capitalize font-medium">{key}:</span>{' '}
                                            <a
                                                href={`http://localhost:5000/${path}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline"
                                            >
                                                View / Download
                                            </a>
                                        </div>
                                    ))}

                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default AdminDashboard;
