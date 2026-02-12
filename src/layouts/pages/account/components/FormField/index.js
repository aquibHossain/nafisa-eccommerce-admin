

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";


import { Box, Typography } from "@mui/material";

import { Input } from "@mui/material";

function FormField({ label, ...rest }) {
  return (
    <Box display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
      <Box mb={1} ml={0.5} lineHeight={0} display="inline-block">
        <Typography
          component="label"
          variant="caption"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {label}
        </Typography>
      </Box>
      <Input {...rest} />
    </Box>
  );
}

// Setting default values for the props of FormField
FormField.defaultProps = {
  label: " ",
};

// Typechecking props for FormField
FormField.propTypes = {
  label: PropTypes.string,
};

export default FormField;
