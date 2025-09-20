import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  LinearProgress,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  Schedule as ScheduleIcon,
  Assessment as AssessmentIcon,
  Speed as SpeedIcon,
  MonetizationOn as MoneyIcon,
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as TimeIcon,
  Cancel as CancelIcon,
  Group as GroupIcon,
  DateRange as DateRangeIcon
} from '@mui/icons-material';
import { useTheme } from '../../../context/ThemeContext';
import { getThemeClasses, getComponentStyles } from '../../../styles/themes';

const AnalyticsDashboard = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const componentStyles = getComponentStyles(theme);
  
  const [timeRange, setTimeRange] = useState('30d');

  // Mock analytics data
  const metrics = {
    totalApplications: { value: 1247, change: 12.5, trend: 'up' },
    activeJobs: { value: 23, change: -8.3, trend: 'down' },
    scheduledInterviews: { value: 156, change: 23.1, trend: 'up' },
    hireRate: { value: 18.4, change: 5.2, trend: 'up' },
    avgTimeToHire: { value: 14, change: -2.1, trend: 'down' },
    costPerHire: { value: 3250, change: -12.8, trend: 'down' }
  };


  const topPerformingJobs = [
    { id: 1, title: 'Senior React Developer', applications: 87, qualified: 23, interviews: 12, hires: 3 },
    { id: 2, title: 'Product Manager', applications: 65, qualified: 18, interviews: 8, hires: 2 },
    { id: 3, title: 'UX Designer', applications: 54, qualified: 15, interviews: 7, hires: 2 },
    { id: 4, title: 'DevOps Engineer', applications: 43, qualified: 12, interviews: 5, hires: 1 },
    { id: 5, title: 'Data Scientist', applications: 76, qualified: 20, interviews: 9, hires: 3 }
  ];

  const interviewPerformance = [
    { stage: 'Phone Screen', scheduled: 156, completed: 145, pass_rate: 78 },
    { stage: 'Technical', scheduled: 113, completed: 108, pass_rate: 65 },
    { stage: 'Final', scheduled: 70, completed: 68, pass_rate: 85 },
    { stage: 'Reference', scheduled: 58, completed: 55, pass_rate: 95 }
  ];



  const MetricCard = ({ title, value, unit, change, trend, icon }) => (
    <Card className={themeClasses.surface}>
      <CardContent>
        <Box display="flex" justifyContent="between" alignItems="start" mb={2}>
          <Box>
            <Typography variant="h4" className={themeClasses.text} mb={0.5}>
              {typeof value === 'number' && value > 1000 ? `${(value/1000).toFixed(1)}k` : value}
              {unit && <Typography component="span" variant="h6" className={themeClasses.textSecondary}>{unit}</Typography>}
            </Typography>
            <Typography variant="body2" className={themeClasses.textSecondary}>
              {title}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" color={trend === 'up' ? '#10B981' : '#EF4444'}>
            {icon}
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          {trend === 'up' ? (
            <TrendingUpIcon sx={{ color: '#10B981', fontSize: 16, mr: 0.5 }} />
          ) : (
            <TrendingDownIcon sx={{ color: '#EF4444', fontSize: 16, mr: 0.5 }} />
          )}
          <Typography 
            variant="body2" 
            sx={{ color: trend === 'up' ? '#10B981' : '#EF4444' }}
          >
            {Math.abs(change)}%
          </Typography>
          <Typography variant="body2" className={themeClasses.textSecondary} ml={0.5}>
            vs last period
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  const ChartCard = ({ title, children, height = 300 }) => (
    <Card className={themeClasses.surface}>
      <CardContent>
        <Typography variant="h6" className={themeClasses.text} mb={3}>
          {title}
        </Typography>
        <Box height={height}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );

  const SimpleChart = ({ title }) => (
    <Box>
      <Typography variant="body2" className={themeClasses.textSecondary} mb={2}>
        {title}
      </Typography>
      <Box height="200px" display="flex" alignItems="center" justifyContent="center">
        <Typography variant="body1" className={themeClasses.textSecondary}>
          Chart visualization coming soon
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Box display="flex" justifyContent="between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h4" component="h1" className={themeClasses.text} mb={1}>
              Analytics Dashboard
            </Typography>
            <Typography variant="body1" className={themeClasses.textSecondary}>
              Track hiring performance and key recruitment metrics
            </Typography>
          </Box>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              sx={componentStyles.textField}
            >
              <MenuItem value="7d">Last 7 days</MenuItem>
              <MenuItem value="30d">Last 30 days</MenuItem>
              <MenuItem value="90d">Last 90 days</MenuItem>
              <MenuItem value="1y">Last year</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6} lg={2}>
          <MetricCard
            title="Total Applications"
            value={metrics.totalApplications.value}
            change={metrics.totalApplications.change}
            trend={metrics.totalApplications.trend}
            icon={<PeopleIcon sx={{ color: '#3B82F6' }} />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <MetricCard
            title="Active Jobs"
            value={metrics.activeJobs.value}
            change={metrics.activeJobs.change}
            trend={metrics.activeJobs.trend}
            icon={<WorkIcon sx={{ color: '#10B981' }} />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <MetricCard
            title="Interviews"
            value={metrics.scheduledInterviews.value}
            change={metrics.scheduledInterviews.change}
            trend={metrics.scheduledInterviews.trend}
            icon={<ScheduleIcon sx={{ color: '#F59E0B' }} />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <MetricCard
            title="Hire Rate"
            value={metrics.hireRate.value}
            unit="%"
            change={metrics.hireRate.change}
            trend={metrics.hireRate.trend}
            icon={<CheckCircleIcon sx={{ color: '#10B981' }} />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <MetricCard
            title="Avg Time to Hire"
            value={metrics.avgTimeToHire.value}
            unit=" days"
            change={metrics.avgTimeToHire.change}
            trend={metrics.avgTimeToHire.trend}
            icon={<TimeIcon sx={{ color: '#8B5CF6' }} />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <MetricCard
            title="Cost per Hire"
            value={`$${metrics.costPerHire.value}`}
            change={metrics.costPerHire.change}
            trend={metrics.costPerHire.trend}
            icon={<MoneyIcon sx={{ color: '#EF4444' }} />}
          />
        </Grid>
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} lg={8}>
          <ChartCard title="Application Trends" height={350}>
            <SimpleChart title="Application trends over time" />
          </ChartCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <ChartCard title="Application Sources" height={350}>
            <SimpleChart title="Top application sources" />
          </ChartCard>
        </Grid>
      </Grid>

      {/* Charts Row 2 */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} lg={8}>
          <ChartCard title="Department Performance" height={350}>
            <SimpleChart title="Performance by department" />
          </ChartCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card className={themeClasses.surface}>
            <CardContent>
              <Typography variant="h6" className={themeClasses.text} mb={3}>
                Interview Stage Performance
              </Typography>
              <List dense>
                {interviewPerformance.map((stage, index) => (
                  <React.Fragment key={stage.stage}>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon sx={{ color: '#3B82F6' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={stage.stage}
                        secondary={
                          <Box>
                            <Box display="flex" justifyContent="between" mb={1}>
                              <Typography variant="body2" className={themeClasses.textSecondary}>
                                {stage.completed}/{stage.scheduled} completed
                              </Typography>
                              <Typography variant="body2" className={themeClasses.text}>
                                {stage.pass_rate}% pass rate
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={stage.pass_rate}
                              sx={{
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: '#10B981'
                                }
                              }}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < interviewPerformance.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Top Performing Jobs Table */}
      <Card className={themeClasses.surface}>
        <CardContent>
          <Typography variant="h6" className={themeClasses.text} mb={3}>
            Top Performing Job Postings
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Job Title</TableCell>
                  <TableCell align="right">Applications</TableCell>
                  <TableCell align="right">Qualified</TableCell>
                  <TableCell align="right">Interviews</TableCell>
                  <TableCell align="right">Hires</TableCell>
                  <TableCell align="right">Conversion Rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topPerformingJobs.map((job) => (
                  <TableRow key={job.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" className={themeClasses.text}>
                        {job.title}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Chip 
                        label={job.applications} 
                        size="small" 
                        sx={{ bgcolor: '#EBF8FF', color: '#1E40AF' }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Chip 
                        label={job.qualified} 
                        size="small" 
                        sx={{ bgcolor: '#F0FDF4', color: '#166534' }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Chip 
                        label={job.interviews} 
                        size="small" 
                        sx={{ bgcolor: '#FFFBEB', color: '#92400E' }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Chip 
                        label={job.hires} 
                        size="small" 
                        sx={{ bgcolor: '#FDF2F8', color: '#BE185D' }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box display="flex" alignItems="center" justifyContent="flex-end">
                        <Typography variant="body2" className={themeClasses.text} mr={1}>
                          {((job.hires / job.applications) * 100).toFixed(1)}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={(job.hires / job.applications) * 100}
                          sx={{
                            width: 60,
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#10B981'
                            }
                          }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AnalyticsDashboard;