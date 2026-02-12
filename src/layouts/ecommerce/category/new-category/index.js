import axios from "axios";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, Card, FormControlLabel, Switch, Typography } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/ecommerce/products/new-product/components/Header";
import FormField from "layouts/applications/wizard/components/FormField";
import Footer from "examples/Footer";
import toast from "react-hot-toast";
import config from "config";

const bgImage =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function Category() {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    featured: false
  });
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Generate preview URL
      if (file) {
        const previewURL = URL.createObjectURL(file);
        setImagePreview(previewURL);
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    if (!formData.name || !formData.image) {
      toast.error("All fields are required.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("image", formData.image);
    data.append("featured", formData.featured);

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not authorized. Please log in.");
        return;
      }

      await axios.post(`${config?.production_url}/category`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Category uploaded successfully!");
      setFormData({ name: "", image: null, featured: false });
      setImagePreview(null); // Reset the image preview
    } catch (err) {
      if (err.response) {
        toast.error(err.response?.data?.message || "Failed to upload category.");
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
                  Create Category
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.featured || false}
                            onChange={(event) =>
                              setFormData({ ...formData, featured: event.target.checked })
                            }
                            name="featured"
                          />
                        }
                        label="Featured"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="text"
                        label="Name"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="file"
                        label="Upload Category Image"
                        placeholder="Upload Category Image"
                        onChange={handleInputChange}
                        inputProps={{
                          accept: "image/*",
                        }}
                      />
                    </Grid>

                    {imagePreview && (
                      <Grid item xs={12}>
                        <Box
                          component="img"
                          src={imagePreview}
                          alt="Category Preview"
                          sx={{
                            width: "100%",
                            maxHeight: 300,
                            objectFit: "contain",
                            borderRadius: 1,
                            border: "1px solid #ddd",
                          }}
                        />
                      </Grid>
                    )}

                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loading}
                        fullWidth
                      >
                        {loading ? "Uploading..." : "Submit Category"}
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

export default Category;
