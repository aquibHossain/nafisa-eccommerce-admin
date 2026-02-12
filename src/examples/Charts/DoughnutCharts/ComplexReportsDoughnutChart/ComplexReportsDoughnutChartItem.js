

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";


import { Box, Typography } from "@mui/material";

import { Avatar } from "@mui/material";

function ComplexReportsDoughnutChartItem({ image, title, percentage, hasBorder }) {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={({ borders: { borderWidth }, palette: { light } }) => ({
        borderBottom: hasBorder ? `${borderWidth[1]} solid ${light.main}` : 0,
      })}
    >
      <Grid item xs={10}>
        <Box display="flex" py={1.5} px={2}>
          {image && (
            <Box mr={1}>
              <Avatar src={image} size="sm" alt="title" />
            </Box>
          )}
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Typography
              component="div"
              variant="button"
              textTransform="capitalize"
              fontWeight="medium"
            >
              {title}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box py={0.8} px={1} textAlign="center">
          <Typography variant="caption" color="text" fontWeight="medium">
            {percentage}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

// Setting default values for the props of ComplexReportsDoughnutChartItem
ComplexReportsDoughnutChartItem.defaultProps = {
  image: "",
  hasBorder: false,
};

// Typechecking props for the ComplexReportsDoughnutChartItem
ComplexReportsDoughnutChartItem.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  percentage: PropTypes.string.isRequired,
  hasBorder: PropTypes.bool,
};

export default ComplexReportsDoughnutChartItem;
