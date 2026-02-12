

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";


import { Box } from "@mui/material";


// Charg Dashboard MUI example components
import DefaultItem from "examples/Items/DefaultItem";

function OrdersOverview() {
  return (
    <Card sx={{ height: "100%" }}>
      <Box pt={2} px={2}>
        <Typography variant="h6" fontWeight="bold">
          الأحداث القادمة
        </Typography>
        <Typography variant="button" color="text" fontWeight="bold">
          انضم
        </Typography>
      </Box>
      <Box p={2}>
        <DefaultItem icon="paid" title="أسبوع الإنترنت" description="01 يونيو 2021, ي 12:30 PM" />
        <Box mt={3.5}>
          <DefaultItem
            color="primary"
            icon="notifications"
            title="لقاء مع ماري"
            description="24 مايو 2021, ي 10:00 PM"
          />
        </Box>
      </Box>
    </Card>
  );
}

export default OrdersOverview;
