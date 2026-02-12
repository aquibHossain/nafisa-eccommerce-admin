

// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import { Box, Card, Typography } from "@mui/material";
import Icon from "@mui/material/Icon";

import { Button } from "@mui/material";

function BackgroundBlogCard({ color, image, title, description, action }) {
  return (
    <Card raised sx={{ p: 2 }}>
      <Box
        sx={({
          functions: { linearGradient, rgba },
          palette: { gradients },
          borders: { borderRadius },
        }) => ({
          backgroundImage: gradients[color]
            ? `${linearGradient(
                rgba(gradients[color].main, 0.8),
                rgba(gradients[color].state, 0.8)
              )}, url(${image})`
            : `${linearGradient(
                rgba(gradients.dark.main, 0.8),
                rgba(gradients.dark.state, 0.8)
              )}, url(${image})`,
          backgroundSize: "cover",
          borderRadius: borderRadius.lg,
          p: 2,
        })}
      >
        <Box mb={2}>
          <Typography variant="h6" color="white" fontWeight="bold" textTransform="capitalize">
            {title}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="body2" color="white">
            {description}
          </Typography>
        </Box>
        {action.type === "internal" ? (
          <Button component={Link} to={action.route} variant="outlined" color="white" circular>
            {action.label} &nbsp; <Icon>arrow_forward</Icon>
          </Button>
        ) : (
          <Button
            component="a"
            href={action.route}
            target="_blank"
            rel="noreferrer"
            variant="outlined"
            color="white"
            circular
          >
            {action.label} &nbsp; <Icon>arrow_forward</Icon>
          </Button>
        )}
      </Box>
    </Card>
  );
}

// Setting default values for the props of BackgroundBlogCard
BackgroundBlogCard.defaultProps = {
  color: "dark",
};

// Typechecking props for the BackgroundBlogCard
BackgroundBlogCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default BackgroundBlogCard;
