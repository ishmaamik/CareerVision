import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Rating,
  LinearProgress,
  Badge,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  People as PeopleIcon,
  Star as StarIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LinkedIn as LinkedInIcon,
  FileDownload as DownloadIcon,
  Schedule as ScheduleIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Assessment as AssessmentIcon,
  WorkHistory as WorkIcon,
  School as EducationIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import { useTheme } from '../../../context/ThemeContext';
import { getThemeClasses, getComponentStyles } from '../../../styles/themes';

const CandidateManagement = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const componentStyles = getComponentStyles(theme);
  
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterJob, setFilterJob] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [profileDialog, setProfileDialog] = useState(false);

  // Mock candidate data
  const candidates = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      avatar: "/avatars/john.jpg",
      position: "Senior React Developer",
      jobId: 1,
      appliedDate: "2024-01-20",
      status: "Interview Scheduled",
      rating: 4.5,
      experience: "5 years",
      location: "San Francisco, CA",
      salary: "$140,000",
      skills: ["React", "TypeScript", "Node.js", "AWS", "GraphQL"],
      education: "BS Computer Science - Stanford University",
      linkedIn: "linkedin.com/in/johnsmith",
      resumeUrl: "/resumes/john-smith.pdf",
      notes: "Strong technical background, excellent communication skills",
      interviewDate: "2024-01-25T10:00:00Z",
      stage: "Technical Interview"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com", 
      phone: "+1 (555) 234-5678",
      avatar: "/avatars/sarah.jpg",
      position: "Product Manager",
      jobId: 2,
      appliedDate: "2024-01-19",
      status: "Under Review",
      rating: 4.8,
      experience: "7 years",
      location: "New York, NY",
      salary: "$155,000",
      skills: ["Product Strategy", "Analytics", "Agile", "User Research", "Roadmapping"],
      education: "MBA - Harvard Business School",
      linkedIn: "linkedin.com/in/sarahjohnson",
      resumeUrl: "/resumes/sarah-johnson.pdf",
      notes: "Excellent product sense, strong leadership experience",
      interviewDate: null,
      stage: "Application Review"
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@email.com",
      phone: "+1 (555) 345-6789",
      avatar: "/avatars/mike.jpg",
      position: "UX Designer",
      jobId: 3,
      appliedDate: "2024-01-18",
      status: "Shortlisted",
      rating: 4.3,
      experience: "4 years",
      location: "Seattle, WA",
      salary: "$105,000",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Usability Testing"],
      education: "BFA Design - Art Center College",
      linkedIn: "linkedin.com/in/mikechen",
      resumeUrl: "/resumes/mike-chen.pdf",
      notes: "Creative portfolio, user-centered design approach",
      interviewDate: "2024-01-24T14:00:00Z",
      stage: "Design Challenge"
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma.davis@email.com",
      phone: "+1 (555) 456-7890", 
      avatar: "/avatars/emma.jpg",
      position: "DevOps Engineer",
      jobId: 4,
      appliedDate: "2024-01-17",
      status: "Rejected",
      rating: 3.2,
      experience: "3 years",
      location: "Austin, TX",
      salary: "$95,000",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
      education: "BS Engineering - UT Austin",
      linkedIn: "linkedin.com/in/emmadavis",
      resumeUrl: "/resumes/emma-davis.pdf",
      notes: "Good technical skills but lacks senior experience",
      interviewDate: null,
      stage: "Application Review"
    }
  ];

  const jobs = [
    { id: 1, title: "Senior React Developer" },
    { id: 2, title: "Product Manager" },
    { id: 3, title: "UX Designer" },
    { id: 4, title: "DevOps Engineer" }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'interview scheduled': return 'info';
      case 'under review': return 'warning';
      case 'shortlisted': return 'success';
      case 'rejected': return 'error';
      case 'hired': return 'success';
      default: return 'default';
    }
  };

  const handleMenuClick = (event, candidate) => {
    setAnchorEl(event.currentTarget);
    setSelectedCandidate(candidate);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCandidate(null);
  };

  const CandidateCard = ({ candidate }) => (
    <Card className={`${themeClasses.surface} hover:shadow-lg transition-all duration-300`}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar
            src={candidate.avatar}
            sx={{ width: 56, height: 56, mr: 2 }}
          >
            {candidate.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Box flex={1}>
            <Typography variant="h6" className={themeClasses.text}>
              {candidate.name}
            </Typography>
            <Typography variant="body2" className={themeClasses.textSecondary}>
              Applied for: {candidate.position}
            </Typography>
            <Box display="flex" alignItems="center" mt={0.5}>
              <Rating value={candidate.rating} precision={0.1} size="small" readOnly />
              <Typography variant="body2" className={themeClasses.textSecondary} ml={1}>
                ({candidate.rating})
              </Typography>
            </Box>
          </Box>
          <Box textAlign="right">
            <Chip
              label={candidate.status}
              color={getStatusColor(candidate.status)}
              size="small"
              sx={{ mb: 1 }}
            />
            <IconButton
              size="small"
              onClick={(e) => handleMenuClick(e, candidate)}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>

        <Grid container spacing={2} mb={2}>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <WorkIcon sx={{ fontSize: 16, mr: 0.5 }} className={themeClasses.textSecondary} />
              <Typography variant="body2" className={themeClasses.textSecondary}>
                {candidate.experience}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <LocationIcon sx={{ fontSize: 16, mr: 0.5 }} className={themeClasses.textSecondary} />
              <Typography variant="body2" className={themeClasses.textSecondary}>
                {candidate.location}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" className={themeClasses.textSecondary}>
              Applied: {new Date(candidate.appliedDate).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" className={themeClasses.text} fontWeight="medium">
              Expected: {candidate.salary}
            </Typography>
          </Grid>
        </Grid>

        <Box mb={2}>
          <Typography variant="subtitle2" className={themeClasses.text} mb={1}>
            Key Skills:
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={0.5}>
            {candidate.skills.slice(0, 4).map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                size="small"
                variant="outlined"
              />
            ))}
            {candidate.skills.length > 4 && (
              <Chip
                label={`+${candidate.skills.length - 4} more`}
                size="small"
                variant="outlined"
                color="primary"
              />
            )}
          </Box>
        </Box>

        {candidate.interviewDate && (
          <Box mb={2}>
            <Typography variant="subtitle2" className={themeClasses.text} mb={1}>
              Next Interview:
            </Typography>
            <Box display="flex" alignItems="center">
              <CalendarIcon sx={{ fontSize: 16, mr: 0.5 }} className={themeClasses.textSecondary} />
              <Typography variant="body2" className={themeClasses.textSecondary}>
                {new Date(candidate.interviewDate).toLocaleDateString()} at{' '}
                {new Date(candidate.interviewDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            </Box>
          </Box>
        )}

        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            size="small"
            startIcon={<ViewIcon />}
            sx={componentStyles.button}
            onClick={() => setProfileDialog(true)}
          >
            View Profile
          </Button>
          <IconButton size="small" color="primary">
            <EmailIcon />
          </IconButton>
          <IconButton size="small" color="primary">
            <PhoneIcon />
          </IconButton>
          <IconButton size="small" color="primary">
            <DownloadIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );

  const CandidateTableRow = ({ candidate }) => (
    <TableRow hover>
      <TableCell>
        <Box display="flex" alignItems="center">
          <Avatar
            src={candidate.avatar}
            sx={{ mr: 2 }}
          >
            {candidate.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" className={themeClasses.text}>
              {candidate.name}
            </Typography>
            <Typography variant="body2" className={themeClasses.textSecondary}>
              {candidate.email}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>{candidate.position}</TableCell>
      <TableCell>
        <Box display="flex" alignItems="center">
          <Rating value={candidate.rating} precision={0.1} size="small" readOnly />
          <Typography variant="body2" className={themeClasses.textSecondary} ml={1}>
            ({candidate.rating})
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Chip
          label={candidate.status}
          color={getStatusColor(candidate.status)}
          size="small"
        />
      </TableCell>
      <TableCell>{new Date(candidate.appliedDate).toLocaleDateString()}</TableCell>
      <TableCell>{candidate.stage}</TableCell>
      <TableCell>
        <Box display="flex" gap={0.5}>
          <IconButton size="small" color="primary">
            <EmailIcon />
          </IconButton>
          <IconButton size="small" color="primary">
            <DownloadIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={(e) => handleMenuClick(e, candidate)}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || candidate.status.toLowerCase().includes(filterStatus.toLowerCase());
    const matchesJob = filterJob === 'all' || candidate.jobId.toString() === filterJob;
    return matchesSearch && matchesStatus && matchesJob;
  });

  const CandidateProfileDialog = () => (
    <Dialog
      open={profileDialog}
      onClose={() => setProfileDialog(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Candidate Profile</DialogTitle>
      <DialogContent>
        {selectedCandidate && (
          <Box>
            <Box display="flex" alignItems="center" mb={3}>
              <Avatar
                src={selectedCandidate.avatar}
                sx={{ width: 80, height: 80, mr: 3 }}
              >
                {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
              </Avatar>
              <Box>
                <Typography variant="h5" className={themeClasses.text}>
                  {selectedCandidate.name}
                </Typography>
                <Typography variant="body1" className={themeClasses.textSecondary}>
                  {selectedCandidate.position}
                </Typography>
                <Box display="flex" alignItems="center" mt={1}>
                  <Rating value={selectedCandidate.rating} precision={0.1} readOnly />
                  <Typography variant="body2" className={themeClasses.textSecondary} ml={1}>
                    ({selectedCandidate.rating})
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className={themeClasses.text} mb={2}>
                  Contact Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemAvatar>
                      <EmailIcon />
                    </ListItemAvatar>
                    <ListItemText primary={selectedCandidate.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <PhoneIcon />
                    </ListItemAvatar>
                    <ListItemText primary={selectedCandidate.phone} />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <LocationIcon />
                    </ListItemAvatar>
                    <ListItemText primary={selectedCandidate.location} />
                  </ListItem>
                </List>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className={themeClasses.text} mb={2}>
                  Professional Details
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemAvatar>
                      <WorkIcon />
                    </ListItemAvatar>
                    <ListItemText 
                      primary="Experience"
                      secondary={selectedCandidate.experience}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <EducationIcon />
                    </ListItemAvatar>
                    <ListItemText 
                      primary="Education"
                      secondary={selectedCandidate.education}
                    />
                  </ListItem>
                </List>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" className={themeClasses.text} mb={2}>
                  Skills
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {selectedCandidate.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" className={themeClasses.text} mb={2}>
                  Application Notes
                </Typography>
                <Paper className={themeClasses.background} sx={{ p: 2 }}>
                  <Typography variant="body2" className={themeClasses.textSecondary}>
                    {selectedCandidate.notes}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setProfileDialog(false)}>Close</Button>
        <Button variant="contained" sx={componentStyles.button}>
          Schedule Interview
        </Button>
      </DialogActions>
    </Dialog>
  );

  const tabConfig = [
    { label: 'Card View', icon: <PeopleIcon /> },
    { label: 'Table View', icon: <AssessmentIcon /> }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" className={themeClasses.text} mb={1}>
          Candidate Management
        </Typography>
        <Typography variant="body1" className={themeClasses.textSecondary} mb={3}>
          Track and manage job applications and candidates
        </Typography>

        {/* Stats */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={3}>
            <Card className={themeClasses.surface}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <PeopleIcon sx={{ color: '#3B82F6', mr: 2 }} />
                  <Box>
                    <Typography variant="h6" className={themeClasses.text}>
                      {candidates.length}
                    </Typography>
                    <Typography variant="body2" className={themeClasses.textSecondary}>
                      Total Candidates
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card className={themeClasses.surface}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <ScheduleIcon sx={{ color: '#F59E0B', mr: 2 }} />
                  <Box>
                    <Typography variant="h6" className={themeClasses.text}>
                      {candidates.filter(c => c.status === 'Interview Scheduled').length}
                    </Typography>
                    <Typography variant="body2" className={themeClasses.textSecondary}>
                      Interviews Scheduled
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card className={themeClasses.surface}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <CheckCircleIcon sx={{ color: '#10B981', mr: 2 }} />
                  <Box>
                    <Typography variant="h6" className={themeClasses.text}>
                      {candidates.filter(c => c.status === 'Shortlisted').length}
                    </Typography>
                    <Typography variant="body2" className={themeClasses.textSecondary}>
                      Shortlisted
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card className={themeClasses.surface}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <StarIcon sx={{ color: '#8B5CF6', mr: 2 }} />
                  <Box>
                    <Typography variant="h6" className={themeClasses.text}>
                      {(candidates.reduce((sum, c) => sum + c.rating, 0) / candidates.length).toFixed(1)}
                    </Typography>
                    <Typography variant="body2" className={themeClasses.textSecondary}>
                      Avg Rating
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search and Filters */}
        <Grid container spacing={2} alignItems="center" mb={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search candidates..."
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
          <Grid item xs={12} md={3}>
            <FormControl fullWidth sx={componentStyles.textField}>
              <InputLabel>Filter by Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="under review">Under Review</MenuItem>
                <MenuItem value="interview scheduled">Interview Scheduled</MenuItem>
                <MenuItem value="shortlisted">Shortlisted</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth sx={componentStyles.textField}>
              <InputLabel>Filter by Job</InputLabel>
              <Select
                value={filterJob}
                onChange={(e) => setFilterJob(e.target.value)}
              >
                <MenuItem value="all">All Jobs</MenuItem>
                {jobs.map((job) => (
                  <MenuItem key={job.id} value={job.id.toString()}>
                    {job.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="body2" className={themeClasses.textSecondary}>
              {filteredCandidates.length} candidates found
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* View Toggle */}
      <Box mb={3}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            '& .MuiTab-root': {
              minHeight: '48px',
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

      {/* Content */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {filteredCandidates.map((candidate) => (
            <Grid item xs={12} md={6} lg={4} key={candidate.id}>
              <CandidateCard candidate={candidate} />
            </Grid>
          ))}
        </Grid>
      )}

      {activeTab === 1 && (
        <TableContainer component={Paper} className={themeClasses.surface}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Candidate</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Applied Date</TableCell>
                <TableCell>Stage</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCandidates.map((candidate) => (
                <CandidateTableRow key={candidate.id} candidate={candidate} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <ViewIcon sx={{ mr: 1 }} />
          View Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ScheduleIcon sx={{ mr: 1 }} />
          Schedule Interview
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <EmailIcon sx={{ mr: 1 }} />
          Send Email
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <DownloadIcon sx={{ mr: 1 }} />
          Download Resume
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <CheckCircleIcon sx={{ mr: 1, color: 'success.main' }} />
          Shortlist
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <CancelIcon sx={{ mr: 1, color: 'error.main' }} />
          Reject
        </MenuItem>
      </Menu>

      {/* Profile Dialog */}
      <CandidateProfileDialog />
    </Container>
  );
};

export default CandidateManagement;