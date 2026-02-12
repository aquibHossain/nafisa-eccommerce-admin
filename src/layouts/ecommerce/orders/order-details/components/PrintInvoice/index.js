"use client"

import { useRef, useState } from "react"
import jsPDF from "jspdf"
import "jspdf-autotable"
import {
    Box,
    Typography,
    Divider,
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Container,
    Tooltip,
    Icon,
} from "@mui/material"
import "@fontsource/roboto";
import signature from "assets/images/head.png"
// Assuming you have a brand logo image
import brandLogo from "assets/images/logo-ct-dark.png"


// Payment method logos and display names
const paymentLogos = {
    cod: null,
    bkash: "https://upload.wikimedia.org/wikipedia/commons/6/6b/BKash-bKash-Logo.wine.svg",
    nagad: "https://upload.wikimedia.org/wikipedia/commons/6/69/Nagad_Logo.svg",
    rocket: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Rocket_logo.svg",
    visa: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
    mastercard: "https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg",
}

const paymentMethodDisplay = {
    cod: "Cash on Delivery",
    bkash: "bKash",
    nagad: "Nagad",
    rocket: "Rocket",
    visa: "Visa",
    mastercard: "MasterCard",
}

export default function Invoice({ order }) {
    const componentRef = useRef()

    // const handlePrint = useReactToPrint({
    //     content: () => componentRef.current,
    // })

    const [isPrinting, setIsPrinting] = useState(false)
    const invoiceRef = useRef(null)

    const handlePrint = () => {
        setIsPrinting(true)
        setTimeout(() => {
            window.print()
            setIsPrinting(false)
        }, 100)
    }
    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Add logo
        doc.addImage(brandLogo, "PNG", 14, 10, 30, 30);

        doc.setFontSize(20);
        doc.text("E-commerce Invoice", 50, 25);

        // Move invoice details below the logo
        doc.setFontSize(10);
        doc.text(`Invoice no: #${order.orderId.slice(0, 8)}`, 140, 45);
        doc.text(`Invoice date: ${new Date(order.createdAt).toLocaleDateString()}`, 140, 50);
        doc.text(`Due: ${new Date(order.createdAt).toLocaleDateString()}`, 140, 55);

        // Keep "From" section in the same position but adjust y-coordinate
        const fromStartY = 65;
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0)
        doc.text("From", 14, fromStartY);
        doc.setFontSize(10);
        doc.setTextColor(100)
        doc.text("ChargLife", 14, fromStartY + 8);
        doc.text("info@charglife.com", 14, fromStartY + 13);
        doc.text("09666747676", 14, fromStartY + 18);
        doc.text("96/1-D (3rd Floor), Kuril Bishow Road, Dhaka-1229", 14, fromStartY + 23);

        // Keep "Bill to" section in the same position but adjust y-coordinate
        const billToStartY = 65; // Align this with the "From" section
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0)
        doc.text("Bill to", 140, billToStartY);
        doc.setFontSize(10);
        doc.setTextColor(100)
        doc.text(order.shippingAddress.name, 140, billToStartY + 8);
        doc.text(order.shippingAddress.email, 140, billToStartY + 13);
        doc.text(order.shippingAddress.phone, 140, billToStartY + 18);
        doc.text(doc.splitTextToSize(order.shippingAddress.address, 60), 140, billToStartY + 23);

        // Keep "Ship to" section in the same position
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0)
        doc.text("Ship to", 140, billToStartY + 35);
        doc.setFontSize(10);
        doc.setTextColor(100)
        doc.text(`Track #: ${order.orderId}`, 140, billToStartY + 43);
        doc.text(doc.splitTextToSize(order.shippingAddress.address, 60), 140, billToStartY + 48);


        // Add table
        doc.autoTable({
            startY: billToStartY + 55,
            head: [["DESCRIPTION", "RATE", "QTY", "AMOUNT"]],
            body: order.items.map((item) => {
                const selectedVariant = item.product.inventory.find(v => v._id === item.variantId);
                return [
                    `${item.product.productName} (${selectedVariant?.productName})`,
                    item?.price,
                    item.quantity,
                    item?.price * item.quantity,
                ];
            }),
        });

        // Adjusted totals section position
        const finalY = doc.lastAutoTable.finalY + 15;
        const rightX = 140; // Right alignment X position

        // Subtotal
        doc.setFontSize(10);
        doc.text(`Subtotal:  Tk ${order.totalAmount.toFixed(2)}`, rightX, finalY + 10);

        // Coupon Applied
        const couponDiscount = order.totalAmount - order.finalAmount;
        if (couponDiscount > 0) {
            doc.text(`Coupon Applied:  -Tk ${couponDiscount.toFixed(2)}`, rightX, finalY + 20);
        }

        // Shipping Cost
        doc.text(`Shipping Cost:  Tk ${order.shipping.amount.toFixed(2)}`, rightX, finalY + 30);

        // Total Calculation
        const totalAmount = order.finalAmount;
        doc.text(`Total:  Tk ${totalAmount.toFixed(2)}`, rightX, finalY + 40);
        doc.text(`Payment: ${order.paymentMethod}`, rightX, finalY + 50);

        // Save the PDF
        doc.save("invoice.pdf");

    };




    const renderPaymentDetails = () => {
        if (order.paymentMethod === "cod") {
            return (
                <Typography variant="body1" fontWeight="medium">
                    Payment will be collected upon delivery.
                </Typography>
            )
        }

        const logo = paymentLogos[order.paymentMethod]
        const methodName = paymentMethodDisplay[order.paymentMethod] || "Unknown"
        return (
            <Box
                border="1px solid"
                borderColor="primary.main"
                borderRadius="lg"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={3}
                mt={2}
                sx={{
                    backgroundColor: "primary.light",
                    color: "primary.contrastText",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
            >
                {logo && (
                    <Box sx={{ width: "15%", mr: 2 }}>
                        <img src={logo || "/placeholder.svg"} alt={methodName} width={50} height={30} layout="responsive" />
                    </Box>
                )}
                <Typography variant="h6" fontWeight="medium">
                    {methodName}
                </Typography>
                {["visa", "mastercard"].includes(order.paymentMethod) && (
                    <Typography variant="body2" color="text.secondary">
                        **** **** **** 7852
                    </Typography>
                )}
                <Box ml="auto" lineHeight={0}>
                    <Tooltip title="We do not store card details" placement="bottom">
                        <Button variant="outlined" color="secondary" size="small" sx={{ minWidth: "auto", p: 1 }}>
                            <Icon sx={{ cursor: "pointer" }}>priority_high</Icon>
                        </Button>
                    </Tooltip>
                </Box>
            </Box>
        )
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }} className="new">
            <Box className="invoice-container">
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,

                        borderRadius: 2,
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        border: "1px solid",
                        borderColor: "grey.200",
                    }}
                >
                    {/* Header */}
                    <Grid container justifyContent="space-between" alignItems="flex-start">
                        <Grid item>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <img src={brandLogo || "/placeholder.svg"} alt="ChargLife Logo" width={60} height={60} />
                                <Typography
                                    variant="h5"
                                    sx={{ fontWeight: 700, color: "primary.main", letterSpacing: "0.5px", fontSize: "1.4rem" }}
                                >
                                    E-commerce Invoice
                                </Typography>
                            </Box>
                        </Grid>

                    </Grid>
                    <Grid container justifyContent="end" alignItems="flex-start" sx={{ mb: 2 }}>
                        <Grid item>
                            <Box sx={{ textAlign: "right" }}>
                                <Typography variant="body2">Invoice no: #{order.orderId.slice(0, 8)}</Typography>
                                <Typography variant="body2">Invoice date: {new Date(order.createdAt).toLocaleDateString()}</Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Billing Details */}
                    <Box
                        sx={{
                            backgroundColor: "grey.50",
                            borderRadius: 2,
                            p: 3,
                            mb: 4,
                            border: "1px solid",
                            borderColor: "grey.200",
                        }}
                    >
                        <Grid container spacing={6} >
                            <Grid item xs={12} md={6}>
                                <Box sx={{ mb: 4 }}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.5px" }}
                                    >
                                        From
                                    </Typography>
                                    <Typography variant="body2">ChargLife</Typography>
                                    <Typography variant="body2">info@charglife.com</Typography>
                                    <Typography variant="body2">09666747676</Typography>
                                    <Typography variant="body2">96/1-D (3rd Floor), Kuril Bishow Road, Dhaka-1229</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ mb: 4 }} flex justifyContent="end">
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.5px" }}
                                    >
                                        Bill to
                                    </Typography>
                                    <Typography variant="body2">{order.shippingAddress.name}</Typography>
                                    <Typography variant="body2">{order.shippingAddress.email}</Typography>
                                    <Typography variant="body2">{order.shippingAddress.phone}</Typography>
                                    <Typography variant="body2">{order.shippingAddress.address}</Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.5px" }}
                                    >
                                        Ship to
                                    </Typography>
                                    <Typography variant="body2">{order.shippingAddress.address}</Typography>
                                    <Typography variant="body2">Track #: {order.orderId}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Items Table */}
                    <TableContainer sx={{ mb: 6 }}>
                        <Table>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        fontWeight: 700,
                                        backgroundColor: "primary.light",
                                        color: "primary.contrastText",
                                        fontSize: "0.8rem",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    DESCRIPTION
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: 700,
                                        backgroundColor: "primary.light",
                                        color: "primary.contrastText",
                                        fontSize: "0.8rem",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    RATE
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: 700,
                                        backgroundColor: "primary.light",
                                        color: "primary.contrastText",
                                        fontSize: "0.8rem",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    QTY
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: 700,
                                        backgroundColor: "primary.light",
                                        color: "primary.contrastText",
                                        fontSize: "0.8rem",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    AMOUNT
                                </TableCell>
                            </TableRow>

                            <TableBody>
                                {order.items.map((item) => {
                                    const selectedVariant = item.product.inventory.find(v => v._id === item.variantId);
                                    return (
                                        <TableRow key={item._id}>
                                            <TableCell>{`${item.product.productName} (${selectedVariant?.productName})`}</TableCell>
                                            <TableCell>৳{item?.price}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>৳{item?.price * item.quantity}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Payment and Totals */}
                    <Grid container spacing={6} sx={{ mb: 6 }}>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.5px" }}
                                >
                                    Payment Details
                                </Typography>
                                {renderPaymentDetails()}
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ textAlign: "right" }}>
                                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 1 }}>
                                    <Typography variant="body2">Subtotal:</Typography>
                                    <Typography variant="body2"> ৳{order.totalAmount}</Typography>
                                </Box>
                                {order?.coupon && (
                                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 1 }}>
                                        <Typography variant="body2">Coupon Applied:</Typography>
                                        <Typography variant="body2">-৳{order.totalAmount - order.finalAmount}</Typography>
                                    </Box>
                                )}
                                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 1 }}>
                                    <Typography variant="body2">Shipping Cost:</Typography>
                                    <Typography variant="body2"> ৳{order.shipping.amount}</Typography>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 1 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: "1rem" }}>
                                        Total:
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: "1rem" }}>
                                        ৳{order.finalAmount}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Signature */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <img src={brandLogo} alt="Signature" width={128} height={64} />
                    </Box>
                </Paper>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}>
                <Button
                    variant="contained"
                    onClick={handlePrint}
                    startIcon={<Icon>print</Icon>}
                    sx={{ fontWeight: 600, textTransform: "none", color: "white" }}
                >
                    Print Invoice
                </Button>
                <Button
                    variant="primary"
                    onClick={handleDownloadPDF}
                    startIcon={<Icon>download</Icon>}
                    sx={{ fontWeight: 600, textTransform: "none", color: "black" }}
                >
                    Download PDF
                </Button>
            </Box>
        </Container>
    )
}

