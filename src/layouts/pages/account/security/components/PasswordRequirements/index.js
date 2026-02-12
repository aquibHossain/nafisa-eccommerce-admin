

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";


import { Box } from "@mui/material";


function PasswordRequirements() {
  const passwordRequirements = [
    "One special characters",
    "Min 6 characters",
    "One number (2 are recommended)",
    "Change it often",
  ];

  const renderPasswordRequirements = passwordRequirements.map((item, key) => {
    const itemKey = `element-${key}`;

    return (
      <Box key={itemKey} component="li" color="text" fontSize="1.25rem" lineHeight={1.25}>
        <Typography variant="button" color="text" fontWeight="regular" verticalAlign="middle">
          {item}
        </Typography>
      </Box>
    );
  });

  return (
    <Card id="change-password">
      <Box pt={2} px={2} lineHeight={1}>
        <Typography variant="h6" fontWeight="medium">
          Password requirements
        </Typography>
        <Typography variant="button" fontWeight="regular" color="text">
          Please follow this guide for a strong password:
        </Typography>
      </Box>
      <Box p={2}>
        <Box component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
          {renderPasswordRequirements}
        </Box>
      </Box>
    </Card>
  );
}

export default PasswordRequirements;
