

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";


import { Box } from "@mui/material";


// Charg Dashboard MUI example components
import DefaultItem from "examples/Items/DefaultItem";

function NextEvents() {
  return (
    <Card sx={{ height: "100%" }}>
      <Box pt={2} px={2}>
        <Typography variant="h6" fontWeight="medium">
          Next events
        </Typography>
      </Box>
      <Box p={2}>
        <DefaultItem icon="paid" title="Cyber Week" description="27 March 2020, at 12:30 PM" />
        <Box mt={3.5}>
          <DefaultItem
            color="primary"
            icon="notifications"
            title="Meeting with Marry"
            description="24 March 2020, at 10:00 PM"
          />
        </Box>
        <Box mt={3.5}>
          <DefaultItem
            color="success"
            icon="menu_book"
            title="Book Deposit Hall"
            description="25 March 2021, at 9:30 AM"
          />
        </Box>
        <Box mt={3.5}>
          <DefaultItem
            color="warning"
            icon="local_shipping"
            title="Shipment Deal UK"
            description="25 March 2021, at 2:00 PM"
          />
        </Box>
        <Box mt={3.5}>
          <DefaultItem
            color="error"
            icon="palette"
            title="Verify Dashboard Color Palette"
            description="26 March 2021, at 9:00 AM"
          />
        </Box>
      </Box>
    </Card>
  );
}

export default NextEvents;
