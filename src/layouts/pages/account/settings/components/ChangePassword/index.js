

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";


import { Box } from "@mui/material";

import { Button } from "@mui/material";


import FormField from "layouts/pages/account/components/FormField";

function ChangePassword() {
  const passwordRequirements = [
    "One special characters",
    "Min 6 characters",
    "One number (2 are recommended)",
    "Change it often",
  ];

  const renderPasswordRequirements = passwordRequirements.map((item, key) => {
    const itemKey = `element-${key}`;

    return (
      <Box key={itemKey} component="li" color="text" fontSize="1.25rem" lineHeight={1}>
        <Typography variant="button" color="text" fontWeight="regular" verticalAlign="middle">
          {item}
        </Typography>
      </Box>
    );
  });

  return (
    <Card id="change-password">
      <Box p={3}>
        <Typography variant="h5">Change Password</Typography>
      </Box>
      <Box component="form" pb={3} px={3}>
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
        <Box mt={6} mb={1}>
          <Typography variant="h5">Password requirements</Typography>
        </Box>
        <Box mb={1}>
          <Typography variant="body2" color="text">
            Please follow this guide for a strong password
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
          flexWrap="wrap"
        >
          <Box component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
            {renderPasswordRequirements}
          </Box>
          <Box ml="auto">
            <Button variant="gradient" color="dark" size="small">
              Update Password
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default ChangePassword;
