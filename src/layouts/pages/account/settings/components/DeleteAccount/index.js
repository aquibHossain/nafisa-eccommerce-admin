

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Switch from "@mui/material/Switch";


import { Box } from "@mui/material";

import { Button } from "@mui/material";

function DeleteAccount() {
  return (
    <Card id="delete-account">
      <Box p={3} lineHeight={1}>
        <Box mb={1}>
          <Typography variant="h5">Delete Account</Typography>
        </Box>
        <Typography variant="button" color="text" fontWeight="regular">
          Once you delete your account, there is no going back. Please be certain.
        </Typography>
      </Box>
      <Box
        pb={3}
        px={3}
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Box display="flex" alignItems="center" mb={{ xs: 3, sm: 0 }}>
          <Switch />
          <Box ml={2} lineHeight={0}>
            <Typography display="block" variant="button" fontWeight="medium">
              Confirm
            </Typography>
            <Typography variant="caption" color="text">
              I want to delete my account.
            </Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }}>
          <Button variant="outlined" color="secondary">
            Deactivate
          </Button>
          <Box ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
            <Button variant="gradient" color="error" sx={{ height: "100%" }}>
              Delete Account
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default DeleteAccount;
