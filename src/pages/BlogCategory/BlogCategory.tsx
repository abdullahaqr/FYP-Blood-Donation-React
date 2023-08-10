import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  styled,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import { BlogCategoryList } from "components/userManagement/columnShape";
import useTitle from "hooks/useTitle";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import apiHelper from "utils/axiosSetup";
import { endpoint, urls } from "../../constants";
import CategoryCustomTable from "./CategoryCustomTable";

// styled component
const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: 20,
  [theme.breakpoints.down(500)]: {
    width: "100%",
    "& .MuiInputBase-root": { maxWidth: "100%" },
    "& .MuiButton-root": {
      width: "100%",
      marginTop: 15,
    },
  },
}));

const ModalContent = styled(DialogContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const BlogCategory: FC = () => {
  const handleOpen = () => setOpen(true);

  // change navbar title
  // useTitle("User List");
  useTitle("Blog Category");
  const [data, setData] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState<any>(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState<any>(null);

  let navigate = useNavigate();
  useEffect(() => {
    apiHelper("get", endpoint.getCategories, undefined, true).then((res) => {
      if (res?.status == 200) {
        setData(res.data);
      }
    });
  }, []);



  const handleCategoryNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", categoryName);
    setOpen(false); // Close the modal after submitting

    const apiEndpoint = categoryId
      ? `${endpoint.getCategoryById}/${categoryId}`
      : `${endpoint.getCategories}`;

    const httpMethod = categoryId ? "put" : "post";

    apiHelper(httpMethod, apiEndpoint, formData, true)
      .then(res => {
        console.log(res)
        toast.success("Success!");
        navigate(urls.categoryList);
      })
      .catch(err => console.log(err));

    setEditCategoryData(null);
  };

  // Function to fetch category data by ID
  const fetchCategoryById = (categoryId: number) => {

    apiHelper("get", `${endpoint.getCategoryById}/${categoryId}`, undefined, true)
      .then((res) => {
        if (res?.status === 200) {
          const categoryData = res.data as { name: string };
          setEditCategoryData(categoryData);
          setCategoryName(categoryData.name);
          setCategoryId(categoryId);
          setOpen(true); // Open the modal
        }
      })
      .catch((err) => console.log(err));
    // console.log(categoryId)
  };

  const handleModalClose = () => {
    setOpen(false);
    setEditCategoryData(null);
    setCategoryName("");
  };

  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Search blog Category..." />
        <Button variant="contained" onClick={handleOpen}>
          Add New Category
        </Button>
      </StyledFlexBox>

      {/* Modal for Adding New Blog Category */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Blog Category</DialogTitle>
        <ModalContent>
          <DialogContentText>
            Enter the name of the new blog category:
          </DialogContentText>
          <TextField
            label="Category Name"
            variant="outlined"
            value={categoryName}
            onChange={handleCategoryNameChange}
          />
        </ModalContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <CategoryCustomTable
        setModal={setOpen}
        modalOpen={open}
        columnShape={BlogCategoryList}
        data={data}
        onEdit={(categoryId: number) => fetchCategoryById(categoryId)}

      />
    </Box>
  );
};

export default BlogCategory;
