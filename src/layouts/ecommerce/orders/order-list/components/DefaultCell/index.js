

// prop-types is a library for typechecking of props
import { Typography } from "@mui/material";
import PropTypes from "prop-types";




function DefaultCell({ value, suffix }) {
  return (
    <Typography variant="caption" fontWeight="medium" color="text">
      {value}
      {suffix && (
        <Typography variant="caption" fontWeight="medium" color="secondary">
          &nbsp;&nbsp;{suffix}
        </Typography>
      )}
    </Typography>
  );
}

// Setting default values for the props of DefaultCell
DefaultCell.defaultProps = {
  suffix: "",
};

// Typechecking props for the DefaultCell
DefaultCell.propTypes = {
  value: PropTypes.string.isRequired,
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default DefaultCell;
