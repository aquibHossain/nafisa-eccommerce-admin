import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
  Pagination,
  FormControl,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import config from "config";
import axios from "axios";
import toast from "react-hot-toast";

function SubCategoryList() {
  const [list, setList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("You are not authorized. Please log in.");
    return null;
  }

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(`${config?.production_url}/sub-category/admin/all`, {
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
      setList(response.data.data.result);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch sub categories:", error);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, [page, limit, searchQuery]);

  const handleAction = async (id) => {
    try {
      await axios.delete(`${config?.production_url}/sub-category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchSubCategories();
      toast.success("Sub-category was deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting sub-category.");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box my={3}>
        <Card>
          <Box display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <Box>
              <Typography variant="h5" fontWeight="medium">
                All Sub Categories
              </Typography>
              <Typography variant="button" fontWeight="regular" color="text">
                Manage your sub-categories with pagination and search.
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Link to="/ecommerce/new-sub-category">
                <Button variant="contained" color="info">
                  New Sub Category
                </Button>
              </Link>
            </Stack>
          </Box>
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
          <TableContainer component={Paper}>
            <Table>
              <TableRow>
                <TableCell align="center">S/N</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Category Under</TableCell>
                <TableCell align="center">Created At</TableCell>
                <TableCell align="center">View</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
              <TableBody>
                {list.length > 0 ? (
                  list.map((row, index) => (
                    <TableRow key={row._id}>
                      <TableCell align="center">{index + 1 + (page - 1) * limit}</TableCell>
                      <TableCell align="center">
                        <img
                          src={row.image}
                          alt="Sub-category"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "4px",
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">
                        {row?.category?.name}
                      </TableCell>
                      <TableCell align="center">
                        {new Date(row.createdAt).toLocaleString()}
                      </TableCell>

                      <TableCell align="center">
                        <Link to={`/ecommerce/sub-category/edit-sub-category/${row._id}`}>
                          <RemoveRedEyeIcon />
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No sub-categories found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
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
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default SubCategoryList;
