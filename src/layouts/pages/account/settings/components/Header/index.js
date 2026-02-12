

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";


import { Box } from "@mui/material";

import { Avatar } from "@mui/material";

// Images
import burceMars from "assets/images/bruce-mars.jpg";

function Header() {
  const [visible, setVisible] = useState(true);

  const handleSetVisible = () => setVisible(!visible);

  return (
    <Card id="profile">
      <Box p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              src={burceMars}
              alt="profile-image"
              variant="rounded"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <Box height="100%" mt={0.5} lineHeight={1}>
              <Typography variant="h5" fontWeight="medium">
                Ariful Islam
              </Typography>
              <Typography variant="button" color="text" fontWeight="medium">
                Manager / Amarlodge Ltd
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
            <Box
              display="flex"
              justifyContent={{ md: "flex-end" }}
              alignItems="center"
              lineHeight={1}
            >
              <Typography variant="caption" fontWeight="regular">
                Switch to {visible ? "invisible" : "visible"}
              </Typography>
              <Box mx={1}>
                <Switch checked={visible} onChange={handleSetVisible} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default Header;
