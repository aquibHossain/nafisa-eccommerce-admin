

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";


import { Box, Button, Modal } from "@mui/material";

// Charg Dashboard MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// OrderDetails page components
import Header from "layouts/ecommerce/orders/order-details/components/Header";
import OrderInfo from "layouts/ecommerce/orders/order-details/components/OrderInfo";
import TrackOrder from "layouts/ecommerce/orders/order-details/components/TrackOrder";
import PaymentDetails from "layouts/ecommerce/orders/order-details/components/PaymentDetails";
import BillingInformation from "layouts/ecommerce/orders/order-details/components/BillingInformation";
import OrderSummary from "layouts/ecommerce/orders/order-details/components/OrderSummary";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import config from "config";
import Invoice from "./components/PrintInvoice";

function OrderDetails() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.production_url}/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, id]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box my={7}>
        <Grid spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <Box pt={2} px={2}>
                <Header data={orders} handleOpenModal={handleOpenModal} />
              </Box>
              <Divider />
              <Box pt={1} pb={3} px={2}>
                <Box mb={3}>
                  <OrderInfo data={orders} />
                </Box>
                <Divider />
                <Box mt={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                      <TrackOrder data={orders} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={5}>
                      <PaymentDetails data={orders} />
                      <Box mt={3}>
                        <BillingInformation data={orders} />
                      </Box>
                    </Grid>
                    <Grid item xs={12} lg={3} sx={{ ml: "auto" }}>
                      <OrderSummary data={orders} />
                    </Grid>
                    <Grid item xs={12} lg={3} sx={{ ml: "auto" }}>

                    </Grid>
                  </Grid>
                </Box>
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
            maxWidth: 1200,
            maxHeight: "80vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            overflowY: "auto",
          }}
        >
          {orders && <Invoice order={orders} />}
          <Box mt={3} display="flex" justifyContent="space-between">
            <Button style={{ background: "red", }} color="error" variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

    </DashboardLayout>
  );
}

export default OrderDetails;
