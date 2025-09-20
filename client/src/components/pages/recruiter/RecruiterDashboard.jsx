import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  IconButton,
  LinearProgress,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Divider,
  Badge,
  Alert
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Work as WorkIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
  Business as BusinessIcon,
  Notifications as NotificationsIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ClockIcon,
  Star as StarIcon,
  Email as EmailIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import { useTheme } from '../../../context/ThemeContext';
import { getThemeClasses, getComponentStyles } from '../../../styles/themes';

const RecruiterDashboard = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const componentStyles = getComponentStyles(theme);

  // Mock data for recruiter dashboard
  const dashboardStats = {
    activeJobs: 12,
    totalApplications: 156,
    interviewsScheduled: 23,
    hiredCandidates: 8,
    responseRate: 78,
    avgTimeToHire: 18
  };

  const recentJobs = [
    {
      id: 1,
      title: "Senior React Developer",
      department: "Engineering",
      applications: 45,
      status: "Active",
      postedDate: "2024-01-15",
      salary: "$120,000 - $150,000",
      location: "San Francisco, CA",
      type: "Full-time"
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      applications: 32,
      status: "Active",
      postedDate: "2024-01-12",
      salary: "$130,000 - $160,000",
      location: "New York, NY",
      type: "Full-time"
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      applications: 28,
      status: "Draft",
      postedDate: "2024-01-10",
      salary: "$90,000 - $120,000",
      location: "Remote",
      type: "Full-time"
    }
  ];

  const recentApplications = [
    {
      id: 1,
      candidateName: "John Smith",
      jobTitle: "Senior React Developer",
      appliedDate: "2024-01-20",
      status: "Interview Scheduled",
      experience: "5 years",
      skills: ["React", "Node.js", "TypeScript"],
      rating: 4.5,
      avatar: "/avatars/john.jpg"
    },
    {
      id: 2,
      candidateName: "Sarah Johnson",
      jobTitle: "Product Manager",
      appliedDate: "2024-01-19",
      status: "Under Review",
      experience: "7 years",
      skills: ["Product Strategy", "Analytics", "Agile"],
      rating: 4.8,
      avatar: "/avatars/sarah.jpg"
    },
    {
      id: 3,
      candidateName: "Mike Chen",
      jobTitle: "UX Designer",
      appliedDate: "2024-01-18",
      status: "Shortlisted",
      experience: "4 years",
      skills: ["Figma", "User Research", "Prototyping"],
      rating: 4.3,
      avatar: "/avatars/mike.jpg"
    }
  ];

  const upcomingInterviews = [
    {
      id: 1,
      candidateName: "John Smith",
      jobTitle: "Senior React Developer",
      date: "2024-01-22",
      time: "10:00 AM",
      type: "Technical Interview",
      interviewer: "Alex Wilson",
      status: "Confirmed"
    },
    {
      id: 2,
      candidateName: "Emma Davis",
      jobTitle: "Product Manager",
      date: "2024-01-22",
      time: "2:00 PM",
      type: "Panel Interview",
      interviewer: "Multiple",
      status: "Pending"
    },
    {
      id: 3,
      candidateName: "Sarah Johnson",
      jobTitle: "Product Manager",
      date: "2024-01-23",
      time: "11:00 AM",
      type: "Behavioral Interview",
      interviewer: "Lisa Brown",
      status: "Confirmed"
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'success';
      case 'draft': return 'warning';
      case 'closed': return 'error';
      case 'interview scheduled': return 'info';
      case 'under review': return 'warning';
      case 'shortlisted': return 'success';
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const StatCard = ({ title, value, subtitle, icon, trend }) => (
    <Card className={themeClasses.surface}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="between" mb={1}>
          <Box display="flex" alignItems="center">
            {icon}
            <Typography variant="h6" className={themeClasses.text} ml={1}>
              {title}
            </Typography>
          </Box>
          {trend && (
            <TrendingUpIcon sx={{ color: '#10B981' }} />
          )}
        </Box>
        <Typography variant="h4" className={themeClasses.text} mb={0.5}>
          {value}
        </Typography>
        <Typography variant="body2" className={themeClasses.textSecondary}>
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Box display="flex" justifyContent="between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h4" component="h1" className={themeClasses.text} mb={1}>
              Recruiter Dashboard
            </Typography>
            <Typography variant="body1" className={themeClasses.textSecondary}>
              Welcome back! Here's your hiring overview for today.
            </Typography>
          </Box>
          <Box display="flex" gap={2}>
            <Badge badgeContent={5} color="error">
              <IconButton>
                <NotificationsIcon />
              </IconButton>
            </Badge>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={componentStyles.button}
            >
              Post New Job
            </Button>
          </Box>
        </Box>

        {/* Quick Actions Alert */}
        <Alert severity="info" sx={{ mb: 3 }}>
          You have 3 pending interview confirmations and 2 new applications that need review.
        </Alert>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Active Jobs"
            value={dashboardStats.activeJobs}
            subtitle="Currently hiring"
            icon={<WorkIcon sx={{ color: '#3B82F6' }} />}
            trend={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Applications"
            value={dashboardStats.totalApplications}
            subtitle="This month"
            icon={<PeopleIcon sx={{ color: '#10B981' }} />}
            trend={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Interviews"
            value={dashboardStats.interviewsScheduled}
            subtitle="Scheduled"
            icon={<ScheduleIcon sx={{ color: '#F59E0B' }} />}
            trend={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Hired"
            value={dashboardStats.hiredCandidates}
            subtitle="This quarter"
            icon={<CheckCircleIcon sx={{ color: '#8B5CF6' }} />}
            trend={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Response Rate"
            value={`${dashboardStats.responseRate}%`}
            subtitle="Application response"
            icon={<AssessmentIcon sx={{ color: '#EF4444' }} />}
            trend={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Time to Hire"
            value={`${dashboardStats.avgTimeToHire} days`}
            subtitle="Average"
            icon={<ClockIcon sx={{ color: '#06B6D4' }} />}
            trend={false}
          />
        </Grid>
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Recent Jobs */}
        <Grid item xs={12} lg={8}>
          <Card className={themeClasses.surface}>
            <CardContent>
              <Box display="flex" justifyContent="between" alignItems="center" mb={3}>
                <Typography variant="h6" className={themeClasses.text}>
                  Recent Job Postings
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<ViewIcon />}
                  sx={componentStyles.button}
                >
                  View All
                </Button>
              </Box>
              
              {recentJobs.map((job) => (
                <Paper
                  key={job.id}
                  className={themeClasses.background}
                  sx={{ p: 3, mb: 2, borderRadius: 2 }}
                >
                  <Box display="flex" justifyContent="between" alignItems="flex-start" mb={2}>
                    <Box>
                      <Typography variant="h6" className={themeClasses.text} mb={0.5}>
                        {job.title}
                      </Typography>
                      <Typography variant="body2" className={themeClasses.textSecondary} mb={1}>
                        {job.department} • Posted on {new Date(job.postedDate).toLocaleDateString()}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box display="flex" alignItems="center">
                          <LocationIcon sx={{ fontSize: 16, mr: 0.5 }} className={themeClasses.textSecondary} />
                          <Typography variant="body2" className={themeClasses.textSecondary}>
                            {job.location}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <MoneyIcon sx={{ fontSize: 16, mr: 0.5 }} className={themeClasses.textSecondary} />
                          <Typography variant="body2" className={themeClasses.textSecondary}>
                            {job.salary}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box textAlign="right">
                      <Chip
                        label={job.status}
                        color={getStatusColor(job.status)}
                        size="small"
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="h6" className={themeClasses.text}>
                        {job.applications}
                      </Typography>
                      <Typography variant="body2" className={themeClasses.textSecondary}>
                        Applications
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" gap={1}>
                    <Button
                      variant="outlined"
                      startIcon={<ViewIcon />}
                      size="small"
                      sx={componentStyles.button}
                    >
                      View Applications
                    </Button>
                    <Button
                      variant="text"
                      startIcon={<EditIcon />}
                      size="small"
                    >
                      Edit Job
                    </Button>
                  </Box>
                </Paper>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Interviews */}
        <Grid item xs={12} lg={4}>
          <Card className={themeClasses.surface}>
            <CardContent>
              <Box display="flex" justifyContent="between" alignItems="center" mb={3}>
                <Typography variant="h6" className={themeClasses.text}>
                  Upcoming Interviews
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<CalendarIcon />}
                  size="small"
                  sx={componentStyles.button}
                >
                  Schedule
                </Button>
              </Box>
              
              <List>
                {upcomingInterviews.map((interview, index) => (
                  <React.Fragment key={interview.id}>
                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar>
                          {interview.candidateName.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box display="flex" justifyContent="between" alignItems="center">
                            <Typography variant="subtitle2" className={themeClasses.text}>
                              {interview.candidateName}
                            </Typography>
                            <Chip
                              label={interview.status}
                              color={getStatusColor(interview.status)}
                              size="small"
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" className={themeClasses.textSecondary}>
                              {interview.jobTitle}
                            </Typography>
                            <Typography variant="body2" className={themeClasses.textSecondary}>
                              {interview.date} at {interview.time}
                            </Typography>
                            <Typography variant="body2" color="primary">
                              {interview.type}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < upcomingInterviews.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Applications */}
        <Grid item xs={12}>
          <Card className={themeClasses.surface}>
            <CardContent>
              <Box display="flex" justifyContent="between" alignItems="center" mb={3}>
                <Typography variant="h6" className={themeClasses.text}>
                  Recent Applications
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<ViewIcon />}
                  sx={componentStyles.button}
                >
                  View All Applications
                </Button>
              </Box>
              
              <Grid container spacing={2}>
                {recentApplications.map((application) => (
                  <Grid item xs={12} md={4} key={application.id}>
                    <Paper
                      className={themeClasses.background}
                      sx={{ p: 2, borderRadius: 2, height: '100%' }}
                    >
                      <Box display="flex" alignItems="center" mb={2}>
                        <Avatar
                          src={application.avatar}
                          sx={{ width: 40, height: 40, mr: 2 }}
                        >
                          {application.candidateName.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Box flex={1}>
                          <Typography variant="subtitle2" className={themeClasses.text}>
                            {application.candidateName}
                          </Typography>
                          <Typography variant="body2" className={themeClasses.textSecondary}>
                            {application.experience} experience
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <StarIcon sx={{ color: '#F59E0B', fontSize: 16, mr: 0.5 }} />
                          <Typography variant="body2" className={themeClasses.text}>
                            {application.rating}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" className={themeClasses.textSecondary} mb={1}>
                        Applied for: {application.jobTitle}
                      </Typography>
                      
                      <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
                        {application.skills.slice(0, 3).map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                      
                      <Box display="flex" justifyContent="between" alignItems="center" mb={2}>
                        <Chip
                          label={application.status}
                          color={getStatusColor(application.status)}
                          size="small"
                        />
                        <Typography variant="body2" className={themeClasses.textSecondary}>
                          {new Date(application.appliedDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                      
                      <Box display="flex" gap={1}>
                        <Button
                          variant="contained"
                          size="small"
                          fullWidth
                          sx={componentStyles.button}
                        >
                          Review
                        </Button>
                        <IconButton size="small">
                          <EmailIcon />
                        </IconButton>
                        <IconButton size="small">
                          <PhoneIcon />
                        </IconButton>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecruiterDashboard;