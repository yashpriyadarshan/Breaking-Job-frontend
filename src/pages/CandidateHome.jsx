import React from 'react';

export default function CandidateHome() {
  const trendingSearches = ["Frontend Developer", "Product Designer", "Backend Engineer", "Data Scientist"];

  return (
    <main className="flex-grow flex flex-col w-full relative z-10 text-[#eff1f6]">

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center py-20 md:py-28 px-6">

        <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-6">
          Find Your Dream Job
        </h1>

        <p className="text-base md:text-lg text-gray-400 max-w-2xl mb-12">
          Direct connections. Salary upfront. Zero ghosting. We filtered out the noise so you can just work.
        </p>

        {/* SEARCH BAR */}
        <div className="w-full max-w-2xl flex flex-col sm:flex-row shadow-lg rounded-lg overflow-hidden border border-[#333]">
          <input
            type="text"
            placeholder="Search by role, company, or location..."
            className="flex-grow bg-[#282828] text-[#eff1f6] p-4 md:p-5 text-sm md:text-base outline-none placeholder-gray-500"
          />
          <button className="bg-[#2cbb5d] text-white font-medium px-8 py-4 sm:py-5 hover:bg-[#229c4b] transition-colors whitespace-nowrap">
            Search Jobs
          </button>
        </div>

        {/* TRENDING TAGS */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <span className="text-xs text-gray-500 py-1.5 mr-2">Trending:</span>
          {trendingSearches.map((tag, i) => (
            <button key={i} className="bg-[#282828] text-gray-300 border border-[#333] px-3 py-1 text-xs rounded-full hover:bg-[#333] transition-colors">
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-12 border-t border-[#333] bg-[#222]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="p-8 bg-[#282828] border border-[#333] rounded-xl flex flex-col hover:border-[#444] transition-colors">
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6 text-gray-400 font-bold">1</div>
            <h2 className="text-xl font-bold mb-3 text-white">Create Profile</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Upload your raw resume. We extract the data. No filling out forms or typing redundant histories.
            </p>
          </div>

          <div className="p-8 bg-[#282828] border border-[#333] rounded-xl flex flex-col hover:border-[#444] transition-colors">
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6 text-[#ffa116] font-bold">2</div>
            <h2 className="text-xl font-bold mb-3 text-white">Instant Match</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Algorithmic pairing. We show you roles that match your skill tree, not buzzwords.
            </p>
          </div>

          <div className="p-8 bg-[#282828] border border-[#333] rounded-xl flex flex-col hover:border-[#444] transition-colors">
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6 text-[#2cbb5d] font-bold">3</div>
            <h2 className="text-xl font-bold mb-3 text-white">Apply Direct</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              One click execution. Companies receive your data instantly. Response tracking enabled.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
