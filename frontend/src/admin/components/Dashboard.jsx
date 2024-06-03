import { useEffect, useState } from "react";
import { dummyUsers } from "../../data/dummyUser";
import { dummyOrders } from "../../data/dummyOrders";
import axios from "axios";

const UsersTable = ({ users }) => {
  // Calculate total number of users
  const totalUsers = users.length;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-bold bg-gray-200 px-4 py-2">
        Total Customers
      </h2>
      <div className="p-6">
        <p className="text-lg font-semibold">Total Users: {totalUsers}</p>
      </div>
    </div>
  );
};

const ProductsTable = ({ products }) => {
  // Calculate total number of products
  const totalProducts = products.length;
  console.log("prods: ", products);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-bold bg-gray-200 px-4 py-2">
        Total Products
      </h2>
      <div className="p-6">
        <p className="text-lg font-semibold">Total Products: {totalProducts}</p>
      </div>
    </div>
  );
};

const OrdersTable = ({ orders }) => {
  // Calculate total number of orders
  const totalOrders = orders.length;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-bold bg-gray-200 px-4 py-2">Total Orders</h2>
      <div className="p-6">
        <p className="text-lg font-semibold">Total Orders: {totalOrders}</p>
      </div>
    </div>
  );
};

const CategoriesTable = ({ orders }) => {
  // Calculate total number of orders
  const totalCategories = orders.length;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-bold bg-gray-200 px-4 py-2">
        Total Categories
      </h2>
      <div className="p-6">
        <p className="text-lg font-semibold">
          Total Categories: {totalCategories}
        </p>
      </div>
    </div>
  );
};

const SubCategoriesTable = ({ orders }) => {
  // Calculate total number of orders
  const totalOrders = orders.length;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-bold bg-gray-200 px-4 py-2">
        Total Sub Categories
      </h2>
      <div className="p-6">
        <p className="text-lg font-semibold">
          Total Sub Categories: {totalOrders}
        </p>
      </div>
    </div>
  );
};

const SalesTable = ({ orders }) => {
  // Calculate total number of orders
  const totalSales = orders.length;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-bold bg-gray-200 px-4 py-2">Total Sales</h2>
      <div className="p-6">
        <p className="text-lg font-semibold">Total Sales: {totalSales}</p>
      </div>
    </div>
  );
};

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/customers");
      // console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      console.log("cats: ", response.data);
      setCategories(response.data);
    } catch (error) {
      console.error(error.response);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/subcategories"
      );
      console.log(response.data);
      setSubCategories(response.data);
    } catch (error) {
      console.error(error.response);
    }
  };

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
    fetchUsers();
    fetchProducts();
    fetchOrders();
    fetchCategories();
    fetchSubCategories();
    fetchCategories();
    fetchSales();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center h-screen">
        <div className="container mx-auto p-4 grid grid-cols-3 gap-4">
          <div className="max-w-md mb-8">
            <UsersTable users={users} />
          </div>
          <div className="max-w-md mb-8">
            <ProductsTable products={products} />
          </div>
          <div className="max-w-md mb-8">
            <OrdersTable orders={orders} />
          </div>
          <div className="max-w-md mb-8">
            <CategoriesTable orders={categories} />
          </div>
          <div className="max-w-md mb-8">
            <SubCategoriesTable orders={subCategories} />
          </div>
          <div className="max-w-md mb-8">
            <SalesTable orders={sales} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
