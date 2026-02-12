import PropTypes from "prop-types";
import { Box, Input } from "@mui/material";
import { Typography } from "@mui/material";

function FormField({ label, ...rest }) {
  return (
    <>
      <Box mb={1} ml={0.5} lineHeight={0} display="inline-block">
        <Typography
          fullWidth
          component="label"
          variant="caption"
          fontWeight="bold"
          textTransform="capitalize"

        >
          {label}
        </Typography>
      </Box>
      <Input style={{ width: "100%", ...rest.style }} {...rest} />
    </>
  );
}

// typechecking props for FormField
FormField.propTypes = {
  label: PropTypes.string.isRequired,
};

export default FormField;
