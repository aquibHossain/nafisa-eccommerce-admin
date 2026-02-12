

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";


import { Box } from "@mui/material";

import { Avatar } from "@mui/material";

// Custom styles for ComplexProjectCard
function ComplexProjectCard({ color, image, title, dateTime, description, members, dropdown }) {
  const renderMembers = members.map((member, key) => {
    const memberKey = `member-${key}`;

    return (
      <Avatar
        key={memberKey}
        src={member}
        alt="member profile"
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",

          "&:not(:first-of-type)": {
            ml: -1.25,
          },

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    );
  });

  return (
    <Card>
      <Box p={2}>
        <Box display="flex" alignItems="center">
          <Avatar
            src={image}
            alt={title}
            size="xl"
            variant="rounded"
            bgColor={color}
            sx={{ p: 1 }}
          />
          <Box ml={2} lineHeight={0}>
            <Box mb={1} lineHeight={0}>
              <Typography variant="h6" textTransform="capitalize" fontWeight="medium">
                {title}
              </Typography>
            </Box>
            {members.length > -1 ? <Box display="flex">{renderMembers}</Box> : null}
          </Box>
          {dropdown && (
            <Typography
              color="secondary"
              onClick={dropdown.action}
              sx={{
                ml: "auto",
                alignSelf: "flex-start",
                py: 1.25,
              }}
            >
              <Icon fontSize="default" sx={{ cursor: "pointer" }}>
                more_vert
              </Icon>
            </Typography>
          )}
          {dropdown.menu}
        </Box>
        <Box my={2} lineHeight={1}>
          <Typography variant="button" fontWeight="regular" color="text">
            {description}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {members.length > -1 ? (
            <Box display="flex" flexDirection="column" lineHeight={0}>
              <Typography variant="button" fontWeight="medium">
                {members.length}
              </Typography>
              <Typography variant="button" fontWeight="medium" color="secondary">
                Participants
              </Typography>
            </Box>
          ) : null}
          {dateTime ? (
            <Box display="flex" flexDirection="column" lineHeight={0}>
              <Typography variant="button" fontWeight="medium">
                {dateTime}
              </Typography>
              <Typography variant="button" fontWeight="medium" color="secondary">
                Due date
              </Typography>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Card>
  );
}

// Setting default values for the props of ComplexProjectCard
ComplexProjectCard.defaultProps = {
  color: "dark",
  dateTime: "",
  members: [],
  dropdown: false,
};

// Typechecking props for the ProfileInfoCard
ComplexProjectCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string,
  description: PropTypes.node.isRequired,
  members: PropTypes.arrayOf(PropTypes.string),
  dropdown: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      action: PropTypes.func,
      menu: PropTypes.node,
    }),
  ]),
};

export default ComplexProjectCard;
