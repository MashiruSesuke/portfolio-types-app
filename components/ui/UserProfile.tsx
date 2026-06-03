'use client';

import { useState } from 'react';

import { Button } from './Button';

interface User {
  name: string;
  email: string;
}

export const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser({ name: formData.name, email: formData.email });
    setIsEditing(false);
    setFormData({ name: '', email: '' });
  };

  return (
    <div className="p-4 border rounded">
      {user ? (
        <div>
          <h2 className="text-xl font-bold"> User Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <Button label="Edit" onClick={() => setIsEditing(true)} variant="secondary" />
        </div>
      ) : (
        <div>
          <p>No user data. Please fill the form:</p>
          {isEditing && (
            <form onSubmit={handleSubmit} className="space-y-2 mt-2">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="border p-1 rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="border p-1 rounded"
                required
              />
              <Button type="submit" label="Save" />
            </form>
          )}
          {!isEditing && <Button label="Add Profile" onClick={() => setIsEditing(true)} />}
        </div>
      )}
    </div>
  );
};
