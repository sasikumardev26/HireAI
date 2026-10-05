import {
  FiMapPin,
  FiBriefcase,
  FiHeart,
  FiClock,
  FiCheckCircle,
  FiArrowUpRight,
  FiBookmark,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function JobCard({ job, saved, onSave }) {
  const navigate = useNavigate();

  return (
    <article className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-lg transition-all duration-300">

      {/* TOP */}
      <div className="flex items-start justify-between gap-5">

        <div className="flex items-start gap-4">

          {/* Company Logo */}
          <div className="w-14 h-14 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <span className="text-lg font-bold text-indigo-600">
              {job.logo}
            </span>
          </div>

          {/* Job Title */}
          <div>

            <div className="flex items-center gap-2">

              <h3
                onClick={() => navigate(`/job/${job.id}`)}
                className="text-lg font-bold text-slate-900 cursor-pointer hover:text-indigo-600 transition"
              >
                {job.title}
              </h3>

              {job.verified && (
                <FiCheckCircle
                  className="text-blue-500 shrink-0"
                  size={17}
                />
              )}

            </div>

            <p className="text-sm text-slate-500 mt-1">
              {job.company}
            </p>

          </div>

        </div>

        {/* Save */}
        <button
          onClick={() => onSave(job.id)}
          className={`w-10 h-10 rounded-xl border flex items-center justify-center transition ${
            saved
              ? "bg-indigo-50 border-indigo-200 text-indigo-600"
              : "bg-white border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200"
          }`}
        >
          <FiBookmark
            size={18}
            className={saved ? "fill-current" : ""}
          />
        </button>

      </div>

      {/* JOB META */}
      <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6 text-sm text-slate-500">

        <span className="flex items-center gap-2">
          <FiMapPin size={16} className="text-slate-400" />
          {job.location}
        </span>

        <span className="flex items-center gap-2">
          <FiBriefcase size={16} className="text-slate-400" />
          {job.type}
        </span>

        <span className="flex items-center gap-2">
          <FiClock size={16} className="text-slate-400" />
          {job.experience}
        </span>

        <span className="px-2.5 py-1 bg-slate-100 rounded-md text-xs font-medium text-slate-600">
          {job.mode}
        </span>

      </div>

      {/* SALARY */}
      <div className="mt-5">

        <span className="text-lg font-bold text-slate-900">
          {job.salary}
        </span>

        <span className="text-sm text-slate-400 ml-2">
          · Posted {job.posted}
        </span>

      </div>

      {/* SKILLS */}
      <div className="flex flex-wrap gap-2 mt-4">

        {job.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium"
          >
            {skill}
          </span>
        ))}

      </div>

      {/* BOTTOM */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-5 border-t border-slate-100">

        {/* AI MATCH */}
        <div className="flex items-center gap-3">

          <div className="relative w-11 h-11">

            <svg
              className="w-11 h-11 -rotate-90"
              viewBox="0 0 36 36"
            >
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-slate-100"
              />

              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${job.match}, 100`}
                className="text-emerald-500"
                strokeLinecap="round"
              />
            </svg>

            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-700">
              {job.match}%
            </span>

          </div>

          <div>

            <p className="text-sm font-bold text-emerald-600">
              {job.match}% AI Match
            </p>

            <p className="text-xs text-slate-400">
              Based on your profile
            </p>

          </div>

        </div>

        {/* ACTIONS */}
        <div className="flex gap-2">

          <button
            onClick={() => navigate(`/job/${job.id}`)}
            className="px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition"
          >
            View Details
          </button>

          <button
            onClick={() => navigate(`/job/${job.id}`)}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold flex items-center gap-2 transition"
          >
            Apply Now
            <FiArrowUpRight size={16} />
          </button>

        </div>

      </div>

    </article>
  );
}

export default JobCard;