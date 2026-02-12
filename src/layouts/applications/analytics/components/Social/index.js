

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import RedditIcon from "@mui/icons-material/Reddit";


import { Box } from "@mui/material";

import { Button } from "@mui/material";

// Analytics application components
import SocialItem from "layouts/applications/analytics/components/SocialItem";

function Social() {
  return (
    <Card sx={{ height: "100%" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <Typography variant="h6">Social</Typography>
        <Tooltip title="See how much traffic do you get from social media" placement="bottom">
          <Button variant="outlined" color="secondary" size="small" circular iconOnly>
            <Icon>priority_high</Icon>
          </Button>
        </Tooltip>
      </Box>
      <Box p={2}>
        <SocialItem
          icon={{ color: "facebook", component: <FacebookIcon /> }}
          title="Facebook"
          percentage={80}
        />
        <SocialItem
          icon={{ color: "twitter", component: <TwitterIcon /> }}
          title="Facebook"
          percentage={40}
        />
        <SocialItem
          icon={{ color: "reddit", component: <RedditIcon /> }}
          title="Reddit"
          percentage={30}
        />
        <SocialItem
          icon={{ color: "youtube", component: <YouTubeIcon /> }}
          title="Youtube"
          percentage={25}
        />
        <SocialItem
          icon={{ color: "instagram", component: <InstagramIcon /> }}
          title="Instagram"
          percentage={15}
        />
      </Box>
    </Card>
  );
}

export default Social;
