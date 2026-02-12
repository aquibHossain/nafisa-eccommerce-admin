import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

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
  TextField,
  IconButton,
} from "@mui/material";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import config from "config";
import axios from "axios";
import toast from "react-hot-toast";

function CategoryList() {
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
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config?.production_url}/category/admin/all`, {
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
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, [page, limit, searchQuery]);

  const handleAction = async (id) => {
    try {
      await axios.delete(`${config?.production_url}/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setList((prev) => prev.filter((cat) => cat._id !== id));
      toast.success("Category was deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting category.");
    }
  };

  const updateOrder = async (id, newOrder) => {
    try {
      await axios.put(
        `${config?.production_url}/category/${id}`,
        { order: Number(newOrder) ? newOrder : 1 },
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
      prevList.map((cat) =>
        cat._id === id
          ? {
            ...cat,
            order: direction === "up" ? cat.order + 1 : cat.order - 1,
          }
          : cat
      )
    );

    const updatedCategory = list.find((cat) => cat._id === id);
    const newOrder = direction === "up" ? updatedCategory.order + 1 : updatedCategory.order - 1;
    updateOrder(id, newOrder);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box my={3}>
        <Card>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <Box lineHeight={1}>
              <Typography variant="h5" fontWeight="medium">All Categories</Typography>
              <Typography variant="button" fontWeight="regular" color="text">
                Manage categories efficiently with search, pagination and ordering.
              </Typography>
            </Box>
            <Stack spacing={2} direction="row">
              <Link to="/ecommerce/new-category">
                <Button variant="contained" color="info" size="small">New Category</Button>
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
                <TableCell align="center">Created At</TableCell>
                <TableCell align="center">View</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
              <TableBody>
                {list.map((row, index) => (
                  <TableRow key={row._id}>
                    <TableCell align="center">{(page - 1) * limit + index + 1}</TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center" alignItems="center">
                        <IconButton onClick={() => handleOrderChange(row._id, "up")}>
                          <ArrowUpwardIcon color="primary" />
                        </IconButton>
                        <Typography>{row.order}</Typography>
                        <IconButton onClick={() => handleOrderChange(row._id, "down")}>
                          <ArrowDownwardIcon color="primary" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <img
                        src={row.image}
                        alt="Category"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{new Date(row.createdAt).toLocaleString()}</TableCell>
                    <TableCell align="center">
                      <Link to={`/ecommerce/category/edit-category/${row._id}`}>
                        <RemoveRedEyeIcon />
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleAction(row._id)}>
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
    </DashboardLayout>
  );
}

export default CategoryList;
