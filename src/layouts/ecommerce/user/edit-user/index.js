import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  Box,
  Typography,
  Grid,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  FormControl,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import Header from "layouts/ecommerce/products/new-product/components/Header";
import toast from "react-hot-toast";
import config from "config";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const bgImage =
  "https://raw.githubusercontent.com/amartheme/public-assets/master/amar-dashboard-pro/assets/img/profile-layout-header.jpg";

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${config?.production_url}/user/${id}/details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
            limit,
          },
        });
        console.log({ user: response.data.data });

        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Failed to load user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id, page, limit,]);

  if (loading) {
    return <Typography textAlign="center">Loading...</Typography>;
  }

  if (!user) {
    return <Typography textAlign="center">User not found</Typography>;
  }

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

      {/* User Information Card */}
      <Card sx={{ p: 4, my: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar src={user?.avatar} alt={user?.name} sx={{ width: 80, height: 80 }} />
          </Grid>
          <Grid item>
            <Typography variant="h5">{user?.name}</Typography>
            <Typography variant="body1" color="text.secondary">
              {user?.email}
            </Typography>
            <Chip
              label={user?.isAdmin ? "Admin" : "User"}
              color={user?.isAdmin ? "success" : "default"}
              sx={{ mt: 1 }}
            />
          </Grid>
        </Grid>
      </Card>

      {/* Orders Table */}
      <Card sx={{ p: 4 }}>
        <Typography variant="h6" mb={2}>
          User Orders ({user?.totalOrders})
        </Typography>
        {user?.orders?.length === 0 ? (
          <Typography>No orders found</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>

              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>SubTotal</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>View</TableCell>
              </TableRow>

              <TableBody>
                {user?.orders?.map((order) =>
                  <TableRow key={`${order?.orderId}`}>
                    <TableCell>{order?.orderId}</TableCell>
                    <TableCell>
                      {order?.items?.product?.map((item, index) => (
                        <Grid key={`${index}`} display={"flex"} alignItems="center" gap={2} spacing={2}>
                          <Grid item>
                            <Avatar
                              src={item?.image}
                              alt={item?.productName}
                              sx={{ width: 25, height: 25 }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography variant="p" style={{ whiteSpace: "nowrap" }}>{item?.productName}</Typography>
                          </Grid>
                        </Grid>
                      ))}
                    </TableCell>
                    <TableCell>৳{order?.totalAmount?.toFixed(2)}</TableCell>
                    <TableCell>৳{order?.finalAmount?.toFixed(2)}</TableCell>
                    <TableCell>{order?.paymentMethod}</TableCell>


                    <TableCell>
                      <Chip
                        label={order?.paymentStatus}
                        color={
                          order?.paymentStatus === "pending"
                            ? "warning"
                            : order?.paymentStatus === "shipped"
                              ? "info"
                              : order?.paymentStatus === "delivered"
                                ? "success"
                                : "error"
                        }
                      />
                    </TableCell>
                    <TableCell >
                      {new Date(order.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell><Link to={`/ecommerce/orders/order-details/${order._id}`}>
                      <RemoveRedEyeIcon />
                    </Link></TableCell>
                  </TableRow>
                )}

              </TableBody>
            </Table>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1); // Reset to page 1 when limit changes
                  }}
                  displayEmpty
                >
                  <MenuItem value={2}>5</MenuItem>
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
          </TableContainer>
        )}
      </Card>

      <Footer />
    </DashboardLayout>
  );
}

export default UserDetails;
