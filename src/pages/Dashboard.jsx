import React, { useMemo, useState } from "react";
import {
  FiActivity,
  FiArrowRight,
  FiAward,
  FiBarChart2,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiChevronRight,
  FiFileText,
  FiHeart,
  FiMapPin,
  FiMoreHorizontal,
  FiSearch,
  FiShield,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUser,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import { jobs } from "../data/jobs";
import { getSavedJobs } from "../utils/savedJobs";

const Dashboard = () => {
  // =====================================================
  // USER
  // =====================================================

  const storedUser = localStorage.getItem("hireaiUser");

  const user = useMemo(() => {
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  }, [storedUser]);

  const userName =
    user?.firstName ||
    user?.name?.split(" ")[0] ||
    "Sasikumar";

  // =====================================================
  // SAVED JOBS
  // =====================================================

  const savedJobs = useMemo(() => {
    return getSavedJobs();
  }, []);

  // =====================================================
  // APPLICATIONS
  // =====================================================

  const applications = useMemo(() => {
    try {
      return JSON.parse(
        localStorage.getItem("hireaiApplications") || "[]"
      );
    } catch {
      return [];
    }
  }, []);

  // =====================================================
  // STATE
  // =====================================================

  const [activeTab, setActiveTab] = useState("overview");

  // =====================================================
  // RECOMMENDED JOBS
  // =====================================================

  const recommendedJobs = useMemo(() => {
    return [...jobs]
      .sort(
        (a, b) =>
          Number(b.match || 0) -
          Number(a.match || 0)
      )
      .slice(0, 4);
  }, []);

  // =====================================================
  // PROFILE SCORE
  // =====================================================

  const profileScore = useMemo(() => {
    let score = 45;

    if (user?.firstName || user?.name) score += 10;
    if (user?.email) score += 10;
    if (user?.phone) score += 10;
    if (user?.location) score += 10;
    if (applications.length > 0) score += 5;
    if (savedJobs.length > 0) score += 5;

    return Math.min(score, 100);
  }, [user, applications.length, savedJobs.length]);

  // =====================================================
  // CAREER SCORE
  // =====================================================

  const careerScore = Math.min(
    86 + (applications.length > 0 ? 2 : 0),
    100
  );

  // =====================================================
  // APPLICATION STATUS
  // =====================================================

  const statusCounts = useMemo(() => {
    const counts = {
      Applied: 0,
      Shortlisted: 0,
      Interview: 0,
      Accepted: 0,
    };

    applications.forEach((application) => {
      const status = application.status;

      if (status === "Applied") counts.Applied++;
      if (status === "Shortlisted") counts.Shortlisted++;
      if (status === "Interview") counts.Interview++;
      if (status === "Accepted") counts.Accepted++;
    });

    return counts;
  }, [applications]);

  // =====================================================
  // GREETING
  // =====================================================

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";

    return "Good evening";
  };

  // =====================================================
  // PROFILE CHECKLIST
  // =====================================================

  const scoreItems = [
    {
      title: "Basic information",
      completed: true,
    },
    {
      title: "Skills",
      completed: true,
    },
    {
      title: "Professional links",
      completed: true,
    },
    {
      title: "Resume",
      completed: profileScore >= 90,
    },
    {
      title: "Career preferences",
      completed: profileScore >= 95,
    },
  ];

  // =====================================================
  // STATS
  // =====================================================

  const stats = [
    {
      title: "Applications",
      value: applications.length,
      change: applications.length
        ? "+1 this week"
        : "Start applying",
      icon: FiFileText,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      title: "Saved Jobs",
      value: savedJobs.length,
      change: "Jobs saved",
      icon: FiHeart,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-500",
    },
    {
      title: "Profile Score",
      value: `${profileScore}%`,
      change:
        profileScore >= 80
          ? "Looking strong"
          : "Needs improvement",
      icon: FiUser,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "AI Matches",
      value: jobs.filter(
        (job) => Number(job.match || 0) >= 80
      ).length,
      change: "Strong matches",
      icon: FiTarget,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
  ];

  // =====================================================
  // QUICK ACTIONS
  // =====================================================

  const quickActions = [
    {
      title: "Update Profile",
      description: "Improve recruiter visibility",
      icon: FiUser,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      link: "/profile",
    },
    {
      title: "Search Jobs",
      description: "Discover new opportunities",
      icon: FiSearch,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      link: "/jobs",
    },
    {
      title: "Ask AI Assistant",
      description: "Get personalized guidance",
      icon: FiZap,
      color: "text-violet-600",
      bg: "bg-violet-50",
      link: "/ai-assistant",
    },
    {
      title: "Explore Companies",
      description: "Find your next workplace",
      icon: FiUsers,
      color: "text-amber-600",
      bg: "bg-amber-50",
      link: "/companies",
    },
  ];

  // =====================================================
  // SKILLS
  // =====================================================

  const careerSkills = [
    {
      name: "Python",
      value: 92,
    },
    {
      name: "Django",
      value: 88,
    },
    {
      name: "React",
      value: 84,
    },
    {
      name: "JavaScript",
      value: 82,
    },
    {
      name: "MySQL",
      value: 78,
    },
  ];

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Shortlisted":
        return "bg-emerald-50 text-emerald-600";

      case "Interview":
        return "bg-amber-50 text-amber-600";

      case "Accepted":
        return "bg-violet-50 text-violet-600";

      case "Rejected":
        return "bg-red-50 text-red-600";

      default:
        return "bg-indigo-50 text-indigo-600";
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-[1550px] px-4 pb-16 sm:px-6 lg:px-8">

        {/* =================================================
            HERO
        ================================================= */}

        <section className="relative mt-6 overflow-hidden rounded-[30px] bg-[#080b25] shadow-[0_25px_70px_rgba(15,23,42,0.16)]">

          <div className="absolute -left-24 -top-28 h-[350px] w-[350px] rounded-full bg-indigo-600/25 blur-[100px]" />

          <div className="absolute right-0 top-0 h-[350px] w-[350px] rounded-full bg-violet-600/20 blur-[100px]" />

          <div className="absolute bottom-0 left-1/2 h-[250px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative z-10 grid gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[1fr_390px] lg:px-10 lg:py-12">

            {/* HERO LEFT */}

            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2.5 text-xs font-black uppercase tracking-[0.15em] text-indigo-300">
                <FiZap />
                AI Career Dashboard
              </div>

              <h1 className="text-4xl font-black tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
                {getGreeting()},
                <span className="ml-2 bg-gradient-to-r from-indigo-300 via-violet-300 to-blue-300 bg-clip-text text-transparent">
                  {userName}
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                Track your applications, discover
                AI-matched opportunities and keep your
                career profile ready for recruiters.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <Link
                  to="/jobs"
                  className="group inline-flex h-12 items-center gap-2 rounded-xl bg-indigo-600 px-6 text-sm font-black text-white shadow-lg shadow-indigo-900/30 transition hover:bg-indigo-500"
                >
                  <FiSearch size={18} />
                  Find Jobs
                  <FiArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/ai-assistant"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-6 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  <FiZap
                    className="text-indigo-300"
                    size={18}
                  />
                  Ask AI
                </Link>

              </div>
            </div>

            {/* CAREER SCORE */}

            <div className="rounded-[24px] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-xl">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-500">
                    AI Career Score
                  </p>

                  <div className="mt-2 flex items-end gap-1">
                    <span className="text-5xl font-black text-white">
                      {careerScore}
                    </span>

                    <span className="mb-1 text-base font-bold text-slate-500">
                      /100
                    </span>
                  </div>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                  <FiTarget className="text-xl" />
                </div>

              </div>

              <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-violet-400"
                  style={{
                    width: `${careerScore}%`,
                  }}
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Better than 72% of profiles
                </span>

                <span className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                  <FiTrendingUp />
                  +8%
                </span>
              </div>

              <Link
                to="/profile"
                className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/[0.08]"
              >
                Improve your score
                <FiArrowRight size={17} />
              </Link>

            </div>
          </div>
        </section>

        {/* =================================================
            TABS
        ================================================= */}

        <div className="mt-6 flex items-center gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">

          {[
            {
              id: "overview",
              label: "Overview",
              icon: FiActivity,
            },
            {
              id: "applications",
              label: "Applications",
              icon: FiFileText,
            },
            {
              id: "saved",
              label: "Saved Jobs",
              icon: FiHeart,
            },
            {
              id: "career",
              label: "Career Insights",
              icon: FiTrendingUp,
            },
          ].map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex h-11 shrink-0 items-center gap-2 rounded-xl px-5 text-sm font-bold transition ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={17} />
                {tab.label}
              </button>
            );
          })}

        </div>

        {/* =================================================
            STATS
        ================================================= */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >

                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-sm font-bold text-slate-400">
                      {stat.title}
                    </p>

                    <p className="mt-2 text-4xl font-black tracking-tight text-slate-950">
                      {stat.value}
                    </p>
                  </div>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor}`}
                  >
                    <Icon className="text-xl" />
                  </div>

                </div>

                <div className="mt-5 text-xs font-bold text-slate-400">
                  {stat.change}
                </div>

              </div>
            );
          })}

        </section>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_370px]">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-6">

            {/* =================================================
                AI RECOMMENDATIONS
            ================================================= */}

            <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

              <div className="flex flex-wrap items-end justify-between gap-4">

                <div>

                  <div className="flex items-center gap-2">

                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <FiZap size={18} />
                    </span>

                    <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">
                      AI Recommendations
                    </p>

                  </div>

                  <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                    Jobs picked for you
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    Based on your skills, interests and career profile.
                  </p>

                </div>

                <Link
                  to="/jobs"
                  className="flex items-center gap-1 text-sm font-black text-indigo-600 hover:text-indigo-700"
                >
                  View all
                  <FiArrowRight />
                </Link>

              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">

                {recommendedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg"
                  >

                    <div className="absolute right-5 top-5 flex items-center gap-1 text-xs font-black text-emerald-600">
                      <FiStar size={14} />
                      {job.match || 80}%
                    </div>

                    <div className="flex items-start gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-base font-black text-indigo-600">
                        {job.logo ||
                          job.company?.charAt(0) ||
                          "J"}
                      </div>

                      <div className="min-w-0 pr-16">

                        <h3 className="truncate text-base font-black text-slate-950 sm:text-lg">
                          {job.title}
                        </h3>

                        <p className="mt-1 text-sm font-medium text-slate-500">
                          {job.company}
                        </p>

                      </div>

                    </div>

                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-400">

                      <span className="flex items-center gap-1.5">
                        <FiMapPin size={14} />
                        {job.location}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <FiBriefcase size={14} />
                        {job.type}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <FiUser size={14} />
                        {job.experience}
                      </span>

                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">

                      {(job.skills || [])
                        .slice(0, 4)
                        .map((skill) => (
                          <span
                            key={skill}
                            className="rounded-lg bg-slate-50 px-3 py-1.5 text-[11px] font-bold text-slate-500"
                          >
                            {skill}
                          </span>
                        ))}

                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">

                      <span className="text-sm font-black text-slate-700">
                        {job.salary || "Competitive"}
                      </span>

                      <Link
                        to={`/job/${job.id}`}
                        className="flex items-center gap-1 text-sm font-black text-indigo-600 transition group-hover:gap-2"
                      >
                        View Job
                        <FiArrowRight />
                      </Link>

                    </div>

                  </div>
                ))}

              </div>

            </section>

            {/* =================================================
                APPLICATION TRACKER
            ================================================= */}

            <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

              <div className="flex items-center justify-between">

                <div>

                  <div className="flex items-center gap-2">

                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                      <FiBarChart2 size={18} />
                    </span>

                    <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-600">
                      Application Tracking
                    </p>

                  </div>

                  <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
                    Your application pipeline
                  </h2>

                </div>

                <Link
                  to="/jobs"
                  className="hidden items-center gap-1 text-sm font-black text-indigo-600 sm:flex"
                >
                  Apply to more
                  <FiArrowRight />
                </Link>

              </div>

              <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">

                {[
                  {
                    label: "Applied",
                    value: statusCounts.Applied,
                    icon: FiFileText,
                    bg: "bg-indigo-50",
                    color: "text-indigo-600",
                  },
                  {
                    label: "Shortlisted",
                    value: statusCounts.Shortlisted,
                    icon: FiCheckCircle,
                    bg: "bg-emerald-50",
                    color: "text-emerald-600",
                  },
                  {
                    label: "Interview",
                    value: statusCounts.Interview,
                    icon: FiCalendar,
                    bg: "bg-amber-50",
                    color: "text-amber-600",
                  },
                  {
                    label: "Accepted",
                    value: statusCounts.Accepted,
                    icon: FiAward,
                    bg: "bg-violet-50",
                    color: "text-violet-600",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5"
                    >

                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.bg} ${item.color}`}
                      >
                        <Icon size={18} />
                      </div>

                      <p className="mt-4 text-3xl font-black text-slate-950">
                        {item.value}
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-400">
                        {item.label}
                      </p>

                    </div>
                  );
                })}

              </div>

              <div className="mt-7">

                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-black text-slate-700">
                    Recent applications
                  </p>

                  <span className="text-xs font-medium text-slate-400">
                    Latest activity
                  </span>
                </div>

                {applications.length > 0 ? (
                  <div className="space-y-3">

                    {applications
                      .slice(0, 4)
                      .map((application) => (
                        <div
                          key={application.id}
                          className="flex items-center justify-between rounded-xl border border-slate-100 px-5 py-4"
                        >

                          <div className="flex min-w-0 items-center gap-4">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                              <FiFileText size={18} />
                            </div>

                            <div className="min-w-0">

                              <p className="truncate text-sm font-black text-slate-800">
                                {application.jobTitle}
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                {application.company}
                              </p>

                            </div>

                          </div>

                          <div className="ml-3 flex shrink-0 items-center gap-4">

                            <span className="hidden text-xs text-slate-400 sm:block">
                              {application.appliedDate || "Recently"}
                            </span>

                            <span
                              className={`rounded-full px-3 py-1.5 text-[11px] font-black ${getStatusStyle(
                                application.status
                              )}`}
                            >
                              {application.status || "Applied"}
                            </span>

                          </div>

                        </div>
                      ))}

                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-10 text-center">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
                      <FiFileText size={22} />
                    </div>

                    <p className="mt-4 text-base font-black text-slate-700">
                      No applications yet
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Start applying to jobs that match your profile.
                    </p>

                    <Link
                      to="/jobs"
                      className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-bold text-white"
                    >
                      Browse Jobs
                      <FiArrowRight />
                    </Link>

                  </div>
                )}

              </div>

            </section>

            {/* =================================================
                SAVED JOBS
            ================================================= */}

            <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

              <div className="flex items-center justify-between">

                <div>

                  <div className="flex items-center gap-2">

                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-rose-500">
                      <FiHeart size={18} />
                    </span>

                    <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-500">
                      Saved Jobs
                    </p>

                  </div>

                  <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
                    Opportunities you saved
                  </h2>

                </div>

                <Link
                  to="/jobs"
                  className="flex items-center gap-1 text-sm font-black text-indigo-600"
                >
                  Find more
                  <FiArrowRight />
                </Link>

              </div>

              {savedJobs.length > 0 ? (
                <div className="mt-6 grid gap-4 md:grid-cols-2">

                  {savedJobs.slice(0, 4).map((job) => (
                    <div
                      key={job.id}
                      className="group rounded-2xl border border-slate-200 p-5 transition hover:border-indigo-200 hover:shadow-md"
                    >

                      <div className="flex items-start justify-between">

                        <div className="flex items-center gap-4">

                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-sm font-black text-indigo-600">
                            {job.logo ||
                              job.company?.charAt(0)}
                          </div>

                          <div>
                            <p className="text-sm font-black text-slate-900">
                              {job.title}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {job.company}
                            </p>
                          </div>

                        </div>

                        <FiHeart
                          size={18}
                          className="fill-rose-500 text-rose-500"
                        />

                      </div>

                      <div className="mt-5 flex items-center gap-5 text-xs text-slate-400">

                        <span className="flex items-center gap-1.5">
                          <FiMapPin size={14} />
                          {job.location}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <FiBriefcase size={14} />
                          {job.type}
                        </span>

                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

                        <span className="text-sm font-bold text-slate-600">
                          {job.salary}
                        </span>

                        <Link
                          to={`/job/${job.id}`}
                          className="flex items-center gap-1 text-sm font-black text-indigo-600"
                        >
                          View
                          <FiArrowRight />
                        </Link>

                      </div>

                    </div>
                  ))}

                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">

                  <FiHeart className="mx-auto text-3xl text-slate-300" />

                  <p className="mt-4 text-base font-bold text-slate-600">
                    No saved jobs
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Save interesting jobs to review them later.
                  </p>

                </div>
              )}

            </section>

          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside className="space-y-6">

            {/* PROFILE STRENGTH */}

            <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">

              <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-blue-600 p-7 text-white">

                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-200">
                      Profile Strength
                    </p>

                    <div className="mt-2 flex items-end gap-1">
                      <span className="text-5xl font-black">
                        {profileScore}%
                      </span>
                    </div>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                    <FiShield size={20} />
                  </div>

                </div>

                <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{
                      width: `${profileScore}%`,
                    }}
                  />
                </div>

                <p className="mt-4 text-xs leading-5 text-indigo-100">
                  Complete your resume and career preferences
                  to improve recruiter visibility.
                </p>

              </div>

              <div className="p-6">

                <div className="space-y-4">

                  {scoreItems.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between"
                    >

                      <span className="text-sm font-medium text-slate-600">
                        {item.title}
                      </span>

                      {item.completed ? (
                        <FiCheckCircle
                          size={18}
                          className="text-emerald-500"
                        />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-slate-200" />
                      )}

                    </div>
                  ))}

                </div>

                <Link
                  to="/profile"
                  className="mt-6 flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-black text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  Improve Profile
                  <FiArrowRight />
                </Link>

              </div>

            </section>

            {/* QUICK ACTIONS */}

            <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">

              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                Career Tools
              </p>

              <h2 className="mt-2 text-xl font-black text-slate-950">
                Quick actions
              </h2>

              <div className="mt-5 space-y-2">

                {quickActions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <Link
                      key={action.title}
                      to={action.link}
                      className="group flex items-center gap-4 rounded-xl p-3 transition hover:bg-slate-50"
                    >

                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${action.bg} ${action.color}`}
                      >
                        <Icon size={18} />
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="text-sm font-black text-slate-700">
                          {action.title}
                        </p>

                        <p className="mt-1 truncate text-[11px] text-slate-400">
                          {action.description}
                        </p>

                      </div>

                      <FiChevronRight
                        size={17}
                        className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500"
                      />

                    </Link>
                  );
                })}

              </div>

            </section>

            {/* SKILL STRENGTH */}

            <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                    Skill Strength
                  </p>

                  <h2 className="mt-2 text-xl font-black text-slate-950">
                    Your top skills
                  </h2>
                </div>

                <FiTrendingUp
                  size={20}
                  className="text-indigo-500"
                />

              </div>

              <div className="mt-6 space-y-5">

                {careerSkills.map((skill) => (
                  <div key={skill.name}>

                    <div className="mb-2 flex items-center justify-between">

                      <span className="text-sm font-bold text-slate-600">
                        {skill.name}
                      </span>

                      <span className="text-xs font-black text-slate-400">
                        {skill.value}%
                      </span>

                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                        style={{
                          width: `${skill.value}%`,
                        }}
                      />

                    </div>

                  </div>
                ))}

              </div>

              <Link
                to="/profile"
                className="mt-6 flex items-center justify-center gap-1 text-xs font-black text-indigo-600"
              >
                Manage skills
                <FiArrowRight />
              </Link>

            </section>

            {/* AI CAREER TIP */}

            <section className="rounded-[24px] border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                  <FiZap size={19} />
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-500">
                    AI Career Tip
                  </p>

                  <p className="text-base font-black text-slate-900">
                    Your next move
                  </p>
                </div>

              </div>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                Profiles with a complete resume and relevant
                skills usually get stronger job matches. Add
                your missing career details to improve your
                visibility.
              </p>

              <Link
                to="/ai-assistant"
                className="mt-5 flex items-center justify-between rounded-xl bg-white px-5 py-3.5 text-sm font-black text-indigo-600 shadow-sm ring-1 ring-indigo-100"
              >
                Ask AI for advice
                <FiArrowRight />
              </Link>

            </section>

            {/* RECENT ACTIVITY */}

            <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                    Activity
                  </p>

                  <h2 className="mt-2 text-xl font-black text-slate-950">
                    Recent activity
                  </h2>
                </div>

                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-700"
                >
                  <FiMoreHorizontal size={20} />
                </button>

              </div>

              <div className="mt-6 space-y-5">

                {applications.length > 0 ? (
                  applications
                    .slice(0, 3)
                    .map((application, index) => (
                      <div
                        key={application.id}
                        className="flex gap-4"
                      >

                        <div className="relative">

                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                            <FiFileText size={17} />
                          </div>

                          {index <
                            Math.min(
                              applications.length - 1,
                              2
                            ) && (
                            <div className="absolute left-1/2 top-10 h-6 w-px -translate-x-1/2 bg-slate-200" />
                          )}

                        </div>

                        <div className="min-w-0">

                          <p className="text-sm font-bold text-slate-700">
                            Applied for{" "}
                            {application.jobTitle}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {application.company} •{" "}
                            {application.appliedDate ||
                              "Recently"}
                          </p>

                        </div>

                      </div>
                    ))
                ) : (
                  <>
                    <div className="flex gap-4">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <FiUser size={17} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-700">
                          Profile created
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Your HireAI journey started
                        </p>
                      </div>

                    </div>

                    <div className="flex gap-4">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <FiZap size={17} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-700">
                          AI matching activated
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Personalized jobs are ready
                        </p>
                      </div>

                    </div>
                  </>
                )}

              </div>

            </section>

          </aside>

        </div>

        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <section className="mt-6 overflow-hidden rounded-[26px] bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 p-7 text-white shadow-xl shadow-indigo-200 sm:p-10">

          <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">

            <div className="max-w-2xl">

              <div className="mb-4 flex items-center gap-2 text-indigo-200">
                <FiZap size={17} />

                <span className="text-xs font-black uppercase tracking-[0.16em]">
                  HireAI Career Intelligence
                </span>
              </div>

              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Ready for your next opportunity?
              </h2>

              <p className="mt-3 text-sm leading-7 text-indigo-100 sm:text-base">
                Let AI help you discover better jobs, improve
                your profile and prepare for your next career
                move.
              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              <Link
                to="/ai-assistant"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-black text-indigo-600 shadow-lg transition hover:bg-indigo-50"
              >
                <FiZap size={18} />
                Talk to AI
                <FiArrowRight size={17} />
              </Link>

              <Link
                to="/jobs"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 text-sm font-bold text-white transition hover:bg-white/15"
              >
                Explore Jobs
              </Link>

            </div>

          </div>

        </section>

      </main>
    </div>
  );
};

export default Dashboard;