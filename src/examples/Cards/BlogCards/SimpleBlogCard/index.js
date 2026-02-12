

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import { Box, Card, Typography } from "@mui/material";
import MuiLink from "@mui/material/Link";

import { Button } from "@mui/material";

function SimpleBlogCard({ image, title, description, action }) {
  return (
    <Card>
      <Box mt={2} mx={2}>
        <Box component="img" src={image} alt={title} width="100%" borderRadius="lg" />
      </Box>
      <Box pt={2} pb={3} px={3}>
        <Typography display="inline" variant="h3" textTransform="capitalize" fontWeight="bold">
          {title}
        </Typography>
        <Box mt={2} mb={3}>
          <Typography variant="body2" component="p" color="text">
            {description}
          </Typography>
        </Box>
        {action.type === "external" ? (
          <MuiLink href={action.route} target="_blank" rel="noreferrer">
            <Button color={action.color ? action.color : "dark"}>{action.label}</Button>
          </MuiLink>
        ) : (
          <Link to={action.route}>
            <Button color={action.color ? action.color : "dark"}>{action.label}</Button>
          </Link>
        )}
      </Box>
    </Card>
  );
}

// Typechecking props for the SimpleBlogCard
SimpleBlogCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
      "default",
    ]),
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default SimpleBlogCard;
