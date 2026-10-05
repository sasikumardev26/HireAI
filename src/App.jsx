import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// ==================== PAGES ====================

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Companies from "./pages/Companies";
import JobDetails from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";

import AIAssistant from "./pages/AIAssistant";
import Profile from "./pages/Profile";

// ==================== AUTH ====================

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==================== PUBLIC ==================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/companies"
          element={<Companies />}
        />

        <Route
          path="/job/:id"
          element={<JobDetails />}
        />


        {/* ==================== PROTECTED ==================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/apply/:id"
          element={
            <ProtectedRoute>
              <ApplyJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-assistant"
          element={
            <ProtectedRoute>
              <AIAssistant />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


        {/* ==================== FALLBACK ==================== */}

        <Route
          path="*"
          element={<Home />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;