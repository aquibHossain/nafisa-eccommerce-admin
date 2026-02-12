import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import config from "config";

function ExportOrders({ orders }) {
    const [selectedFields, setSelectedFields] = useState([
        "name",
        "address",
        "product",
        "quantity",
        "phone",
        "email",
        "finalAmount",
    ]);

    const exportToExcel = () => {
        if (!orders || orders.length === 0) {
            toast.error("No orders available for export.");
            return;
        }

        const formattedData = orders.map((order) => ({
            name: order?.shippingAddress?.name,
            address: order?.shippingAddress?.address,
            product: order.items
                .map((item) => {
                    const mainProductName = item?.product?.productName || "Unknown Product";
                    const variantName = item?.product?.inventory?.find(v => v._id === item?.variantId)
                        ?.productName ?? "";
                    return `${mainProductName}${variantName} (${item?.quantity})`;
                })
                .join(", "),
            quantity: order.items.reduce((sum, item) => sum + item?.quantity, 0),
            phone: order?.shippingAddress?.phone,
            email: order?.shippingAddress?.email,
            finalAmount: order?.finalAmount,
        }));

        const filteredData = formattedData.map((order) =>
            Object.fromEntries(Object.entries(order).filter(([key]) => selectedFields.includes(key)))
        );

        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

        XLSX.writeFile(workbook, "orders.xlsx");
    };

    return (
        <Button variant="contained" color="primary" style={{ color: "white" }} onClick={exportToExcel}>
            Download Excel
        </Button>
    );
}

export default ExportOrders;
