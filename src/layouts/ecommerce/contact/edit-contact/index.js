import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/ecommerce/products/new-product/components/Header";
import Footer from "examples/Footer";
import toast from "react-hot-toast";
import config from "config";
import { useParams } from "react-router-dom";
import { DownloadOutlined, Visibility } from "@mui/icons-material";

const bgImage =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function ContactDetails() {
  const { id } = useParams();
  const [contactData, setcontactData] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");


  useEffect(() => {
    const fetchcontactDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.production_url}/contact/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setcontactData(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch contact details.");
      } finally {
        setLoading(false);
      }
    };

    fetchcontactDetails();
  }, [token, id]);

  if (loading) return <Typography>Loading...</Typography>;

  if (!contactData) return <Typography>No contact details available.</Typography>;

  const handleDownloadCV = () => {
    window.open(contactData.cv, "_blank");
    // const link = document.createElement("a");
    // link.href = contactData.cv;
    // link.target = "_blank";
    // link.download = `${contactData.firstName}_${contactData.lastName}_CV.pdf`;
    // link.click();
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
      <Box mt={4} mb={20}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h4" fontWeight="bold" mb={3}>
                contact Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" fontWeight="bold">First Name</Typography>
                  <Typography>{contactData.firstName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" fontWeight="bold">Last Name</Typography>
                  <Typography>{contactData.lastName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" fontWeight="bold">Email</Typography>
                  <Typography>{contactData.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" fontWeight="bold">Mobile</Typography>
                  <Typography>{contactData.phone}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" fontWeight="bold">Message</Typography>
                  <Typography>{contactData.message || "N/A"}</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default ContactDetails;
