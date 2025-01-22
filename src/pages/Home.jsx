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
        <div>
            <h1>User Dashboard</h1>

            {/* Link to CreateForm page */}
            <Link to="/new">
                <button className="bg-green-500 text-white rounded px-4 py-2 mb-4">
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
                <table className="table-auto border-collapse border border-gray-300 w-full">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">First Name</th>
                            <th className="border border-gray-300 px-4 py-2">Last Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Department</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="border border-gray-300 px-4 py-2">{user.firstName}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.lastName}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.department}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => handleEdit(user.id)}
                                        className="text-blue-500 hover:underline mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Home;