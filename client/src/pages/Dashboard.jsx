import { useState } from 'react';
import { JobTable } from '../components/JobTable';
import { Loader } from '../components/Loader';
import API from '../api/axios';

export const Dashboard = () => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [platform, setPlatform] = useState('internshala');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [aiSummary, setAiSummary] = useState(null);

  const handleScrape = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await API.post('/api/jobs/scrape', {
        keyword,
        location,
        platform,
      });
      setJobs(response.data.jobs);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to scrape jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (job) => {
    try {
      await API.post('/api/applications', {
        title: job.title,
        company: job.company,
        location: job.location,
        platform: job.platform,
        jobLink: job.jobLink,
      });
      
      alert(`Applied to ${job.title}!`);
      window.open(job.jobLink, '_blank');
    } catch (err) {
      alert('Failed to save application');
    }
  };

  const handleAiSummary = async (job) => {
    try {
      setLoading(true);
      const response = await API.post('/api/ai/job-summary', {
        title: job.title,
        company: job.company,
        description: job.description || `${job.title} at ${job.company}`,
      });
      setAiSummary(response.data.summary);
    } catch (err) {
      alert('Failed to generate summary. Make sure OPENAI_API_KEY is set.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Job Scraper Dashboard</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <form onSubmit={handleScrape} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Job Keyword</label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g., MERN Developer"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Bangalore"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="internshala">Internshala</option>
              <option value="unstop">Unstop</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Scraping...' : 'Scrape Jobs'}
            </button>
          </div>
        </form>
      </div>

      {aiSummary && (
        <div className="bg-purple-100 border border-purple-300 rounded p-6 mb-8">
          <h3 className="text-xl font-bold text-purple-600 mb-3">AI Job Summary</h3>
          <p className="mb-2"><strong>Summary:</strong> {aiSummary.summary}</p>
          <p className="mb-2"><strong>Key Skills:</strong> {aiSummary.skills?.join(', ')}</p>
          <p className="mb-2"><strong>Best For:</strong> {aiSummary.fitFor}</p>
          <button
            onClick={() => setAiSummary(null)}
            className="text-purple-600 hover:underline mt-4"
          >
            Close
          </button>
        </div>
      )}

      {loading && <Loader />}

      {jobs.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">
            Found {jobs.length} Jobs
          </h2>
          <JobTable jobs={jobs} onApply={handleApply} onSummary={handleAiSummary} />
        </div>
      )}

      {!loading && jobs.length === 0 && keyword && (
        <div className="text-center text-gray-500 py-8">
          No results. Try different keywords or location.
        </div>
      )}
    </div>
  );
};
