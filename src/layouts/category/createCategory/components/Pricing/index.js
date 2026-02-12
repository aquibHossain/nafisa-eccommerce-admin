// @mui material components
import Grid from "@mui/material/Grid";

import { Box, Select, Typography } from "@mui/material";

// NewProduct page components
import FormField from "layouts/ecommerce/products/new-product/components/FormField";

function Pricing() {
  return (
    <Box>
      <Typography variant="h5">Pricing</Typography>
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <FormField type="text" label="price" placeholder="99.00" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <Typography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize"
              >
                Currency
              </Typography>
            </Box>
            <Select
              defaultValue={{ value: "usd", label: "USD" }}
              options={[
                { value: "btc", label: "BTC" },
                { value: "cny", label: "CNY" },
                { value: "eur", label: "EUR" },
                { value: "gbp", label: "GBP" },
                { value: "inr", label: "INR" },
                { value: "use", label: "USD" },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <FormField type="text" label="SKU" placeholder="71283476591" />
          </Grid>
        </Grid>
      </Box>
      <Box mt={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <Typography component="label" variant="caption" fontWeight="bold">
                Project Tags
              </Typography>
            </Box>
            <Select
              defaultValue={[
                { value: "in stock", label: "In Stock" },
                { value: "out of stock", label: "Out of Stock" },
              ]}
              options={[
                { value: "black friday", label: "Black Friday" },
                { value: "expired", label: "Expired", isDisabled: true },
                { value: "out of stock", label: "Out of Stock" },
                { value: "in stock", label: "In Stock" },
                { value: "sale", label: "Sale" },
              ]}
              size="large"
              isMulti
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Pricing;
