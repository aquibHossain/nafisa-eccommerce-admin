import React from "react";
import { Typography, Box, Divider } from "@mui/material";

function OrderSummary({ data }) {
  const { items, totalAmount, finalAmount, paymentMethod, paymentStatus, coupon, shipping } = data;

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h6" fontWeight="medium">
          Order Summary
        </Typography>
      </Box>

      {/* Order Details */}
      <Box mb={2}>
        {items?.map((item, index) => {
          const selectedVariant = item?.product?.inventory?.find(v => v._id === item?.variantId);
          return (
            <Box key={item?._id} mb={1.5}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" fontWeight="medium">
                  {item?.product?.productName}({selectedVariant?.productName}) (x{item?.quantity})
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  ৳{item?.price * item?.quantity}
                </Typography>
              </Box>
              {/* <Typography variant="body2" color="text.secondary">
                {item?.product?.description?.slice(0, 60)}...
              </Typography> */}
            </Box>
          );
        })}
      </Box>

      <Divider />

      {/* Coupon Details */}
      {coupon && (
        <Box my={2}>
          <Box display="flex" justifyContent="space-between" mb={0.5}>
            <Typography variant="body2" color="text.secondary">
              Coupon Applied ({coupon?.code}):
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              -৳{totalAmount - finalAmount}
            </Typography>
          </Box>
        </Box>
      )}

      <Divider />
      <Box my={2}>
        <Box display="flex" justifyContent="space-between" mb={0.5}>
          <Typography variant="body2" color="text.secondary">
            Shipping:
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            ৳{shipping?.amount}
          </Typography>
        </Box>
      </Box>
      <Divider />

      {/* Order Summary Details */}
      <Box mt={2}>
        <Box display="flex" justifyContent="space-between" mb={0.5}>
          <Typography variant="body2" color="text.secondary">
            Subtotal:
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            ৳{totalAmount}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={0.5}>
          <Typography variant="body2" color="text.secondary">
            Final Amount:
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            ৳{finalAmount}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={0.5}>
          <Typography variant="body2" color="text.secondary">
            Payment Method:
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            {paymentMethod?.toUpperCase()}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={0.5}>
          <Typography variant="body2" color="text.secondary">
            Payment Status:
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            {paymentStatus?.charAt(0)?.toUpperCase() + paymentStatus?.slice(1)}
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Total */}
      <Box display="flex" justifyContent="space-between" mt={3}>
        <Typography variant="h6" fontWeight="medium">
          Total:
        </Typography>
        <Typography variant="h6" fontWeight="medium">
          ৳{finalAmount}
        </Typography>
      </Box>
    </Box>
  );
}

export default OrderSummary;
