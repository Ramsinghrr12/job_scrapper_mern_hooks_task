export const JobCard = ({ job, onApply, onSummary }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow hover:shadow-lg transition">
      <h3 className="text-lg font-bold text-blue-600 mb-1">{job.title}</h3>
      <p className="text-gray-700 font-semibold mb-1">{job.company}</p>
      <p className="text-gray-600 mb-1">📍 {job.location}</p>
      <p className="text-sm text-gray-500 mb-3">Platform: {job.platform}</p>

      <div className="flex gap-2 flex-wrap">
        <a
          href={job.jobLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 transition"
        >
          View Job
        </a>
        <button
          onClick={() => onApply(job)}
          className="bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600 transition"
        >
          Apply Now
        </button>
        {onSummary && (
          <button
            onClick={() => onSummary(job)}
            className="bg-purple-500 text-white px-3 py-2 rounded text-sm hover:bg-purple-600 transition"
          >
            AI Summary
          </button>
        )}
      </div>
    </div>
  );
};
