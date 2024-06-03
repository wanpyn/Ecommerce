import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import { MdClose, MdDelete, MdEdit } from "react-icons/md";
import EditCategoryModal from "./EditCategoryModal";
import { Button } from "@mui/material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsLeft, setProductsLeft] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewCategoryOpen, setIsNewCategoryOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.error(error.response);
    } finally {
      setIsLoading(false);
    }
  };

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
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    // Calculate the products left for each category
    const calculateProductsLeft = () => {
      const productCount = products.reduce((acc, product) => {
        acc[product.category] =
          (acc[product.category] || 0) + product.availableStock;
        return acc;
      }, {});
      setProductsLeft(productCount);
    };

    if (products.length > 0) {
      calculateProductsLeft();
    }
  }, [products]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const openModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const openNewCategory = () => {
    setIsNewCategoryOpen(true);
  };

  const closeNewCategory = () => {
    setIsNewCategoryOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleDelete = async (categoryId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/delete-category",
        { categoryId }
      );
      console.log(response.data);
      fetchCategories();
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (category.name === "" || category.description === "") {
      setToastMessage("All fields must be filled");
      handleOpen();
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/add-category",
        {
          name: category.name,
          description: category.description,
        }
      );
      console.log(response.data);
      setToastMessage(response.data.message);
      handleOpen();
      closeNewCategory();
      fetchCategories();
    } catch (error) {
      setToastMessage(error.response.data.message);
      handleOpen();
      console.error(error.response);
    } finally {
      setCategory({
        name: "",
        description: "",
      });
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Categories List</h2>
        <div className="overflow-x-auto flex flex-col items-center mx-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <th className="py-2 px-4 border-b text-left">Name</th>
                  </Grid>
                  <Grid item xs={3}>
                    <th className="py-2 px-4 border-b text-left">
                      Description
                    </th>
                  </Grid>
                  <Grid item xs={3}>
                    <th className="py-2 px-4 border-b text-left">
                      Products Left
                    </th>
                  </Grid>
                  <Grid item xs={3}>
                    <th className="py-2 px-4 border-b text-left">Created At</th>
                  </Grid>
                </Grid>
              </tr>
            </thead>
          </table>
          <div className="mb-10 w-full">
            {categories.length === 0 ? (
              <h1 className="text-center p-10">No category added</h1>
            ) : (
              categories.map((cat) => (
                <Accordion key={cat._id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-${cat._id}-content`}
                    id={`panel-${cat._id}-header`}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <Typography>{cat.name}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography>{cat.description}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography>
                          {productsLeft[cat.name] > 0
                            ? productsLeft[cat.name]
                            : "No products added"}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography>
                          {new Date(cat.createdAt).toLocaleString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box width="100%">
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            Name: {cat.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            Description: {cat.description}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            Products Left:{" "}
                            {productsLeft[cat.name] > 0
                              ? productsLeft[cat.name]
                              : "No products added"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            Created At:{" "}
                            {new Date(cat.createdAt).toLocaleString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <div className="flex flex-col items-start gap-3">
                            <Button
                              variant="contained"
                              color="info"
                              onClick={() => openModal(cat)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleDelete(cat._id)}
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
          </div>

          <Button variant="contained" color="success" onClick={openNewCategory}>
            Add New Category
          </Button>

          {isNewCategoryOpen && (
            <form
              onSubmit={handleSubmit}
              className="absolute max-w-lg w-full mx-auto p-4 my-10 bg-white shadow-md rounded-lg"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold mb-4">New Category</h2>
                <MdClose
                  className="cursor-pointer"
                  size={20}
                  onClick={closeNewCategory}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">name:</label>
                <input
                  type="text"
                  name="name"
                  value={category.name}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Description:</label>
                <textarea
                  name="description"
                  value={category.description}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>

              <button
                type="submit"
                className="w-full p-2 bg-green-500 text-white rounded mt-10"
              >
                Submit
              </button>
            </form>
          )}
          {selectedCategory && (
            <EditCategoryModal
              category={selectedCategory}
              isOpen={isModalOpen}
              onClose={closeModal}
              fetchCategories={fetchCategories}
            />
          )}
        </div>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={toastMessage}
      />
    </>
  );
};

export default AddCategory;
