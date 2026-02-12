

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";


import { Box } from "@mui/material";

import ArgonAlert from "components/ArgonAlert";
import { Button } from "@mui/material";
import ArgonSnackbar from "components/ArgonSnackbar";

// Charg Dashboard MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Typography } from "@mui/material";

function Notifications() {
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const alertContent = (name) => (
    <Typography variant="body2" color="white">
      A simple {name} alert with{" "}
      <Typography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        an example link
      </Typography>
      . Give it a click if you like.
    </Typography>
  );

  const renderSuccessSB = (
    <ArgonSnackbar
      color="success"
      icon="check"
      title="Charg Dashboard 2"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderInfoSB = (
    <ArgonSnackbar
      icon="notifications"
      title="Charg Dashboard 2"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const renderWarningSB = (
    <ArgonSnackbar
      color="warning"
      icon="star"
      title="Charg Dashboard 2"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={warningSB}
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <ArgonSnackbar
      color="error"
      icon="warning"
      title="Charg Dashboard 2"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <Box p={2}>
                <Typography variant="h5">Alerts</Typography>
              </Box>
              <Box pt={2} px={2}>
                <ArgonAlert color="primary" dismissible>
                  {alertContent("primary")}
                </ArgonAlert>
                <ArgonAlert color="secondary" dismissible>
                  {alertContent("secondary")}
                </ArgonAlert>
                <ArgonAlert color="success" dismissible>
                  {alertContent("success")}
                </ArgonAlert>
                <ArgonAlert color="error" dismissible>
                  {alertContent("error")}
                </ArgonAlert>
                <ArgonAlert color="warning" dismissible>
                  {alertContent("warning")}
                </ArgonAlert>
                <ArgonAlert color="info" dismissible>
                  {alertContent("info")}
                </ArgonAlert>
                <ArgonAlert color="light" dismissible>
                  {alertContent("light")}
                </ArgonAlert>
                <ArgonAlert color="dark" dismissible>
                  {alertContent("dark")}
                </ArgonAlert>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} lg={8}>
            <Card>
              <Box p={2} lineHeight={0}>
                <Typography variant="h5">Notifications</Typography>
                <Typography variant="button" color="text" fontWeight="regular">
                  Notifications on this page use Toasts from Bootstrap. Read more details here.
                </Typography>
              </Box>
              <Box p={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} lg={3}>
                    <Button color="success" onClick={openSuccessSB} fullWidth>
                      Success Notification
                    </Button>
                    {renderSuccessSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <Button color="info" onClick={openInfoSB} fullWidth>
                      Info Notification
                    </Button>
                    {renderInfoSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <Button color="warning" onClick={openWarningSB} fullWidth>
                      Warning Notification
                    </Button>
                    {renderWarningSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <Button color="error" onClick={openErrorSB} fullWidth>
                      Error Notification
                    </Button>
                    {renderErrorSB}
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
