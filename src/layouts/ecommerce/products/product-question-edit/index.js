import axios from "axios";
import config from "config";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
    Grid,
    Typography,
    FormControl,
    MenuItem,
    Select,
    TextareaAutosize,
    Button,
} from "@mui/material";
import toast from "react-hot-toast";

function ProductQuestionEdit({ data, handleCloseModal, fetchProducts }) {
    const [formData, setFormData] = useState({
        question: data?.question,
        answer: data?.answer,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.dismiss();

        if (!formData.question.trim()) {
            toast.error("Please enter a question.");
            return;
        }
        if (!formData.answer.trim()) {
            toast.error("Please enter a answer.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("You are not authorized. Please log in.");
            return;
        }

        try {
            await fetch(
                `${config.production_url}/item/product/faq/admin/${data.productId}/${data?._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ question: formData.question, answer: formData.answer }),
                }
            );

            toast.success("updated successfully!");
            fetchProducts();
            handleCloseModal();
        } catch (err) {
            console.error("Error:", err);
            toast.error("Failed to update.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="caption" fontWeight="bold" mb={1} display="block">
                        Question
                    </Typography>
                    <TextareaAutosize
                        style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                        minRows={10}
                        placeholder="Enter your answer here..."
                        value={formData.question || ""}
                        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="caption" fontWeight="bold" mb={1} display="block">
                        Answer
                    </Typography>
                    <TextareaAutosize
                        style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                        minRows={10}
                        placeholder="Enter your answer here..."
                        value={formData.answer || ""}
                        onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Update
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

ProductQuestionEdit.propTypes = {
    data: PropTypes.object.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    fetchProducts: PropTypes.func.isRequired,
};

export default ProductQuestionEdit;
