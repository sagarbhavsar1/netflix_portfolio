const { readFileSync } = require('fs');
const { join } = require('path');

// Load Sagar's complete profile at runtime
const sagarProfile = JSON.parse(
    readFileSync(join(__dirname, '..', 'src', 'data', 'sagarProfile.json'), 'utf-8')
);

module.exports = async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { jobDescription } = req.body;

    if (!jobDescription) {
        return res.status(400).json({ error: 'Job description is required' });
    }

    // Get API key from environment variable
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    // Build comprehensive profile context
    const profileContext = buildProfileContext(sagarProfile);

    // Create the prompt for Groq
    const systemPrompt = `You are an expert career advisor and recruiter assistant. Your task is to analyze how well Sagar Bhavsar fits a specific job description and create a compelling, personalized pitch.

You have access to Sagar's complete professional profile including his skills, experience, projects, certifications, and personal interests.

IMPORTANT GUIDELINES:
- Be specific and reference actual skills, experiences, and projects that match the job requirements
- Highlight quantifiable achievements (percentages, numbers, impact)
- Be professional but personable
- Focus on what makes Sagar uniquely qualified
- If he has relevant projects or publications, mention them
- Keep the response focused and persuasive (3-4 paragraphs)`;

    const userPrompt = `Based on Sagar's complete profile below and the job description provided, create a compelling pitch explaining why Sagar would be an excellent fit for this role.

===========================================
SAGAR BHAVSAR - COMPLETE PROFILE
===========================================

${profileContext}

===========================================
JOB DESCRIPTION (From Recruiter)
===========================================

${jobDescription}

===========================================
YOUR TASK
===========================================

Create a persuasive pitch (3-4 paragraphs) that includes:
1. **Opening Hook**: Why Sagar is an excellent match for this specific role
2. **Skills & Experience Match**: Specific skills, tools, and experiences that directly align with the job requirements
3. **Unique Value Proposition**: What sets Sagar apart - quantifiable achievements, unique projects, or relevant certifications
4. **Closing Statement**: A confident summary of why he would be a valuable addition to the team

Be specific. Reference actual numbers, project names, tools, and achievements from his profile that match the job description.`;

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.7,
                max_tokens: 1500,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Groq API error:', errorData);
            return res.status(500).json({ error: 'Failed to analyze job fit' });
        }

        const data = await response.json();
        const analysis = data.choices[0]?.message?.content || 'Unable to generate analysis';

        return res.status(200).json({ analysis });
    } catch (error) {
        console.error('Error calling Groq API:', error);
        return res.status(500).json({ error: 'Failed to process request' });
    }
};

// Helper function to build a comprehensive profile context string
function buildProfileContext(profile) {
    const sections = [];

    // Basic Info
    sections.push(`**Name:** ${profile.name}
**Headline:** ${profile.headline}
**Location:** ${profile.location}
**Years of Experience:** ${profile.yearsOfExperience}
**Visa Status:** ${profile.visaStatus}
**Languages:** ${profile.languages.join(', ')}`);

    // Summary
    sections.push(`**Professional Summary:**
${profile.summary}`);

    // Education
    sections.push(`**Education:**
${profile.education.map(e => `- ${e.degree} from ${e.institution} (${e.period})`).join('\n')}`);

    // Skills
    sections.push(`**Technical Skills:**
- Programming: ${profile.skills.programming.join(', ')}
- ML/AI: ${profile.skills.mlAi.join(', ')}
- Frameworks: ${profile.skills.frameworks.join(', ')}
- Big Data: ${profile.skills.bigData.join(', ')}
- Cloud: ${profile.skills.cloud.join(', ')}
- DevOps: ${profile.skills.devops.join(', ')}
- Databases: ${profile.skills.databases.join(', ')}
- Visualization: ${profile.skills.visualization.join(', ')}
- Tools: ${profile.skills.tools.join(', ')}`);

    // Experience
    sections.push(`**Work Experience:**
${profile.experience.map(exp =>
        `### ${exp.title} at ${exp.company} (${exp.period})
${exp.highlights.map(h => `- ${h}`).join('\n')}`
    ).join('\n\n')}`);

    // Projects
    sections.push(`**Key Projects:**
${profile.projects.map(p =>
        `- **${p.name}:** ${p.description} [Tech: ${p.tech.join(', ')}]`
    ).join('\n')}`);

    // Certifications
    sections.push(`**Certifications:**
${profile.certifications.map(c => `- ${c}`).join('\n')}`);

    // Publications
    sections.push(`**Publications:**
${profile.publications.map(p => `- ${p}`).join('\n')}`);

    // Leadership
    sections.push(`**Leadership & Extracurricular:**
${profile.leadershipAndExtracurricular.map(l => `- ${l}`).join('\n')}`);

    return sections.join('\n\n---\n\n');
}
