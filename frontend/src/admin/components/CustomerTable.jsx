import { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function CustomerTable() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/customers");
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/delete-user",
        { userId }
      );
      console.log(response.data);
      fetchUsers();
    } catch (error) {
      console.error(error.response);
    }
  };

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Customers List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <th className="py-2 px-4 border-b text-left">ID</th>
                </Grid>
                <Grid item xs={4}>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                </Grid>
                <Grid item xs={4}>
                  <th className="py-2 px-4 border-b text-left">Email</th>
                </Grid>
              </Grid>
            </tr>
          </thead>
        </table>
        <div>
          {users.map((user) => (
            <Accordion key={user.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${user.id}-content`}
                id={`panel-${user.id}-header`}
              >
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography>{user._id}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>{user.name}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>{user.email}</Typography>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Box width="100%">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="body2">ID: {user._id}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">Name: {user.name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        Email: {user.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" className="capitalize">
                        Role: {user.role}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="flex flex-col items-start gap-3">
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(user._id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerTable;
