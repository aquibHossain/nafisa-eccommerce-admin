import axios from "axios";
import config from "config";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { Box, Button, Card, FormControl, IconButton, MenuItem, Select, TextareaAutosize, Typography } from "@mui/material";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import Header from "layouts/ecommerce/products/new-product/components/Header";
import StarRatings from "react-star-ratings";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";

const bgImage =
    "https://raw.githubusercontent.com/amartheme/public-assets/master/amar-dashboard-pro/assets/img/profile-layout-header.jpg";

const StarRatingsComponent = StarRatings;
function ProductReview() {
    const [formData, setFormData] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingSubCategories, setLoadingSubCategories] = useState(false);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get(`${config.production_url}/item?limit=500`);
                setBrands(response.data.data.result);
            } catch (error) {
                console.error("Error fetching brands:", error);
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchBrands();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous toast messages
        toast.dismiss();

        if (!formData.description.trim()) {
            toast.error("Please enter a description.");
            return;
        }
        const payload = new FormData();
        for (const key in formData) {
            if (key === "image" && Array.isArray(formData[key])) {
                formData[key].forEach((imgObj) => {
                    if (imgObj.file) {
                        console.log(imgObj.file);
                        payload.append("image", imgObj.file);
                    }
                });
            } else {
                if (key !== "image") payload.append(key, formData[key]);

            }
        }

        // Create FormData for file upload
        try {


            // Retrieve the token from localStorage
            const token = localStorage.getItem("token");

            if (!token) {
                toast.error("You are not authorized. Please log in.");
                return;
            }

            const response = await fetch(
                `${config.production_url}/item/product/review/admin`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: payload,
                }
            );

            // Show success message
            toast.success("Review added successfully!");
            setFormData({
                productId: "",
                rating: 0,
                name: "",
                email: "",
                description: "",
            })

        } catch (err) {
            // Improved error handling
            if (err.response) {
                // Server error
                toast.error(err.response?.data?.message || "Failed to add .");
            } else if (err.request) {
                // Network error
                toast.error("Network error. Please check your connection.");
            } else {
                // Unexpected error
                toast.error("An unexpected error occurred.");
            }
            console.error("Error:", err);
        }
    };
    const handleRemoveImage = (index) => {
        const updatedImages = formData.image.filter((_, i) => i !== index);
        setFormData({ ...formData, image: updatedImages });
    };
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        const updatedImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setFormData({
            ...formData,
            image: [...(formData.productImage || []), ...updatedImages],
        });
    };

    return (
        <DashboardLayout
            sx={{
                backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
                    `${linearGradient(
                        rgba(gradients.info.main, 0.6),
                        rgba(gradients.info.state, 0.6)
                    )}, url(${bgImage})`,
                backgroundPositionY: "50%",
            }}
        >
            <Header />
            <Grid container justifyContent="center" mt={5} mb={10}>
                <Grid item xs={12} lg={8}>
                    <Card sx={{ overflow: "visible" }}>
                        <form onSubmit={handleSubmit}>
                            <Box p={2}>
                                <Typography variant="h5" fontWeight="bold" mb={3}>
                                    Create Review
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="caption" fontWeight="bold" mb={1} display="block">
                                            Product
                                        </Typography>
                                        <FormControl fullWidth>
                                            <Select
                                                value={formData?.productId || ""}
                                                onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                                                displayEmpty
                                                inputProps={{ "aria-label": "Product" }}
                                            >
                                                <MenuItem value="" disabled>
                                                    {brands ? "Select Product" : "Select Product"}
                                                </MenuItem>
                                                {brands.map((brand) => (
                                                    <MenuItem key={brand._id} value={brand._id}>
                                                        {brand.productName}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="caption" fontWeight="bold" mb={1} display="block">
                                            Star
                                        </Typography>
                                        <StarRatingsComponent
                                            rating={formData?.rating}
                                            starRatedColor="yellow"
                                            starHoverColor="yellow"
                                            changeRating={(e) =>
                                                setFormData({ ...formData, rating: e })
                                            }
                                            numberOfStars={5}
                                            name='rating'
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <FormField
                                            type="text"
                                            label="User Name"
                                            placeholder="Name"
                                            value={formData?.name || ""}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormField
                                            type="text"
                                            label="User Email"
                                            placeholder="Emai;"
                                            value={formData?.email || ""}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="caption" fontWeight="bold" mb={1} display="block">
                                            Description
                                        </Typography>
                                        <TextareaAutosize
                                            type="text"
                                            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                                            minRows={12}
                                            label="Description"
                                            placeholder="e.g., High-quality T-shirt"
                                            value={formData?.description || ""}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box>
                                            <Box>
                                                <Typography component="label" variant="caption" fontWeight="bold">
                                                    Review Images
                                                </Typography>
                                                <input type="file" multiple accept="image/*" onChange={handleFileChange} />
                                            </Box>
                                            <Box mt={2} display="flex" gap={2} flexWrap="wrap">
                                                {formData.image &&
                                                    formData.image.map((img, index) => (
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
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"

                                            fullWidth
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </form>
                    </Card>
                </Grid>
            </Grid>

            <Footer />
        </DashboardLayout >
    );
}

ProductReview.propTypes = {
    formData: PropTypes.shape({
        productName: PropTypes.string,
        brand: PropTypes.string,
        description: PropTypes.string,
        category: PropTypes.string,
        subCategory: PropTypes.string,
    }),
    setFormData: PropTypes.func.isRequired,
};

ProductReview.defaultProps = {
    formData: {
        productName: "",
        brand: "",
        description: "",
        category: "",
        subCategory: "",
    },
};

export default ProductReview;
