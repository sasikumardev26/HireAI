import React, { useState } from "react";

import {
  FiArrowRight,
  FiBriefcase,
  FiCheck,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
  FiUser,
  FiUsers,
  FiZap,
} from "react-icons/fi";

import { Link, useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [agreeTerms, setAgreeTerms] =
    useState(false);

  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] =
    useState(false);

  /* =====================================================
     INPUT CHANGE
  ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* =====================================================
     VALIDATION
  ===================================================== */

  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName =
        "First name is required.";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName =
        "Last name is required.";
    }

    if (!form.email.trim()) {
      newErrors.email =
        "Email address is required.";
    } else if (
      !/\S+@\S+\.\S+/.test(form.email)
    ) {
      newErrors.email =
        "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      newErrors.phone =
        "Phone number is required.";
    } else if (
      form.phone.replace(/\D/g, "").length < 10
    ) {
      newErrors.phone =
        "Enter a valid phone number.";
    }

    if (!form.location.trim()) {
      newErrors.location =
        "Location is required.";
    }

    if (!form.password.trim()) {
      newErrors.password =
        "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters.";
    }

    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (
      form.password !== form.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    if (!agreeTerms) {
      newErrors.terms =
        "Please accept the Terms of Service and Privacy Policy.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =====================================================
     REGISTER
  ===================================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    setTimeout(() => {
      const user = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),

        name: `${form.firstName.trim()} ${form.lastName.trim()}`,

        email: form.email.trim().toLowerCase(),

        phone: form.phone.trim(),

        location: form.location.trim(),

        password: form.password,
      };

      /* =================================================
         IMPORTANT

         DO NOT USE:

         localStorage.setItem("hireaiUser", ...)

         Because "hireaiUser" means already logged in.

         Registration should only create an account.
      ================================================= */

      localStorage.setItem(
        "hireaiRegisteredUser",
        JSON.stringify(user)
      );

      setIsLoading(false);

      /* =================================================
         AFTER CREATE ACCOUNT
         GO TO LOGIN PAGE
      ================================================= */

      navigate("/login", {
        replace: true,
        state: {
          registered: true,
          email: user.email,
        },
      });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="relative z-30 border-b border-slate-200/80 bg-white">

        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-10">

          {/* LOGO */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-200">

              <FiBriefcase size={20} />

              <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />

            </div>

            <div>

              <h1 className="text-xl font-black tracking-tight text-slate-950">

                Hire
                <span className="text-indigo-600">
                  AI
                </span>

              </h1>

              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Career Intelligence
              </p>

            </div>

          </Link>

          {/* BACK HOME */}

          <Link
            to="/"
            className="group flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
          >

            <FiArrowRight
              className="rotate-180 transition-transform group-hover:-translate-x-1"
              size={15}
            />

            Back to Home

          </Link>

        </div>

      </header>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="relative overflow-hidden">

        {/* BACKGROUND */}

        <div className="absolute inset-0 bg-gradient-to-br from-[#eef7ff] via-white to-[#f8f3ff]" />

        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-blue-300/20 blur-[130px]" />

        <div className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-violet-300/20 blur-[140px]" />

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="relative mx-auto grid min-h-[calc(100vh-76px)] max-w-[1500px] lg:grid-cols-[1.02fr_0.98fr]">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <section className="hidden px-5 py-5 lg:flex">

            <div className="relative flex min-h-[720px] w-full overflow-hidden rounded-[32px] bg-[#07111f] shadow-2xl shadow-indigo-200/30">

              {/* BACKGROUND GLOW */}

              <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />

              <div className="absolute -bottom-40 -right-20 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

              <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[100px]" />

              {/* GRID */}

              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                  backgroundSize: "45px 45px",
                }}
              />

              {/* CONTENT */}

              <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">

                {/* TOP */}

                <div>

                  {/* LOGO */}

                  <div className="mb-8 flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10 backdrop-blur">

                      <FiZap className="text-xl text-cyan-300" />

                    </div>

                    <div>

                      <p className="text-lg font-black tracking-tight text-white">

                        Hire
                        <span className="text-cyan-300">
                          AI
                        </span>

                      </p>

                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
                        Intelligent Career Platform
                      </p>

                    </div>

                  </div>

                  {/* BADGE */}

                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-200">

                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />

                    AI-Powered Career Platform

                  </div>

                  {/* HEADING */}

                  <h1 className="max-w-xl text-4xl font-black leading-[1.05] tracking-tight text-white xl:text-5xl">

                    Shape your

                    <br />

                    career.

                    <br />

                    <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                      Find your future.
                    </span>

                  </h1>

                  <p className="mt-6 max-w-lg text-sm leading-7 text-slate-400 xl:text-base">
                    Discover opportunities that match your skills,
                    experience, and career goals with intelligent
                    AI-powered job matching.
                  </p>

                </div>

                {/* =================================================
                    AI VISUAL
                ================================================= */}

                <div className="relative my-8 flex min-h-[310px] items-center justify-center">

                  {/* CIRCLES */}

                  <div className="absolute h-[290px] w-[290px] rounded-full border border-cyan-400/10" />

                  <div className="absolute h-[230px] w-[230px] rounded-full border border-blue-400/10" />

                  <div className="absolute h-[170px] w-[170px] rounded-full bg-gradient-to-br from-indigo-500/10 to-cyan-400/10 blur-2xl" />

                  {/* ORBIT */}

                  <div className="absolute h-[250px] w-[250px] animate-[spin_18s_linear_infinite] rounded-full border border-dashed border-cyan-300/20">

                    <div className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_#67e8f9]" />

                  </div>

                  {/* PERSON */}

                  <div className="relative z-20 flex flex-col items-center">

                    {/* HEAD */}

                    <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-500 shadow-2xl">

                      <div className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-700/80" />

                      <div className="absolute left-5 top-7 h-1.5 w-1.5 rounded-full bg-white/80" />

                      <div className="absolute right-5 top-7 h-1.5 w-1.5 rounded-full bg-white/80" />

                    </div>

                    {/* BODY */}

                    <div className="mt-[-2px] h-28 w-36 rounded-t-[70px] bg-gradient-to-br from-indigo-500 via-blue-600 to-violet-700 shadow-[0_20px_50px_rgba(79,70,229,0.35)]" />

                    {/* LAPTOP */}

                    <div className="absolute bottom-[-8px] left-1/2 w-[190px] -translate-x-1/2">

                      <div className="relative h-[105px] rounded-xl border border-slate-500/40 bg-slate-900 p-2 shadow-2xl">

                        <div className="h-full overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-slate-800 to-slate-950 p-3">

                          <div className="mb-3 flex items-center justify-between">

                            <div className="h-2 w-16 rounded-full bg-cyan-300/70" />

                            <div className="flex gap-1">

                              <span className="h-2 w-2 rounded-full bg-emerald-400" />

                              <span className="h-2 w-2 rounded-full bg-blue-400" />

                            </div>

                          </div>

                          <div className="grid grid-cols-3 gap-2">

                            <div className="h-12 rounded-md bg-indigo-500/20" />

                            <div className="col-span-2 h-12 rounded-md bg-cyan-400/10" />

                          </div>

                          <div className="mt-2 flex gap-2">

                            <div className="h-1.5 w-12 rounded-full bg-slate-600" />

                            <div className="h-1.5 w-20 rounded-full bg-slate-700" />

                          </div>

                        </div>

                      </div>

                      <div className="mx-auto h-3 w-[220px] rounded-b-xl bg-gradient-to-r from-slate-600 via-slate-300 to-slate-600 shadow-lg" />

                    </div>

                  </div>

                  {/* AI CARD */}

                  <div className="absolute left-2 top-8 z-30 rounded-2xl border border-white/10 bg-white/[0.08] p-4 shadow-2xl backdrop-blur-xl">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/15">

                        <FiZap className="text-lg text-cyan-300" />

                      </div>

                      <div>

                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          AI Career Match
                        </p>

                        <p className="mt-1 text-xl font-black text-white">
                          96%
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* JOB CARD */}

                  <div className="absolute bottom-4 right-0 z-30 w-[190px] rounded-2xl border border-white/10 bg-white/[0.08] p-4 shadow-2xl backdrop-blur-xl">

                    <div className="flex items-start justify-between">

                      <div>

                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          Recommended
                        </p>

                        <p className="mt-1 text-sm font-bold text-white">
                          Python Full Stack
                        </p>

                      </div>

                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10">

                        <FiCheckCircle className="text-emerald-300" />

                      </div>

                    </div>

                    <div className="mt-4 flex items-center justify-between">

                      <span className="text-xs text-slate-400">
                        Match score
                      </span>

                      <span className="text-xs font-bold text-emerald-300">
                        96%
                      </span>

                    </div>

                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">

                      <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />

                    </div>

                  </div>

                </div>

                {/* TRUST */}

                <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-6">

                  <TrustItem
                    icon={<FiCheck />}
                    title="Personalized"
                    subtitle="Opportunities"
                  />

                  <TrustItem
                    icon={<FiShield />}
                    title="Secure"
                    subtitle="Profile"
                  />

                  <TrustItem
                    icon={<FiUsers />}
                    title="Career"
                    subtitle="Insights"
                  />

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-20">

            <div className="w-full max-w-[550px]">

              {/* MOBILE LOGO */}

              <div className="mb-8 flex items-center gap-3 lg:hidden">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">

                  <FiBriefcase size={19} />

                </div>

                <div>

                  <p className="text-lg font-black text-slate-900">

                    Hire
                    <span className="text-indigo-600">
                      AI
                    </span>

                  </p>

                  <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                    Career Intelligence
                  </p>

                </div>

              </div>

              {/* TITLE */}

              <div className="mb-7">

                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-indigo-600">
                  Get Started
                </p>

                <h1 className="mt-2 text-[34px] font-black tracking-[-0.035em] text-slate-950 sm:text-[38px]">
                  Create your HireAI account
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Build your profile and let AI help you find
                  the right opportunities.
                </p>

              </div>

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                {/* FIRST + LAST NAME */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* FIRST NAME */}

                  <div>

                    <label
                      htmlFor="firstName"
                      className="mb-1.5 block text-xs font-black text-slate-700"
                    >
                      First Name
                    </label>

                    <div
                      className={`group flex h-[54px] items-center rounded-xl border bg-white transition-all ${
                        errors.firstName
                          ? "border-red-300 ring-4 ring-red-50"
                          : "border-slate-200 hover:border-indigo-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50"
                      }`}
                    >

                      <div className="flex w-12 shrink-0 items-center justify-center text-slate-400 group-focus-within:text-indigo-600">

                        <FiUser size={17} />

                      </div>

                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        value={form.firstName}
                        onChange={handleChange}
                        className="h-full w-full bg-transparent pr-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                      />

                    </div>

                    {errors.firstName && (
                      <p className="mt-1 text-[10px] font-medium text-red-500">
                        {errors.firstName}
                      </p>
                    )}

                  </div>

                  {/* LAST NAME */}

                  <div>

                    <label
                      htmlFor="lastName"
                      className="mb-1.5 block text-xs font-black text-slate-700"
                    >
                      Last Name
                    </label>

                    <div
                      className={`group flex h-[54px] items-center rounded-xl border bg-white transition-all ${
                        errors.lastName
                          ? "border-red-300 ring-4 ring-red-50"
                          : "border-slate-200 hover:border-indigo-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50"
                      }`}
                    >

                      <div className="flex w-12 shrink-0 items-center justify-center text-slate-400 group-focus-within:text-indigo-600">

                        <FiUser size={17} />

                      </div>

                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        value={form.lastName}
                        onChange={handleChange}
                        className="h-full w-full bg-transparent pr-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                      />

                    </div>

                    {errors.lastName && (
                      <p className="mt-1 text-[10px] font-medium text-red-500">
                        {errors.lastName}
                      </p>
                    )}

                  </div>

                </div>

                {/* EMAIL */}

                <div>

                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-black text-slate-700"
                  >
                    Email Address
                  </label>

                  <div
                    className={`group flex h-[54px] items-center rounded-xl border bg-white transition-all ${
                      errors.email
                        ? "border-red-300 ring-4 ring-red-50"
                        : "border-slate-200 hover:border-indigo-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50"
                    }`}
                  >

                    <div className="flex w-12 shrink-0 items-center justify-center text-slate-400 group-focus-within:text-indigo-600">

                      <FiMail size={17} />

                    </div>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="h-full w-full bg-transparent pr-4 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                    />

                  </div>

                  {errors.email && (
                    <p className="mt-1 text-[10px] font-medium text-red-500">
                      {errors.email}
                    </p>
                  )}

                </div>

                {/* PHONE + LOCATION */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* PHONE */}

                  <div>

                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-xs font-black text-slate-700"
                    >
                      Phone
                    </label>

                    <div
                      className={`group flex h-[54px] items-center rounded-xl border bg-white transition-all ${
                        errors.phone
                          ? "border-red-300 ring-4 ring-red-50"
                          : "border-slate-200 hover:border-indigo-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50"
                      }`}
                    >

                      <div className="flex w-12 shrink-0 items-center justify-center text-slate-400 group-focus-within:text-indigo-600">

                        <FiPhone size={17} />

                      </div>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91"
                        className="h-full w-full bg-transparent pr-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                      />

                    </div>

                    {errors.phone && (
                      <p className="mt-1 text-[10px] font-medium text-red-500">
                        {errors.phone}
                      </p>
                    )}

                  </div>

                  {/* LOCATION */}

                  <div>

                    <label
                      htmlFor="location"
                      className="mb-1.5 block text-xs font-black text-slate-700"
                    >
                      Location
                    </label>

                    <div
                      className={`group flex h-[54px] items-center rounded-xl border bg-white transition-all ${
                        errors.location
                          ? "border-red-300 ring-4 ring-red-50"
                          : "border-slate-200 hover:border-indigo-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50"
                      }`}
                    >

                      <div className="flex w-12 shrink-0 items-center justify-center text-slate-400 group-focus-within:text-indigo-600">

                        <FiMapPin size={17} />

                      </div>

                      <input
                        id="location"
                        name="location"
                        type="text"
                        autoComplete="address-level1"
                        value={form.location}
                        onChange={handleChange}
                        className="h-full w-full bg-transparent pr-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                      />

                    </div>

                    {errors.location && (
                      <p className="mt-1 text-[10px] font-medium text-red-500">
                        {errors.location}
                      </p>
                    )}

                  </div>

                </div>

                {/* PASSWORD */}

                <div>

                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-xs font-black text-slate-700"
                  >
                    Password
                  </label>

                  <div
                    className={`group flex h-[54px] items-center rounded-xl border bg-white transition-all ${
                      errors.password
                        ? "border-red-300 ring-4 ring-red-50"
                        : "border-slate-200 hover:border-indigo-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50"
                    }`}
                  >

                    <div className="flex w-12 shrink-0 items-center justify-center text-slate-400 group-focus-within:text-indigo-600">

                      <FiLock size={17} />

                    </div>

                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="new-password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      className="h-full w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (prev) => !prev
                        )
                      }
                      className="flex h-full w-12 shrink-0 items-center justify-center text-slate-400 transition hover:text-indigo-600"
                    >
                      {showPassword ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>

                  </div>

                  {errors.password && (
                    <p className="mt-1 text-[10px] font-medium text-red-500">
                      {errors.password}
                    </p>
                  )}

                  {!errors.password &&
                    form.password.length > 0 && (
                      <div className="mt-1.5 flex items-center gap-2">

                        <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-100">

                          <div
                            className={`h-full rounded-full transition-all ${
                              form.password.length >= 10
                                ? "w-full bg-emerald-500"
                                : form.password.length >= 6
                                ? "w-2/3 bg-amber-400"
                                : "w-1/3 bg-red-400"
                            }`}
                          />

                        </div>

                        <span className="text-[9px] font-bold text-slate-400">

                          {form.password.length >= 10
                            ? "Strong"
                            : form.password.length >= 6
                            ? "Good"
                            : "Weak"}

                        </span>

                      </div>
                    )}

                </div>

                {/* CONFIRM PASSWORD */}

                <div>

                  <label
                    htmlFor="confirmPassword"
                    className="mb-1.5 block text-xs font-black text-slate-700"
                  >
                    Confirm Password
                  </label>

                  <div
                    className={`group flex h-[54px] items-center rounded-xl border bg-white transition-all ${
                      errors.confirmPassword
                        ? "border-red-300 ring-4 ring-red-50"
                        : "border-slate-200 hover:border-indigo-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50"
                    }`}
                  >

                    <div className="flex w-12 shrink-0 items-center justify-center text-slate-400 group-focus-within:text-indigo-600">

                      <FiLock size={17} />

                    </div>

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="new-password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter your password"
                      className="h-full w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (prev) => !prev
                        )
                      }
                      className="flex h-full w-12 shrink-0 items-center justify-center text-slate-400 transition hover:text-indigo-600"
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>

                  </div>

                  {errors.confirmPassword && (
                    <p className="mt-1 text-[10px] font-medium text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}

                </div>

                {/* TERMS */}

                <div>

                  <label className="flex cursor-pointer items-start gap-2.5">

                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => {
                        setAgreeTerms(
                          e.target.checked
                        );

                        setErrors((prev) => ({
                          ...prev,
                          terms: "",
                        }));
                      }}
                      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 accent-indigo-600"
                    />

                    <span className="text-xs leading-5 text-slate-500">

                      I agree to HireAI's{" "}

                      <button
                        type="button"
                        className="font-bold text-indigo-600 hover:text-indigo-700"
                      >
                        Terms of Service
                      </button>

                      {" "}and{" "}

                      <button
                        type="button"
                        className="font-bold text-indigo-600 hover:text-indigo-700"
                      >
                        Privacy Policy
                      </button>

                      .

                    </span>

                  </label>

                  {errors.terms && (
                    <p className="mt-1 text-[10px] font-medium text-red-500">
                      {errors.terms}
                    </p>
                  )}

                </div>

                {/* CREATE ACCOUNT */}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group flex h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 text-sm font-black text-white shadow-[0_12px_30px_rgba(79,70,229,0.22)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_35px_rgba(79,70,229,0.30)] disabled:cursor-not-allowed disabled:opacity-70"
                >

                  {isLoading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account

                      <FiArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}

                </button>

              </form>

              {/* SIGN IN */}

              <div className="mt-5 text-center">

                <p className="text-sm text-slate-500">

                  Already have an account?

                  <Link
                    to="/login"
                    className="ml-1.5 font-black text-indigo-600 transition hover:text-indigo-700"
                  >
                    Sign in
                  </Link>

                </p>

              </div>

              {/* SECURITY */}

              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-medium text-slate-400">

                <FiShield size={12} />

                Your information is protected and secure.

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
};

/* =========================================================
   TRUST ITEM
========================================================= */

const TrustItem = ({
  icon,
  title,
  subtitle,
}) => {
  return (
    <div className="flex items-center gap-2">

      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">

        {React.cloneElement(icon, {
          className: "text-sm text-cyan-300",
        })}

      </div>

      <div>

        <p className="text-[10px] font-bold text-white">
          {title}
        </p>

        <p className="text-[9px] text-slate-500">
          {subtitle}
        </p>

      </div>

    </div>
  );
};

export default Register;