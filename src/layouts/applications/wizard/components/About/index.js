

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";


import { Box, Typography } from "@mui/material";

import { Avatar } from "@mui/material";
import { Button } from "@mui/material";

// Wizard application components
import FormField from "layouts/applications/wizard/components/FormField";

// Images
import team2 from "assets/images/team-2.jpg";

function About() {
  return (
    <Box>
      <Box width="80%" textAlign="center" mx="auto" mb={4}>
        <Box mb={1}>
          <Typography variant="h5" fontWeight="regular">
            Let&apos;s start with the basic information
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight="regular" color="text">
          Let us know your name and email address. Use an address you don&apos;t mind other users
          contacting you at
        </Typography>
      </Box>
      <Box mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} container justifyContent="center">
            <Box position="relative" height="max-content" mx="auto">
              <Avatar src={team2} alt="profile picture" size="xxl" variant="rounded" />
              <Box alt="spotify logo" position="absolute" right={0} bottom={0} mr={-1} mb={-1}>
                <Button variant="gradient" color="light" size="small" iconOnly>
                  <Icon>edit</Icon>
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box mb={2}>
              <FormField type="text" label="first name" placeholder="Eg. Michael" />
            </Box>
            <Box mb={2}>
              <FormField type="text" label="last name" placeholder="Eg. Tomson" />
            </Box>
            <Box>
              <FormField type="text" label="email address" placeholder="Eg. soft@dashboard.com" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default About;
