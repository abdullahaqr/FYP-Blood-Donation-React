import { Box, styled } from "@mui/material";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
// import { BlogCategoryList } from "components/userManagement/columnShape";
import { UpdateDonorColumnShape } from "components/userManagement/columnShape";
import useTitle from "hooks/useTitle";
import { FC, useEffect, useState } from "react";
import apiHelper from "utils/axiosSetup";
import { endpoint } from "../../constants";
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

  const [data, setData] = useState<any>([])

  useEffect(() => {
    // apiHelper("get", endpoint.getDonationsList, undefined, true).then((res) => {
    apiHelper("get", endpoint.getDonors, undefined, true).then((res) => {
      if (res?.status == 200) {
        setData(res.data);
        console.log("DATA----", res.data)
      }
    })
  }, [])

  // change navbar title
  useTitle("Update Donor");
  debugger
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
        columnShape={UpdateDonorColumnShape}
        data={data}
      />
    </Box>
  );
};

export default UpdateDonor;
