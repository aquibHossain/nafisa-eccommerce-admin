import React from "react";
import { Typography, Box } from "@mui/material";
import TimelineItem from "examples/Timeline/TimelineItem";

function OrdersOverview({ data }) {
  const {
    createdAt,
    shippedDate,
    deliveredDate,
    cancelledDate,
    paymentStatus,
  } = data;

  const getStatusDetails = () => {
    if (cancelledDate) {
      return {
        color: "error",
        icon: "cancel",
        title: "Order cancelled",
        dateTime: new Date(cancelledDate).toLocaleString(),
      };
    }

    if (deliveredDate) {
      return {
        color: "success",
        icon: "done",
        title: "Order delivered",
        dateTime: new Date(deliveredDate).toLocaleString(),
      };
    }

    if (shippedDate) {
      return {
        color: "info",
        icon: "local_shipping",
        title: "Order shipped",
        dateTime: new Date(shippedDate).toLocaleString(),
      };
    }

    return {
      color: "warning",
      icon: "pending",
      title: "Order is being processed",
      dateTime: new Date(createdAt).toLocaleString(),
    };
  };

  const statusDetails = getStatusDetails();

  return (
    <>
      <Typography variant="h6" fontWeight="medium">
        Track Order
      </Typography>
      <Box mt={2}>
        {createdAt && (
          <TimelineItem
            color="secondary"
            icon="notifications"
            title="Order received"
            dateTime={new Date(createdAt).toLocaleString()}
          />
        )}
        {shippedDate && (
          <TimelineItem
            color="secondary"
            icon="local_shipping"
            title="Order shipped"
            dateTime={new Date(shippedDate).toLocaleString()}
          />
        )}
        {deliveredDate && (
          <TimelineItem
            color="success"
            icon="done"
            title="Order delivered"
            dateTime={new Date(deliveredDate).toLocaleString()}
          />
        )}
        {cancelledDate && (
          <TimelineItem
            color="error"
            icon="cancel"
            title="Order cancelled"
            dateTime={new Date(cancelledDate).toLocaleString()}
          />
        )}
        {!deliveredDate && !cancelledDate && (
          <TimelineItem
            color={statusDetails.color}
            icon={statusDetails.icon}
            title={statusDetails.title}
            dateTime={statusDetails.dateTime}
          />
        )}
      </Box>
    </>
  );
}

export default OrdersOverview;
