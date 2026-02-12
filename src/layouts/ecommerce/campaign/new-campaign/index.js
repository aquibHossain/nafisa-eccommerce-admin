import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Chip,
  FormControlLabel,
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
import DeleteIcon from "@mui/icons-material/Delete";

const bgImage = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?...";

function CreateCampaign() {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    image: null,
    preview: "",
    description: "",
    startDate: "",
    endDate: "",
    discountType: "percentage",
    discountValue: 0,
    minimumOrderValue: 0,
    maximumDiscount: 0,
    status: false,
    freeShipping: true,
    selectedProducts: [],
  });

  const [productInventories, setProductInventories] = useState({}); // {productId: [{inventoryId, quantity}]}
  const [list, setList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          image: file,
          preview: URL.createObjectURL(file),
        }));
      }
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        status: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
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
            name: searchQuery,
            page: 1,
            limit: 5000,
          },
        });
        setList(response.data.data.result);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    if (!formData.image) return toast.error("Please upload a campaign image.");
    if (!formData.name.trim()) return toast.error("Please enter the campaign name.");
    if (!formData.code.trim()) return toast.error("Please enter the campaign code.");
    if (!formData.startDate || !formData.endDate) return toast.error("Please enter both start and end dates.");

    const data = new FormData();
    data.append("image", formData.image);
    data.append("name", formData.name);
    data.append("code", formData.code);
    data.append("startDate", new Date(formData.startDate));
    data.append("endDate", new Date(formData.endDate));
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
      await axios.post(`${config.production_url}/campaign`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Campaign created successfully!");
      setFormData({
        name: "",
        code: "",
        image: null,
        preview: "",
        description: "",
        startDate: "",
        endDate: "",
        discountType: "percentage",
        discountValue: 0,
        minimumOrderValue: 0,
        maximumDiscount: 0,
        status: false,
        freeShipping: true,
        selectedProducts: [],
      });
      setProductInventories({});
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create campaign.");
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
                <Typography variant="h5" fontWeight="bold" mb={3}>Create Campaign</Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
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

                    <Grid item xs={12} sm={6}>
                      <FormField type="text" label="Campaign Name" name="name" placeholder="Enter campaign name" value={formData.name} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField type="text" label="Campaign Code" name="code" placeholder="Enter campaign code" value={formData.code} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField type="datetime-local" label="Start Date" name="startDate" value={formData.startDate} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField type="datetime-local" label="End Date" name="endDate" value={formData.endDate} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" fontWeight="bold">Discount Type</Typography>
                      <Select fullWidth name="discountType" value={formData.discountType} onChange={handleInputChange}>
                        <MenuItem value="percentage">Percentage</MenuItem>
                        <MenuItem value="value">Value</MenuItem>
                      </Select>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField type="number" label="Discount Value" name="discountValue" value={formData.discountValue} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField type="number" label="Minimum Order Value" name="minimumOrderValue" value={formData.minimumOrderValue} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField type="number" label="Maximum Discount" name="maximumDiscount" value={formData.maximumDiscount} onChange={handleInputChange} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" fontWeight="bold">Free Shipping</Typography>
                      <Select fullWidth name="freeShipping" value={formData.freeShipping} onChange={handleInputChange}>
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                      </Select>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="caption" fontWeight="bold">Description</Typography>
                      <TextareaAutosize style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} minRows={12} name="description" placeholder="Enter description" value={formData.description} onChange={handleInputChange} />
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

                    <Grid item xs={12}>
                      <Typography variant="caption" fontWeight="bold">Campaign Image</Typography>
                      <input type="file" accept="image/*" onChange={handleInputChange} style={{ margin: "1rem 0" }} />
                      {formData.preview && <img src={formData.preview} alt="Preview" style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }} />}
                    </Grid>

                    <Grid item xs={12}>
                      <Button variant="contained" color="primary" type="submit" disabled={loading} fullWidth>
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

export default CreateCampaign;
