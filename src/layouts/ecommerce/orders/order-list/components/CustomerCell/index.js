

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";


import { Box } from "@mui/material";

import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";

function CustomerCell({ image, name, color }) {
  return (
    <Box display="flex" alignItems="center">
      <Box mr={1}>
        <Avatar bgColor={color} src={image} alt={name} size="xs" />
      </Box>
      <Typography variant="caption" fontWeight="medium" color="text" sx={{ lineHeight: 0 }}>
        {name}
      </Typography>
    </Box>
  );
}

// Setting default value for the props of CustomerCell
CustomerCell.defaultProps = {
  image: "",
  color: "dark",
};

// Typechecking props for the CustomerCell
CustomerCell.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    "transparent",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
};

export default CustomerCell;
