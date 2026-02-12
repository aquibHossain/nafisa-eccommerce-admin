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

const bgImage =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function CreateCampaign() {
  const [formData, setFormData] = useState({
    title: "",
    image: null, // File object for the image
    preview: "", // URL for the preview
    description: "",
    startDate: "",
    endDate: "",
    discountType: "percentage", // Default value
    discount: 0,
    status: false,
    freeShipping: true,
    product: 'none',
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

    // Validation
    if (!formData.image) {
      toast.error("Please upload a offer image.");
      return;
    }
    if (!formData.title.trim()) {
      toast.error("Please enter the offer title.");
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      toast.error("Please enter both start and end dates.");
      return;
    }

    // Create FormData for file upload
    const data = new FormData();
    data.append("image", formData.image); // Attach the file
    data.append("title", formData.title);
    data.append("startDate", new Date(formData.startDate).toISOString());
    data.append("endDate", new Date(formData.endDate).toISOString());
    data.append("description", formData.description);
    data.append("discountType", formData.discountType);
    data.append("discount", formData.discount);
    data.append("product", formData.product);
    data.append("freeShipping", formData.freeShipping);
    data.append("status", formData.status);

    try {
      setLoading(true);

      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You are not authorized. Please log in.");
        return;
      }

      // Send the POST request
      const response = await axios.post(`${config.production_url}/offer`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Pass the token
        },
      });

      // Show success message
      toast.success("Offer created successfully!");

      // Reset form
      setFormData({
        title: "",
        image: null,
        preview: "",
        description: "",
        startDate: "",
        endDate: "",
        discountType: "percentage",
        discount: 0,
        status: false,
        freeShipping: true,
        product: 'none',
      });
    } catch (err) {
      // Improved error handling
      if (err.response) {
        toast.error(err.response?.data?.message || "Failed to create offer.");
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

  const [list, setList] = useState([]); // List of products
  const [searchQuery, setSearchQuery] = useState(""); // Search term
  const token = localStorage.getItem("token");

  // Fetch products on page change, limit, or searchQuery change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.production_url}/item`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            name: searchQuery, // Searching by name
            page: 1,
            limit: 5000, // Assuming a limit of 100 products per request (adjust as needed)
          },
        });

        const { result, totalPages: fetchedTotalPages } = response.data.data;
        setList(result);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, token]);

  const handleRemoveProduct = (productId) => {
    setFormData((prev) => ({
      ...prev,
      selectedProducts: prev.selectedProducts.filter((id) => id !== productId),
    }));
  };

  const handleProductChange = (event, value) => {
    // Ensure that the selected value is always an array
    const selectedProductIds = value ? value.map((product) => product._id) : [];
    console.log("Selected products:", selectedProductIds);

    setFormData((prev) => ({
      ...prev,
      selectedProducts: selectedProductIds,
    }));
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
                  Create Offer
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    {/* Offer Status */}
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.status}
                            onChange={handleInputChange}
                            name="status"
                          />
                        }
                        label="Active"
                      />
                    </Grid>

                    {/* Offer Name */}
                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="text"
                        label="Offer title"
                        name="title"
                        placeholder="Enter offer title"
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    {/* Start Date */}
                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="datetime-local"
                        label="Start Date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    {/* End Date */}
                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="datetime-local"
                        label="End Date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    {/* Discount Type */}
                    <Grid item xs={12} sm={6} mt={1}>
                      <Typography component="label" variant="caption" fontWeight="bold" mb={1} display="block">
                        Discount Type
                      </Typography>
                      <Select
                        name="discountType"
                        value={formData.discountType}
                        onChange={handleInputChange}
                      >
                        <MenuItem value="percentage">Percentage</MenuItem>
                        <MenuItem value="value">Value</MenuItem>
                      </Select>

                    </Grid>

                    {/* Discount Value */}
                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="number"
                        label="Discount Value"
                        name="discount"
                        value={formData.discount}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} mt={1}>
                      <Typography component="label" variant="caption" fontWeight="bold" mb={1} display="block">
                        Free Shipping
                      </Typography>
                      <Select
                        name="freeShipping"
                        value={formData.freeShipping}
                        onChange={handleInputChange}
                      >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                      </Select>

                    </Grid>

                    {/* Description */}
                    <Grid item xs={12}>
                      <Typography variant="caption" fontWeight="bold" mb={1} display="block">
                        Description
                      </Typography>
                      <TextareaAutosize
                        style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                        minRows={12}
                        name="description"
                        placeholder="Enter description"
                        value={formData.description}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    {/* Product Search (Multiple Selection) */}

                    {/* Product Selection */}
                    <Grid item xs={12}>
                      <Typography component="label" variant="caption" fontWeight="bold" mb={1} display="block">
                        Select Products
                      </Typography>
                      <Select
                        name="product"
                        value={formData.product}
                        onChange={handleInputChange}
                      >
                        <MenuItem value='none'>None</MenuItem>
                        {list.map((product) => <MenuItem key={product._id} value={product._id}>{product.productName}</MenuItem>)}

                      </Select>
                    </Grid>

                    {/* Offer Image */}
                    <Grid item xs={12}>
                      <Typography variant="caption" fontWeight="bold" display="block">
                        Offer Image
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

                    {/* Submit Button */}
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loading}
                        fullWidth
                      >
                        {loading ? "Creating..." : "Submit Offer"}
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

export default CreateCampaign;
