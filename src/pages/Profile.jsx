import React, { useState, useEffect } from 'react';

export default function Profile({ role }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Not authenticated');
        }

        const url = role === 'FOR RECRUITERS'
          ? 'http://localhost:8082/api/v1/company'
          : 'http://localhost:8081/api/v1/user';

        console.log(url);

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile details');
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [role]);

  if (loading) {
    return (
      <main className="flex-grow flex items-center justify-center w-full min-h-[calc(100vh-56px)] bg-[#1a1a1a] p-6 text-[#eff1f6]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-[#ffa116] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm font-medium">Loading profile...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-grow flex items-center justify-center w-full min-h-[calc(100vh-56px)] bg-[#1a1a1a] p-6 text-[#eff1f6]">
        <div className="bg-[#282828] border border-red-500/30 p-8 rounded-xl max-w-md w-full text-center">
          <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold text-white mb-2">Profile Error</h2>
          <p className="text-gray-400 text-sm mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#333] hover:bg-[#444] rounded-lg text-sm font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow flex items-center justify-center w-full min-h-[calc(100vh-56px)] bg-[#1a1a1a] p-6 text-[#eff1f6]">
      <div className="bg-[#282828] border border-[#333] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col relative">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-[#ffa116]/20 to-[#ffa116]/5 border-b border-[#333]"></div>

        {/* Avatar & Content */}
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-12 mb-8">
            <div className="w-24 h-24 rounded-2xl bg-[#1a1a1a] border-4 border-[#282828] shadow-lg flex items-center justify-center text-3xl font-bold text-[#ffa116]">
              {user?.firstName?.charAt(0) || user?.email?.charAt(0) || '?'}
            </div>
            <div className="flex flex-col text-center sm:text-left">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-gray-400 text-sm mt-1">{user?.email}</p>
            </div>
            <div className="ml-auto mt-4 sm:mt-0">
              <span className="inline-block bg-[#333] text-[#ffa116] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#444] shadow-sm">
                {user?.role || 'User'}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="bg-[#333]/50 border border-[#444]/50 rounded-xl p-5 hover:border-[#ffa116]/30 transition-colors">
              <h3 className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Status</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <p className="text-sm font-medium text-white">Active</p>
              </div>
            </div>

            {/* Display other potential fields dynamically, excluding specific ones */}
            {Object.entries(user || {}).filter(([key]) => !['id', 'firstName', 'lastName', 'email', 'role', 'companyId', 'password', 'authorities', 'jwtToken'].includes(key)).map(([key, value]) => (
              <div key={key} className="bg-[#333]/50 border border-[#444]/50 rounded-xl p-5 hover:border-[#ffa116]/30 transition-colors">
                <h3 className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                <p className="text-sm font-medium text-white">{typeof value === 'object' ? JSON.stringify(value) : String(value)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
