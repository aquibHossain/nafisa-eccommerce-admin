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
  IconButton,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/ecommerce/products/new-product/components/Header";
import FormField from "layouts/applications/wizard/components/FormField";
import Footer from "examples/Footer";
import toast from "react-hot-toast";
import config from "config";
import { CloseOutlined } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const bgImage =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function EditCampaign() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    image: null, // File object for the image
    preview: "", // URL for the preview
    description: "",
    startDate: "",
    endDate: "",
    discountType: "percentage", // Default value
    discountValue: 0,
    minimumOrderValue: 0,
    maximumDiscount: 0,
    status: false,
    freeShipping: true,
    selectedProducts: [],
  });
  const [productInventories, setProductInventories] = useState({});
  const [loading, setLoading] = useState(false);

  function formatLocalDateTime(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16); // This will now reflect local time
  }

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

  const handleProductChange = (event, value) => {
    const selectedIds = value.map((p) => p._id);
    setFormData((prev) => ({
      ...prev,
      selectedProducts: selectedIds,
    }));

    // Initialize inventory list per product
    const newInventories = {};
    selectedIds.forEach((id) => {
      newInventories[id] = productInventories[id] || [{ inventoryId: "", quantity: 0 }];
    });
    setProductInventories(newInventories);
  };

  const addInventoryToProduct = (productId) => {
    setProductInventories((prev) => ({
      ...prev,
      [productId]: [...(prev[productId] || []), { inventoryId: "", quantity: 0 }],
    }));
  };

  const removeInventoryFromProduct = (productId, index) => {
    setProductInventories((prev) => {
      const updatedList = [...(prev[productId] || [])];
      updatedList.splice(index, 1);
      return {
        ...prev,
        [productId]: updatedList,
      };
    });
  };

  const updateInventoryField = (productId, index, field, value) => {
    setProductInventories((prev) => {
      const updated = [...(prev[productId] || [])];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return {
        ...prev,
        [productId]: updated,
      };
    });
  };

  const handleRemoveProduct = (productId) => {
    setFormData((prev) => ({
      ...prev,
      selectedProducts: prev.selectedProducts.filter((id) => id !== productId),
    }));
    setProductInventories((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous toast messages
    toast.dismiss();

    // Validation
    if (!formData.image) {
      toast.error("Please upload a campaign image.");
      return;
    }
    if (!formData.name.trim()) {
      toast.error("Please enter the campaign name.");
      return;
    }
    if (!formData.code.trim()) {
      toast.error("Please enter the campaign code.");
      return;
    }
    if (!formData.startDate || !formData.endDate) {
      toast.error("Please enter both start and end dates.");
      return;
    }

    // Create FormData for file upload
    const data = new FormData();
    data.append("image", formData.image); // Attach the file
    data.append("name", formData.name);
    data.append("code", formData.code);
    data.append("startDate", formData.startDate);
    data.append("endDate", formData.endDate);
    data.append("description", formData.description);
    data.append("discountType", formData.discountType);
    data.append("discountValue", formData.discountValue);
    data.append("minimumOrderValue", formData.minimumOrderValue);
    data.append("maximumDiscount", formData.maximumDiscount);
    data.append("freeShipping", formData.freeShipping);
    data.append("status", formData.status);

    formData.selectedProducts.forEach((productId) => {
      const inventories = productInventories[productId] || [];
      inventories.forEach((entry) => {
        data.append("applicableProducts[]", JSON.stringify({
          product: productId,
          inventoryId: entry.inventoryId,
          quantity: entry.quantity,
        }));
      });
    });

    try {
      setLoading(true);

      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You are not authorized. Please log in.");
        return;
      }

      // Send the POST request
      const response = await axios.put(`${config.production_url}/campaign/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Pass the token
        },
      });

      // Show success message
      toast.success("Campaign edited successfully!");

    } catch (err) {
      // Improved error handling
      if (err.response) {
        toast.error(err.response?.data?.message || "Failed to create campaign.");
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

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.production_url}/campaign/admin/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const campaign = response.data.data;

        const selectInventory = campaign?.applicableProducts?.reduce((acc, curr) => {
          const productId = curr?.product?._id;
          if (!productId) return acc;

          if (!acc[productId]) {
            acc[productId] = [];
          }

          // Add inventory only if it's not already in the list (to prevent duplicates)
          const inventoryExists = acc[productId].some(inventory => inventory.inventoryId === curr.inventoryId);
          if (!inventoryExists) {
            acc[productId].push({ inventoryId: curr.inventoryId, quantity: curr.quantity });
          }

          return acc;
        }, {});


        setFormData({
          ...campaign,
          startDate: campaign.startDate ? formatLocalDateTime(campaign.startDate) : "",
          endDate: campaign.endDate ? formatLocalDateTime(campaign.endDate) : "",
          preview: campaign?.image,
          selectedProducts: [...new Set(campaign?.applicableProducts?.map(res => res?.product?._id) || [])],


        });
        setProductInventories(selectInventory)
      } catch (error) {
        toast.error("Failed to fetch campaign data.");
        console.error("Error fetching campaign:", error);
      } finally {
        setLoading(false);
      }
    };

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

        const { result } = response.data.data;
        setList(result);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
    fetchProducts();
  }, [id, searchQuery, token]);


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
                  Edit Campaign
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    {/* Campaign Status */}
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

                    {/* Campaign Name */}
                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="text"
                        label="Campaign Name"
                        name="name"
                        placeholder="Enter campaign name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    {/* Campaign Code */}
                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="text"
                        label="Campaign Code"
                        name="code"
                        placeholder="Enter campaign code"
                        value={formData.code}
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


                    <Grid item xs={12}>
                      <Typography variant="caption" fontWeight="bold">Select Products</Typography>
                      <Autocomplete
                        multiple
                        options={list}
                        getOptionLabel={(option) => option.productName}
                        value={list.filter((p) => formData.selectedProducts.includes(p._id))}
                        onChange={handleProductChange}
                        isOptionEqualToValue={(o, v) => o._id === v._id}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grid>

                    {formData.selectedProducts.map((id) => {
                      const product = list.find((p) => p._id === id);
                      const inventories = productInventories[id] || [];

                      return (
                        <Grid item xs={12} key={id}>
                          <Card sx={{ p: 2, mb: 2 }}>
                            <Typography variant="body1" fontWeight="bold">{product?.productName}</Typography>
                            {inventories.map((entry, idx) => (
                              <Box key={idx} mt={2}>
                                <Typography variant="caption" fontWeight="bold">Inventory</Typography>
                                <Select
                                  value={entry.inventoryId}
                                  onChange={(e) =>
                                    updateInventoryField(id, idx, "inventoryId", e.target.value)
                                  }
                                  fullWidth
                                  displayEmpty
                                >
                                  {product?.inventory?.map((inv) => (
                                    <MenuItem key={inv._id} value={inv._id}>
                                      {inv.productName} {inv?.sku ? `- ${inv.sku}` : ""}
                                    </MenuItem>
                                  ))}
                                </Select>

                                <Typography variant="caption" fontWeight="bold">Quantity</Typography>
                                <TextField
                                  type="number"
                                  value={entry.quantity}
                                  onChange={(e) =>
                                    updateInventoryField(id, idx, "quantity", e.target.value)
                                  }
                                  fullWidth
                                  margin="dense"
                                />

                                <IconButton color="error" onClick={() => removeInventoryFromProduct(id, idx)}>
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                            ))}

                            <Button onClick={() => addInventoryToProduct(id)} sx={{ mt: 1 }}>
                              Add Inventory
                            </Button>

                            <Button color="error" onClick={() => handleRemoveProduct(id)} sx={{ mt: 1, ml: 2 }}>
                              Remove Product
                            </Button>
                          </Card>
                        </Grid>
                      );
                    })}

                    {/* Campaign Image */}
                    <Grid item xs={12}>
                      <Typography variant="caption" fontWeight="bold" display="block">
                        Campaign Image
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
                        {loading ? "Creating..." : "Submit Campaign"}
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

export default EditCampaign;