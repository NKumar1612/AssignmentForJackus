import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditForm from './EditForm';
import { Link } from 'react-router-dom'; // For navigation to CreateForm

const Home = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);

    // Fetching users when the component mounts
    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                const userData = response.data.map((user) => {
                    const [firstName, ...lastName] = user.name.split(' ');
                    return {
                        id: user.id,
                        firstName: firstName,
                        lastName: lastName.join(' '),
                        email: user.email,
                        department: [
                            'Human Resources',
                            'Information Technology',
                            'Marketing',
                            'Research and Development',
                        ][user.id % 4],
                    };
                });
                setUsers(userData);
            })
            .catch((err) => console.error(err));
    }, []);

    // Handling the edit button click
    const handleEdit = (id) => {
        setEditingUserId(id);
    };

    // Saving updated user details
    const handleSave = (updatedUser) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
            )
        );
        setEditingUserId(null);
    };

    // Deleting a user
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // This function is used to add a new user to the state after it's created in the CreateForm
    const handleAddUser = (newUser) => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
    };

    return (
        <div className="min-h-screen bg-orange-100 p-6"> {/* Updated background color */}
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">User Dashboard</h1>

                {/* Link to CreateForm page */}
                <Link to="/new">
                    <button className="bg-blue-600 text-white rounded-lg px-6 py-2 mb-6 shadow-md hover:bg-blue-700">
                        Create New User
                    </button>
                </Link>

                {editingUserId ? (
                    <EditForm
                        user={users.find((user) => user.id === editingUserId)}
                        onSave={handleSave}
                        onCancel={() => setEditingUserId(null)} // Cancel edit
                    />
                ) : (
                    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                        <table className="min-w-full table-auto text-left">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-gray-600 font-medium text-sm uppercase">First Name</th>
                                    <th className="px-6 py-3 text-gray-600 font-medium text-sm uppercase">Last Name</th>
                                    <th className="px-6 py-3 text-gray-600 font-medium text-sm uppercase">Email</th>
                                    <th className="px-6 py-3 text-gray-600 font-medium text-sm uppercase">Department</th>
                                    <th className="px-6 py-3 text-gray-600 font-medium text-sm uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 border-b">
                                        <td className="px-6 py-4 text-gray-800">{user.firstName}</td>
                                        <td className="px-6 py-4 text-gray-800">{user.lastName}</td>
                                        <td className="px-6 py-4 text-gray-800">{user.email}</td>
                                        <td className="px-6 py-4 text-gray-800">{user.department}</td>
                                        <td className="px-6 py-4 flex space-x-4">
                                            <button
                                                onClick={() => handleEdit(user.id)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="text-red-500 hover:text-red-700"
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
            </div>
        </div>
    );
};

export default Home;
