import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CreateProductForm from "./components/CreateProductForm";
import CustomerTable from "./components/CustomerTable";
import OrderTable from "./components/OrderTable";
import ProductsTable from "./components/ProductsTable";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import AddSubCategory from "./components/CreateSubCategory";
import AddCategory from "./components/CreateCategory";
import SalesTable from "./components/SalesTable";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { RiBillLine } from "react-icons/ri";
import { MdOutlinePointOfSale } from "react-icons/md";
import { TbCategoryMinus } from "react-icons/tb";
import { TbCategoryPlus } from "react-icons/tb";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import AddDiscountCode from "./components/CreateDiscountCode";

const menu = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <RxDashboard fontSize={25} color="#000" />,
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: <MdOutlineProductionQuantityLimits fontSize={25} color="#000" />,
  },
  {
    name: "Customers",
    path: "/admin/customers",
    icon: <CiUser fontSize={25} color="#000" />,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: <RiBillLine fontSize={25} color="#000" />,
  },
  {
    name: "Sales",
    path: "/admin/sales",
    icon: <MdOutlinePointOfSale fontSize={25} color="#000" />,
  },
  {
    name: "Add Category",
    path: "/admin/category",
    icon: <TbCategoryMinus fontSize={25} color="#000" />,
  },
  {
    name: "Add Sub Category",
    path: "/admin/subCategory",
    icon: <TbCategoryPlus fontSize={25} color="#000" />,
  },
  {
    name: "Add Discount Code",
    path: "/admin/discount",
    icon: <TbCategoryPlus fontSize={25} color="#000" />,
  },
  {
    name: "Add Products",
    path: "/admin/create",
    icon: <MdOutlineAddShoppingCart fontSize={25} color="#000" />,
  },
];

function Admin() {
  const navigate = useNavigate();
  const theme = useTheme();
  const token = localStorage.getItem("token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    try {
      console.log("Email:", email);
      console.log("Password:", password);
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      console.log(response.data);
      setToastMessage("Login Successful");
      handleOpen();
      localStorage.setItem("token", response.data.token);
      window.location.reload();
    } catch (error) {
      handleOpen();
      setToastMessage(error.response.data.message);
      console.error(error.response);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        borderRightWidth: "0.5px",
        borderRightColor: "#eee",
        position: "fixed",
        width: "16%",
      }}
    >
      <List>
        {menu.map((item, index) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => navigate(item.path)}
            style={{ cursor: "pointer" }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>
              <span className="font-bold">{item.name}</span>
            </ListItemText>
          </ListItem>
        ))}
      </List>

      <List>
        <ListItem disablePadding>
          <ListItemIcon>
            <CiLogout fontSize={25} color="#000" />
          </ListItemIcon>
          <ListItemText className="cursor-pointer" onClick={logout}>
            <span className="font-bold">Logout</span>
          </ListItemText>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {token === null ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
            <h1 className="text-4xl font-bold text-center mb-6">ShopOn</h1>
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex h-[100vh]">
          <div className="fixed h-full w-[16%] pl-5">{drawer}</div>

          <div className="w-[84%] ml-[16%]">
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/products" element={<ProductsTable />}></Route>
              <Route path="/customers" element={<CustomerTable />}></Route>
              <Route path="/orders" element={<OrderTable />}></Route>
              <Route path="/sales" element={<SalesTable />}></Route>
              <Route path="/category" element={<AddCategory />}></Route>
              <Route path="/subCategory" element={<AddSubCategory />}></Route>
              <Route path="/create" element={<CreateProductForm />}></Route>
              <Route path="/discount" element={<AddDiscountCode />}></Route>
            </Routes>
          </div>
        </div>
      )}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={toastMessage}
      />
    </div>
  );
}

export default Admin;
