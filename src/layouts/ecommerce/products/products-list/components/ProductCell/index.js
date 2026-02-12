import PropTypes from "prop-types";

// @mui material components
import Checkbox from "@mui/material/Checkbox";

import { Box } from "@mui/material";
import { Typography } from "@mui/material";

function ProductCell({ image, name, checked }) {
  return (
    <Box display="flex" alignItems="center">
      <Checkbox defaultChecked={checked} />
      <Box mx={2} width="3.75rem">
        <Box component="img" src={image} alt={name} width="100%" />
      </Box>
      <Typography variant="button" fontWeight="medium">
        {name}
      </Typography>
    </Box>
  );
}

// Setting default value for the props of ProductCell
ProductCell.defaultProps = {
  checked: false,
};

// Typechecking props for the ProductCell
ProductCell.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

export default ProductCell;
