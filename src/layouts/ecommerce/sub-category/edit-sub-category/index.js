import axios from "axios";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, Card, Typography, FormControl, FormControlLabel, Switch } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/ecommerce/products/new-product/components/Header";
import FormField from "layouts/applications/wizard/components/FormField";
import Footer from "examples/Footer";
import toast from "react-hot-toast";
import config from "config";
import { useParams } from "react-router-dom";

const bgImage =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function EditSubCategory() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(null); // New state for image preview
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    category: "",
    featured: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You are not authorized. Please log in.");
          return;
        }

        const response = await axios.get(`${config?.production_url}/category`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setCategories(response.data.data.result);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast.error("Failed to fetch categories.");
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Generate preview URL
      setPreview(file ? URL.createObjectURL(file) : null);
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
    console.log(formData);

    if (!formData.name || !formData.image || !formData.category) {
      toast.error("All fields are required.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("image", formData.image);
    data.append("category", formData.category);
    data.append("featured", formData.featured);

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not authorized. Please log in.");
        return;
      }

      await axios.put(`${config?.production_url}/sub-category/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Sub-category updated successfully!");
      setFormData({ name: "", image: null, category: "" });
      setPreview(null); // Clear the preview
    } catch (err) {
      if (err.response) {
        toast.error(err.response?.data?.message || "Failed to update sub-category.");
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
    const fetchSubCategory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You are not authorized. Please log in.");
          return;
        }

        const response = await axios.get(`${config?.production_url}/sub-category/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedData = response.data.data;

        setFormData({
          name: fetchedData.name || "",
          image: fetchedData.image || null,
          category: fetchedData.category || "",
          featured: fetchedData.featured || false,
        });

        setPreview(fetchedData.image); // Set initial preview to existing image URL
      } catch (error) {
        console.error("Error fetching sub-category:", error);
      }
    };

    fetchSubCategory();
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
                  Edit Sub Category
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
                        label="Upload Sub Category Image"
                        placeholder="Upload Sub Category Image"
                        onChange={handleInputChange}
                        inputProps={{
                          accept: "image/*",
                        }}
                      />
                    </Grid>

                    {preview && (
                      <Grid item xs={12}>
                        <Box mt={2} textAlign="center">
                          <img
                            src={preview}
                            alt="Preview"
                            style={{ width: "100%", maxWidth: "300px", borderRadius: "8px" }}
                          />
                        </Box>
                      </Grid>
                    )}

                    <Grid item xs={12}>
                      <Typography variant="h6" mb={1}>
                        Category
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          fullWidth
                          displayEmpty
                          sx={{
                            "& .MuiSelect-select": {
                              width: "100%",
                              height: "100%",
                              backgroundColor: "#f0f0f0",
                            },
                          }}
                        >
                          {categories.map((cat) => (
                            <MenuItem key={cat._id} value={cat._id}>
                              {cat.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loading}
                        fullWidth
                      >
                        {loading ? "Uploading..." : "Submit Sub Category"}
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

export default EditSubCategory;
