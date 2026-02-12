import { useState } from "react";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import { Badge, Box, Button, Typography, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import PieChart from "examples/Charts/PieChart";

function ChannelsChart({ data }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const chartData = data ?? { labels: [], datasets: { data: [] } };

  return (
    <>
      <Card sx={{ overflow: "visible" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
          <Typography variant="h6">Product Sales</Typography>
          <Tooltip title="See which products are selling the most" placement="bottom" arrow>
            <Button variant="outlined" color="secondary" size="small" circular iconOnly>
              Details
            </Button>
          </Tooltip>
        </Box>

        <Box p={2} mt={3}>
          <Grid container alignItems="center">
            <Grid item xs={12}>
              <PieChart chart={chartData} height="172px" />
            </Grid>
          </Grid>
        </Box>

        <Box pt={4} pb={2} px={2} display="flex" flexDirection={{ xs: "column", sm: "row" }} mt="auto">
          <Box width={{ xs: "100%", sm: "60%" }} lineHeight={1}>
            <Typography variant="button" color="text" fontWeight="regular">
              Your best-selling product is <strong>{chartData?.labels[0] || "Loading..."}</strong> with
              <strong> {chartData?.datasets?.data[0] || 0}</strong> units sold.
            </Typography>
          </Box>
          <Box width={{ xs: "100%", sm: "40%" }} textAlign="right" mt={{ xs: 2, sm: "auto" }}>
            <Button color="light" onClick={handleOpen}>View Report</Button>
          </Box>
        </Box>
      </Card>

      {/* Modal for List View Report */}
      <Modal open={open} onClose={handleClose} aria-labelledby="sales-report-title">
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2
        }}>
          <Typography id="sales-report-title" variant="h6" component="h2" mb={2}>
            Sales Report
          </Typography>
          <TableContainer component={Paper}>
            <Table>

              <TableRow>
                <TableCell><strong>Product</strong></TableCell>
                <TableCell align="right"><strong>Units Sold</strong></TableCell>
              </TableRow>

              <TableBody>
                {chartData?.labels?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item}</TableCell>
                    <TableCell align="right">{chartData?.datasets?.data[index] || 0}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={2} textAlign="right">
            <Button onClick={handleClose} color="secondary">Close</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ChannelsChart;
