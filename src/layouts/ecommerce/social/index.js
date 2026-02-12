import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/ecommerce/products/new-product/components/Header";
import FormField from "layouts/applications/wizard/components/FormField";
import Footer from "examples/Footer";
import toast from "react-hot-toast";
import config from "config";
import { CloseOutlined } from "@mui/icons-material";
import { useParams } from "react-router-dom";

const bgImage =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function EditSocial() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    tiktok: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          image: file,
          preview: URL.createObjectURL(file), // Generate the preview URL
        }));
      }
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        status: checked, // Handle checkbox for status
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value, // Handle text input
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous toast messages
    toast.dismiss();


    try {
      setLoading(true);

      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You are not authorized. Please log in.");
        return;
      }

      // Send the POST request
      const response = await axios.put(`${config.production_url}/social`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token
        },
      });

      // Show success message
      toast.success("social edited successfully!");

    } catch (err) {
      // Improved error handling
      if (err.response) {
        toast.error(err.response?.data?.message || "Failed to create social.");
      } else if (err.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred.");
      }
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };


  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSocial = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.production_url}/social`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const social = response.data.data;

        setFormData({
          ...social
        });
      } catch (error) {
        toast.error("Failed to fetch social data.");
        console.error("Error fetching social:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSocial();
  }, [id, token]);



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
            <Card sx={{ overflow: "visible" }}>
              <Box p={2}>
                <Typography variant="h5" fontWeight="bold" mb={3}>
                  Edit social
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>

                    {/* social Name */}
                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="text"
                        label="Facebook"
                        name="facebook"
                        placeholder="Enter Facebook Url"
                        value={formData.facebook}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    {/* social Name */}
                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="text"
                        label="Twitter"
                        name="twitter"
                        placeholder="Enter Twitter Url"
                        value={formData.twitter}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    {/* social Name */}
                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="text"
                        label="Instagram"
                        name="instagram"
                        placeholder="Enter Instagram Url"
                        value={formData.instagram}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    {/* social Name */}
                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="text"
                        label="Youtube"
                        name="youtube"
                        placeholder="Enter Youtube Url"
                        value={formData.youtube}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    {/* social Name */}
                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="text"
                        label="Tiktok"
                        name="tiktok"
                        placeholder="Enter Tiktok Url"
                        value={formData.tiktok}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loading}
                        fullWidth
                      >
                        {loading ? "Creating..." : "Submit social"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default EditSocial;