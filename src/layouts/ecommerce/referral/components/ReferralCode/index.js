// @mui material components
import Tooltip from "@mui/material/Tooltip";
import Link from "@mui/material/Link";

import { Box, Typography } from "@mui/material";

import { Input } from "@mui/material";
import { Button } from "@mui/material";

import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

function ReferralCode() {
  const { secondary } = colors;
  const { borderWidth } = borders;

  return (
    <>
      <Box lineHeight={1}>
        <Typography variant="h6" fontWeight="medium">
          Referral Code
        </Typography>
        <Typography variant="button" fontWeight="regular" color="text">
          Copy the code bellow to your registered provider.
        </Typography>
      </Box>
      <Box
        borderRadius="md"
        border={`${borderWidth[1]} dashed ${secondary.main}`}
        pt={2}
        pb={1.5}
        px={2}
        mt={2}
      >
        <Box mb={1} lineHeight={0}>
          <Typography variant="caption" color="text">
            Generated 23 days ago by <span sx={{ fontWeight: "bold" }}>softuidash23</span>
          </Typography>
        </Box>
        <Box mb={2} lineHeight={0}>
          <Typography variant="caption" color="text" fontWeight="bold">
            (Used one time)
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <Box width="70%" mr={1}>
            <Input
              size="small"
              defaultValue="amar-dashboard-vmsk392"
              icon={{ component: "lock", direction: "right" }}
              disabled
            />
          </Box>
          <Tooltip title="Referral code expires in 24 hours" placement="top">
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ padding: "0.5rem 1rem" }}
            >
              copy
            </Button>
          </Tooltip>
        </Box>
        <Box mb={0.5} lineHeight={1.2}>
          <Typography component="p" variant="caption" color="text">
            You cannot generate codes.
          </Typography>
          <Typography variant="caption" color="text">
            <Typography
              component={Link}
              variant="caption"
              href="#link"
              className="color-background"
            >
              Contact us
            </Typography>{" "}
            to generate more referrals link.
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default ReferralCode;
