import { useState } from 'react';

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
    summary: "Results-driven software engineer with 5+ years of experience in building scalable web applications.",
    education: [
        { school: "University of Tech", degree: "B.S. Computer Science", date: "2015 - 2019" }
    ],
    experience: [
        { company: "CloudScale", role: "Senior Engineer", date: "2020 - Present", description: "Led the development of the core API service using Node.js and AWS." }
    ],
    projects: [
        { name: "EcoTrack", description: "Sustainability tracking app used by 10k+ users.", link: "github.com/johndoe/ecotrack" }
    ],
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "PostgreSQL", "AWS"]
};

export const useResumeData = () => {
    const [data, setData] = useState<ResumeData>({
        personalInfo: { fullName: '', email: '', phone: '', location: '', github: '', linkedin: '' },
        summary: '',
        education: [],
        experience: [],
        projects: [],
        skills: []
    });

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

    const updateEducation = (index: number, field: keyof ResumeData['education'][0], value: string) => {
        setData(prev => {
            const newEdu = [...prev.education];
            newEdu[index] = { ...newEdu[index], [field]: value };
            return { ...prev, education: newEdu };
        });
    };

    const updateExperience = (index: number, field: keyof ResumeData['experience'][0], value: string) => {
        setData(prev => {
            const newExp = [...prev.experience];
            newExp[index] = { ...newExp[index], [field]: value };
            return { ...prev, experience: newExp };
        });
    };

    const updateProject = (index: number, field: keyof ResumeData['projects'][0], value: string) => {
        setData(prev => {
            const newProj = [...prev.projects];
            newProj[index] = { ...newProj[index], [field]: value };
            return { ...prev, projects: newProj };
        });
    };

    const updateSkills = (value: string) => {
        setData(prev => ({ ...prev, skills: value.split(',').map(s => s.trim()) }));
    };

    return {
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
    };
};
