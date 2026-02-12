

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";


import { Box } from "@mui/material";

import { Button } from "@mui/material";

// Security page components
import FormField from "layouts/pages/account/components/FormField";

function ChangePassword() {
  return (
    <Card id="change-password">
      <Box pt={2} px={2} lineHeight={1}>
        <Typography variant="h6" fontWeight="medium">
          Change Password
        </Typography>
        <Typography variant="button" fontWeight="regular" color="text">
          We will send you an email with the verification code.
        </Typography>
      </Box>
      <Box component="form" p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormField
              label="current password"
              placeholder="Current Password"
              inputProps={{ type: "password", autoComplete: "" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              label="new password"
              placeholder="New Password"
              inputProps={{ type: "password", autoComplete: "" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              label="confirm new password"
              placeholder="Confirm Password"
              inputProps={{ type: "password", autoComplete: "" }}
            />
          </Grid>
        </Grid>
        <Box mt={2}>
          <Button variant="gradient" color="dark" fullWidth>
            Update Password
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default ChangePassword;
