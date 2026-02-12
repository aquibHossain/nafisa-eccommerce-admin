import React from "react";
import { Box, Avatar, Typography, Divider } from "@mui/material";

function OrderInfo({ data }) {
  const { userId, items, coupon, shippingAddress } = data;

  return (
    <Box>
      {/* User Details */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="medium">
          User Details
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar src={userId?.avatar || "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"} />
          <Box>
            <Typography variant="body2"><strong>Name:</strong> {shippingAddress?.name}</Typography>
            <Typography variant="body2"><strong>Email:</strong> {shippingAddress?.email}</Typography>
            <Typography variant="body2"><strong>Phone:</strong> {shippingAddress?.phone}</Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Items List */}
      <Box my={4}>
        <Typography variant="h6" fontWeight="medium">
          Items
        </Typography>
        {items?.map((item) => {
          const variant = item.product.inventory.find((inv) => inv._id === item.variantId);
          return (
            <Box key={item._id} mb={2}>
              <Box display="flex" justifyContent="space-between" gap={4}>
                <Box display="flex" alignItems="center">
                  <Avatar
                    variant="rounded"
                    src={variant?.img || item.product.image}
                    alt={item.product.productName}
                    sx={{ width: 64, height: 64, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {item.product.productName} ({variant?.productName}) x{item.quantity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <del>৳{variant?.price}</del> ৳{item?.price} each
                    </Typography>
                  </Box>
                </Box>
                <Box>৳{item?.price * item.quantity}</Box>
              </Box>
              <Divider />
            </Box>
          );
        })}
      </Box>

      {/* Coupon Details */}
      {coupon && (
        <Box my={4}>
          <Typography variant="h6" fontWeight="medium">
            Coupon Details
          </Typography>
          <Typography variant="body2">
            <strong>Coupon:</strong> {coupon.name} ({coupon.code})
          </Typography>
          <Typography variant="body2">
            <strong>Discount:</strong> {coupon.discountValue}
            {coupon.discountType === "percentage" ? "%" : "Tk"} (up to ৳{coupon.maximumDiscount})
          </Typography>
          <Typography variant="body2">
            <strong>End Date:</strong> {new Date(coupon.endDate).toLocaleDateString()}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default OrderInfo;
