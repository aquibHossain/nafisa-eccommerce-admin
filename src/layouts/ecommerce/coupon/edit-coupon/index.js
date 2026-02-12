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

function EditCoupon() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    image: null, // File object for the image
    preview: "", // URL for the preview
    description: "",
    endDate: "",
    discountType: "percentage", // Default value
    discountValue: 0,
    minimumOrderValue: 0,
    maximumDiscount: 0,
    status: false,
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
      toast.error("Please upload a coupon image.");
      return;
    }
    if (!formData.name.trim()) {
      toast.error("Please enter the coupon name.");
      return;
    }
    if (!formData.code.trim()) {
      toast.error("Please enter the coupon code.");
      return;
    }
    if (!formData.endDate) {
      toast.error("Please enter end dates.");
      return;
    }

    // Create FormData for file upload
    const data = new FormData();
    data.append("image", formData.image); // Attach the file
    data.append("name", formData.name);
    data.append("code", formData.code);
    data.append("endDate", formData.endDate);
    data.append("description", formData.description);
    data.append("discountType", formData.discountType);
    data.append("discountValue", formData.discountValue);
    data.append("minimumOrderValue", formData.minimumOrderValue);
    data.append("maximumDiscount", formData.maximumDiscount);
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
      const response = await axios.put(`${config.production_url}/coupon/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Pass the token
        },
      });

      // Show success message
      toast.success("coupon edited successfully!");

    } catch (err) {
      // Improved error handling
      if (err.response) {
        toast.error(err.response?.data?.message || "Failed to create coupon.");
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
    const fetchcoupon = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.production_url}/coupon/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const coupon = response.data.data;

        setFormData({
          ...coupon,
          endDate: coupon.endDate ? new Date(coupon.endDate).toISOString().slice(0, 16) : "",
          preview: coupon?.image,
        });
      } catch (error) {
        toast.error("Failed to fetch coupon data.");
        console.error("Error fetching coupon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchcoupon();
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
                  Edit coupon
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    {/* coupon Status */}
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

                    {/* coupon Name */}
                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="text"
                        label="coupon Name"
                        name="name"
                        placeholder="Enter coupon name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    {/* coupon Code */}
                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="text"
                        label="coupon Code"
                        name="code"
                        placeholder="Enter coupon code"
                        value={formData.code}
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
                        name="discountValue"
                        value={formData.discountValue}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    {/* Minimum Order Value */}
                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="number"
                        label="Minimum Order Value"
                        name="minimumOrderValue"
                        value={formData.minimumOrderValue}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    {/* Maximum Discount */}
                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="number"
                        label="Maximum Discount"
                        name="maximumDiscount"
                        value={formData.maximumDiscount}
                        onChange={handleInputChange}
                      />
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

                    {/* coupon Image */}
                    <Grid item xs={12}>
                      <Typography variant="caption" fontWeight="bold" display="block">
                        coupon Image
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
                        {loading ? "Creating..." : "Submit coupon"}
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

export default EditCoupon;