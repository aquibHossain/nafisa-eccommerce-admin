import React, { useState, useEffect } from "react";
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Typography,
    Box,
    TextField
} from "@mui/material";
import * as XLSX from "xlsx";
import axios from "axios";
import toast from "react-hot-toast";
import config from "config";

const SalesReportDashboard = () => {
    const token = localStorage.getItem("token");
    const [salesData, setSalesReport] = useState([]);
    const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);

    useEffect(() => {
        fetchSalesReportData();
    }, [startDate, endDate]);

    const fetchSalesReportData = async () => {
        try {
            const response = await axios.get(`${config?.production_url}/dashboard/sale-report`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                params: {
                    startDate,
                    endDate,
                },
            });
            setSalesReport(response.data?.data);
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        }
    };

    const downloadExcel = () => {
        if (!salesData.length) {
            toast.error("No data available to download.");
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(salesData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");
        XLSX.writeFile(workbook, "sales_report.xlsx");
    };

    return (
        <Box sx={{
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 3
        }}>
            <Container maxWidth="lg">

                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" align="center" gutterBottom>
                        📊 Sales Report
                    </Typography>
                    <Box>
                        <Button variant="contained" color="secondary" onClick={downloadExcel} style={{ color: "white" }}>
                            Download Excel
                        </Button>
                    </Box>
                </Box>

                <Box display="flex" gap={2} mb={2}>
                    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                        <Typography variant="subtitle2" mb={0.5}>
                            Start Date
                        </Typography>
                        <TextField
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                        <Typography variant="subtitle2" mb={0.5}>
                            End Date
                        </Typography>
                        <TextField
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            fullWidth
                        />
                    </Box>
                </Box>


                <TableContainer>
                    <Table stickyHeader>

                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Product</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Total Sold</TableCell>
                        </TableRow>

                        <TableBody>
                            {salesData.length > 0 ? (
                                salesData.map((row, index) => (
                                    <TableRow key={index} hover>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>{row.product}</TableCell>
                                        <TableCell>{row.totalSold}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        No sales data available.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
};

export default SalesReportDashboard;
