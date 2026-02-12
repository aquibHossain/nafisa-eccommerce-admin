// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";

import { Box } from "@mui/material";

// Charg Dashboard MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import dataTableData from "layouts/applications/data-tables/data/dataTableData";

function DataTables() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box pt={6} pb={3}>
        <Box mb={3}>
          <Card>
            <Box p={3} lineHeight={1}>
              <Typography variant="h5" fontWeight="medium">
                Datable Simple
              </Typography>
              <Typography variant="button" fontWeight="regular" color="text">
                A lightweight, extendable, dependency-free javascript HTML table plugin.sasas
              </Typography>
            </Box>
            <DataTable table={dataTableData} />
          </Card>
        </Box>
        <Card>
          <Box p={3} lineHeight={1}>
            <Typography variant="h5" fontWeight="medium">
              Datatable Search
            </Typography>
            <Typography variant="button" fontWeight="regular" color="text">
              A lightweight, extendable, dependency-free javascript HTML table plugin.
            </Typography>
          </Box>
          <DataTable table={dataTableData} canSearch />
        </Card>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default DataTables;
