import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  IconButton,
  Pagination,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Modal,
} from "@mui/material";
import { CheckCircle, HourglassEmpty, Cancel, HourglassFullTwoTone } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/ecommerce/products/new-product/components/Header";
import Footer from "examples/Footer";
import toast, { LoaderIcon } from "react-hot-toast";
import config from "config";
import { Link } from "react-router-dom";
import ExportOrders from "./components/ExportOrders";

const statusColors = {
  pending: "warning",
  shipped: "default",
  delivered: "success",
  cancelled: "error",
};

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderId, setOrderId] = useState("");
  const [isActive, setIsActive] = useState("true");
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.production_url}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userId,
            email,
            phone,
            paymentStatus,
            paymentMethod,
            orderId,
            isActive,
            page,
            limit,
            sortBy,
            sortOrder,
          },
        });
        setOrders(response.data.data.result);
        setTotalPages(response.data.data.totalPages);
      } catch (error) {
        toast.error("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, email, paymentStatus, phone, paymentMethod, orderId, isActive, page, limit, sortBy, sortOrder, token]);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.paymentStatus);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setNewStatus("");
  };

  const handleStatusChange = async () => {
    if (!selectedOrder) return;

    try {
      await axios.put(
        `${config.production_url}/orders/${selectedOrder._id}/status`,
        { paymentStatus: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order status updated successfully.");
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrder._id ? { ...order, paymentStatus: newStatus } : order
        )
      );
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to update order status.");
    }
  };

  const getStatusOptions = (currentStatus) => {
    const statuses = ["pending", "shipped", "delivered", "cancelled"];
    const currentIndex = statuses.indexOf(currentStatus);

    return statuses.filter((status, index) => index <= currentIndex + 1 || status === "cancelled");
  };

  return (
    <DashboardLayout>
      <Header />
      <Box mt={4} mb={20}>
        <Grid justifyContent="center">
          <Grid item xs={12} lg={10}>
            <Card sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" fontWeight="bold" mb={3}>
                  Order List
                </Typography>
                <ExportOrders orders={orders} />
              </Box>
              <Box mb={4} style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "10px" }}>
                <Box
                  display="grid"
                  gridTemplateColumns={{
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                  }}
                  gap={3}
                >
                  {/* Text Filters */}
                  {[
                    { label: "Search by Email", value: email, setter: setEmail },
                    { label: "Search by Phone Number", value: phone, setter: setPhone },
                    { label: "Search by Order ID", value: orderId, setter: setOrderId },
                  ].map((filter, index) => (
                    <Box key={index}>
                      <Typography variant="h6" fontWeight="medium" mb={1}>
                        {filter?.label}
                      </Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={filter.value}
                        onChange={(e) => {
                          filter.setter(e.target.value);
                          setPage(1); // Reset to page 1 on new search
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Box>
                  ))}

                  {/* Select Filters */}
                  {[
                    {
                      label: "Search by Status",
                      value: paymentStatus,
                      setter: setPaymentStatus,
                      options: [
                        { label: "All", value: "" },
                        { label: "Pending", value: "pending" },
                        { label: "Shipped", value: "shipped" },
                        { label: "Delivered", value: "delivered" },
                        { label: "Cancelled", value: "cancelled" },
                      ],
                    },
                    {
                      label: "Search by Payment Method",
                      value: paymentMethod,
                      setter: setPaymentMethod,
                      options: [
                        { label: "All", value: "" },
                        { label: "Cash On Delivery", value: "cod" },
                        { label: "bkash", value: "bkash" },
                        { label: "Nagad", value: "nagad" },
                        { label: "Rocket", value: "rocket" },
                        { label: "Visa Card", value: "visa" },
                        { label: "Master Card", value: "mastercard" },
                      ],
                    },
                    {
                      label: "Search by Active",
                      value: isActive,
                      setter: setIsActive,
                      options: [
                        { label: "Active", value: "true" },
                        { label: "Inactive", value: "false" },
                      ],
                    },
                    {
                      label: "Sort By",
                      value: sortBy,
                      setter: setSortBy,
                      options: [
                        { label: "Sort By: Time", value: "createdAt" },
                        { label: "Sort By: Amount", value: "finalAmount" },
                      ],
                    },
                    {
                      label: "Sort Order",
                      value: sortOrder,
                      setter: setSortOrder,
                      options: [
                        { label: "High to Low", value: "desc" },
                        { label: "Low to High", value: "asc" },
                      ],
                    },
                  ].map((filter, index) => (
                    <Box key={index}>
                      <Typography variant="h6" fontWeight="medium" mb={1}>
                        {filter.label}
                      </Typography>
                      <Select
                        fullWidth
                        value={filter.value}
                        onChange={(e) => filter.setter(e.target.value)}
                        displayEmpty
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      >
                        {filter.options.map((option, idx) => (
                          <MenuItem key={idx} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  ))}
                </Box>
              </Box>


              <TableContainer>
                <Table>

                  <TableRow>
                    {[
                      "Order ID",
                      "Customer Email",
                      "Phone Number",
                      "Time",
                      "Total",
                      "Final",
                      "Address",
                      "Status",
                      "View",
                      "Actions",
                    ].map((header, index) => (
                      <TableCell key={index} align={index > 1 ? "center" : "left"}>
                        <strong>{header}</strong>
                      </TableCell>
                    ))}
                  </TableRow>

                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={8} align="center">
                          <LoaderIcon />
                        </TableCell>
                      </TableRow>
                    ) : (
                      orders.map((order) => (
                        <TableRow key={order._id} hover>
                          <TableCell>{order.orderId}</TableCell>
                          <TableCell>{order.shippingAddress?.email}</TableCell>
                          <TableCell>{order.shippingAddress?.phone}</TableCell>
                          <TableCell align="center">
                            {new Date(order.createdAt).toLocaleString()}
                          </TableCell>
                          <TableCell align="center">৳{order.totalAmount}</TableCell>
                          <TableCell align="center">৳{order.finalAmount}</TableCell>
                          <TableCell align="center">{order?.shippingAddress?.address}</TableCell>
                          <TableCell align="center">
                            <Chip
                              label={order.paymentStatus}
                              color={statusColors[order.paymentStatus] || "default"}
                              icon={
                                order.paymentStatus === "pending" ? (
                                  <HourglassEmpty />
                                ) : order.paymentStatus === "shipped" ? (
                                  <HourglassFullTwoTone />
                                ) : order.paymentStatus === "delivered" ? (
                                  <CheckCircle />
                                ) : (
                                  <Cancel />
                                )
                              }
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Link to={`/ecommerce/orders/order-details/${order._id}`}>
                              <RemoveRedEyeIcon />
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Button
                              style={{ fontSize: 12, color: "black" }}
                              variant="outlined"
                              onClick={() => handleOpenModal(order)}
                            >
                              Update
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    displayEmpty
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                  </Select>
                </FormControl>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(event, value) => setPage(value)}
                  color="primary"
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
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
            Update Status for Order {selectedOrder?.orderId}
          </Typography>
          <FormControl fullWidth>
            <Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              {getStatusOptions(selectedOrder?.paymentStatus).map((status) => (
                <MenuItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box mt={3} display="flex" justifyContent="space-between">
            <Button style={{ background: "red", }} color="error" variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleStatusChange}
              disabled={newStatus === selectedOrder?.paymentStatus}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
    </DashboardLayout>
  );
}

export default OrderList;
