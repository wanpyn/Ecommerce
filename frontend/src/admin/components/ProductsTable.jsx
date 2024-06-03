import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditProductModal from "./EditProductModal";
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

function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (productId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/delete-product",
        { productId }
      );
      console.log(response.data);
      fetchProducts();
    } catch (error) {
      console.error(error.response);
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const saveProduct = () => {
    fetchProducts();
    // handleEdit(editedProduct);
  };

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Product List</h2>
        <input
          type="text"
          placeholder="Search product"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <th className="py-2 px-4 border-b text-left">Title</th>
                </Grid>
                <Grid item xs={2.75}>
                  <th className="py-2 px-4 border-b text-left">Description</th>
                </Grid>
                <Grid item xs={1}>
                  <th className="py-2 px-4 border-b text-left">Category</th>
                </Grid>
                <Grid item xs={2}>
                  <th className="py-2 px-4 border-b text-left">Sub-Category</th>
                </Grid>
                <Grid item xs={2}>
                  <th className="py-2 px-4 border-b text-left">Brand</th>
                </Grid>
                <Grid item xs={2}>
                  <th className="py-2 px-4 border-b text-left">Created At</th>
                </Grid>
              </Grid>
            </tr>
          </thead>
        </table>
        {filteredProducts.length === 0 ? (
          <h1 className="text-center p-10">No Products added</h1>
        ) : (
          filteredProducts.map((product) => (
            <Accordion key={product._id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${product._id}-content`}
                id={`panel-${product._id}-header`}
              >
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <Typography>{product.title}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>{product.description}</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>{product.category}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>{product.subCategory}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>{product.brand}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>
                      {new Date(product.createdAt).toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Box width="100%">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        Product ID: {product._id}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        Title: {product.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        Description: {product.description}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        Manufacturing Price: ₹{product.manufacturingPrice}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        Selling Price: ₹{product.sellingPrice}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        Discounting Price: ₹{product.discountingPrice}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        Category: {product.category}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        Sub-Category: {product.subCategory}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        Total Stock: {product.totalStock}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        Available Stock: {product.availableStock}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        SKU: {product.sku}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        Brand: {product.brand}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="flex flex-wrap">
                        <FaImage
                          size={50}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            window.open(
                              `http://localhost:5000/uploads/${product.image}`,
                              "_blank",
                              "noreferrer"
                            );
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="flex flex-col items-start gap-3">
                        <Button
                          variant="contained"
                          color="info"
                          onClick={() => openModal(product)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(product._id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))
        )}

        {selectedProduct && (
          <EditProductModal
            product={selectedProduct}
            isOpen={isModalOpen}
            onClose={closeModal}
            onSave={saveProduct}
            fetchProducts={fetchProducts}
          />
        )}
      </div>
    </div>
  );
}

export default ProductsTable;
