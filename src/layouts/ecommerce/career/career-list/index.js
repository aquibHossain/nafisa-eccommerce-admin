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

function CareerList() {
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
    const fetchcareers = async () => {
      try {
        const response = await axios.get(`${config?.production_url}/career/admin/all`, {
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
        console.error("Failed to fetch careers:", error);
      }
    };

    fetchcareers();
  }, [page, limit, searchQuery]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config?.production_url}/career/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setList((prevList) => prevList.filter((career) => career._id !== id));
      toast.success("career was deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting career.");
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
                All careers
              </Typography>
              <Typography variant="button" fontWeight="regular" color="text">
                Manage your careers efficiently with search and pagination.
              </Typography>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableRow>
                <TableCell align="center">S/N</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Mobile</TableCell>
                <TableCell align="center">View</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
              <TableBody>
                {list.map((career, index) => (
                  <TableRow key={career._id}>
                    <TableCell align="center">{(page - 1) * limit + index + 1}</TableCell>
                    <TableCell align="center">{career.firstName}</TableCell>
                    <TableCell align="center">{career.email}</TableCell>
                    <TableCell align="center">{career.mobile}</TableCell>
                    <TableCell align="center">
                      <Link to={`/ecommerce/career/edit-career/${career._id}`}>
                        <RemoveRedEyeIcon />
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleDelete(career._id)}>
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

export default CareerList;