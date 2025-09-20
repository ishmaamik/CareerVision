import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyCGJv0J1q-Vlv9uJs7YzgLYaTHrgDF8YFI";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * Generate a comprehensive career roadmap using Gemini AI
 * @param {string} careerTitle - The career title (e.g., "Software Engineering")
 * @param {string} detailedDescription - Detailed description of the career
 * @param {Array} recommendedSubjects - Array of recommended subjects
 * @returns {Object} Roadmap data structure
 */
export const generateCareerRoadmap = async (careerTitle, detailedDescription, recommendedSubjects = []) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    Create a comprehensive educational roadmap for "${careerTitle}" career path. 
    
    Career Description: ${detailedDescription}
    Recommended Subjects: ${recommendedSubjects.join(", ")}
    
    Please provide a detailed roadmap in the following JSON format:
    {
      "careerTitle": "${careerTitle}",
      "overview": "Brief overview of the career path",
      "totalDuration": "Estimated total learning duration",
      "phases": [
        {
          "id": 1,
          "title": "Foundation Phase",
          "duration": "Duration in months/years",
          "description": "What this phase covers",
          "subjects": [
            {
              "name": "Subject name",
              "importance": "High/Medium/Low",
              "duration": "Time to complete",
              "description": "What you'll learn",
              "skills": ["skill1", "skill2", "skill3"]
            }
          ],
          "milestones": ["milestone1", "milestone2"],
          "projects": ["project1", "project2"]
        }
      ],
      "careerOutcomes": {
        "entryLevel": {
          "positions": ["position1", "position2"],
          "salaryRange": "Expected salary range",
          "skills": ["required skills"]
        },
        "midLevel": {
          "positions": ["position1", "position2"],
          "salaryRange": "Expected salary range",
          "skills": ["required skills"]
        },
        "seniorLevel": {
          "positions": ["position1", "position2"],
          "salaryRange": "Expected salary range",
          "skills": ["required skills"]
        }
      },
      "industryInsights": {
        "currentTrends": ["trend1", "trend2"],
        "futureOutlook": "Future prospects",
        "inDemandSkills": ["skill1", "skill2"],
        "challenges": ["challenge1", "challenge2"]
      },
      "learningResources": {
        "books": ["book1", "book2"],
        "onlineCourses": ["course1", "course2"],
        "certifications": ["cert1", "cert2"],
        "websites": ["website1", "website2"]
      }
    }
    
    Focus on creating a roadmap that:
    1. Is specifically tailored for pre-university students
    2. Shows clear progression from beginner to advanced levels
    3. Includes practical projects and milestones
    4. Covers both academic and practical skills
    5. Provides realistic timeframes
    6. Includes modern industry requirements
    7. Shows different career progression paths
    
    Make sure the roadmap is comprehensive, practical, and actionable for students starting their educational journey.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format from Gemini API");
    }
    
    const roadmapData = JSON.parse(jsonMatch[0]);
    
    return {
      success: true,
      data: roadmapData
    };
    
  } catch (error) {
    console.error("Error generating career roadmap:", error);
    return {
      success: false,
      error: error.message || "Failed to generate career roadmap"
    };
  }
};

/**
 * Get cached roadmap or generate new one
 * @param {string} careerTitle - The career title
 * @param {string} detailedDescription - Career description
 * @param {Array} recommendedSubjects - Recommended subjects
 * @returns {Object} Roadmap data
 */
export const getCareerRoadmap = async (careerTitle, detailedDescription, recommendedSubjects) => {
  try {
    // Check if roadmap is cached in localStorage
    const cacheKey = `roadmap_${careerTitle.toLowerCase().replace(/\s+/g, '_')}`;
    const cachedRoadmap = localStorage.getItem(cacheKey);
    
    if (cachedRoadmap) {
      const parsed = JSON.parse(cachedRoadmap);
      // Check if cache is less than 24 hours old
      const cacheAge = Date.now() - parsed.timestamp;
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      if (cacheAge < maxAge) {
        return {
          success: true,
          data: parsed.roadmap,
          cached: true
        };
      }
    }
    
    // Generate new roadmap
    const result = await generateCareerRoadmap(careerTitle, detailedDescription, recommendedSubjects);
    
    if (result.success) {
      // Cache the result
      const cacheData = {
        roadmap: result.data,
        timestamp: Date.now()
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    }
    
    return result;
    
  } catch (error) {
    console.error("Error getting career roadmap:", error);
    return {
      success: false,
      error: error.message || "Failed to get career roadmap"
    };
  }
};

/**
 * Clear roadmap cache for a specific career
 * @param {string} careerTitle - The career title
 */
export const clearRoadmapCache = (careerTitle) => {
  const cacheKey = `roadmap_${careerTitle.toLowerCase().replace(/\s+/g, '_')}`;
  localStorage.removeItem(cacheKey);
};

/**
 * Clear all roadmap caches
 */
export const clearAllRoadmapCaches = () => {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('roadmap_')) {
      localStorage.removeItem(key);
    }
  });
};