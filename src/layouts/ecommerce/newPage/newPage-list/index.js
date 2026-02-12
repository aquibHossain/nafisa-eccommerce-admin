import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
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
  Grid,
  IconButton,
} from "@mui/material";

// Charg Dashboard MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Axios and config
import config from "config";
import axios from "axios";
import toast from "react-hot-toast";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function NewPageList() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [bannerType, setBannerType] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");

  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("You are not authorized. Please log in.");
    return null;
  }

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          `${config?.production_url}/page/admin/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            params: {
              page,
              limit,
              sortBy: "order",
              sortOrder,
            },
          }
        );
        const { result, totalPages: fetchedTotalPages } = response.data.data;
        setList(result);
        setTotalPages(fetchedTotalPages);
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      }
    };

    fetchBanners();
  }, [page, limit, sortOrder, bannerType]);

  const handleAction = async (id) => {
    if (!token) {
      toast.error("You are not authorized. Please log in.");
      return;
    }

    try {
      await axios.delete(`${config?.production_url}/page/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted banner from the list state
      setList((prevList) => prevList.filter((banner) => banner._id !== id));

      toast.success("page was Deleted Successfully");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting banner.");
    }
  };


  const updateOrder = async (id, newOrder) => {
    try {
      await axios.put(
        `${config?.production_url}/page/${id}`,
        { order: Number(newOrder) ? newOrder : 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("page updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update page.");
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
              <Typography variant="h5" fontWeight="medium">
                All Page
              </Typography>
            </Box>
            <Stack spacing={1} direction="row">
              <Link to="/ecommerce/new-page">
                <Button variant="contained" color="info" size="small">
                  New Page
                </Button>
              </Link>
            </Stack>
          </Box>


          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableRow>
                <TableCell align="center">S/N</TableCell>
                <TableCell align="center">Order</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Slug</TableCell>
                <TableCell align="center">Created At</TableCell>
                <TableCell align="center">Updated At</TableCell>
                <TableCell align="center">View</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
              <TableBody>
                {list.map((row, index) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
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
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">
                      {row.slug}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(row.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(row.updatedAt).toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      <Link to={`/ecommerce/page/edit-page/${row?._id}`}>
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
                ))}
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

export default NewPageList;
