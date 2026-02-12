

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";


import { Box } from "@mui/material";


function Emails() {
  return (
    <Card>
      <Box display="flex" justifyContent="space-between" p={3} lineHeight={1}>
        <Typography variant="body2" color="text">
          Emails (21)
        </Typography>
        <Tooltip title="Check your emails" placement="top">
          <Box component="a" href="#">
            <Typography variant="body2">Check</Typography>
          </Box>
        </Tooltip>
      </Box>
    </Card>
  );
}

export default Emails;
