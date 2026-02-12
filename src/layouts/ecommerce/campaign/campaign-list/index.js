import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// @mui material components
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  TextField,
} from "@mui/material";

// Charg Dashboard MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Axios and config
import config from "config";
import axios from "axios";
import toast from "react-hot-toast";

function CampaignList() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("You are not authorized. Please log in.");
    return null;
  }

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(`${config?.production_url}/campaign/admin/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            page,
            limit,
            name: searchQuery,
          },
        });

        const { result, totalPages: fetchedTotalPages } = response.data.data;
        setList(result);
        setTotalPages(fetchedTotalPages);
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
      }
    };

    fetchCampaigns();
  }, [page, limit, searchQuery]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config?.production_url}/campaign/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setList((prevList) => prevList.filter((campaign) => campaign._id !== id));
      toast.success("Campaign was deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting campaign.");
    }
  };

  const updateOrder = async (id, newOrder) => {
    try {
      await axios.put(
        ` ${config?.production_url}/campaign/${id}`,
        { order: newOrder },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Order updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order.");
    }
  };

  const handleOrderChange = (id, direction) => {
    setList((prevList) =>
      prevList.map((campaign) =>
        campaign._id === id
          ? {
            ...campaign,
            order: direction === "up" ? campaign.order + 1 : campaign.order - 1,
          }
          : campaign
      )
    );

    const updatedCampaign = list.find((campaign) => campaign._id === id);
    const newOrder = direction === "up" ? updatedCampaign.order + 1 : updatedCampaign.order - 1;
    updateOrder(id, newOrder);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box my={3}>
        <Card>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <Box lineHeight={1}>
              <Typography variant="h5" fontWeight="medium">
                All Campaigns
              </Typography>
              <Typography variant="button" fontWeight="regular" color="text">
                Manage your campaigns efficiently with search and pagination.
              </Typography>
            </Box>
            <Stack spacing={2} direction="row">
              <Link to="/campaign/create-campaign">
                <Button variant="contained" color="info" size="small">
                  New Campaign
                </Button>
              </Link>
            </Stack>
          </Box>
          <Box px={3}>
            <Typography variant="h6">Search by Name</Typography>
            <TextField
              label=""
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
            />
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableRow>
                <TableCell align="center">S/N</TableCell>
                <TableCell align="center">Order</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Start Date</TableCell>
                <TableCell align="center">End Date</TableCell>
                <TableCell align="center">View</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
              <TableBody>
                {list.map((campaign, index) => (
                  <TableRow key={campaign._id}>
                    <TableCell align="center">{(page - 1) * limit + index + 1}</TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center" alignItems="center">
                        <IconButton onClick={() => handleOrderChange(campaign._id, "up")}>
                          <ArrowUpwardIcon color="primary" />
                        </IconButton>
                        <Typography>{campaign.order}</Typography>
                        <IconButton onClick={() => handleOrderChange(campaign._id, "down")}>
                          <ArrowDownwardIcon color="primary" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <img
                        src={campaign.image}
                        alt="Campaign"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">{campaign.name}</TableCell>
                    <TableCell align="center">{new Date(campaign.startDate).toLocaleDateString()}</TableCell>
                    <TableCell align="center">{new Date(campaign.endDate).toLocaleDateString()}</TableCell>
                    <TableCell align="center">
                      <Link to={`/ecommerce/campaign/edit-campaign/${campaign._id}`}>
                        <RemoveRedEyeIcon />
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleDelete(campaign._id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1);
                  }}
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
          </TableContainer>
        </Card>
      </Box>
      <Footer />
    </DashboardLayout >
  );
}

export default CampaignList;