import React, { useState } from "react";
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
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  MoreVert as MoreVertIcon,
  FilterList as FilterIcon,
  Work as WorkIcon,
  People as PeopleIcon,
  Schedule as ScheduleIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Business as BusinessIcon,
  CalendarToday as CalendarIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";
import { useTheme } from "../../../context/ThemeContext";
import { getThemeClasses, getComponentStyles } from "../../../styles/themes";

const JobManagement = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const componentStyles = getComponentStyles(theme);

  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [anchorEl, setAnchorEl] = useState(null);
  const [newJobDialog, setNewJobDialog] = useState(false);

  // Mock job data
  const jobs = [
    {
      id: 1,
      title: "Senior React Developer",
      department: "Engineering",
      status: "Active",
      applications: 45,
      views: 234,
      postedDate: "2024-01-15",
      expiryDate: "2024-02-15",
      salary: "$120,000 - $150,000",
      location: "San Francisco, CA",
      type: "Full-time",
      remote: true,
      description:
        "We are looking for a Senior React Developer to join our dynamic engineering team...",
      requirements: [
        "5+ years React experience",
        "Strong TypeScript skills",
        "Experience with Redux",
      ],
      featured: true,
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      status: "Active",
      applications: 32,
      views: 189,
      postedDate: "2024-01-12",
      expiryDate: "2024-02-12",
      salary: "$130,000 - $160,000",
      location: "New York, NY",
      type: "Full-time",
      remote: false,
      description:
        "Join our product team to drive innovation and product strategy...",
      requirements: [
        "5+ years PM experience",
        "Technical background",
        "Analytics skills",
      ],
      featured: false,
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      status: "Draft",
      applications: 0,
      views: 0,
      postedDate: "2024-01-10",
      expiryDate: "2024-02-10",
      salary: "$90,000 - $120,000",
      location: "Remote",
      type: "Full-time",
      remote: true,
      description:
        "Design beautiful and intuitive user experiences for our products...",
      requirements: [
        "3+ years UX design",
        "Figma proficiency",
        "User research experience",
      ],
      featured: false,
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Engineering",
      status: "Closed",
      applications: 67,
      views: 345,
      postedDate: "2023-12-20",
      expiryDate: "2024-01-20",
      salary: "$110,000 - $140,000",
      location: "Austin, TX",
      type: "Full-time",
      remote: true,
      description:
        "Build and maintain our cloud infrastructure and deployment pipelines...",
      requirements: [
        "AWS expertise",
        "Kubernetes experience",
        "CI/CD knowledge",
      ],
      featured: false,
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "success";
      case "draft":
        return "warning";
      case "closed":
        return "error";
      case "paused":
        return "info";
      default:
        return "default";
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const JobCard = ({ job }) => (
    <Card
      className={`${themeClasses.surface} hover:shadow-lg transition-all duration-300`}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="between"
          alignItems="flex-start"
          mb={2}
        >
          <Box flex={1}>
            <Box display="flex" alignItems="center" mb={1}>
              <Typography variant="h6" className={themeClasses.text}>
                {job.title}
              </Typography>
              {job.featured && (
                <Chip
                  label="Featured"
                  size="small"
                  color="primary"
                  sx={{ ml: 1 }}
                />
              )}
            </Box>
            <Typography
              variant="body2"
              className={themeClasses.textSecondary}
              mb={1}
            >
              {job.department} • Posted{" "}
              {new Date(job.postedDate).toLocaleDateString()}
            </Typography>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Box display="flex" alignItems="center">
                <LocationIcon
                  sx={{ fontSize: 16, mr: 0.5 }}
                  className={themeClasses.textSecondary}
                />
                <Typography
                  variant="body2"
                  className={themeClasses.textSecondary}
                >
                  {job.location}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <MoneyIcon
                  sx={{ fontSize: 16, mr: 0.5 }}
                  className={themeClasses.textSecondary}
                />
                <Typography
                  variant="body2"
                  className={themeClasses.textSecondary}
                >
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
            <IconButton size="small" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>

        <Typography
          variant="body2"
          className={themeClasses.textSecondary}
          mb={2}
        >
          {job.description.substring(0, 100)}...
        </Typography>

        <Grid container spacing={2} mb={2}>
          <Grid item xs={4}>
            <Box textAlign="center">
              <Typography variant="h6" className={themeClasses.text}>
                {job.applications}
              </Typography>
              <Typography
                variant="body2"
                className={themeClasses.textSecondary}
              >
                Applications
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box textAlign="center">
              <Typography variant="h6" className={themeClasses.text}>
                {job.views}
              </Typography>
              <Typography
                variant="body2"
                className={themeClasses.textSecondary}
              >
                Views
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box textAlign="center">
              <Typography variant="h6" className={themeClasses.text}>
                {Math.round((job.applications / (job.views || 1)) * 100)}%
              </Typography>
              <Typography
                variant="body2"
                className={themeClasses.textSecondary}
              >
                Conv. Rate
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Button
          variant="outlined"
          startIcon={<ViewIcon />}
          sx={componentStyles.button}
        >
          View Applications
        </Button>
        <Button variant="text" startIcon={<EditIcon />}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );

  const JobTableRow = ({ job }) => (
    <TableRow hover>
      <TableCell>
        <Box display="flex" alignItems="center">
          <Avatar sx={{ mr: 2, bgcolor: "#3B82F6" }}>
            <WorkIcon />
          </Avatar>
          <Box>
            <Typography variant="subtitle2" className={themeClasses.text}>
              {job.title}
            </Typography>
            <Typography variant="body2" className={themeClasses.textSecondary}>
              {job.department}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Chip
          label={job.status}
          color={getStatusColor(job.status)}
          size="small"
        />
      </TableCell>
      <TableCell>{job.applications}</TableCell>
      <TableCell>{job.views}</TableCell>
      <TableCell>{new Date(job.postedDate).toLocaleDateString()}</TableCell>
      <TableCell>{new Date(job.expiryDate).toLocaleDateString()}</TableCell>
      <TableCell>
        <IconButton size="small" onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      job.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const NewJobDialog = () => (
    <Dialog
      open={newJobDialog}
      onClose={() => setNewJobDialog(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Create New Job Posting</DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ pt: 2 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Job Title"
              sx={componentStyles.textField}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth sx={componentStyles.textField}>
              <InputLabel>Department</InputLabel>
              <Select>
                <MenuItem value="engineering">Engineering</MenuItem>
                <MenuItem value="product">Product</MenuItem>
                <MenuItem value="design">Design</MenuItem>
                <MenuItem value="marketing">Marketing</MenuItem>
                <MenuItem value="sales">Sales</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Location"
              sx={componentStyles.textField}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth sx={componentStyles.textField}>
              <InputLabel>Job Type</InputLabel>
              <Select>
                <MenuItem value="full-time">Full-time</MenuItem>
                <MenuItem value="part-time">Part-time</MenuItem>
                <MenuItem value="contract">Contract</MenuItem>
                <MenuItem value="internship">Internship</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Salary Range"
              placeholder="e.g., $80,000 - $120,000"
              sx={componentStyles.textField}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={<Switch />}
              label="Remote Work Available"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Job Description"
              sx={componentStyles.textField}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Requirements"
              placeholder="Enter each requirement on a new line"
              sx={componentStyles.textField}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setNewJobDialog(false)}>Cancel</Button>
        <Button variant="contained" sx={componentStyles.button}>
          Save as Draft
        </Button>
        <Button variant="contained" sx={componentStyles.button}>
          Post Job
        </Button>
      </DialogActions>
    </Dialog>
  );

  const tabConfig = [
    { label: "Card View", icon: <WorkIcon /> },
    { label: "Table View", icon: <AssessmentIcon /> },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Box display="flex" justifyContent="between" alignItems="center" mb={3}>
          <Box>
            <Typography
              variant="h4"
              component="h1"
              className={themeClasses.text}
              mb={1}
            >
              Job Management
            </Typography>
            <Typography variant="body1" className={themeClasses.textSecondary}>
              Create, manage, and track your job postings
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setNewJobDialog(true)}
            sx={componentStyles.button}
          >
            Post New Job
          </Button>
        </Box>

        {/* Stats */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={3}>
            <Card className={themeClasses.surface}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <WorkIcon sx={{ color: "#3B82F6", mr: 2 }} />
                  <Box>
                    <Typography variant="h6" className={themeClasses.text}>
                      {jobs.filter((j) => j.status === "Active").length}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={themeClasses.textSecondary}
                    >
                      Active Jobs
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
                  <PeopleIcon sx={{ color: "#10B981", mr: 2 }} />
                  <Box>
                    <Typography variant="h6" className={themeClasses.text}>
                      {jobs.reduce((sum, job) => sum + job.applications, 0)}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={themeClasses.textSecondary}
                    >
                      Total Applications
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
                  <TrendingUpIcon sx={{ color: "#F59E0B", mr: 2 }} />
                  <Box>
                    <Typography variant="h6" className={themeClasses.text}>
                      {jobs.reduce((sum, job) => sum + job.views, 0)}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={themeClasses.textSecondary}
                    >
                      Total Views
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
                  <ScheduleIcon sx={{ color: "#8B5CF6", mr: 2 }} />
                  <Box>
                    <Typography variant="h6" className={themeClasses.text}>
                      {jobs.filter((j) => j.status === "Draft").length}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={themeClasses.textSecondary}
                    >
                      Draft Jobs
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search and Filters */}
        <Grid container spacing={2} alignItems="center" mb={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search jobs by title or department..."
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
                startAdornment={<FilterIcon sx={{ mr: 1 }} />}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
                <MenuItem value="paused">Paused</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Alert severity="info">{filteredJobs.length} jobs found</Alert>
          </Grid>
        </Grid>
      </Box>

      {/* View Toggle */}
      <Box mb={3}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            "& .MuiTab-root": {
              minHeight: "48px",
              color: themeClasses.textSecondary,
            },
            "& .Mui-selected": {
              color: "#3B82F6 !important",
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
          {filteredJobs.map((job) => (
            <Grid item xs={12} md={6} lg={4} key={job.id}>
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>
      )}

      {activeTab === 1 && (
        <TableContainer component={Paper} className={themeClasses.surface}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Job Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Applications</TableCell>
                <TableCell>Views</TableCell>
                <TableCell>Posted Date</TableCell>
                <TableCell>Expiry Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredJobs.map((job) => (
                <JobTableRow key={job.id} job={job} />
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
          View Applications
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <EditIcon sx={{ mr: 1 }} />
          Edit Job
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <CalendarIcon sx={{ mr: 1 }} />
          Schedule Interviews
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <DeleteIcon sx={{ mr: 1, color: "error.main" }} />
          Delete Job
        </MenuItem>
      </Menu>

      {/* New Job Dialog */}
      <NewJobDialog />
    </Container>
  );
};

export default JobManagement;
