import { useEffect, useRef, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";

const CreateProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [product, setProduct] = useState({
    title: "",
    description: "",
    manufacturingPrice: 0,
    sellingPrice: 0,
    discountingPrice: 0,
    categoryId: "",
    category: "",
    subCategoryId: "",
    subCategory: "",
    totalStock: 1,
    sku: "",
    brand: "",
  });
  const [file, setFile] = useState("");
  const imgRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = categories.find(
      (category) => category.name === event.target.value
    );
    if (selectedCategory) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        categoryId: selectedCategory._id,
        category: selectedCategory.name,
        subCategoryId: "",
        subCategory: "",
      }));

      const filteredSubs = subCategories.filter(
        (subCategory) => subCategory.category === selectedCategory._id
      );
      setFilteredSubCategories(filteredSubs);
    }
  };

  const handleSubCategoryChange = (event) => {
    const selectedSubCategory = filteredSubCategories.find(
      (subCategory) => subCategory.name === event.target.value
    );
    if (selectedSubCategory) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        subCategoryId: selectedSubCategory._id,
        subCategory: selectedSubCategory.name,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      product.title === "" ||
      product.description === "" ||
      product.manufacturingPrice === "" ||
      product.sellingPrice === "" ||
      product.discountingPrice === "" ||
      product.categoryId === "" ||
      product.category === "" ||
      product.subCategoryId === "" ||
      product.subCategory === "" ||
      product.totalStock === "" ||
      product.sku === "" ||
      product.brand === ""
    ) {
      setToastMessage("All fields must be filled");
      handleOpen();
      return;
    }

    if (file === "") {
      setToastMessage("Image not found");
      handleOpen();
      return;
    }

    var manufacturingPrice = Number(product.manufacturingPrice);
    if (!manufacturingPrice > 0) {
      setToastMessage("Manufacturing Price can not be 0");
      handleOpen();
      return;
    }

    var sellingPrice = Number(product.sellingPrice);
    if (!sellingPrice > 0) {
      setToastMessage("Selling Price can not be 0");
      handleOpen();
      return;
    }

    var discountingPrice = Number(product.discountingPrice);
    if (!discountingPrice > 0) {
      setToastMessage("Discounting Price can not be 0");
      handleOpen();
      return;
    }

    var totalStock = Number(product.totalStock);
    if (!totalStock > 0) {
      setToastMessage("Total Stock can not be 0");
      handleOpen();
      return;
    }

    console.log("product: ", product);
    // Handle form submission, e.g., send data to the server
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("manufacturingPrice", product.manufacturingPrice);
    formData.append("sellingPrice", product.sellingPrice);
    formData.append("discountingPrice", product.discountingPrice);
    formData.append("categoryId", product.categoryId);
    formData.append("category", product.category);
    formData.append("subCategory", product.subCategory);
    formData.append("subCategoryId", product.subCategoryId);
    formData.append("totalStock", product.totalStock);
    formData.append("sku", product.sku);
    formData.append("brand", product.brand);
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/add-product",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response.data);
      setToastMessage(response.data.message);
      handleOpen();
    } catch (error) {
      setToastMessage(error.response.data.message);
      handleOpen();
      console.error(error.response);
    } finally {
      setFile("");
      setProduct({
        title: "",
        description: "",
        manufacturingPrice: 0,
        sellingPrice: 0,
        discountingPrice: 0,
        category: "",
        subCategory: "",
        totalStock: 0,
        sku: "",
        brand: "",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-4 my-10 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Add a New Product</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Manufacturing Price:</label>
          <input
            type="number"
            name="manufacturingPrice"
            value={product.manufacturingPrice}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Selling Price:</label>
          <input
            type="number"
            name="sellingPrice"
            value={product.sellingPrice}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Discounting Price:</label>
          <input
            type="number"
            name="discountingPrice"
            value={product.discountingPrice}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="flex gap-2 my-5">
          <label className="block text-gray-700">Category:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleCategoryChange}
            className="border rounded p-2"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 my-5">
          <label className="block text-gray-700">Sub Category:</label>
          <select
            name="subCategory"
            value={product.subCategory}
            onChange={handleSubCategoryChange}
            className="border rounded p-2"
            disabled={!product.categoryId} // Disable the sub-category select if no category is selected
          >
            <option value="" disabled>
              Select a sub category
            </option>
            {filteredSubCategories.map((subCategory) => (
              <option key={subCategory._id} value={subCategory.name}>
                {subCategory.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Total Stock:</label>
          <input
            type="number"
            name="totalStock"
            value={product.totalStock}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        {/* <div className="mb-4">
          <label className="block text-gray-700">Available Stock:</label>
          <input
            type="number"
            name="availableStock"
            value={product.availableStock}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 p-2 w-full border rounded"
          />
        </div> */}

        <div className="mb-4">
          <label className="block text-gray-700">SKU:</label>
          <input
            type="text"
            name="sku"
            value={product.sku}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Brand:</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Image:</label>
          <input
            type="file"
            hidden
            ref={imgRef}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            type="button"
            onClick={() => imgRef.current.click()}
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            Select product image
          </button>
          <p style={{ textAlign: "center" }}>
            {file ? file.name : "Pick an image"}
          </p>
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded"
        >
          Submit
        </button>
      </form>
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
