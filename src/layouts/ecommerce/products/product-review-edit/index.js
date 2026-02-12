import axios from "axios";
import config from "config";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { Box, Button, Card, FormControl, MenuItem, Select, TextareaAutosize, Typography } from "@mui/material";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import StarRatings from "react-star-ratings";
import toast from "react-hot-toast";

const bgImage =
    "https://raw.githubusercontent.com/amartheme/public-assets/master/amar-dashboard-pro/assets/img/profile-layout-header.jpg";

const StarRatingsComponent = StarRatings;
function ProductReviewEdit({ data, handleCloseModal, fetchProducts }) {
    const [formData, setFormData] = useState({
        productId: data?.productId,
        rating: data?.rating,
        name: data?.name ?? data?.userId?.name,
        email: data?.email ?? data?.userId?.email,
        description: data?.comment,
        image: data?.image || [],
    });
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get(`${config.production_url}/item?limit=500`);
                setBrands(response.data.data.result);
            } catch (error) {
                console.error("Error fetching brands:", error);
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

        // Create FormData for file upload
        try {


            // Retrieve the token from localStorage
            const token = localStorage.getItem("token");

            if (!token) {
                toast.error("You are not authorized. Please log in.");
                return;
            }

            const response = await fetch(
                `${config.production_url}/item/product/review/admin/${formData?.productId}/${data?._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            // Show success message
            toast.success("Review updated successfully!");
            fetchProducts()
            handleCloseModal()

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


    return (

        <form onSubmit={handleSubmit}>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="caption" fontWeight="bold" mb={1} display="block">
                        Product
                    </Typography>
                    <FormControl fullWidth>
                        <Select
                            disabled
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
                        disabled={data?.userId}
                        label="User Name"
                        placeholder="Name"
                        value={formData?.name || ""}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormField
                        type="text"
                        disabled={data?.userId}
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
                    <Typography variant="caption" fontWeight="bold" mb={3} display="block">
                        Uploaded Images
                    </Typography>
                    <Box display="flex" gap={2} flexWrap="wrap">
                        {formData.image.map((img, index) => (
                            <Box key={index} position="relative">
                                <img
                                    src={img}
                                    alt={`img-${index}`}
                                    width={100}
                                    height={100}
                                    style={{ borderRadius: 8 }}
                                />
                                <Button
                                    size="small"
                                    onClick={() => {
                                        const newImages = formData.image.filter((_, i) => i !== index);
                                        setFormData({ ...formData, image: newImages });
                                    }}
                                    style={{
                                        position: "absolute",
                                        top: -10,
                                        right: -10,
                                        background: "#fff",
                                        minWidth: 24,
                                        height: 24,
                                        borderRadius: "50%",
                                        padding: 0,
                                        color: "#000",
                                    }}
                                >
                                    ✖
                                </Button>
                            </Box>
                        ))}
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

        </form>

    );
}

ProductReviewEdit.propTypes = {
    formData: PropTypes.shape({
        productName: PropTypes.string,
        brand: PropTypes.string,
        description: PropTypes.string,
        category: PropTypes.string,
        subCategory: PropTypes.string,
    }),
    setFormData: PropTypes.func.isRequired,
};

ProductReviewEdit.defaultProps = {
    formData: {
        productName: "",
        brand: "",
        description: "",
        category: "",
        subCategory: "",
    },
};

export default ProductReviewEdit;
