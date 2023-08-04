import { Box, Button, styled } from "@mui/material";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import CustomTable from "components/userManagement/CustomTable";
import { BlogCategoryList } from "components/userManagement/columnShape";
import useTitle from "hooks/useTitle";
import { FC, useEffect, useState } from "react";
import apiHelper from "utils/axiosSetup";
import { endpoint } from "../../constants";

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

const BlogCategory: FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  // change navbar title
  // useTitle("User List");
  useTitle("Blog Category");
  const [data, setData] = useState<any>([])

  useEffect(() => {
    apiHelper("get", endpoint.getCategories, undefined, true).then((res) => {
      if (res?.status ==200) {
        setData(res.data);
      }
    })
  }, [])


  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Search blog Category..." />
        <Button variant="contained" onClick={handleOpen}>
          Add New Blog Category
        </Button>
      </StyledFlexBox>

      <CustomTable
        setModal={setOpen}
        modalOpen={open}
        columnShape={BlogCategoryList}
        data={data}
      />
    </Box>
  );
};

export default BlogCategory;
