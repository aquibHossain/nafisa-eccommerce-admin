import axios from "axios";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, Card, FormControl, FormControlLabel, MenuItem, Select, Switch, TextareaAutosize, Typography } from "@mui/material";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/ecommerce/products/new-product/components/Header";
import FormField from "layouts/applications/wizard/components/FormField";
import Footer from "examples/Footer";
import toast from "react-hot-toast";
import config from "config";

const bgImage =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function NewStore() {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    description: "",
    city: "",
    division: "",
    country: "",
    map: "",
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

      // Generate image preview
      if (file) {
        const previewURL = URL.createObjectURL(file);
        setImagePreview(previewURL);
      } else {
        setImagePreview(null);
      }
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

    if (!formData.image) {
      toast.error("Please upload a store image.");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Please enter a description.");
      return;
    }

    const data = new FormData();
    data.append("image", formData.image);
    data.append("description", formData.description);
    data.append("name", formData.name || "");
    data.append("city", formData.city || "");
    data.append("division", formData.division || "");
    data.append("country", formData.country || "");
    data.append("map", formData.map || "");
    data.append("active", formData.active);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You are not authorized. Please log in.");
        return;
      }

      await axios.post(`${config.production_url}/store`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("store uploaded successfully!");
      setFormData({
        name: "",
        image: null,
        description: "",
        city: "",
        division: "",
        country: "",
        map: "",
        active: false,
      });
      setImagePreview(null); // Reset image preview
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload store.");
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
                  Create Store
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.active || false}
                            onChange={(event) =>
                              setFormData({ ...formData, active: event.target.checked })
                            }
                            name="active"
                          />
                        }
                        label="Active"
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


                    <Grid item xs={12} lg={6}>
                      <Typography variant="h6" mb={1}>
                        Country
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          name="country"
                          value={formData.country}
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
                          <MenuItem disabled value="">
                            Select a country
                          </MenuItem>
                          {[
                            { _id: "bd", name: "Bangladesh" },
                            { _id: "us", name: "United States" },
                            { _id: "in", name: "India" },
                            { _id: "uk", name: "United Kingdom" },
                            { _id: "ca", name: "Canada" },
                          ].map((country) => (
                            <MenuItem key={country._id} value={country._id}>
                              {country.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Typography variant="h6" mb={1}>
                        Division
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          name="division"
                          value={formData.division}
                          onChange={handleInputChange}
                          fullWidth
                          displayEmpty
                          sx={{
                            "& .MuiSelect-select": {
                              backgroundColor: "#f0f0f0",
                            },
                          }}
                        >
                          <MenuItem disabled value="">
                            Select a division
                          </MenuItem>
                          {[
                            { _id: "dhaka", name: "Dhaka" },
                            { _id: "chattogram", name: "Chattogram" },
                            { _id: "khulna", name: "Khulna" },
                            { _id: "rajshahi", name: "Rajshahi" },
                            { _id: "barisal", name: "Barisal" },
                            { _id: "sylhet", name: "Sylhet" },
                            { _id: "rangpur", name: "Rangpur" },
                            { _id: "mymensingh", name: "Mymensingh" },
                          ].map((division) => (
                            <MenuItem key={division._id} value={division._id}>
                              {division.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Typography variant="h6" mb={1}>
                        City
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          fullWidth
                          displayEmpty
                          sx={{
                            "& .MuiSelect-select": {
                              backgroundColor: "#f0f0f0",
                            },
                          }}
                        >
                          <MenuItem disabled value="">
                            Select a City
                          </MenuItem>
                          {[
                            { _id: "bagerhat", name: "Bagerhat" },
                            { _id: "bandarban", name: "Bandarban" },
                            { _id: "barguna", name: "Barguna" },
                            { _id: "barisal", name: "Barisal" },
                            { _id: "bhola", name: "Bhola" },
                            { _id: "bogura", name: "Bogura" },
                            { _id: "brahmanbaria", name: "Brahmanbaria" },
                            { _id: "chandpur", name: "Chandpur" },
                            { _id: "chattogram", name: "Chattogram" },
                            { _id: "chuadanga", name: "Chuadanga" },
                            { _id: "comilla", name: "Comilla" },
                            { _id: "coxsbazar", name: "Cox's Bazar" },
                            { _id: "dhaka", name: "Dhaka" },
                            { _id: "dinajpur", name: "Dinajpur" },
                            { _id: "faridpur", name: "Faridpur" },
                            { _id: "feni", name: "Feni" },
                            { _id: "gaibandha", name: "Gaibandha" },
                            { _id: "gazipur", name: "Gazipur" },
                            { _id: "gopalganj", name: "Gopalganj" },
                            { _id: "habiganj", name: "Habiganj" },
                            { _id: "jamalpur", name: "Jamalpur" },
                            { _id: "jessore", name: "Jessore" },
                            { _id: "jhalokathi", name: "Jhalokathi" },
                            { _id: "jhenaidah", name: "Jhenaidah" },
                            { _id: "joypurhat", name: "Joypurhat" },
                            { _id: "khagrachari", name: "Khagrachari" },
                            { _id: "khulna", name: "Khulna" },
                            { _id: "kishoreganj", name: "Kishoreganj" },
                            { _id: "kurigram", name: "Kurigram" },
                            { _id: "kushtia", name: "Kushtia" },
                            { _id: "lakshmipur", name: "Lakshmipur" },
                            { _id: "lalmonirhat", name: "Lalmonirhat" },
                            { _id: "madaripur", name: "Madaripur" },
                            { _id: "magura", name: "Magura" },
                            { _id: "manikganj", name: "Manikganj" },
                            { _id: "meherpur", name: "Meherpur" },
                            { _id: "moulvibazar", name: "Moulvibazar" },
                            { _id: "munshiganj", name: "Munshiganj" },
                            { _id: "mymensingh", name: "Mymensingh" },
                            { _id: "naogaon", name: "Naogaon" },
                            { _id: "narail", name: "Narail" },
                            { _id: "narayanganj", name: "Narayanganj" },
                            { _id: "narsingdi", name: "Narsingdi" },
                            { _id: "natore", name: "Natore" },
                            { _id: "netrokona", name: "Netrokona" },
                            { _id: "nilphamari", name: "Nilphamari" },
                            { _id: "noakhali", name: "Noakhali" },
                            { _id: "pabna", name: "Pabna" },
                            { _id: "panchagarh", name: "Panchagarh" },
                            { _id: "parbattyachattogram", name: "Rangamati" },
                            { _id: "patuakhali", name: "Patuakhali" },
                            { _id: "pirojpur", name: "Pirojpur" },
                            { _id: "rajbari", name: "Rajbari" },
                            { _id: "rajshahi", name: "Rajshahi" },
                            { _id: "rangpur", name: "Rangpur" },
                            { _id: "satkhira", name: "Satkhira" },
                            { _id: "shariatpur", name: "Shariatpur" },
                            { _id: "sherpur", name: "Sherpur" },
                            { _id: "sirajganj", name: "Sirajganj" },
                            { _id: "sunamganj", name: "Sunamganj" },
                            { _id: "sylhet", name: "Sylhet" },
                            { _id: "tangail", name: "Tangail" },
                            { _id: "thakurgaon", name: "Thakurgaon" }
                          ].map((division) => (
                            <MenuItem key={division._id} value={division._id}>
                              {division.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="text"
                        label="Map"
                        name="map"
                        placeholder="Enter Map"
                        value={formData.map}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="file"
                        label="Store Image"
                        placeholder="Upload Store Image"
                        onChange={handleInputChange}
                        inputProps={{
                          accept: "image/*",
                        }}
                      />
                      {imagePreview && (
                        <Box mt={2}>
                          <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
                          />
                        </Box>
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

export default NewStore;
