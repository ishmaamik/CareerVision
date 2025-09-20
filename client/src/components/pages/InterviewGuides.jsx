import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Avatar,
  Rating,
  IconButton,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  PlayArrow as PlayIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Star as StarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Psychology as PsychologyIcon,
  Code as CodeIcon,
  BusinessCenter as BusinessCenterIcon,
  Group as GroupIcon,
  AccountCircle as AccountCircleIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Lightbulb as LightbulbIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';
import { getThemeClasses, getComponentStyles } from '../../styles/themes';
import {
  interviewGuideCategories,
  featuredGuides,
  questionBanks,
  companySpecificGuides,
  interviewTipsCategories,
  studyPlans,
  popularResources
} from '../../utils/interviewGuidesData';

// Custom hook for bookmarks
const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState(new Set());
  
  const toggleBookmark = (id) => {
    setBookmarks(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(id)) {
        newBookmarks.delete(id);
      } else {
        newBookmarks.add(id);
      }
      return newBookmarks;
    });
  };
  
  return { bookmarks, toggleBookmark };
};

const InterviewGuides = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const componentStyles = getComponentStyles(theme);
  
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const { bookmarks, toggleBookmark } = useBookmarks();

  const getCategoryIcon = (iconName) => {
    const iconProps = { sx: { fontSize: 40, color: 'inherit' } };
    switch (iconName) {
      case 'psychology': return <PsychologyIcon {...iconProps} />;
      case 'code': return <CodeIcon {...iconProps} />;
      case 'business_center': return <BusinessCenterIcon {...iconProps} />;
      case 'work': return <WorkIcon {...iconProps} />;
      case 'group': return <GroupIcon {...iconProps} />;
      case 'account_circle': return <AccountCircleIcon {...iconProps} />;
      default: return <SchoolIcon {...iconProps} />;
    }
  };

  const CategoryCard = ({ category }) => (
    <Card 
      className={`${themeClasses.surface} hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105`}
      sx={{ 
        borderLeft: 4, 
        borderLeftColor: category.color,
        height: '100%'
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Box 
            sx={{ 
              backgroundColor: category.color + '20',
              borderRadius: 2,
              p: 1,
              mr: 2,
              color: category.color
            }}
          >
            {getCategoryIcon(category.icon)}
          </Box>
          <Box>
            <Typography variant="h6" className={themeClasses.text}>
              {category.name}
            </Typography>
            <Typography variant="body2" className={themeClasses.textSecondary}>
              {category.guideCount} guides • {category.questionCount} questions
            </Typography>
          </Box>
        </Box>
        
        <Typography variant="body2" className={themeClasses.textSecondary} mb={2}>
          {category.description}
        </Typography>
        
        <Box display="flex" flexWrap="wrap" gap={0.5}>
          {category.topics.slice(0, 4).map((topic, index) => (
            <Chip 
              key={index}
              label={topic}
              size="small"
              sx={{ 
                backgroundColor: category.color + '10',
                color: category.color,
                fontSize: '0.75rem'
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );

  const GuideCard = ({ guide }) => (
    <Card className={`${themeClasses.surface} hover:shadow-lg transition-all duration-300`}>
      <CardContent>
        <Box display="flex" justifyContent="between" alignItems="flex-start" mb={2}>
          <Box flex={1}>
            <Typography variant="h6" className={themeClasses.text} mb={1}>
              {guide.title}
            </Typography>
            <Typography variant="body2" className={themeClasses.textSecondary} mb={1}>
              by {guide.author}
            </Typography>
            <Typography variant="body2" className={themeClasses.textSecondary} mb={2}>
              {guide.description}
            </Typography>
          </Box>
          <IconButton
            onClick={() => toggleBookmark(guide.id)}
            size="small"
          >
            {bookmarks.has(guide.id) ? (
              <BookmarkIcon sx={{ color: '#F59E0B' }} />
            ) : (
              <BookmarkBorderIcon className={themeClasses.textSecondary} />
            )}
          </IconButton>
        </Box>

        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Box display="flex" alignItems="center">
            <Rating value={guide.rating} precision={0.1} size="small" readOnly />
            <Typography variant="body2" className={themeClasses.textSecondary} ml={0.5}>
              ({guide.reviews})
            </Typography>
          </Box>
          <Chip 
            label={guide.difficulty}
            size="small"
            color={guide.difficulty === 'Advanced' ? 'error' : guide.difficulty === 'Intermediate' ? 'warning' : 'success'}
          />
          <Box display="flex" alignItems="center">
            <TimeIcon sx={{ fontSize: 16, mr: 0.5 }} className={themeClasses.textSecondary} />
            <Typography variant="body2" className={themeClasses.textSecondary}>
              {guide.readTime}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
          {guide.topics.map((topic, index) => (
            <Chip 
              key={index}
              label={topic}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>
      </CardContent>
      
      <CardActions>
        <Button 
          variant="contained" 
          startIcon={<PlayIcon />}
          fullWidth
          sx={componentStyles.button}
        >
          Start Guide
        </Button>
      </CardActions>
    </Card>
  );

  const CompanyGuideCard = ({ company }) => (
    <Card className={`${themeClasses.surface} hover:shadow-lg transition-all duration-300`}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar
            src={company.logo}
            alt={company.company}
            sx={{ width: 48, height: 48, mr: 2 }}
          >
            {company.company[0]}
          </Avatar>
          <Box>
            <Typography variant="h6" className={themeClasses.text}>
              {company.company}
            </Typography>
            <Typography variant="body2" className={themeClasses.textSecondary}>
              {company.culture}
            </Typography>
          </Box>
        </Box>

        <Typography variant="subtitle2" className={themeClasses.text} mb={1}>
          Core Values:
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
          {company.values.slice(0, 3).map((value, index) => (
            <Chip 
              key={index}
              label={value}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>

        <Typography variant="subtitle2" className={themeClasses.text} mb={1}>
          Interview Process:
        </Typography>
        <List dense>
          {company.interviewProcess.slice(0, 3).map((step, index) => (
            <ListItem key={index} sx={{ py: 0.25 }}>
              <ListItemIcon sx={{ minWidth: 24 }}>
                <Typography variant="body2" className={themeClasses.textSecondary}>
                  {index + 1}.
                </Typography>
              </ListItemIcon>
              <ListItemText 
                primary={step}
                primaryTypographyProps={{ 
                  variant: 'body2',
                  className: themeClasses.textSecondary
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      
      <CardActions>
        <Button 
          variant="outlined" 
          fullWidth
          sx={componentStyles.button}
        >
          View Full Guide
        </Button>
      </CardActions>
    </Card>
  );

  const QuestionBank = ({ questions }) => (
    <Box>
      {questions.map((q) => (
        <Accordion key={q.id} className={themeClasses.surface}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display="flex" alignItems="center" width="100%">
              <Box flex={1}>
                <Typography variant="subtitle1" className={themeClasses.text}>
                  {q.question}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                  <Chip 
                    label={q.category}
                    size="small"
                    variant="outlined"
                  />
                  <Chip 
                    label={q.difficulty}
                    size="small"
                    color={q.difficulty === 'Advanced' ? 'error' : q.difficulty === 'Intermediate' ? 'warning' : 'success'}
                  />
                </Box>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Typography variant="subtitle2" className={themeClasses.text} mb={1}>
                💡 Tips:
              </Typography>
              <List dense>
                {q.tips.map((tip, tipIndex) => (
                  <ListItem key={tipIndex}>
                    <ListItemIcon sx={{ minWidth: 20 }}>
                      <CheckCircleIcon sx={{ fontSize: 16, color: '#10B981' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={tip}
                      primaryTypographyProps={{ 
                        variant: 'body2',
                        className: themeClasses.textSecondary
                      }}
                    />
                  </ListItem>
                ))}
              </List>

              {q.sampleAnswer && (
                <Box mt={2}>
                  <Typography variant="subtitle2" className={themeClasses.text} mb={1}>
                    📝 Sample Answer:
                  </Typography>
                  <Paper className={themeClasses.background} sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" className={themeClasses.textSecondary}>
                      {q.sampleAnswer}
                    </Typography>
                  </Paper>
                </Box>
              )}

              {q.followUpQuestions && (
                <Box mt={2}>
                  <Typography variant="subtitle2" className={themeClasses.text} mb={1}>
                    🔄 Follow-up Questions:
                  </Typography>
                  <List dense>
                    {q.followUpQuestions.map((followUp, followUpIndex) => (
                      <ListItem key={followUpIndex}>
                        <ListItemIcon sx={{ minWidth: 20 }}>
                          <QuestionAnswerIcon sx={{ fontSize: 16, color: '#3B82F6' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={followUp}
                          primaryTypographyProps={{ 
                            variant: 'body2',
                            className: themeClasses.textSecondary
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );

  const StudyPlanCard = ({ plan }) => (
    <Card className={`${themeClasses.surface} hover:shadow-lg transition-all duration-300`}>
      <CardContent>
        <Box display="flex" justifyContent="between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography variant="h6" className={themeClasses.text}>
              {plan.duration}
            </Typography>
            <Typography variant="body2" className={themeClasses.textSecondary}>
              {plan.description}
            </Typography>
          </Box>
          <Chip 
            label={plan.dailyHours}
            icon={<ScheduleIcon />}
            sx={{ backgroundColor: '#3B82F6', color: 'white' }}
          />
        </Box>

        <Typography variant="subtitle2" className={themeClasses.text} mb={1}>
          Study Schedule:
        </Typography>
        
        {plan.schedule.map((item, index) => (
          <Box key={index} mb={1.5}>
            <Box display="flex" alignItems="center" mb={0.5}>
              <Avatar 
                sx={{ 
                  width: 24, 
                  height: 24, 
                  fontSize: '0.75rem',
                  backgroundColor: '#3B82F6',
                  mr: 1
                }}
              >
                {item.day || item.week}
              </Avatar>
              <Typography variant="body2" fontWeight="bold" className={themeClasses.text}>
                {item.focus}
              </Typography>
            </Box>
            <Box display="flex" flexWrap="wrap" gap={0.5} ml={4}>
              {item.activities.map((activity, actIndex) => (
                <Chip 
                  key={actIndex}
                  label={activity}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        ))}
      </CardContent>
      
      <CardActions>
        <Button 
          variant="contained" 
          startIcon={<AssignmentIcon />}
          fullWidth
          sx={componentStyles.button}
        >
          Start Plan
        </Button>
      </CardActions>
    </Card>
  );

  const tabConfig = [
    { label: 'Categories', icon: <SchoolIcon /> },
    { label: 'Featured Guides', icon: <StarIcon /> },
    { label: 'Question Banks', icon: <QuestionAnswerIcon /> },
    { label: 'Company Guides', icon: <WorkIcon /> },
    { label: 'Study Plans', icon: <AssignmentIcon /> },
    { label: 'Tips & Resources', icon: <LightbulbIcon /> }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" className={themeClasses.text} mb={2}>
          Interview Guides & Preparation
        </Typography>
        <Typography variant="body1" className={themeClasses.textSecondary} mb={3}>
          Master every type of interview with our comprehensive guides, question banks, and preparation materials
        </Typography>
        
        {/* Search and Filters */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search guides, questions, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className={themeClasses.textSecondary} />
                  </InputAdornment>
                ),
              }}
              sx={componentStyles.textField}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" gap={1}>
              <Button
                variant={selectedCategory === 'all' ? 'contained' : 'outlined'}
                startIcon={<FilterIcon />}
                onClick={() => setSelectedCategory('all')}
                sx={componentStyles.button}
              >
                All Categories
              </Button>
              <Button
                variant={selectedDifficulty === 'all' ? 'contained' : 'outlined'}
                onClick={() => setSelectedDifficulty('all')}
                sx={componentStyles.button}
              >
                All Levels
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Navigation Tabs */}
      <Box mb={4}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minHeight: '64px',
              color: themeClasses.textSecondary,
            },
            '& .Mui-selected': {
              color: '#3B82F6 !important',
            },
          }}
        >
          {tabConfig.map((tab, index) => (
            <Tab 
              key={index}
              icon={tab.icon}
              label={tab.label}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {interviewGuideCategories.map((category) => (
            <Grid item xs={12} md={6} lg={4} key={category.id}>
              <CategoryCard category={category} />
            </Grid>
          ))}
        </Grid>
      )}

      {activeTab === 1 && (
        <Box>
          <Typography variant="h5" className={themeClasses.text} mb={3}>
            Featured Interview Guides
          </Typography>
          <Grid container spacing={3}>
            {featuredGuides.map((guide) => (
              <Grid item xs={12} md={6} lg={4} key={guide.id}>
                <GuideCard guide={guide} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {activeTab === 2 && (
        <Box>
          <Typography variant="h5" className={themeClasses.text} mb={3}>
            Interview Question Banks
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card className={themeClasses.surface}>
                <CardContent>
                  <Typography variant="h6" className={themeClasses.text} mb={2}>
                    📚 Behavioral Questions
                  </Typography>
                  <Typography variant="body2" className={themeClasses.textSecondary} mb={2}>
                    {questionBanks.behavioral.length} questions covering leadership, teamwork, and problem-solving
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={75} 
                    sx={{ mb: 1, backgroundColor: '#E5E7EB', '& .MuiLinearProgress-bar': { backgroundColor: '#10B981' } }}
                  />
                  <Typography variant="body2" className={themeClasses.textSecondary}>
                    75% completed
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <QuestionBank category="behavioral" questions={questionBanks.behavioral} />
            </Grid>
          </Grid>
        </Box>
      )}

      {activeTab === 3 && (
        <Box>
          <Typography variant="h5" className={themeClasses.text} mb={3}>
            Company-Specific Interview Guides
          </Typography>
          <Grid container spacing={3}>
            {companySpecificGuides.map((company) => (
              <Grid item xs={12} md={6} lg={4} key={company.id}>
                <CompanyGuideCard company={company} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {activeTab === 4 && (
        <Box>
          <Typography variant="h5" className={themeClasses.text} mb={3}>
            Personalized Study Plans
          </Typography>
          <Grid container spacing={3}>
            {studyPlans.map((plan) => (
              <Grid item xs={12} md={6} key={plan.id}>
                <StudyPlanCard plan={plan} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {activeTab === 5 && (
        <Box>
          <Typography variant="h5" className={themeClasses.text} mb={3}>
            Interview Tips & Resources
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {interviewTipsCategories.map((category) => (
                <Card key={category.id} className={`${themeClasses.surface} mb-3`}>
                  <CardContent>
                    <Typography variant="h6" className={themeClasses.text} mb={2}>
                      {category.title}
                    </Typography>
                    <List>
                      {category.tips.map((tip, index) => (
                        <ListItem key={index} alignItems="flex-start">
                          <ListItemIcon>
                            <LightbulbIcon sx={{ color: '#F59E0B', mt: 0.5 }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={tip.tip}
                            secondary={tip.description}
                            primaryTypographyProps={{ 
                              className: themeClasses.text,
                              fontWeight: 'medium'
                            }}
                            secondaryTypographyProps={{ 
                              className: themeClasses.textSecondary
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              ))}
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card className={themeClasses.surface}>
                <CardContent>
                  <Typography variant="h6" className={themeClasses.text} mb={2}>
                    📖 Recommended Resources
                  </Typography>
                  {popularResources.map((resource) => (
                    <Box key={resource.id} mb={2} p={2} className={themeClasses.background} sx={{ borderRadius: 2 }}>
                      <Typography variant="subtitle2" className={themeClasses.text}>
                        {resource.title}
                      </Typography>
                      <Typography variant="body2" className={themeClasses.textSecondary} mb={1}>
                        by {resource.author}
                      </Typography>
                      <Box display="flex" alignItems="center" mb={1}>
                        <Rating value={resource.rating} precision={0.1} size="small" readOnly />
                        <Typography variant="body2" className={themeClasses.textSecondary} ml={1}>
                          {resource.rating}
                        </Typography>
                      </Box>
                      <Typography variant="body2" className={themeClasses.textSecondary}>
                        {resource.description}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default InterviewGuides;