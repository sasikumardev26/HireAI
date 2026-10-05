import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";

import {
  FiArrowRight,
  FiBriefcase,
  FiCheck,
  FiChevronRight,
  FiDownload,
  FiEdit3,
  FiFileText,
  FiMail,
  FiMapPin,
  FiPhone,
  FiPlus,
  FiTarget,
  FiTrendingUp,
  FiX,
  FiZap,
  FiStar,
} from "react-icons/fi";

import Navbar from "../components/Navbar";

/* =========================================================
   RESUME DATABASE
   ========================================================= */

const RESUME_DB_NAME = "HireAIResumeDB";
const RESUME_STORE_NAME = "resumeStore";
const RESUME_KEY = "currentResume";

/* =========================================================
   OPEN INDEXED DB
   ========================================================= */

const openResumeDB = () => {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(
        new Error("IndexedDB is not supported in this browser.")
      );
      return;
    }

    const request = window.indexedDB.open(
      RESUME_DB_NAME,
      1
    );

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(RESUME_STORE_NAME)) {
        db.createObjectStore(RESUME_STORE_NAME);
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

/* =========================================================
   SAVE RESUME TO INDEXED DB
   ========================================================= */

const saveResumeToDB = async (file) => {
  const db = await openResumeDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      RESUME_STORE_NAME,
      "readwrite"
    );

    const store = transaction.objectStore(
      RESUME_STORE_NAME
    );

    const request = store.put(
      {
        blob: file,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
      },
      RESUME_KEY
    );

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };

    transaction.oncomplete = () => {
      db.close();
    };

    transaction.onerror = () => {
      reject(transaction.error);
    };
  });
};

/* =========================================================
   GET RESUME FROM INDEXED DB
   ========================================================= */

const getResumeFromDB = async () => {
  const db = await openResumeDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      RESUME_STORE_NAME,
      "readonly"
    );

    const store = transaction.objectStore(
      RESUME_STORE_NAME
    );

    const request = store.get(RESUME_KEY);

    request.onsuccess = () => {
      resolve(request.result || null);
    };

    request.onerror = () => {
      reject(request.error);
    };

    transaction.oncomplete = () => {
      db.close();
    };

    transaction.onerror = () => {
      reject(transaction.error);
    };
  });
};

/* =========================================================
   DELETE RESUME FROM INDEXED DB
   ========================================================= */

const deleteResumeFromDB = async () => {
  const db = await openResumeDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      RESUME_STORE_NAME,
      "readwrite"
    );

    const store = transaction.objectStore(
      RESUME_STORE_NAME
    );

    const request = store.delete(RESUME_KEY);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };

    transaction.oncomplete = () => {
      db.close();
    };

    transaction.onerror = () => {
      reject(transaction.error);
    };
  });
};

/* =========================================================
   FORMAT FILE SIZE
   ========================================================= */

const formatFileSize = (bytes = 0) => {
  if (!bytes) return "0 KB";

  const kb = bytes / 1024;

  if (kb < 1024) {
    return `${kb.toFixed(0)} KB`;
  }

  return `${(kb / 1024).toFixed(1)} MB`;
};

/* =========================================================
   PROFILE PAGE
   ========================================================= */

const Profile = () => {
  /* =======================================================
     USER
  ======================================================= */

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("hireaiUser") || "{}"
      );
    } catch {
      return {};
    }
  });

  /* =======================================================
     EDIT PROFILE
  ======================================================= */

  const [showEdit, setShowEdit] = useState(false);

  const [form, setForm] = useState({
    firstName: user.firstName || "Demo",
    lastName: user.lastName || "User",
    email: user.email || "demo@hireai.com",
    phone: user.phone || "+91 98765 43210",
    location:
      user.location || "Tamil Nadu, India",
    role: "Python Full Stack Developer",
    about:
      "Python Full Stack Developer passionate about building scalable and user-friendly web applications using Python, Django, React.js and MySQL.",
  });

  /* =======================================================
     APPLICATIONS
  ======================================================= */

  const applications = useMemo(() => {
    try {
      return JSON.parse(
        localStorage.getItem(
          "hireaiApplications"
        ) || "[]"
      );
    } catch {
      return [];
    }
  }, []);

  /* =======================================================
     SAVED JOBS
  ======================================================= */

  const savedJobs = useMemo(() => {
    try {
      return JSON.parse(
        localStorage.getItem(
          "hireaiSavedJobs"
        ) || "[]"
      );
    } catch {
      return [];
    }
  }, []);

  /* =======================================================
     SKILLS
  ======================================================= */

  const skills = [
    "Python",
    "Django",
    "React.js",
    "JavaScript",
    "MySQL",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "REST API",
    "Git",
  ];

  /* =======================================================
     CAREER MATCHES
  ======================================================= */

  const careerMatches = [
    {
      title: "Python Full Stack Developer",
      match: "94%",
    },
    {
      title: "React Developer",
      match: "89%",
    },
    {
      title: "Django Developer",
      match: "87%",
    },
  ];

  /* =======================================================
     RESUME
  ======================================================= */

  const resumeInputRef = useRef(null);

  const [resume, setResume] = useState(null);

  const [resumeLoading, setResumeLoading] =
    useState(true);

  const [resumeError, setResumeError] =
    useState("");

  /* =======================================================
     LOAD RESUME
  ======================================================= */

  useEffect(() => {
    const loadResume = async () => {
      try {
        const storedResume =
          await getResumeFromDB();

        if (storedResume) {
          setResume(storedResume);
        }
      } catch (error) {
        console.error(
          "Unable to load resume:",
          error
        );
      } finally {
        setResumeLoading(false);
      }
    };

    loadResume();
  }, []);

  /* =======================================================
     FULL NAME
  ======================================================= */

  const fullName = useMemo(() => {
    if (user.name) {
      return user.name;
    }

    return `${form.firstName || "Demo"} ${
      form.lastName || "User"
    }`;
  }, [
    user.name,
    form.firstName,
    form.lastName,
  ]);

  /* =======================================================
     PROFILE SCORE
  ======================================================= */

  const profileScore = useMemo(() => {
    let score = 60;

    if (form.firstName) score += 5;
    if (form.lastName) score += 5;
    if (form.email) score += 5;
    if (form.phone) score += 5;
    if (form.location) score += 5;

    if (applications.length > 0) {
      score += 5;
    }

    if (savedJobs.length > 0) {
      score += 5;
    }

    return Math.min(score, 100);
  }, [
    form.firstName,
    form.lastName,
    form.email,
    form.phone,
    form.location,
    applications.length,
    savedJobs.length,
  ]);

  /* =======================================================
     SAVE PROFILE
  ======================================================= */

  const handleSaveProfile = () => {
    const updatedUser = {
      ...user,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      name: `${form.firstName.trim()} ${form.lastName.trim()}`,
      email: form.email.trim(),
      phone: form.phone.trim(),
      location: form.location.trim(),
      loggedIn: true,
    };

    localStorage.setItem(
      "hireaiUser",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
    setShowEdit(false);
  };

  /* =======================================================
     RESUME UPLOAD
  ======================================================= */

  const handleResumeUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setResumeError("");

    /* Only PDF */

    if (file.type !== "application/pdf") {
      setResumeError(
        "Please upload a PDF resume only."
      );

      event.target.value = "";
      return;
    }

    /* Maximum 5 MB */

    if (file.size > 5 * 1024 * 1024) {
      setResumeError(
        "Resume size must be less than 5 MB."
      );

      event.target.value = "";
      return;
    }

    try {
      setResumeLoading(true);

      await saveResumeToDB(file);

      const resumeData =
        await getResumeFromDB();

      setResume(resumeData);
    } catch (error) {
      console.error(
        "Resume upload failed:",
        error
      );

      setResumeError(
        "Unable to save resume. Please try again."
      );
    } finally {
      setResumeLoading(false);
      event.target.value = "";
    }
  };

  /* =======================================================
     VIEW RESUME
  ======================================================= */

  const handleViewResume = () => {
    if (!resume?.blob) {
      setResumeError(
        "Please upload your resume first."
      );
      return;
    }

    try {
      const blobUrl =
        URL.createObjectURL(resume.blob);

      const newWindow =
        window.open(
          blobUrl,
          "_blank",
          "noopener,noreferrer"
        );

      if (!newWindow) {
        setResumeError(
          "Please allow pop-ups to view your resume."
        );
        URL.revokeObjectURL(blobUrl);
        return;
      }

      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 60000);
    } catch (error) {
      console.error(
        "Unable to view resume:",
        error
      );

      setResumeError(
        "Unable to open resume."
      );
    }
  };

  /* =======================================================
     DOWNLOAD RESUME
  ======================================================= */

  const handleDownloadResume = () => {
    if (!resume?.blob) {
      setResumeError(
        "Please upload your resume first."
      );
      return;
    }

    try {
      const blobUrl =
        URL.createObjectURL(resume.blob);

      const link =
        document.createElement("a");

      link.href = blobUrl;

      link.download =
        resume.name ||
        "HireAI_Resume.pdf";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 1000);
    } catch (error) {
      console.error(
        "Unable to download resume:",
        error
      );

      setResumeError(
        "Unable to download resume."
      );
    }
  };

  /* =======================================================
     REMOVE RESUME
  ======================================================= */

  const handleRemoveResume = async () => {
    try {
      setResumeLoading(true);

      await deleteResumeFromDB();

      setResume(null);
      setResumeError("");
    } catch (error) {
      console.error(
        "Unable to remove resume:",
        error
      );

      setResumeError(
        "Unable to remove resume."
      );
    } finally {
      setResumeLoading(false);
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">

      <Navbar />

      {/* ===================================================
          PROFILE HERO
      =================================================== */}

      <section className="relative overflow-hidden border-b border-slate-200 bg-white">

        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl" />

        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-violet-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">

          {/* Breadcrumb */}

          <div className="mb-10 flex items-center gap-2 text-xs font-semibold text-slate-400">

            <Link
              to="/dashboard"
              className="transition hover:text-indigo-600"
            >
              Dashboard
            </Link>

            <FiChevronRight className="text-slate-300" />

            <span className="text-slate-600">
              My Profile
            </span>

          </div>

          {/* Identity */}

          <div className="mx-auto max-w-4xl text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-blue-600 text-2xl font-black text-white shadow-xl shadow-indigo-200">
              {form.firstName
                ?.charAt(0)
                ?.toUpperCase()}

              {form.lastName
                ?.charAt(0)
                ?.toUpperCase()}
            </div>

            <p className="mt-6 text-[11px] font-black uppercase tracking-[0.22em] text-indigo-600">
              Candidate Profile
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {fullName}
            </h1>

            <p className="mt-3 text-lg font-semibold text-slate-500">
              {form.role}
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium text-slate-500">

              <span className="flex items-center gap-2">
                <FiMapPin className="text-slate-400" />
                {form.location}
              </span>

              <span className="flex items-center gap-2 text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Open to Work
              </span>

            </div>

            <button
              type="button"
              onClick={() =>
                setShowEdit(true)
              }
              className="group mt-7 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md"
            >
              <FiEdit3 />

              Edit Profile

              <FiArrowRight className="transition group-hover:translate-x-1" />
            </button>

          </div>
        </div>
      </section>

      {/* ===================================================
          MAIN
      =================================================== */}

      <main className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 lg:px-10">

        <div className="space-y-6">

          {/* =================================================
              SCORE CARDS
          ================================================= */}

          <div className="grid gap-6 lg:grid-cols-2">

            {/* PROFILE COMPLETION */}

            <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Profile Completion
                  </p>

                  <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
                    {profileScore}%
                  </h2>

                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <FiTarget size={20} />
                </div>

              </div>

              <div className="mt-6 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all"
                  style={{
                    width: `${profileScore}%`,
                  }}
                />

              </div>

              <div className="mt-4 flex items-center justify-between">

                <span className="text-xs font-medium text-slate-400">
                  Profile strength
                </span>

                <span className="flex items-center gap-1.5 text-xs font-black text-emerald-600">
                  <FiTrendingUp />

                  {profileScore >= 80
                    ? "Strong"
                    : "Improve"}
                </span>

              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">

                <CompletionItem
                  label="Basic info"
                  done
                />

                <CompletionItem
                  label="Skills"
                  done
                />

                <CompletionItem
                  label="Resume"
                  done={Boolean(resume)}
                />

                <CompletionItem
                  label="Projects"
                  done={profileScore >= 90}
                />

              </div>

            </section>

            {/* CAREER MATCH */}

            <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                    AI Career Match
                  </p>

                  <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
                    94%
                  </h2>

                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <FiZap size={20} />
                </div>

              </div>

              <p className="mt-2 text-sm text-slate-400">
                Based on your skills and profile
              </p>

              <div className="mt-6 space-y-4">

                {careerMatches.map(
                  (item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3.5"
                    >

                      <span className="text-sm font-bold text-slate-700">
                        {item.title}
                      </span>

                      <span className="flex items-center gap-1 text-xs font-black text-emerald-600">
                        <FiStar size={13} />
                        {item.match}
                      </span>

                    </div>
                  )
                )}

              </div>

            </section>

          </div>

          {/* =================================================
              ABOUT
          ================================================= */}

          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-indigo-600">
                  Professional Summary
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  About
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowEdit(true)
                }
                className="rounded-lg px-3 py-2 text-sm font-bold text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                Edit
              </button>

            </div>

            <p className="mt-5 max-w-5xl text-[15px] leading-8 text-slate-600">
              {form.about}
            </p>

          </section>

          {/* =================================================
              CONTACT + JOB PREFERENCES
          ================================================= */}

          <div className="grid gap-6 lg:grid-cols-2">

            {/* CONTACT */}

            <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 px-6 py-5 sm:px-7">

                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Personal Details
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  Contact
                </h2>

              </div>

              <div className="divide-y divide-slate-100">

                <ContactRow
                  icon={<FiMail />}
                  label="Email"
                  value={form.email}
                />

                <ContactRow
                  icon={<FiPhone />}
                  label="Phone"
                  value={form.phone}
                />

                <ContactRow
                  icon={<FiMapPin />}
                  label="Location"
                  value={form.location}
                />

              </div>

            </section>

            {/* JOB PREFERENCES */}

            <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 px-6 py-5 sm:px-7">

                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Career Preferences
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  Job Preferences
                </h2>

              </div>

              <div className="divide-y divide-slate-100">

                <PreferenceRow
                  label="Target Role"
                  value={form.role}
                />

                <PreferenceRow
                  label="Job Type"
                  value="Full-time"
                />

                <PreferenceRow
                  label="Work Mode"
                  value="Remote / Hybrid"
                />

                <PreferenceRow
                  label="Availability"
                  value={
                    <span className="flex items-center gap-2 text-emerald-600">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Open to Work
                    </span>
                  }
                />

              </div>

            </section>

          </div>

          {/* =================================================
              SKILLS
          ================================================= */}

          <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">

            <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">

              <div>

                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Technical Expertise
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  Skills
                </h2>

              </div>

              <button
                type="button"
                className="group flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-indigo-600 transition hover:bg-indigo-50"
              >
                Add skill

                <FiPlus className="transition group-hover:rotate-90" />
              </button>

            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">

              {skills.map((skill) => (
                <div
                  key={skill}
                  className="group flex items-center gap-3 border-b border-r border-slate-100 px-5 py-5 transition hover:bg-slate-50"
                >

                  <span className="h-2 w-2 rounded-full bg-indigo-600 transition group-hover:scale-125" />

                  <span className="text-sm font-bold text-slate-700">
                    {skill}
                  </span>

                </div>
              ))}

            </div>

          </section>

          {/* =================================================
              EXPERIENCE + RESUME
          ================================================= */}

          <div className="grid gap-6 lg:grid-cols-2">

            {/* EXPERIENCE */}

            <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 px-6 py-5 sm:px-7">

                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Career
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  Experience
                </h2>

              </div>

              <div className="p-6 sm:p-7">

                <div className="flex gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <FiBriefcase size={20} />
                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-start justify-between gap-3">

                      <div>

                        <h3 className="text-base font-black text-slate-900">
                          Python Full Stack Development
                        </h3>

                        <p className="mt-1 text-sm font-bold text-slate-500">
                          QTree Technologies
                        </p>

                      </div>

                      <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-600">
                        <FiCheck />
                        Completed
                      </span>

                    </div>

                    <p className="mt-3 text-xs font-medium text-slate-400">
                      2026 · Full Stack Development Program
                    </p>

                    <p className="mt-4 text-sm leading-7 text-slate-500">
                      Full-stack development training focused on
                      Python, Django, React.js, REST APIs,
                      MySQL and modern frontend development.
                    </p>

                  </div>

                </div>

              </div>

            </section>

            {/* RESUME */}

            <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 px-6 py-5 sm:px-7">

                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Career Document
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  Resume
                </h2>

              </div>

              <div className="p-6 sm:p-7">

                {/* Hidden input */}

                <input
                  ref={resumeInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleResumeUpload}
                  className="hidden"
                />

                {/* LOADING */}

                {resumeLoading ? (
                  <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-5">

                    <div className="h-14 w-14 animate-pulse rounded-xl bg-slate-200" />

                    <div className="flex-1 space-y-2">

                      <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />

                      <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />

                    </div>

                  </div>
                ) : !resume ? (
                  /* =================================================
                     EMPTY RESUME
                  ================================================= */

                  <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-7 text-center transition hover:border-indigo-300 hover:bg-indigo-50/30">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <FiFileText size={24} />
                    </div>

                    <h3 className="mt-4 text-base font-black text-slate-900">
                      Upload your resume
                    </h3>

                    <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-slate-400">
                      Upload your latest resume in PDF format.
                      Maximum file size is 5 MB.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        resumeInputRef.current?.click()
                      }
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
                    >
                      <FiPlus />
                      Upload Resume
                    </button>

                  </div>
                ) : (
                  /* =================================================
                     RESUME AVAILABLE
                  ================================================= */

                  <div>

                    <div className="flex items-start gap-4">

                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <FiFileText size={22} />
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="truncate text-sm font-black text-slate-900">
                          {resume.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          PDF ·{" "}
                          {formatFileSize(
                            resume.size
                          )}
                        </p>

                        <p className="mt-2 flex items-center gap-1.5 text-xs font-black text-emerald-600">
                          <FiCheck />
                          Ready for applications
                        </p>

                      </div>

                    </div>

                    {/* ACTIONS */}

                    <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">

                      <button
                        type="button"
                        onClick={
                          handleViewResume
                        }
                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-indigo-700"
                      >
                        <FiFileText />
                        View Resume
                      </button>

                      <button
                        type="button"
                        onClick={
                          handleDownloadResume
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <FiDownload />
                        Download
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          resumeInputRef.current?.click()
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <FiEdit3 />
                        Replace
                      </button>

                      <button
                        type="button"
                        onClick={
                          handleRemoveResume
                        }
                        className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-red-500 transition hover:bg-red-50"
                      >
                        <FiX />
                        Remove
                      </button>

                    </div>

                  </div>
                )}

                {/* ERROR */}

                {resumeError && (
                  <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-bold text-red-600">
                    {resumeError}
                  </div>
                )}

              </div>

            </section>

          </div>

          {/* =================================================
              JOB ACTIVITY
          ================================================= */}

          <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-6 py-5 sm:px-7">

              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                HireAI Activity
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Job Search Activity
              </h2>

            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3">

              <ActivityCard
                icon={<FiBriefcase />}
                value={applications.length}
                label="Applications"
                description="Jobs you have applied for"
                link="/dashboard"
              />

              <ActivityCard
                icon={<FiStar />}
                value={savedJobs.length}
                label="Saved Jobs"
                description="Jobs shortlisted for later"
                link="/jobs"
              />

              <ActivityCard
                icon={<FiZap />}
                value={24}
                label="AI Matches"
                description="Roles matching your profile"
                link="/jobs"
              />

            </div>

          </section>

        </div>
      </main>

      {/* =====================================================
          EDIT PROFILE MODAL
      ===================================================== */}

      {showEdit && (
        <EditProfileModal
          form={form}
          setForm={setForm}
          onClose={() =>
            setShowEdit(false)
          }
          onSave={handleSaveProfile}
        />
      )}

    </div>
  );
};

/* ===========================================================
   COMPLETION ITEM
   =========================================================== */

const CompletionItem = ({
  label,
  done,
}) => {
  return (
    <div className="flex items-center gap-2">

      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full ${
          done
            ? "bg-emerald-50 text-emerald-600"
            : "bg-slate-100 text-slate-400"
        }`}
      >
        {done ? (
          <FiCheck className="text-xs" />
        ) : (
          <span className="text-[10px]">
            +
          </span>
        )}
      </span>

      <span className="text-xs font-semibold text-slate-500">
        {label}
      </span>

    </div>
  );
};

/* ===========================================================
   CONTACT ROW
   =========================================================== */

const ContactRow = ({
  icon,
  label,
  value,
}) => {
  return (
    <div className="flex items-center gap-4 px-6 py-5 sm:px-7">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-all text-sm font-bold text-slate-700">
          {value}
        </p>

      </div>

    </div>
  );
};

/* ===========================================================
   PREFERENCE ROW
   =========================================================== */

const PreferenceRow = ({
  label,
  value,
}) => {
  return (
    <div className="grid grid-cols-[120px_1fr] items-center gap-4 px-6 py-5 sm:px-7">

      <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
        {label}
      </span>

      <span className="text-sm font-bold text-slate-700">
        {value}
      </span>

    </div>
  );
};

/* ===========================================================
   ACTIVITY CARD
   =========================================================== */

const ActivityCard = ({
  icon,
  value,
  label,
  description,
  link,
}) => {
  return (
    <Link
      to={link}
      className="group border-b border-slate-100 p-6 transition hover:bg-slate-50 lg:border-b-0 lg:border-r lg:last:border-r-0"
    >

      <div className="flex items-start justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {icon}
        </div>

        <FiArrowRight
          className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-500"
          size={18}
        />

      </div>

      <p className="mt-5 text-3xl font-black text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-sm font-black text-slate-700">
        {label}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>

    </Link>
  );
};

/* ===========================================================
   EDIT PROFILE MODAL
   =========================================================== */

const EditProfileModal = ({
  form,
  setForm,
  onClose,
  onSave,
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">

      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[24px] border border-slate-200 bg-white shadow-2xl">

        {/* HEADER */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5 sm:px-7">

          <div>

            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
              Profile Settings
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900">
              Edit Profile
            </h2>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Close
            <FiX />
          </button>

        </div>

        {/* FORM */}

        <div className="space-y-6 p-6 sm:p-7">

          <div className="grid gap-5 sm:grid-cols-2">

            <FormInput
              label="First Name"
              value={form.firstName}
              onChange={(value) =>
                setForm({
                  ...form,
                  firstName: value,
                })
              }
            />

            <FormInput
              label="Last Name"
              value={form.lastName}
              onChange={(value) =>
                setForm({
                  ...form,
                  lastName: value,
                })
              }
            />

          </div>

          <FormInput
            label="Email Address"
            type="email"
            value={form.email}
            onChange={(value) =>
              setForm({
                ...form,
                email: value,
              })
            }
          />

          <div className="grid gap-5 sm:grid-cols-2">

            <FormInput
              label="Phone"
              value={form.phone}
              onChange={(value) =>
                setForm({
                  ...form,
                  phone: value,
                })
              }
            />

            <FormInput
              label="Location"
              value={form.location}
              onChange={(value) =>
                setForm({
                  ...form,
                  location: value,
                })
              }
            />

          </div>

          <div>

            <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
              Professional Summary
            </label>

            <textarea
              rows="6"
              value={form.about}
              onChange={(e) =>
                setForm({
                  ...form,
                  about: e.target.value,
                })
              }
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />

          </div>

        </div>

        {/* FOOTER */}

        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-5 sm:px-7">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-5 py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSave}
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
};

/* ===========================================================
   FORM INPUT
   =========================================================== */

const FormInput = ({
  label,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <div>

      <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
      />

    </div>
  );
};

export default Profile;