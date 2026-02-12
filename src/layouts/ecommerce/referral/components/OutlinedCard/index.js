

// @mui material components
import Icon from "@mui/material/Icon";


import { Box } from "@mui/material";



import borders from "assets/theme/base/borders";

// Images
import icon from "assets/images/illustrations/icon-documentation.svg";

function OutlinedCard() {
  const { borderWidth, borderColor } = borders;
  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      alignItems="center"
      borderRadius="xl"
      shadow="xxl"
      border={`${borderWidth[1]} dashed ${borderColor}`}
      textAlign="center"
      p={3}
    >
      <Box component="img" src={icon} alt="Documentation" width="50%" mb={3} />
      <Typography
        component="a"
        href="#"
        variant="button"
        color="white"
        textTransform="capitalize"
        fontWeight="medium"
        sx={({ palette: { secondary }, typography: { size } }) => ({
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          color: `${secondary.main} !important`,

          "& .material-icons-round": {
            ml: 0.5,
            fontSize: size.md,
            transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
          },

          "&:hover .material-icons-round": {
            transform: "translateX(5px)",
          },
        })}
      >
        Join rocketship program <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
      </Typography>
    </Box>
  );
}

export default OutlinedCard;
