import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import { jobs } from "../data/jobs";

import {
  FiArrowRight,
  FiBriefcase,
  FiChevronDown,
  FiClock,
  FiFilter,
  FiHeart,
  FiMapPin,
  FiSearch,
  FiSliders,
  FiStar,
  FiTrendingUp,
  FiUsers,
  FiX,
  FiZap,
} from "react-icons/fi";

import { toggleSavedJob } from "../utils/savedJobs";

const Jobs = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const [jobType, setJobType] = useState("All");
  const [workMode, setWorkMode] = useState("All");
  const [experience, setExperience] = useState("All");

  const [sortBy, setSortBy] = useState("Recommended");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      const saved = localStorage.getItem("hireaiSavedJobs");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  /* =====================================================
     HELPERS
  ===================================================== */

  const getJobType = (job) =>
    job.type || job.jobType || "Full Time";

  const getJobMode = (job) =>
    job.mode || job.workMode || "Remote";

  const getExperience = (job) =>
    job.experience || "Fresher";

  const isSaved = (id) => {
    return savedJobs.some(
      (item) => String(item.id) === String(id)
    );
  };

  const handleSaveJob = (job) => {
    const updated = toggleSavedJob(job);
    setSavedJobs(updated);
  };

  /* =====================================================
     FILTER JOBS
  ===================================================== */

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    const searchText = search.trim().toLowerCase();
    const locationText = location.trim().toLowerCase();

    if (searchText) {
      result = result.filter((job) => {
        const title =
          job.title?.toLowerCase() || "";

        const company =
          job.company?.toLowerCase() || "";

        const skills = Array.isArray(job.skills)
          ? job.skills.join(" ").toLowerCase()
          : String(job.skills || "").toLowerCase();

        return (
          title.includes(searchText) ||
          company.includes(searchText) ||
          skills.includes(searchText)
        );
      });
    }

    if (locationText) {
      result = result.filter((job) =>
        String(job.location || "")
          .toLowerCase()
          .includes(locationText)
      );
    }

    if (jobType !== "All") {
      result = result.filter(
        (job) =>
          String(getJobType(job)).toLowerCase() ===
          jobType.toLowerCase()
      );
    }

    if (workMode !== "All") {
      result = result.filter(
        (job) =>
          String(getJobMode(job)).toLowerCase() ===
          workMode.toLowerCase()
      );
    }

    if (experience !== "All") {
      result = result.filter(
        (job) =>
          String(getExperience(job)).toLowerCase() ===
          experience.toLowerCase()
      );
    }

    if (sortBy === "Highest Match") {
      result.sort(
        (a, b) =>
          Number(b.match || 0) -
          Number(a.match || 0)
      );
    }

    if (sortBy === "Newest") {
      result.sort(
        (a, b) =>
          Number(b.id || 0) -
          Number(a.id || 0)
      );
    }

    return result;
  }, [
    search,
    location,
    jobType,
    workMode,
    experience,
    sortBy,
  ]);

  /* =====================================================
     CLEAR FILTERS
  ===================================================== */

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setJobType("All");
    setWorkMode("All");
    setExperience("All");
    setSortBy("Recommended");
  };

  /* =====================================================
     FILTER SELECT
  ===================================================== */

  const FilterSelect = ({
    label,
    value,
    onChange,
    options,
  }) => {
    return (
      <div>
        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
          {label}
        </label>

        <div className="relative">
          <select
            value={value}
            onChange={(e) =>
              onChange(e.target.value)
            }
            className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-semibold text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
          >
            {options.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>

          <FiChevronDown
            size={16}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>
      </div>
    );
  };

  /* =====================================================
     FILTER PANEL
  ===================================================== */

  const Filters = () => {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <FiFilter size={18} />
            </div>

            <div>
              <h2 className="text-base font-extrabold text-slate-950">
                Filters
              </h2>

              <p className="mt-0.5 text-[11px] text-slate-400">
                Refine your search
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-bold text-indigo-600 transition hover:text-indigo-800"
          >
            Clear
          </button>

        </div>

        <div className="my-6 h-px bg-slate-100" />

        {/* Fields */}

        <div className="space-y-6">

          <FilterSelect
            label="Job Type"
            value={jobType}
            onChange={setJobType}
            options={[
              "All",
              "Full Time",
              "Part Time",
              "Internship",
              "Contract",
            ]}
          />

          <FilterSelect
            label="Work Mode"
            value={workMode}
            onChange={setWorkMode}
            options={[
              "All",
              "Remote",
              "Hybrid",
              "On-site",
            ]}
          />

          <FilterSelect
            label="Experience"
            value={experience}
            onChange={setExperience}
            options={[
              "All",
              "Fresher",
              "0-2 Years",
              "1-3 Years",
              "3-5 Years",
              "5+ Years",
            ]}
          />

        </div>

        {/* AI CARD */}

        <div className="mt-7 rounded-2xl bg-[#080b20] p-5">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
            <FiZap size={18} />
          </div>

          <h3 className="mt-4 text-sm font-extrabold text-white">
            AI Career Match
          </h3>

          <p className="mt-2 text-[11px] leading-5 text-slate-400">
            Jobs are ranked according to your skills,
            experience and career goals.
          </p>

          <div className="mt-5">

            <div className="mb-2 flex items-center justify-between">

              <span className="text-[10px] font-medium text-slate-500">
                Profile compatibility
              </span>

              <span className="text-xs font-extrabold text-indigo-300">
                84%
              </span>

            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[84%] rounded-full bg-indigo-500" />
            </div>

          </div>

          <Link
            to="/profile"
            className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-bold text-indigo-300 transition hover:text-white"
          >
            Improve profile
            <FiArrowRight size={14} />
          </Link>

        </div>

        {/* Bottom note */}

        <div className="mt-5 flex gap-2.5">

          <FiStar
            size={14}
            className="mt-0.5 shrink-0 text-indigo-500"
          />

          <p className="text-[10px] leading-5 text-slate-400">
            Complete your profile to receive more accurate
            AI-powered recommendations.
          </p>

        </div>

      </div>
    );
  };

  /* =====================================================
     JOB CARD
  ===================================================== */

  const JobCard = ({ job }) => {
    const saved = isSaved(job.id);

    const skills = Array.isArray(job.skills)
      ? job.skills
      : String(job.skills || "")
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean);

    const match = job.match || 80;

    return (
      <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_18px_rgba(15,23,42,0.025)] transition duration-300 hover:-translate-y-[1px] hover:border-indigo-200 hover:shadow-[0_16px_40px_rgba(15,23,42,0.07)]">

        {/* Left accent */}

        <div className="absolute bottom-0 left-0 top-0 w-[3px] bg-gradient-to-b from-indigo-500 to-violet-400" />

        <div className="p-6 lg:p-7">

          {/* TOP ROW */}

          <div className="flex items-start justify-between gap-5">

            <div className="min-w-0 flex-1">

              <div className="flex flex-wrap items-center gap-2">

                <Link
                  to={`/job/${job.id}`}
                  className="text-[19px] font-extrabold tracking-[-0.02em] text-slate-950 transition hover:text-indigo-600 lg:text-[21px]"
                >
                  {job.title}
                </Link>

                {job.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-[9px] font-bold text-indigo-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    Verified
                  </span>
                )}

              </div>

              <p className="mt-1.5 text-sm font-semibold text-slate-500">
                {job.company}
              </p>

            </div>

            {/* SAVE BUTTON */}

            <button
              type="button"
              onClick={() => handleSaveJob(job)}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition ${
                saved
                  ? "border-indigo-200 bg-indigo-50 text-indigo-600"
                  : "border-slate-200 bg-white text-slate-400 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              <FiHeart
                size={19}
                className={
                  saved ? "fill-current" : ""
                }
              />
            </button>

          </div>

          {/* META */}

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs font-medium text-slate-500">

            <span className="flex items-center gap-1.5">
              <FiMapPin size={14} className="text-slate-400" />
              {job.location}
            </span>

            <span className="flex items-center gap-1.5">
              <FiBriefcase size={14} className="text-slate-400" />
              {getJobType(job)}
            </span>

            <span className="flex items-center gap-1.5">
              <FiUsers size={14} className="text-slate-400" />
              {getExperience(job)}
            </span>

            <span className="flex items-center gap-1.5">
              <FiSliders size={14} className="text-slate-400" />
              {getJobMode(job)}
            </span>

            <span className="flex items-center gap-1.5">
              <FiClock size={14} className="text-slate-400" />
              {job.posted || "Recently"}
            </span>

          </div>

          {/* SKILLS */}

          <div className="mt-4 flex flex-wrap gap-1.5">

            {skills.slice(0, 6).map(
              (skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-md bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600 ring-1 ring-inset ring-slate-100"
                >
                  {skill}
                </span>
              )
            )}

          </div>

          {/* FOOTER */}

          <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="flex flex-wrap items-center gap-3">

                <p className="text-lg font-extrabold text-slate-950">
                  {job.salary || "Salary not disclosed"}
                </p>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                  <FiStar
                    size={11}
                    className="fill-current"
                  />
                  {match}% AI Match
                </span>

              </div>

              <p className="mt-1 text-[10px] font-medium text-slate-400">
                Salary range • Strong fit for your profile
              </p>

            </div>

            <Link
              to={`/job/${job.id}`}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-xs font-bold text-white transition hover:bg-indigo-600"
            >
              View Details
              <FiArrowRight size={14} />
            </Link>

          </div>

        </div>

      </article>
    );
  };

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <div className="min-h-screen bg-[#f6f7fb]">

      <Navbar />

      {/* =================================================
          HERO
      ================================================= */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-[1440px] px-6 pb-8 pt-9 lg:px-8">

          <div className="max-w-3xl">

            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-indigo-600">

              <FiZap size={12} />

              AI-powered job discovery

            </div>

            <h1 className="text-4xl font-black tracking-[-0.045em] text-slate-950 lg:text-5xl">

              Find work that{" "}

              <span className="text-indigo-600">
                moves you forward.
              </span>

            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 lg:text-base">
              Search thousands of opportunities and discover
              roles intelligently matched to your skills,
              experience and career goals.
            </p>

          </div>

          {/* SEARCH */}

          <div className="mt-7 grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.06)] lg:grid-cols-[1fr_0.6fr_auto]">

            <div className="flex h-14 items-center gap-3 px-5">

              <FiSearch
                size={18}
                className="text-slate-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Job title, skills or company"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />

            </div>

            <div className="flex h-14 items-center gap-3 border-t border-slate-200 px-5 lg:border-l lg:border-t-0">

              <FiMapPin
                size={18}
                className="text-slate-400"
              />

              <input
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                placeholder="Location"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />

            </div>

            <button
              type="button"
              className="flex h-14 items-center justify-center gap-2 bg-slate-950 px-8 text-sm font-bold text-white transition hover:bg-indigo-600"
            >
              <FiSearch size={16} />
              Search Jobs
            </button>

          </div>

          {/* STATS */}

          <div className="mt-4 flex flex-wrap gap-2.5">

            <Stat
              icon={<FiBriefcase />}
              value={filteredJobs.length}
              label="matching jobs"
            />

            <Stat
              icon={<FiZap />}
              value="84%"
              label="avg AI match"
            />

            <Stat
              icon={<FiTrendingUp />}
              value="10+"
              label="hiring now"
            />

            <Stat
              icon={<FiHeart />}
              value={savedJobs.length}
              label="saved jobs"
            />

          </div>

        </div>

      </section>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="mx-auto max-w-[1440px] px-6 py-8 lg:px-8 lg:py-10">

        {/* MOBILE FILTER */}

        <div className="mb-5 flex items-center justify-between lg:hidden">

          <button
            type="button"
            onClick={() =>
              setShowMobileFilters(true)
            }
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold"
          >
            <FiFilter />
            Filters
          </button>

          <span className="text-sm font-semibold text-slate-500">
            {filteredJobs.length} jobs
          </span>

        </div>

        {/* CONTENT GRID */}

        <div className="grid items-start gap-8 lg:grid-cols-[300px_minmax(0,1fr)] xl:gap-10">

          {/* LEFT */}

          <aside className="hidden lg:block lg:sticky lg:top-24">
            <Filters />
          </aside>

          {/* RIGHT */}

          <section className="min-w-0">

            {/* TOP HEADER */}

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <h2 className="text-2xl font-black tracking-tight text-slate-950 lg:text-[26px]">
                    {filteredJobs.length} jobs found
                  </h2>

                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider text-emerald-600">
                    Live
                  </span>

                </div>

                <p className="mt-1.5 text-sm text-slate-500">
                  Opportunities matched to your career profile
                </p>

              </div>

              {/* SORT */}

              <div className="flex items-center gap-2">

                <span className="text-xs text-slate-400">
                  Sort by
                </span>

                <div className="relative">

                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value)
                    }
                    className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-9 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500"
                  >
                    <option value="Recommended">
                      Recommended
                    </option>

                    <option value="Highest Match">
                      Highest Match
                    </option>

                    <option value="Newest">
                      Newest
                    </option>
                  </select>

                  <FiChevronDown
                    size={13}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                </div>

              </div>

            </div>

            {/* AI BANNER */}

            <div className="mb-6 rounded-2xl bg-[#080b20] px-6 py-5">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                    <FiZap size={19} />
                  </div>

                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-indigo-300">
                        AI Recommendation
                      </p>

                      <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[8px] font-bold uppercase text-emerald-300">
                        Smart Match
                      </span>

                    </div>

                    <h3 className="mt-1 text-base font-extrabold text-white">
                      Jobs selected for your career profile
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Opportunities that closely match your
                      skills and experience.
                    </p>

                  </div>

                </div>

                <Link
                  to="/profile"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/10"
                >
                  Improve Profile
                  <FiArrowRight size={13} />
                </Link>

              </div>

            </div>

            {/* JOBS */}

            <div className="space-y-5">

              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                  />
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                    <FiSearch size={22} />
                  </div>

                  <h3 className="mt-5 text-xl font-extrabold text-slate-950">
                    No jobs found
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Try changing your search or filters.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-600"
                  >
                    Clear Filters
                  </button>

                </div>
              )}

            </div>

          </section>

        </div>

      </main>

      {/* =================================================
          MOBILE FILTER
      ================================================= */}

      {showMobileFilters && (
        <div className="fixed inset-0 z-[100] lg:hidden">

          <button
            type="button"
            onClick={() =>
              setShowMobileFilters(false)
            }
            className="absolute inset-0 bg-slate-950/50"
          />

          <div className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-[#f6f7fb] p-5">

            <div className="mb-5 flex items-center justify-between">

              <div>
                <h2 className="text-lg font-black text-slate-950">
                  Filter jobs
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Refine your job search
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowMobileFilters(false)
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white"
              >
                <FiX />
              </button>

            </div>

            <Filters />

            <button
              type="button"
              onClick={() =>
                setShowMobileFilters(false)
              }
              className="mt-5 flex w-full justify-center rounded-xl bg-slate-950 py-4 text-sm font-extrabold text-white"
            >
              Show {filteredJobs.length} Jobs
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

/* =====================================================
   STAT
===================================================== */

const Stat = ({
  icon,
  value,
  label,
}) => {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2">

      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        {icon}
      </div>

      <div>

        <span className="text-xs font-extrabold text-slate-950">
          {value}
        </span>

        <span className="ml-1 text-[10px] text-slate-400">
          {label}
        </span>

      </div>

    </div>
  );
};

export default Jobs;