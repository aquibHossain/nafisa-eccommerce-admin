

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";


import { Box } from "@mui/material";


// Charg Dashboard MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// ProductPage page components
import ProductImages from "layouts/ecommerce/products/product-page/components/ProductImages";
import ProductInfo from "layouts/ecommerce/products/product-page/components/ProductInfo";

// Data
import dataTableData from "layouts/ecommerce/products/product-page/data/dataTableData";

function ProductPage() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        <Card sx={{ overflow: "visible" }}>
          <Box p={3}>
            <Box mb={3}>
              <Typography variant="h5" fontWeight="medium">
                Product Details
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} lg={6} xl={5}>
                <ProductImages />
              </Grid>
              <Grid item xs={12} lg={5} sx={{ mx: "auto" }}>
                <ProductInfo />
              </Grid>
            </Grid>

            <Box mt={8} mb={2}>
              <Box mb={1} ml={2}>
                <Typography variant="h5" fontWeight="medium">
                  Other Products
                </Typography>
              </Box>
              <DataTable
                table={dataTableData}
                entriesPerPage={false}
                showTotalEntries={false}
                isSorted={false}
              />
            </Box>
          </Box>
        </Card>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default ProductPage;
