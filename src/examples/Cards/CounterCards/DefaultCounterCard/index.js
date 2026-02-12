// react-countup components
import CountUp from "react-countup";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";


import { Box } from "@mui/material";

function DefaultCounterCard({ color, count, title, description, prefix, suffix }) {
  return (
    <Card>
      <Box p={3} textAlign="center" lineHeight={1.25}>
        <Typography variant="h1" color={color} fontWeight="bold" textGradient>
          {prefix && (
            <Typography component="span" variant="h5" fontWeight="bold">
              {prefix}
            </Typography>
          )}
          <Box display="inline-block" mx={0.5}>
            <CountUp end={count} duration={1} separator="," />
          </Box>
          {suffix && (
            <Typography component="span" variant="h5" fontWeight="bold">
              {suffix}
            </Typography>
          )}
        </Typography>
        <Typography variant="h6" fontWeight="bold" textTransform="capitalize">
          {title}
        </Typography>
        {description && (
          <Typography
            variant="button"
            fontWeight="regular"
            opacity={0.8}
            textTransform="capitalize"
          >
            {description}
          </Typography>
        )}
      </Box>
    </Card>
  );
}

// Setting default values for the props of DefaultCounterCard
DefaultCounterCard.defaultProps = {
  color: "info",
  prefix: "",
  suffix: "",
  description: "",
};

// Typechecking props for the BlogCard
DefaultCounterCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default DefaultCounterCard;
