// React & React Router
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// MUI components
import { Container, Box, Card, CardContent, Stepper, Step, StepLabel, StepButton } from '@mui/material';

// Components
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import OrderSummary from './OrderSummary';
import ShoppingPage from './ShoppingPage';
import OrderSuccessPage from './OrderSuccessPage';

// Configuration for each step in the process
const stepsConfig = [
  {
    label: 'רשימת קניות',
    path: '/step1',
    component: (goToStep) => (<ShoppingPage onNextStep={() => goToStep(1)} onGoToStep2={() => goToStep(1)} />),
  },
  {
    label: 'סיכום הזמנה',
    path: '/step2',
    component: (goToStep) => (<OrderSummary onGoBack={() => goToStep(0)} onGoToStep2={() => goToStep(1)} />),
  },
  {
    label: 'הזמנה בוצעה',
    path: '/step3',
    component: (goToStep) => (<OrderSuccessPage onStartOver={() => goToStep(0)} />),
  },
];

// Function to get step index from path
const getStepFromPath = (pathname) => {
  const index = stepsConfig.findIndex(step => step.path === pathname);
  return index === -1 ? 0 : index;
};

const OrderSteps = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [activeStep, setActiveStep] = useState(getStepFromPath(location.pathname));

  useEffect(() => {
    // Update active step when path changes
    const currentStep = getStepFromPath(location.pathname);
    setActiveStep(currentStep);

    // Auto-redirect from "/" to "/step1" if needed
    if (location.pathname === '/' && currentStep !== 0) {
      navigate(stepsConfig[0].path, { replace: true });
    }
  }, [location.pathname, navigate]);

  // Navigate to step by index
  const handleStepClick = (step) => {
    if (step >= 0 && step < stepsConfig.length) {
      navigate(stepsConfig[step].path);
    }
  };

  const goToStep = (step) => handleStepClick(step);

  return (
    <Box>
      <Container maxWidth="xl" sx={{ pt: 4, pb: 4, position: 'relative', zIndex: 1, width: '95%' }}>
        <Card>
          <CardContent sx={{ p: 6 }}>
            <Header />
            {/* Show Stepper unless on last step */}
            {activeStep < stepsConfig.length - 1 && (
              <Box mb={4}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {stepsConfig.slice(0, stepsConfig.length - 1).map(({ label }, index) => (
                    <Step key={label}>
                      <StepButton onClick={() => handleStepClick(index)}>
                        <StepLabel>{label}</StepLabel>
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            )}
            {/* Show the relevant content component */}
            {stepsConfig[activeStep].component(goToStep)}
            <Footer />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default OrderSteps;
