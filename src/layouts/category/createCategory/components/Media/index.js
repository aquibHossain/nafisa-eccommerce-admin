import { Box, Typography } from "@mui/material";

function Media() {
  return (
    <Box>
      <Typography variant="h5">Media</Typography>
      <Box mt={3}>
        <Box mb={1} ml={0.5} lineHeight={0} display="inline-block">
          <Typography component="label" variant="caption" fontWeight="bold">
            Product Image
          </Typography>
        </Box>
        {/* <ArgonDropzone options={{ addRemoveLinks: true }} /> */}
      </Box>
    </Box>
  );
}

export default Media;
