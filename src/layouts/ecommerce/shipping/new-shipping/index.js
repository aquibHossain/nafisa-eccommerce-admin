import axios from "axios";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, Card, FormControlLabel, Switch, TextareaAutosize, Typography } from "@mui/material";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/ecommerce/products/new-product/components/Header";
import FormField from "layouts/applications/wizard/components/FormField";
import Footer from "examples/Footer";
import toast from "react-hot-toast";
import config from "config";

const bgImage =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function Shipping() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: 0,
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

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You are not authorized. Please log in.");
        return;
      }

      await axios.post(`${config.production_url}/shipping`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Shipping uploaded successfully!");
      setFormData({
        name: "",
        amount: 0,
        description: "",
        active: false,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload shipping.");
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
                  Create Shipping
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
                    <Grid item xs={12} sm={6}>
                      <FormField
                        type="number"
                        label="Amount"
                        name="amount"
                        placeholder="Enter Amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                      />
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
                        {loading ? "Uploading..." : "Submit Shipping"}
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

export default Shipping;
