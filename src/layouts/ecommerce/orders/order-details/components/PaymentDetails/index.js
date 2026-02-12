// @mui material components
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import { Box, Button, Typography } from "@mui/material";

// Payment method logos (use placeholder images from trusted sources)
const paymentLogos = {
  cod: null,
  bkash: "https://upload.wikimedia.org/wikipedia/commons/6/6b/BKash-bKash-Logo.wine.svg",
  nagad: "https://upload.wikimedia.org/wikipedia/commons/6/69/Nagad_Logo.svg",
  rocket: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Rocket_logo.svg",
  visa: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
  mastercard: "https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg",
};

// Display names for payment methods
const paymentMethodDisplay = {
  cod: "Cash on Delivery",
  bkash: "bKash",
  nagad: "Nagad",
  rocket: "Rocket",
  visa: "Visa",
  mastercard: "MasterCard",
};

function PaymentDetails({ data }) {
  const renderPaymentDetails = () => {
    if (data?.paymentMethod === "cod") {
      return (
        <Typography variant="body1" fontWeight="medium">
          Payment will be collected upon delivery.
        </Typography>
      );
    }

    const logo = paymentLogos[data?.paymentMethod];
    const methodName = paymentMethodDisplay[data?.paymentMethod] || "Unknown";

    return (
      <Box
        border="1px solid #ddd"
        borderRadius="lg"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={3}
        mt={2}
      >
        {logo && (
          <Box component="img" src={logo} alt={methodName} width="15%" mr={2} />
        )}
        <Typography variant="h6" fontWeight="medium">
          {methodName}
        </Typography>
        {["visa", "mastercard"].includes(data?.paymentMethod) && (
          <Typography variant="body2" color="text.secondary">
            **** **** **** 7852
          </Typography>
        )}
        <Box ml="auto" lineHeight={0}>
          <Tooltip title="We do not store card details" placement="bottom">
            <Button variant="outlined" color="secondary" size="small" iconOnly circular>
              <Icon sx={{ cursor: "pointer" }}>priority_high</Icon>
            </Button>
          </Tooltip>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Typography variant="h6" fontWeight="medium">
        Payment Details
      </Typography>
      {renderPaymentDetails()}
    </>
  );
}

export default PaymentDetails;
