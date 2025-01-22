import React, { useState } from 'react';

const EditForm = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState({ ...user });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Pass updated data to the parent
    };

    return (
        <div>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="border rounded p-2"
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="border rounded p-2"
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border rounded p-2"
                    />
                </div>
                <div>
                    <label>Department:</label>
                    <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="border rounded p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditForm;
