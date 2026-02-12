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
  Chip,
} from "@mui/material";

// Charg Dashboard MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Axios and config
import config from "config";
import axios from "axios";
import toast from "react-hot-toast";

function EwarrentyList() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderId, setOrderId] = useState("");
  const [name, setName] = useState("");

  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("You are not authorized. Please log in.");
    return null;
  }

  useEffect(() => {
    const fetchEwarrentys = async () => {
      try {
        const response = await axios.get(`${config?.production_url}/e-warrenty/admin/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            page,
            limit,
            name,
            email,
            phone,
            orderId,
          },
        });

        const { result, totalPages: fetchedTotalPages } = response.data.data;
        setList(result);
        setTotalPages(fetchedTotalPages);
      } catch (error) {
        console.error("Failed to fetch Ewarrentys:", error);
      }
    };

    fetchEwarrentys();
  }, [page, limit, name, email, phone, orderId]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config?.production_url}/e-warrenty/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setList((prevList) => prevList.filter((Ewarrenty) => Ewarrenty._id !== id));
      toast.success("Ewarrenty was deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting Ewarrenty.");
    }
  };



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box my={3}>
        <Card>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <Box lineHeight={1}>
              <Typography variant="h5" fontWeight="medium">
                All Ewarrentys
              </Typography>
              <Typography variant="button" fontWeight="regular" color="text">
                Manage your Ewarrentys efficiently with search and pagination.
              </Typography>
            </Box>
          </Box>
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={3}
            px={3}
          >
            {/* Text Filters */}
            {[
              { label: "Search by Name", value: name, setter: setName },
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
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableRow>
                <TableCell align="center">S/N</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Mobile</TableCell>
                <TableCell align="center">Order Id</TableCell>
                <TableCell align="center">Purchase Date</TableCell>
                <TableCell align="center">Expire Date</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">View</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
              <TableBody>
                {list.map((ewarrenty, index) => (
                  <TableRow key={ewarrenty._id}>
                    <TableCell align="center">{(page - 1) * limit + index + 1}</TableCell>
                    <TableCell align="center">{ewarrenty.name}</TableCell>
                    <TableCell align="center">{ewarrenty.email}</TableCell>
                    <TableCell align="center">{ewarrenty.phone}</TableCell>
                    <TableCell align="center">{ewarrenty?.orderId?.orderId}</TableCell>
                    <TableCell align="center">   {new Date(ewarrenty.purchaseDate).toLocaleString()}</TableCell>
                    <TableCell align="center">   {new Date(ewarrenty.expirationDate).toLocaleString()}</TableCell>
                    <TableCell align="center">  <Chip
                      label={ewarrenty.status ? "Active" : "Inactive"}
                      color={ewarrenty.status ? "success" : "error"}
                    /></TableCell>
                    <TableCell align="center">
                      <Link to={`/ecommerce/ewarrenty/ewarrenty-details/${ewarrenty._id}`}>
                        <RemoveRedEyeIcon />
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleDelete(ewarrenty._id)}>
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

export default EwarrentyList;