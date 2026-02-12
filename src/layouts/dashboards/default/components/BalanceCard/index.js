// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";


import { Box } from "@mui/material";
import { Button } from "@mui/material";
import ArgonProgress from "components/ArgonProgress";


// Data
const data = [
  { title: "Call with Dave", time: "09:30 AM", checked: true },
  { title: "Brunch Meeting", time: "11:00 AM", checked: false },
  { title: "Charg Dashboard Launch", time: "02:00 PM", checked: false },
  { title: "Winter Hackaton", time: "10:30 AM", checked: true },
];

function BalanceCard() {
  return (
    <Card>
      <Box variant="gradient" bgColor="dark">
        <Box p={3}>
          <Box mb={1}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography component="sup" variant="caption" color="white">
                $
              </Typography>{" "}
              <Typography component="span" variant="h2" color="white" fontWeight="bold">
                3,300
              </Typography>
            </Box>
            <Typography
              component="div"
              variant="button"
              color="white"
              fontWeight="regular"
              opacity={0.8}
              mt={1}
            >
              Your current balance
            </Typography>
            <Box>
              <Typography component="span" variant="body2" color="success">
                + 15%
              </Typography>{" "}
              <Typography component="span" variant="body2" color="white" opacity={0.8}>
                ($250)
              </Typography>{" "}
            </Box>
          </Box>
          <Button color="white" size="small" fullWidth>
            Add credit
          </Button>
        </Box>
        <Box pb={3} px={3}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                Orders: 60%
              </Typography>
              <Box my={1}>
                <ArgonProgress value={60} color="success" />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                Sales: 40%
              </Typography>
              <Box my={1}>
                <ArgonProgress value={40} color="warning" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Card>
  );
}

export default BalanceCard;
