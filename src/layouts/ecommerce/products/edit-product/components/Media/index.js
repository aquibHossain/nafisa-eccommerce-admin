import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography, IconButton } from "@mui/material";

function Media({ formData, setFormData }) {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const updatedImages = files.map((file) => ({
      file, // File object
      preview: URL.createObjectURL(file), // Create preview URL for UI
    }));

    setFormData({
      ...formData,
      productImage: [...(formData.productImage || []), ...updatedImages], // Merge existing and new files
    });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formData.productImage.filter((_, i) => i !== index);
    setFormData({ ...formData, productImage: updatedImages });
  };

  return (
    <Box>
      <Typography variant="h5">Media</Typography>
      <Box mt={3}>
        <Typography component="label" variant="caption" fontWeight="bold">
          Product Images
        </Typography>
        <input type="file" multiple accept="image/*" onChange={handleFileChange} />
      </Box>
      <Box mt={2} display="flex" gap={2} flexWrap="wrap">
        {formData.productImage &&
          formData.productImage.map((img, index) => (
            <Box
              key={index}
              position="relative"
              width="100px"
              height="100px"
              border="1px solid #ddd"
              borderRadius="4px"
              overflow="hidden"
            >
              <img
                src={img.preview}
                alt={`uploaded-${index}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <IconButton
                size="small"
                onClick={() => handleRemoveImage(index)}
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
      </Box>
    </Box>
  );
}

Media.propTypes = {
  formData: PropTypes.shape({
    productImage: PropTypes.arrayOf(
      PropTypes.shape({
        file: PropTypes.instanceOf(File), // File to upload
        preview: PropTypes.string, // Preview for UI
      })
    ),
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default Media;
