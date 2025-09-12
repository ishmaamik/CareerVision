import React, { useState, useEffect } from 'react';
import { 
  getAllCompany, 
  getCompanyFromName 
} from '../../api/company/company';
import { 
  Button, 
  Tabs, 
  Tab, 
  Card, 
  CardContent, 
  Typography, 
  Dialog, 
  DialogTitle, 
  DialogContent 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CompaniesPage = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openCompanyDialog, setOpenCompanyDialog] = useState(false);

  // Fetch companies on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companyList = await getAllCompany();
        setCompanies(companyList);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    fetchCompanies();
  }, []);

  // Handle company details view
  const handleViewCompanyDetails = async (companyName) => {
    try {
      const { company } = await getCompanyFromName(companyName);
      setSelectedCompany(company);
      setOpenCompanyDialog(true);
    } catch (error) {
      console.error('Error fetching company details:', error);
    }
  };

  // Tabs configuration
  const tabs = [
    {
      label: 'All Companies',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map(company => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow">
              <CardContent>
                <Typography variant="h5" component="div">
                  {company.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="mb-4">
                  {company.location}
                </Typography>
                <div className="flex justify-between items-center">
                  <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={() => handleViewCompanyDetails(company.name)}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => navigate(`/interview-questions?company=${company.id}`)}
                  >
                    Interview Questions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    },
    {
      label: 'Top Companies',
      content: (
        <div className="text-center py-12">
          <Typography variant="h4" className="mb-6">
            Top Companies Coming Soon
          </Typography>
          <Typography variant="body1" color="text.secondary">
            We're working on curating a list of top companies. Stay tuned!
          </Typography>
        </div>
      )
    },
    {
      label: 'Create Company',
      content: (
        <div className="text-center py-12">
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate('/company/create')}
          >
            Create New Company Profile
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="container mx-auto p-12">
      <h1 className="text-3xl font-bold mb-6">Companies</h1>

      {/* Tabs */}
      <Tabs 
        value={selectedTab} 
        onChange={(e, newValue) => setSelectedTab(newValue)}
        variant="fullWidth"
        className="mb-6"
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>

      {/* Tab Content */}
      {tabs[selectedTab].content}

      {/* Company Details Dialog */}
      <Dialog 
        open={openCompanyDialog} 
        onClose={() => setOpenCompanyDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedCompany && (
          <>
            <DialogTitle>{selectedCompany.name}</DialogTitle>
            <DialogContent>
              <div className="space-y-4">
                <Typography variant="h6">Overview</Typography>
                <Typography variant="body1">{selectedCompany.overview}</Typography>
                
                <Typography variant="h6" className="mt-4">Location</Typography>
                <Typography variant="body1">{selectedCompany.location}</Typography>
                
                <Typography variant="h6" className="mt-4">Commitment</Typography>
                <Typography variant="body1">{selectedCompany.commitment}</Typography>
                
                <div className="flex justify-end space-x-4 mt-6">
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => {
                      navigate(`/interview-questions?company=${selectedCompany.id}`);
                      setOpenCompanyDialog(false);
                    }}
                  >
                    View Interview Questions
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={() => setOpenCompanyDialog(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default CompaniesPage;
