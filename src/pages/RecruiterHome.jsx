import React from 'react';

export default function RecruiterHome() {
  const metrics = [
    { label: "Active Openings", value: "12", trend: "↑ 2 this week", trendUp: true },
    { label: "Total Candidates", value: "486", trend: "↑ 24% from last month", trendUp: true },
    { label: "Interviews Scheduled", value: "28", trend: "8 happening today", trendUp: true },
    { label: "Avg. Time to Hire", value: "18d", trend: "↓ 2d improvement", trendUp: true }
  ];

  const activeJobs = [
    { title: "Senior Frontend Engineer", dept: "Engineering", type: "Remote", applicants: 142, posted: "2d ago" },
    { title: "Lead Product Designer", dept: "Design", type: "New York, NY", applicants: 89, posted: "5d ago" },
    { title: "Backend Systems Staff", dept: "Engineering", type: "Hybrid", applicants: 210, posted: "1w ago" }
  ];

  const topMatches = [
    { name: "Alice Chen", role: "Senior Frontend", match: "98%", status: "Reviewing" },
    { name: "Jordan Smith", role: "Product Designer", match: "95%", status: "Screened" },
    { name: "David Kim", role: "Backend Engineer", match: "91%", status: "New" }
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6 w-full text-[#eff1f6]">
      
      {/* HEADLINE */}
      <section className="flex justify-between items-center pb-2">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Recruiting Dashboard
        </h1>
        <button className="hidden sm:block bg-[#2cbb5d] text-white font-medium px-5 py-2 rounded-lg hover:bg-[#229c4b] transition-colors shadow-sm">
          New Opening
        </button>
      </section>

      {/* METRICS GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-[#282828] border border-[#333] rounded-xl p-5 flex flex-col cursor-default hover:border-[#444] transition-colors">
            <div className="text-xs font-semibold text-gray-500 mb-2 tracking-wider">
              {metric.label}
            </div>
            <div className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              {metric.value}
            </div>
            <div className={`mt-auto text-xs font-medium px-2 py-1 rounded bg-[#333] w-max ${metric.trendUp ? 'text-[#2cbb5d]' : 'text-gray-400'}`}>
              {metric.trend}
            </div>
          </div>
        ))}
      </section>

      {/* TABLES COLUMNS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        
        {/* L COLUMN */}
        <div className="lg:col-span-2 bg-[#282828] border border-[#333] rounded-xl overflow-hidden flex flex-col">
          <div className="flex justify-between items-center p-5 border-b border-[#333] bg-[#222]">
            <h2 className="text-lg font-bold text-white">Active Pipelines</h2>
            <button className="text-sm font-medium text-[#ffa116] hover:text-[#ffb03a] transition-colors">View All</button>
          </div>
          
          <div className="flex flex-col">
            {activeJobs.map((job, i) => (
              <div key={i} className={`flex flex-col sm:flex-row justify-between p-5 ${i !== activeJobs.length - 1 ? 'border-b border-[#333]' : ''} hover:bg-[#333] transition-colors cursor-pointer group`}>
                <div>
                  <h3 className="text-base font-bold text-gray-200 group-hover:text-white transition-colors">{job.title}</h3>
                  <div className="text-xs font-medium text-gray-500 mt-1.5 flex gap-2 items-center">
                    <span className="bg-[#444] px-1.5 py-0.5 rounded">{job.dept}</span>
                    <span>&bull;</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                
                <div className="flex gap-8 mt-4 sm:mt-0 items-center">
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-lg text-white">{job.applicants}</span>
                    <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Candidates</span>
                  </div>
                  <div className="flex flex-col items-center w-16">
                    <span className="font-bold text-lg text-white">{job.posted}</span>
                    <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Age</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* R COLUMN */}
        <div className="bg-[#282828] border border-[#333] rounded-xl overflow-hidden flex flex-col">
          <div className="p-5 border-b border-[#333] bg-[#222] flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-[#ffa116]"></div>
             <h2 className="text-lg font-bold text-white">AI Matches</h2>
          </div>
          
          <div className="flex flex-col">
            {topMatches.map((match, i) => (
              <div key={i} className={`p-5 flex justify-between items-center hover:bg-[#333] transition-colors cursor-pointer group ${i !== topMatches.length - 1 ? 'border-b border-[#333]' : ''}`}>
                <div>
                  <div className="font-bold text-sm text-gray-200 group-hover:text-white transition-colors">{match.name}</div>
                  <div className="text-[11px] font-medium text-gray-500 mt-1">{match.role}</div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="text-xs font-semibold bg-[#2cbb5d]/10 text-[#2cbb5d] px-2 py-0.5 border border-[#2cbb5d]/20 rounded-full">
                    {match.match} Fit
                  </span>
                  <span className="text-[10px] font-medium text-gray-500 uppercase">{match.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </section>
    </main>
  );
}
