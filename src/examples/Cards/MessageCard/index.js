// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";


import { Box } from "@mui/material";

import { Button } from "@mui/material";

function MessageCard({ image, text, action }) {
  return (
    <Card>
      <Box p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={4}>
            <Box
              component="img"
              src={image}
              alt="message-image"
              borderRadius="lg"
              shadow="md"
              width="100%"
              display="inherit"
            />
          </Grid>
          <Grid item xs={8}>
            <Box mb={2} lineHeight={1.4}>
              <Typography variant="button" color="text" fontWeight="medium">
                {text}
              </Typography>
            </Box>
            {action.type === "internal" ? (
              <Button
                component={Link}
                to={action.route}
                color={action.color}
                variant="gradient"
                size="small"
              >
                {action.label}
              </Button>
            ) : (
              <Button
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                color={action.color}
                variant="gradient"
                size="small"
              >
                {action.label}
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

// Typechecking props for the MessageCard
MessageCard.propTypes = {
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "default",
      "primary",
      "secondary",
      "info",
      "warning",
      "error",
      "light",
      "dark",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default MessageCard;
