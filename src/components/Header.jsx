import { useState, useEffect } from 'react';

export default function Header({ role, setRole, activeTab, setActiveTab, isAuthenticated, setIsAuthenticated }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    setActiveTab(prev => (prev === 'Login' || prev === 'Signup' || prev === 'Profile' ? prev : null));
  };

  const navLinks = role === 'FOR CANDIDATE'
    ? [
      { label: "Jobs", href: "#jobs" },
      { label: "Companies", href: "#companies" },
      { label: "Community", href: "#community" },
    ]
    : [
      { label: "Overview", href: "#overview" },
      { label: "Candidates", href: "#candidates" },
      { label: "Interviews", href: "#interviews" },
    ];

  return (
    <header className="flex items-center justify-between border-b border-[#333] h-14 bg-[#282828] shrink-0 sticky top-0 lg:px-6 z-50 text-[#eff1f6]">
      <div className="flex items-center h-full">
        {/* LOGO */}
        <h1
          className="text-lg font-bold whitespace-nowrap flex items-center h-full px-4 lg:px-0 lg:mr-8 cursor-pointer hover:text-white transition-colors"
          onClick={() => setActiveTab(null)}
        >
          <span className="text-[#ffa116] mr-1">&lt;/&gt;</span> Breaking Job
        </h1>

        {/* DESKTOP ROLE DISPLAY / DROPDOWN */}
        <div className={`hidden lg:flex items-center h-full ${isAuthenticated ? 'hidden' : 'cursor-pointer group relative'}`}>
          <div className={`flex items-center gap-1.5 h-full px-3 text-sm text-gray-400 ${isAuthenticated ? 'hidden' : 'hover:text-white transition-colors'}`}>
            {role === 'FOR CANDIDATE' ? 'For Candidate' : 'For Recruiter'}
            {!isAuthenticated && (
              <svg className="transition-transform duration-200 group-hover:rotate-180" width="10" height="6" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>

          {!isAuthenticated && (
            <div className="hidden group-hover:block absolute top-full left-0 pt-2 w-48">
              <div className="bg-[#333] rounded-lg shadow-xl border border-[#444] overflow-hidden flex flex-col py-1">
                <button
                  className="text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#444] hover:text-white transition-colors"
                  onClick={() => handleRoleSwitch('FOR CANDIDATE')}
                >
                  Candidate Mode
                </button>
                <button
                  className="text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#444] hover:text-white transition-colors"
                  onClick={() => handleRoleSwitch('FOR RECRUITERS')}
                >
                  Recruiter Mode
                </button>
              </div>
            </div>
          )}
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center h-full ml-4">
          {navLinks.map((link) => {
            const isActive = activeTab === link.label;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActiveTab(link.label)}
                className={`px-4 h-full flex items-center text-sm transition-colors relative ${isActive ? 'text-white font-medium' : 'text-gray-400 hover:text-white'}`}
              >
                {link.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ffa116]"></div>
                )}
              </a>
            );
          })}
        </nav>
      </div>

      {/* DESKTOP AUTH */}
      <div className="hidden lg:flex items-center h-full gap-4">
        {isAuthenticated ? (
          <>
            <button
              onClick={() => setActiveTab('Profile')}
              className={`text-sm font-medium transition-colors ${activeTab === 'Profile' ? 'text-[#ffa116]' : 'text-gray-400 hover:text-white'}`}
            >
              Profile
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                setActiveTab(null);
              }}
              className="text-sm font-medium bg-[#333] hover:bg-[#444] text-white px-4 py-1.5 rounded-full transition-colors border border-[#444]"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setActiveTab('Login')}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => setActiveTab('Signup')}
              className="text-sm font-medium bg-[#ffa116]/10 text-[#ffa116] hover:bg-[#ffa116]/20 px-4 py-1.5 rounded-full transition-colors border border-[#ffa116]/30"
            >
              Register
            </button>
          </>
        )}
      </div>

      {/* MOBILE TOGGLE */}
      <button
        className="flex lg:hidden items-center h-full px-4 text-gray-400 hover:text-white"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
      </button>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="flex lg:hidden flex-col absolute top-[56px] left-0 w-full h-[calc(100vh-56px)] bg-[#282828] z-[100] border-t border-[#333] overflow-y-auto">
          <div className="flex flex-col p-4 border-b border-[#333]">
            <div className="text-xs font-semibold text-gray-500 mb-2">MODE</div>
            {isAuthenticated ? (
              <div className="text-left py-3 rounded-lg px-4 text-sm font-medium bg-[#444] text-white">
                {role === 'FOR CANDIDATE' ? 'Candidate Profile' : 'Recruiter Dashboard'}
              </div>
            ) : (
              <>
                <button
                  className={`text-left py-3 rounded-lg px-4 text-sm font-medium transition-colors ${role === 'FOR CANDIDATE' ? 'bg-[#444] text-white' : 'text-gray-400 hover:bg-[#333]'}`}
                  onClick={() => { handleRoleSwitch('FOR CANDIDATE'); setIsMobileMenuOpen(false); }}
                >
                  Candidate Profile
                </button>
                <button
                  className={`text-left py-3 rounded-lg px-4 text-sm font-medium mt-1 transition-colors ${role === 'FOR RECRUITERS' ? 'bg-[#444] text-white' : 'text-gray-400 hover:bg-[#333]'}`}
                  onClick={() => { handleRoleSwitch('FOR RECRUITERS'); setIsMobileMenuOpen(false); }}
                >
                  Recruiter Dashboard
                </button>
              </>
            )}
          </div>

          <nav className="flex flex-col p-4 border-b border-[#333]">
            <div className="text-xs font-semibold text-gray-500 mb-2">NAVIGATION</div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`py-3 px-4 rounded-lg text-sm font-medium ${activeTab === link.label ? 'bg-[#444] text-white' : 'text-gray-400 hover:bg-[#333]'}`}
                onClick={() => { setActiveTab(link.label); setIsMobileMenuOpen(false); }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="p-4 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <button className="py-2.5 rounded-lg font-medium text-sm text-[#282828] bg-white hover:bg-gray-200 transition-colors" onClick={() => { setActiveTab('Profile'); setIsMobileMenuOpen(false); }}>Profile</button>
                <button className="py-2.5 rounded-lg font-medium text-sm text-white bg-[#333] hover:bg-[#444] transition-colors" onClick={() => { localStorage.removeItem('token'); setIsAuthenticated(false); setActiveTab(null); setIsMobileMenuOpen(false); }}>Logout</button>
              </>
            ) : (
              <>
                <button className="py-2.5 rounded-lg font-medium text-sm text-[#282828] bg-white hover:bg-gray-200 transition-colors" onClick={() => { setActiveTab('Login'); setIsMobileMenuOpen(false); }}>Sign in</button>
                <button className="py-2.5 rounded-lg font-medium text-sm text-[#ffa116] bg-[#ffa116]/10 border border-[#ffa116]/30 hover:bg-[#ffa116]/20 transition-colors" onClick={() => { setActiveTab('Signup'); setIsMobileMenuOpen(false); }}>Register</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}