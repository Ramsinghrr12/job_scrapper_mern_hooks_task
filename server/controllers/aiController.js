import axios from 'axios';

// Demo/mock summaries - fallback when API key is not available
const mockSummaries = {
  generateMockSummary: (title, company) => {
    const skillsByRole = {
      'react': ['React', 'JavaScript', 'HTML/CSS', 'Git', 'REST APIs'],
      'mern': ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript'],
      'node': ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'JavaScript'],
      'python': ['Python', 'Django/Flask', 'SQL', 'Git', 'REST APIs'],
      'java': ['Java', 'Spring Boot', 'SQL', 'Git', 'OOP'],
      'frontend': ['React/Vue', 'JavaScript', 'HTML/CSS', 'Tailwind', 'Git'],
      'backend': ['Node.js/Python', 'Databases', 'APIs', 'Authentication', 'Git'],
      'full': ['React', 'Node.js', 'MongoDB', 'Authentication', 'Deployment']
    };

    const roleKey = title.toLowerCase().split(' ')[0];
    const skills = skillsByRole[roleKey] || skillsByRole['mern'];

    return {
      summary: `This ${title} position at ${company} involves developing and maintaining web applications. You'll work with modern technologies, collaborate with a team, and contribute to meaningful projects.`,
      skills,
      fitFor: 'Freshers with 0-2 years of experience or developers familiar with the tech stack'
    };
  }
};

export const generateJobSummary = async (req, res) => {
  try {
    const { title, company, description } = req.body;

    if (!title || !company) {
      return res.status(400).json({ success: false, message: 'Please provide title and company' });
    }

    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      // Return mock summary for demo
      const result = mockSummaries.generateMockSummary(title, company);
      return res.status(200).json({
        success: true,
        summary: result,
        message: '(Demo Mode - Using sample data)' 
      });
    }

    // Using OpenAI API if key is available
    const prompt = `
      Generate a concise job summary for this job posting:
      Title: ${title}
      Company: ${company}
      Description: ${description || 'No description provided'}
      
      Provide the response in JSON format with the following fields:
      - summary (2-3 sentences)
      - skills (array of 5 key skills)
      - fitFor (who should apply)
    `;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.choices[0].message.content;
    let jsonStart = content.indexOf('{');
    let jsonEnd = content.lastIndexOf('}') + 1;
    let jsonStr = content.substring(jsonStart, jsonEnd);
    const result = JSON.parse(jsonStr);

    res.status(200).json({
      success: true,
      summary: result,
    });
  } catch (error) {
    console.error('AI Error:', error.message);
    
    // Fallback to mock summary if API call fails
    const result = mockSummaries.generateMockSummary(req.body.title, req.body.company);
    res.status(200).json({
      success: true,
      summary: result,
      message: '(Demo Mode - Using sample data)'
    });
  }
};

export const generateJobMatch = async (req, res) => {
  try {
    const { jobTitle, skills, experience } = req.body;

    if (!jobTitle || !skills) {
      return res.status(400).json({ success: false, message: 'Please provide job title and skills' });
    }

    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      // Return mock match analysis for demo
      const skillCount = skills.length;
      const matchScore = Math.min(100, (skillCount / 5) * 100);
      
      const result = {
        matchScore: Math.round(matchScore),
        recommendation: matchScore >= 70 ? 'accept' : matchScore >= 50 ? 'consider' : 'develop-skills',
        reasoning: `Based on ${skillCount} relevant skills matched and ${experience || 'fresher'} years of experience, this is a ${matchScore >= 70 ? 'good' : 'moderate'} fit.`,
        missingSkills: ['System Design', 'DevOps', 'Microservices'].slice(0, Math.max(0, 3 - skillCount))
      };
      
      return res.status(200).json({
        success: true,
        match: result,
        message: '(Demo Mode - Using estimated analysis)'
      });
    }

    const prompt = `
      Analyze job match between candidate and job:
      Job: ${jobTitle}
      Candidate Skills: ${skills.join(', ')}
      Candidate Experience: ${experience || 'Fresher'} years
      
      Provide response in JSON format with:
      - matchScore (0-100)
      - recommendation (accept/consider/reject)
      - reasoning (why this match score)
      - missingSkills (array of skills to develop)
    `;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.choices[0].message.content;
    let jsonStart = content.indexOf('{');
    let jsonEnd = content.lastIndexOf('}') + 1;
    let jsonStr = content.substring(jsonStart, jsonEnd);
    const result = JSON.parse(jsonStr);

    res.status(200).json({
      success: true,
      match: result,
    });
  } catch (error) {
    console.error('Job Match Error:', error.message);
    
    // Fallback to mock analysis if API call fails
    const { jobTitle, skills, experience } = req.body;
    const skillCount = skills.length;
    const matchScore = Math.min(100, (skillCount / 5) * 100);
    
    const result = {
      matchScore: Math.round(matchScore),
      recommendation: matchScore >= 70 ? 'accept' : matchScore >= 50 ? 'consider' : 'develop-skills',
      reasoning: `Based on ${skillCount} relevant skills and ${experience || 'fresher'} years of experience, this is a ${matchScore >= 70 ? 'good' : 'moderate'} fit.`,
      missingSkills: ['System Design', 'DevOps', 'Microservices'].slice(0, Math.max(0, 3 - skillCount))
    };
    
    res.status(200).json({
      success: true,
      match: result,
      message: '(Demo Mode - Using estimated analysis)'
    });
  }
};
