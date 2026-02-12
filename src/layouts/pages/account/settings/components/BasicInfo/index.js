

import { useState } from "react";

// @mui core components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";


import { Box } from "@mui/material";

import { Select } from "@mui/material";
import ArgonTagInput from "components/ArgonTagInput";


import FormField from "layouts/pages/account/components/FormField";

// Data
import selectData from "layouts/pages/account/settings/components/BasicInfo/data/selectData";

function BasicInfo() {
  const [skills, setSkills] = useState(["react", "angular"]);

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <Box p={3}>
        <Typography variant="h5">Basic Info</Typography>
      </Box>
      <Box component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField label="first name" placeholder="Alec" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="last name" placeholder="Thompson" />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                >
                  <Box mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <Typography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                      textTransform="capitalize"
                    >
                      I&apos;m
                    </Typography>
                  </Box>
                  <ArgonSelect placeholder="Male" options={selectData.gender} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={5}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <Box mb={1} ml={0.5} lineHeight={0} display="inline-block">
                        <Typography
                          component="label"
                          variant="caption"
                          fontWeight="bold"
                          textTransform="capitalize"
                        >
                          birth date
                        </Typography>
                      </Box>
                      <ArgonSelect placeholder="February" options={selectData.birthDate} />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <ArgonSelect placeholder={1} options={selectData.days} />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <ArgonSelect placeholder={2021} options={selectData.years} />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="email"
              placeholder="example@email.com"
              inputProps={{ type: "email" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="confirmation email"
              placeholder="example@email.com"
              inputProps={{ type: "email" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="your location" placeholder="Sydney, A" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="phone number"
              placeholder="+40 735 631 620"
              inputProps={{ type: "number" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormField label="language" placeholder="English" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
              <ArgonTagInput
                tags={skills}
                placeholder=" "
                onChange={(newSkill) => setSkills(newSkill)}
                removeOnBackspace
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default BasicInfo;
