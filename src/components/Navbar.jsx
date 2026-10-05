import React, { useEffect, useRef, useState } from "react";
import {
  FiBell,
  FiBriefcase,
  FiChevronDown,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiSearch,
  FiUser,
  FiX,
  FiZap,
} from "react-icons/fi";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const profileRef = useRef(null);

  /* =======================================================
     LOAD USER
  ======================================================= */

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem(
          "hireaiUser"
        );

        setUser(
          storedUser
            ? JSON.parse(storedUser)
            : null
        );
      } catch {
        setUser(null);
      }
    };

    loadUser();

    window.addEventListener(
      "storage",
      loadUser
    );

    return () => {
      window.removeEventListener(
        "storage",
        loadUser
      );
    };
  }, [location.pathname]);

  /* =======================================================
     CLOSE PROFILE DROPDOWN OUTSIDE CLICK
  ======================================================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* =======================================================
     CLOSE MOBILE MENU ON ROUTE CHANGE
  ======================================================= */

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const navItems = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Jobs",
      path: "/jobs",
    },
    {
      label: "Companies",
      path: "/companies",
    },
  ];

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {
    localStorage.removeItem("hireaiUser");

    setUser(null);
    setProfileOpen(false);
    setMobileOpen(false);

    navigate("/login", {
      replace: true,
    });
  };

  /* =======================================================
     SEARCH
  ======================================================= */

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      navigate("/jobs");
      return;
    }

    navigate(
      `/jobs?search=${encodeURIComponent(query)}`
    );

    setSearch("");
    setSearchOpen(false);
  };

  /* =======================================================
     ACTIVE CLASS
  ======================================================= */

  const getNavClass = ({
    isActive,
  }) => {
    return `
      relative flex items-center justify-center
      rounded-xl px-4 py-2.5 text-[13px]
      font-bold transition-all duration-200
      ${
        isActive
          ? "bg-indigo-50 text-indigo-600"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
      }
    `;
  };

  /* =======================================================
     USER DATA
  ======================================================= */

  const displayName =
    user?.name ||
    `${user?.firstName || "Demo"} ${
      user?.lastName || "User"
    }`;

  const firstName =
    user?.firstName ||
    displayName.split(" ")[0] ||
    "User";

  const initials =
    `${user?.firstName?.charAt(0) || displayName.charAt(0) || "U"}${
      user?.lastName?.charAt(0) || ""
    }`.toUpperCase();

  return (
    <>
      {/* ===================================================
          NAVBAR
      =================================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">

        {/* Premium top gradient */}

        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500" />

        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center gap-4 px-5 sm:px-7 lg:px-9">

          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            className="group flex shrink-0 items-center gap-3"
          >

            <div className="relative">

              <div className="absolute inset-0 rounded-[15px] bg-indigo-500/20 blur-md transition group-hover:bg-indigo-500/30" />

              <div className="relative flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-indigo-600 via-violet-600 to-blue-600 text-white shadow-lg shadow-indigo-200 transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xl">
                <FiZap size={21} strokeWidth={2.5} />
              </div>

              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />

            </div>

            <div className="hidden sm:block">

              <div className="text-[20px] font-black leading-none tracking-tight text-slate-950">
                Hire<span className="text-indigo-600">AI</span>
              </div>

              <div className="mt-1 text-[8px] font-black uppercase tracking-[0.19em] text-slate-400">
                Smart Career Platform
              </div>

            </div>

          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <nav className="ml-auto hidden items-center gap-1 lg:flex">

            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={getNavClass}
              >
                {item.label}
              </NavLink>
            ))}

            {/* AI ASSISTANT */}

            <NavLink
              to="/ai-assistant"
              className={({ isActive }) =>
                `
                group relative ml-1 flex items-center
                gap-2 rounded-xl px-4 py-2.5
                text-[13px] font-black transition-all
                ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                }
                `
              }
            >

              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                <FiZap size={13} />
              </span>

              AI Assistant

              <span className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-1.5 py-0.5 text-[7px] font-black uppercase tracking-wide text-white">
                AI
              </span>

            </NavLink>

            {/* DASHBOARD */}

            <NavLink
              to="/dashboard"
              className={getNavClass}
            >
              <FiGrid
                size={14}
                className="mr-1.5"
              />
              Dashboard
            </NavLink>

          </nav>

          {/* =================================================
              RIGHT ACTIONS
          ================================================= */}

          <div className="ml-auto flex items-center gap-1.5 lg:ml-4">

            {/* SEARCH */}

            <div className="relative">

              {searchOpen ? (
                <form
                  onSubmit={handleSearch}
                  className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center"
                >

                  <div className="flex h-10 w-[250px] items-center rounded-xl border border-slate-200 bg-white px-3 shadow-lg shadow-slate-200/50">

                    <FiSearch
                      className="shrink-0 text-slate-400"
                      size={17}
                    />

                    <input
                      autoFocus
                      value={search}
                      onChange={(e) =>
                        setSearch(
                          e.target.value
                        )
                      }
                      placeholder="Search jobs..."
                      className="ml-2 min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setSearchOpen(false);
                      }}
                      className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      <FiX size={15} />
                    </button>

                  </div>

                </form>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    setSearchOpen(true)
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Search jobs"
                >
                  <FiSearch size={19} />
                </button>
              )}

            </div>

            {/* NOTIFICATION */}

            <button
              type="button"
              className="relative hidden h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 sm:flex"
              aria-label="Notifications"
            >

              <FiBell size={19} />

              <span className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full bg-indigo-600 ring-2 ring-white" />

            </button>

            <div className="mx-1 hidden h-7 w-px bg-slate-200 sm:block" />

            {/* =================================================
                PROFILE
            ================================================= */}

            <div
              ref={profileRef}
              className="relative hidden sm:block"
            >

              <button
                type="button"
                onClick={() =>
                  setProfileOpen(
                    (value) => !value
                  )
                }
                className="group flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition hover:bg-slate-50"
              >

                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-black text-white shadow-sm">

                  {initials}

                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />

                </div>

                <div className="hidden text-left xl:block">

                  <p className="max-w-[110px] truncate text-xs font-black text-slate-800">
                    {firstName}
                  </p>

                  <p className="text-[10px] font-medium text-slate-400">
                    Candidate
                  </p>

                </div>

                <FiChevronDown
                  size={15}
                  className={`hidden text-slate-400 transition xl:block ${
                    profileOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />

              </button>

              {/* DROPDOWN */}

              {profileOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/30">

                  {/* Profile header */}

                  <div className="border-b border-slate-100 bg-gradient-to-br from-indigo-50 to-violet-50 p-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-black text-white">
                        {initials}
                      </div>

                      <div className="min-w-0">

                        <p className="truncate text-sm font-black text-slate-900">
                          {displayName}
                        </p>

                        <p className="truncate text-xs text-slate-500">
                          {user?.email ||
                            "Candidate"}
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="p-2">

                    <DropdownItem
                      icon={<FiUser />}
                      label="My Profile"
                      onClick={() =>
                        navigate("/profile")
                      }
                    />

                    <DropdownItem
                      icon={<FiGrid />}
                      label="Dashboard"
                      onClick={() =>
                        navigate("/dashboard")
                      }
                    />

                    <DropdownItem
                      icon={<FiZap />}
                      label="AI Assistant"
                      onClick={() =>
                        navigate(
                          "/ai-assistant"
                        )
                      }
                    />

                  </div>

                  <div className="border-t border-slate-100 p-2">

                    <button
                      type="button"
                      onClick={
                        handleLogout
                      }
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-red-500 transition hover:bg-red-50"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
                        <FiLogOut />
                      </span>

                      Logout
                    </button>

                  </div>

                </div>
              )}

            </div>

            {/* =================================================
                MOBILE MENU BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={() =>
                setMobileOpen(
                  (value) => !value
                )
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-700 transition hover:bg-slate-100 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <FiX size={21} />
              ) : (
                <FiMenu size={21} />
              )}
            </button>

          </div>

        </div>

        {/* ===================================================
            MOBILE MENU
        =================================================== */}

        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white lg:hidden">

            <div className="mx-auto max-w-[1500px] space-y-2 px-5 py-4 sm:px-7">

              {/* Mobile search */}

              <form
                onSubmit={handleSearch}
                className="mb-3 flex h-11 items-center rounded-xl border border-slate-200 bg-slate-50 px-3"
              >

                <FiSearch
                  className="text-slate-400"
                  size={17}
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search jobs..."
                  className="ml-2 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
                />

              </form>

              {/* Mobile nav */}

              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `
                    flex items-center rounded-xl
                    px-4 py-3.5 text-sm font-bold
                    ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-700 hover:bg-slate-50"
                    }
                    `
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <NavLink
                to="/ai-assistant"
                className={({ isActive }) =>
                  `
                  flex items-center gap-3 rounded-xl
                  px-4 py-3.5 text-sm font-black
                  ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-700 hover:bg-slate-50"
                  }
                  `
                }
              >

                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <FiZap />
                </span>

                AI Assistant

                <span className="ml-auto rounded-full bg-indigo-600 px-2 py-0.5 text-[8px] font-black text-white">
                  AI
                </span>

              </NavLink>

              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `
                  flex items-center gap-3 rounded-xl
                  px-4 py-3.5 text-sm font-bold
                  ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-700 hover:bg-slate-50"
                  }
                  `
                }
              >
                <FiGrid size={17} />
                Dashboard
              </NavLink>

              {/* Mobile profile */}

              <div className="mt-3 border-t border-slate-100 pt-3">

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-black text-white">
                    {initials}
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-black text-slate-900">
                      {displayName}
                    </p>

                    <p className="truncate text-xs text-slate-400">
                      {user?.email ||
                        "Candidate"}
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-bold text-red-500 transition hover:bg-red-50"
                >
                  <FiLogOut />
                  Logout
                </button>

              </div>

            </div>

          </div>
        )}

      </header>
    </>
  );
};

/* ===========================================================
   DROPDOWN ITEM
   =========================================================== */

const DropdownItem = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-indigo-600"
    >

      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-500 transition group-hover:bg-indigo-50 group-hover:text-indigo-600">
        {icon}
      </span>

      {label}

      <FiChevronDown className="ml-auto -rotate-90 text-slate-300" />

    </button>
  );
};

export default Navbar;