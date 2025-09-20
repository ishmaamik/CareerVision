import React, { useState, useEffect } from "react";
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
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Avatar,
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Badge,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import {
  ArrowBack,
  Bookmark,
  BookmarkBorder,
  Search,
  FilterList,
  Sort,
  Delete,
  Share,
  Launch,
  LocationOn,
  Work,
  Schedule,
  TrendingUp,
  Money,
  MoreVert,
  Notifications,
  NotificationsOff,
  Archive,
  Unarchive,
  CalendarToday,
  Assessment,
} from "@mui/icons-material";
import {
  mockSavedJobs,
  jobCategories,
  salaryRanges,
  jobStatuses,
} from "../../utils/savedJobsData";

const SavedJobs = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);
  const componentStyles = getComponentStyles(isDarkMode);

  // State management
  const [savedJobs, setSavedJobs] = useState(mockSavedJobs);
  const [filteredJobs, setFilteredJobs] = useState(mockSavedJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    category: "all",
    experience: "all",
    workType: "all",
    remote: "all",
    salary: "all",
    status: "all"
  });
  const [sortBy, setSortBy] = useState("saved_date");
  const [selectedJobs, setSelectedJobs] = useState(new Set());
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [notifications, setNotifications] = useState(new Set());

  // Initialize notifications for jobs with deadlines
  useEffect(() => {
    const jobsWithDeadlines = savedJobs.filter(job => {
      const deadline = new Date(job.applicationDeadline);
      const now = new Date();
      const diffDays = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays > 0 && job.status === 'active';
    });
    setNotifications(new Set(jobsWithDeadlines.map(job => job.id)));
  }, [savedJobs]);

  // Filter and search jobs
  useEffect(() => {
    let filtered = savedJobs;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedFilters.category !== "all") {
      filtered = filtered.filter(job => job.category === selectedFilters.category);
    }

    // Apply experience filter
    if (selectedFilters.experience !== "all") {
      const expMap = { entry: "Entry-level", mid: "Mid-level", senior: "Senior" };
      filtered = filtered.filter(job => job.experience === expMap[selectedFilters.experience]);
    }

    // Apply work type filter
    if (selectedFilters.workType !== "all") {
      filtered = filtered.filter(job => job.type.toLowerCase().includes(selectedFilters.workType));
    }

    // Apply remote filter
    if (selectedFilters.remote !== "all") {
      if (selectedFilters.remote === "remote") {
        filtered = filtered.filter(job => job.remote === true);
      } else if (selectedFilters.remote === "onsite") {
        filtered = filtered.filter(job => job.remote === false);
      }
    }

    // Apply status filter
    if (selectedFilters.status !== "all") {
      filtered = filtered.filter(job => job.status === selectedFilters.status);
    }

    // Apply salary filter
    if (selectedFilters.salary !== "all") {
      const salaryRange = salaryRanges.find(range => range.id === selectedFilters.salary);
      if (salaryRange) {
        filtered = filtered.filter(job => {
          const salary = job.salary.match(/\$?([\d,]+)/g);
          if (salary && salary[0]) {
            const minSalary = parseInt(salary[0].replace(/[$,]/g, ''));
            return minSalary >= salaryRange.min && minSalary <= salaryRange.max;
          }
          return true;
        });
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "saved_date":
          return new Date(b.savedDate) - new Date(a.savedDate);
        case "match_score":
          return b.matchScore - a.matchScore;
        case "salary": {
          const getSalary = (job) => {
            const salary = job.salary.match(/\$?([\d,]+)/g);
            return salary ? parseInt(salary[0].replace(/[$,]/g, '')) : 0;
          };
          return getSalary(b) - getSalary(a);
        }
        case "deadline":
          return new Date(a.applicationDeadline) - new Date(b.applicationDeadline);
        case "company":
          return a.company.localeCompare(b.company);
        default:
          return 0;
      }
    });

    setFilteredJobs(filtered);
  }, [savedJobs, searchTerm, selectedFilters, sortBy]);

  // Handle job selection
  const toggleJobSelection = (jobId) => {
    setSelectedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  // Select all jobs
  const selectAllJobs = () => {
    if (selectedJobs.size === filteredJobs.length) {
      setSelectedJobs(new Set());
    } else {
      setSelectedJobs(new Set(filteredJobs.map(job => job.id)));
    }
  };

  // Remove job from saved
  const removeJob = (jobId) => {
    setSavedJobs(prev => prev.filter(job => job.id !== jobId));
    setSelectedJobs(prev => {
      const newSet = new Set(prev);
      newSet.delete(jobId);
      return newSet;
    });
    setJobToDelete(null);
  };

  // Bulk actions
  const bulkRemove = () => {
    setSavedJobs(prev => prev.filter(job => !selectedJobs.has(job.id)));
    setSelectedJobs(new Set());
  };

  // Toggle notification for job
  const toggleNotification = (jobId) => {
    setNotifications(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  // Get days until deadline
  const getDaysUntilDeadline = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Render job card
  const renderJobCard = (job) => {
    const daysUntilDeadline = getDaysUntilDeadline(job.applicationDeadline);
    const isExpiringSoon = daysUntilDeadline <= 7 && daysUntilDeadline > 0;
    const isExpired = job.status === 'expired' || daysUntilDeadline <= 0;

    return (
      <Card 
        key={job.id} 
        className={`${componentStyles.card} transition-all duration-300 hover:shadow-lg ${
          selectedJobs.has(job.id) ? 'ring-2 ring-blue-500' : ''
        }`}
      >
        <CardContent className="p-6">
          {/* Header */}
          <Box className="flex justify-between items-start mb-4">
            <Box className="flex items-start gap-4 flex-1">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedJobs.has(job.id)}
                    onChange={() => toggleJobSelection(job.id)}
                    color="primary"
                  />
                }
                label=""
                className="m-0"
              />
              
              <Avatar 
                src={job.logo} 
                alt={job.company}
                className="w-12 h-12"
              />
              
              <Box className="flex-1">
                <Box className="flex items-center gap-2 mb-2">
                  <Typography variant="h6" className="font-bold">
                    {job.title}
                  </Typography>
                  {notifications.has(job.id) && (
                    <Badge badgeContent="!" color="error">
                      <Notifications className="w-5 h-5 text-orange-500" />
                    </Badge>
                  )}
                  {isExpired && (
                    <Chip label="Expired" color="error" size="small" />
                  )}
                  {isExpiringSoon && !isExpired && (
                    <Chip label="Deadline Soon" color="warning" size="small" />
                  )}
                </Box>
                
                <Typography variant="body1" className="font-medium mb-1">
                  {job.company}
                </Typography>
                
                <Box className="flex items-center gap-4 text-sm opacity-70 mb-3">
                  <Box className="flex items-center gap-1">
                    <LocationOn className="w-4 h-4" />
                    {job.location}
                  </Box>
                  <Box className="flex items-center gap-1">
                    <Work className="w-4 h-4" />
                    {job.type}
                  </Box>
                  <Box className="flex items-center gap-1">
                    <Money className="w-4 h-4" />
                    {job.salary}
                  </Box>
                  {job.remote && (
                    <Chip label="Remote" color="primary" size="small" variant="outlined" />
                  )}
                </Box>
              </Box>
            </Box>
            
            <IconButton>
              <MoreVert />
            </IconButton>
          </Box>

          {/* Tags */}
          <Box className="flex flex-wrap gap-2 mb-4">
            {job.tags.slice(0, 4).map((tag, index) => (
              <Chip key={index} label={tag} size="small" variant="outlined" />
            ))}
            {job.tags.length > 4 && (
              <Chip label={`+${job.tags.length - 4} more`} size="small" variant="outlined" />
            )}
          </Box>

          {/* Match Score */}
          <Box className="flex items-center gap-2 mb-4">
            <Typography variant="body2" className="opacity-70">
              Match Score:
            </Typography>
            <Box className="flex items-center gap-2">
              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                  style={{ width: `${job.matchScore}%` }}
                />
              </div>
              <Typography variant="body2" className="font-medium">
                {job.matchScore}%
              </Typography>
            </Box>
          </Box>

          {/* Dates */}
          <Box className="flex justify-between items-center mb-4 text-sm opacity-70">
            <span>Saved: {formatDate(job.savedDate)}</span>
            <span>Deadline: {formatDate(job.applicationDeadline)}</span>
          </Box>

          {/* Actions */}
          <Box className="flex justify-between items-center">
            <Box className="flex gap-2">
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate(`/jobs/${job.id}`)}
                disabled={isExpired}
                className={componentStyles.button.primary}
              >
                {isExpired ? 'View Details' : 'Apply Now'}
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Share />}
              >
                Share
              </Button>
            </Box>
            
            <Box className="flex gap-1">
              <IconButton
                onClick={() => toggleNotification(job.id)}
                color={notifications.has(job.id) ? "primary" : "default"}
              >
                {notifications.has(job.id) ? <Notifications /> : <NotificationsOff />}
              </IconButton>
              <IconButton onClick={() => setJobToDelete(job.id)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  // Render stats cards
  const renderStatsCards = () => {
    const activeJobs = savedJobs.filter(job => job.status === 'active').length;
    const avgMatchScore = savedJobs.reduce((sum, job) => sum + job.matchScore, 0) / savedJobs.length;
    const urgentJobs = savedJobs.filter(job => {
      const days = getDaysUntilDeadline(job.applicationDeadline);
      return days <= 7 && days > 0 && job.status === 'active';
    }).length;

    return (
      <Grid container spacing={3} className="mb-6">
        <Grid item xs={12} sm={6} md={3}>
          <Card className={componentStyles.card}>
            <CardContent className="text-center p-4">
              <Bookmark className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <Typography variant="h4" className="font-bold">
                {savedJobs.length}
              </Typography>
              <Typography variant="body2" className="opacity-70">
                Total Saved
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={componentStyles.card}>
            <CardContent className="text-center p-4">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <Typography variant="h4" className="font-bold">
                {activeJobs}
              </Typography>
              <Typography variant="body2" className="opacity-70">
                Active Jobs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={componentStyles.card}>
            <CardContent className="text-center p-4">
              <Assessment className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <Typography variant="h4" className="font-bold">
                {Math.round(avgMatchScore)}%
              </Typography>
              <Typography variant="body2" className="opacity-70">
                Avg Match
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={componentStyles.card}>
            <CardContent className="text-center p-4">
              <CalendarToday className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <Typography variant="h4" className="font-bold">
                {urgentJobs}
              </Typography>
              <Typography variant="body2" className="opacity-70">
                Urgent
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box className={`min-h-screen ${themeClasses.bg.primary}`}>
      <Container maxWidth="xl" className="py-8">
        {/* Header */}
        <Box className="flex items-center justify-between mb-6">
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
              Saved Jobs
            </Typography>
          </Box>
          
          <Box className="flex gap-2">
            {selectedJobs.size > 0 && (
              <Button
                variant="outlined"
                onClick={bulkRemove}
                startIcon={<Delete />}
                color="error"
              >
                Remove Selected ({selectedJobs.size})
              </Button>
            )}
            <Button
              variant="contained"
              onClick={() => navigate('/jobs')}
              className={componentStyles.button.primary}
            >
              Browse More Jobs
            </Button>
          </Box>
        </Box>

        {/* Stats Cards */}
        {renderStatsCards()}

        {/* Search and Filters */}
        <Card className={`${componentStyles.card} mb-6`}>
          <CardContent className="p-4">
            <Box className="flex flex-wrap gap-4 items-center">
              <TextField
                placeholder="Search saved jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                className="flex-1 min-w-64"
              />
              
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                onClick={(e) => setFilterAnchorEl(e.currentTarget)}
              >
                Filters
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<Sort />}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                Sort
              </Button>
              
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedJobs.size === filteredJobs.length && filteredJobs.length > 0}
                    indeterminate={selectedJobs.size > 0 && selectedJobs.size < filteredJobs.length}
                    onChange={selectAllJobs}
                  />
                }
                label="Select All"
              />
            </Box>
          </CardContent>
        </Card>

        {/* Urgent Jobs Alert */}
        {savedJobs.filter(job => {
          const days = getDaysUntilDeadline(job.applicationDeadline);
          return days <= 7 && days > 0 && job.status === 'active';
        }).length > 0 && (
          <Alert severity="warning" className="mb-6">
            <Typography variant="body1" className="font-medium">
              You have {savedJobs.filter(job => {
                const days = getDaysUntilDeadline(job.applicationDeadline);
                return days <= 7 && days > 0 && job.status === 'active';
              }).length} job(s) with application deadlines in the next 7 days!
            </Typography>
          </Alert>
        )}

        {/* Jobs List */}
        <Box>
          {filteredJobs.length === 0 ? (
            <Card className={componentStyles.card}>
              <CardContent className="text-center py-16">
                <Bookmark className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <Typography variant="h5" className="font-bold mb-2">
                  {searchTerm || Object.values(selectedFilters).some(f => f !== 'all')
                    ? 'No jobs match your criteria'
                    : 'No saved jobs yet'
                  }
                </Typography>
                <Typography variant="body1" className="opacity-70 mb-4">
                  {searchTerm || Object.values(selectedFilters).some(f => f !== 'all')
                    ? 'Try adjusting your search or filters'
                    : 'Start saving jobs you\'re interested in to see them here'
                  }
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate('/jobs')}
                  className={componentStyles.button.primary}
                >
                  Browse Jobs
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Grid container spacing={3}>
              {filteredJobs.map(job => (
                <Grid item xs={12} key={job.id}>
                  {renderJobCard(job)}
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Sort Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => { setSortBy("saved_date"); setAnchorEl(null); }}>
            Most Recently Saved
          </MenuItem>
          <MenuItem onClick={() => { setSortBy("match_score"); setAnchorEl(null); }}>
            Highest Match Score
          </MenuItem>
          <MenuItem onClick={() => { setSortBy("salary"); setAnchorEl(null); }}>
            Highest Salary
          </MenuItem>
          <MenuItem onClick={() => { setSortBy("deadline"); setAnchorEl(null); }}>
            Deadline (Urgent First)
          </MenuItem>
          <MenuItem onClick={() => { setSortBy("company"); setAnchorEl(null); }}>
            Company Name
          </MenuItem>
        </Menu>

        {/* Filter Menu */}
        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={() => setFilterAnchorEl(null)}
        >
          <MenuItem disabled>
            <Typography variant="subtitle2" className="font-bold">
              Category
            </Typography>
          </MenuItem>
          {jobCategories.map(category => (
            <MenuItem 
              key={category.id}
              onClick={() => {
                setSelectedFilters(prev => ({ ...prev, category: category.id }));
                setFilterAnchorEl(null);
              }}
            >
              {category.icon} {category.name} ({category.count})
            </MenuItem>
          ))}
          <Divider />
          <MenuItem disabled>
            <Typography variant="subtitle2" className="font-bold">
              Status
            </Typography>
          </MenuItem>
          {jobStatuses.map(status => (
            <MenuItem 
              key={status.id}
              onClick={() => {
                setSelectedFilters(prev => ({ ...prev, status: status.id }));
                setFilterAnchorEl(null);
              }}
            >
              {status.name} ({status.count})
            </MenuItem>
          ))}
        </Menu>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={!!jobToDelete}
          onClose={() => setJobToDelete(null)}
        >
          <DialogTitle>Remove Saved Job</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to remove this job from your saved list?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setJobToDelete(null)}>
              Cancel
            </Button>
            <Button 
              onClick={() => removeJob(jobToDelete)}
              color="error"
              variant="contained"
            >
              Remove
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default SavedJobs;