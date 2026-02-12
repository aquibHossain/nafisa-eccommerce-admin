// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";


import { Box } from "@mui/material";

import { Badge } from "@mui/material";

function Steps() {
  return (
    <Card>
      <Box p={3}>
        <Typography variant="body2" color="text" fontWeight="regular">
          Steps
        </Typography>
        <Box mt={2} mb={1} lineHeight={0}>
          <Typography variant="h3" fontWeight="bold">
            11.4K
          </Typography>
        </Box>
        <Badge variant="contained" color="success" badgeContent="+4.3%" container />
      </Box>
    </Card>
  );
}

export default Steps;
