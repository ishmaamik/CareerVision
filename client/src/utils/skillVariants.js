export const fieldSkillVariants = {
    // Technology & Software
    'software_engineering': [
        'programming', 'coding', 'software development', 'web dev', 
        'mobile app development', 'full stack', 'backend', 'frontend'
    ],
    'data_science': [
        'machine learning', 'ai', 'data analysis', 'big data', 
        'statistical analysis', 'predictive modeling', 'data visualization'
    ],
    'cybersecurity': [
        'network security', 'ethical hacking', 'penetration testing', 
        'information security', 'cyber defense', 'security analysis'
    ],
    'cloud_computing': [
        'aws', 'azure', 'google cloud', 'cloud architecture', 
        'devops', 'infrastructure', 'cloud migration'
    ],

    // Engineering Disciplines
    'mechanical_engineering': [
        'machine design', 'robotics', 'manufacturing', 'cad', 
        'finite element analysis', 'thermal engineering', 'automotive design'
    ],
    'civil_engineering': [
        'structural design', 'construction management', 'urban planning', 
        'infrastructure', 'transportation engineering', 'geotechnical engineering'
    ],
    'electrical_engineering': [
        'power systems', 'control systems', 'electronics', 'embedded systems', 
        'telecommunications', 'signal processing', 'renewable energy'
    ],
    'chemical_engineering': [
        'process design', 'materials engineering', 'biotechnology', 
        'pharmaceutical engineering', 'environmental engineering', 'energy systems'
    ],
    'aerospace_engineering': [
        'aircraft design', 'spacecraft engineering', 'aerodynamics', 
        'propulsion systems', 'satellite technology'
    ],
    'industrial_engineering': [
        'operations research', 'supply chain', 'quality management', 
        'process optimization', 'logistics', 'systems engineering'
    ],

    // Business & Management
    'business_administration': [
        'strategic management', 'organizational leadership', 'corporate strategy', 
        'business development', 'international business'
    ],
    'finance': [
        'financial analysis', 'investment banking', 'corporate finance', 
        'risk management', 'financial planning', 'accounting'
    ],
    'marketing': [
        'digital marketing', 'brand management', 'market research', 
        'social media marketing', 'content strategy', 'advertising'
    ],
    'human_resources': [
        'talent acquisition', 'employee relations', 'training', 
        'organizational development', 'compensation', 'recruitment'
    ],
    'project_management': [
        'agile', 'scrum', 'program management', 
        'portfolio management', 'risk management'
    ],

    // Creative & Design
    'graphic_design': [
        'ui/ux', 'visual design', 'branding', 'illustration', 
        'digital art', 'adobe creative suite'
    ],
    'architecture': [
        'building design', 'urban design', 'sustainable architecture', 
        'interior design', 'landscape architecture'
    ],
    'fashion_design': [
        'textile design', 'fashion illustration', 'costume design', 
        'fashion marketing', 'sustainable fashion'
    ],
    'product_design': [
        'industrial design', 'user experience', 'prototyping', 
        'design thinking', 'innovation'
    ],

    // Healthcare & Life Sciences
    'medicine': [
        'clinical practice', 'medical research', 'specialization', 
        'healthcare administration', 'public health'
    ],
    'nursing': [
        'clinical nursing', 'specialized care', 'healthcare education', 
        'nursing administration', 'community health'
    ],
    'biotechnology': [
        'genetic engineering', 'pharmaceutical research', 'medical devices', 
        'bioinformatics', 'clinical trials'
    ],
    'psychology': [
        'clinical psychology', 'counseling', 'research', 'organizational psychology', 
        'mental health'
    ],

    // Education & Research
    'teaching': [
        'k-12 education', 'higher education', 'curriculum development', 
        'educational technology', 'special education'
    ],
    'academic_research': [
        'scientific research', 'academic publishing', 'grant writing', 
        'interdisciplinary studies', 'laboratory management'
    ],

    // Arts & Entertainment
    'performing_arts': [
        'theater', 'music', 'dance', 'acting', 'performance art', 
        'stage production'
    ],
    'film_and_media': [
        'film production', 'cinematography', 'screenwriting', 
        'digital media', 'animation', 'visual effects'
    ],
    'music_production': [
        'sound engineering', 'music composition', 'audio production', 
        'music technology', 'recording arts'
    ],

    // Trades & Technical Skills
    'construction': [
        'carpentry', 'electrical work', 'plumbing', 'welding', 
        'heavy equipment operation'
    ],
    'automotive': [
        'automotive repair', 'mechanics', 'diesel technology', 
        'automotive engineering', 'vehicle diagnostics'
    ],

    // Professional & Soft Skills
    'leadership': [
        'team management', 'strategic planning', 'executive leadership', 
        'organizational development', 'change management'
    ],
    'communication': [
        'public speaking', 'writing', 'interpersonal skills', 
        'cross-cultural communication', 'negotiation'
    ],
    'entrepreneurship': [
        'startup development', 'business planning', 'innovation', 
        'venture capital', 'small business management'
    ]
};

// Function to get skill categories
export const getSkillCategories = () => {
    return Object.keys(fieldSkillVariants).map(
        category => category
            .replace(/_/g, ' ')  // Replace underscores with spaces
            .replace(/\b\w/g, l => l.toUpperCase())  // Capitalize first letter of each word
    );
};

// Function to find matching skill categories
export const findMatchingSkillCategories = (input) => {
    // Handle undefined, null, or object inputs
    if (!input) return [];

    // Extract string value if input is an object
    const inputValue = typeof input === 'object' 
        ? (input.tools || input.tool || input.skills || '') 
        : input;

    // Ensure input is a string and convert to lowercase
    const lowerCaseInput = String(inputValue).toLowerCase().trim();
    const matchingCategories = [];

    // Iterate through skill categories
    getSkillCategories().forEach(category => {
        // Create multiple variations of the category for matching
        const variations = [
            category.toLowerCase(),                  // Full lowercase
            category.toLowerCase().replace(/\s/g, ''), // Remove spaces
            category.toLowerCase().replace(/\s/g, '-'), // Hyphenated
            category.split(' ').map(word => word.charAt(0)).join('').toLowerCase() // Acronym
        ];

        // Check if any variation matches the input
        const isMatch = variations.some(variation => 
            variation.includes(lowerCaseInput) || 
            lowerCaseInput.includes(variation)
        );

        if (isMatch) {
            // Convert category back to snake_case for lookup
            const lookupKey = category.toLowerCase().replace(/\s/g, '_');
            
            const matchedSkills = fieldSkillVariants[lookupKey] || [];

            matchingCategories.push({
                category: category,
                matchedSkills: matchedSkills
            });
        }
    });

    // Sort by number of matched skills, descending
    return matchingCategories.sort((a, b) => b.matchedSkills.length - a.matchedSkills.length);
};

// Enhanced career path determination function
export const determineCareerPath = (skills = '') => {
    // Handle undefined or null input
    if (!skills) return 'General Career Development';

    // Ensure input is a string and convert to lowercase
    const lowercaseSkills = String(skills).toLowerCase();
    
    // First, check for direct skill matches
    for (const [path, skillList] of Object.entries(fieldSkillVariants)) {
        for (const skill of skillList) {
            if (lowercaseSkills.includes(skill.toLowerCase())) {
                // Convert snake_case to human-readable format
                return path
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase());
            }
        }
    }

    // Broad keyword matching
    const broadKeywords = {
        'Technology': ['tech', 'programming', 'coding', 'software', 'digital', 'computer'],
        'Engineering': ['engineer', 'design', 'system', 'technical', 'mechanics', 'construction'],
        'Business': ['management', 'strategy', 'finance', 'marketing', 'business', 'corporate'],
        'Creative': ['design', 'art', 'creative', 'media', 'visual', 'graphics'],
        'Healthcare': ['health', 'medical', 'care', 'wellness', 'therapy', 'patient'],
        'Education': ['teach', 'learn', 'research', 'academic', 'education', 'training'],
        'Arts': ['art', 'music', 'performance', 'creative', 'entertainment', 'media production']
    };

    // Check broad keywords
    for (const [category, keywords] of Object.entries(broadKeywords)) {
        for (const keyword of keywords) {
            if (lowercaseSkills.includes(keyword.toLowerCase())) {
                return category;
            }
        }
    }

    // Ultimate fallback
    return 'General Career Development';
};

// Comprehensive skill lookup function
export const findSpecificSkills = (input) => {
    // Handle undefined, null, or object inputs
    if (!input) return [];

    // Extract string value if input is an object
    const inputValue = typeof input === 'object' 
        ? (input.tools || input.tool || input.skills || '') 
        : input;

    // Ensure input is a string and convert to lowercase
    const lowerCaseInput = String(inputValue).toLowerCase().trim();

    // Collect all skills across all categories
    const allSkills = Object.values(fieldSkillVariants).flat();

    // Find matching skills
    const matchingSkills = allSkills.filter(skill => 
        skill.toLowerCase().includes(lowerCaseInput) || 
        lowerCaseInput.includes(skill.toLowerCase())
    );

    // If no direct matches, try partial matches
    if (matchingSkills.length === 0) {
        return allSkills.filter(skill => 
            skill.toLowerCase().split(/\s+/).some(word => 
                word.includes(lowerCaseInput)
            )
        ).slice(0, 10); // Limit to 10 skills
    }

    // Return unique matching skills, limited to 10
    return [...new Set(matchingSkills)].slice(0, 10);
};
