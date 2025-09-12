import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  Box,
  Card,
  CardContent,
  Fade,
  IconButton,
  Tooltip,
  Paper,
  Avatar,
  Divider,
  Stack,
  Badge,
  LinearProgress,
  Fab,
  CircularProgress
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  ThumbUp,
  ThumbDown,
  PictureAsPdf,
  Business,
  QuestionAnswer,
  TrendingUp,
  School,
  Psychology,
  Work,
  EmojiEvents,
  Visibility,
  BookmarkBorder,
  Share,
  FilterList,
  Search,
  CloudUpload
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import {
  addInterviewQuestion,
  getCompanyInterviewQuestions,
  uploadInterviewQuestionPDF,
  voteInterviewQuestion
} from '../../api/interview/interview';
import { getAllCompany } from '../../api/company/company';
import InterviewQuestionComments from '../interview/InterviewQuestionComments';

// Styled Components
const GradientCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '24px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
  }
}));

const StatsCard = styled(Card)(({ theme, color }) => ({
  background: `linear-gradient(135deg, ${color}40 0%, ${color}60 100%)`,
  borderRadius: '20px',
  border: 'none',
  boxShadow: `0 8px 32px ${color}20`,
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 12px 40px ${color}30`,
  }
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
  borderRadius: '16px',
  textTransform: 'none',
  fontWeight: 600,
  padding: '12px 32px',
  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
  '&:hover': {
    background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
  }
}));

const InterviewQuestionBank = () => {
  const { user } = useSelector((state) => state.user);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    answer: '',
    difficulty: 'Medium',
    category: 'Technical'
  });
  const [openAddQuestionDialog, setOpenAddQuestionDialog] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterDifficulty, setFilterDifficulty] = useState('All');

  // Fetch companies on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const companyList = await getAllCompany();
        setCompanies(companyList);
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  // Fetch interview questions when company is selected
  useEffect(() => {
    const fetchQuestions = async () => {
      if (selectedCompany) {
        setQuestionsLoading(true);
        try {
          const companyQuestions = await getCompanyInterviewQuestions(selectedCompany.id);
          setQuestions(companyQuestions);
        } catch (error) {
          console.error('Error fetching interview questions:', error);
          setQuestions([]);
        } finally {
          setQuestionsLoading(false);
        }
      }
    };
    fetchQuestions();
  }, [selectedCompany]);

  // Handle adding a new interview question
  const handleAddQuestion = async () => {
    console.log('Add Question Called');
    console.log('User:', user);
    console.log('Selected Company:', selectedCompany);
    console.log('New Question:', newQuestion);

    if (!user) {
      alert('Please log in to add a question');
      return;
    }

    if (!selectedCompany) {
      alert('Please select a company first');
      return;
    }

    try {
      const addedQuestion = await addInterviewQuestion(selectedCompany.id, {
        ...newQuestion,
        submittedBy: user.name || 'Anonymous'
      });

      console.log('Added Question:', addedQuestion);

      // Upload PDF if exists
      if (pdfFile) {
        await uploadInterviewQuestionPDF(selectedCompany.id, addedQuestion.id, pdfFile);
      }

      // Refresh questions
      const updatedQuestions = await getCompanyInterviewQuestions(selectedCompany.id);
      setQuestions(updatedQuestions);

      // Reset form
      setNewQuestion({
        question: '',
        answer: '',
        difficulty: 'Medium',
        category: 'Technical'
      });
      setPdfFile(null);
      setOpenAddQuestionDialog(false);
    } catch (error) {
      console.error('Error adding question:', error);
      alert('Failed to add question. Please try again.');
    }
  };

  // Handle voting on a question
  const handleVote = async (questionId, voteType) => {
    try {
      await voteInterviewQuestion(questionId, voteType);
      // Refresh questions to show updated votes
      const updatedQuestions = await getCompanyInterviewQuestions(selectedCompany.id);
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error('Error voting on question:', error);
    }
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || q.category === filterCategory;
    const matchesDifficulty = filterDifficulty === 'All' || q.difficulty === filterDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#4caf50';
      case 'Medium': return '#ff9800';
      case 'Hard': return '#f44336';
      default: return '#757575';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Technical': return <School />;
      case 'Behavioral': return <Psychology />;
      case 'System Design': return <Business />;
      case 'HR': return <Work />;
      default: return <QuestionAnswer />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Technical': return '#2196f3';
      case 'Behavioral': return '#9c27b0';
      case 'System Design': return '#ff5722';
      case 'HR': return '#4caf50';
      default: return '#757575';
    }
  };

  const getCompanyInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const getCompanyColor = (name) => {
    // Generate a consistent color based on company name
    const colors = ['#4285f4', '#1877f2', '#ff9900', '#00a1f1', '#e50914', '#007aff', '#34a853', '#ea4335'];
    const index = name.length % colors.length;
    return colors[index];
  };

  const stats = {
    total: questions.length,
    technical: questions.filter(q => q.category === 'Technical').length,
    behavioral: questions.filter(q => q.category === 'Behavioral').length,
    avgDifficulty: 'Medium'
  };

  return (
    
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8, 
              pt:'50px',}}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color:'black',
              mb: 2,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Interview Question Bank
          </Typography>

          <Typography variant="h5" sx={{ color: 'black', maxWidth: 600, mx: 'auto' }}>
            Master your interviews with real questions from top tech companies
          </Typography>
        </Box>

        {/* Company Selection */}
        <GradientCard sx={{ mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Business sx={{ color: '#667eea', mr: 2, fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
                Select Company
              </Typography>
            </Box>

            <FormControl fullWidth>
              <InputLabel>Choose a company to explore</InputLabel>
              <Select
                value={selectedCompany?.id || ''}
                label="Choose a company to explore"
                onChange={(e) => {
                  const company = companies.find(c => c.id === e.target.value);
                  setSelectedCompany(company);
                }}
                sx={{ borderRadius: 2 }}
                disabled={loading}
              >
                {loading ? (
                  <MenuItem disabled>
                    <CircularProgress size={20} sx={{ mr: 2 }} />
                    Loading companies...
                  </MenuItem>
                ) : companies.map(company => (
                  <MenuItem key={company.id} value={company.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          mr: 2,
                          backgroundColor: getCompanyColor(company.name),
                          fontSize: 14,
                          fontWeight: 'bold'
                        }}
                      >
                        {getCompanyInitials(company.name)}
                      </Avatar>
                      {company.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </GradientCard>

        {/* Search and Filters */}
        {selectedCompany && (
          <Fade in={true}>
            <GradientCard sx={{ mb: 4 }}>
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3} alignItems="center">
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      placeholder="Search questions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: <Search sx={{ color: 'gray', mr: 1 }} />,
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={filterCategory}
                        label="Category"
                        onChange={(e) => setFilterCategory(e.target.value)}
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value="All">All Categories</MenuItem>
                        <MenuItem value="Technical">Technical</MenuItem>
                        <MenuItem value="Behavioral">Behavioral</MenuItem>
                        <MenuItem value="System Design">System Design</MenuItem>
                        <MenuItem value="HR">HR</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <FormControl fullWidth>
                      <InputLabel>Difficulty</InputLabel>
                      <Select
                        value={filterDifficulty}
                        label="Difficulty"
                        onChange={(e) => setFilterDifficulty(e.target.value)}
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value="All">All Levels</MenuItem>
                        <MenuItem value="Easy">Easy</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Hard">Hard</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </GradientCard>
          </Fade>
        )}

        {/* Statistics */}
        {selectedCompany && !questionsLoading && (
          <>
            <Fade in={true}>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, md: 3 }}>
                  <StatsCard color="#4caf50">
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <TrendingUp sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {stats.total}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Total Questions
                      </Typography>
                    </CardContent>
                  </StatsCard>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                  <StatsCard color="#2196f3">
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <School sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {stats.technical}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Technical
                      </Typography>
                    </CardContent>
                  </StatsCard>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                  <StatsCard color="#9c27b0">
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <Psychology sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {stats.behavioral}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Behavioral
                      </Typography>
                    </CardContent>
                  </StatsCard>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                  <StatsCard color="#ff5722">
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <EmojiEvents sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                        85%
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Success Rate
                      </Typography>
                    </CardContent>
                  </StatsCard>
                </Grid>
              </Grid>
            </Fade>

          </>

        )}

        {/* Loading Questions */}
        {selectedCompany && questionsLoading && (
          <GradientCard>
            <CardContent sx={{ textAlign: 'center', py: 8 }}>
              <CircularProgress size={60} sx={{ mb: 3, color: '#667eea' }} />
              <Typography variant="h5" sx={{ mb: 2, color: '#666' }}>
                Loading questions...
              </Typography>
              <Typography variant="body1" sx={{ color: '#999' }}>
                Fetching interview questions for {selectedCompany.name}
              </Typography>
            </CardContent>
          </GradientCard>
        )}

        {/* Questions List */}
        {selectedCompany && !questionsLoading && filteredQuestions.length > 0 ? (
          <Fade in={true}>
            <Box sx={{ mb: 4 }}>
              {filteredQuestions.map((question, index) => (
                <GradientCard key={question.id} sx={{ mb: 3 }}>
                  <Accordion
                    expanded={expandedQuestion === question.id}
                    onChange={() => setExpandedQuestion(
                      expandedQuestion === question.id ? null : question.id
                    )}
                    sx={{
                      background: 'transparent',
                      boxShadow: 'none',
                      '&:before': { display: 'none' }
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Box sx={{ width: '100%', pr: 2 }}>
                        {/* ... other content ... */}

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVote(question.id, 'upvote');
                            }}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              cursor: 'pointer',
                              color: '#4caf50',
                              '&:hover': { opacity: 0.8 }
                            }}
                          >
                            <ThumbUp fontSize="small" />
                            <Typography variant="caption" sx={{ ml: 0.5 }}>
                              {question.upvotes || 0}
                            </Typography>
                          </Box>

                          <Box
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVote(question.id, 'downvote');
                            }}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              cursor: 'pointer',
                              color: '#f44336',
                              '&:hover': { opacity: 0.8 }
                            }}
                          >
                            <ThumbDown fontSize="small" />
                            <Typography variant="caption" sx={{ ml: 0.5 }}>
                              {question.downvotes || 0}
                            </Typography>
                          </Box>

                          {/* Replace IconButton with Box for bookmark and share */}
                          <Box
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle bookmark functionality
                            }}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              cursor: 'pointer',
                              color: '#2196f3',
                              '&:hover': { opacity: 0.8 }
                            }}
                          >
                            <BookmarkBorder fontSize="small" />
                          </Box>

                          <Box
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle share functionality
                            }}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              cursor: 'pointer',
                              color: '#ff5722',
                              '&:hover': { opacity: 0.8 }
                            }}
                          >
                            <Share fontSize="small" />
                          </Box>
                        </Box>
                      </Box>
                    </AccordionSummary>

                    <AccordionDetails sx={{ pt: 0 }}>
                      <Divider sx={{ mb: 3 }} />

                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          mb: 3,
                          backgroundColor: '#f8f9fa',
                          borderRadius: 2,
                          border: '1px solid #e9ecef'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <QuestionAnswer sx={{ color: '#667eea', mr: 1 }} />
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                            Sample Answer
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ lineHeight: 1.7, color: '#555' }}>
                          {question.answer}
                        </Typography>
                      </Paper>

                      {question.pdfResourceUrl && (
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            mb: 3,
                            backgroundColor: '#fff3e0',
                            borderRadius: 2,
                            border: '1px solid #ffcc02'
                          }}
                        >
                          <Button
                            href={question.pdfResourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            startIcon={<PictureAsPdf />}
                            sx={{ color: '#f57c00', fontWeight: 600 }}
                          >
                            View PDF Resource
                          </Button>
                        </Paper>
                      )}

                      {/* Comments Section */}
                      <InterviewQuestionComments questionId={question.id} />
                    </AccordionDetails>
                  </Accordion>
                </GradientCard>
              ))}
            </Box>
          </Fade>
        ) : selectedCompany && !questionsLoading ? (
          <GradientCard>
            <CardContent sx={{ textAlign: 'center', py: 8 }}>
              <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 3, backgroundColor: '#e0e0e0' }}>
                <QuestionAnswer sx={{ fontSize: 40, color: '#9e9e9e' }} />
              </Avatar>
              <Typography variant="h5" sx={{ mb: 2, color: '#666' }}>
                No questions found
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: '#999' }}>
                {searchTerm || filterCategory !== 'All' || filterDifficulty !== 'All'
                  ? 'Try adjusting your search or filters'
                  : `Be the first to add a question for ${selectedCompany.name}!`
                }
              </Typography>
            </CardContent>
          </GradientCard>
        ) : !selectedCompany ? (
          <GradientCard>
            <CardContent sx={{ textAlign: 'center', py: 8 }}>
              <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 3, backgroundColor: '#e3f2fd' }}>
                <Business sx={{ fontSize: 40, color: '#2196f3' }} />
              </Avatar>
              <Typography variant="h5" sx={{ mb: 2, color: '#666' }}>
                Select a company to get started
              </Typography>
              <Typography variant="body1" sx={{ color: '#999' }}>
                Choose a company from the dropdown above to explore interview questions
              </Typography>
            </CardContent>
          </GradientCard>
        ) : null}

        {/* Floating Action Button */}
        {selectedCompany && (
          <Fab
            color="primary"
            aria-label="add interview question"
            onClick={() => {
              console.group('Add Interview Question');
              console.log('FAB Clicked');
              console.log('Selected Company:', selectedCompany);
              console.log('Current Questions:', questions);
              console.log('Questions Loading:', questionsLoading);
              console.log('Open Dialog State Before:', openAddQuestionDialog);
              
              setOpenAddQuestionDialog(true);
              
              console.log('Open Dialog State After:', openAddQuestionDialog);
              console.groupEnd();
            }}
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              zIndex: 1000, // Ensure it's above other elements
              background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                transform: 'scale(1.1)',
                boxShadow: '0 12px 40px rgba(102, 126, 234, 0.5)'
              }
            }}
          >
            <AddIcon sx={{ fontSize: 32 }} />
          </Fab>
        )}

        {/* Add Question Dialog - Always Render */}
        <Dialog
          open={openAddQuestionDialog}
          onClose={() => setOpenAddQuestionDialog(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 4,
              backgroundImage: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
              minHeight: '600px', // Ensure minimum height
              display: 'flex',
              flexDirection: 'column'
            }
          }}
        >
          <DialogTitle sx={{ textAlign: 'center', pb: 2 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                mx: 'auto',
                mb: 2,
                background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)'
              }}
            >
              <AddIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
              Add Interview Question
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              for {selectedCompany?.name}
            </Typography>
          </DialogTitle>

          <DialogContent 
            sx={{ 
              px: 4, 
              pb: 4, 
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            {/* Disable form while loading */}
            <Stack 
              spacing={3} 
              sx={{ 
                mt: 2, 
                opacity: questionsLoading ? 0.5 : 1,
                pointerEvents: questionsLoading ? 'none' : 'auto'
              }}
            >
              <TextField
                fullWidth
                label="Interview Question"
                multiline
                rows={3}
                value={newQuestion.question}
                onChange={(e) => {
                  console.log('Question changed:', e.target.value);
                  setNewQuestion(prev => ({
                    ...prev,
                    question: e.target.value
                  }));
                }}
                disabled={questionsLoading}
                sx={{ 
                  '& .MuiOutlinedInput-root': { borderRadius: 2 },
                  '& .MuiInputLabel-root': { 
                    color: newQuestion.question ? 'green' : 'inherit' 
                  }
                }}
                helperText={!newQuestion.question ? "Question is required" : ""}
                error={!newQuestion.question}
              />

              <TextField
                fullWidth
                label="Sample Answer"
                multiline
                rows={4}
                value={newQuestion.answer}
                onChange={(e) => {
                  console.log('Answer changed:', e.target.value);
                  setNewQuestion(prev => ({
                    ...prev,
                    answer: e.target.value
                  }));
                }}
                disabled={questionsLoading}
                sx={{ 
                  '& .MuiOutlinedInput-root': { borderRadius: 2 },
                  '& .MuiInputLabel-root': { 
                    color: newQuestion.answer ? 'green' : 'inherit' 
                  }
                }}
                helperText={!newQuestion.answer ? "Answer is required" : ""}
                error={!newQuestion.answer}
              />

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={newQuestion.category}
                      label="Category"
                      onChange={(e) => {
                        console.log('Category changed:', e.target.value);
                        setNewQuestion(prev => ({
                          ...prev,
                          category: e.target.value
                        }));
                      }}
                      disabled={questionsLoading}
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="Technical">Technical</MenuItem>
                      <MenuItem value="Behavioral">Behavioral</MenuItem>
                      <MenuItem value="System Design">System Design</MenuItem>
                      <MenuItem value="HR">HR</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Paper
                sx={{
                  p: 3,
                  border: '2px dashed #e0e0e0',
                  borderRadius: 2,
                  textAlign: 'center',
                  backgroundColor: '#fafafa',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#667eea',
                    backgroundColor: '#f0f4ff'
                  }
                }}
              >
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUpload />}
                  disabled={questionsLoading}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '16px'
                  }}
                >
                  Upload PDF Resource
                  <input
                    type="file"
                    hidden
                    accept=".pdf"
                    onChange={(e) => {
                      console.log('PDF file selected:', e.target.files[0]);
                      setPdfFile(e.target.files[0]);
                    }}
                  />
                </Button>

                {pdfFile && (
                  <Box sx={{ mt: 2 }}>
                    <Chip
                      icon={<PictureAsPdf />}
                      label={pdfFile.name}
                      color="success"
                      onDelete={() => setPdfFile(null)}
                      sx={{ fontWeight: 500 }}
                    />
                  </Box>
                )}
              </Paper>

              <GradientButton
                fullWidth
                size="large"
                onClick={(e) => {
                  e.preventDefault();
                  console.log('Submit Button Clicked');
                  console.log('Current User:', user);
                  console.log('Selected Company:', selectedCompany);
                  console.log('New Question:', newQuestion);
                  handleAddQuestion();
                }}
                disabled={questionsLoading || !newQuestion.question.trim() || !newQuestion.answer.trim()}
                sx={{
                  py: 2,
                  fontSize: '18px',
                  fontWeight: 600,
                  backgroundColor: newQuestion.question.trim() && newQuestion.answer.trim() 
                    ? 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)' 
                    : 'gray',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: newQuestion.question.trim() && newQuestion.answer.trim() 
                      ? 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)' 
                      : 'darkgray'
                  }
                }}
              >
                {questionsLoading ? 'Loading...' : 'Submit Question'}
              </GradientButton>
            </Stack>
          </DialogContent>
        </Dialog>
      </Box>
  );
};

export default InterviewQuestionBank;
