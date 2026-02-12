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
import TextEditor from "examples/TextEditor";

const bgImage =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function NewPage() {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    slug: "",
    description: "",
    active: false,
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
    data.append("image", formData.image);
    data.append("description", formData.description);
    data.append("name", formData.name || "");
    data.append("slug", formData.slug || "");
    data.append("active", formData.active);

    try {
      setLoading(true);

      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You are not authorized. Please log in.");
        return;
      }

      // Send the POST request
      const response = await axios.post(`${config.production_url}/page`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Pass the token
        },
      });

      // Show success message
      toast.success("Page uploaded successfully!");

      // Reset form
      setFormData({
        name: "",
        slug: "",
        image: null,
        preview: "",
        description: "",
        active: false,
      });
    } catch (err) {
      // Improved error handling
      if (err.response) {
        // Server error
        toast.error(err.response?.data?.message || "Failed to upload page.");
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
                  Create Page
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
                        label="Title"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="text"
                        label="Slug"
                        name="slug"
                        placeholder="Enter Slug"
                        value={formData.slug}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" fontWeight="bold" display="block">
                        Page Image
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

                    <Grid item xs={12} mt={5} pb={15}>
                      <Typography variant="caption" fontWeight="bold" mb={1} display="block">
                        Description
                      </Typography>
                      <TextEditor
                        value={formData?.description || ""}
                        onChange={(value) => setFormData((prev) => ({ ...prev, description: value }))}
                        extraProps={{ placeholder: "Enter description..." }}
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
                        {loading ? "Uploading..." : "Submit"}
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

export default NewPage;
