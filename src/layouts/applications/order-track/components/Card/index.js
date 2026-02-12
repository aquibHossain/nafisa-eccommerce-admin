// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

import { Badge, Box, Avatar, Typography } from "@mui/material";

function Card({ image, badge, content, progress, attachedFiles, members }) {
  const renderMembers = members.map((member, key) => {
    const imageAlt = `image-${key}`;

    return (
      <Avatar
        key={imageAlt}
        src={member}
        alt={imageAlt}
        size="xs"
        sx={{
          border: ({ borders: { borderWidth }, palette: { white } }) =>
            `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1,

          "&:hover, &:focus": {
            zIndex: "10",
          },
        }}
      />
    );
  });

  return (
    <>
      {image && <Box component="img" src={image} width="100%" borderRadius="sm" mb={1} />}
      <Badge size="xs" color={badge.color} badgeContent={badge.label} container />
      <Box mt={1} mb={2}>
        <Typography variant="body2" color="text">
          {content}
        </Typography>
        {progress > 0 && (
          <Box mt={0.25}>
            {/* <Progress
              variant="gradient"
              value={progress}
              color={badge.color}
              sx={{ height: "8px" }}
            /> */}
          </Box>
        )}
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" color="text">
          {attachedFiles && (
            <>
              <Typography variant="body2" color="text" sx={{ lineHeight: 0 }}>
                <Icon sx={{ fontWeight: "bold" }}>attach_file</Icon>
              </Typography>
              <Typography variant="button" fontWeight="regular" color="text">
                &nbsp;{attachedFiles}
              </Typography>
            </>
          )}
        </Box>
        <Box display="flex">{renderMembers}</Box>
      </Box>
    </>
  );
}

// Setting default props for the Card
Card.defaultProps = {
  image: "",
  progress: 0,
  attachedFiles: "",
};

// Typechecking props for the Card
Card.propTypes = {
  image: PropTypes.string,
  badge: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  content: PropTypes.node.isRequired,
  progress: PropTypes.number,
  attachedFiles: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  members: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Card;
