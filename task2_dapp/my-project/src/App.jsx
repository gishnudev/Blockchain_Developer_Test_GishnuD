import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import ClaimScholarship from "./pages/ClaimScholarship";
import FundContract from "./pages/FundContract";

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {/* Navigation Bar */}
        <nav className="bg-blue-700 text-white py-4 shadow">
          <div className="container mx-auto flex justify-between px-4">
            <h1 className="text-lg font-semibold">🎓 Scholarship DApp</h1>
            <div className="space-x-4">
              <Link to="/" className="hover:underline">
                Admin
              </Link>
              <Link to="/claim" className="hover:underline">
                Claim
              </Link>
              <Link to="/fund" className="hover:underline">
                Fund
              </Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-4">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/claim" element={<ClaimScholarship />} />
            <Route path="/fund" element={<FundContract />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
