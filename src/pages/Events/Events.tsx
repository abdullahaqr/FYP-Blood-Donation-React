import { Box, Button, styled } from "@mui/material";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import CustomTable from "components/userManagement/CustomTable";
import { EventListColumnShape } from "components/userManagement/columnShape";
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

const Events: FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  // change navbar title
  useTitle("Events");
  const [data, setData] = useState<any>([])

  useEffect(() => {
    apiHelper("get", endpoint.getAllEvents, undefined, true).then((res) => {
      if (res?.status ==200) {
        setData(res.data);
      }
    })
  }, [])


  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Search Events..." />
        <Button variant="contained" onClick={handleOpen}>
          Add New Event
        </Button>
      </StyledFlexBox>

      <CustomTable
        setModal={setOpen}
        modalOpen={open}
        columnShape={EventListColumnShape}
        data={data}
      />
    </Box>
  );
};

export default Events;
