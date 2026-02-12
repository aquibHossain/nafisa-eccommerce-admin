

// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";


import { Box, Typography } from "@mui/material";

import { Button } from "@mui/material";


import borders from "assets/theme/base/borders";

function OutlinedPricingCard({ color, title, description, price, specifications, action }) {
  const { borderWidth, borderColor } = borders;

  const renderSpecifications = specifications.map(({ label, includes }, key) => (
    <Box
      key={label}
      display="flex"
      alignItems="center"
      pb={specifications.length - 1 !== key ? 2 : 0}
    >
      <Typography
        variant="body1"
        color={includes ? "success" : "error"}
        sx={{ lineHeight: 0 }}
      >
        <Icon sx={{ fontWeight: "bold" }}>{includes ? "done" : "close"}</Icon>
      </Typography>
      <Box pl={2} lineHeight={1}>
        <Typography variant="button" color="text" fontWeight="regular">
          {label}
        </Typography>
      </Box>
    </Box>
  ));

  return (
    <Box height="100%" borderRadius="xl" border={`${borderWidth[1]} solid ${borderColor}`}>
      <Box pt={3} pb={0.5} px={3} lineHeight={1} textAlign="center">
        <Typography variant="h5" color={color}>
          {title}
        </Typography>
        <Box mb={2} mt={0.5}>
          <Typography variant="button" color="text" fontWeight="regular">
            {description}
          </Typography>
        </Box>
        <Box mt={2} mb={1}>
          <Typography variant="h3" color={color} fontWeight="bold">
            {price.value}&nbsp;
            <Typography variant="button" color="text" fontWeight="regular">
              /{price.type}
            </Typography>
          </Typography>
        </Box>
        <Box mt={3} mb={1}>
          {action.type === "internal" ? (
            <Button
              component={Link}
              to={action.route}
              variant="gradient"
              color={color}
              size="small"
              fullWidth
            >
              {action.label}
            </Button>
          ) : (
            <Button
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="gradient"
              color={color}
              size="small"
              fullWidth
            >
              {action.label}
            </Button>
          )}
        </Box>
      </Box>
      <Divider />
      <Box pt={1} pb={3} px={3}>
        {renderSpecifications}
      </Box>
    </Box>
  );
}

// Setting default values for the props of OutlinedPricingCard
OutlinedPricingCard.defaultProps = {
  color: "dark",
};

// Typechecking props for the OutlinedPricingCard
OutlinedPricingCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.shape({
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  specifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default OutlinedPricingCard;
