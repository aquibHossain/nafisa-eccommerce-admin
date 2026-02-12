// @mui material components
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import { Box, Button, Typography } from "@mui/material";

// Custom styles for the Configurator
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";

// Charg Dashboard MUI context
import {
  useArgonController,
  setOpenConfigurator,
  setDarkSidenav,
  setMiniSidenav,
  setFixedNavbar,
  setSidenavColor,
  setDarkMode,
} from "context";

function Configurator() {
  const [controller, dispatch] = useArgonController();
  const { openConfigurator, darkSidenav, miniSidenav, fixedNavbar, sidenavColor, darkMode } =
    controller;
  const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
  const handledarkSidenav = () => setDarkSidenav(dispatch, true);
  const handleWhiteSidenav = () => setDarkSidenav(dispatch, false);
  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);
  const handleDarkMode = () => {
    setDarkSidenav(dispatch, !darkMode);
    setDarkMode(dispatch, !darkMode);
  };

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={3}
        pb={0.8}
        px={3}
      >
        <Box>
          <Typography variant="h5">Charg Configuration</Typography>
          <Typography variant="body2">See our dashboard options.</Typography>
        </Box>

        <Icon
          sx={({ typography: { size, fontWeightBold }, palette: { dark, white } }) => ({
            fontSize: `${size.md} !important`,
            fontWeight: `${fontWeightBold} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: darkMode ? white.main : dark.main,
            strokeWidth: "2px",
            cursor: "pointer",
            mt: 2,
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </Box>
      <Divider />

      <Box pt={1.25} pb={3} px={3}>
        <Box>
          <Typography variant="h6">Sidenav Colors</Typography>

          <Box mb={0.5}>
            {sidenavColors.map((color) => (
              <IconButton
                key={color}
                sx={({ borders: { borderWidth }, palette: { white, dark }, transitions }) => ({
                  width: "24px",
                  height: "24px",
                  padding: 0,
                  border: `${borderWidth[1]} solid ${white.main}`,
                  borderColor: sidenavColor === color && dark.main,
                  transition: transitions.create("border-color", {
                    easing: transitions.easing.sharp,
                    duration: transitions.duration.shorter,
                  }),
                  backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
                    linearGradient(gradients[color].main, gradients[color].state),
                  "&:not(:last-child)": {
                    mr: 1,
                  },
                  "&:hover, &:focus, &:active": {
                    borderColor: dark.main,
                  },
                })}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </Box>
        </Box>

        <Box mt={3} lineHeight={1}>
          <Typography variant="h6">Sidenav Type</Typography>
          <Typography variant="button" fontWeight="regular">
            Choose between 2 different sidenav types.
          </Typography>

          <Box
            sx={{
              display: "flex",
              mt: 2,
            }}
          >
            <Button
              color="info"
              variant={darkSidenav ? "outlined" : "gradient"}
              onClick={handleWhiteSidenav}
              fullWidth
            >
              White
            </Button>
            <Button
              color="info"
              variant={darkSidenav ? "gradient" : "outlined"}
              onClick={handledarkSidenav}
              fullWidth
              sx={{
                ml: 1,
              }}
            >
              Dark
            </Button>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={3} lineHeight={1}>
          <Typography variant="h6">Navbar Fixed</Typography>

          <Switch checked={fixedNavbar} onChange={handleFixedNavbar} />
        </Box>

        <Divider />

        <Box display="flex" justifyContent="space-between" lineHeight={1}>
          <Typography variant="h6">Sidenav Mini</Typography>

          <Switch checked={miniSidenav} onChange={handleMiniSidenav} />
        </Box>

        <Divider />

        <Box display="flex" justifyContent="space-between" lineHeight={1}>
          <Typography variant="h6">Light / Dark</Typography>

          <Switch checked={darkMode} onChange={handleDarkMode} />
        </Box>
      </Box>
    </ConfiguratorRoot>
  );
}

export default Configurator;
