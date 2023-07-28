import { Box, Button, styled } from "@mui/material";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import { UserListColumnShape } from "components/userManagement/columnShape";
import CustomTable from "components/userManagement/CustomTable";
import { userListFakeData } from "components/userManagement/fakeData";
import useTitle from "hooks/useTitle";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

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

const DonorList: FC = () => {
  // change navbar title
  // useTitle("User List");
  useTitle("Donor List");

  const navigate = useNavigate();
  const handleAddUser = () => navigate("/dashboard/add-donor");

  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Search Donors..." />
        <Button variant="contained" onClick={handleAddUser}>
          Add New Donor
        </Button>
      </StyledFlexBox>

      <CustomTable columnShape={UserListColumnShape} data={userListFakeData} />
    </Box>
  );
};

export default DonorList;
