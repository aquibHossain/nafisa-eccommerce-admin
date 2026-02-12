

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";


import { Box } from "@mui/material";

import { Button } from "@mui/material";

function Authentication() {
  return (
    <Card>
      <Box display="flex" justifyContent="space-between" alignItems="centers" pt={2} px={2}>
        <Typography variant="h6" fontWeight="medium">
          Two factor authentication
        </Typography>
        <Button variant="gradient" color="dark" size="small">
          Enable
        </Button>
      </Box>
      <Box p={2}>
        <Box mt={6} mb={3} lineHeight={0}>
          <Typography variant="button" fontWeight="regular" color="text">
            Two-factor authentication adds an additional layer of security to your account by
            requiring more than just a password to log in.
          </Typography>
        </Box>
        <Box
          bgColor="dark"
          borderRadius="lg"
          shadow="lg"
          p={2}
          variant="gradient"
          lineHeight={1}
        >
          <Typography variant="h6" fontWeight="medium" color="white">
            Questions about security?
          </Typography>
          <Box mb={3}>
            <Typography variant="button" fontWeight="regular" color="white">
              Have a question, concern, or comment about security? Please contact us.
            </Typography>
          </Box>
          <Button variant="gradient" color="light">
            Contact Us
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default Authentication;
