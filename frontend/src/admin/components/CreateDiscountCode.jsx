import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { Button } from "@mui/material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddDiscountCode = () => {
  const [discountCodes, setDiscountCodes] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState(null);
  const [productsLeft, setProductsLeft] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [discountCode, setDiscountCode] = useState({
    code: "",
    description: "",
    discountType: "",
    discountValue: "",
    usageLimit: "",
  });
  const [expiryDate, setExpiryDate] = useState(new Date());

  const fetchDiscountCodes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/discount-codes"
      );
      console.log(response.data);
      setDiscountCodes(response.data);
    } catch (error) {
      console.error(error.response);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscountCodes();
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiscountCode({ ...discountCode, [name]: value });
  };

  const handleDateChange = (date) => {
    setExpiryDate(date);
  };

  const handleDelete = async (discountCodeId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/delete-discount-code",
        { discountCodeId }
      );
      console.log(response.data);
      fetchDiscountCodes();
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      discountCode.code === "" ||
      discountCode.description === "" ||
      discountCode.discountType === "" ||
      discountCode.discountValue === "" ||
      expiryDate === "" ||
      discountCode.usageLimit === ""
    ) {
      setToastMessage("All fields must be filled");
      handleOpen();
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/add-discount-code",
        {
          code: discountCode.code,
          description: discountCode.description,
          discountType: discountCode.discountType,
          discountValue: discountCode.discountValue,
          expiryDate: expiryDate,
          usageLimit: discountCode.usageLimit,
        }
      );
      console.log(response.data);
      setToastMessage(response.data.message);
      handleOpen();
      closeModal();
      fetchDiscountCodes();
    } catch (error) {
      setToastMessage(error.response.data.message);
      handleOpen();
      console.error(error.response);
    } finally {
      setDiscountCode({
        code: "",
        description: "",
        discountType: "",
        discountValue: "",
        usageLimit: "",
      });
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Discount Code List</h2>
        <div className="overflow-x-auto flex flex-col items-center mx-auto ">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <th className="py-2 px-4 border-b text-left">Name</th>
                  </Grid>
                  <Grid item xs={2}>
                    <th className="py-2 px-4 border-b text-left">Type</th>
                  </Grid>
                  <Grid item xs={2}>
                    <th className="py-2 px-4 border-b text-left">Value</th>
                  </Grid>
                  <Grid item xs={2}>
                    <th className="py-2 px-4 border-b text-left">Active</th>
                  </Grid>
                  <Grid item xs={2}>
                    <th className="py-2 px-4 border-b text-left">Created At</th>
                  </Grid>
                </Grid>
              </tr>
            </thead>
          </table>
          <div className="mb-10">
            {discountCodes.length === 0 ? (
              <h1 className="text-center p-10">No discount code added</h1>
            ) : (
              discountCodes.map((code) => (
                <Accordion key={code._id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-${code._id}-content`}
                    id={`panel-${code._id}-header`}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        <Typography>{code.code}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography>{code.discountType}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography>{code.discountValue}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography>{code.isActive ? "Yes" : "No"}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography>
                          {new Date(code.createdAt).toLocaleString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box width="100%">
                      <Grid container spacing={2} className="px-10 py-2">
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            Name: {code.code}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            Description: {code.description}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            Type: {code.discountType}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            Value: {code.discountValue}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            Expiry Date:{" "}
                            {new Date(code.expiryDate).toLocaleDateString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            Active: {code.isActive ? "Yes" : "No"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            Usage Limit: {code.usageLimit}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            Usage Count: {code.usageCount}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            Created At:{" "}
                            {new Date(code.createdAt).toLocaleString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Box display="flex">
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleDelete(code._id)}
                            >
                              Remove
                            </Button>
                            {/* <IconButton onClick={() => openModal(code)}>
                      <MdEdit />
                    </IconButton> */}
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))
            )}
          </div>

          <Button variant="contained" color="success" onClick={openModal}>
            Add Discount Code
          </Button>

          {isModalOpen && (
            <form
              onSubmit={handleSubmit}
              className="absolute max-w-lg w-full mx-auto p-4 my-10 bg-white shadow-md rounded-lg"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold mb-4">New Discount Code</h2>
                <MdClose
                  className="cursor-pointer"
                  size={20}
                  onClick={closeModal}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Code:</label>
                <input
                  type="text"
                  name="code"
                  value={discountCode.code}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Description:</label>
                <textarea
                  name="description"
                  value={discountCode.description}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>

              <div className="flex gap-2 my-5">
                <label className="block text-gray-700">Discount Type:</label>
                <select
                  name="discountType"
                  value={discountCode.discountType}
                  onChange={handleChange}
                  className="border rounded p-2"
                >
                  <option value="" disabled>
                    Select Discount Type
                  </option>
                  <option value="amount">Amount</option>
                  <option value="percentage">Percentage</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Discount Value:</label>
                <input
                  name="discountValue"
                  value={discountCode.discountValue}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Expiry Date:</label>
                <DatePicker
                  selected={expiryDate}
                  onChange={handleDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="yyyy-MM-dd HH:mm"
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Usage Limit:</label>
                <input
                  name="usageLimit"
                  value={discountCode.usageLimit}
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

          {/* {selectedCategory && (
            <EditCategoryModal
              category={selectedCategory}
              isOpen={isModalOpen}
              onClose={closeModal}
              fetchCategories={fetchCategories}
            />
          )} */}
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

export default AddDiscountCode;
