// prop-types is a library for typechecking of props
import PropTypes from "prop-types";


import { Box } from "@mui/material";

import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";

function ProductCell({ image, name, orders }) {
  return (
    <Box display="flex" alignItems="center" pr={2}>
      <Box mr={2}>
        <Avatar src={image} alt={name} variant="rounded" />
      </Box>
      <Box display="flex" flexDirection="column">
        <Typography variant="button" fontWeight="medium">
          {name}
        </Typography>
        <Typography variant="button" fontWeight="medium" color="secondary">
          <Typography component="span" variant="button" color="success">
            {orders}
          </Typography>{" "}
          orders
        </Typography>
      </Box>
    </Box>
  );
}

// Typechecking props for the ProductCell
ProductCell.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  orders: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default ProductCell;
