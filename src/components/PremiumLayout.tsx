import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { CheckCircle, Clock } from 'lucide-react';

export const PremiumLayout: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  // Extract step from path /rb/0X-something
  const stepMatch = path.match(/\/rb\/0(\d)-/);
  const currentStep = stepMatch ? parseInt(stepMatch[1]) : 0;

  return (
    <div className="kn-layout">
      {/* Top Bar */}
      <header className="kn-top-bar">
        <div className="flex items-center gap-8">
          <Link to="/" className="kn-top-bar-title" style={{ textDecoration: 'none', color: 'inherit' }}>AI Resume Builder</Link>
          <nav className="flex gap-10">
            <Link to="/builder" className={`text-sm font-semibold uppercase tracking-wide hover:text-red-800 transition-colors ${path === '/builder' ? 'text-red-800' : 'text-gray-500'}`}>Builder</Link>
            <Link to="/preview" className={`text-sm font-semibold uppercase tracking-wide hover:text-red-800 transition-colors ${path === '/preview' ? 'text-red-800' : 'text-gray-500'}`}>Preview</Link>
            <Link to="/proof" className={`text-sm font-semibold uppercase tracking-wide hover:text-red-800 transition-colors ${path === '/proof' ? 'text-red-800' : 'text-gray-500'}`}>Proof</Link>
          </nav>
        </div>

        {currentStep > 0 && (
          <div className="kn-progress-indicator">Project 3 — Step {currentStep} of 8</div>
        )}

        <div className="kn-status-badge in-progress">
          {currentStep === 8 ? 'Finalizing' : 'Active'}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Proof Footer (only on rb pages) */}
      {path.startsWith('/rb') && (
        <footer className="kn-proof-footer">
          <div className="kn-proof-item">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Design Intent Fixed</span>
          </div>
          <div className="kn-proof-item">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Real-time Sync Active</span>
          </div>
        </footer>
      )}
    </div>
  );
};
