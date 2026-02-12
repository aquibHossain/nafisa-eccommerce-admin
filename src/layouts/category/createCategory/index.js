import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Card from "@mui/material/Card";
import { Box, Button } from "@mui/material";

// Charg Dashboard MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// NewProduct page components
import Header from "layouts/ecommerce/products/new-product/components/Header";
import ProductInfo from "layouts/ecommerce/products/new-product/components/ProductInfo";
import Media from "layouts/ecommerce/products/new-product/components/Media";
// import Socials from "layouts/ecommerce/products/new-product/components/Socials";
import Pricing from "layouts/ecommerce/products/new-product/components/Pricing";

// Images
const bgImage =
  "https://cdn.pixabay.com/photo/2018/03/06/08/31/drone-3202860_960_720.jpg";

function getSteps() {
  return ["1. Product Info", "2. Media", "4. Pricing"];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <ProductInfo />;
    case 1:
      return <Media />;
    case 2:
      // return <Socials />;
    case 3:
      return <Pricing />;
    default:
      return null;
  }
}

function NewProduct() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const isLastStep = activeStep === steps.length - 1;

  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);

  return (
    <DashboardLayout
      sx={{
        backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
          `${linearGradient(
            rgba(gradients.info.main, 0.6),
            rgba(gradients.info.state, 0.6)
          )}, url(${bgImage})`,
        backgroundPositionY: "50%",
      }}
    >
      <Header />
      <Box mt={1} mb={20}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Card sx={{ overflow: "visible" }}>
              <Box p={2}>
                <Box>
                  {getStepContent(activeStep)}
                  <Box mt={3} width="100%" display="flex" justifyContent="space-between">
                    {activeStep === 0 ? (
                      <Box />
                    ) : (
                      <Button variant="gradient" color="secondary" onClick={handleBack}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="gradient"
                      color="dark"
                      onClick={!isLastStep ? handleNext : undefined}
                    >
                      {isLastStep ? "Send" : "Next"}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}

export default NewProduct;
