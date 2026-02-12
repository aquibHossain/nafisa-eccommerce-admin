

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";


import { Box } from "@mui/material";

import { Button } from "@mui/material";
import { Typography } from "@mui/material";

function RefundsCell({ value, icon, tooltip }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" px={2}>
      <Typography variant="button" fontWeight="medium" color="text">
        {value}
      </Typography>
      <Box color={icon.color} lineHeight={0}>
        <Icon sx={{ fontWeight: "bold" }} fontSize="default">
          {icon.name}
        </Icon>
      </Box>
      {tooltip && (
        <Box ml={2}>
          <Tooltip title={tooltip} placement="left">
            <Button variant="outlined" color="secondary" size="small" circular iconOnly>
              <Icon>priority_high</Icon>
            </Button>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
}

// Setting default values for the props or RefundsCell
RefundsCell.defaultProps = {
  tooltip: "",
};

// Typechecking props for the RefundsCell
RefundsCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  icon: PropTypes.shape({
    color: PropTypes.oneOf(["info", "success", "warning", "error"]).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  tooltip: PropTypes.string,
};

export default RefundsCell;
