

// prop-types is a library for typechecking of props
import { Typography } from "@mui/material";
import PropTypes from "prop-types";




function DefaultCell({ children }) {
  return (
    <Typography variant="button" fontWeight="medium" color="text">
      {children}
    </Typography>
  );
}

// Typechecking props for the DefaultCell
DefaultCell.propTypes = {
  children: PropTypes.string.isRequired,
};

export default DefaultCell;
