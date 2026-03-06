import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import API from '../api/axios';

export const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await API.get('/api/profile');
      setProfile(response.data.user);
      setFormData({
        name: response.data.user.name,
        email: response.data.user.email,
      });
    } catch (err) {
      setError('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await API.put('/api/profile', formData);
      setProfile({ ...profile, ...formData });
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  const handleDeleteImage = async () => {
    if (window.confirm('Delete profile image?')) {
      try {
        await API.delete('/api/profile/image');
        setProfile({ ...profile, profileImage: null });
        alert('Image deleted successfully');
      } catch (err) {
        alert('Failed to delete image');
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">My Profile</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-8">
        {/* Profile Image Section */}
        <div className="text-center mb-8">
          {profile?.profileImage ? (
            <img
              src={profile.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
            />
          ) : (
            <div className="w-32 h-32 rounded-full mx-auto bg-gray-200 flex items-center justify-center mb-4">
              <span className="text-gray-400">No Image</span>
            </div>
          )}

          {!editing && (
            <div className="space-x-2">
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit Profile
              </button>
              {profile?.profileImage && (
                <button
                  onClick={handleDeleteImage}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete Image
                </button>
              )}
            </div>
          )}
        </div>

        {/* Profile Form */}
        {editing ? (
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Profile Image</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                accept="image/*"
              />
            </div>

            <div className="space-x-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Name</label>
              <p className="text-gray-600 bg-gray-50 p-3 rounded">{profile?.name}</p>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <p className="text-gray-600 bg-gray-50 p-3 rounded">{profile?.email}</p>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Member Since</label>
              <p className="text-gray-600 bg-gray-50 p-3 rounded">
                {new Date(profile?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
