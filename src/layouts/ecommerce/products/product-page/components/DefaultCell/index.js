

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";




function DefaultCell({ children }) {
  return (
    <Typography variant="button" color="secondary" fontWeight="regular">
      {children}
    </Typography>
  );
}

// Typechecking props for the DefaultCell
DefaultCell.propTypes = {
  children: PropTypes.string.isRequired,
};

export default DefaultCell;
