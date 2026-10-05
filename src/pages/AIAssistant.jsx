import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";

import {
  FiActivity,
  FiArrowRight,
  FiBarChart2,
  FiBriefcase,
  FiCheck,
  FiChevronRight,
  FiClock,
  FiFileText,
  FiMapPin,
  FiMessageCircle,
  FiPaperclip,
  FiRefreshCw,
  FiSend,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUser,
  FiX,
  FiZap,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import { jobs } from "../data/jobs";

/* =========================================================
   AI ASSISTANT
   ========================================================= */

const AIAssistant = () => {
  /* =======================================================
     USER
  ======================================================= */

  const [user] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("hireaiUser") || "{}"
      );
    } catch {
      return {};
    }
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
     CHAT
  ======================================================= */

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: `Hi ${
        user?.firstName || "there"
      }! I'm HireAI Copilot. I can help you with jobs, skills, resumes, interviews and your career roadmap.`,
      time: "Now",
    },
    {
      id: 2,
      sender: "ai",
      text: "What would you like to work on today?",
      time: "Now",
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const chatEndRef = useRef(null);

  /* =======================================================
     QUICK PROMPTS
  ======================================================= */

  const quickPrompts = [
    {
      label: "Best Jobs",
      icon: <FiBriefcase />,
      prompt: "Show me the best jobs for my profile",
    },
    {
      label: "Resume",
      icon: <FiFileText />,
      prompt: "How can I improve my resume?",
    },
    {
      label: "Interview",
      icon: <FiTarget />,
      prompt: "Help me prepare for an interview",
    },
  ];

  /* =======================================================
     USER NAME
  ======================================================= */

  const fullName =
    user?.name ||
    `${user?.firstName || "Demo"} ${
      user?.lastName || "User"
    }`;

  const firstName =
    user?.firstName ||
    fullName.split(" ")[0] ||
    "User";

  const initials =
    `${user?.firstName?.charAt(0) || firstName.charAt(0) || "U"}${
      user?.lastName?.charAt(0) || ""
    }`.toUpperCase();

  /* =======================================================
     CAREER SCORE
  ======================================================= */

  const careerScore = useMemo(() => {
    let score = 76;

    if (user?.email) score += 3;
    if (user?.phone) score += 3;
    if (user?.location) score += 2;

    if (savedJobs.length > 0) {
      score += 2;
    }

    if (applications.length > 0) {
      score += 2;
    }

    return Math.min(score, 95);
  }, [
    user,
    savedJobs.length,
    applications.length,
  ]);

  /* =======================================================
     AI JOB MATCHES
  ======================================================= */

  const aiMatches = useMemo(() => {
    if (!jobs || jobs.length === 0) {
      return [];
    }

    return jobs
      .slice(0, 3)
      .map((job, index) => ({
        ...job,
        aiMatch:
          index === 0
            ? 94
            : index === 1
            ? 89
            : 86,
      }));
  }, []);

  /* =======================================================
     SCROLL TO BOTTOM
  ======================================================= */

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  /* =======================================================
     AI RESPONSE
  ======================================================= */

  const generateResponse = (question) => {
    const text = question.toLowerCase();

    if (
      text.includes("best job") ||
      text.includes("jobs") ||
      text.includes("job match")
    ) {
      return `Based on your current profile, I'd focus on Python Full Stack, React and Django roles. Your strongest match is Python Full Stack Developer. I can also help you shortlist jobs based on location, salary and skills.`;
    }

    if (
      text.includes("resume") ||
      text.includes("cv")
    ) {
      return `Your resume should clearly highlight Python, Django, React.js, JavaScript, MySQL and your full-stack project experience. Keep the strongest technical skills near the top and use measurable project achievements wherever possible.`;
    }

    if (
      text.includes("interview") ||
      text.includes("interview preparation")
    ) {
      return `For a Python Full Stack interview, prepare Python fundamentals, Django/REST APIs, React, JavaScript, SQL and your project explanation. Also practice HR questions and be ready to explain why you selected each technology.`;
    }

    if (
      text.includes("skill") ||
      text.includes("skills")
    ) {
      return `Your current stack is strong for junior full-stack roles: Python, Django, React.js, JavaScript, MySQL, HTML, CSS, Tailwind CSS, REST APIs and Git. Next, strengthen DSA basics, authentication, deployment and real-world API integration.`;
    }

    if (
      text.includes("profile") ||
      text.includes("improve")
    ) {
      return `Your profile is already in a good position. To improve it further, keep your resume updated, add strong project descriptions, maintain a complete skills section and apply consistently to high-match roles.`;
    }

    if (
      text.includes("roadmap") ||
      text.includes("career")
    ) {
      return `A good next step for your career is: strengthen Python and Django → build REST APIs → improve React → complete one production-style full-stack project → prepare DSA and interviews → apply consistently to relevant roles.`;
    }

    if (
      text.includes("python") ||
      text.includes("django") ||
      text.includes("react")
    ) {
      return `You already have a useful full-stack combination. For interviews, be ready to explain Python OOP, Django models and serializers, REST APIs, JWT authentication, React hooks, state management and MySQL queries.`;
    }

    return `I can help you with jobs, Python/Django, React, resume improvement, interview preparation, career roadmaps, skills, applications and profile optimization. Tell me what you'd like to work on.`;
  };

  /* =======================================================
     SEND MESSAGE
  ======================================================= */

  const sendMessage = (messageText = input) => {
    const trimmed = messageText.trim();

    if (!trimmed || typing) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
      time: "Now",
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response = generateResponse(
        trimmed
      );

      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: response,
          time: "Now",
        },
      ]);

      setTyping(false);
    }, 700);
  };

  /* =======================================================
     ENTER KEY
  ======================================================= */

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      sendMessage();
    }
  };

  /* =======================================================
     CLEAR CHAT
  ======================================================= */

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: "ai",
        text: `Hi ${
          firstName || "there"
        }! I'm HireAI Copilot. What would you like to work on?`,
        time: "Now",
      },
    ]);

    setInput("");
    setTyping(false);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">

      <Navbar />

      {/* ===================================================
          MAIN
      =================================================== */}

      <main className="mx-auto max-w-[1400px] px-5 py-6 sm:px-8 lg:px-10 lg:py-8">

        {/* =================================================
            GRID
        ================================================= */}

        <div className="mt-2 grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_350px]">

          {/* =================================================
              LEFT CHAT AREA
          ================================================= */}

          <div className="flex justify-center xl:translate-x-20">

            <section className="flex h-[680px] w-full max-w-[410px] flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-200/50">

              {/* =================================================
                  CHAT HEADER
              ================================================= */}

              <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4">

                <div className="flex items-center gap-3">

                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200">

                    <FiZap size={20} />

                    <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />

                  </div>

                  <div>

                    <h1 className="text-sm font-black text-slate-900">
                      HireAI Copilot
                    </h1>

                    <div className="mt-0.5 flex items-center gap-1.5 text-[10px] font-medium text-slate-400">

                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                      Online · Ready

                    </div>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={clearChat}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <FiRefreshCw size={13} />
                  New
                </button>

              </div>

              {/* =================================================
                  CHAT MESSAGES
              ================================================= */}

              <div className="min-h-0 flex-1 overflow-y-auto bg-[#f8f9fc] px-4 py-5">

                <div className="space-y-5">

                  {messages.map(
                    (message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender ===
                          "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >

                        <div
                          className={`flex max-w-[86%] items-end gap-2 ${
                            message.sender ===
                            "user"
                              ? "flex-row-reverse"
                              : ""
                          }`}
                        >

                          {/* AI icon */}

                          {message.sender ===
                            "ai" && (
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                              <FiZap size={13} />
                            </div>
                          )}

                          {/* User avatar */}

                          {message.sender ===
                            "user" && (
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-[10px] font-black text-white">
                              {initials}
                            </div>
                          )}

                          <div>

                            <div
                              className={`rounded-2xl px-4 py-3 text-[13px] leading-6 shadow-sm ${
                                message.sender ===
                                "user"
                                  ? "rounded-br-md bg-indigo-600 text-white"
                                  : "rounded-bl-md border border-slate-200 bg-white text-slate-600"
                              }`}
                            >
                              {message.text}
                            </div>

                            <p
                              className={`mt-1.5 text-[9px] text-slate-400 ${
                                message.sender ===
                                "user"
                                  ? "text-right"
                                  : ""
                              }`}
                            >
                              {message.time}
                            </p>

                          </div>

                        </div>

                      </div>
                    )
                  )}

                  {/* =================================================
                      TYPING
                  ================================================= */}

                  {typing && (
                    <div className="flex items-end gap-2">

                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                        <FiZap size={13} />
                      </div>

                      <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-sm">

                        <div className="flex items-center gap-1">

                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />

                          <span
                            className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                            style={{
                              animationDelay:
                                "120ms",
                            }}
                          />

                          <span
                            className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                            style={{
                              animationDelay:
                                "240ms",
                            }}
                          />

                        </div>

                      </div>

                    </div>
                  )}

                  <div ref={chatEndRef} />

                </div>

              </div>

              {/* =================================================
                  QUICK PROMPTS
              ================================================= */}

              <div className="shrink-0 border-t border-slate-100 bg-white px-4 py-3">

                <p className="mb-2 text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Quick Prompts
                </p>

                <div className="flex gap-2 overflow-x-auto pb-1">

                  {quickPrompts.map(
                    (item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() =>
                          sendMessage(
                            item.prompt
                          )
                        }
                        className="flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-bold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    )
                  )}

                </div>

              </div>

              {/* =================================================
                  INPUT
              ================================================= */}

              <div className="shrink-0 border-t border-slate-100 bg-white p-3">

                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    sendMessage();
                  }}
                  className="flex items-center gap-2 rounded-xl border border-indigo-200 bg-white p-1.5 shadow-sm ring-4 ring-indigo-500/5"
                >

                  <button
                    type="button"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    aria-label="Attach"
                  >
                    <FiPaperclip size={16} />
                  </button>

                  <input
                    value={input}
                    onChange={(event) =>
                      setInput(
                        event.target.value
                      )
                    }
                    onKeyDown={handleKeyDown}
                    placeholder="Ask HireAI..."
                    className="min-w-0 flex-1 bg-transparent px-1 text-xs font-medium text-slate-700 outline-none placeholder:text-slate-400"
                  />

                  <button
                    type="submit"
                    disabled={
                      !input.trim() ||
                      typing
                    }
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Send message"
                  >
                    <FiSend size={15} />
                  </button>

                </form>

              </div>

            </section>

          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside className="space-y-5">

            {/* =================================================
                PROFILE CARD
            ================================================= */}

            <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-lg font-black text-white shadow-lg shadow-indigo-100">
                  {initials}
                </div>

                <div className="min-w-0">

                  <h2 className="truncate text-base font-black text-slate-900">
                    {fullName}
                  </h2>

                  <p className="mt-1 truncate text-xs font-medium text-slate-400">
                    Python Full Stack Developer
                  </p>

                </div>

              </div>

              <div className="mt-6 flex items-center justify-between">

                <span className="text-xs font-bold text-slate-500">
                  Profile strength
                </span>

                <span className="text-xs font-black text-indigo-600">
                  {careerScore}%
                </span>

              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                  style={{
                    width: `${careerScore}%`,
                  }}
                />

              </div>

              <Link
                to="/profile"
                className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-black text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              >
                Improve profile
                <FiArrowRight />
              </Link>

            </section>

            {/* =================================================
                AI INSIGHTS
            ================================================= */}

            <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                    AI Insights
                  </p>

                  <h2 className="mt-2 text-xl font-black text-slate-950">
                    Career snapshot
                  </h2>

                </div>

                <FiActivity
                  className="text-indigo-500"
                  size={20}
                />

              </div>

              <div className="mt-5 space-y-2.5">

                <InsightRow
                  icon={<FiTarget />}
                  label="Career Score"
                  value="88"
                  valueClass="text-indigo-600"
                />

                <InsightRow
                  icon={<FiBriefcase />}
                  label="Job Matches"
                  value="4"
                  valueClass="text-emerald-600"
                />

                <InsightRow
                  icon={<FiStar />}
                  label="Saved Jobs"
                  value={savedJobs.length}
                  valueClass="text-rose-500"
                />

                <InsightRow
                  icon={<FiFileText />}
                  label="Applications"
                  value={applications.length}
                  valueClass="text-violet-600"
                />

              </div>

            </section>

            {/* =================================================
                AI MATCHES
            ================================================= */}

            <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                    AI Matches
                  </p>

                  <h2 className="mt-2 text-xl font-black text-slate-950">
                    Recommended roles
                  </h2>

                </div>

                <FiTrendingUp
                  className="text-indigo-500"
                  size={19}
                />

              </div>

              <div className="mt-5 space-y-3">

                {aiMatches.map(
                  (job, index) => (
                    <Link
                      key={
                        job.id ||
                        `${job.title}-${index}`
                      }
                      to={
                        job.id
                          ? `/job/${job.id}`
                          : "/jobs"
                      }
                      className="group block rounded-xl border border-slate-100 p-3 transition hover:border-indigo-200 hover:bg-indigo-50/30"
                    >

                      <div className="flex items-start gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-black text-indigo-600">
                          {job.logo ||
                            job.company
                              ?.slice(0, 2)
                              .toUpperCase() ||
                            "AI"}
                        </div>

                        <div className="min-w-0 flex-1">

                          <div className="flex items-start justify-between gap-2">

                            <h3 className="truncate text-xs font-black text-slate-800">
                              {job.title ||
                                "Full Stack Developer"}
                            </h3>

                            <span className="shrink-0 text-[10px] font-black text-emerald-600">
                              {job.aiMatch}%
                            </span>

                          </div>

                          <p className="mt-1 truncate text-[10px] font-medium text-slate-400">
                            {job.company ||
                              "Tech Company"}
                          </p>

                          <p className="mt-1 flex items-center gap-1 text-[9px] text-slate-400">
                            <FiMapPin size={10} />
                            {job.location ||
                              "India"}
                          </p>

                        </div>

                      </div>

                    </Link>
                  )
                )}

              </div>

              <Link
                to="/jobs"
                className="group mt-4 flex items-center justify-center gap-2 text-xs font-black text-indigo-600 transition hover:text-indigo-800"
              >
                Explore all jobs
                <FiArrowRight className="transition group-hover:translate-x-1" />
              </Link>

            </section>

            {/* =================================================
                CAREER TOOLS
            ================================================= */}

            <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                Career Tools
              </p>

              <h2 className="mt-2 text-xl font-black text-slate-950">
                What can I help with?
              </h2>

              <div className="mt-5 space-y-2">

                <ToolRow
                  icon={<FiBarChart2 />}
                  title="Skills"
                  subtitle="Ask HireAI"
                  onClick={() =>
                    sendMessage(
                      "Help me improve my skills"
                    )
                  }
                />

                <ToolRow
                  icon={<FiUser />}
                  title="Profile"
                  subtitle="Ask HireAI"
                  onClick={() =>
                    sendMessage(
                      "How can I improve my profile?"
                    )
                  }
                />

                <ToolRow
                  icon={<FiClock />}
                  title="Career Roadmap"
                  subtitle="Ask HireAI"
                  onClick={() =>
                    sendMessage(
                      "Give me a career roadmap"
                    )
                  }
                />

              </div>

            </section>

            {/* =================================================
                CAREER TIP
            ================================================= */}

            <section className="relative overflow-hidden rounded-[24px] border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-5">

              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-200/30 blur-2xl" />

              <div className="relative">

                <div className="flex items-center gap-2">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-200">
                    <FiTrendingUp size={16} />
                  </div>

                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-indigo-600">
                    Career Tip
                  </p>

                </div>

                <h3 className="mt-4 text-lg font-black text-slate-950">
                  Build proof, not just skills.
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  Strong projects make your technical
                  skills easier for recruiters to understand.
                  Keep building and documenting real-world
                  applications.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    sendMessage(
                      "Give me advice to improve my career"
                    )
                  }
                  className="mt-4 flex items-center gap-2 text-xs font-black text-indigo-600 transition hover:text-indigo-800"
                >
                  Ask HireAI
                  <FiArrowRight />
                </button>

              </div>

            </section>

          </aside>

        </div>

      </main>

    </div>
  );
};

/* ===========================================================
   INSIGHT ROW
   =========================================================== */

const InsightRow = ({
  icon,
  label,
  value,
  valueClass,
}) => {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3.5">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-500 shadow-sm">
        {icon}
      </div>

      <span className="flex-1 text-xs font-bold text-slate-700">
        {label}
      </span>

      <span
        className={`text-sm font-black ${valueClass}`}
      >
        {value}
      </span>

    </div>
  );
};

/* ===========================================================
   TOOL ROW
   =========================================================== */

const ToolRow = ({
  icon,
  title,
  subtitle,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition hover:border-indigo-200 hover:bg-indigo-50/30"
    >

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-xs font-black text-slate-800">
          {title}
        </p>

        <p className="mt-0.5 text-[9px] font-medium text-slate-400">
          {subtitle}
        </p>

      </div>

      <FiChevronRight
        className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-500"
        size={16}
      />

    </button>
  );
};

export default AIAssistant;