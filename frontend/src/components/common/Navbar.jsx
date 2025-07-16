import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import orppLogo from "../../assets/orpp.png";
import { BiSearch, BiMenu, BiX } from "react-icons/bi";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("otp_email");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileOpen(false); // close menu on search
    }
  };

  const toggleMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <header>
      {/* Top Contact Bar */}
      <div className="bg-[#002147] text-white text-sm py-2">
        <div className="container mx-auto flex justify-between items-center px-4 flex-wrap gap-4">
          <div className="flex gap-4 flex-wrap items-center">
            <span>
              📞 <a href="tel:+254204022000">+254(0) 204022000</a>
            </span>
            <span>
              ✉️ <a href="mailto:info@orpp.or.ke">info@orpp.or.ke</a>
            </span>

            <div className="hidden sm:flex gap-3 items-center">
              <span className="opacity-50">|</span>
              <a href="https://ippms.orpp.or.ke/auth/login?ReturnUrl=%2F" className="hover:underline">IPPMS</a>
              <span className="opacity-50">|</span>
              <a href="https://orpp.or.ke/faqs/" className="hover:underline">FAQs</a>
              <span className="opacity-50">|</span>
              <a href="https://orpp.or.ke/webmail/" className="hover:underline">Staff mail</a>
              <span className="opacity-50">|</span>
              <a href="https://orpp.or.ke/contact-us/" className="hover:underline">Contact Us</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Logo + Search */}
      <div className="bg-white border-b border-gray-300 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <img src={orppLogo} alt="ORPP Logo" className="h-20" />

          <form onSubmit={handleSearch} className="flex w-full md:w-auto max-w-xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full border-2 border-[#1F3A93] rounded-full px-4 py-2 text-sm"
            />
            <button
              type="submit"
              className="bg-[#FF9F1C] text-white px-4 py-2 rounded-full ml-[-40px]"
            >
              <BiSearch size={20} />
            </button>
          </form>

          <button className="md:hidden text-2xl text-[#002147]" onClick={toggleMenu}>
            {mobileOpen ? <BiX /> : <BiMenu />}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      {token && (
        <nav className="bg-[#abc9e8] text-[#002147] font-medium">
          {/* Desktop Nav */}
          <div className="hidden md:flex justify-center gap-8 py-3">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-yellow-500" : "hover:text-yellow-400"}>
              Dashboard
            </NavLink>

            {role === "admin" && (
              <NavLink to="/calendar" className={({ isActive }) => isActive ? "text-yellow-500" : "hover:text-yellow-400"}>
                Calendar
              </NavLink>
            )}

            {role === "user" && (
              <NavLink to="/view-calendar" className={({ isActive }) => isActive ? "text-yellow-500" : "hover:text-yellow-400"}>
                Calendar
              </NavLink>
            )}

            {role === "admin" && (
              <>
                <NavLink to="/users" className={({ isActive }) => isActive ? "text-yellow-500" : "hover:text-yellow-400"}>
                  Manage Users
                </NavLink>
                <NavLink to="/departments" className={({ isActive }) => isActive ? "text-yellow-500" : "hover:text-yellow-400"}>
                  Departments
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <div className="md:hidden flex flex-col items-start gap-3 px-6 pb-4">
              <NavLink to="/" onClick={() => setMobileOpen(false)} className="hover:text-yellow-400">
                Dashboard
              </NavLink>

              {role === "admin" && (
                <NavLink to="/calendar" onClick={() => setMobileOpen(false)} className="hover:text-yellow-400">
                  Calendar
                </NavLink>
              )}

              {role === "user" && (
                <NavLink to="/view-calendar" onClick={() => setMobileOpen(false)} className="hover:text-yellow-400">
                  Calendar
                </NavLink>
              )}

              {role === "admin" && (
                <>
                  <NavLink to="/users" onClick={() => setMobileOpen(false)} className="hover:text-yellow-400">
                    Manage Users
                  </NavLink>
                  <NavLink to="/departments" onClick={() => setMobileOpen(false)} className="hover:text-yellow-400">
                    Departments
                  </NavLink>
                </>
              )}
            </div>
          )}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
