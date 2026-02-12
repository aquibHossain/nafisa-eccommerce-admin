

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Switch from "@mui/material/Switch";


import { Box } from "@mui/material";

import { Button } from "@mui/material";

function SecuritySettings() {
  return (
    <Card>
      <Box pt={2} px={2}>
        <Typography variant="h6" fontWeight="medium">
          Security Settings
        </Typography>
      </Box>
      <Box p={2}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          lineHeight={1}
        >
          <Typography variant="button" fontWeight="regular" color="text">
            Notify me via email when logging in
          </Typography>
          <Box ml={2} mr={1}>
            <Switch defaultChecked />
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          lineHeight={1}
        >
          <Typography variant="button" fontWeight="regular" color="text">
            Send SMS confirmation for all online payments
          </Typography>
          <Box ml={2} mr={1}>
            <Switch />
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          lineHeight={1}
        >
          <Typography variant="button" fontWeight="regular" color="text">
            Check which devices accessed your account
          </Typography>
          <Box ml={2} mr={1}>
            <Switch defaultChecked />
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          lineHeight={1}
        >
          <Typography variant="button" fontWeight="regular" color="text">
            Find My Device, make sure your device can be found if it gets lost
          </Typography>
          <Box ml={2} mr={1}>
            <Switch />
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          lineHeight={1}
        >
          <Typography variant="button" fontWeight="regular" color="text">
            Lock your device with a PIN, pattern, or password
          </Typography>
          <Box ml={2} mr={1}>
            <Switch />
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          lineHeight={1}
        >
          <Typography variant="button" fontWeight="regular" color="text">
            Manage what apps have access to app-usage data on your device
          </Typography>
          <Box ml={2} mr={1}>
            <Switch defaultChecked />
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={6}>
          <Box mr={1}>
            <Button variant="outlined" color="info" size="small">
              Cancel
            </Button>
          </Box>
          <Button variant="gradient" color="info" size="small">
            Save Changes
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default SecuritySettings;
