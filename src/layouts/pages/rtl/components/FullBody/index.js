

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
          جسم كامل
        </Typography>
        <Badge variant="contained" color="info" badgeContent="معتدل" />
      </Box>
      <Box pb={3} px={3}>
        <Typography variant="body2" color="text" fontWeight="regular">
          ما يهم هو الأشخاص الذين أوقدوه. والناس الذين يشبهونهم مستاءون منه.
        </Typography>
      </Box>
    </Card>
  );
}

export default FullBody;
