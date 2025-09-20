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
  IconButton,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Badge,
  Alert,
  Slider,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  LinearProgress,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  NotificationsActive as NotificationsActiveIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Bookmark as BookmarkIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  TrendingFlat as TrendingFlatIcon,
  Work as WorkIcon,
  LocationOn as LocationIcon,
  AttachMoney as SalaryIcon,
  Schedule as ScheduleIcon,
  Email as EmailIcon,
  Sms as SmsIcon,
  PhoneAndroid as PhoneIcon,
  Star as StarIcon,
  Visibility as ViewIcon,
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  FilterList as FilterIcon,
  Analytics as AnalyticsIcon,
  Speed as SpeedIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';
import { getThemeClasses, getComponentStyles } from '../../styles/themes';
import {
  jobAlertPreferences,
  recentAlerts,
  alertStatistics,
  recommendedJobs,
  alertFilters
} from '../../utils/jobAlertsData';

const JobAlerts = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const componentStyles = getComponentStyles(theme);
  
  const [activeTab, setActiveTab] = useState(0);
  const [alertsEnabled, setAlertsEnabled] = useState(jobAlertPreferences.isActive);
  const [newSearchDialog, setNewSearchDialog] = useState(false);

  // New search form state
  const [newSearch, setNewSearch] = useState({
    name: '',
    query: '',
    location: '',
    jobType: '',
    experience: '',
    salaryMin: 50000,
    salaryMax: 200000,
    remote: false,
    frequency: 'daily'
  });

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUpIcon sx={{ color: '#10B981', fontSize: 16 }} />;
      case 'down': return <TrendingDownIcon sx={{ color: '#EF4444', fontSize: 16 }} />;
      default: return <TrendingFlatIcon sx={{ color: '#6B7280', fontSize: 16 }} />;
    }
  };

  const getMatchScoreColor = (score) => {
    if (score >= 90) return '#10B981';
    if (score >= 80) return '#F59E0B';
    if (score >= 70) return '#3B82F6';
    return '#6B7280';
  };

  const AlertCard = ({ alert }) => (
    <Card className={`${themeClasses.surface} hover:shadow-lg transition-all duration-300`}>
      <CardContent>
        <Box display="flex" justifyContent="between" alignItems="flex-start" mb={2}>
          <Box flex={1}>
            <Box display="flex" alignItems="center" mb={1}>
              <Badge
                color={alert.status === 'unread' ? 'error' : 'default'}
                variant="dot"
                sx={{ mr: 1 }}
              >
                <NotificationsIcon className={themeClasses.textSecondary} />
              </Badge>
              <Typography variant="h6" className={themeClasses.text}>
                {alert.searchName}
              </Typography>
              {alert.priority === 'high' && (
                <Chip
                  label="High Priority"
                  size="small"
                  color="error"
                  sx={{ ml: 1 }}
                />
              )}
            </Box>
            <Typography variant="body2" className={themeClasses.textSecondary} mb={1}>
              {new Date(alert.timestamp).toLocaleDateString()} • {alert.jobCount} new jobs
            </Typography>
          </Box>
          <IconButton size="small">
            <SettingsIcon className={themeClasses.textSecondary} />
          </IconButton>
        </Box>

        <Box mb={2}>
          {alert.jobs.slice(0, 2).map((job) => (
            <Paper
              key={job.id}
              className={themeClasses.background}
              sx={{ p: 2, mb: 1, borderRadius: 2 }}
            >
              <Box display="flex" alignItems="center" mb={1}>
                <Avatar
                  src={job.logo}
                  alt={job.company}
                  sx={{ width: 32, height: 32, mr: 2 }}
                >
                  {job.company[0]}
                </Avatar>
                <Box flex={1}>
                  <Typography variant="subtitle2" className={themeClasses.text}>
                    {job.title}
                  </Typography>
                  <Typography variant="body2" className={themeClasses.textSecondary}>
                    {job.company} • {job.location}
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Box display="flex" alignItems="center">
                    <SpeedIcon sx={{ fontSize: 16, mr: 0.5, color: getMatchScoreColor(job.matchScore) }} />
                    <Typography
                      variant="body2"
                      sx={{ color: getMatchScoreColor(job.matchScore), fontWeight: 'bold' }}
                    >
                      {job.matchScore}%
                    </Typography>
                  </Box>
                  <Typography variant="body2" className={themeClasses.textSecondary}>
                    {job.salary}
                  </Typography>
                </Box>
              </Box>
              
              <Box display="flex" alignItems="center" justifyContent="between">
                <Box display="flex" flexWrap="wrap" gap={0.5}>
                  {job.tags.slice(0, 3).map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  ))}
                </Box>
                {job.isNew && (
                  <Chip
                    label="New"
                    size="small"
                    color="success"
                    sx={{ fontSize: '0.7rem' }}
                  />
                )}
              </Box>
            </Paper>
          ))}
          {alert.jobCount > 2 && (
            <Typography variant="body2" className={themeClasses.textSecondary} textAlign="center">
              +{alert.jobCount - 2} more jobs
            </Typography>
          )}
        </Box>
      </CardContent>
      
      <CardActions>
        <Button
          variant="outlined"
          startIcon={<ViewIcon />}
          sx={componentStyles.button}
        >
          View All Jobs
        </Button>
        <Button
          variant="contained"
          startIcon={<CheckCircleIcon />}
          sx={componentStyles.button}
        >
          Mark as Read
        </Button>
      </CardActions>
    </Card>
  );

  const SavedSearchCard = ({ search }) => (
    <Card className={`${themeClasses.surface} hover:shadow-lg transition-all duration-300`}>
      <CardContent>
        <Box display="flex" justifyContent="between" alignItems="flex-start" mb={2}>
          <Box flex={1}>
            <Box display="flex" alignItems="center" mb={1}>
              <Typography variant="h6" className={themeClasses.text}>
                {search.name}
              </Typography>
              <Switch
                checked={search.isActive}
                size="small"
                sx={{ ml: 1 }}
              />
            </Box>
            <Typography variant="body2" className={themeClasses.textSecondary} mb={1}>
              "{search.query}"
            </Typography>
            <Typography variant="body2" className={themeClasses.textSecondary}>
              {search.matchCount} matches • Alert {search.alertFrequency}
            </Typography>
          </Box>
          <Box display="flex">
            <IconButton size="small">
              <EditIcon className={themeClasses.textSecondary} />
            </IconButton>
            <IconButton size="small">
              <DeleteIcon className={themeClasses.textSecondary} />
            </IconButton>
          </Box>
        </Box>

        <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
          {search.filters.skills?.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              size="small"
              variant="outlined"
            />
          )) || (
            <>
              <Chip label={search.filters.jobType} size="small" variant="outlined" />
              <Chip label={search.filters.experience} size="small" variant="outlined" />
              {search.filters.remote && <Chip label="Remote" size="small" color="success" />}
            </>
          )}
        </Box>

        <Box display="flex" alignItems="center" justifyContent="between">
          <Typography variant="body2" className={themeClasses.textSecondary}>
            Last triggered: {new Date(search.lastTriggered).toLocaleDateString()}
          </Typography>
          <Chip
            label={search.alertFrequency}
            size="small"
            icon={<ScheduleIcon />}
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
      </CardContent>
    </Card>
  );

  const RecommendedJobCard = ({ job }) => (
    <Card className={`${themeClasses.surface} hover:shadow-lg transition-all duration-300`}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar
            src={job.logo}
            alt={job.company}
            sx={{ width: 48, height: 48, mr: 2 }}
          >
            {job.company[0]}
          </Avatar>
          <Box flex={1}>
            <Box display="flex" alignItems="center" mb={0.5}>
              <Typography variant="h6" className={themeClasses.text}>
                {job.title}
              </Typography>
              {job.urgent && (
                <Chip
                  label="Urgent"
                  size="small"
                  color="error"
                  sx={{ ml: 1 }}
                />
              )}
            </Box>
            <Typography variant="body1" className={themeClasses.textSecondary}>
              {job.company}
            </Typography>
            <Typography variant="body2" className={themeClasses.textSecondary}>
              {job.location} • {job.type}
            </Typography>
          </Box>
          <Box textAlign="right">
            <Box display="flex" alignItems="center" mb={0.5}>
              <SpeedIcon sx={{ fontSize: 16, mr: 0.5, color: getMatchScoreColor(job.matchScore) }} />
              <Typography
                variant="h6"
                sx={{ color: getMatchScoreColor(job.matchScore), fontWeight: 'bold' }}
              >
                {job.matchScore}%
              </Typography>
            </Box>
            <Typography variant="body2" fontWeight="bold" className={themeClasses.text}>
              {job.salary}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" className={themeClasses.textSecondary} mb={2}>
          {job.description}
        </Typography>

        <Box mb={2}>
          <Typography variant="subtitle2" className={themeClasses.text} mb={1}>
            Why this matches:
          </Typography>
          <List dense>
            {job.matchReasons.slice(0, 3).map((reason, index) => (
              <ListItem key={index} sx={{ py: 0, px: 0 }}>
                <ListItemIcon sx={{ minWidth: 20 }}>
                  <CheckCircleIcon sx={{ fontSize: 16, color: '#10B981' }} />
                </ListItemIcon>
                <ListItemText
                  primary={reason}
                  primaryTypographyProps={{
                    variant: 'body2',
                    className: themeClasses.textSecondary
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
          {job.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>
      </CardContent>
      
      <CardActions>
        <Button
          variant="outlined"
          startIcon={<BookmarkIcon />}
          sx={componentStyles.button}
        >
          Save
        </Button>
        <Button
          variant="contained"
          startIcon={<AssignmentIcon />}
          sx={componentStyles.button}
        >
          Apply Now
        </Button>
      </CardActions>
    </Card>
  );

  const StatsCard = ({ title, value, subtitle, icon, trend }) => (
    <Card className={themeClasses.surface}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="between" mb={1}>
          <Box display="flex" alignItems="center">
            {icon}
            <Typography variant="h6" className={themeClasses.text} ml={1}>
              {title}
            </Typography>
          </Box>
          {trend && getTrendIcon(trend)}
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

  const CreateSearchDialog = () => (
    <Dialog
      open={newSearchDialog}
      onClose={() => setNewSearchDialog(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Create New Job Alert</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Alert Name"
                value={newSearch.name}
                onChange={(e) => setNewSearch({ ...newSearch, name: e.target.value })}
                sx={componentStyles.textField}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Job Search Query"
                value={newSearch.query}
                onChange={(e) => setNewSearch({ ...newSearch, query: e.target.value })}
                sx={componentStyles.textField}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={alertFilters.locations}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} label="Location" sx={componentStyles.textField} />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={componentStyles.textField}>
                <InputLabel>Job Type</InputLabel>
                <Select
                  value={newSearch.jobType}
                  onChange={(e) => setNewSearch({ ...newSearch, jobType: e.target.value })}
                >
                  {alertFilters.jobTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom className={themeClasses.text}>
                Salary Range: ${newSearch.salaryMin.toLocaleString()} - ${newSearch.salaryMax.toLocaleString()}
              </Typography>
              <Slider
                value={[newSearch.salaryMin, newSearch.salaryMax]}
                onChange={(e, newValue) => {
                  setNewSearch({
                    ...newSearch,
                    salaryMin: newValue[0],
                    salaryMax: newValue[1]
                  });
                }}
                valueLabelDisplay="auto"
                min={30000}
                max={300000}
                step={5000}
                valueLabelFormat={(value) => `$${value.toLocaleString()}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={newSearch.remote}
                    onChange={(e) => setNewSearch({ ...newSearch, remote: e.target.checked })}
                  />
                }
                label="Remote work option"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={componentStyles.textField}>
                <InputLabel>Alert Frequency</InputLabel>
                <Select
                  value={newSearch.frequency}
                  onChange={(e) => setNewSearch({ ...newSearch, frequency: e.target.value })}
                >
                  <MenuItem value="instant">Instant</MenuItem>
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setNewSearchDialog(false)}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => {
            // Handle save logic here
            setNewSearchDialog(false);
          }}
          sx={componentStyles.button}
        >
          Create Alert
        </Button>
      </DialogActions>
    </Dialog>
  );

  const tabConfig = [
    { label: 'Recent Alerts', icon: <NotificationsIcon /> },
    { label: 'Saved Searches', icon: <BookmarkIcon /> },
    { label: 'Recommended Jobs', icon: <StarIcon /> },
    { label: 'Analytics', icon: <AnalyticsIcon /> },
    { label: 'Settings', icon: <SettingsIcon /> }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Box display="flex" justifyContent="between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography variant="h4" component="h1" className={themeClasses.text} mb={1}>
              Job Alerts & Notifications
            </Typography>
            <Typography variant="body1" className={themeClasses.textSecondary}>
              Stay updated with personalized job recommendations and never miss the perfect opportunity
            </Typography>
          </Box>
          <Box display="flex" gap={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={alertsEnabled}
                  onChange={(e) => setAlertsEnabled(e.target.checked)}
                  color="primary"
                />
              }
              label="Alerts Enabled"
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setNewSearchDialog(true)}
              sx={componentStyles.button}
            >
              New Alert
            </Button>
          </Box>
        </Box>

        {/* Quick Stats */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Active Alerts"
              value={alertStatistics.activeSearches}
              subtitle="Monitoring job market"
              icon={<NotificationsActiveIcon sx={{ color: '#3B82F6' }} />}
              trend="up"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Unread Alerts"
              value={alertStatistics.unreadAlerts}
              subtitle="New opportunities"
              icon={<WarningIcon sx={{ color: '#F59E0B' }} />}
              trend="stable"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Jobs Found"
              value={alertStatistics.thisWeek.jobsFound}
              subtitle="This week"
              icon={<WorkIcon sx={{ color: '#10B981' }} />}
              trend="up"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Avg Match Score"
              value={`${alertStatistics.averageMatchScore}%`}
              subtitle="Job relevance"
              icon={<SpeedIcon sx={{ color: '#8B5CF6' }} />}
              trend="up"
            />
          </Grid>
        </Grid>

        {/* Alert Status */}
        {!alertsEnabled && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            Job alerts are currently disabled. Enable them to receive notifications about new opportunities.
          </Alert>
        )}
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
        <Box>
          <Grid container spacing={3}>
            {recentAlerts.map((alert) => (
              <Grid item xs={12} lg={6} key={alert.id}>
                <AlertCard alert={alert} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          <Grid container spacing={3}>
            {jobAlertPreferences.savedSearches.map((search) => (
              <Grid item xs={12} md={6} lg={4} key={search.id}>
                <SavedSearchCard search={search} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {activeTab === 2 && (
        <Box>
          <Typography variant="h5" className={themeClasses.text} mb={3}>
            Recommended for You
          </Typography>
          <Grid container spacing={3}>
            {recommendedJobs.map((job) => (
              <Grid item xs={12} lg={6} key={job.id}>
                <RecommendedJobCard job={job} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {activeTab === 3 && (
        <Box>
          <Typography variant="h5" className={themeClasses.text} mb={3}>
            Job Alert Analytics
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card className={themeClasses.surface}>
                <CardContent>
                  <Typography variant="h6" className={themeClasses.text} mb={3}>
                    Popular Skills in Demand
                  </Typography>
                  {alertStatistics.topSkillsInDemand.map((skill) => (
                    <Box key={skill.skill} display="flex" alignItems="center" mb={2}>
                      <Box flex={1}>
                        <Box display="flex" alignItems="center" mb={0.5}>
                          <Typography variant="body1" className={themeClasses.text}>
                            {skill.skill}
                          </Typography>
                          {getTrendIcon(skill.trend)}
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(skill.count / alertStatistics.topSkillsInDemand[0].count) * 100}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>
                      <Typography variant="body2" className={themeClasses.textSecondary} ml={2}>
                        {skill.count} jobs
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card className={themeClasses.surface}>
                <CardContent>
                  <Typography variant="h6" className={themeClasses.text} mb={2}>
                    Top Hiring Companies
                  </Typography>
                  {alertStatistics.topCompanies.map((company) => (
                    <Box key={company.company} mb={2} p={2} className={themeClasses.background} sx={{ borderRadius: 2 }}>
                      <Typography variant="subtitle2" className={themeClasses.text}>
                        {company.company}
                      </Typography>
                      <Typography variant="body2" className={themeClasses.textSecondary}>
                        {company.jobCount} jobs • Avg ${company.avgSalary.toLocaleString()}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {activeTab === 4 && (
        <Box>
          <Typography variant="h5" className={themeClasses.text} mb={3}>
            Notification Settings
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card className={themeClasses.surface}>
                <CardContent>
                  <Typography variant="h6" className={themeClasses.text} mb={3}>
                    Email Notifications
                  </Typography>
                  
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon sx={{ color: '#3B82F6' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email Alerts"
                        secondary="Receive job alerts via email"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={jobAlertPreferences.notificationSettings.email.enabled}
                          edge="end"
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon sx={{ color: '#10B981' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Push Notifications"
                        secondary="Real-time notifications on your device"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={jobAlertPreferences.notificationSettings.push.enabled}
                          edge="end"
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <SmsIcon sx={{ color: '#F59E0B' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="SMS Alerts"
                        secondary="Text messages for urgent opportunities"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={jobAlertPreferences.notificationSettings.sms.enabled}
                          edge="end"
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card className={themeClasses.surface}>
                <CardContent>
                  <Typography variant="h6" className={themeClasses.text} mb={3}>
                    Frequency Settings
                  </Typography>
                  
                  <FormControl fullWidth sx={{ mb: 3, ...componentStyles.textField }}>
                    <InputLabel>Default Alert Frequency</InputLabel>
                    <Select
                      value={jobAlertPreferences.notificationSettings.email.frequency}
                    >
                      <MenuItem value="instant">Instant</MenuItem>
                      <MenuItem value="daily">Daily Digest</MenuItem>
                      <MenuItem value="weekly">Weekly Summary</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <Typography variant="subtitle2" className={themeClasses.text} mb={2}>
                    Email Time Preference
                  </Typography>
                  <TextField
                    type="time"
                    fullWidth
                    value={jobAlertPreferences.notificationSettings.email.time}
                    sx={componentStyles.textField}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Dialogs */}
      <CreateSearchDialog />
    </Container>
  );
};

export default JobAlerts;