

// @mui material components
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";


import { Box } from "@mui/material";


// Charg Dashboard MUI example components
import TimelineItem from "examples/Timeline/TimelineItem";

function OrdersOverview() {
  return (
    <Card sx={{ height: "100%" }}>
      <Box pt={3} px={3}>
        <Typography variant="h6" fontWeight="medium">
          نظرة عامة على الطلبات
        </Typography>
        <Box mt={1} mb={2}>
          <Typography variant="button" color="text" fontWeight="medium">
            <Typography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ fontWeight: "bold", color: ({ palette: { success } }) => success.main }}>
                arrow_upward
              </Icon>
            </Typography>
            &nbsp;
            <Typography variant="button" color="text" fontWeight="bold">
              24%
            </Typography>{" "}
            هذا الشهر
          </Typography>
        </Box>
      </Box>
      <Box p={2}>
        <TimelineItem
          color="success"
          icon="notifications"
          title="$2400, تغييرات في التصميم"
          dateTime="22 ديسمبر 7:20 مساءً"
        />
        <TimelineItem
          color="error"
          icon="inventory_2"
          title="طلب جديد # 1832412"
          dateTime="21 ديسمبر 11 م"
        />
        <TimelineItem
          color="info"
          icon="shopping_cart"
          title="مدفوعات الخادم لشهر أبريل"
          dateTime="21 ديسمبر 9:34 مساءً"
        />
        <TimelineItem
          color="warning"
          icon="payment"
          title="تمت إضافة بطاقة جديدة للأمر رقم 4395133"
          dateTime="20 ديسمبر 2:20 صباحًا"
        />
        <TimelineItem
          color="primary"
          icon="vpn_key"
          title="فتح الحزم من أجل التطوير"
          dateTime="18 ديسمبر ، 4:54 صباحًا"
        />
        <TimelineItem color="dark" icon="paid" title="طلب جديد # 9583120" dateTime="17 ديسمبر" />
      </Box>
    </Card>
  );
}

export default OrdersOverview;
