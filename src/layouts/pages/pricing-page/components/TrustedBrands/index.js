

// @mui material components
import Grid from "@mui/material/Grid";


import { Box } from "@mui/material";


// Images
import coinbase from "assets/images/logos/gray-logos/logo-coinbase.svg";
import nasa from "assets/images/logos/gray-logos/logo-nasa.svg";
import netflix from "assets/images/logos/gray-logos/logo-netflix.svg";
import pinterest from "assets/images/logos/gray-logos/logo-pinterest.svg";
import spotify from "assets/images/logos/gray-logos/logo-spotify.svg";
import vodafone from "assets/images/logos/gray-logos/logo-vodafone.svg";

function PricingCards() {
  return (
    <Box mt={8}>
      <Box textAlign="center">
        <Typography variant="h6" opacity={0.5}>
          More than 50+ brands trust Soft
        </Typography>
      </Box>
      <Box mt={5}>
        <Grid container spacing={3}>
          <Grid item xs={6} md={4} lg={2}>
            <Box
              component="img"
              src={coinbase}
              alt="coinbase"
              width="90%"
              opacity={0.9}
              mb={3}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <Box component="img" src={nasa} alt="nasa" width="90%" opacity={0.9} mb={3} />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <Box
              component="img"
              src={netflix}
              alt="netflix"
              width="90%"
              opacity={0.9}
              mb={3}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <Box
              component="img"
              src={pinterest}
              alt="pinterest"
              width="90%"
              opacity={0.9}
              mb={3}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <Box
              component="img"
              src={spotify}
              alt="spotify"
              width="90%"
              opacity={0.9}
              mb={3}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <Box
              component="img"
              src={vodafone}
              alt="vodafone"
              width="90%"
              opacity={0.9}
              mb={3}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default PricingCards;
