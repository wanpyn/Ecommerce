import { useEffect, useRef, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import { MdClose, MdDelete, MdEdit } from "react-icons/md";
import EditSubCategoryModal from "./EditSubCategoryModal";
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

const CreateProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [isNewCategoryOpen, setIsNewCategoryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [subCategory, setSubCategory] = useState({
    name: "",
    category: "",
    description: "",
  });

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.error(error.response);
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

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    setIsLoading(false);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const openModal = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubCategory(null);
  };

  const openNewCategory = () => {
    setIsNewCategoryOpen(true);
  };

  const closeNewCategory = () => {
    setIsNewCategoryOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategory({ ...subCategory, [name]: value });
  };

  const handleDelete = async (subCategoryId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/delete-subcategory",
        { subCategoryId }
      );
      console.log(response.data);
      fetchSubCategories();
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      subCategory.name === "" ||
      subCategory.category === "" ||
      subCategory.description === ""
    ) {
      setToastMessage("All fields must be filled");
      handleOpen();
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/add-subcategory",
        {
          name: subCategory.name,
          category: subCategory.category,
          description: subCategory.description,
        }
      );
      console.log(response.data);
      setToastMessage(response.data.message);
      handleOpen();
      closeNewCategory();
      fetchSubCategories();
    } catch (error) {
      setToastMessage(error.response.data.message);
      handleOpen();
      console.error(error.response);
    } finally {
      setSubCategory({
        name: "",
        category: "",
        description: "",
      });
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Sub Categories List</h2>
        <div className="overflow-x-auto flex flex-col items-center mx-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <th className="py-2 px-4 border-b text-left">Name</th>
                  </Grid>
                  <Grid item xs={4}>
                    <th className="py-2 px-4 border-b text-left">
                      Description
                    </th>
                  </Grid>
                  <Grid item xs={4}>
                    <th className="py-2 px-4 border-b text-left">Created At</th>
                  </Grid>
                </Grid>
              </tr>
            </thead>
          </table>

          <div className="mb-10 w-full">
            {subCategories.length === 0 ? (
              <h1 className="text-center p-10">No sub category added</h1>
            ) : (
              subCategories.map((subCat) => (
                <Accordion key={subCat._id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-${subCat._id}-content`}
                    id={`panel-${subCat._id}-header`}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Typography>{subCat.name}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography>{subCat.description}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography>
                          {new Date(subCat.createdAt).toLocaleString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box width="100%">
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            Name: {subCat.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            Description: {subCat.description}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            Created At:{" "}
                            {new Date(subCat.createdAt).toLocaleString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <div className="flex flex-col items-start gap-3">
                            <Button
                              variant="contained"
                              color="info"
                              onClick={() => openModal(subCat)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleDelete(subCat._id)}
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
            Add New Sub Category
          </Button>

          {isNewCategoryOpen && (
            <form
              onSubmit={handleSubmit}
              className="absolute max-w-lg w-full mx-auto p-4 my-10 bg-white shadow-md rounded-lg"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold mb-4">New Sub Category</h2>
                <MdClose
                  className="cursor-pointer"
                  size={20}
                  onClick={closeNewCategory}
                />
              </div>

              <div className="flex gap-2 my-5">
                <label className="block text-gray-700">Category:</label>
                <select
                  name="category"
                  value={subCategory.category}
                  onChange={handleChange}
                  className="border rounded p-2"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Name:</label>
                <input
                  name="name"
                  value={subCategory.name}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Description:</label>
                <textarea
                  name="description"
                  value={subCategory.description}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>

              <button
                type="submit"
                className="w-full p-2 bg-green-500 text-white rounded"
              >
                Submit
              </button>
            </form>
          )}
          {selectedSubCategory && (
            <EditSubCategoryModal
              subCategory={selectedSubCategory}
              isOpen={isModalOpen}
              onClose={closeModal}
              fetchSubCategories={fetchSubCategories}
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

export default CreateProductForm;
