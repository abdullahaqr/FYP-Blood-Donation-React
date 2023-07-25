import { Box, Button, styled } from "@mui/material";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import UserListColumnShape from "components/userManagement/columnShape";
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

const Events: FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  // change navbar title
  useTitle("Events");

  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Search Events..." />
        <Button variant="contained" onClick={handleOpen}>
          Add New Event
        </Button>
      </StyledFlexBox>

      <CustomTable
        modalClose={setOpen}
        modalOpen={open}
        columnShape={UserListColumnShape}
        data={userListFakeData}
      />
    </Box>
  );
};

export default Events;
