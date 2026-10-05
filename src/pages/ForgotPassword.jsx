import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiMail,
  FiShield,
  FiZap,
} from "react-icons/fi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-200">
              <FiBriefcase className="text-xl text-white" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Hire<span className="text-indigo-600">AI</span>
              </h1>

              <p className="-mt-0.5 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                Career intelligence
              </p>
            </div>
          </Link>

          <Link
            to="/login"
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
          >
            <FiArrowLeft />
            Back to Login
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl lg:grid-cols-2">
        {/* LEFT PANEL */}
        <section className="relative hidden overflow-hidden bg-slate-950 px-8 py-12 text-white lg:flex lg:flex-col lg:justify-between lg:px-12">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />

          <div className="relative">
            <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-300">
              <FiZap />
              Secure account recovery
            </div>

            <h2 className="max-w-lg text-4xl font-bold leading-tight xl:text-5xl">
              Get back to your
              <span className="block text-indigo-400">
                career journey.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
              Don't worry if you forgot your password. We'll help you recover
              your HireAI account and get back to discovering your next
              opportunity.
            </p>
          </div>

          {/* FEATURES */}
          <div className="relative space-y-5">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-indigo-300">
                <FiShield />
              </div>

              <div>
                <p className="text-sm font-bold">
                  Secure recovery process
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Your account information stays protected.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-indigo-300">
                <FiMail />
              </div>

              <div>
                <p className="text-sm font-bold">
                  Email verification
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Receive recovery instructions securely.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-indigo-300">
                <FiZap />
              </div>

              <div>
                <p className="text-sm font-bold">
                  Continue with AI
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Get back to your personalized career tools.
                </p>
              </div>
            </div>
          </div>

          <p className="relative text-xs text-slate-600">
            © 2026 HireAI. Built for modern career growth.
          </p>
        </section>

        {/* RIGHT CONTENT */}
        <section className="flex items-center justify-center px-5 py-12 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            {/* MOBILE LOGO */}
            <div className="mb-8 lg:hidden">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                <FiBriefcase size={22} />
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-500">
                HireAI
              </p>
            </div>

            {!submitted ? (
              <>
                {/* TITLE */}
                <div className="mb-8">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <FiLockIcon />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Account recovery
                  </p>

                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                    Forgot your password?
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Enter the email address connected to your HireAI account
                    and we'll send you instructions to reset your password.
                  </p>
                </div>

                {/* ERROR */}
                {error && (
                  <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">
                    {error}
                  </div>
                )}

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Email Address
                    </label>

                    <div className="flex items-center overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center border-r border-slate-100 text-slate-400">
                        <FiMail />
                      </div>

                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        placeholder="you@example.com"
                        className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
                  >
                    Send Reset Instructions
                    <FiArrowRight />
                  </button>
                </form>

                {/* LOGIN LINK */}
                <div className="mt-7 text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 transition hover:text-indigo-700"
                  >
                    <FiArrowLeft />
                    Back to Sign In
                  </Link>
                </div>

                {/* SECURITY */}
                <div className="mt-10 flex items-center justify-center gap-2 text-[10px] text-slate-400">
                  <FiShield />
                  Your information is protected and secure.
                </div>
              </>
            ) : (
              /* SUCCESS */
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <FiCheckCircle size={30} />
                </div>

                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Email sent
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  Check your inbox
                </h2>

                <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-slate-500">
                  We've sent password reset instructions to:
                </p>

                <div className="mx-auto mt-4 inline-flex rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-bold text-indigo-600">
                  {email}
                </div>

                <p className="mx-auto mt-5 max-w-sm text-xs leading-6 text-slate-400">
                  If you don't see the email, check your spam or junk folder.
                </p>

                <Link
                  to="/login"
                  className="mx-auto mt-8 flex w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
                >
                  Back to Sign In
                  <FiArrowRight />
                </Link>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-5 text-xs font-semibold text-slate-500 transition hover:text-indigo-600"
                >
                  Try another email
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

/* Small custom icon wrapper */
const FiLockIcon = () => (
  <span className="text-xl">
    <FiShield />
  </span>
);

export default ForgotPassword;