import { useState, useEffect } from 'react';

export interface ResumeData {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        github: string;
        linkedin: string;
    };
    summary: string;
    education: Array<{
        school: string;
        degree: string;
        date: string;
    }>;
    experience: Array<{
        company: string;
        role: string;
        date: string;
        description: string;
    }>;
    projects: Array<{
        name: string;
        description: string;
        link: string;
    }>;
    skills: string[];
    template: 'classic' | 'modern' | 'minimal';
}

const sampleData: ResumeData = {
    personalInfo: {
        fullName: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 890",
        location: "New York, NY",
        github: "github.com/johndoe",
        linkedin: "linkedin.com/in/johndoe"
    },
    summary: "Results-driven software engineer with 5+ years of experience in building scalable web applications. Expert in architectural design and performance optimization across distributed systems.",
    education: [
        { school: "University of Tech", degree: "B.S. Computer Science", date: "2015 - 2019" }
    ],
    experience: [
        { company: "CloudScale", role: "Senior Engineer", date: "2020 - Present", description: "Led development of core API serving 10M+ daily requests. Optimized database queries reducing latency by 45% using PostgreSQL indexing." }
    ],
    projects: [
        { name: "EcoTrack", description: "Sustainability tracking app used by 10k+ users. Integrated 3 different third-party APIs.", link: "github.com/johndoe/ecotrack" },
        { name: "DevPort", description: "Portfolio generator for developers with 100% custom styling.", link: "github.com/johndoe/devport" }
    ],
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "PostgreSQL", "AWS", "Docker", "Git"],
    template: 'classic'
};

const STORAGE_KEY = 'resumeBuilderData';

const initialData: ResumeData = {
    personalInfo: { fullName: '', email: '', phone: '', location: '', github: '', linkedin: '' },
    summary: '',
    education: [],
    experience: [],
    projects: [],
    skills: [],
    template: 'classic'
};

const getSavedData = (): ResumeData => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            return { ...initialData, ...parsed };
        } catch (e) {
            return initialData;
        }
    }
    return initialData;
};

export const useResumeData = () => {
    const [data, setData] = useState<ResumeData>(getSavedData());

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, [data]);

    const loadSample = () => setData(sampleData);

    const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
        setData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [field]: value }
        }));
    };

    const updateSummary = (value: string) => setData(prev => ({ ...prev, summary: value }));

    const updateTemplate = (template: ResumeData['template']) => setData(prev => ({ ...prev, template }));

    const addEducation = () => {
        setData(prev => ({
            ...prev,
            education: [...prev.education, { school: '', degree: '', date: '' }]
        }));
    };

    const addExperience = () => {
        setData(prev => ({
            ...prev,
            experience: [...prev.experience, { company: '', role: '', date: '', description: '' }]
        }));
    };

    const addProject = () => {
        setData(prev => ({
            ...prev,
            projects: [...prev.projects, { name: '', description: '', link: '' }]
        }));
    };

    const removeSectionItem = (section: 'education' | 'experience' | 'projects', index: number) => {
        setData(prev => {
            const newList = [...prev[section]];
            newList.splice(index, 1);
            return { ...prev, [section]: newList };
        });
    };

    const updateEducation = (index: number, field: keyof ResumeData['education'][0], value: string) => {
        setData(prev => {
            const newList = [...prev.education];
            newList[index] = { ...newList[index], [field]: value };
            return { ...prev, education: newList };
        });
    };

    const updateExperience = (index: number, field: keyof ResumeData['experience'][0], value: string) => {
        setData(prev => {
            const newList = [...prev.experience];
            newList[index] = { ...newList[index], [field]: value };
            return { ...prev, experience: newList };
        });
    };

    const updateProject = (index: number, field: keyof ResumeData['projects'][0], value: string) => {
        setData(prev => {
            const newList = [...prev.projects];
            newList[index] = { ...newList[index], [field]: value };
            return { ...prev, projects: newList };
        });
    };

    const updateSkills = (value: string) => {
        setData(prev => ({ ...prev, skills: value.split(',').map(s => s.trim()).filter(Boolean) }));
    };

    // Deterministic ATS Scoring
    const calculateScore = () => {
        let score = 0;
        const suggestions: string[] = [];

        // 1. Projects (at least 2) - Priority 1
        if (data.projects.filter(p => p.name).length >= 2) {
            score += 10;
        } else {
            suggestions.push("Add at least 2 projects to showcase your range.");
        }

        // 2. Numeric Impact (Numbers in bullets) - Priority 2
        const hasNumbers = [...data.experience, ...data.projects].some(
            item => /\d+(%|k|x|X|m)?/.test(item.description || '')
        );
        if (hasNumbers) {
            score += 15;
        } else {
            suggestions.push("Add measurable impact (numbers like %, $, or count) to your bullets.");
        }

        // 3. Summary (40-120 words) - Priority 3
        const summaryWords = data.summary.trim().split(/\s+/).filter(Boolean).length;
        if (summaryWords >= 40 && summaryWords <= 120) {
            score += 15;
        } else {
            suggestions.push("Write a stronger professional summary (target 40–120 words).");
        }

        // 4. Skills (>= 8) - Priority 4
        if (data.skills.length >= 8) {
            score += 10;
        } else {
            suggestions.push("Focus on expanding your skills list (target 8+ core competencies).");
        }

        // 5. Experience (at least 1) - Priority 5
        if (data.experience.length >= 1) {
            score += 10;
        } else {
            suggestions.push("Add internship or work experience to demonstrate professional growth.");
        }

        // 6. Links (GitHub/LinkedIn)
        if (data.personalInfo.github || data.personalInfo.linkedin) {
            score += 10;
        }

        // 7. Education complete
        const eduComplete = data.education.length > 0 && data.education.every(e => e.school && e.degree);
        if (eduComplete) {
            score += 10;
        }

        return {
            score: Math.min(100, score + 20), // +20 baseline for base structure quality
            suggestions: suggestions.slice(0, 3)
        };
    };

    const { score, suggestions } = calculateScore();

    return {
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
    };
};
