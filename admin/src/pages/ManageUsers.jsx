import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Admindashboard from '../components/Admindashboard';
import { Link } from 'react-router-dom';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth');
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/${userId}`);
      setUsers(users.filter((user) => user._id !== userId)); // Update UI by removing deleted user
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Admindashboard />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-gradient-to-r from-green-700 to-green-400 text-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-3xl font-semibold">Manage Users</h2>
          <p className="mt-2 text-sm">Manage all registered users below.</p>
        </div>
        <Link to='/admin/addusers'>
          <button className="bg-blue-500 text-white px-6 p-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105">
            Add Users
          </button>
        </Link>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden pt-3">
            <table className="min-w-full table-auto">
              <thead className="bg-green-200 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Phone</th>
                  <th className="py-3 px-6 text-left">User Type</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                  >
                    <td className="py-3 px-6">{user.firstName} {user.lastName}</td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6">{user.phoneNumber}</td>
                    <td className="py-3 px-6 capitalize">{user.userType}</td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition duration-300 transform hover:scale-105"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageUsers;
