// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

import { Box, Typography } from "@mui/material";

import { Input } from "@mui/material";

function FormField({ label, ...rest }) {
  return (
    <>
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
    </>
  );
}

// typechecking props for FormField
FormField.propTypes = {
  label: PropTypes.string.isRequired,
};

export default FormField;
