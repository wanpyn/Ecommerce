import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid,
  IconButton,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error(error.response);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      console.error(error.response);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (id, orderStatus) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/update-order",
        {
          id,
          orderStatus,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error.response);
    } finally {
      setIsLoading(false);
      fetchOrders();
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const handleStatusToggle = (index) => {
    const updatedOrder = { ...orders[index] };
    const statusShipped = "Shipped";
    const statusDelivered = "Delivered";
    const statusProcessing = "Processing";
    switch (updatedOrder.orderStatus) {
      case "Processing":
        updatedOrder.orderStatus = statusShipped;
        updateOrderStatus(updatedOrder._id, statusShipped);
        break;
      case "Shipped":
        updatedOrder.orderStatus = statusDelivered;
        updateOrderStatus(updatedOrder._id, statusDelivered);
        break;
      case "Delivered":
        updatedOrder.orderStatus = statusProcessing;
        updateOrderStatus(updatedOrder._id, statusProcessing);
        break;
      default:
        updatedOrder.orderStatus = "Processing";
    }
    const newOrders = [...orders];
    newOrders[index] = updatedOrder;
    setOrders(newOrders);
  };
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Orders List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <Grid container spacing={2}>
                <Grid item xs={2.5}>
                  <th className="py-2 px-4 border-b text-left">Order Id</th>
                </Grid>
                <Grid item xs={2}>
                  <th className="py-2 px-4 border-b text-left">Total Amount</th>
                </Grid>
                <Grid item xs={2}>
                  <th className="py-2 px-4 border-b text-left">
                    Discounted Amount
                  </th>
                </Grid>
                <Grid item xs={2}>
                  <th className="py-2 px-4 border-b text-left">Order Status</th>
                </Grid>
                <Grid item xs={2}>
                  <th className="py-2 px-4 border-b text-left">Order Date</th>
                </Grid>
              </Grid>
            </tr>
          </thead>
        </table>
        <div>
          {orders.length === 0 ? (
            <h1 className="text-center p-10">No orders added</h1>
          ) : (
            orders.map((order, index) => (
              <Accordion key={order._id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-${order._id}-content`}
                  id={`panel-${order._id}-header`}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Typography>{order._id}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography>₹{order.totalAmount}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography>₹{order.discountAmount || "N/A"}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography>{order.orderStatus}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography>
                        {new Date(order.createdAt).toLocaleString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Box width="100%">
                    <Grid container spacing={2} className="mb-5">
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          Customer: {order.customer}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          Shipping Address: {order.shippingAddress}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          Order Status:{" "}
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleStatusToggle(index)}
                          >
                            {order.orderStatus}
                          </button>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          Order Date: {order.orderDate}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          Delivery Date: {order.deliveryDate}
                        </Typography>
                      </Grid>
                    </Grid>

                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Product Id</TableCell>
                            <TableCell>Quantity</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {order.products.map((product) => (
                            <TableRow key={product._id}>
                              <TableCell>{product._id}</TableCell>
                              <TableCell>{product.quantity}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderTable;
