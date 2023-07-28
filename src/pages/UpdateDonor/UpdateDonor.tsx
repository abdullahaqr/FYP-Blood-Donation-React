import { Box, styled } from "@mui/material";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import { BlogCategoryList } from "components/userManagement/columnShape";
import { userListFakeData } from "components/userManagement/fakeData";
import useTitle from "hooks/useTitle";
import { FC, useState } from "react";
import UpdateDonorTable from "./UpdateDonorTable";

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

const UpdateDonor: FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  // change navbar title
  useTitle("Update Donor");

  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Search Donor..." />
        {/* <Button variant="contained" onClick={handleOpen}>
          Add New Blog Category
        </Button> */}
      </StyledFlexBox>

      <UpdateDonorTable
        setModal={setOpen}
        modalOpen={open}
        columnShape={BlogCategoryList}
        data={userListFakeData}
      />
    </Box>
  );
};

export default UpdateDonor;
