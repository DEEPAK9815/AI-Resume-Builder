import React from 'react';
import { useResumeData } from '../hooks/useResumeData';
import { Plus, Database, Eye, Trash2, ShieldCheck, AlertCircle, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';

const ACTION_VERBS = ['Built', 'Developed', 'Designed', 'Implemented', 'Led', 'Improved', 'Created', 'Optimized', 'Automated'];

const BulletGuidance: React.FC<{ text: string }> = ({ text }) => {
    if (!text) return null;

    const bullets = text.split('\n').filter(b => b.trim());
    const warnings: string[] = [];

    bullets.forEach(bullet => {
        const trimmed = bullet.trim().replace(/^[-•*]\s*/, '');
        if (!trimmed) return;

        const firstWord = trimmed.split(' ')[0];
        const hasActionVerb = ACTION_VERBS.some(v => v.toLowerCase() === firstWord.toLowerCase());
        const hasNumbers = /\d+(%|k|x|X|m)?/.test(trimmed);

        if (!hasActionVerb) warnings.push("Start with a strong action verb (e.g., Developed, Led).");
        if (!hasNumbers) warnings.push("Add measurable impact (numbers like 20%, 5k, etc.).");
    });

    if (warnings.length === 0) return null;

    // Filter unique warnings
    const uniqueWarnings = Array.from(new Set(warnings)).slice(0, 2);

    return (
        <div className="flex flex-col gap-1 mt-2">
            {uniqueWarnings.map((w, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[10px] text-amber-700 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    <span>{w}</span>
                </div>
            ))}
        </div>
    );
};

export const Builder: React.FC = () => {
    const {
        data,
        score,
        suggestions,
        loadSample,
        updatePersonalInfo,
        updateSummary,
        updateTemplate,
        addEducation,
        addExperience,
        addProject,
        removeSectionItem,
        updateEducation,
        updateExperience,
        updateProject,
        updateSkills
    } = useResumeData();

    const templates: Array<{ id: 'classic' | 'modern' | 'minimal'; label: string }> = [
        { id: 'classic', label: 'Classic' },
        { id: 'modern', label: 'Modern' },
        { id: 'minimal', label: 'Minimal' }
    ];

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

            {/* Template Selector Tabs */}
            <div className="px-10 mb-8 max-w-[1400px] mx-auto w-full">
                <div className="flex items-center gap-4 border-b border-gray-200">
                    <div className="flex items-center gap-2 text-gray-400 mr-4 py-3">
                        <Layout className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">Layout Template</span>
                    </div>
                    {templates.map(t => (
                        <button
                            key={t.id}
                            className={`py-3 px-6 text-sm font-bold transition-all border-b-2 ${data.template === t.id
                                    ? 'border-red-800 text-red-800'
                                    : 'border-transparent text-gray-500 hover:text-gray-800'
                                }`}
                            onClick={() => updateTemplate(t.id)}
                        >
                            {t.label}
                        </button>
                    ))}
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
                            <div key={idx} className="mb-6 p-4 border rounded-lg bg-gray-50 relative group">
                                <button
                                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => removeSectionItem('education', idx)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
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
                            <div key={idx} className="mb-6 p-4 border rounded-lg bg-gray-50 relative group">
                                <button
                                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => removeSectionItem('experience', idx)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <input className="kn-input mb-0" placeholder="Company" value={exp.company} onChange={(e) => updateExperience(idx, 'company', e.target.value)} />
                                    <input className="kn-input mb-0" placeholder="Role" value={exp.role} onChange={(e) => updateExperience(idx, 'role', e.target.value)} />
                                    <input className="kn-input mb-0" placeholder="Date" value={exp.date} onChange={(e) => updateExperience(idx, 'date', e.target.value)} />
                                </div>
                                <textarea
                                    className="kn-input mb-1"
                                    placeholder="Accomplishments... (Use bullets + action verbs)"
                                    value={exp.description}
                                    onChange={(e) => updateExperience(idx, 'description', e.target.value)}
                                />
                                <BulletGuidance text={exp.description} />
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
                            <div key={idx} className="mb-6 p-4 border rounded-lg bg-gray-50 relative group">
                                <button
                                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => removeSectionItem('projects', idx)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <input className="kn-input mb-0" placeholder="Project Name" value={proj.name} onChange={(e) => updateProject(idx, 'name', e.target.value)} />
                                    <input className="kn-input mb-0" placeholder="Link" value={proj.link} onChange={(e) => updateProject(idx, 'link', e.target.value)} />
                                </div>
                                <textarea
                                    className="kn-input mb-1"
                                    placeholder="Short Description... (Highlight impact)"
                                    value={proj.description}
                                    onChange={(e) => updateProject(idx, 'description', e.target.value)}
                                />
                                <BulletGuidance text={proj.description} />
                            </div>
                        ))}
                    </div>

                    {/* Skills */}
                    <div className="kn-card">
                        <h3 className="mb-6 border-b pb-2">Skills</h3>
                        <label className="kn-label">Comma separated skills (Target 8+)</label>
                        <input
                            className="kn-input"
                            placeholder="React, TypeScript, AWS..."
                            value={data.skills.join(', ')}
                            onChange={(e) => updateSkills(e.target.value)}
                        />
                    </div>

                </section>

                {/* Right: Live Preview & Score Panel */}
                <aside className="kn-secondary-panel sticky top-32 h-fit">

                    {/* ATS Score Meter */}
                    <div className="kn-panel-box bg-white border-2 border-red-800 mb-6 transition-all duration-300">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2 text-red-800 font-bold">
                                <ShieldCheck className="w-5 h-5" />
                                <span>ATS Readiness Score</span>
                            </div>
                            <span className="text-2xl font-black text-red-800">{score}%</span>
                        </div>

                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
                            <div
                                className="h-full bg-red-800 transition-all duration-500 ease-in-out"
                                style={{ width: `${score}%` }}
                            />
                        </div>

                        {suggestions.length > 0 && (
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Top 3 Improvements</label>
                                {suggestions.map((s, i) => (
                                    <div key={i} className="flex gap-2 text-xs text-gray-600 bg-gray-50 p-2.5 rounded border border-gray-100 shadow-sm animate-in fade-in slide-in-from-left-2 duration-300">
                                        <AlertCircle className="w-3.5 h-3.5 text-red-800 shrink-0" />
                                        <span>{s}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Real-time Preview Panel (Basic layout in builder) */}
                    <div className="kn-panel-box min-h-[500px] flex flex-col p-6 bg-white shadow-lg font-serif border border-gray-200">
                        <div className="text-center mb-6">
                            <h2 className="text-xl m-0 uppercase tracking-tighter">{data.personalInfo.fullName || 'YOUR NAME'}</h2>
                            <div className="text-[8px] opacity-60 flex flex-wrap justify-center gap-x-2 gap-y-1 mt-2">
                                {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                                {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                                {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
                            </div>
                        </div>

                        {data.summary && (
                            <div className="mb-4">
                                <h4 className="border-b border-black text-[9px] uppercase tracking-widest mb-1 pb-0.5">Summary</h4>
                                <p className="text-[9px] leading-relaxed italic opacity-80 text-justify">{data.summary}</p>
                            </div>
                        )}

                        {data.experience.length > 0 && (
                            <div className="mb-4">
                                <h4 className="border-b border-black text-[9px] uppercase tracking-widest mb-1 pb-0.5">Experience</h4>
                                {data.experience.map((exp, idx) => (
                                    <div key={idx} className="mb-2">
                                        <div className="flex justify-between text-[9px] font-bold">
                                            <span>{exp.company}</span>
                                            <span>{exp.date}</span>
                                        </div>
                                        <div className="text-[8px] italic opacity-70 mb-0.5">{exp.role}</div>
                                        <p className="text-[8px] opacity-80 leading-tight line-clamp-2">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-auto pt-6 text-[7px] text-center opacity-30 italic">
                            Template: <span className="uppercase font-bold">{data.template}</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};
