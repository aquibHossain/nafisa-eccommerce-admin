// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Charg Dashboard MUI example components
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";

import breakpoints from "assets/theme/base/breakpoints";

// VR dashboards components
import BaseLayout from "layouts/dashboards/virtual-reality/components/BaseLayout";

// Default dashboards components
import TeamMembers from "layouts/dashboards/default/components/TeamMembers";
import TodoList from "layouts/dashboards/default/components/TodoList";
import ProgressTrack from "layouts/dashboards/default/components/ProgressTrack";
import { Box, Typography } from "@mui/material";

function VRDefault() {
  const { values } = breakpoints;

  return (
    <BaseLayout>
      <Box ml={{ xs: 0, md: 3 }} py={{ xs: 0, md: 3 }} mt={{ xs: 0, md: 4 }}>
        <Grid container>
          <Grid item xs={12} lg={7}>
            <Box mb={3} p={1}>
              <Typography
                variant={window.innerWidth < values.sm ? "h3" : "h2"}
                textTransform="capitalize"
                fontWeight="bold"
                gutterBottom
              >
                general statistics
              </Typography>
              <Box display="flex" alignItems="center">
                <Box mr={3}>
                  <Typography variant="h6">All users</Typography>
                </Box>
                <Typography
                  component="a"
                  href="#"
                  variant="button"
                  color="white"
                  sx={({ typography: { size }, functions: { pxToRem } }) => ({
                    display: "flex",
                    alignItems: "center",

                    "& .material-icons-round": {
                      fontSize: size.md,
                      transform: `translate(0, ${pxToRem(-1)})`,
                      transition: "all 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                    },

                    "&:hover .material-icons-round, &:focus .material-icons-round": {
                      transform: `translate(${pxToRem(5)}, ${pxToRem(-1)})`,
                    },
                  })}
                >
                  Read More&nbsp;
                  <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
                </Typography>
              </Box>
              <Typography
                variant={window.innerWidth < values.sm ? "h2" : "h1"}
                textTransform="capitalize"
                fontWeight="bold"
                gutterBottom
              >
                1,600,000
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="today's money"
              count="$53,000"
              icon={{ color: "info", component: <i className="ni ni-money-coins" /> }}
              percentage={{ color: "success", count: "+55%", text: "since yesterday" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="today's users"
              count="2,300"
              icon={{ color: "error", component: <i className="ni ni-world" /> }}
              percentage={{ color: "success", count: "+3%", text: "since last week" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="new clients"
              count="+3,462"
              icon={{ color: "success", component: <i className="ni ni-paper-diploma" /> }}
              percentage={{ color: "error", count: "-2%", text: "since last quarter" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="sales"
              count="$103,430"
              icon={{ color: "warning", component: <i className="ni ni-cart" /> }}
              percentage={{ color: "success", count: "+5%", text: "than last month" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={4}>
            <TeamMembers />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TodoList />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ProgressTrack />
          </Grid>
        </Grid>
      </Box>
    </BaseLayout>
  );
}

export default VRDefault;
