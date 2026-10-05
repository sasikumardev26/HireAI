import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBriefcase,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiClock,
  FiFileText,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
  FiUploadCloud,
  FiUser,
  FiUsers,
  FiZap,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import {jobs} from "../data/jobs";

const ApplyJob = () => {
  const { id } = useParams();

  const user = useMemo(() => {
    try {
      return JSON.parse(
        localStorage.getItem("hireaiUser") || "{}"
      );
    } catch {
      return {};
    }
  }, []);

  const job = useMemo(() => {
    return jobs.find(
      (item) => String(item.id) === String(id)
    );
  }, [id]);

  const [form, setForm] = useState({
    firstName: user.firstName || "Demo",
    lastName: user.lastName || "User",
    email: user.email || "demo@hireai.com",
    phone: user.phone || "+91 98765 43210",
    experience: "",
    noticePeriod: "",
    coverLetter: "",
  });

  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  /* =========================================================
     JOB NOT FOUND
  ========================================================= */

  if (!job) {
    return (
      <div className="min-h-screen bg-[#f5f7fb]">
        <Navbar />

        <div className="flex min-h-[75vh] items-center justify-center px-5">
          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center bg-slate-100 text-slate-400">
              <FiBriefcase className="text-2xl" />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-slate-900">
              Job not found
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              This job is no longer available.
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

  const match = job.match || 94;

  /* =========================================================
     FORM CHANGE
  ========================================================= */

  const handleChange = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((previous) => ({
        ...previous,
        [field]: "",
      }));
    }
  };

  /* =========================================================
     RESUME
  ========================================================= */

  const handleResume = (file) => {
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrors((previous) => ({
        ...previous,
        resume: "Please upload a PDF, DOC or DOCX file.",
      }));

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((previous) => ({
        ...previous,
        resume: "Resume size must be less than 5MB.",
      }));

      return;
    }

    setResume(file);

    setErrors((previous) => ({
      ...previous,
      resume: "",
    }));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleResume(file);
    }
  };

  /* =========================================================
     VALIDATION
  ========================================================= */

  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!form.experience) {
      newErrors.experience = "Select your experience";
    }

    if (!form.noticePeriod) {
      newErrors.noticePeriod = "Select your notice period";
    }

    if (!resume) {
      newErrors.resume = "Please upload your resume";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    if (!validate()) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    const newApplication = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      location: job.location,
      status: "Applied",
      appliedDate: "Just now",
      applicantName: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: form.phone,
      experience: form.experience,
      noticePeriod: form.noticePeriod,
      resumeName: resume.name,
    };

    const existingApplications = JSON.parse(
      localStorage.getItem("hireaiApplications") || "[]"
    );

    localStorage.setItem(
      "hireaiApplications",
      JSON.stringify([
        newApplication,
        ...existingApplications,
      ])
    );

    setSubmitted(true);
  };

  /* =========================================================
     SUCCESS SCREEN
  ========================================================= */

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f5f7fb]">

        <Navbar />

        <div className="mx-auto flex min-h-[75vh] max-w-3xl items-center justify-center px-5 py-12">

          <div className="w-full border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">

            <div className="mx-auto flex h-16 w-16 items-center justify-center bg-emerald-50 text-emerald-600">
              <FiCheckCircle className="text-3xl" />
            </div>

            <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600">
              Application Submitted
            </p>

            <h1 className="mt-3 text-3xl font-bold text-slate-950">
              You're all set!
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
              Your application for{" "}
              <strong className="text-slate-700">
                {job.title}
              </strong>{" "}
              at{" "}
              <strong className="text-slate-700">
                {job.company}
              </strong>{" "}
              has been submitted successfully.
            </p>

            <div className="mx-auto mt-8 max-w-md border border-slate-200 bg-slate-50 p-5 text-left">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center bg-slate-950 text-sm font-bold text-white">
                  {job.company?.charAt(0)?.toUpperCase() || "C"}
                </div>

                <div>
                  <p className="font-bold text-slate-900">
                    {job.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {job.company} · {job.location}
                  </p>
                </div>

              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-slate-200 pt-4 text-xs font-bold text-emerald-600">
                <FiCheck />
                Application status: Applied
              </div>

            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

              <Link
                to="/dashboard"
                className="inline-flex h-12 items-center justify-center gap-2 bg-slate-950 px-7 text-sm font-bold text-white transition hover:bg-indigo-600"
              >
                Go to Dashboard
                <FiArrowRight />
              </Link>

              <Link
                to="/jobs"
                className="inline-flex h-12 items-center justify-center gap-2 border border-slate-200 bg-white px-7 text-sm font-bold text-slate-700 transition hover:border-slate-400"
              >
                Browse More Jobs
              </Link>

            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">

      <Navbar />

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10">

          <Link
            to={`/job/${job.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
          >
            <FiArrowLeft />
            Back to Job
          </Link>

          <div className="mt-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600">
                Job Application
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Apply for this role
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Complete your application and submit it to the recruiter.
              </p>

            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">

              <span className="flex h-7 w-7 items-center justify-center bg-indigo-50 text-indigo-600">
                01
              </span>

              Application

            </div>

          </div>

        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-7xl px-5 py-8 pb-36 sm:px-8 lg:px-10">

        <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_360px]">

          {/* =================================================
              LEFT SIDE
          ================================================== */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* PERSONAL INFORMATION */}

            <section className="border border-slate-200 bg-white">

              <SectionHeader
                number="01"
                title="Personal information"
                description="Tell the recruiter how they can reach you."
              />

              <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-7">

                <InputField
                  label="First Name"
                  required
                  icon={<FiUser />}
                  value={form.firstName}
                  error={errors.firstName}
                  onChange={(value) =>
                    handleChange("firstName", value)
                  }
                />

                <InputField
                  label="Last Name"
                  required
                  icon={<FiUser />}
                  value={form.lastName}
                  error={errors.lastName}
                  onChange={(value) =>
                    handleChange("lastName", value)
                  }
                />

                <InputField
                  label="Email Address"
                  required
                  type="email"
                  icon={<FiMail />}
                  value={form.email}
                  error={errors.email}
                  onChange={(value) =>
                    handleChange("email", value)
                  }
                />

                <InputField
                  label="Phone Number"
                  required
                  icon={<FiPhone />}
                  value={form.phone}
                  error={errors.phone}
                  onChange={(value) =>
                    handleChange("phone", value)
                  }
                />

              </div>

            </section>

            {/* PROFESSIONAL DETAILS */}

            <section className="border border-slate-200 bg-white">

              <SectionHeader
                number="02"
                title="Professional details"
                description="Help the recruiter understand your availability."
              />

              <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-7">

                <SelectField
                  label="Experience"
                  required
                  icon={<FiBriefcase />}
                  value={form.experience}
                  error={errors.experience}
                  options={[
                    "Fresher",
                    "Less than 1 Year",
                    "1-3 Years",
                    "3-5 Years",
                    "5+ Years",
                  ]}
                  onChange={(value) =>
                    handleChange("experience", value)
                  }
                />

                <SelectField
                  label="Notice Period"
                  required
                  icon={<FiClock />}
                  value={form.noticePeriod}
                  error={errors.noticePeriod}
                  options={[
                    "Immediate",
                    "15 Days",
                    "30 Days",
                    "60 Days",
                    "90 Days",
                  ]}
                  onChange={(value) =>
                    handleChange("noticePeriod", value)
                  }
                />

              </div>

            </section>

            {/* RESUME */}

            <section className="border border-slate-200 bg-white">

              <SectionHeader
                number="03"
                title="Resume"
                description="Upload your latest resume for the recruiter."
              />

              <div className="p-6 sm:p-7">

                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(event) =>
                    handleResume(
                      event.target.files?.[0]
                    )
                  }
                />

                {!resume ? (
                  <label
                    htmlFor="resume-upload"
                    onDragOver={(event) => {
                      event.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={() =>
                      setDragActive(false)
                    }
                    onDrop={handleDrop}
                    className={`flex min-h-[220px] cursor-pointer flex-col items-center justify-center border-2 border-dashed px-6 text-center transition ${
                      dragActive
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-slate-200 bg-slate-50/60 hover:border-indigo-300 hover:bg-indigo-50/40"
                    }`}
                  >

                    <div className="flex h-16 w-16 items-center justify-center border border-slate-100 bg-white text-indigo-600 shadow-sm">
                      <FiUploadCloud className="text-2xl" />
                    </div>

                    <h3 className="mt-5 text-sm font-bold text-slate-800">
                      Upload your resume
                    </h3>

                    <p className="mt-2 text-xs text-slate-400">
                      Drag & drop your file here
                    </p>

                    <span className="mt-4 inline-flex h-10 items-center justify-center border border-slate-300 bg-white px-6 text-xs font-bold text-slate-700">
                      Choose File
                    </span>

                    <p className="mt-3 text-[11px] text-slate-400">
                      PDF, DOC or DOCX · Maximum 5MB
                    </p>

                  </label>
                ) : (
                  <div className="border border-emerald-200 bg-emerald-50/60 p-5">

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                      <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center bg-white text-emerald-600">
                          <FiFileText className="text-xl" />
                        </div>

                        <div>

                          <p className="max-w-[260px] truncate text-sm font-bold text-slate-900">
                            {resume.name}
                          </p>

                          <p className="mt-1 text-xs font-semibold text-emerald-600">
                            Resume uploaded successfully
                          </p>

                        </div>

                      </div>

                      <label
                        htmlFor="resume-upload"
                        className="cursor-pointer text-sm font-bold text-indigo-600 hover:text-indigo-800"
                      >
                        Replace
                      </label>

                    </div>

                  </div>
                )}

                {errors.resume && (
                  <p className="mt-3 text-xs font-semibold text-red-500">
                    {errors.resume}
                  </p>
                )}

              </div>
            </section>

            {/* COVER LETTER */}

            <section className="border border-slate-200 bg-white">

              <SectionHeader
                number="04"
                title="Cover letter"
                optional
                description="Tell the recruiter why you're a good fit."
              />

              <div className="p-6 sm:p-7">

                <textarea
                  rows="8"
                  maxLength={1000}
                  value={form.coverLetter}
                  onChange={(event) =>
                    handleChange(
                      "coverLetter",
                      event.target.value
                    )
                  }
                  placeholder="Write a short message to the recruiter..."
                  className="w-full resize-none border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white"
                />

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">

                  <span>
                    Optional
                  </span>

                  <span>
                    {form.coverLetter.length}/1000
                  </span>

                </div>

              </div>

            </section>

          </form>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================== */}

          <aside className="space-y-5 lg:sticky lg:top-24">

            {/* JOB CARD */}

            <section className="border border-slate-200 bg-white">

              <div className="border-b border-slate-100 px-6 py-5">

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Applying for
                </p>

              </div>

              <div className="p-6">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-slate-950 text-lg font-bold text-white">
                    {job.company?.charAt(0)?.toUpperCase() || "C"}
                  </div>

                  <div className="min-w-0">

                    <h2 className="font-bold text-slate-900">
                      {job.title}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {job.company}
                    </p>

                  </div>

                </div>

                <div className="mt-6 space-y-4">

                  <SummaryItem
                    icon={<FiMapPin />}
                    label="Location"
                    value={job.location || "India"}
                  />

                  <SummaryItem
                    icon={<FiBriefcase />}
                    label="Job Type"
                    value={formatJobType(job.type)}
                  />

                  <SummaryItem
                    icon={<FiUsers />}
                    label="Experience"
                    value={job.experience || "Fresher"}
                  />

                  <SummaryItem
                    icon={<FiZap />}
                    label="AI Match"
                    value={`${match}%`}
                    accent
                  />

                </div>

                <Link
                  to={`/job/${job.id}`}
                  className="mt-6 flex h-11 items-center justify-center gap-2 border border-slate-200 text-sm font-bold text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
                >
                  View Job Details
                  <FiArrowRight />
                </Link>

              </div>
            </section>

            {/* AI MATCH */}

            <section className="border border-indigo-100 bg-indigo-50 p-6">

              <div className="flex items-start gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-indigo-600 text-white">
                  <FiZap className="text-lg" />
                </div>

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                    AI Match
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-950">
                    {match}%
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    Strong compatibility
                  </p>

                </div>

              </div>

              <div className="mt-5 h-2 bg-white">

                <div
                  className="h-full bg-indigo-600"
                  style={{
                    width: `${match}%`,
                  }}
                />

              </div>

              <p className="mt-4 text-xs leading-5 text-slate-500">
                Your current skills appear to align well with this role.
              </p>

            </section>

            {/* CHECKLIST */}

            <section className="border border-slate-200 bg-white p-6">

              <h2 className="text-sm font-bold text-slate-900">
                Application checklist
              </h2>

              <div className="mt-5 space-y-4">

                <ChecklistItem
                  label="Personal details"
                  done
                />

                <ChecklistItem
                  label="Valid email and phone"
                  done
                />

                <ChecklistItem
                  label="Resume uploaded"
                  done={Boolean(resume)}
                />

                <ChecklistItem
                  label="Cover letter"
                  done={Boolean(form.coverLetter)}
                  optional
                />

              </div>

            </section>

          </aside>

        </div>
      </main>

      {/* =====================================================
          FIXED SUBMIT BAR
      ====================================================== */}

      <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-24px)] max-w-7xl -translate-x-1/2">

        <div className="flex flex-col gap-4 border border-slate-200 bg-white p-4 shadow-[0_15px_45px_rgba(15,23,42,0.16)] sm:flex-row sm:items-center sm:justify-between sm:p-5">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-emerald-50 text-emerald-600">
              <FiShield className="text-xl" />
            </div>

            <div>

              <p className="text-base font-bold text-slate-900">
                Ready to submit your application?
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Make sure your details and resume are correct.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="group flex h-[64px] w-full items-center justify-center gap-5 bg-slate-950 px-10 text-base font-bold text-white shadow-lg transition-all duration-200 hover:bg-indigo-600 hover:shadow-xl sm:w-[360px]"
          >

            <span>
              Submit Application
            </span>

            <span className="flex h-10 w-10 items-center justify-center bg-white/10 transition-transform duration-200 group-hover:translate-x-1">
              <FiArrowRight className="text-xl" />
            </span>

          </button>

        </div>

      </div>

    </div>
  );
};

/* ============================================================
   SECTION HEADER
============================================================ */

const SectionHeader = ({
  number,
  title,
  description,
  optional = false,
}) => {
  return (
    <div className="flex items-start gap-4 border-b border-slate-100 px-6 py-5 sm:px-7">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-slate-950 text-[11px] font-bold text-white">
        {number}
      </div>

      <div>

        <div className="flex items-center gap-2">

          <h2 className="text-lg font-bold text-slate-950">
            {title}
          </h2>

          {optional && (
            <span className="text-[10px] font-semibold text-slate-400">
              Optional
            </span>
          )}

        </div>

        <p className="mt-1 text-xs text-slate-400">
          {description}
        </p>

      </div>

    </div>
  );
};

/* ============================================================
   INPUT FIELD
============================================================ */

const InputField = ({
  label,
  required,
  type = "text",
  icon,
  value,
  error,
  onChange,
}) => {
  return (
    <div className="w-full">

      <label className="mb-2 block text-xs font-bold text-slate-700">

        {label}

        {required && (
          <span className="ml-1 text-indigo-600">
            *
          </span>
        )}

      </label>

      <div
        className={`flex h-12 w-full items-center overflow-hidden border bg-slate-50 transition ${
          error
            ? "border-red-300"
            : "border-slate-200 focus-within:border-indigo-500 focus-within:bg-white"
        }`}
      >

        {/* ICON - NO ABSOLUTE POSITION */}

        <div className="flex h-full w-12 shrink-0 items-center justify-center border-r border-slate-200 text-slate-400">

          {icon}

        </div>

        {/* INPUT */}

        <input
          type={type}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="h-full min-w-0 flex-1 border-0 bg-transparent px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />

      </div>

      {error && (
        <p className="mt-1.5 text-[11px] font-semibold text-red-500">
          {error}
        </p>
      )}

    </div>
  );
};

/* ============================================================
   SELECT FIELD
============================================================ */

const SelectField = ({
  label,
  required,
  icon,
  value,
  error,
  options,
  onChange,
}) => {
  return (
    <div className="w-full">

      <label className="mb-2 block text-xs font-bold text-slate-700">

        {label}

        {required && (
          <span className="ml-1 text-indigo-600">
            *
          </span>
        )}

      </label>

      <div
        className={`flex h-12 w-full items-center overflow-hidden border bg-slate-50 transition ${
          error
            ? "border-red-300"
            : "border-slate-200 focus-within:border-indigo-500 focus-within:bg-white"
        }`}
      >

        {/* ICON */}

        <div className="flex h-full w-12 shrink-0 items-center justify-center border-r border-slate-200 text-slate-400">

          {icon}

        </div>

        {/* SELECT */}

        <div className="relative min-w-0 flex-1">

          <select
            value={value}
            onChange={(event) =>
              onChange(event.target.value)
            }
            className="h-full w-full appearance-none border-0 bg-transparent px-4 pr-10 text-sm text-slate-700 outline-none"
          >

            <option value="">
              Select {label.toLowerCase()}
            </option>

            {options.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}

          </select>

          <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />

        </div>

      </div>

      {error && (
        <p className="mt-1.5 text-[11px] font-semibold text-red-500">
          {error}
        </p>
      )}

    </div>
  );
};

/* ============================================================
   SUMMARY ITEM
============================================================ */

const SummaryItem = ({
  icon,
  label,
  value,
  accent = false,
}) => {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-slate-100 bg-slate-50 text-slate-400">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p
          className={`mt-0.5 text-sm font-semibold ${
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
   CHECKLIST
============================================================ */

const ChecklistItem = ({
  label,
  done,
  optional = false,
}) => {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">

        <span
          className={`flex h-5 w-5 items-center justify-center ${
            done
              ? "bg-emerald-50 text-emerald-600"
              : "bg-slate-100 text-slate-300"
          }`}
        >

          {done ? (
            <FiCheck className="text-xs" />
          ) : (
            <span className="h-1.5 w-1.5 bg-slate-300" />
          )}

        </span>

        <span className="text-xs font-medium text-slate-600">
          {label}
        </span>

      </div>

      {optional && (
        <span className="text-[10px] text-slate-400">
          Optional
        </span>
      )}

    </div>
  );
};

/* ============================================================
   JOB TYPE
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

export default ApplyJob;