import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
  Modal,
} from "@mui/material";

// Charg Dashboard MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Footer from "examples/Footer";
import DeleteIcon from "@mui/icons-material/Delete";
// Data
import config from "config";
import axios from "axios";
import toast from "react-hot-toast";
import ProductQuestionEdit from "../product-question-edit";


function ProductsQuestionList() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1); // To control pagination
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (!token) {
    toast.error("You are not authorized. Please log in first");
    return null;
  }

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${config?.production_url}/item/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });


      setList(response.data.data?.faq);
      setTotalPages(response.data.data?.faq?.length ?? 1);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {

    fetchProducts();
  }, [id]); // Re-run effect when page, limit, or search query changes

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const handleAction = async (id, reviewId) => {
    try {
      const response = await axios.delete(`${config?.production_url}/item/product/faq/admin/${id}/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts();

      toast.success("Product Review Was Deleted Successfully", response.data);
    } catch (err) {
      console.error(err);
      toast.error("Error deleting product.");
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
                All Question
              </Typography>
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableRow>
                <TableCell align="center">S/N</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Question</TableCell>
                <TableCell align="center">Answer </TableCell>
                <TableCell align="center">Action </TableCell>
              </TableRow>
              <TableBody>
                {list?.map((row, index) => (
                  <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell align="center">{(page - 1) * limit + index + 1}</TableCell>
                    <TableCell align="center">{row.name ?? row?.userId?.name}</TableCell>
                    <TableCell align="center">{row.email ?? row?.userId?.email}</TableCell>
                    <TableCell align="center">{row.question}</TableCell>
                    <TableCell align="center">{row?.answer}</TableCell>
                    <TableCell align="center" >
                      <Box display="flex" justifyContent="centert" alignItems="centert" gap={2}>
                        <Button
                          style={{ fontSize: 12, color: "black" }}
                          variant="outlined"
                          onClick={() => handleOpenModal(row)}
                        >
                          Edit
                        </Button>
                        <button
                          onClick={() => handleAction(id, row._id)}
                          style={{
                            border: "none",
                            color: "red",
                            cursor: "pointer",
                            background: "transparent"
                          }}
                        >
                          <DeleteIcon style={{ height: "25px", width: "25px" }} />
                        </button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination and limit selection */}
          <Box display="flex" justifyContent="end" alignItems="center" p={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </Card>
      </Box>
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
            Edit Question
          </Typography>
          <ProductQuestionEdit data={{ ...selectedOrder, productId: id }} handleCloseModal={handleCloseModal} fetchProducts={fetchProducts} />
          <Box mt={3} display="flex" justifyContent="space-between">
            <Button style={{ background: "red", }} color="error" variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <Footer />
    </DashboardLayout>
  );
}

export default ProductsQuestionList;
