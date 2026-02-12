// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";


import { Box, Typography } from "@mui/material";

import { Button } from "@mui/material";

function StatusCell({ icon, color, status }) {
  return (
    <Box display="flex" alignItems="center">
      <Box mr={1}>
        <Button variant="outlined" color={color} size="small" iconOnly circular>
          <Icon sx={{ fontWeight: "bold" }}>{icon}</Icon>
        </Button>
      </Box>
      <Typography variant="caption" fontWeight="medium" color="text" sx={{ lineHeight: 0 }}>
        {status}
      </Typography>
    </Box>
  );
}

// Typechecking props for the StatusCell
StatusCell.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default StatusCell;
