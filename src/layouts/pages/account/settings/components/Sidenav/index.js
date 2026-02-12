

// @mui material components
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";


import { Box } from "@mui/material";


// Charg Dashboard MUI contexts
import { useArgonController } from "context";

function Sidenav() {
  const [controller] = useArgonController();
  const { darkMode } = controller;

  const sidenavItems = [
    { icon: <i className="ni ni-spaceship" />, label: "profile", href: "profile" },
    { icon: <i className="ni ni-books" />, label: "basic info", href: "basic-info" },
    { icon: <i className="ni ni-atom" />, label: "change password", href: "change-password" },
    { icon: <i className="ni ni-ui-04" />, label: "2FA", href: "2fa" },
    { icon: <i className="ni ni-badge" />, label: "accounts", href: "accounts" },
    { icon: <i className="ni ni-bell-55" />, label: "notifications", href: "notifications" },
    { icon: <i className="ni ni-watch-time" />, label: "sessions", href: "sessions" },
    {
      icon: <i className="ni ni-settings-gear-65" />,
      label: "delete account",
      href: "delete-account",
    },
  ];

  const renderSidenavItems = sidenavItems.map(({ icon, label, href }, key) => {
    const itemKey = `item-${key}`;

    return (
      <Box key={itemKey} component="li" pt={key === 0 ? 0 : 1}>
        <Typography
          component="a"
          href={`#${href}`}
          variant="button"
          fontWeight="regular"
          color="text"
          textTransform="capitalize"
          sx={({
            borders: { borderRadius },
            functions: { pxToRem, rgba },
            palette: { light },
            transitions,
          }) => ({
            display: "flex",
            alignItems: "center",
            borderRadius: borderRadius.md,
            padding: `${pxToRem(10)} ${pxToRem(16)}`,
            transition: transitions.create("background-color", {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.shorter,
            }),

            "&:hover": {
              backgroundColor: rgba(light.main, darkMode ? 0.1 : 1),
            },
          })}
        >
          <Box fontSize="16px" color="secondary" mr={1.5} lineHeight={0}>
            {icon}
          </Box>
          {label}
        </Typography>
      </Box>
    );
  });

  return (
    <Card
      sx={{
        borderRadius: ({ borders: { borderRadius } }) => borderRadius.lg,
        position: "sticky",
        top: "1%",
      }}
    >
      <Box
        component="ul"
        display="flex"
        flexDirection="column"
        p={2}
        m={0}
        sx={{ listStyle: "none" }}
      >
        {renderSidenavItems}
      </Box>
    </Card>
  );
}

export default Sidenav;
