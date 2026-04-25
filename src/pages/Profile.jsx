import React, { useState, useEffect } from 'react';
import { updateCompany, uploadLogo } from '../services/companyService';
import { 
  updateUserProfile,
  addSkill, deleteSkill,
  addExperience, deleteExperience,
  addProject, deleteProject,
  uploadResume
} from '../services/userService';

export default function Profile({ role, setActiveTab }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  const handleEditClick = () => {
    setFormData(user || {});
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({});
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      if (role === 'FOR RECRUITERS') {
        const updated = await updateCompany(formData);
        setUser(updated);
      } else {
        const payload = {
          FirstName: formData.FirstName || formData.firstName || '',
          LastName: formData.LastName || formData.lastName || '',
          bio: formData.bio || '',
          location: formData.location || '',
          phone: formData.phone || '',
          profilePicture: formData.profilePicture || '',
          resumeUrl: formData.resumeUrl || ''
        };
        const updated = await updateUserProfile(user.id, payload);
        setUser(updated);
      }
      setIsEditing(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    const name = e.target.skillName.value;
    if (!name) return;
    try {
      const updated = await addSkill(user.id, { name });
      setUser(updated);
      e.target.reset();
    } catch (err) { alert(err.message); }
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      await deleteSkill(user.id, skillId);
      setUser(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== skillId) }));
    } catch (err) { alert(err.message); }
  };

  const handleAddExperience = async (e) => {
    e.preventDefault();
    const data = {
      company: e.target.company.value,
      role: e.target.role.value,
      description: e.target.description.value,
      startDate: e.target.startDate.value,
      endDate: e.target.endDate.value,
    };
    try {
      const updated = await addExperience(user.id, data);
      setUser(updated);
      e.target.reset();
    } catch (err) { alert(err.message); }
  };

  const handleDeleteExperience = async (expId) => {
    try {
      await deleteExperience(user.id, expId);
      setUser(prev => ({ ...prev, experiences: prev.experiences.filter(x => x.id !== expId) }));
    } catch (err) { alert(err.message); }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      description: e.target.description.value,
      githubLink: e.target.githubLink.value,
      liveLink: e.target.liveLink.value,
    };
    try {
      const updated = await addProject(user.id, data);
      setUser(updated);
      e.target.reset();
    } catch (err) { alert(err.message); }
  };

  const handleDeleteProject = async (projId) => {
    try {
      await deleteProject(user.id, projId);
      setUser(prev => ({ ...prev, projects: prev.projects.filter(x => x.id !== projId) }));
    } catch (err) { alert(err.message); }
  };

  const handleUploadResume = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const updated = await uploadResume(user.id, file);
      setUser(updated);
      alert('Resume uploaded successfully!');
    } catch (err) { alert(err.message); }
  };

  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      if (role === 'FOR RECRUITERS') {
        const updated = await uploadLogo(user.id, file);
        setUser(updated);
        alert('Logo uploaded successfully!');
      } else {
        const updated = await uploadProfilePicture(user.id, file);
        setUser(updated);
        alert('Profile picture uploaded successfully!');
      }
    } catch (err) { alert(err.message); }
  };

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
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl bg-[#1a1a1a] border-4 border-[#282828] shadow-lg flex items-center justify-center text-3xl font-bold text-[#ffa116] overflow-hidden">
                {(role === 'FOR RECRUITERS' ? (user?.logoUrl || user?.logo) : user?.profilePicture) ? (
                  <img src={role === 'FOR RECRUITERS' ? (user?.logoUrl || user?.logo) : user?.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  role === 'FOR RECRUITERS'
                    ? (user?.name?.charAt(0) || '?')
                    : (user?.firstName?.charAt(0) || user?.email?.charAt(0) || '?')
                )}
              </div>
              {isEditing && (
                <label className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer rounded-2xl transition-all border-4 border-transparent">
                  <span className="text-white text-xs font-bold">Upload</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleUploadAvatar} />
                </label>
              )}
            </div>
            <div className="flex flex-col text-center sm:text-left">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {role === 'FOR RECRUITERS'
                  ? user?.name
                  : `${user?.firstName || ''} ${user?.lastName || ''}`}
              </h1>
              <p className="text-gray-400 text-sm mt-1">{user?.email || (role === 'FOR RECRUITERS' ? user?.website : '')}</p>
            </div>
            <div className="ml-auto mt-4 sm:mt-0 flex items-center gap-3">
              <span className="inline-block bg-[#333] text-[#ffa116] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#444] shadow-sm">
                {user?.role || 'User'}
              </span>
              {isEditing ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="px-3 py-1.5 bg-gray-600 text-white text-xs font-semibold rounded-lg hover:bg-gray-500 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-3 py-1.5 bg-[#ffa116] text-[#1a1a1a] text-xs font-semibold rounded-lg hover:bg-[#ffb03a] transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              ) : (
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
              )}
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

            {/* Display specific fields for recruiters or dynamic for others */}
            {role === 'FOR RECRUITERS' ? (
              ['name', 'address', 'description', 'website', 'location', 'phone'].map((key) => (
                <div key={key} className="bg-[#333]/50 border border-[#444]/50 rounded-xl p-5 hover:border-[#ffa116]/30 transition-colors">
                  <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">{key}</h3>
                  {isEditing ? (
                    key === 'description' ? (
                      <textarea
                        value={formData[key] || ''}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className="w-full bg-[#222] border border-[#555] rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#ffa116] min-h-[80px]"
                      />
                    ) : (
                      <input
                        type="text"
                        value={formData[key] || ''}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className="w-full bg-[#222] border border-[#555] rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#ffa116]"
                      />
                    )
                  ) : (
                    <p className="text-sm font-medium text-white">{user?.[key] || 'Not provided'}</p>
                  )}
                </div>
              ))
            ) : (
              ['FirstName', 'LastName', 'bio', 'location', 'phone'].map((key) => {
                const displayKey = key === 'FirstName' ? 'First Name' : key === 'LastName' ? 'Last Name' : key;
                return (
                  <div key={key} className="bg-[#333]/50 border border-[#444]/50 rounded-xl p-5 hover:border-[#ffa116]/30 transition-colors">
                    <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">{displayKey}</h3>
                    {isEditing ? (
                      key === 'bio' ? (
                        <textarea
                          value={formData[key] || formData[key.charAt(0).toLowerCase() + key.slice(1)] || ''}
                          onChange={(e) => handleInputChange(key, e.target.value)}
                          className="w-full bg-[#222] border border-[#555] rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#ffa116] min-h-[80px]"
                        />
                      ) : (
                        <input
                          type="text"
                          value={formData[key] || formData[key.charAt(0).toLowerCase() + key.slice(1)] || ''}
                          onChange={(e) => handleInputChange(key, e.target.value)}
                          className="w-full bg-[#222] border border-[#555] rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#ffa116]"
                        />
                      )
                    ) : (
                      <p className="text-sm font-medium text-white">{user?.[key] || user?.[key.charAt(0).toLowerCase() + key.slice(1)] || 'Not provided'}</p>
                    )}
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
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">Resume</h2>
                  {isEditing && (
                    <label className="cursor-pointer px-3 py-1.5 bg-[#ffa116] text-[#1a1a1a] text-xs font-semibold rounded-lg hover:bg-[#ffb03a] transition-colors">
                      Upload Resume
                      <input type="file" className="hidden" onChange={handleUploadResume} />
                    </label>
                  )}
                </div>
                {user?.resumeUrl ? (
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
                <div className="flex flex-wrap gap-2 mb-4">
                  {user?.skills?.map((skill) => (
                    <span key={skill.id} className="bg-[#222] border border-[#444] px-3 py-1.5 rounded-full text-xs font-medium text-gray-300 flex items-center gap-2">
                      {skill.name}
                      {isEditing && (
                        <button onClick={() => handleDeleteSkill(skill.id)} className="text-red-400 hover:text-red-300 bg-transparent">&times;</button>
                      )}
                    </span>
                  ))}
                  {(!user?.skills || user.skills.length === 0) && <p className="text-sm text-gray-500">No skills added.</p>}
                </div>
                {isEditing && (
                  <form onSubmit={handleAddSkill} className="flex gap-2">
                    <input name="skillName" type="text" placeholder="Add a skill..." className="flex-1 bg-[#222] border border-[#555] rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#ffa116]" />
                    <button type="submit" className="px-3 py-1.5 bg-[#444] text-white text-xs font-semibold rounded-lg hover:bg-[#555] transition-colors">Add</button>
                  </form>
                )}
              </div>

              {/* EXPERIENCE */}
              <div className="bg-[#333]/50 border border-[#444]/50 rounded-xl p-5">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Experience</h2>
                <div className="flex flex-col gap-4 mb-4">
                  {user?.experiences?.map((exp) => (
                    <div key={exp.id} className="bg-[#222] p-4 rounded-lg border border-[#444] relative">
                      {isEditing && (
                        <button onClick={() => handleDeleteExperience(exp.id)} className="absolute top-3 right-3 text-red-400 hover:text-red-300 text-xs font-medium">Delete</button>
                      )}
                      <h4 className="text-sm font-bold text-white">{exp.role} at {exp.company}</h4>
                      <p className="text-xs text-gray-400 mt-1">{exp.startDate} - {exp.endDate || 'Present'}</p>
                      <p className="text-sm text-gray-300 mt-2">{exp.description}</p>
                    </div>
                  ))}
                  {(!user?.experiences || user.experiences.length === 0) && <p className="text-sm text-gray-500">No experience added.</p>}
                </div>
                {isEditing && (
                  <form onSubmit={handleAddExperience} className="flex flex-col gap-2 bg-[#222] p-4 rounded-lg border border-[#555]">
                    <h4 className="text-xs font-bold text-gray-400 mb-2">ADD EXPERIENCE</h4>
                    <input name="company" type="text" placeholder="Company" required className="w-full bg-[#1a1a1a] border border-[#444] rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#ffa116]" />
                    <input name="role" type="text" placeholder="Role" required className="w-full bg-[#1a1a1a] border border-[#444] rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#ffa116]" />
                    <div className="flex gap-2">
                      <input name="startDate" type="text" placeholder="Start Date (e.g. 2020-01)" className="w-full bg-[#1a1a1a] border border-[#444] rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#ffa116]" />
                      <input name="endDate" type="text" placeholder="End Date (Optional)" className="w-full bg-[#1a1a1a] border border-[#444] rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#ffa116]" />
                    </div>
                    <textarea name="description" placeholder="Description" required className="w-full bg-[#1a1a1a] border border-[#444] rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#ffa116] min-h-[60px]" />
                    <button type="submit" className="self-end px-3 py-1.5 bg-[#ffa116] text-[#1a1a1a] text-xs font-semibold rounded-lg hover:bg-[#ffb03a] transition-colors mt-2">Save Experience</button>
                  </form>
                )}
              </div>

              {/* PROJECTS */}
              <div className="bg-[#333]/50 border border-[#444]/50 rounded-xl p-5">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Projects</h2>
                <div className="flex flex-col gap-4 mb-4">
                  {user?.projects?.map((proj) => (
                    <div key={proj.id} className="bg-[#222] p-4 rounded-lg border border-[#444] relative">
                      {isEditing && (
                        <button onClick={() => handleDeleteProject(proj.id)} className="absolute top-3 right-3 text-red-400 hover:text-red-300 text-xs font-medium">Delete</button>
                      )}
                      <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                      <p className="text-sm text-gray-300 mt-2">{proj.description}</p>
                      <div className="flex gap-4 mt-3">
                        {proj.githubLink && <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-xs text-[#ffa116] hover:underline">GitHub</a>}
                        {proj.liveLink && <a href={proj.liveLink} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">Live Demo</a>}
                      </div>
                    </div>
                  ))}
                  {(!user?.projects || user.projects.length === 0) && <p className="text-sm text-gray-500">No projects added.</p>}
                </div>
                {isEditing && (
                  <form onSubmit={handleAddProject} className="flex flex-col gap-2 bg-[#222] p-4 rounded-lg border border-[#555]">
                    <h4 className="text-xs font-bold text-gray-400 mb-2">ADD PROJECT</h4>
                    <input name="title" type="text" placeholder="Project Title" required className="w-full bg-[#1a1a1a] border border-[#444] rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#ffa116]" />
                    <textarea name="description" placeholder="Description" required className="w-full bg-[#1a1a1a] border border-[#444] rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#ffa116] min-h-[60px]" />
                    <input name="githubLink" type="url" placeholder="GitHub URL (Optional)" className="w-full bg-[#1a1a1a] border border-[#444] rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#ffa116]" />
                    <input name="liveLink" type="url" placeholder="Live URL (Optional)" className="w-full bg-[#1a1a1a] border border-[#444] rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#ffa116]" />
                    <button type="submit" className="self-end px-3 py-1.5 bg-[#ffa116] text-[#1a1a1a] text-xs font-semibold rounded-lg hover:bg-[#ffb03a] transition-colors mt-2">Save Project</button>
                  </form>
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </main>
  );
}
