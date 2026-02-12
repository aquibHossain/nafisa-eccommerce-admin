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
  Modal,
} from "@mui/material";

// Charg Dashboard MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Footer from "examples/Footer";

// Data
import config from "config";
import axios from "axios";
import toast from "react-hot-toast";
import { ListAltTwoTone, QuestionAnswer } from "@mui/icons-material";

function ProductsList() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState(""); // For product name search
  const [stock, setStock] = useState(""); // For product name search
  const [totalPages, setTotalPages] = useState(1); // To control pagination
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("You are not authorized. Please log in first");
    return null;
  }

  const handleAction = async (id) => {
    try {
      const response = await axios.delete(`${config?.production_url}/item/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted product from the list state
      setList((prevList) => prevList.filter((product) => product._id !== id));

      toast.success("Product Was Deleted Successfully", response.data);
    } catch (err) {
      console.error(err);
      toast.error("Error deleting product.");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config?.production_url}/item`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            name: searchQuery,  // Searching by name
            stock,
            page,
            limit,
          },
        });

        const { result, totalPages: fetchedTotalPages } = response.data.data;
        setList(result);
        setTotalPages(fetchedTotalPages);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [page, limit, searchQuery]); // Re-run effect when page, limit, or search query changes


  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box my={3}>
        <Card>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <Box lineHeight={1}>
              <Typography variant="h5" fontWeight="medium">
                All Products
              </Typography>
              <Typography variant="button" fontWeight="regular" color="text">
                A lightweight, extendable, dependency-free react table with search and pagination.
              </Typography>
            </Box>
            <Stack spacing={1} direction="row">
              <Link to="/ecommerce/products/new-product">
                <Button variant="contained" color="info" size="small">
                  New Product
                </Button>
              </Link>
            </Stack>
          </Box>

          <Box px={3} flex={1} display="flex" gap={4} alignItems="center">
            <Box >
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

            <Box >
              <Typography variant="h6" fontWeight="medium">
                Stock
              </Typography>
              <Select
                fullWidth
                value={stock}
                onChange={(e) => {
                  setStock(e.target.value);
                  setPage(1);
                }}
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
                <MenuItem value="in">
                  In Stock
                </MenuItem>
                <MenuItem value="out">
                  Out of Stock
                </MenuItem>

              </Select>
            </Box>

          </Box>

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableRow>
                <TableCell align="center">S/N</TableCell>
                <TableCell align="center">Product Name</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Display Price</TableCell>
                <TableCell align="center">Brand</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Sub Category</TableCell>
                <TableCell align="center">Stock</TableCell>
                <TableCell align="center">Reviews</TableCell>
                <TableCell align="center">Question</TableCell>
                <TableCell align="center">View</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
              <TableBody>
                {list.map((row, index) => (
                  <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell align="center">{(page - 1) * limit + index + 1}</TableCell>
                    <TableCell align="center">{row.productName}</TableCell>
                    <TableCell align="center">
                      <img
                        src={row?.productImage[0] || row.image}
                        alt="Product"
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
                    <TableCell align="center">{row.price}</TableCell>
                    <TableCell align="center">{row.displayPrice}</TableCell>
                    <TableCell align="center">{row?.brand?.name}</TableCell>
                    <TableCell align="center">{row?.category?.name}</TableCell>
                    <TableCell align="center">{row?.subCategory?.name}</TableCell>
                    <TableCell align="center">     <Button
                      style={{ fontSize: 12, color: "black" }}
                      variant="outlined"
                      onClick={() => handleOpenModal(row)}
                    >
                      See
                    </Button></TableCell>
                    <TableCell align="center">
                      <Link to={`/ecommerce/products/review/${row._id}`}>
                        <button style={{ padding: "5px 10px", border: "none", color: "red", borderRadius: "4px", cursor: "pointer" }}>
                          <ListAltTwoTone style={{ height: "25px", width: "25px" }} />
                        </button>
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Link to={`/ecommerce/products/question/${row._id}`}>
                        <button style={{ padding: "5px 10px", border: "none", color: "red", borderRadius: "4px", cursor: "pointer" }}>
                          <QuestionAnswer style={{ height: "25px", width: "25px" }} />
                        </button>
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Link to={`/ecommerce/products/edit-product/${row._id}`}>
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
      </Box>
      <Footer />
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 700,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Stock List
          </Typography>
          {selectedOrder?.inventory?.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>

                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Display Price</TableCell>
                </TableRow>

                <TableBody>
                  {selectedOrder.inventory.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <img
                          src={item.img}
                          alt={item.productName}
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                      </TableCell>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell
                        sx={{
                          color: item.quantity > 0 ? "green" : "red",
                          fontWeight: "bold",
                        }}
                      >
                        {item.quantity}
                      </TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.displayPrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No inventory available.</Typography>
          )}
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

export default ProductsList;
