// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Switch from "@mui/material/Switch";


import { Box } from "@mui/material";

// Charg Dashboard MUI context
import { useArgonController } from "context";

function ControllerCard({ color, state, icon, title, description, onChange }) {
  const [controller] = useArgonController();
  const { darkMode } = controller;

  return (
    <Card sx={{ height: "100%" }}>
      <Box
        p={3}
        height="100%"
        bgColor={state ? color : "transparent"}
        variant={!state && darkMode ? "contained" : "gradient"}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          lineHeight={1}
        >
          <Typography variant="body2" color={state ? "white" : "text"}>
            {state ? "On" : "Off"}
          </Typography>
          <Box mr={1}>
            <Switch checked={state} onChange={onChange} />
          </Box>
        </Box>
        {icon}
        <Box mt={1} lineHeight={1}>
          <Typography
            variant="body2"
            color={state ? "white" : "text"}
            textTransform="capitalize"
            fontWeight="medium"
          >
            {title}
          </Typography>
          {description ? (
            <Typography variant="caption" color={state ? "white" : "text"}>
              {description}
            </Typography>
          ) : null}
        </Box>
      </Box>
    </Card>
  );
}

// Setting default values for the props of ControllerCard
ControllerCard.defaultProps = {
  color: "info",
  state: false,
  description: "",
};

// Typechecking props for the ControllerCard
ControllerCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  state: PropTypes.bool,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ControllerCard;
