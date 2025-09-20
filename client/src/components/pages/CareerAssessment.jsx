import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { getThemeClasses, getComponentStyles } from "../../styles/themes";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Paper,
  LinearProgress,
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Slider,
  Fade,
  Zoom,
  IconButton,
} from "@mui/material";
import {
  ArrowBack,
  ArrowForward,
  Psychology,
  Assessment,
  TrendingUp,
  WorkOutline,
  EmojiObjects,
  Timeline,
  CheckCircle,
  Refresh,
} from "@mui/icons-material";
import {
  personalityQuestions,
  skillsQuestions,
  personalityTypes,
  industryPreferences,
  workEnvironmentPreferences,
} from "../../utils/careerAssessmentData";

const CareerAssessment = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);
  const componentStyles = getComponentStyles(isDarkMode);

  // Assessment state
  const [currentStep, setCurrentStep] = useState(0);
  const [personalityAnswers, setPersonalityAnswers] = useState({});
  const [skillsAnswers, setSkillsAnswers] = useState({});
  const [industryAnswers, setIndustryAnswers] = useState([]);
  const [environmentAnswers, setEnvironmentAnswers] = useState([]);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Assessment steps
  const steps = [
    {
      label: "Personality Assessment",
      description: "Discover your personality traits and work preferences",
      icon: <Psychology className="w-6 h-6" />,
    },
    {
      label: "Skills Evaluation",
      description: "Rate your current skills and abilities",
      icon: <Assessment className="w-6 h-6" />,
    },
    {
      label: "Industry Preferences",
      description: "Choose industries that interest you",
      icon: <WorkOutline className="w-6 h-6" />,
    },
    {
      label: "Work Environment",
      description: "Select your preferred work settings",
      icon: <EmojiObjects className="w-6 h-6" />,
    },
    {
      label: "Results",
      description: "Get your personalized career recommendations",
      icon: <Timeline className="w-6 h-6" />,
    },
  ];

  // Calculate progress
  const getProgress = () => {
    switch (currentStep) {
      case 0:
        return (Object.keys(personalityAnswers).length / personalityQuestions.length) * 20;
      case 1:
        return 20 + (Object.keys(skillsAnswers).length / skillsQuestions.length) * 20;
      case 2:
        return 40 + (industryAnswers.length / 3) * 20; // Assume minimum 3 selections
      case 3:
        return 60 + (environmentAnswers.length / 2) * 20; // Assume minimum 2 selections
      case 4:
        return 100;
      default:
        return 0;
    }
  };

  // Handle personality answer
  const handlePersonalityAnswer = (questionId, value) => {
    setPersonalityAnswers(prev => ({
      ...prev,
      [questionId]: parseInt(value)
    }));
  };

  // Handle skills answer
  const handleSkillsAnswer = (skillId, value) => {
    setSkillsAnswers(prev => ({
      ...prev,
      [skillId]: value
    }));
  };

  // Handle industry selection
  const handleIndustryToggle = (industryId) => {
    setIndustryAnswers(prev => {
      if (prev.includes(industryId)) {
        return prev.filter(id => id !== industryId);
      } else {
        return [...prev, industryId];
      }
    });
  };

  // Handle environment selection
  const handleEnvironmentToggle = (envId) => {
    setEnvironmentAnswers(prev => {
      if (prev.includes(envId)) {
        return prev.filter(id => id !== envId);
      } else {
        return [...prev, envId];
      }
    });
  };

  // Calculate assessment results
  const calculateResults = () => {
    // Analyze personality traits
    const personalityScores = {};
    personalityQuestions.forEach(q => {
      const answer = personalityAnswers[q.id] || 0;
      personalityScores[q.category] = (personalityScores[q.category] || 0) + answer;
    });

    // Determine dominant personality type
    const dominantTrait = Object.keys(personalityScores).reduce((a, b) => 
      personalityScores[a] > personalityScores[b] ? a : b
    );

    const personalityType = personalityTypes.find(type => 
      type.traits.some(trait => trait.toLowerCase().includes(dominantTrait))
    ) || personalityTypes[0];

    // Analyze skills
    const topSkills = Object.entries(skillsAnswers)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([skillId, score]) => {
        const skill = skillsQuestions.find(s => s.id.toString() === skillId);
        return { skill: skill?.skill || skillId, score };
      });

    // Generate career recommendations
    const recommendedCareers = [
      ...personalityType.careers.slice(0, 2),
      "Software Engineer", "Product Manager", "Data Analyst", "UX Designer"
    ].slice(0, 6);

    return {
      personalityType,
      topSkills,
      recommendedCareers,
      industryMatches: industryAnswers,
      environmentPreferences: environmentAnswers,
      personalityScores,
      overallScore: Math.round(Object.values(personalityScores).reduce((a, b) => a + b, 0) / Object.keys(personalityScores).length)
    };
  };

  // Navigate to next step
  const nextStep = () => {
    if (currentStep === 3) {
      const assessmentResults = calculateResults();
      setResults(assessmentResults);
      setAssessmentComplete(true);
      setShowResults(true);
    }
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  // Navigate to previous step
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  // Check if current step is complete
  const isStepComplete = () => {
    switch (currentStep) {
      case 0:
        return Object.keys(personalityAnswers).length === personalityQuestions.length;
      case 1:
        return Object.keys(skillsAnswers).length === skillsQuestions.length;
      case 2:
        return industryAnswers.length >= 2;
      case 3:
        return environmentAnswers.length >= 1;
      default:
        return true;
    }
  };

  // Render personality assessment
  const renderPersonalityAssessment = () => (
    <Fade in={currentStep === 0}>
      <Box>
        <Typography variant="h4" className="font-bold mb-6 text-center">
          <Psychology className="w-8 h-8 inline mr-3" />
          Personality Assessment
        </Typography>
        <Typography variant="body1" className="text-center mb-8 opacity-80">
          Answer these questions to help us understand your personality and work preferences
        </Typography>

        <Grid container spacing={3}>
          {personalityQuestions.map((question, index) => (
            <Grid item xs={12} key={question.id}>
              <Card className={componentStyles.card}>
                <CardContent className="p-6">
                  <Typography variant="h6" className="mb-4 font-medium">
                    {index + 1}. {question.question}
                  </Typography>
                  <FormControl component="fieldset" className="w-full">
                    <RadioGroup
                      value={personalityAnswers[question.id] || ''}
                      onChange={(e) => handlePersonalityAnswer(question.id, e.target.value)}
                      className="flex flex-row justify-between"
                    >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <FormControlLabel
                          key={value}
                          value={value}
                          control={<Radio color="primary" />}
                          label={
                            value === 1 ? 'Strongly Disagree' :
                            value === 2 ? 'Disagree' :
                            value === 3 ? 'Neutral' :
                            value === 4 ? 'Agree' : 'Strongly Agree'
                          }
                          labelPlacement="bottom"
                          className="flex-1 text-center"
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fade>
  );

  // Render skills evaluation
  const renderSkillsEvaluation = () => (
    <Fade in={currentStep === 1}>
      <Box>
        <Typography variant="h4" className="font-bold mb-6 text-center">
          <Assessment className="w-8 h-8 inline mr-3" />
          Skills Evaluation
        </Typography>
        <Typography variant="body1" className="text-center mb-8 opacity-80">
          Rate your current skill level in each area (1 = Beginner, 10 = Expert)
        </Typography>

        <Grid container spacing={4}>
          {skillsQuestions.map((skill) => (
            <Grid item xs={12} md={6} key={skill.id}>
              <Card className={componentStyles.card}>
                <CardContent className="p-6">
                  <Box className="flex items-center justify-between mb-4">
                    <Typography variant="h6" className="font-medium">
                      {skill.skill}
                    </Typography>
                    <Chip 
                      label={skillsAnswers[skill.id] || 0}
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                  <Slider
                    value={skillsAnswers[skill.id] || 1}
                    onChange={(e, value) => handleSkillsAnswer(skill.id, value)}
                    min={1}
                    max={10}
                    step={1}
                    marks
                    valueLabelDisplay="auto"
                    color="primary"
                  />
                  <Box className="flex justify-between text-sm opacity-60 mt-2">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fade>
  );

  // Render industry preferences
  const renderIndustryPreferences = () => (
    <Fade in={currentStep === 2}>
      <Box>
        <Typography variant="h4" className="font-bold mb-6 text-center">
          <WorkOutline className="w-8 h-8 inline mr-3" />
          Industry Preferences
        </Typography>
        <Typography variant="body1" className="text-center mb-8 opacity-80">
          Select the industries that interest you most (choose at least 2)
        </Typography>

        <Grid container spacing={3}>
          {industryPreferences.map((industry) => (
            <Grid item xs={12} sm={6} md={4} key={industry.id}>
              <Card 
                className={`${componentStyles.card} cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  industryAnswers.includes(industry.id) 
                    ? 'ring-2 ring-blue-500 shadow-lg' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => handleIndustryToggle(industry.id)}
              >
                <CardContent className="p-6 text-center">
                  <Typography variant="h2" className="mb-3">
                    {industry.icon}
                  </Typography>
                  <Typography variant="h6" className="font-bold mb-2">
                    {industry.name}
                  </Typography>
                  <Typography variant="body2" className="opacity-70">
                    {industry.description}
                  </Typography>
                  {industryAnswers.includes(industry.id) && (
                    <CheckCircle className="w-6 h-6 text-green-500 mt-3 mx-auto" />
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fade>
  );

  // Render work environment preferences
  const renderWorkEnvironment = () => (
    <Fade in={currentStep === 3}>
      <Box>
        <Typography variant="h4" className="font-bold mb-6 text-center">
          <EmojiObjects className="w-8 h-8 inline mr-3" />
          Work Environment
        </Typography>
        <Typography variant="body1" className="text-center mb-8 opacity-80">
          Choose your preferred work environments (select at least 1)
        </Typography>

        <Grid container spacing={3}>
          {workEnvironmentPreferences.map((env) => (
            <Grid item xs={12} sm={6} md={4} key={env.id}>
              <Card 
                className={`${componentStyles.card} cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  environmentAnswers.includes(env.id) 
                    ? 'ring-2 ring-purple-500 shadow-lg' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => handleEnvironmentToggle(env.id)}
              >
                <CardContent className="p-6 text-center">
                  <Typography variant="h2" className="mb-3">
                    {env.icon}
                  </Typography>
                  <Typography variant="h6" className="font-bold mb-2">
                    {env.name}
                  </Typography>
                  <Typography variant="body2" className="opacity-70">
                    {env.description}
                  </Typography>
                  {environmentAnswers.includes(env.id) && (
                    <CheckCircle className="w-6 h-6 text-purple-500 mt-3 mx-auto" />
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fade>
  );

  // Render results
  const renderResults = () => (
    <Zoom in={showResults}>
      <Box>
        <Typography variant="h3" className="font-bold mb-6 text-center">
          <Timeline className="w-10 h-10 inline mr-3" />
          Your Career Assessment Results
        </Typography>

        {results && (
          <Grid container spacing={4}>
            {/* Personality Type */}
            <Grid item xs={12} md={6}>
              <Card className={componentStyles.card}>
                <CardContent className="p-6">
                  <Typography variant="h5" className="font-bold mb-4 flex items-center">
                    <Psychology className="w-6 h-6 mr-2" style={{ color: results.personalityType.color }} />
                    {results.personalityType.name}
                  </Typography>
                  <Typography variant="body1" className="mb-4 opacity-80">
                    {results.personalityType.description}
                  </Typography>
                  <Box className="flex flex-wrap gap-2">
                    {results.personalityType.traits.map((trait, index) => (
                      <Chip 
                        key={index}
                        label={trait}
                        style={{ backgroundColor: results.personalityType.color, color: 'white' }}
                        size="small"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Top Skills */}
            <Grid item xs={12} md={6}>
              <Card className={componentStyles.card}>
                <CardContent className="p-6">
                  <Typography variant="h5" className="font-bold mb-4 flex items-center">
                    <TrendingUp className="w-6 h-6 mr-2 text-green-500" />
                    Top Skills
                  </Typography>
                  {results.topSkills.map((skill, index) => (
                    <Box key={index} className="mb-3">
                      <Box className="flex justify-between items-center mb-1">
                        <Typography variant="body1" className="font-medium">
                          {skill.skill}
                        </Typography>
                        <Typography variant="body2" className="opacity-70">
                          {skill.score}/10
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(skill.score / 10) * 100} 
                        className="rounded-full h-2"
                      />
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            {/* Recommended Careers */}
            <Grid item xs={12}>
              <Card className={componentStyles.card}>
                <CardContent className="p-6">
                  <Typography variant="h5" className="font-bold mb-4 flex items-center">
                    <WorkOutline className="w-6 h-6 mr-2 text-blue-500" />
                    Recommended Careers
                  </Typography>
                  <Grid container spacing={3}>
                    {results.recommendedCareers.map((career, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper 
                          className="p-4 text-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                          style={{ backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc' }}
                        >
                          <Typography variant="h6" className="font-medium">
                            {career}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Action Buttons */}
        <Box className="flex justify-center gap-4 mt-8">
          <Button
            variant="outlined"
            onClick={() => {
              setCurrentStep(0);
              setPersonalityAnswers({});
              setSkillsAnswers({});
              setIndustryAnswers([]);
              setEnvironmentAnswers([]);
              setShowResults(false);
              setAssessmentComplete(false);
            }}
            startIcon={<Refresh />}
            className={componentStyles.button.secondary}
          >
            Retake Assessment
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/career-explorer')}
            startIcon={<ArrowForward />}
            className={componentStyles.button.primary}
          >
            Explore Careers
          </Button>
        </Box>
      </Box>
    </Zoom>
  );

  return (
    <Box className={`min-h-screen ${themeClasses.bg.primary}`}>
      <Container maxWidth="xl" className="py-8">
        {/* Header */}
        <Box className="flex items-center justify-between mb-8">
          <Box className="flex items-center">
            <IconButton
              onClick={() => navigate(-1)}
              className="mr-4"
              style={{ color: isDarkMode ? '#e2e8f0' : '#2d3748' }}
            >
              <ArrowBack />
            </IconButton>
            <Typography
              variant="h3"
              className={`font-bold ${themeClasses.text.primary}`}
            >
              Career Assessment
            </Typography>
          </Box>
          
          {!assessmentComplete && (
            <Chip 
              label={`${Math.round(getProgress())}% Complete`}
              color="primary"
              variant="outlined"
              icon={<Assessment />}
            />
          )}
        </Box>

        {/* Progress Bar */}
        {!assessmentComplete && (
          <Box className="mb-8">
            <LinearProgress 
              variant="determinate" 
              value={getProgress()} 
              className="rounded-full h-3 mb-4"
            />
            <Typography variant="body2" className="text-center opacity-70">
              Step {currentStep + 1} of {steps.length}
            </Typography>
          </Box>
        )}

        {/* Content */}
        <Box className="min-h-[60vh]">
          {currentStep === 0 && renderPersonalityAssessment()}
          {currentStep === 1 && renderSkillsEvaluation()}
          {currentStep === 2 && renderIndustryPreferences()}
          {currentStep === 3 && renderWorkEnvironment()}
          {currentStep === 4 && renderResults()}
        </Box>

        {/* Navigation */}
        {!assessmentComplete && (
          <Box className="flex justify-between items-center mt-8">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              startIcon={<ArrowBack />}
              className={componentStyles.button.secondary}
            >
              Previous
            </Button>

            <Typography variant="body1" className="opacity-70">
              {steps[currentStep].description}
            </Typography>

            <Button
              onClick={nextStep}
              disabled={!isStepComplete()}
              endIcon={<ArrowForward />}
              variant="contained"
              className={componentStyles.button.primary}
            >
              {currentStep === 3 ? 'Get Results' : 'Next'}
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CareerAssessment;