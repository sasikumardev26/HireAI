import React, { useState } from "react";

import {
  FiArrowRight,
  FiBarChart2,
  FiBriefcase,
  FiCheck,
  FiCheckCircle,
  FiCode,
  FiCompass,
  FiHeart,
  FiMapPin,
  FiSearch,
  FiShield,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { jobs } from "../data/jobs";

const Home = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const featuredJobs = jobs.slice(0, 6);

  const categories = [
    {
      title: "Software Development",
      count: "2,500+ opportunities",
      icon: FiCode,
      large: true,
    },
    {
      title: "Data & Analytics",
      count: "1,200+ opportunities",
      icon: FiBarChart2,
    },
    {
      title: "AI & Machine Learning",
      count: "450+ opportunities",
      icon: FiZap,
    },
    {
      title: "Design & Creative",
      count: "850+ opportunities",
      icon: FiStar,
    },
    {
      title: "Marketing",
      count: "700+ opportunities",
      icon: FiTrendingUp,
    },
    {
      title: "Finance",
      count: "500+ opportunities",
      icon: FiBriefcase,
    },
  ];

  const companies = [
    { name: "Microsoft", short: "MS" },
    { name: "Google", short: "G" },
    { name: "Amazon", short: "A" },
    { name: "Deloitte", short: "D" },
    { name: "Accenture", short: "AC" },
    { name: "Infosys", short: "IN" },
  ];

  const handleSearch = () => {
    navigate("/jobs", {
      state: {
        search,
        location,
      },
    });
  };

  const handlePopularSearch = (value) => {
    setSearch(value);

    navigate("/jobs", {
      state: {
        search: value,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <Navbar />

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#0b1220]">
        {/* Background */}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-100px] top-[-100px] h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[130px]" />

          <div className="absolute right-[-100px] top-[100px] h-[450px] w-[450px] rounded-full bg-cyan-500/5 blur-[150px]" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.9) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-[1320px] px-5 pb-20 pt-12 sm:px-8 lg:pb-28 lg:pt-16">
          {/* =====================================================
              HERO CONTENT
          ===================================================== */}

          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            {/* ===================================================
                LEFT CONTENT
            =================================================== */}

            <div className="order-2 lg:order-1">
              {/* Badge */}

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                  <FiZap size={11} />
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-300">
                  AI-powered career platform
                </span>
              </div>

              {/* Heading */}

              <h1 className="mt-7 max-w-2xl text-[46px] font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-[60px] lg:text-[72px]">
                Your next
                <span className="block text-blue-400">
                  great career
                </span>
                starts here.
              </h1>

              {/* Description */}

              <p className="mt-7 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
                Discover better opportunities, understand your career
                fit, and move forward with intelligent job matching
                powered by HireAI.
              </p>

              {/* Trust */}

              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <FiCheckCircle
                    size={15}
                    className="text-emerald-400"
                  />
                  Verified opportunities
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <FiTarget
                    size={15}
                    className="text-blue-400"
                  />
                  AI career matching
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <FiShield
                    size={15}
                    className="text-slate-400"
                  />
                  Secure profile
                </div>
              </div>

              {/* Small trust statement */}

              <div className="mt-9 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0b1220] bg-slate-700 text-[9px] font-bold text-white">
                    A
                  </div>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0b1220] bg-blue-600 text-[9px] font-bold text-white">
                    S
                  </div>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0b1220] bg-slate-500 text-[9px] font-bold text-white">
                    R
                  </div>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0b1220] bg-white text-[9px] font-bold text-slate-700">
                    +
                  </div>
                </div>

                <p className="text-[10px] font-medium text-slate-500">
                  Trusted by ambitious job seekers
                </p>
              </div>
            </div>

            {/* ===================================================
                RIGHT IMAGE
            =================================================== */}

            <div className="order-1 relative mx-auto w-full max-w-[570px] lg:order-2">
              {/* Image glow */}

              <div className="absolute -inset-5 rounded-[40px] bg-blue-500/10 blur-3xl" />

              {/* Image frame */}

              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-2 shadow-[0_30px_100px_rgba(0,0,0,0.4)]">
                <div className="relative overflow-hidden rounded-[26px]">
                  <img
                    src="/hero-career.png"
                    alt="Professional woman working on career"
                    className="h-[390px] w-full object-cover object-center sm:h-[500px]"
                  />

                  {/* Image overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/90 via-transparent to-transparent" />

                  {/* Bottom image content */}

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <div className="max-w-sm">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300">
                          Career intelligence
                        </span>
                      </div>

                      <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                        Find work that actually fits you.
                      </h2>

                      <p className="mt-2 text-xs leading-5 text-slate-300">
                        Smarter matching. Better opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI MATCH */}

              <div className="absolute -bottom-6 -left-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.25)] sm:-left-6">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <svg
                      className="absolute inset-0 h-full w-full -rotate-90"
                      viewBox="0 0 44 44"
                    >
                      <circle
                        cx="22"
                        cy="22"
                        r="19"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        opacity="0.12"
                      />

                      <circle
                        cx="22"
                        cy="22"
                        r="19"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray="119"
                        strokeDashoffset="5"
                        strokeLinecap="round"
                      />
                    </svg>

                    <span className="text-xs font-black">
                      96%
                    </span>
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      AI compatibility
                    </p>

                    <p className="mt-1 text-sm font-black text-slate-900">
                      Excellent match
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              SEARCH PANEL
          ===================================================== */}

          <div className="relative z-10 mx-auto mt-16 max-w-[1120px]">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.06] p-2 shadow-2xl backdrop-blur-xl">
              <div className="grid gap-2 lg:grid-cols-[1fr_1fr_auto]">
                {/* Search */}

                <div className="flex min-h-[68px] items-center gap-3 rounded-2xl bg-white px-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <FiSearch size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
                      Search
                    </p>

                    <input
                      type="text"
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                        }
                      }}
                      placeholder="Job title, skill or keyword"
                      className="mt-1 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Location */}

                <div className="flex min-h-[68px] items-center gap-3 rounded-2xl bg-white px-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <FiMapPin size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
                      Location
                    </p>

                    <input
                      type="text"
                      value={location}
                      onChange={(e) =>
                        setLocation(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                        }
                      }}
                      placeholder="City, state or remote"
                      className="mt-1 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Button */}

                <button
                  onClick={handleSearch}
                  className="flex min-h-[68px] items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 text-sm font-black text-white transition hover:bg-blue-500 lg:min-w-[170px]"
                >
                  Find Jobs
                  <FiArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Popular searches */}

            <div className="mt-4 flex flex-wrap items-center gap-2 px-2">
              <span className="mr-1 text-[10px] font-bold text-slate-500">
                Popular:
              </span>

              {[
                "Python",
                "React",
                "Django",
                "Data Analyst",
                "JavaScript",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    handlePopularSearch(item)
                  }
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold text-slate-400 transition hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-blue-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUSTED COMPANIES
      ========================================================= */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-5 px-5 py-7 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Opportunities from companies you know
          </p>

          <div className="flex flex-wrap items-center gap-5 sm:gap-8">
            {companies.map((company) => (
              <div
                key={company.name}
                className="flex items-center gap-2.5 opacity-60 transition hover:opacity-100"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-[9px] font-black text-slate-700">
                  {company.short}
                </div>

                <span className="text-xs font-black tracking-tight text-slate-700">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          STATS
      ========================================================= */}

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 divide-x divide-slate-100 md:grid-cols-4">
          {[
            ["10K+", "Active jobs"],
            ["5K+", "Companies"],
            ["25K+", "Job seekers"],
            ["95%", "AI match success"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="px-5 py-9 text-center"
            >
              <p className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                {value}
              </p>

              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          FEATURED JOBS
      ========================================================= */}

      <section className="bg-[#f8fafc] py-20 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-px w-7 bg-blue-600" />

                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
                  Curated opportunities
                </p>
              </div>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-slate-950 sm:text-4xl">
                Roles worth your attention.
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500">
                Explore selected opportunities based on the skills
                employers are hiring for right now.
              </p>
            </div>

            <Link
              to="/jobs"
              className="group inline-flex items-center gap-2 text-sm font-black text-blue-600"
            >
              Explore all jobs

              <FiArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-10 space-y-3">
            {featuredJobs.map((job) => (
              <Link
                key={job.id}
                to={`/job/${job.id}`}
                className="group block rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.07)] sm:p-6"
              >
                <div className="grid items-center gap-5 lg:grid-cols-[auto_1fr_auto_auto]">
                  {/* Logo */}

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0b1220] text-sm font-black text-white">
                    {job.logo ||
                      job.company?.charAt(0)}
                  </div>

                  {/* Main */}

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-sm font-black text-slate-900 transition group-hover:text-blue-600 sm:text-base">
                        {job.title}
                      </h3>

                      {job.verified && (
                        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-bold text-emerald-600">
                          <FiCheck size={9} />
                          Verified
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      {job.company}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="flex items-center gap-1 text-[9px] font-semibold text-slate-400">
                        <FiMapPin size={10} />
                        {job.location}
                      </span>

                      <span className="text-slate-300">
                        •
                      </span>

                      <span className="text-[9px] font-semibold text-slate-400">
                        {job.type}
                      </span>

                      {job.mode && (
                        <>
                          <span className="text-slate-300">
                            •
                          </span>

                          <span className="text-[9px] font-semibold text-slate-400">
                            {job.mode}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Salary */}

                  <div className="hidden min-w-[120px] lg:block">
                    <p className="text-xs font-bold text-slate-400">
                      Salary
                    </p>

                    <p className="mt-1 text-sm font-black text-slate-900">
                      {job.salary}
                    </p>
                  </div>

                  {/* Match */}

                  <div className="flex items-center justify-between gap-4 lg:justify-end">
                    <div>
                      {job.match && (
                        <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[9px] font-black text-emerald-600">
                          {job.match}% Match
                        </span>
                      )}

                      <p className="mt-2 text-[9px] text-slate-400">
                        {job.posted}
                      </p>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition group-hover:bg-blue-600 group-hover:text-white">
                      <FiArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CAREER CATEGORIES
      ========================================================= */}

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Intro */}

            <div>
              <div className="flex items-center gap-2">
                <span className="h-px w-7 bg-blue-600" />

                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
                  Explore careers
                </p>
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Find your space in the future of work.
              </h2>

              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-500">
                From engineering to analytics, discover the career
                paths where your skills can make an impact.
              </p>

              <Link
                to="/jobs"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#0b1220] px-5 py-3 text-xs font-black text-white transition hover:bg-blue-600"
              >
                Explore all categories
                <FiArrowRight size={14} />
              </Link>
            </div>

            {/* Categories */}

            <div className="grid gap-3 sm:grid-cols-2">
              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <Link
                    key={category.title}
                    to="/jobs"
                    className={`group relative overflow-hidden rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                      category.large
                        ? "border-[#0b1220] bg-[#0b1220] text-white sm:col-span-2"
                        : "border-slate-200 bg-slate-50 hover:border-blue-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                          category.large
                            ? "bg-white/10 text-blue-300"
                            : "bg-white text-blue-600"
                        }`}
                      >
                        <Icon size={19} />
                      </div>

                      <FiArrowRight
                        size={16}
                        className={`transition-transform group-hover:translate-x-1 ${
                          category.large
                            ? "text-slate-500"
                            : "text-slate-300"
                        }`}
                      />
                    </div>

                    <div className="mt-8">
                      <h3
                        className={`text-sm font-black ${
                          category.large
                            ? "text-white"
                            : "text-slate-900"
                        }`}
                      >
                        {category.title}
                      </h3>

                      <p className="mt-1 text-[10px] font-semibold text-slate-400">
                        {category.count}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          AI COPILOT
      ========================================================= */}

      <section className="bg-[#0b1220] py-20 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Text */}

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-blue-300">
                <FiZap size={12} />
                HireAI Copilot
              </div>

              <h2 className="mt-6 max-w-lg text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
                Your career search,
                <span className="block text-blue-400">
                  with intelligence built in.
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400">
                HireAI goes beyond keyword matching. Understand your
                fit, discover better roles, improve your profile and
                prepare for what comes next.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Personalized job matches",
                  "Resume & profile insights",
                  "Interview preparation",
                  "Career roadmap",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-xs font-semibold text-slate-300"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/5 text-emerald-400">
                      <FiCheck size={12} />
                    </span>

                    {item}
                  </div>
                ))}
              </div>

              <Link
                to="/ai-assistant"
                className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-xs font-black text-slate-950 transition hover:bg-blue-50"
              >
                Open AI Assistant
                <FiArrowRight size={14} />
              </Link>
            </div>

            {/* AI UI */}

            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.05] p-2">
                <div className="overflow-hidden rounded-[20px] bg-white">
                  {/* Header */}

                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <FiZap size={15} />
                      </div>

                      <div>
                        <p className="text-xs font-black text-slate-900">
                          HireAI Assistant
                        </p>

                        <p className="mt-0.5 text-[9px] font-medium text-emerald-600">
                          ● Online
                        </p>
                      </div>
                    </div>

                    <div className="rounded-full bg-slate-100 px-3 py-1 text-[8px] font-bold text-slate-500">
                      Career Intelligence
                    </div>
                  </div>

                  {/* Chat */}

                  <div className="space-y-5 bg-[#f8fafc] p-5 sm:p-7">
                    {/* User */}

                    <div className="flex justify-end">
                      <div className="max-w-[78%] rounded-2xl rounded-br-md bg-blue-600 px-4 py-3 text-xs font-medium leading-5 text-white">
                        Which roles are the strongest match for my
                        Python and React skills?
                      </div>
                    </div>

                    {/* AI */}

                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                        <FiZap size={11} />
                      </div>

                      <div className="max-w-[82%] rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 text-xs leading-5 text-slate-600 shadow-sm">
                        Based on your skills, Full Stack and Backend
                        opportunities are your strongest matches.
                      </div>
                    </div>

                    {/* Recommendation */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[8px] font-black uppercase tracking-[0.15em] text-slate-400">
                            Best match
                          </p>

                          <p className="mt-1 text-sm font-black text-slate-900">
                            Python Full Stack Developer
                          </p>

                          <p className="mt-1 text-[10px] text-slate-400">
                            Strong fit based on your current profile
                          </p>
                        </div>

                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-black text-emerald-600">
                          96%
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {[
                          "Python",
                          "Django",
                          "React",
                          "MySQL",
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[9px] font-bold text-slate-500"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="text-[9px] font-semibold text-slate-400">
                          Skills match
                        </span>

                        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full w-[96%] rounded-full bg-blue-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-7 bg-blue-600" />

              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
                How it works
              </p>

              <span className="h-px w-7 bg-blue-600" />
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
              A better way to navigate your career.
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              Three simple steps to move from searching to landing
              the right opportunity.
            </p>
          </div>

          <div className="relative mt-14 grid gap-5 md:grid-cols-3">
            {/* Connecting line */}

            <div className="absolute left-[17%] right-[17%] top-7 hidden h-px bg-slate-200 md:block" />

            {[
              {
                number: "01",
                title: "Build your profile",
                text: "Add your skills, experience and career goals to create your professional identity.",
                icon: FiUsers,
              },
              {
                number: "02",
                title: "Get intelligently matched",
                text: "HireAI analyzes opportunities and surfaces roles aligned with your strengths.",
                icon: FiTarget,
              },
              {
                number: "03",
                title: "Apply with confidence",
                text: "Apply faster and use AI-powered tools to improve your career journey.",
                icon: FiCompass,
              },
            ].map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl"
                >
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-white bg-blue-600 text-white shadow-lg shadow-blue-100">
                    <Icon size={19} />
                  </div>

                  <p className="mt-7 text-[10px] font-black uppercase tracking-[0.18em] text-slate-300">
                    Step {step.number}
                  </p>

                  <h3 className="mt-2 text-base font-black text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-slate-500">
                    {step.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          PREMIUM CTA
      ========================================================= */}

      <section className="px-5 pb-20 sm:px-8">
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[30px] bg-[#0b1220] px-7 py-12 sm:px-12 sm:py-16 lg:px-16">
          <div className="absolute right-[-100px] top-[-120px] h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]" />

          <div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300">
                Your next move
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                Stop searching.
                <span className="block text-blue-400">
                  Start moving forward.
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
                Create your HireAI profile and discover opportunities
                built around what you can actually do.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-white px-7 text-xs font-black text-slate-950 transition hover:bg-blue-50"
              >
                Create free profile
                <FiArrowRight size={14} />
              </Link>

              <Link
                to="/jobs"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 text-xs font-black text-white transition hover:bg-white/10"
              >
                Browse jobs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="bg-[#070c16]">
        <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8">
          <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
            {/* Brand */}

            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <FiZap size={17} />
                </div>

                <span className="text-xl font-black tracking-tight text-white">
                  Hire<span className="text-blue-400">AI</span>
                </span>
              </Link>

              <p className="mt-5 max-w-sm text-xs leading-6 text-slate-500">
                An intelligent career platform designed to help
                ambitious people discover better opportunities and
                build stronger careers.
              </p>

              <div className="mt-6 flex items-center gap-2 text-[10px] font-semibold text-slate-600">
                <FiHeart
                  size={11}
                  className="text-blue-400"
                />
                Built for ambitious careers
              </div>
            </div>

            {/* Platform */}

            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.18em] text-white">
                Platform
              </h3>

              <div className="mt-5 space-y-3">
                <Link
                  to="/jobs"
                  className="block text-xs text-slate-500 transition hover:text-white"
                >
                  Find Jobs
                </Link>

                <Link
                  to="/companies"
                  className="block text-xs text-slate-500 transition hover:text-white"
                >
                  Companies
                </Link>

                <Link
                  to="/ai-assistant"
                  className="block text-xs text-slate-500 transition hover:text-white"
                >
                  AI Assistant
                </Link>
              </div>
            </div>

            {/* Career */}

            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.18em] text-white">
                Career
              </h3>

              <div className="mt-5 space-y-3">
                <Link
                  to="/profile"
                  className="block text-xs text-slate-500 transition hover:text-white"
                >
                  My Profile
                </Link>

                <Link
                  to="/dashboard"
                  className="block text-xs text-slate-500 transition hover:text-white"
                >
                  Dashboard
                </Link>

                <Link
                  to="/jobs"
                  className="block text-xs text-slate-500 transition hover:text-white"
                >
                  Job Matches
                </Link>
              </div>
            </div>

            {/* Account */}

            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.18em] text-white">
                Account
              </h3>

              <div className="mt-5 space-y-3">
                <Link
                  to="/login"
                  className="block text-xs text-slate-500 transition hover:text-white"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="block text-xs text-slate-500 transition hover:text-white"
                >
                  Create Account
                </Link>

                <Link
                  to="/forgot-password"
                  className="block text-xs text-slate-500 transition hover:text-white"
                >
                  Forgot Password
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom */}

          <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/5 pt-6 text-[10px] text-slate-600 sm:flex-row">
            <p>© 2026 HireAI. All rights reserved.</p>

            <div className="flex items-center gap-2">
              <FiShield size={11} />
              Intelligent career platform
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;