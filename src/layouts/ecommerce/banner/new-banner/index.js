import React, { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/ecommerce/products/new-product/components/Header";
import FormField from "layouts/applications/wizard/components/FormField";
import Footer from "examples/Footer";
import toast from "react-hot-toast";
import config from "config";

const bgImage =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function Banner() {
  const [formData, setFormData] = useState({
    link: "",
    image: null, // File object for the image
    preview: "", // URL for the preview
    description: "",
    active: false,
    bannerType: "popup"
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          image: file, // Set the file object
          preview: URL.createObjectURL(file), // Generate the preview URL
        }));
      }
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        active: checked, // Handle checkbox for active state
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

    // Validation
    if (!formData.image) {
      toast.error("Please upload a banner image.");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Please enter a description.");
      return;
    }

    // Create FormData for file upload
    const data = new FormData();
    data.append("image", formData.image); // Attach the file
    data.append("description", formData.description);
    data.append("link", formData.link || "");
    data.append("active", formData.active); // Attach boolean value
    data.append("bannerType", formData.bannerType); // Attach boolean value

    try {
      setLoading(true);

      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You are not authorized. Please log in.");
        return;
      }

      // Send the POST request
      const response = await axios.post(`${config.production_url}/banner`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Pass the token
        },
      });

      // Show success message
      toast.success("Banner uploaded successfully!");

      // Reset form
      setFormData({
        link: "",
        image: null,
        preview: "",
        description: "",
        active: false,
        bannerType: "popup"
      });
    } catch (err) {
      // Improved error handling
      if (err.response) {
        // Server error
        toast.error(err.response?.data?.message || "Failed to upload banner.");
      } else if (err.request) {
        // Network error
        toast.error("Network error. Please check your connection.");
      } else {
        // Unexpected error
        toast.error("An unexpected error occurred.");
      }
      console.error("Error:", err);
    } finally {
      setLoading(false);
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
      <Box mt={1} mb={20}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card sx={{ overflow: "visible" }}>
              <Box p={2}>
                <Typography variant="h5" fontWeight="bold" mb={3}>
                  Create Banner
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.active}
                            onChange={handleInputChange}
                            name="active"
                          />
                        }
                        label="Active"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="text"
                        label="Link"
                        name="link"
                        placeholder="Enter URL"
                        value={formData.link}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    <Grid item xs={12} md={6} mt={2}>
                      <Typography variant="caption" fontWeight="bold" mb={1} display="block">
                        Banner Type
                      </Typography>

                      <Select
                        value={formData?.bannerType || ""}
                        onChange={(e) => setFormData({ ...formData, bannerType: e.target.value })}
                        displayEmpty
                        inputProps={{ "aria-label": "Banner Type" }}
                      >
                        <MenuItem value="popup">
                          Popup
                        </MenuItem>
                        <MenuItem value="slider">
                          Slider
                        </MenuItem>
                        <MenuItem value="static">
                          Static Banner
                        </MenuItem>
                        <MenuItem value="campaign">
                          Campaign
                        </MenuItem>

                      </Select>

                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" fontWeight="bold" display="block">
                        Banner Image
                      </Typography>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleInputChange}
                        style={{ margin: "1rem 0" }}
                      />
                      {formData.preview && (
                        <img
                          src={formData.preview}
                          alt="Preview"
                          style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
                        />
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="caption" fontWeight="bold" mb={1} display="block">
                        Description
                      </Typography>
                      <TextareaAutosize
                        type="text"
                        style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                        minRows={12}
                        name='description'
                        label="Description"
                        placeholder="e.g., High-quality T-shirt"
                        value={formData.description}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loading}
                        fullWidth
                      >
                        {loading ? "Uploading..." : "Submit Banner"}
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

export default Banner;
