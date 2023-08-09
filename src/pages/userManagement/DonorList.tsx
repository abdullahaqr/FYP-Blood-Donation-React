import { Box, Button, styled } from "@mui/material";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   TextField,
//   styled,
// } from "@mui/material";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import { UserListColumnShape } from "components/userManagement/columnShape";
import useTitle from "hooks/useTitle";
// import { FC, useEffect, useState, useHistory } from "react";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHelper from "utils/axiosSetup";
import { endpoint, urls } from "../../constants";
import DonorListCustomTable from "./DonorListCustomTable";

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

// const ModalContent = styled(DialogContent)(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   gap: "10px",
// }));

const DonorList: FC = () => {
  // change navbar title
  // useTitle("User List");
  useTitle("Donor List");

  const handleOpen = () => setOpen(true);

  const navigate = useNavigate();
  const handleAddUser = () => navigate("/dashboard/add-donor");

  const [data, setData] = useState<any>([])
  const [open, setOpen] = useState(false);
  const [editDonorData, setEditDonorData] = useState<any>(null);
  const [donorName, setDonorName] = useState("");
  const [donorId, setDonorId] = useState<any>(null);
  // const history = useHistory
  useEffect(() => {
    apiHelper("get", endpoint.getDonors, undefined, true).then((res) => {
      if (res?.status == 200) {
        setData(res.data);
      }
    })
  }, [])

  const handleDonorNameChange = (
    // event: React.ChangeEvent<HTMLInputElement>
    id: number
  ) => {
    navigate(`${urls.editDonor}/${id}`)
  };

  // const handleSubmit = () => {
  //   const formData = new FormData();
  //   formData.append("name", donorName);
  //   setOpen(false); // Close the modal after submitting

  //   apiHelper("put", `${endpoint.getDonorById}/${donorId}`, formData, true) // is line pr masla ha aur getDonorById supppose kea ha
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err))

  //   setEditDonorData(null);
  // };

  // // Function to fetch category data by ID
  // const fetchDonorById = (donorId: number) => {

  //   apiHelper("get", `${endpoint.getDonorById}/${donorId}`, undefined, true) // is line pr masla ha aur getDonorById supppose kea ha
  //     .then((res) => {
  //       if (res?.status === 200) {
  //         const donorData = res.data as { name: string };
  //         setEditDonorData(donorData);
  //         setDonorName(donorData.name);
  //         setDonorId(donorId);
  //         setOpen(true); // Open the modal
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const handleModalClose = () => {
  //   setOpen(false);
  //   setEditDonorData(null);
  //   setDonorName("");
  // };

  const [dateValue, setDateValue] = useState();


  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Search Donors..." />
        <Button variant="contained" onClick={handleAddUser}>
          Add New Donor
        </Button>
      </StyledFlexBox>

      {/* Modal for Adding New Donor */}
      {/* <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Donor</DialogTitle>
        <ModalContent>
          <DialogContentText>
            Enter the name of the new Donor:
          </DialogContentText>
          <TextField
            label="Donor"
            variant="outlined"
            value={donorName}
            onChange={handleDonorNameChange}
          />
        </ModalContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog> */}

      {/* <CustomTable columnShape={UserListColumnShape} data={data} /> */}
      <DonorListCustomTable
        setModal={setOpen}
        modalOpen={open}
        columnShape={UserListColumnShape}
        data={data}
        onEdit={handleDonorNameChange}

      />
    </Box>
  );
};

export default DonorList;
