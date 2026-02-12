

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";


import { Box } from "@mui/material";

import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";

function ProductCell({ image, name }) {
  return (
    <Box display="flex" alignItems="center" pr={2}>
      <Box mr={2}>
        <Avatar src={image} alt={name} variant="rounded" />
      </Box>
      <Typography variant="button" fontWeight="medium">
        {name}
      </Typography>
    </Box>
  );
}

// Typechecking props for the ProductCell
ProductCell.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ProductCell;
