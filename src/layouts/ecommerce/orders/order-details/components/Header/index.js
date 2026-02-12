


import { Badge, Typography } from "@mui/material";
import { Box } from "@mui/material";

import { Button } from "@mui/material";

function Header({ data, handleOpenModal }) {

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box>
        <Box mb={1}>
          <Typography variant="h6" fontWeight="medium">
            Order Details
          </Typography>
        </Box>
        <Typography component="p" variant="button" fontWeight="regular" color="text">
          Order no. <span style={{ fontWeight: "bold" }}>#{data?.orderId}</span> from:
          <span style={{ fontWeight: "bold" }}>{new Date(data?.createdAt).toLocaleDateString()}</span>
        </Typography>
        <Typography component="p" fontWeight="regular" color="text">
          {data?.isActive ? <Badge
            variant="gradient"
            color="success"
            size="xs"
            badgeContent="Active"

          /> : <Badge
            variant="gradient"
            color="error"
            size="xs"
            badgeContent="InActive"

          />}
        </Typography>
      </Box>
      <Button variant="gradient" color="secondary" onClick={handleOpenModal}>
        Invoice
      </Button>
    </Box>
  );
}

export default Header;
