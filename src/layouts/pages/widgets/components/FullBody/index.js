

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";


import { Box } from "@mui/material";

import { Badge } from "@mui/material";

function FullBody() {
  return (
    <Card>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={3}
        mb={2}
        px={3}
      >
        <Typography variant="body2" color="text" fontWeight="regular">
          Full Body
        </Typography>
        <Badge variant="contained" color="info" badgeContent="moderate" container />
      </Box>
      <Box pb={3} px={3}>
        <Typography variant="body2" color="text" fontWeight="regular">
          What matters is the people who are sparked by it. And the people who are liked.
        </Typography>
      </Box>
    </Card>
  );
}

export default FullBody;
