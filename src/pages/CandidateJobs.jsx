import React from 'react';

export default function CandidateJobs() {
  const activeJobs = [
    { title: "Senior Frontend Engineer", company: "TechCorp Intl", type: "Remote", salary: "$140k - $160k", posted: "2d ago", reqs: ["React", "TypeScript", "Tailwind"] },
    { title: "Lead Product Designer", company: "Studio Brutal", type: "New York, NY", salary: "$120k - $150k", posted: "5d ago", reqs: ["Figma", "UI/UX", "Systems"] },
    { title: "Fullstack Developer", company: "Global Logistics", type: "Hybrid", salary: "$110k - $130k", posted: "1w ago", reqs: ["Node.js", "PostgreSQL", "React"] }
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-6 w-full text-[#eff1f6]">
      {/* SIDEBAR FILTERS */}
      <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-6">
        <div className="bg-[#282828] border border-[#333] rounded-xl p-5">
          <h2 className="font-bold text-lg mb-4 text-white">Filters</h2>

          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 mb-3 tracking-wider">LOCATION</h3>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 rounded border border-[#555] bg-[#333] group-hover:border-gray-400 transition-colors flex items-center justify-center shrink-0"></div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Remote</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group mt-3">
                <div className="w-4 h-4 rounded border border-transparent bg-[#2cbb5d] flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <span className="text-sm text-white font-medium">New York, NY</span>
              </label>
            </div>

            <div className="border-t border-[#333] pt-5">
              <h3 className="text-xs font-semibold text-gray-500 mb-3 tracking-wider">JOB TYPE</h3>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 rounded border border-transparent bg-[#2cbb5d] flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <span className="text-sm text-white font-medium">Full-time</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group mt-3">
                <div className="w-4 h-4 rounded border border-[#555] bg-[#333] group-hover:border-gray-400 transition-colors flex items-center justify-center shrink-0"></div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Contract</span>
              </label>
            </div>

            <button className="mt-2 w-full bg-[#333] text-white text-sm font-medium rounded-lg py-2.5 hover:bg-[#444] transition-colors">
              Clear Filters
            </button>
          </div>
        </div>
      </aside>

      {/* JOB FEED */}
      <section className="flex-grow flex flex-col gap-4">
        <div className="flex justify-between items-end pb-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">Active Openings</h1>
          <span className="text-sm text-gray-400 font-medium">Showing {activeJobs.length} Jobs</span>
        </div>

        <div className="flex flex-col gap-4">
          {activeJobs.map((job, i) => (
            <div key={i} className="bg-[#282828] border border-[#333] rounded-xl flex flex-col p-5 hover:border-[#555] transition-colors group">

              <div className="flex justify-between items-start mb-2">
                {/* TITLE */}
                <h3 className="text-lg font-bold text-white group-hover:text-[#ffa116] transition-colors cursor-pointer w-fit">
                  {job.title}
                </h3>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{job.posted}</span>
              </div>

              {/* COMPANY LINK */}
              <div className="flex items-center text-sm font-medium text-gray-400 hover:text-white mb-4 w-fit cursor-pointer transition-colors">
                {job.company}
                <svg className="w-3.5 h-3.5 ml-1.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </div>

              {/* DETAILS ROW */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="bg-[#333] text-gray-300 px-2.5 py-1 rounded text-xs font-medium">
                  {job.type}
                </span>
                <span className="bg-[#2cbb5d]/10 text-[#2cbb5d] px-2.5 py-1 rounded text-xs font-medium border border-[#2cbb5d]/20">
                  {job.salary} / yr
                </span>
              </div>

              {/* ACTION BAR */}
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-[#333]">
                <div className="flex gap-2">
                  {job.reqs.map((req, j) => (
                    <span key={j} className="text-xs text-gray-500 bg-[#222] px-2 py-1 rounded border border-[#333]">{req}</span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#333] text-gray-400 hover:text-white hover:bg-[#444] transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#333] text-gray-400 hover:text-white hover:bg-[#444] transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                  </button>
                  <button className="ml-2 font-medium text-sm px-6 py-2 rounded-lg bg-[#ffa116] text-[#1a1a1a] hover:bg-[#ffb03a] transition-colors shadow-sm">
                    Apply
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
