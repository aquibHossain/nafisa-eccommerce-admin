import axios from "axios";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Card from "@mui/material/Card";
import { Box, Button } from "@mui/material";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import Header from "layouts/ecommerce/products/new-product/components/Header";
import ProductInfo from "layouts/ecommerce/products/new-product/components/ProductInfo";
import Media from "layouts/ecommerce/products/new-product/components/Media";
import Pricing from "layouts/ecommerce/products/new-product/components/Pricing";
import toast from "react-hot-toast";
import config from "config";

const bgImage =
  "https://raw.githubusercontent.com/amartheme/public-assets/master/amar-dashboard-pro/assets/img/profile-layout-header.jpg";

function getSteps() {
  return ["1. Product Info", "2. Media", "3. Pricing"];
}

function getStepContent(stepIndex, formData, setFormData) {
  switch (stepIndex) {
    case 0:
      return <ProductInfo formData={formData} setFormData={setFormData} />;
    case 1:
      return <Media formData={formData} setFormData={setFormData} />;
    case 2:
      return <Pricing formData={formData} setFormData={setFormData} />;
    default:
      return null;
  }
}

function NewProduct() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: null,
    price: 0,
    displayPrice: 0,
    ratings: 0,
    sku: "",
    tags: [],
    status: true,
    youtube: "",
  });

  const steps = getSteps();
  const isLastStep = activeStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      handleSubmit();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => setActiveStep(activeStep - 1);

  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("You are not authorized. Please log in.");
    return;
  }

  const handleSubmit = async () => {
    try {
      const payload = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "productImage" && Array.isArray(formData[key])) {
          formData[key].forEach((imgObj) => {
            if (imgObj.file) {
              payload.append("productImage", imgObj.file);
            }
          });
        } else if (key === "image" && formData[key]?.file) {
          payload.append("image", formData[key].file);
        } else if (key === "inventory" && Array.isArray(formData[key])) {
          const inventoryData = formData[key].map((item) => {
            if (item.img?.file) {
              payload.append("img", item.img.file); // Append inventory image file
            }
            return {
              productName: item.productName,
              quantity: parseInt(item.quantity),
              inStock: item.inStock,
              price: item.price,
              displayPrice: item.displayPrice,
            };
          });

          payload.append("inventory", JSON.stringify(inventoryData));
        } else if (key === "tags" || key === "variants") {
          payload.append(key, JSON.stringify(formData[key]));
        } else {
          payload.append(key, formData[key]);
        }
      });

      // Send the request
      const response = await axios.post(`${config.production_url}/item/create-product`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      toast.success("Product created successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error creating product:", error);
    }
  };


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
      <Box mt={10} mb={20}>
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
                {getStepContent(activeStep, formData, setFormData)}
                <Box mt={3} width="100%" display="flex" justifyContent="space-between">
                  {activeStep === 0 ? (
                    <Box />
                  ) : (
                    <Button variant="gradient" color="secondary" onClick={handleBack}>
                      Back
                    </Button>
                  )}
                  <Button variant="gradient" color="dark" onClick={handleNext}>
                    {isLastStep ? "Send" : "Next"}
                  </Button>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default NewProduct;
