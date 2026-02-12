import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  TextField,
  FormControl,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";

// Charg Dashboard MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Footer from "examples/Footer";
import userImg from "./../../../../assets/images/apple-icon.png"
// Data
import config from "config";
import axios from "axios";
import toast from "react-hot-toast";

function UserList() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState(""); // For user name search
  const [email, setEmail] = useState(""); // For user name search
  const [totalPages, setTotalPages] = useState(1); // To control pagination

  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("You are not authorized. Please log in first");
    return null;
  }

  const handleAction = async (id) => {
    try {
      const response = await axios.delete(`${config?.production_url}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted user from the list state
      setList((prevList) => prevList.filter((user) => user._id !== id));

      toast.success("User Was Deleted Successfully", response.data);
    } catch (err) {
      console.error(err);
      toast.error("Error deleting user.");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${config?.production_url}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            name: searchQuery,  // Searching by name
            email: email,  // Searching by email
            page,
            limit,
          },
        });

        const { result, totalPages: fetchedTotalPages } = response.data.data;
        setList(result);
        setTotalPages(fetchedTotalPages);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, [page, limit, searchQuery, email]); // Re-run effect when page, limit, or search query changes

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box my={3}>
        <Card>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <Box lineHeight={1}>
              <Typography variant="h5" fontWeight="medium">
                All Users
              </Typography>
              <Typography variant="button" fontWeight="regular" color="text">
                A lightweight, extendable, dependency-free react table with search and pagination.
              </Typography>
            </Box>
          </Box>

          <Box
            pb={3}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={3}>
            <Box px={3}>
              <Typography variant="h6">
                Search by Name
              </Typography>
              <TextField
                label=""
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1); // Reset to page 1 on new search
                }}
              />
            </Box>
            <Box px={3}>
              <Typography variant="h6">
                Search by Email
              </Typography>
              <TextField
                label=""
                variant="outlined"
                size="small"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setPage(1); // Reset to page 1 on new search
                }}
              />
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableRow>
                <TableCell align="center">S/N</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">User Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">View</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
              <TableBody>
                {list.map((row, index) => (
                  <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell align="center">{(page - 1) * limit + index + 1}</TableCell>
                    <TableCell align="center">
                      <img
                        src={row?.avatar ? row?.avatar : userImg}
                        alt="User"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "4px",
                          display: "block",
                          margin: "auto",
                        }}
                      />

                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">
                      <Link to={`/ecommerce/users/edit-user/${row._id}`}>
                        <button style={{ padding: "5px 10px", border: "none", color: "red", borderRadius: "4px", cursor: "pointer" }}>
                          <VisibilityIcon style={{ height: "25px", width: "25px" }} />
                        </button>
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <button
                        onClick={() => handleAction(row._id)}
                        style={{
                          padding: "5px 10px",
                          border: "none",
                          color: "red",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        <DeleteIcon style={{ height: "25px", width: "25px" }} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination and limit selection */}
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
      </Box >
      <Footer />
    </DashboardLayout >
  );
}

export default UserList;
