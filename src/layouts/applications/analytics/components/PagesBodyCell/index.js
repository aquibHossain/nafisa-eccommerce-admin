

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import TableRow from "@mui/material/TableRow";


import { Box } from "@mui/material";


function PagesBodyCell({ rows, noBorder }) {
  const renderRows = rows.map((row) => (
    <Box
      key={row}
      component="td"
      width="100%"
      textAlign="left"
      sx={({ borders: { borderWidth, borderColor } }) => ({
        borderBottom: noBorder ? 0 : `${borderWidth[1]} solid ${borderColor}`,
      })}
      p={1}
    >
      <Typography
        display="block"
        variant="button"
        fontWeight="medium"
        color="text"
        sx={{ width: "max-content" }}
      >
        {row}
      </Typography>
    </Box>
  ));

  return <TableRow>{renderRows}</TableRow>;
}

// Setting default values for the props for PagesBodyCell
PagesBodyCell.defaultProps = {
  noBorder: false,
};

// Typechecking props for the PagesBodyCell
PagesBodyCell.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  noBorder: PropTypes.bool,
};

export default PagesBodyCell;
