

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-circular-slider-svg components
import CircularSlider from "react-circular-slider-svg";

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";


import { Box } from "@mui/material";



import colors from "assets/theme/base/colors";

// Custom styles for TemperatureSlider
import circularSlider from "layouts/dashboards/smart-home/components/TemperatureSlider/styles";

function TemperatureSlider({ title, color, current, label, start, end, ...sliderProps }) {
  const { circleSliderColors } = colors;

  return (
    <Card sx={{ height: "99.5%" }}>
      <Box p={2} position="relative" height="100%">
        <Box mb={1}>
          <Typography variant="h6" fontWeight="medium">
            {title}
          </Typography>
        </Box>
        <Box height="100%" textAlign="center" sx={(theme) => circularSlider(theme, { color })}>
          <CircularSlider
            {...sliderProps}
            arcBackgroundColor={circleSliderColors.background}
            arcColor={colors[color].main}
            startAngle={45}
            endAngle={315}
            handleSize={6}
            size={220}
          />
          <Box mt={12}>
            <Typography variant="h4" fontWeight="medium">
              {current}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-around"
            alignItems="baseline"
            width="12.5rem"
            mx="auto"
            mt={6}
          >
            <Typography variant="caption" color="text">
              {start}
            </Typography>
            <Typography variant="body2" color="text" textTransform="capitalize">
              {label}
            </Typography>
            <Typography variant="caption" color="text">
              {end}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

// Setting default values for the props of TemperatureSlider
TemperatureSlider.defaultProps = {
  color: "info",
};

// Typechecking props for the TemperatureSlider
TemperatureSlider.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  current: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  start: PropTypes.node.isRequired,
  end: PropTypes.node.isRequired,
};

export default TemperatureSlider;
