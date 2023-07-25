import { Box, Button, styled } from "@mui/material";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import { UserListColumnShape } from "components/userManagement/columnShape";
import CustomTable from "components/userManagement/CustomTable";
import { userListFakeData } from "components/userManagement/fakeData";
import useTitle from "hooks/useTitle";
import { FC, useState } from "react";

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

const Universities: FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  // change navbar title
  useTitle("Universities");

  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Search Universities..." />
        <Button variant="contained" onClick={handleOpen}>
          Add New University
        </Button>
      </StyledFlexBox>

      <CustomTable
        setModal={setOpen}
        modalOpen={open}
        columnShape={UserListColumnShape}
        data={userListFakeData}
      />
    </Box>
  );
};

export default Universities;
