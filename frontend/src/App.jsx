import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import ProtectedRoute from "./components/common/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import CalendarPage from "./pages/CalendarPage";
import UserCalendarPage from "./pages/UserCalendarPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UsersPage from "./pages/UsersPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import ReportsPage from "./pages/ReportsPage";
import NotFound from "./pages/NotFound";
import Footer from "./components/common/Footer";
import PartnersCarousel from "./components/common/PartnersCarousel";
import Newsletter from "./components/common/Newsletter";
import OTPPage from "./pages/OTPPage";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-otp" element={<OTPPage />} />

            {/* Protected (Any Authenticated User) */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <SearchResults />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <ReportsPage />
                </ProtectedRoute>
              }
            />

            {/* Admin-only */}
            <Route
              path="/calendar"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <CalendarPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <UsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/departments"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <DepartmentsPage />
                </ProtectedRoute>
              }
            />

            {/* User-only */}
            <Route
              path="/view-calendar"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <UserCalendarPage />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <PartnersCarousel />
        <Newsletter />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
