import React, { useState } from 'react';

export default function Profile({ role, setActiveTab, user, setUser }) {
  const [error, setError] = useState(null);

  if (!user) {
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
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-[#333] hover:bg-[#444] rounded-lg text-sm font-medium transition-colors">Try Again</button>
        </div>
      </main>
    );
  }

  const avatarUrl = role === 'FOR RECRUITERS' ? user.logoUrl : user.profilePicture;
  const displayName = role === 'FOR RECRUITERS'
    ? user.name
    : `${user.firstName || ''} ${user.lastName || ''}`.trim();
  const fallbackInitial = role === 'FOR RECRUITERS'
    ? (user.name?.charAt(0) || '?')
    : (user.firstName?.charAt(0) || user.email?.charAt(0) || '?');

  return (
    <main className="flex-grow flex items-center justify-center w-full min-h-[calc(100vh-56px)] bg-[#1a1a1a] p-6 text-[#eff1f6]">
      <div className="bg-[#282828] border border-[#333] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col relative">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-[#ffa116]/20 to-[#ffa116]/5 border-b border-[#333]"></div>

        {/* Avatar & Content */}
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-12 mb-8">
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl bg-[#1a1a1a] border-4 border-[#282828] shadow-lg flex items-center justify-center text-3xl font-bold text-[#ffa116] overflow-hidden">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  fallbackInitial
                )}
              </div>
            </div>
            <div className="flex flex-col text-center sm:text-left">
              <h1 className="text-2xl font-bold text-white tracking-tight">{displayName || 'User'}</h1>
              <p className="text-gray-400 text-sm mt-1">{user.email || (role === 'FOR RECRUITERS' ? user.website : '')}</p>
            </div>
            <div className="ml-auto mt-4 sm:mt-0 flex items-center gap-3">
              <span className="inline-block bg-[#333] text-[#ffa116] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#444] shadow-sm">
                {user.role || 'User'}
              </span>
              <button
                onClick={() => setActiveTab('Settings')}
                className="px-3 py-1.5 bg-[#333] text-white text-xs font-semibold rounded-lg hover:bg-[#444] transition-colors flex items-center gap-2"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </button>
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

            {role === 'FOR RECRUITERS' ? (
              ['name', 'address', 'description', 'website', 'location', 'phone'].map((key) => (
                <div key={key} className="bg-[#333]/50 border border-[#444]/50 rounded-xl p-5 hover:border-[#ffa116]/30 transition-colors">
                  <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">{key}</h3>
                  <p className="text-sm font-medium text-white">{user[key] || 'Not provided'}</p>
                </div>
              ))
            ) : (
              ['firstName', 'lastName', 'bio', 'location', 'phone'].map((key) => {
                const displayKey = key === 'firstName' ? 'First Name' : key === 'lastName' ? 'Last Name' : key;
                return (
                  <div key={key} className="bg-[#333]/50 border border-[#444]/50 rounded-xl p-5 hover:border-[#ffa116]/30 transition-colors">
                    <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">{displayKey}</h3>
                    <p className="text-sm font-medium text-white">{user[key] || 'Not provided'}</p>
                  </div>
                );
              })
            )}
          </div>

          {/* CANDIDATE EXTRA SECTIONS */}
          {role !== 'FOR RECRUITERS' && (
            <div className="mt-8 flex flex-col gap-6">
              
              {/* RESUME */}
              <div className="bg-[#333]/50 border border-[#444]/50 rounded-xl p-5">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Resume</h2>
                {user.resumeUrl ? (
                  <a href={user.resumeUrl} target="_blank" rel="noreferrer" className="text-[#ffa116] hover:underline text-sm flex items-center gap-2 w-fit">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    View Current Resume
                  </a>
                ) : (
                  <p className="text-sm text-gray-500">No resume uploaded.</p>
                )}
              </div>

              {/* SKILLS */}
              <div className="bg-[#333]/50 border border-[#444]/50 rounded-xl p-5">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {user.skills?.map((skill) => (
                    <span key={skill.id} className="bg-[#222] border border-[#444] px-3 py-1.5 rounded-full text-xs font-medium text-gray-300">{skill.name}</span>
                  ))}
                  {(!user.skills || user.skills.length === 0) && <p className="text-sm text-gray-500">No skills added.</p>}
                </div>
              </div>

              {/* EXPERIENCE */}
              <div className="bg-[#333]/50 border border-[#444]/50 rounded-xl p-5">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Experience</h2>
                <div className="flex flex-col gap-4">
                  {user.experiences?.map((exp) => (
                    <div key={exp.id} className="bg-[#222] p-4 rounded-lg border border-[#444]">
                      <h4 className="text-sm font-bold text-white">{exp.role} at {exp.company}</h4>
                      <p className="text-xs text-gray-400 mt-1">{exp.startDate} - {exp.endDate || 'Present'}</p>
                      <p className="text-sm text-gray-300 mt-2">{exp.description}</p>
                    </div>
                  ))}
                  {(!user.experiences || user.experiences.length === 0) && <p className="text-sm text-gray-500">No experience added.</p>}
                </div>
              </div>

              {/* PROJECTS */}
              <div className="bg-[#333]/50 border border-[#444]/50 rounded-xl p-5">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Projects</h2>
                <div className="flex flex-col gap-4">
                  {user.projects?.map((proj) => (
                    <div key={proj.id} className="bg-[#222] p-4 rounded-lg border border-[#444]">
                      <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                      <p className="text-sm text-gray-300 mt-2">{proj.description}</p>
                      <div className="flex gap-4 mt-3">
                        {proj.githubLink && <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-xs text-[#ffa116] hover:underline">GitHub</a>}
                        {proj.liveLink && <a href={proj.liveLink} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">Live Demo</a>}
                      </div>
                    </div>
                  ))}
                  {(!user.projects || user.projects.length === 0) && <p className="text-sm text-gray-500">No projects added.</p>}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </main>
  );
}
