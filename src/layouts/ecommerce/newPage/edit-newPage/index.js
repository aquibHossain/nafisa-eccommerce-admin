import axios from "axios";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, Card, FormControlLabel, MenuItem, Select, Switch, TextareaAutosize, Typography } from "@mui/material";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/ecommerce/products/new-product/components/Header";
import FormField from "layouts/applications/wizard/components/FormField";
import Footer from "examples/Footer";
import toast from "react-hot-toast";
import config from "config";
import { useParams } from "react-router-dom";
import TextEditor from "examples/TextEditor";

const bgImage =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function EditNewPage() {
  const { id } = useParams();
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(""); // State for image preview
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: null,
    description: "",
    active: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      // Update image preview
      setPreviewImage(file ? URL.createObjectURL(file) : "");
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        active: checked,
      }));
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

    if (!formData.description.trim()) {
      toast.error("Please enter a description.");
      return;
    }

    const data = new FormData();
    if (formData.image) {
      data.append("image", formData.image);
    }
    data.append("description", formData.description);
    data.append("name", formData.name || "");
    data.append("slug", formData.slug || "");
    data.append("active", formData.active);

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You are not authorized. Please log in.");
        return;
      }

      const response = await axios.put(`${config.production_url}/page/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Banner updated successfully!");

      const fetchedBanner = response.data.data;

      setFormData({
        name: fetchedBanner.name || "",
        slug: fetchedBanner.slug || "",
        image: fetchedBanner.image || null,
        description: fetchedBanner.description || "",
        active: fetchedBanner.active || false,
      });
      setBanner(fetchedBanner);
      setPreviewImage(fetchedBanner.image); // Update preview with fetched image
    } catch (err) {
      if (err.response) {
        toast.error(err.response?.data?.message || "Failed to upload banner.");
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

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(`${config?.production_url}/page/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const fetchedBanner = response.data.data;

        setFormData({
          name: fetchedBanner.name || "",
          slug: fetchedBanner.slug || "",
          image: null, // Reset to ensure file is handled properly
          description: fetchedBanner.description || "",
          active: fetchedBanner.active || false,
        });
        setBanner(fetchedBanner);
        setPreviewImage(fetchedBanner.image); // Set preview image URL
      } catch (error) {
        console.error("Failed to fetch banner:", error);
      }
    };

    fetchBanner();
  }, [id]);

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
                  Edit Page
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
                      <FormField
                        type="file"
                        label="Banner Image"
                        placeholder="Upload Banner Image"
                        onChange={handleInputChange}
                        inputProps={{
                          accept: "image/*",
                        }}
                      />
                      {previewImage && (
                        <Box mt={2}>
                          <img
                            src={previewImage}
                            alt="Banner Preview"
                            style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }}
                          />
                        </Box>
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
                        {loading ? "Uploading..." : "Submit "}
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

export default EditNewPage;
