


import { Typography } from "@mui/material";
import { Box } from "@mui/material";


// Charg Dashboard MUI contexts
import { useArgonController } from "context";

function BillingInformation({ data }) {

  const [controller] = useArgonController();
  const { darkMode } = controller;

  return (
    <>
      <Typography variant="h6" fontWeight="medium">
        Billing Information
      </Typography>
      <Box
        component="li"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        borderRadius="lg"
        p={3}
        mt={2}
        sx={({ palette: { grey, background } }) => ({
          backgroundColor: darkMode ? background.default : grey[100],
        })}
      >
        <Box width="100%" display="flex" flexDirection="column" lineHeight={1}>
          <Box mb={2}>
            <Typography variant="button" fontWeight="medium" textTransform="capitalize">
              {data?.shippingAddress?.name}
            </Typography>
          </Box>
          <Box mb={1} lineHeight={0}>
            <Typography variant="caption" color="text">
              Phone :&nbsp;&nbsp;&nbsp;
              <Typography variant="caption" fontWeight="medium" textTransform="capitalize">
                {data?.shippingAddress?.phone}
              </Typography>
            </Typography>
          </Box>
          <Box mb={1} lineHeight={0}>
            <Typography variant="caption" color="text">
              Email Address:&nbsp;&nbsp;&nbsp;
              <Typography variant="caption" fontWeight="medium">
                {data?.shippingAddress?.email}
              </Typography>
            </Typography>
          </Box>
          <Box mb={1} lineHeight={0}>
            <Typography variant="caption" color="text">
              Address:&nbsp;&nbsp;&nbsp;
              <Typography variant="caption" fontWeight="medium">
                {data?.shippingAddress?.address}
              </Typography>
            </Typography>
          </Box>
          <Box mb={1} lineHeight={0}>
            <Typography variant="caption" color="text">
              Country:&nbsp;&nbsp;&nbsp;
              <Typography variant="caption" fontWeight="medium">
                {data?.shippingAddress?.country}
              </Typography>
            </Typography>
          </Box>
          <Box mb={1} lineHeight={0}>
            <Typography variant="caption" color="text">
              Town / City:&nbsp;&nbsp;&nbsp;
              <Typography variant="caption" fontWeight="medium">
                {data?.shippingAddress?.town}
              </Typography>
            </Typography>
          </Box>
          <Box mb={1} lineHeight={0}>
            <Typography variant="caption" color="text">
              Postcode / ZIP :&nbsp;&nbsp;&nbsp;
              <Typography variant="caption" fontWeight="medium">
                {data?.shippingAddress?.zip}
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default BillingInformation;
