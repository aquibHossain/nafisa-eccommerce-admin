// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import MuiLink from "@mui/material/Link";

import { Box, Typography } from "@mui/material";

import { Avatar } from "@mui/material";

function SimpleProfileCard({ image, name, position, description, action }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
      {action.type === "external" ? (
        <MuiLink href={action.route} target="_blank" rel="noreferrer">
          <Avatar src={image} alt={name} size="xl" shadow="md" variant="rounded" />
        </MuiLink>
      ) : (
        <Link to={action.route}>
          <Avatar src={image} alt={name} size="xl" shadow="md" variant="rounded" />
        </Link>
      )}
      <Box p={3}>
        {action.type === "external" ? (
          <MuiLink href={action.route} target="_blank" rel="noreferrer">
            <Typography variant="h4">{name}</Typography>
          </MuiLink>
        ) : (
          <Link to={action.route}>
            <Typography variant="h4">{name}</Typography>
          </Link>
        )}
        <Typography variant="h6" color={position.color} textGradient gutterBottom>
          {position.label}
        </Typography>
        <Typography variant="body2" color="text">
          {description}
        </Typography>
      </Box>
    </Box>
  );
}

// Setting default props for the SimpleProfileCard
SimpleProfileCard.defaultProps = {
  description: "",
  action: { type: "internal", route: "#" },
};

// Typechecking props for the SimpleProfileCard
SimpleProfileCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"])
      .isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
  }),
};

export default SimpleProfileCard;
