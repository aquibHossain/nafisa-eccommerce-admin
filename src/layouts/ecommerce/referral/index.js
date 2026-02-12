

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";


import { Box } from "@mui/material";


// Charg Dashboard MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import OutlinedCounterCard from "examples/Cards/CounterCards/OutlinedCounterCard";
import TransparentInfoCard from "examples/Cards/InfoCards/TransparentInfoCard";
import ComplexBackgroundCard from "examples/Cards/BackgroundCards/ComplexBackgroundCard";

// Referral page components
import ReferralCode from "layouts/ecommerce/referral/components/ReferralCode";
import OutlinedCard from "layouts/ecommerce/referral/components/OutlinedCard";

// Data
import dataTableData from "layouts/ecommerce/referral/data/dataTableData";
import { Typography } from "@mui/material";

// Images
const image1 =
  "https://raw.githubusercontent.com/amartheme/public-assets/master/amar-dashboard-pro/assets/img/refferal1.jpg";
const image2 =
  "https://raw.githubusercontent.com/amartheme/public-assets/master/amar-dashboard-pro/assets/img/refferal2.jpg";

function Referral() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box my={3}>
        <Box mb={3}>
          <Card>
            <Box p={2}>
              <Box mb={1}>
                <Typography variant="h5" fontWeight="medium">
                  Referral Program
                </Typography>
              </Box>
              <Typography variant="body2" fontWeight="regular" color="text">
                Track and find all the details about our referral program, your stats and revenues.
              </Typography>
            </Box>
            <Box p={2}>
              <Grid container spacing={3}>
                <Grid item xs={6} lg={3}>
                  <OutlinedCounterCard count={23980} prefix="$" title="earnings" />
                </Grid>
                <Grid item xs={6} lg={3}>
                  <OutlinedCounterCard count={2400} prefix="$" title="customers" />
                </Grid>
                <Grid item xs={6} lg={3}>
                  <OutlinedCounterCard count={48} prefix="$" title="avg. value" />
                </Grid>
                <Grid item xs={6} lg={3}>
                  <OutlinedCounterCard count={4} suffix="%" title="refund rate" />
                </Grid>
              </Grid>
              <Box mt={6} mb={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={5}>
                    <ReferralCode />
                  </Grid>
                  <Grid item xs={12} lg={7}>
                    <Typography variant="h6" fontWeight="medium">
                      How to use
                    </Typography>
                    <Box mb={2}>
                      <Typography variant="button" color="text" fontWeight="regular">
                        Integrate your referral code in 3 easy steps.
                      </Typography>
                    </Box>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <TransparentInfoCard
                          color="dark"
                          icon="paid"
                          description="1. Create & validate your referral link and get"
                          value={
                            <>
                              <Typography component="span" variant="button">
                                $
                              </Typography>
                              100
                            </>
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TransparentInfoCard
                          color="dark"
                          icon="unarchive"
                          description="2. For every order you make you get"
                          value={
                            <>
                              10
                              <Typography component="span" variant="button">
                                %
                              </Typography>
                            </>
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TransparentInfoCard
                          color="dark"
                          icon="emoji_events"
                          description="3. Get other friends to generate link and get"
                          value={
                            <>
                              <Typography component="span" variant="button">
                                $
                              </Typography>
                              500
                            </>
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <Divider />
              <Box mt={2}>
                <Box mb={1}>
                  <Typography variant="h6" fontWeight="medium">
                    Other programs
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={4}>
                    <ComplexBackgroundCard
                      image={image1}
                      description="User #hashtag in a photo on social media and get $10 for each purchase you make."
                      action={{
                        type: "internal",
                        route: "/ecommerce/referral",
                        label: "read more",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <ComplexBackgroundCard
                      image={image2}
                      description="Send the invitation link to 10 friends and get a 50% coupon to use on any purchase."
                      action={{
                        type: "internal",
                        route: "/ecommerce/referral",
                        label: "read more",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <OutlinedCard />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Card>
        </Box>
        <Card>
          <Box pt={3} px={3}>
            <Typography variant="h6" fontWeight="medium">
              Top Referred Users
            </Typography>
          </Box>
          <DataTable
            table={dataTableData}
            entriesPerPage={false}
            showTotalEntries={false}
            isSorted={false}
            noEndBorder
          />
        </Card>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default Referral;
