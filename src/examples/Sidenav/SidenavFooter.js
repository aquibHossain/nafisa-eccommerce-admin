// @mui material components
import Link from "@mui/material/Link";

import { Button } from "@mui/material";
import { Box } from "@mui/material";

// Charg Dashboard MUI context
import { useArgonController } from "context";

function SidenavFooter() {
  const [controller] = useArgonController();
  const { miniSidenav, darkSidenav } = controller;

  return (
    <Box opacity={miniSidenav ? 0 : 1} sx={{ transition: "opacity 200ms linear" }}>
      <Box position="relative" textAlign="center"></Box>
      <Box display="flex" flexDirection="column">
        <Button
          onClick={() => { localStorage.removeItem("token"); window.location.href = "/authentication/sign-in" }}
          color="dark"
          size="small"
          fullWidth
          sx={{ mb: 1 }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default SidenavFooter;
