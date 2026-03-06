import { formatDate } from '../utils/formatDate';

export const JobTable = ({ jobs, onApply, onSummary }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 p-2 text-left">Title</th>
            <th className="border border-gray-300 p-2 text-left">Company</th>
            <th className="border border-gray-300 p-2 text-left">Location</th>
            <th className="border border-gray-300 p-2 text-left">Platform</th>
            <th className="border border-gray-300 p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{job.title}</td>
              <td className="border border-gray-300 p-2">{job.company}</td>
              <td className="border border-gray-300 p-2">{job.location}</td>
              <td className="border border-gray-300 p-2">{job.platform}</td>
              <td className="border border-gray-300 p-2 text-center space-x-2">
                <a
                  href={job.jobLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 inline-block"
                >
                  View
                </a>
                <button
                  onClick={() => onApply(job)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 inline-block"
                >
                  Apply
                </button>
                {onSummary && (
                  <button
                    onClick={() => onSummary(job)}
                    className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 inline-block"
                  >
                    AI Summary
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {jobs.length === 0 && (
        <div className="text-center py-8 text-gray-500">No jobs found</div>
      )}
    </div>
  );
};
