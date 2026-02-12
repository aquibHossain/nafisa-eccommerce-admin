
// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";


import { Box } from "@mui/material";


// Charg Dashboard MUI example components
import DefaultItem from "examples/Items/DefaultItem";

function UpcomingEvents() {
  return (
    <Card sx={{ height: "100%" }}>
      <Box pt={2} px={2} lineHeight={1}>
        <Typography variant="h6" fontWeight="medium">
          Upcoming events
        </Typography>
        <Typography variant="button" color="text" fontWeight="medium">
          Joined
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
      </Box>
    </Card>
  );
}

export default UpcomingEvents;
