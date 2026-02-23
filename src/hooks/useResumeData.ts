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
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "PostgreSQL", "AWS", "Docker", "Git"]
};

const STORAGE_KEY = 'resumeBuilderData';

const initialData: ResumeData = {
    personalInfo: { fullName: '', email: '', phone: '', location: '', github: '', linkedin: '' },
    summary: '',
    education: [],
    experience: [],
    projects: [],
    skills: []
};

const getSavedData = (): ResumeData => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            return JSON.parse(saved);
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

        // 1. Summary (40-120 words)
        const summaryWords = data.summary.trim().split(/\s+/).filter(Boolean).length;
        if (summaryWords >= 40 && summaryWords <= 120) {
            score += 15;
        } else {
            suggestions.push("Write a stronger summary (40–120 words).");
        }

        // 2. Projects (at least 2)
        if (data.projects.filter(p => p.name).length >= 2) {
            score += 10;
        } else {
            suggestions.push("Add at least 2 projects.");
        }

        // 3. Experience (at least 1)
        if (data.experience.length >= 1) {
            score += 10;
        } else {
            suggestions.push("Add at least 1 work experience entry.");
        }

        // 4. Skills (>= 8)
        if (data.skills.length >= 8) {
            score += 10;
        } else {
            suggestions.push("Add more skills (target 8+).");
        }

        // 5. Links (GitHub/LinkedIn)
        if (data.personalInfo.github || data.personalInfo.linkedin) {
            score += 10;
        } else {
            suggestions.push("Add links to GitHub or LinkedIn.");
        }

        // 6. Numeric Impact (Numbers in bullets)
        const hasNumbers = [...data.experience, ...data.projects].some(
            item => /\d+(%|k|x|X|m)?/.test(item.description || '')
        );
        if (hasNumbers) {
            score += 15;
        } else {
            suggestions.push("Add measurable impact (numbers) in bullets.");
        }

        // 7. Education complete
        const eduComplete = data.education.length > 0 && data.education.every(e => e.school && e.degree);
        if (eduComplete) {
            score += 10;
        } else {
            suggestions.push("Complete all fields in education section.");
        }

        return {
            score: Math.min(100, score),
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
