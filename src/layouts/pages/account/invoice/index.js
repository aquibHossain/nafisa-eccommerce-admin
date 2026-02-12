// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Button, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

import { Box } from "@mui/material";

import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";

// Invoice page components
import BaseLayout from "layouts/pages/account/components/BaseLayout";

// Images
import logoCT from "assets/images/logo-ct.png";
import logoCTDark from "assets/images/logo-ct-dark.png";

// Charg Dashboard MUI contexts
import { useArgonController } from "context";

function Invoice() {
  const [controller] = useArgonController();
  const { darkMode } = controller;
  const { borderWidth } = borders;
  const { light, dark } = colors;
  const borderBottom = `${borderWidth[1]} solid ${light.main}`;

  return (
    <BaseLayout stickyNavbar>
      <Box mt={{ xs: 4, md: 10 }} mb={{ xs: 4, md: 8 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8}>
            <Card>
              {/* Invoice header */}
              <Box p={3}>
                <Grid container justifyContent="space-between">
                  <Grid item xs={12} md={4}>
                    <Box
                      component="img"
                      src={darkMode ? logoCT : logoCTDark}
                      width="25%"
                      p={1}
                      mb={1}
                    />
                    <Typography variant="h6" fontWeight="medium">
                      St. Independence Embankment, 050105 Lalmatia, Mohammadpur
                    </Typography>
                    <Box mt={1} mb={2}>
                      <Typography display="block" variant="body2" color="secondary">
                        01988565277
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={7} lg={3}>
                    <Box width="100%" textAlign={{ xs: "left", md: "right" }} mt={6}>
                      <Box mt={1}>
                        <Typography variant="h6" fontWeight="medium">
                          Billed to: John Doe
                        </Typography>
                      </Box>
                      <Box mb={1}>
                        <Typography variant="body2" color="secondary">
                          4006 Locust View Drive
                          <br />
                          San Francisco CA
                          <br />
                          California
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Box mt={{ xs: 5, md: 10 }}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={12} md={4}>
                      <Typography variant="h6" color="secondary" fontWeight="medium">
                        Invoice no
                      </Typography>
                      <Typography variant="h5" fontWeight="medium">
                        #0453119
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={7} lg={5}>
                      <Box
                        width="100%"
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }}
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign={{ xs: "left", md: "right" }}
                        mt={{ xs: 3, md: 0 }}
                      >
                        <Box width="50%">
                          <Typography variant="h6" color="secondary" fontWeight="medium">
                            Invoice date:
                          </Typography>
                        </Box>
                        <Box width="50%">
                          <Typography variant="h6" fontWeight="medium">
                            06/03/2019
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        width="100%"
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }}
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign={{ xs: "left", md: "right" }}
                      >
                        <Box width="50%">
                          <Typography variant="h6" color="secondary" fontWeight="medium">
                            Due date:
                          </Typography>
                        </Box>
                        <Box width="50%">
                          <Typography variant="h6" fontWeight="medium">
                            11/03/2019
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>

              {/* Invoice table */}
              <Box p={3}>
                <Box width="100%" overflow="auto" borderRadius="xl">
                  <Table sx={{ minWidth: "32rem" }}>
                    <Box bgColor="dark" component="thead">
                      <TableRow>
                        <Box
                          component="th"
                          width={{ xs: "45%", md: "50%" }}
                          py={1.5}
                          px={1}
                          textAlign="left"
                          borderBottom={borderBottom}
                        >
                          <Typography variant="h6" color="white" fontWeight="medium">
                            Item
                          </Typography>
                        </Box>
                        <Box
                          component="th"
                          py={1.5}
                          pl={3}
                          pr={1}
                          textAlign="left"
                          borderBottom={borderBottom}
                        >
                          <Typography variant="h6" color="white" fontWeight="medium">
                            Qty
                          </Typography>
                        </Box>
                        <Box
                          component="th"
                          py={1.5}
                          pl={3}
                          pr={1}
                          textAlign="left"
                          borderBottom={borderBottom}
                        >
                          <Typography variant="h6" color="white" fontWeight="medium">
                            Rate
                          </Typography>
                        </Box>
                        <Box
                          component="th"
                          py={1.5}
                          pl={3}
                          pr={1}
                          textAlign="left"
                          borderBottom={borderBottom}
                        >
                          <Typography variant="h6" color="white" fontWeight="medium">
                            Amount
                          </Typography>
                        </Box>
                      </TableRow>
                    </Box>
                    <TableBody>
                      <TableRow>
                        <Box component="td" textAlign="left" p={1} borderBottom={borderBottom}>
                          <Typography variant="body2" color="text">
                            Premium Support
                          </Typography>
                        </Box>
                        <Box
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <Typography variant="body2" color="text">
                            1
                          </Typography>
                        </Box>
                        <Box
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <Typography variant="body2" color="text">
                            $ 9.00
                          </Typography>
                        </Box>
                        <Box
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <Typography variant="body2" color="text">
                            $ 9.00
                          </Typography>
                        </Box>
                      </TableRow>
                      <TableRow>
                        <Box component="td" textAlign="left" p={1} borderBottom={borderBottom}>
                          <Typography variant="body2" color="text">
                            Amarlodge Design System PRO
                          </Typography>
                        </Box>
                        <Box
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <Typography variant="body2" color="text">
                            3
                          </Typography>
                        </Box>
                        <Box
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <Typography variant="body2" color="text">
                            $ 100.00
                          </Typography>
                        </Box>
                        <Box
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <Typography variant="body2" color="text">
                            $ 300.00
                          </Typography>
                        </Box>
                      </TableRow>
                      <TableRow>
                        <Box
                          component="td"
                          textAlign="left"
                          p={1}
                          borderBottom={`1px solid ${dark.main}`}
                        >
                          <Typography variant="body2" color="text">
                            Parts for service
                          </Typography>
                        </Box>
                        <Box
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={`1px solid ${dark.main}`}
                        >
                          <Typography variant="body2" color="text">
                            1
                          </Typography>
                        </Box>
                        <Box
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={`1px solid ${dark.main}`}
                        >
                          <Typography variant="body2" color="text">
                            $ 89.00
                          </Typography>
                        </Box>
                        <Box
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={`1px solid ${dark.main}`}
                        >
                          <Typography variant="body2" color="text">
                            $ 89.00
                          </Typography>
                        </Box>
                      </TableRow>
                      <TableRow>
                        <Box
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        />
                        <Box
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        />
                        <Box
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <Typography variant="h5">Total</Typography>
                        </Box>
                        <Box
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <Typography variant="h5">$ 698</Typography>
                        </Box>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Box>

              {/* Invoice footer */}
              <Box p={3} mt={7}>
                <Grid container>
                  <Grid item xs={12} lg={5}>
                    <Typography variant="h5" fontWeight="medium">
                      Thank you!
                    </Typography>
                    <Box mt={1} mb={2} lineHeight={0}>
                      <Typography variant="button" fontWeight="regular" color="secondary">
                        If you encounter any issues related to the invoice you can contact us at:
                      </Typography>
                    </Box>
                    <Typography component="span" variant="h6" fontWeight="medium" color="secondary">
                      email:{" "}
                      <Typography component="span" variant="h6" fontWeight="medium">
                        support@brain-schema.com
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} lg={7}>
                    <Box
                      width="100%"
                      height={{ xs: "auto", md: "100%" }}
                      display="flex"
                      justifyContent={{ xs: "flex-start", md: "flex-end" }}
                      alignItems="flex-end"
                      mt={{ xs: 2, md: 0 }}
                    >
                      <Button color="info" onClick={() => window.print(this)}>
                        Print
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </BaseLayout>
  );
}

export default Invoice;
