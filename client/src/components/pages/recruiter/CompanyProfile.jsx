import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Avatar,
  IconButton,
  Chip,
  Tabs,
  Tab,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  LinearProgress,
  Stack
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Upload as UploadIcon,
  Link as LinkIcon,
  Language as WebsiteIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  People as PeopleIcon,
  MonetizationOn as MoneyIcon,
  Star as StarIcon,
  Visibility as VisibilityIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useTheme } from '../../../context/ThemeContext';
import { getThemeClasses, getComponentStyles } from '../../../styles/themes';

const CompanyProfile = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const componentStyles = getComponentStyles(theme);
  
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState({});
  const [addLocationDialog, setAddLocationDialog] = useState(false);
  const [addBenefitDialog, setAddBenefitDialog] = useState(false);

  // Mock company data
  const [companyData, setCompanyData] = useState({
    basicInfo: {
      name: "TechCorp Solutions",
      logo: "/company-logos/techcorp.png",
      tagline: "Innovating the Future of Technology",
      industry: "Software Development",
      size: "501-1000 employees",
      founded: "2015",
      headquarters: "San Francisco, CA",
      website: "https://techcorp.com",
      description: "TechCorp Solutions is a leading technology company specializing in cloud computing, artificial intelligence, and software development. We're committed to creating innovative solutions that transform businesses and improve lives."
    },
    contactInfo: {
      email: "careers@techcorp.com",
      phone: "+1 (555) 123-4567",
      address: "123 Tech Street, San Francisco, CA 94105"
    },
    socialMedia: {
      linkedin: "https://linkedin.com/company/techcorp",
      twitter: "https://twitter.com/techcorp",
      facebook: "https://facebook.com/techcorp",
      instagram: "https://instagram.com/techcorp"
    },
    locations: [
      { id: 1, city: "San Francisco", state: "CA", country: "USA", employees: 450, isHeadquarters: true },
      { id: 2, city: "New York", state: "NY", country: "USA", employees: 280, isHeadquarters: false },
      { id: 3, city: "Austin", state: "TX", country: "USA", employees: 150, isHeadquarters: false },
      { id: 4, city: "London", state: "", country: "UK", employees: 120, isHeadquarters: false }
    ],
    benefits: [
      { id: 1, category: "Health", title: "Health Insurance", description: "Comprehensive medical, dental, and vision coverage" },
      { id: 2, category: "Time Off", title: "Unlimited PTO", description: "Flexible time off policy with minimum 3 weeks" },
      { id: 3, category: "Financial", title: "401(k) Matching", description: "Up to 6% company matching on retirement contributions" },
      { id: 4, category: "Learning", title: "Education Budget", description: "$2,000 annual budget for conferences and courses" },
      { id: 5, category: "Wellness", title: "Gym Membership", description: "Full gym membership or home fitness stipend" },
      { id: 6, category: "Work-Life", title: "Remote Work", description: "Hybrid work model with flexible remote options" }
    ],
    culture: {
      values: ["Innovation", "Collaboration", "Integrity", "Excellence", "Growth"],
      perks: ["Free lunch", "Game room", "Flexible hours", "Pet-friendly office", "Stock options"],
      workEnvironment: "collaborative",
      diversityCommitment: true
    },
    hiring: {
      process: "4-stage process: Application review, Phone screen, Technical interview, Final interview",
      averageTime: "2-3 weeks",
      responseTime: "Within 1 week",
      interviewFormat: "Virtual and in-person options available"
    }
  });

  const [newLocation, setNewLocation] = useState({
    city: '',
    state: '',
    country: '',
    employees: '',
    isHeadquarters: false
  });

  const [newBenefit, setNewBenefit] = useState({
    category: '',
    title: '',
    description: ''
  });

  const benefitCategories = ["Health", "Financial", "Time Off", "Learning", "Wellness", "Work-Life", "Other"];

  const tabConfig = [
    { label: 'Basic Info', icon: <BusinessIcon /> },
    { label: 'Locations', icon: <LocationIcon /> },
    { label: 'Benefits & Culture', icon: <StarIcon /> },
    { label: 'Hiring Process', icon: <PeopleIcon /> },
    { label: 'Settings', icon: <SettingsIcon /> }
  ];

  const handleEdit = (section) => {
    setEditMode({ ...editMode, [section]: true });
  };

  const handleSave = (section) => {
    setEditMode({ ...editMode, [section]: false });
    // Here you would typically save to backend
  };

  const handleCancel = (section) => {
    setEditMode({ ...editMode, [section]: false });
    // Reset form data here if needed
  };

  const BasicInfoTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card className={themeClasses.surface}>
          <CardContent>
            <Box textAlign="center">
              <Avatar
                src={companyData.basicInfo.logo}
                sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
              >
                {companyData.basicInfo.name.charAt(0)}
              </Avatar>
              <Button
                variant="outlined"
                startIcon={<UploadIcon />}
                size="small"
              >
                Upload Logo
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={8}>
        <Card className={themeClasses.surface}>
          <CardContent>
            <Box display="flex" justifyContent="between" alignItems="center" mb={3}>
              <Typography variant="h6" className={themeClasses.text}>
                Company Information
              </Typography>
              {!editMode.basicInfo ? (
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => handleEdit('basicInfo')}
                >
                  Edit
                </Button>
              ) : (
                <Box display="flex" gap={1}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={() => handleSave('basicInfo')}
                    sx={componentStyles.button}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={() => handleCancel('basicInfo')}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company Name"
                  value={companyData.basicInfo.name}
                  disabled={!editMode.basicInfo}
                  onChange={(e) => setCompanyData({
                    ...companyData,
                    basicInfo: { ...companyData.basicInfo, name: e.target.value }
                  })}
                  sx={componentStyles.textField}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tagline"
                  value={companyData.basicInfo.tagline}
                  disabled={!editMode.basicInfo}
                  onChange={(e) => setCompanyData({
                    ...companyData,
                    basicInfo: { ...companyData.basicInfo, tagline: e.target.value }
                  })}
                  sx={componentStyles.textField}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Industry"
                  value={companyData.basicInfo.industry}
                  disabled={!editMode.basicInfo}
                  onChange={(e) => setCompanyData({
                    ...companyData,
                    basicInfo: { ...companyData.basicInfo, industry: e.target.value }
                  })}
                  sx={componentStyles.textField}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={componentStyles.textField}>
                  <InputLabel>Company Size</InputLabel>
                  <Select
                    value={companyData.basicInfo.size}
                    disabled={!editMode.basicInfo}
                    onChange={(e) => setCompanyData({
                      ...companyData,
                      basicInfo: { ...companyData.basicInfo, size: e.target.value }
                    })}
                  >
                    <MenuItem value="1-10 employees">1-10 employees</MenuItem>
                    <MenuItem value="11-50 employees">11-50 employees</MenuItem>
                    <MenuItem value="51-200 employees">51-200 employees</MenuItem>
                    <MenuItem value="201-500 employees">201-500 employees</MenuItem>
                    <MenuItem value="501-1000 employees">501-1000 employees</MenuItem>
                    <MenuItem value="1000+ employees">1000+ employees</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Founded"
                  value={companyData.basicInfo.founded}
                  disabled={!editMode.basicInfo}
                  onChange={(e) => setCompanyData({
                    ...companyData,
                    basicInfo: { ...companyData.basicInfo, founded: e.target.value }
                  })}
                  sx={componentStyles.textField}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Website"
                  value={companyData.basicInfo.website}
                  disabled={!editMode.basicInfo}
                  onChange={(e) => setCompanyData({
                    ...companyData,
                    basicInfo: { ...companyData.basicInfo, website: e.target.value }
                  })}
                  sx={componentStyles.textField}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Company Description"
                  value={companyData.basicInfo.description}
                  disabled={!editMode.basicInfo}
                  onChange={(e) => setCompanyData({
                    ...companyData,
                    basicInfo: { ...companyData.basicInfo, description: e.target.value }
                  })}
                  sx={componentStyles.textField}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card className={themeClasses.surface}>
          <CardContent>
            <Box display="flex" justifyContent="between" alignItems="center" mb={3}>
              <Typography variant="h6" className={themeClasses.text}>
                Contact & Social Media
              </Typography>
              {!editMode.contact ? (
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => handleEdit('contact')}
                >
                  Edit
                </Button>
              ) : (
                <Box display="flex" gap={1}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={() => handleSave('contact')}
                    sx={componentStyles.button}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={() => handleCancel('contact')}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Email"
                  value={companyData.contactInfo.email}
                  disabled={!editMode.contact}
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 1 }} className={themeClasses.textSecondary} />
                  }}
                  sx={componentStyles.textField}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={companyData.contactInfo.phone}
                  disabled={!editMode.contact}
                  InputProps={{
                    startAdornment: <PhoneIcon sx={{ mr: 1 }} className={themeClasses.textSecondary} />
                  }}
                  sx={componentStyles.textField}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Address"
                  value={companyData.contactInfo.address}
                  disabled={!editMode.contact}
                  InputProps={{
                    startAdornment: <LocationIcon sx={{ mr: 1 }} className={themeClasses.textSecondary} />
                  }}
                  sx={componentStyles.textField}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="LinkedIn"
                  value={companyData.socialMedia.linkedin}
                  disabled={!editMode.contact}
                  InputProps={{
                    startAdornment: <LinkedInIcon sx={{ mr: 1 }} className={themeClasses.textSecondary} />
                  }}
                  sx={componentStyles.textField}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Twitter"
                  value={companyData.socialMedia.twitter}
                  disabled={!editMode.contact}
                  InputProps={{
                    startAdornment: <TwitterIcon sx={{ mr: 1 }} className={themeClasses.textSecondary} />
                  }}
                  sx={componentStyles.textField}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Facebook"
                  value={companyData.socialMedia.facebook}
                  disabled={!editMode.contact}
                  InputProps={{
                    startAdornment: <FacebookIcon sx={{ mr: 1 }} className={themeClasses.textSecondary} />
                  }}
                  sx={componentStyles.textField}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Instagram"
                  value={companyData.socialMedia.instagram}
                  disabled={!editMode.contact}
                  InputProps={{
                    startAdornment: <InstagramIcon sx={{ mr: 1 }} className={themeClasses.textSecondary} />
                  }}
                  sx={componentStyles.textField}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const LocationsTab = () => (
    <Box>
      <Box display="flex" justifyContent="between" alignItems="center" mb={3}>
        <Typography variant="h6" className={themeClasses.text}>
          Office Locations
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddLocationDialog(true)}
          sx={componentStyles.button}
        >
          Add Location
        </Button>
      </Box>

      <Grid container spacing={3}>
        {companyData.locations.map((location) => (
          <Grid item xs={12} md={6} lg={4} key={location.id}>
            <Card className={themeClasses.surface}>
              <CardContent>
                <Box display="flex" justifyContent="between" alignItems="start" mb={2}>
                  <Box>
                    <Typography variant="h6" className={themeClasses.text}>
                      {location.city}
                      {location.isHeadquarters && (
                        <Chip
                          label="HQ"
                          size="small"
                          color="primary"
                          sx={{ ml: 1 }}
                        />
                      )}
                    </Typography>
                    <Typography variant="body2" className={themeClasses.textSecondary}>
                      {location.state && `${location.state}, `}{location.country}
                    </Typography>
                  </Box>
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Box display="flex" alignItems="center">
                  <PeopleIcon sx={{ fontSize: 16, mr: 1 }} className={themeClasses.textSecondary} />
                  <Typography variant="body2" className={themeClasses.textSecondary}>
                    {location.employees} employees
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Location Dialog */}
      <Dialog open={addLocationDialog} onClose={() => setAddLocationDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Location</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="City"
                  value={newLocation.city}
                  onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
                  sx={componentStyles.textField}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="State/Province"
                  value={newLocation.state}
                  onChange={(e) => setNewLocation({ ...newLocation, state: e.target.value })}
                  sx={componentStyles.textField}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Country"
                  value={newLocation.country}
                  onChange={(e) => setNewLocation({ ...newLocation, country: e.target.value })}
                  sx={componentStyles.textField}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Number of Employees"
                  type="number"
                  value={newLocation.employees}
                  onChange={(e) => setNewLocation({ ...newLocation, employees: e.target.value })}
                  sx={componentStyles.textField}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={newLocation.isHeadquarters}
                      onChange={(e) => setNewLocation({ ...newLocation, isHeadquarters: e.target.checked })}
                    />
                  }
                  label="This is the headquarters"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddLocationDialog(false)}>Cancel</Button>
          <Button variant="contained" sx={componentStyles.button}>Add Location</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  const BenefitsCultureTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <Card className={themeClasses.surface}>
          <CardContent>
            <Box display="flex" justifyContent="between" alignItems="center" mb={3}>
              <Typography variant="h6" className={themeClasses.text}>
                Employee Benefits
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setAddBenefitDialog(true)}
                sx={componentStyles.button}
              >
                Add Benefit
              </Button>
            </Box>

            <Grid container spacing={2}>
              {companyData.benefits.map((benefit) => (
                <Grid item xs={12} md={6} key={benefit.id}>
                  <Paper className={themeClasses.background} sx={{ p: 2 }}>
                    <Box display="flex" justifyContent="between" alignItems="start" mb={1}>
                      <Chip label={benefit.category} size="small" color="primary" />
                      <IconButton size="small" color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography variant="subtitle2" className={themeClasses.text} mb={1}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" className={themeClasses.textSecondary}>
                      {benefit.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Add Benefit Dialog */}
        <Dialog open={addBenefitDialog} onClose={() => setAddBenefitDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Benefit</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth sx={componentStyles.textField}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={newBenefit.category}
                      onChange={(e) => setNewBenefit({ ...newBenefit, category: e.target.value })}
                    >
                      {benefitCategories.map((category) => (
                        <MenuItem key={category} value={category}>{category}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Benefit Title"
                    value={newBenefit.title}
                    onChange={(e) => setNewBenefit({ ...newBenefit, title: e.target.value })}
                    sx={componentStyles.textField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description"
                    value={newBenefit.description}
                    onChange={(e) => setNewBenefit({ ...newBenefit, description: e.target.value })}
                    sx={componentStyles.textField}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddBenefitDialog(false)}>Cancel</Button>
            <Button variant="contained" sx={componentStyles.button}>Add Benefit</Button>
          </DialogActions>
        </Dialog>
      </Grid>

      <Grid item xs={12} lg={4}>
        <Card className={themeClasses.surface}>
          <CardContent>
            <Typography variant="h6" className={themeClasses.text} mb={3}>
              Company Culture
            </Typography>
            
            <Box mb={3}>
              <Typography variant="subtitle2" className={themeClasses.text} mb={1}>
                Core Values
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {companyData.culture.values.map((value, index) => (
                  <Chip key={index} label={value} variant="outlined" size="small" />
                ))}
              </Stack>
            </Box>

            <Box mb={3}>
              <Typography variant="subtitle2" className={themeClasses.text} mb={1}>
                Office Perks
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {companyData.culture.perks.map((perk, index) => (
                  <Chip key={index} label={perk} color="secondary" size="small" />
                ))}
              </Stack>
            </Box>

            <Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={companyData.culture.diversityCommitment}
                    onChange={(e) => setCompanyData({
                      ...companyData,
                      culture: { ...companyData.culture, diversityCommitment: e.target.checked }
                    })}
                  />
                }
                label="Diversity & Inclusion Commitment"
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const HiringProcessTab = () => (
    <Card className={themeClasses.surface}>
      <CardContent>
        <Box display="flex" justifyContent="between" alignItems="center" mb={3}>
          <Typography variant="h6" className={themeClasses.text}>
            Hiring Process Information
          </Typography>
          {!editMode.hiring ? (
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => handleEdit('hiring')}
            >
              Edit
            </Button>
          ) : (
            <Box display="flex" gap={1}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={() => handleSave('hiring')}
                sx={componentStyles.button}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={() => handleCancel('hiring')}
              >
                Cancel
              </Button>
            </Box>
          )}
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Hiring Process Description"
              value={companyData.hiring.process}
              disabled={!editMode.hiring}
              onChange={(e) => setCompanyData({
                ...companyData,
                hiring: { ...companyData.hiring, process: e.target.value }
              })}
              sx={componentStyles.textField}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Average Hiring Time"
              value={companyData.hiring.averageTime}
              disabled={!editMode.hiring}
              onChange={(e) => setCompanyData({
                ...companyData,
                hiring: { ...companyData.hiring, averageTime: e.target.value }
              })}
              sx={componentStyles.textField}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Response Time"
              value={companyData.hiring.responseTime}
              disabled={!editMode.hiring}
              onChange={(e) => setCompanyData({
                ...companyData,
                hiring: { ...companyData.hiring, responseTime: e.target.value }
              })}
              sx={componentStyles.textField}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Interview Format"
              value={companyData.hiring.interviewFormat}
              disabled={!editMode.hiring}
              onChange={(e) => setCompanyData({
                ...companyData,
                hiring: { ...companyData.hiring, interviewFormat: e.target.value }
              })}
              sx={componentStyles.textField}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const SettingsTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card className={themeClasses.surface}>
          <CardContent>
            <Typography variant="h6" className={themeClasses.text} mb={3}>
              Profile Visibility
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Public Profile"
                  secondary="Make company profile visible to job seekers"
                />
                <ListItemSecondaryAction>
                  <Switch defaultChecked />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Featured Employer"
                  secondary="Highlight company in job search results"
                />
                <ListItemSecondaryAction>
                  <Switch />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Salary Information"
                  secondary="Display salary ranges in job postings"
                />
                <ListItemSecondaryAction>
                  <Switch defaultChecked />
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
              Profile Completeness
            </Typography>
            <Box mb={2}>
              <Box display="flex" justifyContent="between" mb={1}>
                <Typography variant="body2" className={themeClasses.text}>
                  Profile Completion
                </Typography>
                <Typography variant="body2" className={themeClasses.text}>
                  85%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={85}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#10B981'
                  }
                }}
              />
            </Box>
            <Alert severity="info" sx={{ mb: 2 }}>
              Complete your profile to attract more qualified candidates
            </Alert>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon sx={{ color: '#10B981' }} />
                </ListItemIcon>
                <ListItemText primary="Basic company information" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon sx={{ color: '#10B981' }} />
                </ListItemIcon>
                <ListItemText primary="Company logo and description" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CancelIcon sx={{ color: '#EF4444' }} />
                </ListItemIcon>
                <ListItemText primary="Company videos or virtual tour" />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" className={themeClasses.text} mb={1}>
          Company Profile
        </Typography>
        <Typography variant="body1" className={themeClasses.textSecondary} mb={2}>
          Manage your company information and employer brand
        </Typography>
        
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            startIcon={<VisibilityIcon />}
            href="/company-preview"
            target="_blank"
          >
            Preview Public Profile
          </Button>
        </Box>
      </Box>

      {/* Tabs */}
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

      {/* Tab Content */}
      {activeTab === 0 && <BasicInfoTab />}
      {activeTab === 1 && <LocationsTab />}
      {activeTab === 2 && <BenefitsCultureTab />}
      {activeTab === 3 && <HiringProcessTab />}
      {activeTab === 4 && <SettingsTab />}
    </Container>
  );
};

export default CompanyProfile;