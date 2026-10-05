import React, { useEffect, useState } from "react";

import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiChevronRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShield,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // =====================================================
  // LOAD REGISTERED EMAIL AFTER REGISTRATION
  // =====================================================

  useEffect(() => {
    const registeredUser = localStorage.getItem(
      "hireaiRegisteredUser"
    );

    if (location.state?.registered) {
      setSuccessMessage(
        "Account created successfully. Please sign in to continue."
      );

      if (location.state?.email) {
        setForm((prev) => ({
          ...prev,
          email: location.state.email,
        }));
      } else if (registeredUser) {
        try {
          const user = JSON.parse(registeredUser);

          if (user?.email) {
            setForm((prev) => ({
              ...prev,
              email: user.email,
            }));
          }
        } catch (error) {
          console.error(
            "Unable to read registered user:",
            error
          );
        }
      }

      // Remove navigation state
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );
    }
  }, [location]);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

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

    setSuccessMessage("");
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validate = () => {
    const newErrors = {};

    const email = form.email.trim();

    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({});
    setSuccessMessage("");

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      try {
        const email = form.email.trim().toLowerCase();
        const password = form.password;

        // =================================================
        // DEMO LOGIN
        // =================================================

        if (
          email === "demo@hireai.com" &&
          password === "demo123"
        ) {
          const demoUser = {
            name: "Demo User",
            firstName: "Demo",
            lastName: "User",
            email: "demo@hireai.com",
            location: "India",
            loggedIn: true,
          };

          localStorage.setItem(
            "hireaiUser",
            JSON.stringify(demoUser)
          );

          if (rememberMe) {
            localStorage.setItem(
              "hireaiRememberMe",
              "true"
            );
          } else {
            localStorage.removeItem("hireaiRememberMe");
          }

          setIsLoading(false);

          // ===============================================
          // IMPORTANT
          // LOGIN SUCCESS -> HOME
          // ===============================================

          navigate("/", {
            replace: true,
          });

          return;
        }

        // =================================================
        // GET REGISTERED USER
        // =================================================

        const registeredUserData =
          localStorage.getItem("hireaiRegisteredUser");

        if (!registeredUserData) {
          setIsLoading(false);

          setErrors({
            general:
              "No registered account found. Please create an account first.",
          });

          return;
        }

        let registeredUser;

        try {
          registeredUser = JSON.parse(
            registeredUserData
          );
        } catch (error) {
          console.error(error);

          setIsLoading(false);

          setErrors({
            general:
              "Unable to read your account. Please register again.",
          });

          return;
        }

        const savedEmail = String(
          registeredUser?.email || ""
        )
          .trim()
          .toLowerCase();

        const savedPassword = String(
          registeredUser?.password || ""
        );

        // =================================================
        // CHECK EMAIL
        // =================================================

        if (email !== savedEmail) {
          setIsLoading(false);

          setErrors({
            email: "Email address does not match.",
          });

          return;
        }

        // =================================================
        // CHECK PASSWORD
        // =================================================

        if (password !== savedPassword) {
          setIsLoading(false);

          setErrors({
            password:
              "Incorrect password. Please try again.",
          });

          return;
        }

        // =================================================
        // LOGIN SUCCESS
        // =================================================

        const loggedInUser = {
          firstName: registeredUser.firstName || "",
          lastName: registeredUser.lastName || "",

          name:
            registeredUser.name ||
            `${registeredUser.firstName || ""} ${
              registeredUser.lastName || ""
            }`.trim(),

          email: registeredUser.email || "",
          phone: registeredUser.phone || "",
          location: registeredUser.location || "",

          loggedIn: true,
        };

        localStorage.setItem(
          "hireaiUser",
          JSON.stringify(loggedInUser)
        );

        if (rememberMe) {
          localStorage.setItem(
            "hireaiRememberMe",
            "true"
          );
        } else {
          localStorage.removeItem("hireaiRememberMe");
        }

        setIsLoading(false);

        // =================================================
        // VERY IMPORTANT
        // LOGIN -> HOME
        // NOT DASHBOARD
        // =================================================

        navigate("/", {
          replace: true,
        });
      } catch (error) {
        console.error("Login error:", error);

        setIsLoading(false);

        setErrors({
          general:
            "Something went wrong. Please try again.",
        });
      }
    }, 700);
  };

  // =====================================================
  // DEMO ACCOUNT BUTTON
  // =====================================================

  const handleDemoLogin = () => {
    setErrors({});
    setSuccessMessage("");

    setForm({
      email: "demo@hireai.com",
      password: "demo123",
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="relative z-30 border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-10">
          {/* LOGO */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-200">
              <FiZap size={20} />

              <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-950">
                Hire<span className="text-indigo-600">AI</span>
              </h1>

              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Smart Career Platform
              </p>
            </div>
          </Link>

          {/* HEADER RIGHT */}

          <div className="flex items-center gap-3 sm:gap-5">
            <span className="hidden text-xs font-medium text-slate-400 sm:block">
              Don't have an account?
            </span>

            <Link
              to="/register"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-indigo-600 px-4 text-xs font-bold text-indigo-600 transition hover:bg-indigo-600 hover:text-white sm:px-5 sm:text-sm"
            >
              Create account
              <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="relative overflow-hidden">
        {/* BACKGROUND */}

        <div className="absolute inset-0 bg-gradient-to-br from-[#eef7ff] via-white to-[#f8f3ff]" />

        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-blue-300/20 blur-[130px]" />

        <div className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-violet-300/20 blur-[140px]" />

        <div className="relative mx-auto grid min-h-[calc(100vh-76px)] max-w-[1500px] lg:grid-cols-[1.02fr_0.98fr]">
          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <section className="hidden px-5 py-5 lg:flex">
            <div className="relative flex min-h-[720px] w-full overflow-hidden rounded-[32px] bg-[#07111f] shadow-2xl shadow-indigo-200/30">
              {/* GLOW */}

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

              <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
                {/* TOP */}

                <div>
                  {/* BRAND */}

                  <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10 backdrop-blur">
                      <FiZap className="text-xl text-cyan-300" />
                    </div>

                    <div>
                      <p className="text-lg font-black tracking-tight text-white">
                        Hire<span className="text-cyan-300">AI</span>
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
                    Discover opportunities that match your
                    skills, experience, and career goals with
                    intelligent AI-powered job matching.
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

                  {/* AI MATCH CARD */}

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

                  {/* JOB MATCH CARD */}

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

                {/* BOTTOM TRUST */}

                <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                      <FiStar className="text-sm text-cyan-300" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold text-white">
                        Personalized
                      </p>

                      <p className="text-[9px] text-slate-500">
                        Opportunities
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                      <FiShield className="text-sm text-cyan-300" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold text-white">
                        Secure
                      </p>

                      <p className="text-[9px] text-slate-500">
                        Profile
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                      <FiTrendingUp className="text-sm text-cyan-300" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold text-white">
                        Career
                      </p>

                      <p className="text-[9px] text-slate-500">
                        Insights
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-20">
            <div className="w-full max-w-[470px]">
              {/* MOBILE LOGO */}

              <div className="mb-8 flex items-center gap-3 lg:hidden">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  <FiZap size={19} />
                </div>

                <div>
                  <p className="text-lg font-black text-slate-900">
                    Hire<span className="text-indigo-600">AI</span>
                  </p>

                  <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                    Smart Career Platform
                  </p>
                </div>
              </div>

              {/* TITLE */}

              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <FiBriefcase size={21} />
                </div>

                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-indigo-600">
                  Welcome back
                </p>

                <h1 className="mt-2 text-[38px] font-black tracking-[-0.035em] text-slate-950 sm:text-[44px]">
                  Sign in to HireAI
                </h1>

                <p className="mt-3 max-w-[420px] text-sm leading-6 text-slate-500">
                  Pick up where you left off and continue
                  building your next career opportunity.
                </p>
              </div>

              {/* SUCCESS MESSAGE */}

              {successMessage && (
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <FiCheckCircle className="mt-0.5 shrink-0 text-emerald-600" />

                  <div>
                    <p className="text-xs font-black text-emerald-700">
                      Account created successfully
                    </p>

                    <p className="mt-1 text-xs leading-5 text-emerald-600">
                      {successMessage}
                    </p>
                  </div>
                </div>
              )}

              {/* GENERAL ERROR */}

              {errors.general && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
                  <p className="text-xs font-bold text-red-600">
                    {errors.general}
                  </p>
                </div>
              )}

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="mt-9 space-y-6"
              >
                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2.5 block text-xs font-black uppercase tracking-wide text-slate-700"
                  >
                    Email address
                  </label>

                  <div
                    className={`group flex h-[60px] items-center rounded-xl border bg-white transition-all ${
                      errors.email
                        ? "border-red-300 ring-4 ring-red-50"
                        : "border-slate-200 hover:border-indigo-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50"
                    }`}
                  >
                    <div className="flex w-12 shrink-0 items-center justify-center text-slate-400 transition group-focus-within:text-indigo-600">
                      <FiMail size={18} />
                    </div>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="h-full w-full bg-transparent pr-4 text-sm font-medium text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400"
                    />
                  </div>

                  {errors.email && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* PASSWORD */}

                <div>
                  <div className="mb-2.5 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-xs font-black uppercase tracking-wide text-slate-700"
                    >
                      Password
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-xs font-bold text-indigo-600 transition hover:text-indigo-700"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div
                    className={`group flex h-[60px] items-center rounded-xl border bg-white transition-all ${
                      errors.password
                        ? "border-red-300 ring-4 ring-red-50"
                        : "border-slate-200 hover:border-indigo-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50"
                    }`}
                  >
                    <div className="flex w-12 shrink-0 items-center justify-center text-slate-400 transition group-focus-within:text-indigo-600">
                      <FiLock size={18} />
                    </div>

                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="current-password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="h-full w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (prev) => !prev
                        )
                      }
                      className="flex h-full w-14 shrink-0 items-center justify-center text-slate-400 transition hover:text-indigo-600"
                    >
                      {showPassword ? (
                        <FiEyeOff size={19} />
                      ) : (
                        <FiEye size={19} />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {errors.password}
                    </p>
                  )}

                  {!errors.password &&
                    form.password.length > 0 && (
                      <div className="mt-2 flex items-center gap-2">
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

                {/* OPTIONS */}

                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) =>
                        setRememberMe(
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-indigo-600"
                    />

                    <span className="text-xs font-medium text-slate-600">
                      Remember me
                    </span>
                  </label>

                  <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                    <FiShield size={12} />
                    Secure & private
                  </div>
                </div>

                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group flex h-[60px] w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 text-sm font-black text-white shadow-[0_15px_35px_rgba(79,70,229,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(79,70,229,0.32)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Signing in...
                    </>
                  ) : (
                    <>
                      Continue to HireAI

                      <FiArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

                {/* DIVIDER */}

                <div className="flex items-center gap-4 py-1">
                  <div className="h-px flex-1 bg-slate-200" />

                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                    or
                  </span>

                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                {/* DEMO */}

                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="group flex h-[56px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <FiZap size={15} />
                  </span>

                  Continue with Demo Account

                  <FiChevronRight
                    size={15}
                    className="ml-auto mr-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-500"
                  />
                </button>

                <p className="text-center text-[10px] text-slate-400">
                  Demo: demo@hireai.com / demo123
                </p>
              </form>

              {/* CREATE ACCOUNT */}

              <div className="mt-8 text-center">
                <p className="text-sm text-slate-500">
                  New to HireAI?

                  <Link
                    to="/register"
                    className="ml-2 font-black text-indigo-600 transition hover:text-indigo-700"
                  >
                    Create your account
                  </Link>
                </p>
              </div>

              {/* TRUST */}

              <div className="mt-8 flex items-center justify-center gap-5 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
                  <FiShield size={12} />
                  Secure
                </div>

                <span className="h-3 w-px bg-slate-200" />

                <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
                  <FiCheckCircle size={12} />
                  Trusted
                </div>

                <span className="h-3 w-px bg-slate-200" />

                <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
                  <FiStar size={12} />
                  AI Powered
                </div>
              </div>

              {/* MOBILE INFO */}

              <div className="mt-8 grid grid-cols-3 gap-3 lg:hidden">
                <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                  <FiTarget className="mx-auto text-indigo-500" />

                  <p className="mt-1 text-[9px] font-bold text-slate-500">
                    AI Matches
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                  <FiBriefcase className="mx-auto text-violet-500" />

                  <p className="mt-1 text-[9px] font-bold text-slate-500">
                    Job Tracking
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                  <FiShield className="mx-auto text-emerald-500" />

                  <p className="mt-1 text-[9px] font-bold text-slate-500">
                    Secure
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Login;