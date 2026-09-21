import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import ClientPortal from "./pages/ClientPortal/ClientPortal";
import ProtectedRoute from "./components/ProtectedRoute";
import Shell from "./components/layout/Shell";
import Dashboard from "./pages/internal/Dashboard";
import Clients from "./pages/internal/Clients";
import ClientProfile from "./pages/internal/ClientProfile";
import Matters from "./pages/internal/Matters";
import MatterWorkspace from "./pages/internal/MatterWorkspace";
import Documents from "./pages/internal/Documents";
import Tasks from "./pages/internal/Tasks";
import Calendar from "./pages/internal/Calendar";
import Communications from "./pages/internal/Communications";
import Billing from "./pages/internal/Billing";
import Reports from "./pages/internal/Reports";
import Verification from "./pages/internal/Verification";
import Archive from "./pages/internal/Archive";
import Administration from "./pages/internal/Administration";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public routes ─────────────────────────────────────── */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ── Protected portals ─────────────────────────────────── */}
        {/* Client side does not use the internal side navigation layout */}
        <Route
          path="/portal/client"
          element={
            <ProtectedRoute>
              <ClientPortal />
            </ProtectedRoute>
          }
        />

        {/* Internal Shell mapping for all Lawyers / Staff / Admins */}
        <Route
          path="/internal"
          element={
            <ProtectedRoute>
              <Shell />
            </ProtectedRoute>
          }
        >
          {/* Default redirect for /internal to /internal/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="clients/:id" element={<ClientProfile />} />
          <Route path="matters" element={<Matters />} />
          <Route path="matters/:id" element={<MatterWorkspace />} />
          <Route path="documents" element={<Documents />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="communications" element={<Communications />} />
          <Route path="billing" element={<Billing />} />
          <Route path="reports" element={<Reports />} />
          <Route path="verification" element={<Verification />} />
          <Route path="archive" element={<Archive />} />
          <Route path="administration" element={<Administration />} />
        </Route>

        {/* ── Legacy portals (redirect to new Shell navigation) ───── */}
        <Route path="/portal/lawyer" element={<Navigate to="/internal" replace />} />
        <Route path="/portal/admin" element={<Navigate to="/internal" replace />} />
        <Route path="/portal/staff" element={<Navigate to="/internal" replace />} />

        {/* ── Catch-all → home ──────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
