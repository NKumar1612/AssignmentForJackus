import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateForm = ({ onAddUser }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                department: formData.department,
            });

            const newUser = {
                id: response.data.id, // Simulated ID from API
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                department: formData.department,
            };

            // Inform the parent component (Home) to add this new user
            onAddUser(newUser); // This will add the user to the state in Home

            // Navigate back to the Home page
            navigate('/');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <div>
                <label className="block">First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                    required
                />
            </div>
            <div>
                <label className="block">Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                    required
                />
            </div>
            <div>
                <label className="block">Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                    required
                />
            </div>
            <div>
                <label className="block">Department:</label>
                <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                    required
                >
                    <option value="">Select a department</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Research and Development">Research and Development</option>
                </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
                Create User
            </button>
        </form>
    );
};

export default CreateForm;