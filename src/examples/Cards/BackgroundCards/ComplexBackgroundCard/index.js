// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

import { Box, Card, Typography } from "@mui/material";

function ComplexBackgroundCard({ color, image, description, action }) {
  const cardActionStyles = ({ palette: { white }, typography: { size } }) => ({
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    color: `${white.main} !important`,

    "& .material-icons-round": {
      ml: 0.5,
      fontSize: size.md,
      transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
    },

    "&:hover .material-icons-round": {
      transform: "translateX(5px)",
    },
  });

  return (
    <Card
      sx={({
        functions: { rgba, linearGradient },
        palette: { gradients },
        borders: { borderRadius },
      }) => ({
        backgroundImage: gradients[color]
          ? `${linearGradient(
              rgba(gradients[color].main, 0.6),
              rgba(gradients[color].state, 0.6)
            )}, url(${image})`
          : `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
        backgroundSize: "cover",
        borderRadius: borderRadius.lg,
      })}
    >
      <Box textAlign="center" p={2}>
        <Box display="flex" flexDirection="column" mt={6} p={3}>
          <Box mb={2}>
            <Typography variant="body2" color="white" fontWeight="bold">
              {description}
            </Typography>
          </Box>
          {action.type === "internal" ? (
            <Box mt={3}>
              <Typography
                component={Link}
                to={action.route}
                variant="button"
                color="white"
                textTransform="capitalize"
                fontWeight="medium"
                sx={cardActionStyles}
              >
                {action.label} <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
              </Typography>
            </Box>
          ) : (
            <Box mt={3}>
              <Typography
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                variant="button"
                color="white"
                textTransform="capitalize"
                fontWeight="medium"
                sx={cardActionStyles}
              >
                {action.label} <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  );
}

// Setting default values for the props of ComplexBackgroundCard
ComplexBackgroundCard.defaultProps = {
  color: "dark",
};

// Typechecking props for the ComplexBackgroundCard
ComplexBackgroundCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  image: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default ComplexBackgroundCard;
