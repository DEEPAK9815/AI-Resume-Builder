import React from 'react';
import { useResumeData } from '../hooks/useResumeData';
import { Plus, Database, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Builder: React.FC = () => {
    const {
        data,
        loadSample,
        updatePersonalInfo,
        updateSummary,
        addEducation,
        addExperience,
        addProject,
        updateEducation,
        updateExperience,
        updateProject,
        updateSkills
    } = useResumeData();

    return (
        <div className="kn-page">
            <div className="kn-context-header flex justify-between items-end">
                <div>
                    <h1>Resume Builder</h1>
                    <p>Draft your professional story. Changes reflect in real-time.</p>
                </div>
                <div className="flex gap-4 mb-4">
                    <button className="kn-btn kn-btn-secondary" onClick={loadSample}>
                        <Database className="w-4 h-4 mr-2" />
                        Load Sample Data
                    </button>
                    <Link to="/preview" className="kn-btn kn-btn-primary">
                        <Eye className="w-4 h-4 mr-2" />
                        Full Preview
                    </Link>
                </div>
            </div>

            <div className="kn-content-grid">
                {/* Left: Form Sections */}
                <section className="kn-workspace flex flex-col gap-8 pb-32">

                    {/* Personal Info */}
                    <div className="kn-card">
                        <h3 className="mb-6 border-b pb-2">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="kn-label">Full Name</label>
                                <input
                                    className="kn-input"
                                    value={data.personalInfo.fullName}
                                    onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="kn-label">Email Address</label>
                                <input
                                    className="kn-input"
                                    value={data.personalInfo.email}
                                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="kn-label">Phone Number</label>
                                <input
                                    className="kn-input"
                                    value={data.personalInfo.phone}
                                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="kn-label">Location</label>
                                <input
                                    className="kn-input"
                                    value={data.personalInfo.location}
                                    onChange={(e) => updatePersonalInfo('location', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="kn-label">GitHub URL</label>
                                <input
                                    className="kn-input"
                                    value={data.personalInfo.github}
                                    onChange={(e) => updatePersonalInfo('github', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="kn-label">LinkedIn URL</label>
                                <input
                                    className="kn-input"
                                    value={data.personalInfo.linkedin}
                                    onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="kn-card">
                        <h3 className="mb-6 border-b pb-2">Professional Summary</h3>
                        <textarea
                            className="kn-textarea"
                            placeholder="Tell your professional story..."
                            value={data.summary}
                            onChange={(e) => updateSummary(e.target.value)}
                        />
                    </div>

                    {/* Education */}
                    <div className="kn-card">
                        <div className="flex justify-between items-center mb-6 border-b pb-2">
                            <h3>Education</h3>
                            <button className="text-red-800 flex items-center text-sm font-bold" onClick={addEducation}>
                                <Plus className="w-4 h-4 mr-1" /> Add
                            </button>
                        </div>
                        {data.education.map((edu, idx) => (
                            <div key={idx} className="mb-6 p-4 border rounded-lg bg-gray-50 relative">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <input className="kn-input mb-0" placeholder="School" value={edu.school} onChange={(e) => updateEducation(idx, 'school', e.target.value)} />
                                    <input className="kn-input mb-0" placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(idx, 'degree', e.target.value)} />
                                    <input className="kn-input mb-0" placeholder="Date/Range" value={edu.date} onChange={(e) => updateEducation(idx, 'date', e.target.value)} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Experience */}
                    <div className="kn-card">
                        <div className="flex justify-between items-center mb-6 border-b pb-2">
                            <h3>Experience</h3>
                            <button className="text-red-800 flex items-center text-sm font-bold" onClick={addExperience}>
                                <Plus className="w-4 h-4 mr-1" /> Add
                            </button>
                        </div>
                        {data.experience.map((exp, idx) => (
                            <div key={idx} className="mb-6 p-4 border rounded-lg bg-gray-50">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <input className="kn-input mb-0" placeholder="Company" value={exp.company} onChange={(e) => updateExperience(idx, 'company', e.target.value)} />
                                    <input className="kn-input mb-0" placeholder="Role" value={exp.role} onChange={(e) => updateExperience(idx, 'role', e.target.value)} />
                                    <input className="kn-input mb-0" placeholder="Date" value={exp.date} onChange={(e) => updateExperience(idx, 'date', e.target.value)} />
                                </div>
                                <textarea className="kn-input" placeholder="Accomplishments..." value={exp.description} onChange={(e) => updateExperience(idx, 'description', e.target.value)} />
                            </div>
                        ))}
                    </div>

                    {/* Projects */}
                    <div className="kn-card">
                        <div className="flex justify-between items-center mb-6 border-b pb-2">
                            <h3>Projects</h3>
                            <button className="text-red-800 flex items-center text-sm font-bold" onClick={addProject}>
                                <Plus className="w-4 h-4 mr-1" /> Add
                            </button>
                        </div>
                        {data.projects.map((proj, idx) => (
                            <div key={idx} className="mb-6 p-4 border rounded-lg bg-gray-50">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <input className="kn-input mb-0" placeholder="Project Name" value={proj.name} onChange={(e) => updateProject(idx, 'name', e.target.value)} />
                                    <input className="kn-input mb-0" placeholder="Link" value={proj.link} onChange={(e) => updateProject(idx, 'link', e.target.value)} />
                                </div>
                                <input className="kn-input mb-0" placeholder="Short Description" value={proj.description} onChange={(e) => updateProject(idx, 'description', e.target.value)} />
                            </div>
                        ))}
                    </div>

                    {/* Skills */}
                    <div className="kn-card">
                        <h3 className="mb-6 border-b pb-2">Skills</h3>
                        <label className="kn-label">Comma separated skills</label>
                        <input
                            className="kn-input"
                            placeholder="React, TypeScript, AWS..."
                            value={data.skills.join(', ')}
                            onChange={(e) => updateSkills(e.target.value)}
                        />
                    </div>

                </section>

                {/* Right: Live Preview Panel */}
                <aside className="kn-secondary-panel sticky top-32 h-fit">
                    <div className="kn-panel-box min-h-[600px] flex flex-col p-8 bg-white shadow-sm font-serif">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl m-0">{data.personalInfo.fullName || 'YOUR NAME'}</h2>
                            <div className="text-xs opacity-60 flex justify-center gap-2 mt-2">
                                <span>{data.personalInfo.email}</span>
                                <span>{data.personalInfo.phone}</span>
                                <span>{data.personalInfo.location}</span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="border-b text-xs uppercase tracking-widest mb-2">Summary</h4>
                            <p className="text-[10px] leading-relaxed italic opacity-80">{data.summary || 'Enter your summary...'}</p>
                        </div>

                        <div className="mb-4">
                            <h4 className="border-b text-xs uppercase tracking-widest mb-2">Experience</h4>
                            <div className="h-20 border-2 border-dashed border-gray-100 rounded flex items-center justify-center text-[10px] text-gray-300">
                                Detailed preview available in Preview route
                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="border-b text-xs uppercase tracking-widest mb-2">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((s, i) => (
                                    <span key={i} className="text-[10px] bg-gray-50 px-2 py-1 rounded">{s}</span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-auto pt-8 text-[8px] text-center opacity-30">
                            Generated by AI Resume Builder (KodNest)
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};
