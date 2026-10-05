import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  FiArrowRight,
  FiAward,
  FiBarChart2,
  FiBriefcase,
  FiCheckCircle,
  FiChevronDown,
  FiClock,
  FiHeart,
  FiMapPin,
  FiSearch,
  FiStar,
  FiTrendingUp,
  FiUsers,
  FiX,
  FiZap,
} from "react-icons/fi";

/* =========================================================
   COMPANY DATA
========================================================= */

const companies = [
  {
    id: 1,
    name: "TechNova Solutions",
    logo: "T",
    industry: "Information Technology",
    location: "Bangalore, India",
    jobs: 24,
    rating: 4.8,
    employees: "1K-5K",
    founded: "2015",
    description:
      "Building scalable digital products and intelligent technology solutions for modern businesses.",
    tags: ["Python", "React", "Django"],
    verified: true,
    hiring: true,
    match: 96,
  },
  {
    id: 2,
    name: "Innovate Labs",
    logo: "I",
    industry: "Software Development",
    location: "Chennai, India",
    jobs: 18,
    rating: 4.7,
    employees: "500-1K",
    founded: "2018",
    description:
      "A product-focused technology company creating modern web and cloud applications.",
    tags: ["React", "Node.js", "AWS"],
    verified: true,
    hiring: true,
    match: 91,
  },
  {
    id: 3,
    name: "CloudStack Technologies",
    logo: "C",
    industry: "Cloud & SaaS",
    location: "Hyderabad, India",
    jobs: 31,
    rating: 4.9,
    employees: "1K-5K",
    founded: "2016",
    description:
      "Helping companies transform their infrastructure with cloud-native platforms and automation.",
    tags: ["AWS", "Docker", "Python"],
    verified: true,
    hiring: true,
    match: 89,
  },
  {
    id: 4,
    name: "DigitalWorks",
    logo: "D",
    industry: "Digital Solutions",
    location: "Coimbatore, India",
    jobs: 12,
    rating: 4.5,
    employees: "200-500",
    founded: "2020",
    description:
      "Delivering innovative software solutions for startups and growing enterprises.",
    tags: ["JavaScript", "React", "UI/UX"],
    verified: true,
    hiring: false,
    match: 87,
  },
  {
    id: 5,
    name: "FinEdge Technologies",
    logo: "F",
    industry: "FinTech",
    location: "Mumbai, India",
    jobs: 27,
    rating: 4.6,
    employees: "1K-5K",
    founded: "2014",
    description:
      "Creating secure financial technology products that simplify digital payments and banking.",
    tags: ["Python", "Django", "FinTech"],
    verified: true,
    hiring: true,
    match: 86,
  },
  {
    id: 6,
    name: "NextGen AI",
    logo: "N",
    industry: "Artificial Intelligence",
    location: "Pune, India",
    jobs: 16,
    rating: 4.9,
    employees: "500-1K",
    founded: "2019",
    description:
      "Building AI-powered products that help organizations automate decisions and workflows.",
    tags: ["AI", "Python", "Machine Learning"],
    verified: true,
    hiring: true,
    match: 94,
  },
  {
    id: 7,
    name: "WebSphere Digital",
    logo: "W",
    industry: "Web Technology",
    location: "Delhi, India",
    jobs: 21,
    rating: 4.4,
    employees: "500-1K",
    founded: "2017",
    description:
      "A digital engineering company focused on high-performance web experiences.",
    tags: ["React", "JavaScript", "Next.js"],
    verified: true,
    hiring: false,
    match: 84,
  },
  {
    id: 8,
    name: "DataCore Systems",
    logo: "D",
    industry: "Data & Analytics",
    location: "Bangalore, India",
    jobs: 29,
    rating: 4.8,
    employees: "1K-5K",
    founded: "2013",
    description:
      "Helping organizations turn complex data into actionable business intelligence.",
    tags: ["Python", "SQL", "Power BI"],
    verified: true,
    hiring: true,
    match: 82,
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

const Companies = () => {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All Industries");
  const [sortBy, setSortBy] = useState("Recommended");
  const [followed, setFollowed] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  /* =====================================================
     FOLLOW COMPANY
  ===================================================== */

  const toggleFollow = (id) => {
    setFollowed((previous) =>
      previous.includes(id)
        ? previous.filter((companyId) => companyId !== id)
        : [...previous, id]
    );
  };

  /* =====================================================
     FILTER + SORT
  ===================================================== */

  const filteredCompanies = useMemo(() => {
    let result = companies.filter((company) => {
      const keyword = search.toLowerCase().trim();

      const searchMatch =
        keyword === "" ||
        company.name.toLowerCase().includes(keyword) ||
        company.industry.toLowerCase().includes(keyword) ||
        company.location.toLowerCase().includes(keyword) ||
        company.tags.some((tag) =>
          tag.toLowerCase().includes(keyword)
        );

      const industryMatch =
        industry === "All Industries" ||
        company.industry === industry;

      return searchMatch && industryMatch;
    });

    if (sortBy === "Top Rated") {
      result = [...result].sort(
        (a, b) => b.rating - a.rating
      );
    }

    if (sortBy === "Most Jobs") {
      result = [...result].sort(
        (a, b) => b.jobs - a.jobs
      );
    }

    if (sortBy === "Hiring Now") {
      result = [...result].sort(
        (a, b) =>
          Number(b.hiring) - Number(a.hiring)
      );
    }

    if (sortBy === "Best Match") {
      result = [...result].sort(
        (a, b) => b.match - a.match
      );
    }

    return result;
  }, [search, industry, sortBy]);

  /* =====================================================
     CLEAR FILTERS
  ===================================================== */

  const clearFilters = () => {
    setSearch("");
    setIndustry("All Industries");
    setSortBy("Recommended");
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-900">

      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar />

      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative overflow-hidden bg-[#080b20] text-white">

        <div className="pointer-events-none absolute -left-40 -top-40 h-[430px] w-[430px] rounded-full bg-indigo-600/20 blur-[110px]" />

        <div className="pointer-events-none absolute -bottom-48 right-0 h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[120px]" />

        <div className="pointer-events-none absolute right-[25%] top-[15%] h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1450px] px-5 py-14 sm:px-7 lg:px-10 lg:py-20">

          <div className="max-w-4xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-indigo-300">

              <FiZap size={12} />

              Company intelligence

            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-[-0.04em] sm:text-5xl lg:text-6xl">

              Discover companies

              <span className="block text-indigo-400">
                where your career fits.
              </span>

            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Explore verified employers, compare workplaces,
              discover open roles and find companies aligned
              with your skills and career goals.
            </p>

          </div>

          {/* SEARCH */}

          <div className="mt-9 max-w-5xl">

            <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.06] p-2 shadow-2xl backdrop-blur-xl md:flex-row">

              <div className="flex min-h-[58px] flex-1 items-center rounded-xl bg-white px-5">

                <FiSearch
                  size={19}
                  className="mr-3 shrink-0 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search companies, industries, skills..."
                  className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="text-slate-400 transition hover:text-slate-700"
                  >
                    <FiX size={17} />
                  </button>
                )}

              </div>

              <button
                type="button"
                onClick={() => {
                  document
                    .getElementById("company-results")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
                className="flex min-h-[58px] items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 text-sm font-bold text-white transition hover:bg-indigo-500"
              >
                Search Companies
                <FiArrowRight size={16} />
              </button>

            </div>

          </div>

          {/* STATS */}

          <div className="mt-10 grid max-w-4xl grid-cols-3 border-t border-white/10 pt-8">

            <HeroStat
              value="8K+"
              label="Companies"
            />

            <HeroStat
              value="42K+"
              label="Open Jobs"
            />

            <HeroStat
              value="4.8/5"
              label="Average Rating"
            />

          </div>

        </div>

      </section>

      {/* =================================================
          TRENDING INDUSTRIES
      ================================================= */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-[1450px] px-5 py-4 sm:px-7 lg:px-10">

          <div className="flex items-center gap-4 overflow-x-auto">

            <span className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Trending
            </span>

            {[
              "Information Technology",
              "Artificial Intelligence",
              "FinTech",
              "Cloud & SaaS",
              "Data & Analytics",
            ].map((item) => (

              <button
                key={item}
                type="button"
                onClick={() => setIndustry(item)}
                className={`shrink-0 rounded-lg border px-4 py-2 text-[11px] font-semibold transition ${
                  industry === item
                    ? "border-indigo-200 bg-indigo-50 text-indigo-600"
                    : "border-slate-200 bg-white text-slate-500 hover:border-indigo-200 hover:text-indigo-600"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

      </section>

      {/* =================================================
          MAIN
      ================================================= */}

      <main
        id="company-results"
        className="mx-auto max-w-[1450px] px-5 py-10 sm:px-7 lg:px-10 lg:py-12"
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

          <div>

            <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-indigo-600">
              Company directory
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Explore top companies
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {filteredCompanies.length} companies available
              for your next opportunity.
            </p>

          </div>

          {/* FILTER CONTROLS */}

          <div className="flex flex-col gap-3 sm:flex-row">

            <button
              type="button"
              onClick={() =>
                setShowFilters(!showFilters)
              }
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 lg:hidden"
            >
              Filters

              <FiChevronDown
                className={`transition ${
                  showFilters
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            <div
              className={`flex flex-col gap-3 sm:flex-row ${
                showFilters
                  ? "flex"
                  : "hidden lg:flex"
              }`}
            >

              <SelectBox
                value={industry}
                onChange={setIndustry}
                options={[
                  "All Industries",
                  "Information Technology",
                  "Software Development",
                  "Cloud & SaaS",
                  "Digital Solutions",
                  "FinTech",
                  "Artificial Intelligence",
                  "Web Technology",
                  "Data & Analytics",
                ]}
              />

              <SelectBox
                value={sortBy}
                onChange={setSortBy}
                options={[
                  "Recommended",
                  "Best Match",
                  "Top Rated",
                  "Most Jobs",
                  "Hiring Now",
                ]}
              />

            </div>

          </div>

        </div>

        {/* =================================================
            AI RECOMMENDATION
        ================================================= */}

        <section className="mt-8 overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-[0_5px_25px_rgba(79,70,229,0.04)]">

          <div className="flex flex-col lg:flex-row lg:items-stretch">

            <div className="flex flex-1 gap-4 p-6">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                <FiZap size={19} />
              </div>

              <div>

                <div className="flex flex-wrap items-center gap-2">

                  <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-indigo-600">
                    AI recommendation
                  </p>

                  <span className="rounded-md bg-emerald-50 px-2 py-1 text-[8px] font-bold uppercase tracking-wide text-emerald-600">
                    Personalized
                  </span>

                </div>

                <h3 className="mt-2 text-lg font-black text-slate-950">
                  Companies matching your profile
                </h3>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
                  Based on your Python, Django, React and
                  full-stack profile, these employers may be
                  a strong career fit.
                </p>

              </div>

            </div>

            <Link
              to="/ai-assistant"
              className="flex items-center justify-center gap-2 border-t border-indigo-100 bg-indigo-50 px-7 py-5 text-sm font-bold text-indigo-600 transition hover:bg-indigo-600 hover:text-white lg:border-l lg:border-t-0"
            >
              Analyze with AI
              <FiArrowRight size={15} />
            </Link>

          </div>

        </section>

        {/* =================================================
            RESULT BAR
        ================================================= */}

        <div className="mt-8 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <div className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-xs font-semibold text-slate-500">
              {filteredCompanies.length} results
            </span>

          </div>

          {(search ||
            industry !== "All Industries" ||
            sortBy !== "Recommended") && (

            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-bold text-indigo-600 transition hover:text-indigo-800"
            >
              Clear filters
            </button>

          )}

        </div>

        {/* =================================================
            COMPANY GRID
        ================================================= */}

        {filteredCompanies.length > 0 ? (

          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {filteredCompanies.map((company) => (

              <CompanyCard
                key={company.id}
                company={company}
                followed={followed.includes(company.id)}
                onFollow={() =>
                  toggleFollow(company.id)
                }
              />

            ))}

          </div>

        ) : (

          <EmptyState
            clearFilters={clearFilters}
          />

        )}

        {/* =================================================
            INSIGHTS
        ================================================= */}

        <section className="mt-12 grid gap-5 md:grid-cols-3">

          <InsightCard
            icon={<FiTrendingUp />}
            title="Hiring momentum"
            text="Technology companies are actively expanding their engineering teams."
          />

          <InsightCard
            icon={<FiAward />}
            title="Top rated workplaces"
            text="Discover highly rated companies based on employee feedback."
          />

          <InsightCard
            icon={<FiBarChart2 />}
            title="Career intelligence"
            text="Use AI-powered matching to find companies aligned with your skills."
          />

        </section>

        {/* =================================================
            CTA
        ================================================= */}

        <section className="relative mt-12 overflow-hidden rounded-2xl bg-slate-950 px-7 py-10 text-white shadow-[0_15px_40px_rgba(15,23,42,0.08)] sm:px-10">

          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-center">

            <div>

              <div className="flex items-center gap-2 text-indigo-300">

                <FiTrendingUp size={15} />

                <span className="text-[9px] font-bold uppercase tracking-[0.18em]">
                  Your next opportunity
                </span>

              </div>

              <h3 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                Ready to find your next workplace?
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                Explore open roles from companies looking
                for talented developers like you.
              </p>

            </div>

            <Link
              to="/jobs"
              className="flex h-12 w-fit shrink-0 items-center gap-3 rounded-xl bg-white px-6 text-sm font-bold text-slate-950 transition hover:bg-indigo-500 hover:text-white"
            >
              Explore Jobs
              <FiArrowRight size={16} />
            </Link>

          </div>

        </section>

      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-[1450px] flex-col justify-between gap-4 px-5 py-7 text-xs text-slate-400 sm:px-7 md:flex-row lg:px-10">

          <p>
            © 2026 HireAI. Career intelligence for
            modern professionals.
          </p>

          <div className="flex gap-5">

            <span className="cursor-pointer transition hover:text-indigo-600">
              Privacy
            </span>

            <span className="cursor-pointer transition hover:text-indigo-600">
              Terms
            </span>

            <Link
              to="/ai-assistant"
              className="transition hover:text-indigo-600"
            >
              AI Assistant
            </Link>

          </div>

        </div>

      </footer>

    </div>
  );
};

/* =========================================================
   HERO STAT
========================================================= */

const HeroStat = ({ value, label }) => {
  return (
    <div>

      <p className="text-2xl font-black sm:text-3xl">
        {value}
      </p>

      <p className="mt-1 text-[10px] font-medium text-slate-500">
        {label}
      </p>

    </div>
  );
};

/* =========================================================
   SELECT BOX
========================================================= */

const SelectBox = ({
  value,
  onChange,
  options,
}) => {
  return (
    <div className="relative">

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm font-semibold text-slate-600 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 sm:w-52"
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
        size={15}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

    </div>
  );
};

/* =========================================================
   COMPANY CARD
========================================================= */

const CompanyCard = ({
  company,
  followed,
  onFollow,
}) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.025)] transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_20px_45px_rgba(79,70,229,0.10)]">

      {/* TOP ACCENT */}

      <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400" />

      <div className="p-5">

        {/* HEADER */}

        <div className="flex items-start justify-between gap-4">

          <div className="flex min-w-0 items-center gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-xl font-black text-white shadow-lg shadow-indigo-100">
              {company.logo}
            </div>

            <div className="min-w-0">

              <div className="flex items-center gap-1.5">

                <h3 className="truncate text-base font-black text-slate-950">
                  {company.name}
                </h3>

                {company.verified && (
                  <FiCheckCircle
                    size={14}
                    className="shrink-0 text-indigo-500"
                  />
                )}

              </div>

              <p className="mt-1 truncate text-xs font-medium text-slate-500">
                {company.industry}
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={onFollow}
            aria-label="Follow company"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition ${
              followed
                ? "border-rose-200 bg-rose-50 text-rose-500"
                : "border-slate-200 bg-white text-slate-400 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500"
            }`}
          >

            <FiHeart
              size={16}
              className={
                followed
                  ? "fill-current"
                  : ""
              }
            />

          </button>

        </div>

        {/* HIRING + RATING */}

        <div className="mt-5 flex items-center justify-between">

          {company.hiring ? (

            <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1.5 text-[9px] font-bold text-emerald-600">

              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

              Hiring now

            </span>

          ) : (

            <span className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-[9px] font-bold text-slate-500">

              <FiClock size={11} />

              Not actively hiring

            </span>

          )}

          <div className="flex items-center gap-1.5">

            <FiStar
              size={14}
              className="fill-amber-400 text-amber-400"
            />

            <span className="text-xs font-black text-slate-800">
              {company.rating}
            </span>

          </div>

        </div>

        {/* DESCRIPTION */}

        <p className="mt-4 line-clamp-2 text-xs leading-5 text-slate-500">
          {company.description}
        </p>

        {/* DETAILS */}

        <div className="mt-5 grid grid-cols-2 gap-3">

          <CompanyMeta
            icon={<FiMapPin size={14} />}
            label="Location"
            value={company.location}
          />

          <CompanyMeta
            icon={<FiUsers size={14} />}
            label="Employees"
            value={company.employees}
          />

          <CompanyMeta
            icon={<FiBriefcase size={14} />}
            label="Open jobs"
            value={`${company.jobs} positions`}
          />

          <CompanyMeta
            icon={<FiAward size={14} />}
            label="AI Match"
            value={`${company.match}%`}
            accent
          />

        </div>

        {/* SKILLS */}

        <div className="mt-5 flex flex-wrap gap-2">

          {company.tags.map((tag) => (

            <span
              key={tag}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-600"
            >
              {tag}
            </span>

          ))}

        </div>

        {/* DIVIDER */}

        <div className="my-5 border-t border-slate-100" />

        {/* ACTION */}

        <Link
          to={`/jobs?company=${encodeURIComponent(
            company.name
          )}`}
          className="group/button flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-xs font-bold text-white transition hover:bg-indigo-700"
        >
          View {company.jobs} Open Jobs

          <FiArrowRight
            size={14}
            className="transition-transform group-hover/button:translate-x-1"
          />
        </Link>

      </div>

    </article>
  );
};

/* =========================================================
   COMPANY META
========================================================= */

const CompanyMeta = ({
  icon,
  label,
  value,
  accent = false,
}) => {
  return (
    <div className="flex min-w-0 items-center gap-2.5">

      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          accent
            ? "bg-indigo-50 text-indigo-600"
            : "bg-slate-50 text-slate-400"
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p
          className={`mt-0.5 truncate text-[10px] font-bold ${
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

/* =========================================================
   INSIGHT CARD
========================================================= */

const InsightCard = ({
  icon,
  title,
  text,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.02)] transition duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        {icon}
      </div>

      <h3 className="mt-5 text-sm font-black text-slate-950">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {text}
      </p>

    </div>
  );
};

/* =========================================================
   EMPTY STATE
========================================================= */

const EmptyState = ({
  clearFilters,
}) => {
  return (
    <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <FiSearch size={24} />
      </div>

      <h3 className="mt-5 text-xl font-black text-slate-950">
        No companies found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Try another company name, skill or industry.
      </p>

      <button
        type="button"
        onClick={clearFilters}
        className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-bold text-white transition hover:bg-indigo-600"
      >
        Reset Search
        <FiArrowRight size={14} />
      </button>

    </div>
  );
};

export default Companies;