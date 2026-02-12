// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";


import { Box } from "@mui/material";
import { Badge } from "@mui/material";
import { Button } from "@mui/material";


// Images
import bitcoin from "assets/images/logos/bitcoin.jpg";

// Data
const data = [
  { title: "Call with Dave", time: "09:30 AM", checked: true },
  { title: "Brunch Meeting", time: "11:00 AM", checked: false },
  { title: "Charg Dashboard Launch", time: "02:00 PM", checked: false },
  { title: "Winter Hackaton", time: "10:30 AM", checked: true },
];

function CryptoCoin() {
  return (
    <Card>
      <Box variant="gradient" bgColor="error">
        <Box p={3}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box
              component="img"
              src={bitcoin}
              alt="Image placeholder"
              width="22%"
              borderRadius="md"
            />
            <Badge
              size="lg"
              color="success"
              variant="contained"
              badgeContent="active"
              container
            />
          </Box>
          <Box my={3}>
            <Typography variant="button" color="white" opacity={0.8} fontWeight="regular">
              Address
            </Typography>
            <Tooltip title="Copy Address" placement="bottom">
              <Typography variant="h6" color="white" sx={{ cursor: "pointer" }}>
                0yx8Wkasd8uWpa083Jj81qZhs923K21
              </Typography>
            </Tooltip>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="flex-end" mt={6}>
            <Box>
              <Typography variant="button" color="white" opacity={0.8} fontWeight="regular">
                Name
              </Typography>
              <Typography variant="h6" color="white">
                John Snow
              </Typography>
            </Box>
            <Stack direction="row" spacing={0.5} textAlign="right">
              <Tooltip title="Reveive" placement="top">
                <Button color="white" iconOnly circular>
                  <i className="ni ni-bold-down" />
                </Button>
              </Tooltip>
              <Tooltip title="Send" placement="top">
                <Button color="white" iconOnly circular>
                  <i className="ni ni-bold-up" />
                </Button>
              </Tooltip>
              <Tooltip title="Swap" placement="top">
                <Button color="white" iconOnly circular>
                  <i className="ni ni-curved-next" />
                </Button>
              </Tooltip>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default CryptoCoin;
