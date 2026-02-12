// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

import { Box } from "@mui/material";

import { Button } from "@mui/material";

function RankingList({ title, date, rankings }) {
  const renderRankings = rankings.map(({ color, icon, name, description, value }, key) => (
    <Box key={name} component="li" pt={1} pr={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <Box mr={2}>
            <Button
              variant="outlined"
              color={color}
              size="small"
              iconOnly
              circular
              sx={({ functions: { pxToRem } }) => ({
                width: pxToRem(34),
                minWidth: pxToRem(34),
                height: pxToRem(34),
                minHeight: pxToRem(34),
              })}
            >
              <Icon>{icon}</Icon>
            </Button>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="button" fontWeight="medium" gutterBottom>
              {name}
            </Typography>
            <Typography variant="caption" color="text">
              {description}
            </Typography>
          </Box>
        </Box>
        <Typography variant="button" color={color} fontWeight="medium" textGradient>
          {value}
        </Typography>
      </Box>
      {key === rankings.length - 1 ? null : (
        <Divider
          sx={{
            mt: 2,
            mb: 1,
          }}
        />
      )}
    </Box>
  ));

  return (
    <Card sx={{ height: "100%" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </Typography>
        <Typography variant="button" color="text" fontWeight="regular" sx={{ display: "flex" }}>
          <Icon
            color="inherit"
            fontSize="small"
            sx={{
              mr: 0.75,
              mt: -0.125,
            }}
          >
            date_range
          </Icon>
          {date}
        </Typography>
      </Box>
      <Box p={2}>
        <Box
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          {renderRankings}
        </Box>
      </Box>
    </Card>
  );
}

// Typechecking props for the RankingList
RankingList.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  rankings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RankingList;
