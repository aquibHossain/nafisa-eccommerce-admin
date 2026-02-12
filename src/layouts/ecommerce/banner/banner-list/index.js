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
} from "@mui/material";

// Charg Dashboard MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Axios and config
import config from "config";
import axios from "axios";
import toast from "react-hot-toast";

function BannerList() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [bannerType, setBannerType] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");

  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("You are not authorized. Please log in.");
    return null;
  }

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          `${config?.production_url}/banner/admin/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            params: {
              bannerType,
              page,
              limit,
              sortBy: "createdAt",
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
      await axios.delete(`${config?.production_url}/banner/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted banner from the list state
      setList((prevList) => prevList.filter((banner) => banner._id !== id));

      toast.success("Banner Was Deleted Successfully");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting banner.");
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
                All Banners
              </Typography>
              <Typography variant="button" fontWeight="regular" color="text">
                A lightweight, extendable, dependency-free react table.
              </Typography>
            </Box>
            <Stack spacing={1} direction="row">
              <Link to="/ecommerce/new-banner">
                <Button variant="contained" color="info" size="small">
                  New Banner
                </Button>
              </Link>
            </Stack>
          </Box>

          <Box px={3}>
            <Grid container>
              <Grid item xs={12} lg={4}>
                <Box>
                  <Typography variant="h6" fontWeight="medium" mb={1}>
                    Banner Type
                  </Typography>
                  <Select
                    value={bannerType}
                    onChange={(e) => setBannerType(e.target.value)}
                    displayEmpty
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  >
                    <MenuItem value="">
                      All
                    </MenuItem>
                    <MenuItem value="popup">
                      Popup
                    </MenuItem>
                    <MenuItem value="slider">
                      Slider
                    </MenuItem>
                    <MenuItem value="static">
                      Static Banner
                    </MenuItem>
                  </Select>
                </Box>
              </Grid>

            </Grid>
          </Box>

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableRow>
                <TableCell align="center">S/N</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Link</TableCell>
                <TableCell align="center">Banner Type</TableCell>
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
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">
                      <img
                        src={row.image}
                        alt="Banner"
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
                    <TableCell align="center">
                      <a href={row.link} target="_blank" rel="noopener noreferrer">
                        View Link
                      </a>
                    </TableCell>
                    <TableCell align="center">
                      {row?.bannerType}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(row.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(row.updatedAt).toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      <Link to={`/ecommerce/banner/edit-banner/${row?._id}`}>
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

export default BannerList;
