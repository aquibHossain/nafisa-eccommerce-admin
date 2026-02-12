

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";


import { Box } from "@mui/material";


function ReportsDoughnutChartItem({ color, title, percentage, hasBorder }) {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={({ borders: { borderWidth }, palette: { light } }) => ({
        borderBottom: hasBorder ? `${borderWidth[1]} solid ${light.main}` : 0,
        lineHeight: 1.25,
      })}
    >
      <Grid item xs={10}>
        <Box display="flex" py={0.8} px={2}>
          <Box
            bgColor={color}
            width="1.35rem"
            height="1.35rem"
            borderRadius="md"
            mr={2}
            lineHeight={0}
            variant="gradient"
          />
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
        <Box py={0.8} px={1} textAlign="center" width="100%">
          <Typography
            variant="caption"
            color="text"
            fontWeight="medium"
            sx={{ display: "inline-block", width: "max-content" }}
          >
            {percentage}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

// Setting default values for the props of ReportsDoughnutChartItem
ReportsDoughnutChartItem.defaultProps = {
  color: "info",
  hasBorder: false,
};

// Typechecking props for the ReportsDoughnutChartItem
ReportsDoughnutChartItem.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  percentage: PropTypes.string.isRequired,
  hasBorder: PropTypes.bool,
};

export default ReportsDoughnutChartItem;
