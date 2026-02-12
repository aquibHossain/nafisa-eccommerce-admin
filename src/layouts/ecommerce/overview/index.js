import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

import Footer from "examples/Footer";
// Charg Dashboard MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DefaultStatisticsCard from "examples/Cards/StatisticsCards/DefaultStatisticsCard";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import SalesTable from "examples/Tables/SalesTable";

// Overview page components
import ChannelsChart from "layouts/ecommerce/overview/components/ChannelsChart";

// Data
import defaultLineChartData from "layouts/ecommerce/overview/data/defaultLineChartData";
import horizontalBarChartData from "layouts/ecommerce/overview/data/horizontalBarChartData";
import salesTableData from "layouts/ecommerce/overview/data/salesTableData";
import { Badge, Box, Button } from "@mui/material";
import config from "config";
import axios from "axios";
import toast from "react-hot-toast";
import SalesReportDashboard from "./data/SalesReport";

function Overview() {
  // DefaultStatisticsCard state for the dropdown value
  const [salesDropdownValue, setSalesDropdownValue] = useState("6 May - 7 May");
  const [customersDropdownValue, setCustomersDropdownValue] = useState("6 May - 7 May");
  const [revenueDropdownValue, setRevenueDropdownValue] = useState("6 May - 7 May");

  // DefaultStatisticsCard state for the dropdown action
  const [salesDropdown, setSalesDropdown] = useState(null);
  const [customersDropdown, setCustomersDropdown] = useState(null);
  const [revenueDropdown, setRevenueDropdown] = useState(null);

  // DefaultStatisticsCard handler for the dropdown action
  const openSalesDropdown = ({ currentTarget }) => setSalesDropdown(currentTarget);
  const closeSalesDropdown = ({ currentTarget }) => {
    setSalesDropdown(null);
    setSalesDropdownValue(currentTarget.innerText || salesDropdownValue);
  };
  const openCustomersDropdown = ({ currentTarget }) => setCustomersDropdown(currentTarget);
  const closeCustomersDropdown = ({ currentTarget }) => {
    setCustomersDropdown(null);
    setCustomersDropdownValue(currentTarget.innerText || salesDropdownValue);
  };
  const openRevenueDropdown = ({ currentTarget }) => setRevenueDropdown(currentTarget);
  const closeRevenueDropdown = ({ currentTarget }) => {
    setRevenueDropdown(null);
    setRevenueDropdownValue(currentTarget.innerText || salesDropdownValue);
  };

  const [dashboardData, setDashboardData] = useState({
    pendingOrders: { count: 0, percentage: "0%" },
    shippedOrders: { count: 0, percentage: "0%" },
    deliveredOrders: { count: 0, percentage: "0%" },
    cancelledOrders: { count: 0, percentage: "0%" },
    totalOrders: { count: 0, percentage: "0%" },
    activeOrders: { count: 0, percentage: "0%" },
    inActiveOrders: { count: 0, percentage: "0%" },
    totalOrdersAmount: { count: 0, percentage: "0%" },
    totalUsers: { count: 0, percentage: "0%" },
    totalCategory: 0,
    totalProduct: 0,
  });
  const [chartData, setChartData] = useState(defaultLineChartData)
  const [userChart, setUserChart] = useState()
  const [productChart, setProductChart] = useState()


  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("You are not authorized. Please log in.");
    window.location.href = "/authentication/sign-in"
  }

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${config?.production_url}/dashboard/stat`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setDashboardData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };
    const fetchDashboardOrderChartData = async () => {
      try {
        const response = await axios.get(`${config?.production_url}/dashboard/order-chart`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setChartData(response.data?.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };
    const fetchDashboardUserProductData = async () => {
      try {
        const response = await axios.get(`${config?.production_url}/dashboard/product-chart`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setProductChart(response.data?.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    const fetchDashboardUserData = async () => {
      try {
        const response = await axios.get(`${config?.production_url}/dashboard/user-chart`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setUserChart(response.data?.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
    fetchDashboardOrderChartData();
    fetchDashboardUserProductData();

    fetchDashboardUserData();

  }, []);

  // Dropdown menu template for the DefaultStatisticsCard
  const renderMenu = (state, close) => (
    <Menu
      anchorEl={state}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={Boolean(state)}
      onClose={close}
      keepMounted
      disableAutoFocusItem
    >
      <MenuItem onClick={close}>Last 7 days</MenuItem>
      <MenuItem onClick={close}>Last week</MenuItem>
      <MenuItem onClick={close}>Last 30 days</MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        <Box mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <DefaultStatisticsCard
                title="Pending Orders"
                count={dashboardData?.pendingOrders?.count}
                percentage={{
                  color: dashboardData?.pendingOrders?.percentage.includes("-") ? "error" : "success",
                  value: dashboardData?.pendingOrders?.percentage,
                  label: "since last month",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <DefaultStatisticsCard
                title="Shipped Orders"
                count={dashboardData?.shippedOrders?.count}
                percentage={{
                  color: dashboardData?.shippedOrders?.percentage.includes("-") ? "error" : "success",
                  value: dashboardData?.shippedOrders?.percentage,
                  label: "since last month",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <DefaultStatisticsCard
                title="Delivered Orders"
                count={dashboardData?.deliveredOrders?.count}
                percentage={{
                  color: dashboardData?.deliveredOrders?.percentage.includes("-") ? "error" : "success",
                  value: dashboardData?.deliveredOrders?.percentage,
                  label: "since last month",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <DefaultStatisticsCard
                title="Cancelled Orders"
                count={dashboardData?.cancelledOrders?.count}
                percentage={{
                  color: dashboardData?.cancelledOrders?.percentage.includes("-") ? "error" : "success",
                  value: dashboardData?.cancelledOrders?.percentage,
                  label: "since last month",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <DefaultStatisticsCard
                title="Total Orders"
                count={dashboardData?.totalOrders?.count}
                percentage={{
                  color: dashboardData?.totalOrders?.percentage.includes("-") ? "error" : "success",
                  value: dashboardData?.totalOrders?.percentage,
                  label: "since last month",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <DefaultStatisticsCard
                title="Active Orders"
                count={dashboardData?.activeOrders?.count}
                percentage={{
                  color: dashboardData?.activeOrders?.percentage.includes("-") ? "error" : "success",
                  value: dashboardData?.activeOrders?.percentage,
                  label: "since last month",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <DefaultStatisticsCard
                title="Inactive Orders"
                count={dashboardData?.inActiveOrders?.count}
                percentage={{
                  color: dashboardData?.inActiveOrders?.percentage.includes("-") ? "error" : "success",
                  value: dashboardData?.inActiveOrders?.percentage,
                  label: "since last month",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <DefaultStatisticsCard
                title="Total Orders Amount"
                count={`৳${dashboardData?.totalOrdersAmount?.count}`}
                percentage={{
                  color: dashboardData?.totalOrdersAmount?.percentage.includes("-") ? "error" : "success",
                  value: dashboardData?.totalOrdersAmount?.percentage,
                  label: "since last month",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <DefaultStatisticsCard
                title="Total Users"
                count={dashboardData?.totalUsers?.count}
                percentage={{
                  color: dashboardData?.totalUsers?.percentage.includes("-") ? "error" : "success",
                  value: dashboardData?.totalUsers?.percentage,
                  label: "since last month",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <DefaultStatisticsCard
                title="Total Categories"
                count={dashboardData?.totalCategory}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <DefaultStatisticsCard
                title="Total Products"
                count={dashboardData?.totalProduct}
              />
            </Grid>
          </Grid>
        </Box>
        <Box mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <ChannelsChart data={productChart} />
            </Grid>
            <Grid item xs={12} sm={6} lg={8}>
              <DefaultLineChart
                title=" Revenue"
                description={
                  <Box display="flex" justifyContent="space-between">
                    <Box mt={-5.25} mr={-1}>
                      <Tooltip title="See which Order month perform better" placement="left" arrow>
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          circular
                          iconOnly
                        >
                          <Icon>priority_high</Icon>
                        </Button>
                      </Tooltip>
                    </Box>
                  </Box>
                }
                chart={chartData}
              />
            </Grid>
          </Grid>
        </Box>
        <Box mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <HorizontalBarChart title="Number of new User" chart={userChart ?? horizontalBarChartData} />
            </Grid>
            <Grid item xs={12} lg={12}>
              <SalesReportDashboard />
            </Grid>
          </Grid>
        </Box>

      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
