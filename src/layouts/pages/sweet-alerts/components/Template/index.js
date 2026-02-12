

// prop-types is a library for type checking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";


import { Box } from "@mui/material";

import { Button } from "@mui/material";

function Template({ title, action }) {
  return (
    <Card>
      <Box p={3} textAlign="center">
        <Box mb={2}>
          <Typography variant="body2" color="text">
            {title}
          </Typography>
        </Box>
        <Button variant="gradient" color="info" onClick={action}>
          Try Me!
        </Button>
      </Box>
    </Card>
  );
}

// Typechecking props for the Template
Template.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default Template;
