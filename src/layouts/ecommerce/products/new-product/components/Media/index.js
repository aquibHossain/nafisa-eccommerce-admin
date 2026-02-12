import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography, IconButton, Grid } from "@mui/material";
import TextEditor from "examples/TextEditor";

function Media({ formData, setFormData }) {

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const updatedImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData({
      ...formData,
      productImage: [...(formData.productImage || []), ...updatedImages],
    });
  };

  const handleFileChangeMain = (e) => {
    const file = e.target.files[0];
    if (file) {
      const image = {
        file,
        preview: URL.createObjectURL(file),
      };

      setFormData({
        ...formData,
        image: image,
      });
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formData.productImage.filter((_, i) => i !== index);
    setFormData({ ...formData, productImage: updatedImages });
  };

  const handleRemoveMainImage = () => {
    setFormData({ ...formData, image: null });
  };

  return (
    <Box>
      <Box>
        <Typography variant="h5">Media</Typography>

        {/* Product Main Image */}
        <Box mt={3}>
          <Typography component="label" variant="caption" fontWeight="bold">
            Product Main Image
          </Typography>
          <input type="file" accept="image/*" onChange={handleFileChangeMain} />
        </Box>
        <Box mt={2}>
          {formData.image && (
            <Box
              position="relative"
              width="100px"
              height="100px"
              border="1px solid #ddd"
              borderRadius="4px"
              overflow="hidden"
            >
              <img
                src={formData.image.preview || formData.image}
                alt="Main"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <IconButton
                size="small"
                onClick={handleRemoveMainImage}
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
          )}
        </Box>
      </Box>

      {/* Product Images */}
      <Box>
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
                  src={img.preview || img}
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
      <Grid item xs={12} mt={5} pb={15}>
        <Typography variant="caption" fontWeight="bold" mb={1} display="block">
          Description
        </Typography>
        <TextEditor
          value={formData?.description || ""}
          onChange={(value) => setFormData((prev) => ({ ...prev, description: value }))}
          extraProps={{ placeholder: "Enter product description..." }}
        />

      </Grid>
      <Grid item xs={12} mt={5} pb={15}>
        <Typography variant="caption" fontWeight="bold" mb={1} display="block">
          Key Specification
        </Typography>
        <TextEditor
          value={formData?.keySpec || ""}
          onChange={(value) => setFormData((prev) => ({ ...prev, keySpec: value }))}
          extraProps={{ placeholder: "Enter product  Key Specification..." }}
        />

      </Grid>
      <Grid item xs={12} mt={5} pb={15}>
        <Typography variant="caption" fontWeight="bold" mb={1} display="block">
          FAQ
        </Typography>
        <TextEditor
          value={formData?.question || ""}
          onChange={(value) => setFormData((prev) => ({ ...prev, question: value }))}
          extraProps={{ placeholder: "Enter product FAQ..." }}
        />

      </Grid>
    </Box>
  );
}

Media.propTypes = {
  formData: PropTypes.shape({
    productMainImage: PropTypes.shape({
      file: PropTypes.instanceOf(File), // File to upload
      preview: PropTypes.string, // Preview for UI
    }),
    productImages: PropTypes.arrayOf(
      PropTypes.shape({
        file: PropTypes.instanceOf(File),
        preview: PropTypes.string,
      })
    ),
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default Media;
