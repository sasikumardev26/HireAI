import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBriefcase,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiCopy,
  FiDollarSign,
  FiHeart,
  FiMapPin,
  FiShare2,
  FiShield,
  FiUsers,
  FiZap,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import {jobs} from "../data/jobs";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  /* =========================================================
     FIND JOB
  ========================================================= */

  const job = useMemo(() => {
    return jobs.find(
      (item) => String(item.id) === String(id)
    );
  }, [id]);

  /* =========================================================
     CHECK SAVED JOB
  ========================================================= */

  useEffect(() => {
    if (!job) return;

    try {
      const savedJobs = JSON.parse(
        localStorage.getItem("hireaiSavedJobs") || "[]"
      );

      const alreadySaved = savedJobs.some(
        (item) => String(item.id) === String(job.id)
      );

      setSaved(alreadySaved);
    } catch (error) {
      console.error("Unable to read saved jobs:", error);
    }
  }, [job]);

  /* =========================================================
     SAVE / UNSAVE JOB
  ========================================================= */

  const handleSaveJob = () => {
    if (!job) return;

    try {
      const existingJobs = JSON.parse(
        localStorage.getItem("hireaiSavedJobs") || "[]"
      );

      const alreadySaved = existingJobs.some(
        (item) => String(item.id) === String(job.id)
      );

      let updatedJobs;

      if (alreadySaved) {
        updatedJobs = existingJobs.filter(
          (item) => String(item.id) !== String(job.id)
        );
      } else {
        updatedJobs = [job, ...existingJobs];
      }

      localStorage.setItem(
        "hireaiSavedJobs",
        JSON.stringify(updatedJobs)
      );

      setSaved(!alreadySaved);
    } catch (error) {
      console.error("Unable to save job:", error);
    }
  };

  /* =========================================================
     SHARE JOB
  ========================================================= */

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: job.title,
          text: `${job.title} at ${job.company}`,
          url: window.location.href,
        });

        return;
      }

      await navigator.clipboard.writeText(
        window.location.href
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      // Share cancelled.
    }
  };

  /* =========================================================
     JOB NOT FOUND
  ========================================================= */

  if (!job) {
    return (
      <div className="min-h-screen bg-[#f6f7fb]">
        <Navbar />

        <div className="flex min-h-[75vh] items-center justify-center px-5">

          <div className="max-w-md text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center bg-slate-100 text-slate-400">
              <FiBriefcase className="text-2xl" />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-slate-900">
              Job not found
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              This job may have been removed or is no longer
              available.
            </p>

            <Link
              to="/jobs"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800"
            >
              <FiArrowLeft />
              Back to Jobs
            </Link>

          </div>

        </div>
      </div>
    );
  }

  /* =========================================================
     JOB DATA
  ========================================================= */

  const match = job.match || 94;

  const skills = Array.isArray(job.skills)
    ? job.skills
    : [];

  const responsibilities =
    job.responsibilities || [
      "Build and maintain scalable web applications.",
      "Collaborate with developers and product teams.",
      "Write clean, maintainable and reusable code.",
      "Debug application issues and improve performance.",
      "Participate in code reviews and technical discussions.",
    ];

  const requirements =
    job.requirements || [
      "Strong understanding of programming fundamentals.",
      "Good problem-solving and communication skills.",
      "Experience with modern development tools.",
      "Ability to work independently and as part of a team.",
      "Willingness to learn new technologies.",
    ];

  const benefits =
    job.benefits || [
      "Competitive salary",
      "Flexible work environment",
      "Learning and development opportunities",
      "Collaborative team culture",
    ];

  /* =========================================================
     SIMILAR JOBS
  ========================================================= */

  const similarJobs = jobs
    .filter(
      (item) => String(item.id) !== String(job.id)
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-slate-900">

      <Navbar />

      {/* =====================================================
          JOB HEADER
      ====================================================== */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10">

          {/* Back */}
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
          >
            <FiArrowLeft />
            Back to Jobs
          </Link>

          <div className="mt-7 flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">

            {/* =================================================
                JOB IDENTITY
            ================================================== */}

            <div className="flex min-w-0 gap-5">

              <CompanyLogo
                company={job.company}
                logo={job.logo}
              />

              <div className="min-w-0">

                <div className="flex flex-wrap items-center gap-3">

                  <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                    {job.title}
                  </h1>

                  {job.verified && (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                      <FiCheckCircle />
                      Verified
                    </span>
                  )}

                </div>

                <p className="mt-2 text-base font-semibold text-slate-600">
                  {job.company}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">

                  <MetaItem
                    icon={<FiMapPin />}
                    value={job.location || "India"}
                  />

                  <MetaItem
                    icon={<FiBriefcase />}
                    value={formatJobType(job.type)}
                  />

                  <MetaItem
                    icon={<FiUsers />}
                    value={job.experience || "Fresher"}
                  />

                  <MetaItem
                    icon={<FiClock />}
                    value={job.posted || "Recently posted"}
                  />

                </div>

              </div>

            </div>

            {/* =================================================
                HEADER ACTIONS
            ================================================== */}

            <div className="flex shrink-0 items-center gap-3">

              <button
                type="button"
                onClick={handleSaveJob}
                className={`flex h-11 items-center gap-2 border px-5 text-sm font-semibold transition ${
                  saved
                    ? "border-indigo-200 bg-indigo-50 text-indigo-600"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900"
                }`}
              >
                <FiHeart
                  className={saved ? "fill-current" : ""}
                />

                {saved ? "Saved" : "Save"}
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="flex h-11 items-center gap-2 border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
              >
                {copied ? <FiCheck /> : <FiShare2 />}

                {copied ? "Copied" : "Share"}
              </button>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          AI MATCH BANNER
      ====================================================== */}

      <section className="border-b border-indigo-100 bg-indigo-50/70">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="flex flex-col gap-5 py-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-indigo-600 text-white">
                <FiZap />
              </div>

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-600">
                  AI Compatibility
                </p>

                <h2 className="mt-1 text-base font-bold text-slate-900">
                  This role looks like a strong match for you
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  HireAI compared this role with your skills and
                  career profile.
                </p>

              </div>

            </div>

            <div className="flex items-center gap-5">

              <div className="text-right">

                <p className="text-3xl font-bold text-indigo-600">
                  {match}%
                </p>

                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  AI Match
                </p>

              </div>

              <div className="h-9 w-px bg-indigo-200" />

              <p className="text-sm font-bold text-emerald-600">
                Strong fit
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">

        <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_360px]">

          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <div className="space-y-6">

            {/* ABOUT */}
            <ContentSection title="About the role">

              <p className="text-[15px] leading-8 text-slate-600">
                {job.description}
              </p>

            </ContentSection>

            {/* RESPONSIBILITIES */}
            <ContentSection title="Responsibilities">

              <ul className="space-y-4">

                {responsibilities.map(
                  (item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-600 sm:text-[15px]"
                    >

                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-indigo-600" />

                      <span>
                        {item}
                      </span>

                    </li>
                  )
                )}

              </ul>

            </ContentSection>

            {/* REQUIREMENTS */}
            <ContentSection title="Requirements">

              <ul className="space-y-4">

                {requirements.map(
                  (item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-600 sm:text-[15px]"
                    >

                      <FiCheckCircle className="mt-0.5 shrink-0 text-indigo-500" />

                      <span>
                        {item}
                      </span>

                    </li>
                  )
                )}

              </ul>

            </ContentSection>

            {/* SKILLS */}
            <ContentSection title="Skills you'll use">

              <div className="flex flex-wrap gap-2.5">

                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </ContentSection>

            {/* BENEFITS */}
            <ContentSection title="Benefits">

              <div className="grid gap-3 sm:grid-cols-2">

                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 border border-slate-100 bg-slate-50/70 px-4 py-4"
                  >

                    <FiCheckCircle className="shrink-0 text-emerald-500" />

                    <span className="text-sm font-medium text-slate-600">
                      {benefit}
                    </span>

                  </div>
                ))}

              </div>

            </ContentSection>

            {/* APPLY CTA */}
            <section className="border border-slate-200 bg-white p-6 sm:p-7">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Next step
                  </p>

                  <h2 className="mt-2 text-xl font-bold text-slate-950">
                    Ready to apply?
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Submit your application to the recruiter.
                  </p>

                </div>

                <Link
                  to={`/apply/${job.id}`}
                  className="inline-flex h-12 items-center justify-center gap-3 bg-slate-950 px-7 text-sm font-bold text-white transition hover:bg-indigo-600"
                >
                  Apply for this job
                  <FiArrowRight />
                </Link>

              </div>

            </section>

            {/* SIMILAR JOBS */}
            {similarJobs.length > 0 && (
              <section>

                <div className="mb-5 flex items-end justify-between">

                  <div>

                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      More opportunities
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-slate-900">
                      Similar jobs
                    </h2>

                  </div>

                  <Link
                    to="/jobs"
                    className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    View all
                    <FiArrowRight />
                  </Link>

                </div>

                <div className="grid gap-4 md:grid-cols-3">

                  {similarJobs.map((item) => (
                    <Link
                      key={item.id}
                      to={`/job/${item.id}`}
                      className="border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
                    >

                      <div className="flex items-start justify-between gap-3">

                        <CompanyLogo
                          company={item.company}
                          logo={item.logo}
                          small
                        />

                        {item.match && (
                          <span className="text-[10px] font-bold text-indigo-600">
                            {item.match}% match
                          </span>
                        )}

                      </div>

                      <h3 className="mt-4 line-clamp-2 text-sm font-bold text-slate-900">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {item.company}
                      </p>

                      <p className="mt-3 text-xs text-slate-400">
                        {item.location}
                      </p>

                    </Link>
                  ))}

                </div>

              </section>
            )}

          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================== */}

          <aside className="space-y-5 lg:sticky lg:top-24">

            {/* APPLY CARD */}
            <section className="border border-slate-200 bg-white p-6">

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Salary
              </p>

              <div className="mt-2 flex items-center gap-2">

                <FiDollarSign className="text-slate-400" />

                <p className="text-2xl font-bold text-slate-950">
                  {job.salary || "Not disclosed"}
                </p>

              </div>

              {/* MAIN APPLY BUTTON */}
              <Link
                to={`/apply/${job.id}`}
                className="mt-6 flex h-12 w-full items-center justify-center gap-3 bg-slate-950 px-5 text-sm font-bold text-white transition hover:bg-indigo-600"
              >
                Apply Now
                <FiArrowRight />
              </Link>

              {/* SAVE */}
              <button
                type="button"
                onClick={handleSaveJob}
                className={`mt-3 flex h-11 w-full items-center justify-center gap-2 border px-5 text-sm font-semibold transition ${
                  saved
                    ? "border-indigo-200 bg-indigo-50 text-indigo-600"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900"
                }`}
              >

                <FiHeart
                  className={saved ? "fill-current" : ""}
                />

                {saved ? "Saved Job" : "Save Job"}

              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <FiShield />
                Safe and secure application
              </div>

            </section>

            {/* JOB OVERVIEW */}
            <section className="border border-slate-200 bg-white">

              <div className="border-b border-slate-100 px-6 py-5">

                <h2 className="text-base font-bold text-slate-900">
                  Job overview
                </h2>

              </div>

              <div className="divide-y divide-slate-100">

                <OverviewRow
                  icon={<FiBriefcase />}
                  label="Job Type"
                  value={formatJobType(job.type)}
                />

                <OverviewRow
                  icon={<FiMapPin />}
                  label="Location"
                  value={job.location || "India"}
                />

                <OverviewRow
                  icon={<FiUsers />}
                  label="Experience"
                  value={job.experience || "Fresher"}
                />

                <OverviewRow
                  icon={<FiDollarSign />}
                  label="Salary"
                  value={job.salary || "Not disclosed"}
                />

                <OverviewRow
                  icon={<FiZap />}
                  label="AI Match"
                  value={`${match}%`}
                  accent
                />

              </div>

            </section>

            {/* COMPANY CARD */}
            <section className="border border-slate-200 bg-white">

              <div className="p-6">

                <div className="flex items-center gap-4">

                  <CompanyLogo
                    company={job.company}
                    logo={job.logo}
                    small
                  />

                  <div className="min-w-0">

                    <h2 className="truncate font-bold text-slate-900">
                      {job.company}
                    </h2>

                    <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                      <FiCheckCircle />
                      Verified company
                    </p>

                  </div>

                </div>

                <p className="mt-5 text-sm leading-6 text-slate-500">
                  Explore career opportunities and learn more
                  about this hiring company.
                </p>

              </div>

              <Link
                to="/companies"
                className="flex h-11 items-center justify-center gap-2 border-t border-slate-100 text-sm font-bold text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
              >
                View Company
                <FiArrowRight />
              </Link>

            </section>

            {/* SHARE / COPY */}
            <button
              type="button"
              onClick={handleShare}
              className="flex h-11 w-full items-center justify-center gap-2 border border-slate-200 bg-white text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
            >
              {copied ? <FiCheck /> : <FiCopy />}

              {copied
                ? "Job link copied"
                : "Copy job link"}
            </button>

          </aside>

        </div>
      </main>

    </div>
  );
};

/* ============================================================
   CONTENT SECTION
============================================================ */

const ContentSection = ({
  title,
  children,
}) => {
  return (
    <section className="border border-slate-200 bg-white">

      <div className="border-b border-slate-100 px-6 py-5 sm:px-7">

        <h2 className="text-xl font-bold tracking-tight text-slate-950">
          {title}
        </h2>

      </div>

      <div className="px-6 py-6 sm:px-7">
        {children}
      </div>

    </section>
  );
};

/* ============================================================
   META ITEM
============================================================ */

const MetaItem = ({
  icon,
  value,
}) => {
  return (
    <span className="flex items-center gap-2">
      {icon}
      {value}
    </span>
  );
};

/* ============================================================
   OVERVIEW ROW
============================================================ */

const OverviewRow = ({
  icon,
  label,
  value,
  accent = false,
}) => {
  return (
    <div className="flex items-center gap-4 px-6 py-4">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-slate-50 text-slate-400">
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p
          className={`mt-1 text-sm font-bold ${
            accent
              ? "text-indigo-600"
              : "text-slate-700"
          }`}
        >
          {value}
        </p>

      </div>

    </div>
  );
};

/* ============================================================
   COMPANY LOGO
============================================================ */

const CompanyLogo = ({
  company = "",
  logo,
  small = false,
}) => {
  const [imageError, setImageError] = useState(false);

  const size = small
    ? "h-11 w-11"
    : "h-16 w-16";

  const initial =
    company.trim().charAt(0).toUpperCase() || "C";

  if (logo && !imageError) {
    return (
      <div
        className={`${size} shrink-0 overflow-hidden border border-slate-200 bg-white`}
      >

        <img
          src={logo}
          alt=""
          className="h-full w-full object-contain p-2"
          onError={() => setImageError(true)}
        />

      </div>
    );
  }

  return (
    <div
      className={`${size} flex shrink-0 items-center justify-center bg-slate-950 font-bold text-white ${
        small ? "text-sm" : "text-xl"
      }`}
    >
      {initial}
    </div>
  );
};

/* ============================================================
   FORMAT JOB TYPE
============================================================ */

const formatJobType = (type) => {
  if (!type) {
    return "Full-time";
  }

  return String(type)
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
};

export default JobDetails;