import React from 'react';
import { useResumeData } from '../hooks/useResumeData';
import { ArrowLeft, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Preview: React.FC = () => {
    const { data } = useResumeData();

    const hasEducation = data.education.length > 0 && data.education.some(e => e.school);
    const hasExperience = data.experience.length > 0 && data.experience.some(e => e.company);
    const hasProjects = data.projects.length > 0 && data.projects.some(p => p.name);
    const hasSkills = data.skills.length > 0;
    const hasLinks = !!(data.personalInfo.github || data.personalInfo.linkedin);

    return (
        <div className="kn-page flex flex-col items-center pb-32">
            <div className="kn-context-header w-full max-w-4xl flex justify-between items-center mb-12">
                <div>
                    <h1>Resume Preview</h1>
                    <p>High-fidelity view of your current draft.</p>
                </div>
                <div className="flex gap-4">
                    <Link to="/builder" className="kn-btn kn-btn-secondary">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Editor
                    </Link>
                    <button className="kn-btn kn-btn-primary" onClick={() => window.print()}>
                        <Printer className="w-4 h-4 mr-2" />
                        Print / Download
                    </button>
                </div>
            </div>

            {/* A4 Resume Mockup */}
            <div className="bg-white w-full max-w-[800px] aspect-[1/1.41] shadow-2xl p-16 font-serif text-black overflow-hidden flex flex-col">
                {/* Header */}
                <div className="text-center mb-10 border-b-2 border-black pb-8">
                    <h1 className="text-4xl uppercase tracking-tighter mb-4 m-0">{data.personalInfo.fullName || 'YOUR NAME'}</h1>
                    <div className="flex justify-center gap-6 text-sm uppercase tracking-widest font-sans font-bold">
                        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                        {data.personalInfo.email && (data.personalInfo.phone || data.personalInfo.location) && <span>•</span>}
                        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                        {data.personalInfo.phone && data.personalInfo.location && <span>•</span>}
                        {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
                    </div>
                </div>

                {/* Summary */}
                {data.summary && (
                    <div className="mb-8">
                        <h3 className="text-sm font-sans font-black uppercase tracking-widest border-b border-black mb-4 pb-1">Summary</h3>
                        <p className="text-sm leading-relaxed italic opacity-90 text-justify">
                            {data.summary}
                        </p>
                    </div>
                )}

                {/* Experience */}
                {hasExperience && (
                    <div className="mb-8">
                        <h3 className="text-sm font-sans font-black uppercase tracking-widest border-b border-black mb-4 pb-1">Experience</h3>
                        {data.experience.map((exp, i) => exp.company && (
                            <div key={i} className="mb-6">
                                <div className="flex justify-between font-bold text-sm mb-1 uppercase">
                                    <span>{exp.company}</span>
                                    <span>{exp.date}</span>
                                </div>
                                <div className="italic text-sm mb-2">{exp.role}</div>
                                <p className="text-xs opacity-80 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Education */}
                {hasEducation && (
                    <div className="mb-8">
                        <h3 className="text-sm font-sans font-black uppercase tracking-widest border-b border-black mb-4 pb-1">Education</h3>
                        {data.education.map((edu, i) => edu.school && (
                            <div key={i} className="flex justify-between items-baseline mb-2">
                                <div>
                                    <span className="font-bold text-sm uppercase">{edu.school}</span>
                                    <span className="mx-2 text-xs">•</span>
                                    <span className="text-sm">{edu.degree}</span>
                                </div>
                                <span className="text-xs font-bold">{edu.date}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Projects */}
                {hasProjects && (
                    <div className="mb-8">
                        <h3 className="text-sm font-sans font-black uppercase tracking-widest border-b border-black mb-4 pb-1">Projects</h3>
                        {data.projects.map((proj, i) => proj.name && (
                            <div key={i} className="mb-4">
                                <div className="flex justify-between text-sm font-bold mb-1">
                                    <span>{proj.name}</span>
                                    <span className="text-xs font-normal opacity-50 underline">{proj.link}</span>
                                </div>
                                <p className="text-xs opacity-80">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Skills */}
                {hasSkills && (
                    <div className="mb-8">
                        <h3 className="text-sm font-sans font-black uppercase tracking-widest border-b border-black mb-4 pb-1">Skills</h3>
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                            {data.skills.map((s, i) => (
                                <span key={i} className="text-xs font-sans font-bold uppercase tracking-wider">{s}</span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Links */}
                {hasLinks && (
                    <div className="mb-8">
                        <h3 className="text-sm font-sans font-black uppercase tracking-widest border-b border-black mb-4 pb-1">Links</h3>
                        <div className="flex gap-6 text-xs font-sans font-bold uppercase tracking-wider">
                            {data.personalInfo.github && <span>GitHub: {data.personalInfo.github}</span>}
                            {data.personalInfo.linkedin && <span>LinkedIn: {data.personalInfo.linkedin}</span>}
                        </div>
                    </div>
                )}

                <div className="mt-auto pt-8 border-t border-gray-100 text-[8px] text-center opacity-30">
                    Generated by AI Resume Builder (KodNest Premium System)
                </div>
            </div>
        </div>
    );
};
