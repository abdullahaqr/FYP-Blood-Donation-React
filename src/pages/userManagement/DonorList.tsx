import { Box, Button, styled } from "@mui/material";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import CustomTable from "components/userManagement/CustomTable";
import { UserListColumnShape } from "components/userManagement/columnShape";
import useTitle from "hooks/useTitle";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const DonorList: FC = () => {
  // change navbar title
  // useTitle("User List");
  useTitle("Donor List");

  const navigate = useNavigate();
  const handleAddUser = () => navigate("/dashboard/add-donor");
  const [data, setData] = useState<any>([])

  useEffect(() => {
    apiHelper("get", endpoint.getDonors, undefined, true).then((res) => {
      if (res?.status ==200) {
        setData(res.data);
      }
    })
  }, [])

  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Search Donors..." />
        <Button variant="contained" onClick={handleAddUser}>
          Add New Donor
        </Button>
      </StyledFlexBox>

      <CustomTable columnShape={UserListColumnShape} data={data} />
    </Box>
  );
};

export default DonorList;
