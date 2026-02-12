

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";


import { Box } from "@mui/material";

function PagesHeaderCell({ children }) {
  return (
    <Box
      component="th"
      width="100%"
      textAlign="left"
      py={1.5}
      pl={1}
      pr={3}
      sx={({ borders: { borderWidth, borderColor } }) => ({
        borderBottom: `${borderWidth[1]} solid ${borderColor}`,
      })}
    >
      <Box
        width="max-content"
        textAlign="left"
        color="secondary"
        opacity={0.7}
        sx={({ typography: { size, fontWeightBold } }) => ({
          textTransform: "uppercase",
          fontSize: size.xxs,
          fontWeight: fontWeightBold,
        })}
      >
        {children}
      </Box>
    </Box>
  );
}

// Typechecking props for the PagesHeaderCell
PagesHeaderCell.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PagesHeaderCell;
