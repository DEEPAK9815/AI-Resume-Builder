import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, Copy, ShieldCheck } from 'lucide-react';

export const ProofPage: React.FC = () => {
    const navigate = useNavigate();
    const [links, setLinks] = useState({
        lovable: localStorage.getItem('rb_link_lovable') || '',
        github: localStorage.getItem('rb_link_github') || '',
        deploy: localStorage.getItem('rb_link_deploy') || ''
    });

    const [stepsStatus, setStepsStatus] = useState<boolean[]>([]);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        const status = Array.from({ length: 8 }, (_, i) => {
            return !!localStorage.getItem(`rb_step_${i + 1}_artifact`);
        });
        setStepsStatus(status);

        // Gating: Ensure all steps are completed
        if (status.some(s => !s)) {
            navigate('/rb/01-problem');
        }
    }, [navigate]);

    const handleLinkChange = (key: keyof typeof links, value: string) => {
        const newLinks = { ...links, [key]: value };
        setLinks(newLinks);
        localStorage.setItem(`rb_link_${key}`, value);
    };

    const handleCopyFinal = () => {
        const text = `
    AI Resume Builder — Project 3 Final Submission
    
    Steps Completed: ${stepsStatus.filter(s => s).length}/8
    
    Artifact Links:
    - Lovable: ${links.lovable}
    - GitHub: ${links.github}
    - Deploy: ${links.deploy}
    
    Certified by KodNest Premium Build System.
    `;
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="kn-page">
            <div className="kn-context-header">
                <h1>Proof of Work</h1>
                <p>Submit and verify artifacts for the AI Resume Builder project.</p>
            </div>

            <div className="kn-content-grid">
                <section className="kn-workspace">
                    <div className="kn-card mb-6">
                        <h3>Step Completion Status</h3>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {stepsStatus.map((completed, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
                                    {completed ? (
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                    ) : (
                                        <AlertCircle className="w-5 h-5 text-amber-500" />
                                    )}
                                    <span className={completed ? 'font-medium' : 'text-gray-500'}>
                                        Step 0{i + 1}: {getStepName(i + 1)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="kn-card">
                        <h3>Final Submissions</h3>
                        <div className="mt-4 flex flex-col gap-4">
                            <div>
                                <label className="kn-label">Lovable Project Link</label>
                                <input
                                    type="text"
                                    className="kn-input"
                                    placeholder="https://lovable.dev/projects/..."
                                    value={links.lovable}
                                    onChange={(e) => handleLinkChange('lovable', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="kn-label">GitHub Repository Link</label>
                                <input
                                    type="text"
                                    className="kn-input"
                                    placeholder="https://github.com/..."
                                    value={links.github}
                                    onChange={(e) => handleLinkChange('github', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="kn-label">Production Deploy Link</label>
                                <input
                                    type="text"
                                    className="kn-input"
                                    placeholder="https://..."
                                    value={links.deploy}
                                    onChange={(e) => handleLinkChange('deploy', e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            className="kn-btn kn-btn-primary kn-btn-full mt-6"
                            onClick={handleCopyFinal}
                        >
                            <Copy className="w-4 h-4 mr-2" />
                            {isCopied ? 'Copied Submission Details!' : 'Copy Final Submission'}
                        </button>
                    </div>
                </section>

                <aside className="kn-secondary-panel">
                    <div className="kn-panel-box bg-indigo-50 border-indigo-100 italic">
                        <div className="flex items-center gap-2 text-indigo-900 font-bold mb-2">
                            <ShieldCheck className="w-5 h-5" />
                            Submission Guidelines
                        </div>
                        <p className="text-sm text-indigo-800">
                            Ensure all 8 steps have artifacts uploaded before final submission.
                            The links provided will be used for final certification and grading.
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
};

function getStepName(step: number): string {
    const names = [
        '',
        'Problem Statement',
        'Market Analysis',
        'Architecture Design',
        'High Level Design',
        'Low Level Design',
        'Build Process',
        'Testing Strategy',
        'Shipping Plan'
    ];
    return names[step] || '';
}
