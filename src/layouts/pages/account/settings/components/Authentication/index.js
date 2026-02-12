

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";


import { Box } from "@mui/material";

import { Button } from "@mui/material";
import { Badge } from "@mui/material";

// Charg Dashboard MUI contexts
import { useArgonController } from "context";

function Authentication() {
  const [controller] = useArgonController();
  const { darkMode } = controller;

  return (
    <Card id="2fa" sx={{ overflow: "visible" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <Typography variant="h5">Two-factor authentication</Typography>
        <Badge variant="contained" color="success" badgeContent="enabled" container />
      </Box>
      <Box p={3}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Typography variant="body2" color="text">
            Security keys
          </Typography>
          <Box
            display="flex"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <Box mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
              <Typography variant="button" color="text" fontWeight="regular">
                No Security keys
              </Typography>
            </Box>
            <Button variant="outlined" color={darkMode ? "white" : "dark"} size="small">
              Add
            </Button>
          </Box>
        </Box>
        <Divider />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Typography variant="body2" color="text">
            SMS number
          </Typography>
          <Box
            display="flex"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <Box mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
              <Typography variant="button" color="text" fontWeight="regular">
                +3012374423
              </Typography>
            </Box>
            <Button variant="outlined" color={darkMode ? "white" : "dark"} size="small">
              Edit
            </Button>
          </Box>
        </Box>
        <Divider />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Typography variant="body2" color="text">
            Authenticator app
          </Typography>
          <Box
            display="flex"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <Box mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
              <Typography variant="button" color="text" fontWeight="regular">
                Not Configured
              </Typography>
            </Box>
            <Button variant="outlined" color={darkMode ? "white" : "dark"} size="small">
              Set Up
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default Authentication;
