import { useState, useEffect } from 'react';
import { formatDate } from '../utils/formatDate';
import { Loader } from '../components/Loader';
import API from '../api/axios';

export const History = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await API.get('/api/applications');
      setApplications(response.data.applications);
    } catch (err) {
      setError('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await API.put(`/api/applications/${id}`, { status: newStatus });
      fetchApplications();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await API.delete(`/api/applications/${id}`);
        fetchApplications();
      } catch (err) {
        alert('Failed to delete application');
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Application History</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {applications.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No applications yet. Start applying to jobs!
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 p-3 text-left">Title</th>
                <th className="border border-gray-300 p-3 text-left">Company</th>
                <th className="border border-gray-300 p-3 text-left">Platform</th>
                <th className="border border-gray-300 p-3 text-left">Applied Date</th>
                <th className="border border-gray-300 p-3 text-left">Status</th>
                <th className="border border-gray-300 p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-3 font-semibold">{app.title}</td>
                  <td className="border border-gray-300 p-3">{app.company}</td>
                  <td className="border border-gray-300 p-3">{app.platform}</td>
                  <td className="border border-gray-300 p-3">{formatDate(app.dateApplied)}</td>
                  <td className="border border-gray-300 p-3">
                    <select
                      value={app.status}
                      onChange={(e) => handleUpdateStatus(app._id, e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded"
                    >
                      <option>Applied</option>
                      <option>Interview</option>
                      <option>Rejected</option>
                      <option>Selected</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 p-3 text-center space-x-2">
                    <a
                      href={app.jobLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 inline-block"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDelete(app._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 inline-block"
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
  );
};
