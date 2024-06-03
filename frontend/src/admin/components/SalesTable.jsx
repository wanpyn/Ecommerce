import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as XLSX from "xlsx";
import { subDays, subMonths, isSameDay, isSameMonth, parseISO } from "date-fns";

function SalesTable() {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDiscountAmount, setTotalDiscountAmount] = useState(0);
  const [monthlySales, setMonthlySales] = useState(0);
  const [dailySales, setDailySales] = useState(0);
  const [grossProfit, setGrossProfit] = useState(0);
  const [netProfit, setNetProfit] = useState(0);

  const fetchSales = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/sales");
      console.log("sales: ", response.data);
      setSales(response.data);
    } catch (error) {
      console.error(error.response);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  useEffect(() => {
    calculateTotals();
    calculateStatistics();
  }, [sales]);

  const calculateTotals = () => {
    const total = sales.reduce((acc, sale) => acc + sale.totalAmount, 0);
    const totalDiscount = sales.reduce(
      (acc, sale) => acc + (sale.discountAmount || 0),
      0
    );

    setTotalAmount(total);
    setTotalDiscountAmount(totalDiscount);
  };

  const calculateStatistics = () => {
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();

    const monthlySales = sales
      .filter((sale) => new Date(sale.createdAt).getMonth() === currentMonth)
      .reduce((acc, sale) => acc + sale.totalAmount, 0);

    const dailySales = sales
      .filter((sale) => new Date(sale.createdAt).getDate() === currentDay)
      .reduce((acc, sale) => acc + sale.totalAmount, 0);

    const grossProfit = sales.reduce((acc, sale) => {
      return (
        acc +
        sale.productIDs.reduce(
          (prodAcc, prod) => prodAcc + prod.sellingPrice * prod.quantitySold,
          0
        )
      );
    }, 0);

    const netProfit = grossProfit - totalDiscountAmount;

    setMonthlySales(monthlySales);
    setDailySales(dailySales);
    setGrossProfit(grossProfit);
    setNetProfit(netProfit);
  };

  const handleExportData1 = () => {
    // Calculate statistics
    const lifetimeSales = sales.reduce(
      (sum, sale) => sum + sale.totalAmount,
      0
    );
    const lifetimeDiscounts = sales.reduce(
      (sum, sale) => sum + (sale.discountAmount || 0),
      0
    );

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const day = today.getDate();

    const monthlySales = sales
      .filter(
        (sale) =>
          new Date(sale.createdAt).getMonth() === month &&
          new Date(sale.createdAt).getFullYear() === year
      )
      .reduce((sum, sale) => sum + sale.totalAmount, 0);

    const dailySales = sales
      .filter(
        (sale) =>
          new Date(sale.createdAt).getDate() === day &&
          new Date(sale.createdAt).getMonth() === month &&
          new Date(sale.createdAt).getFullYear() === year
      )
      .reduce((sum, sale) => sum + sale.totalAmount, 0);

    const grossProfit = sales.reduce((sum, sale) => {
      return (
        sum +
        sale.productIDs.reduce((productSum, product) => {
          return (
            productSum +
            (product.sellingPrice - product.manufacturingPrice) *
              product.quantitySold
          );
        }, 0)
      );
    }, 0);

    const netProfit = sales.reduce((sum, sale) => {
      return (
        sum +
        sale.productIDs.reduce((productSum, product) => {
          return (
            productSum +
            (product.discountingPrice - product.manufacturingPrice) *
              product.quantitySold
          );
        }, 0)
      );
    }, 0);

    // Prepare data for Excel
    const worksheetData = sales.map((sale) => ({
      "Order ID": sale.orderID,
      "Total Amount": sale.totalAmount,
      "Discount Code": sale.discountCode || "N/A",
      "Discount Amount": sale.discountAmount || 0,
      "Created At": new Date(sale.createdAt).toLocaleString(),
      Products: sale.productIDs
        .map((p) => `${p.productID} (Qty: ${p.quantitySold})`)
        .join(", "),
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Data");

    // Append statistics
    XLSX.utils.sheet_add_json(
      worksheet,
      [
        {},
        { "Order ID": "Statistics" },
        { "Order ID": "Lifetime Sales", "Total Amount": lifetimeSales },
        { "Order ID": "Lifetime Discounts", "Total Amount": lifetimeDiscounts },
        { "Order ID": "Monthly Sales", "Total Amount": monthlySales },
        { "Order ID": "Daily Sales", "Total Amount": dailySales },
        { "Order ID": "Gross Profit", "Total Amount": grossProfit },
        { "Order ID": "Net Profit", "Total Amount": netProfit },
      ],
      { skipHeader: true, origin: -1 }
    );

    // Export to Excel
    XLSX.writeFile(workbook, "sales.xlsx");
  };

  const calculateStats = (sales) => {
    let lifetimeSales = 0;
    let lifetimeDiscounts = 0;
    let monthlySales = 0;
    let dailySales = 0;
    let grossProfit = 0;
    let netProfit = 0;

    const today = new Date();
    const startOfMonth = subMonths(today, 1);
    const startOfDay = subDays(today, 1);

    sales.forEach((sale) => {
      lifetimeSales += sale.totalAmount;
      if (sale.discountAmount) {
        lifetimeDiscounts += sale.discountAmount;
      }

      if (isSameMonth(parseISO(sale.createdAt), startOfMonth)) {
        monthlySales += sale.totalAmount;
      }

      if (isSameDay(parseISO(sale.createdAt), startOfDay)) {
        dailySales += sale.totalAmount;
      }

      sale.productIDs.forEach((product) => {
        const sellingPriceTotal = product.sellingPrice * product.quantitySold;
        const manufacturingPriceTotal =
          product.manufacturingPrice * product.quantitySold;
        grossProfit += sellingPriceTotal - manufacturingPriceTotal;
        netProfit +=
          product.discountingPrice * product.quantitySold -
          manufacturingPriceTotal;
      });
    });

    return {
      lifetimeSales,
      lifetimeDiscounts,
      monthlySales,
      dailySales,
      grossProfit,
      netProfit,
    };
  };

  const handleExportData2 = () => {
    const stats = calculateStats(sales);

    // Format the data for Excel
    const formattedData = sales
      .map((sale) => {
        return sale.productIDs.map((product) => ({
          orderID: sale.orderID,
          productID: product.productID,
          quantitySold: product.quantitySold,
          manufacturingPrice: product.manufacturingPrice,
          sellingPrice: product.sellingPrice,
          discountingPrice: product.discountingPrice,
          totalAmount: sale.totalAmount,
          discountCode: sale.discountCode,
          discountAmount: sale.discountAmount,
          createdAt: sale.createdAt,
          updatedAt: sale.updatedAt,
        }));
      })
      .flat();

    // Convert the data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Add statistics to the worksheet
    const sal = [
      ["Lifetime Sales", stats.lifetimeSales],
      ["Lifetime Discounts", stats.lifetimeDiscounts],
      ["Monthly Sales", stats.monthlySales],
      ["Daily Sales", stats.dailySales],
      ["Gross Profit", stats.grossProfit],
      ["Net Profit", stats.netProfit],
    ];
    XLSX.utils.sheet_add_aoa(worksheet, sal, { origin: -1 });

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Data");

    // Export the workbook
    XLSX.writeFile(workbook, "sales.xlsx");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Sales List</h2>
        <Button variant="contained" onClick={handleExportData2}>
          Export Data
        </Button>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Sales Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h4 className="font-bold">Monthly Sales</h4>
            <p>₹{monthlySales}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h4 className="font-bold">Daily Sales</h4>
            <p>₹{dailySales}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h4 className="font-bold">Gross Profit</h4>
            <p>₹{grossProfit}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h4 className="font-bold">Net Profit</h4>
            <p>₹{netProfit}</p>
          </div>
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200 mt-5">
        <thead>
          <tr className="bg-gray-100">
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <th className="py-2 px-4 border-b text-left"> OrderID</th>
              </Grid>
              <Grid item xs={2}>
                <th className="py-2 px-4 border-b text-left">Products</th>
              </Grid>
              <Grid item xs={2}>
                <th className="py-2 px-4 border-b text-left">Total Amount</th>
              </Grid>
              <Grid item xs={2}>
                <th className="py-2 px-4 border-b text-left">
                  Discount Amount
                </th>
              </Grid>
              <Grid item xs={3}>
                <th className="py-2 px-4 border-b text-left">Created At</th>
              </Grid>
            </Grid>
          </tr>
        </thead>
      </table>
      {sales.length === 0 ? (
        <h1 className="text-center p-10">No sales added</h1>
      ) : (
        sales.map((sale) => (
          <Accordion key={sale._id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id={`panel-${sale._id}`}
            >
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography>Order ID: {sale.orderID}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>Products: {sale.productIDs.length}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>Total Amount: ₹{sale.totalAmount}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>
                    Discount Amount: ₹{sale.discountAmount || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>
                    Created At: {new Date(sale.createdAt).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                {sale.productIDs.map((product) => (
                  <Box key={product._id} mb={2}>
                    <Typography>Product ID: {product.productID}</Typography>
                    <Typography>
                      Quantity Sold: {product.quantitySold}
                    </Typography>
                    <Typography>
                      Manufacturing Price: ${product.manufacturingPrice}
                    </Typography>
                    <Typography>
                      Selling Price: ${product.sellingPrice}
                    </Typography>
                    <Typography>
                      Discounting Price: ${product.discountingPrice}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </div>
  );
}

export default SalesTable;
