// @mui material components
import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid";

// NewProduct page components
import FormField from "layouts/ecommerce/products/new-product/components/FormField";

function Socials() {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold">
        Socials
      </Typography>
      <Box mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormField type="text" label="shopify handle" placeholder="@soft" />
          </Grid>
          <Grid item xs={12}>
            <FormField type="text" label="facebook account" placeholder="https://..." />
          </Grid>
          <Grid item xs={12}>
            <FormField type="text" label="instagram account" placeholder="https://..." />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Socials;
