import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  Chip,
  Avatar,
  Modal,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/ecommerce/products/new-product/components/Header";
import Footer from "examples/Footer";
import toast from "react-hot-toast";
import config from "config";
import { Link, useParams } from "react-router-dom";
import { DownloadOutlined, Visibility } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const bgImage =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function EwarrentyDetails() {
  const { id } = useParams();
  const [ewarrentyData, setEwarrentyData] = useState(null);
  const [status, setStatus] = useState(false);
  const [statusChange, setStatusChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("token");
  const handleOpenModal = (status) => {
    setIsModalOpen(true);
    setStatus(status)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchEwarrentyDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.production_url}/e-warrenty/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEwarrentyData(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch ewarrenty details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEwarrentyDetails();
  }, [token, id, statusChange]);

  if (loading) return <Typography>Loading...</Typography>;

  if (!ewarrentyData) return <Typography>No ewarrenty details available.</Typography>;

  const handleDownloadCV = () => {
    window.open(ewarrentyData.cv, "_blank");
    // const link = document.createElement("a");
    // link.href = ewarrentyData.cv;
    // link.target = "_blank";
    // link.download = `${ewarrentyData.firstName}_${ewarrentyData.lastName}_CV.pdf`;
    // link.click();
  };

  const handleStatusChange = async () => {

    try {
      await axios.put(
        `${config.production_url}/e-warrenty/${ewarrentyData._id}`,
        { status: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("E Warrenty status updated successfully.");
      setStatusChange(res => !res)
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to update ewarrenty status.");
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
      <Box mt={4} mb={20}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h4" fontWeight="bold" mb={3}>
                E-Warrenty Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" fontWeight="bold">Order Id</Typography>
                  <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    <Typography>{ewarrentyData?.orderId?.orderId}
                    </Typography>
                    <Link to={`/ecommerce/orders/order-details/${ewarrentyData?.orderId?._id}`}>
                      <RemoveRedEyeIcon />
                    </Link>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" fontWeight="bold">Product</Typography>
                  <Box display="flex" justifyContent="space-between" gap={4}>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        variant="rounded"
                        src={ewarrentyData?.productId?.image}
                        alt={ewarrentyData?.productId?.productName}
                        sx={{ width: 64, height: 64, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          {ewarrentyData?.productId?.productName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <del>৳{ewarrentyData?.productId?.displayPrice}</del>  ৳{ewarrentyData?.productId?.price} each
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" fontWeight="bold">First Name</Typography>
                  <Typography>{ewarrentyData.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" fontWeight="bold">Email</Typography>
                  <Typography>{ewarrentyData.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" fontWeight="bold">Mobile</Typography>
                  <Typography>{ewarrentyData.phone}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" fontWeight="bold">Requested Date</Typography>
                  <Typography>{new Date(ewarrentyData.createdAt).toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" fontWeight="bold">Warrenty Period</Typography>
                  <Typography>{ewarrentyData.warrantyPeriod} {ewarrentyData.warrantyPeriodType}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" fontWeight="bold">Order Date</Typography>
                  <Typography>{new Date(ewarrentyData.purchaseDate).toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" fontWeight="bold">Expire Date</Typography>
                  <Typography>{new Date(ewarrentyData.expirationDate).toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" fontWeight="bold">Division</Typography>
                  <Typography>
                    {ewarrentyData.division}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" fontWeight="bold">District</Typography>
                  <Typography>
                    {ewarrentyData.district}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" fontWeight="bold">Thana</Typography>
                  <Typography>
                    {ewarrentyData.thana}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" fontWeight="bold">Status</Typography>
                  <Typography>
                    <Chip
                      label={ewarrentyData.status ? "Active" : "Inactive"}
                      color={ewarrentyData.status ? "success" : "error"}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" fontWeight="bold">Status Update</Typography>
                  <Button
                    style={{ fontSize: 12, color: "black" }}
                    variant="outlined"
                    onClick={() => handleOpenModal(ewarrentyData.status)}
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Update Status for E Warrenty
          </Typography>
          <FormControl fullWidth>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem key={true} value={true}>
                Active
              </MenuItem>
              <MenuItem key={false} value={false}>
                Inactive
              </MenuItem>
            </Select>
          </FormControl>
          <Box mt={3} display="flex" justifyContent="space-between">
            <Button style={{ background: "red", }} color="error" variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleStatusChange}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
      <Footer />
    </DashboardLayout>
  );
}

export default EwarrentyDetails;
