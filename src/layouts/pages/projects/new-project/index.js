import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";

// Charg Dashboard MUI components
import { Box, Input, Typography, Select, Button } from "@mui/material";

// Charg Dashboard MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DatePicker from "react-flatpickr";

function NewProject() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSetStartDate = (newDate) => setStartDate(newDate);
  const handleSetEndDate = (newDate) => setEndDate(newDate);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box mt={3} mb={4}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={9}>
            <Card sx={{ overflow: "visible" }}>
              <Box p={2} lineHeight={1}>
                <Typography variant="h6" fontWeight="medium">
                  New Project
                </Typography>
                <Typography variant="button" fontWeight="regular" color="text">
                  Create new project
                </Typography>
                <Divider />
                <Box display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
                  <Box mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <Typography component="label" variant="caption" fontWeight="bold">
                      Project Name
                    </Typography>
                  </Box>
                  <Input placeholder="Charg Dashboard MUI" />
                </Box>
                <Box mt={3} mb={2}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box mb={1} ml={0.5} lineHeight={0} display="inline-block">
                        <Typography component="label" variant="caption" fontWeight="bold">
                          Private Project
                        </Typography>
                      </Box>
                      <Box pl={0.5} pb={1.5}>
                        <Typography
                          component="label"
                          variant="caption"
                          fontWeight="regular"
                          color="text"
                        >
                          If you are available for hire outside of the current situation, you can
                          encourage others to hire you.
                        </Typography>
                      </Box>
                      <Box ml={0.5} mb={0.25}>
                        <Switch />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
                  <Box mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                    <Typography component="label" variant="caption" fontWeight="bold">
                      Project Description
                    </Typography>
                  </Box>
                  <Box mb={1.5} ml={0.5} mt={0.5} lineHeight={0} display="inline-block">
                    <Typography
                      component="label"
                      variant="caption"
                      fontWeight="regular"
                      color="text"
                    >
                      This is how others will learn about the project, so make it good!
                    </Typography>
                  </Box>
                  {/* <ArgonEditor value={editorValue} onChange={setEditorValue} /> */}
                </Box>

                <Box display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
                  <Box mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                    <Typography component="label" variant="caption" fontWeight="bold">
                      Project Tags
                    </Typography>
                  </Box>
                  <Select
                    defaultValue={[
                      { value: "choice 1", label: "Choice 1" },
                      { value: "label two", label: "label two" },
                    ]}
                    options={[
                      { value: "choice 1", label: "Choice 1" },
                      { value: "choice 2", label: "Choice 2" },
                      { value: "choice 3", label: "Choice 3" },
                      { value: "choice 4", label: "Choice 4" },
                      { value: "label one", label: "Label One", isDisabled: true },
                      { value: "label two", label: "Tabel Two" },
                      { value: "label three", label: "Label Three" },
                    ]}
                    isMulti
                  />
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <Box mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                        <Typography component="label" variant="caption" fontWeight="bold">
                          Start Date
                        </Typography>
                      </Box>
                      <DatePicker value={startDate} onChange={handleSetStartDate} />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <Box mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                        <Typography component="label" variant="caption" fontWeight="bold">
                          End Date
                        </Typography>
                      </Box>
                      <DatePicker value={endDate} onChange={handleSetEndDate} />
                    </Box>
                  </Grid>
                </Grid>
                <Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-end"
                    height="100%"
                  >
                    <Box mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                      <Typography component="label" variant="caption" fontWeight="bold">
                        Starting Files
                      </Typography>
                    </Box>
                    {/* <Dropzone options={{ addRemoveLinks: true }} /> */}
                  </Box>
                </Box>
                <Box display="flex" justifyContent="flex-end" mt={3}>
                  <Box mr={1}>
                    <Button color="light">Cancel</Button>
                  </Box>
                  <Button variant="gradient" color="info">
                    Create Project
                  </Button>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default NewProject;
