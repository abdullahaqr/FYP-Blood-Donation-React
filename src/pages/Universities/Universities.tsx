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
import { GetUniversities } from "components/userManagement/columnShape";
import useTitle from "hooks/useTitle";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import apiHelper from "utils/axiosSetup";
import { endpoint, urls } from "../../constants";
import UniversityCustomTable from "./UniversityCustomTable";

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

const Universities: FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [editUniversityData, setEditUniversityData] = useState<any>(null);
  const [universityName, setUniversityName] = useState("");
  const [universityId, setUniversityId] = useState<any>(null);

  // change navbar title
  useTitle("Universities");
  const [data, setData] = useState<any>([])

  let navigate = useNavigate();
  useEffect(() => {
    apiHelper("get", endpoint.getUniversities, undefined, true).then((res) => {
      if (res?.status == 200) {
        setData(res.data);
      }
    })
  }, [])

  const handleUniversityNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUniversityName(event.target.value);
  };

  const handleSubmit = () => {

    const formData = new FormData();
    formData.append("name", universityName);
    setOpen(false); // Close the modal after submitting

    const apiEndpoint = universityId
      ? `${endpoint.getUniversityById}/${universityId}`
      : `${endpoint.getUniversities}`;

    const httpMethod = universityId ? "put" : "post";

    apiHelper(httpMethod, apiEndpoint, formData, true)
      .then(res => {
        console.log(res)
        toast.success("Success!");
        navigate(urls.universityList);
      })
      .catch(err => console.log(err));

    setEditUniversityData(null);
  };

  // Function to fetch university data by ID
  const fetchUniversityById = (universityId: number) => {

    apiHelper("get", `${endpoint.getUniversityById}/${universityId}`, undefined, true)
      .then((res) => {
        if (res?.status === 200) {
          const universityData = res.data as { name: string };
          setEditUniversityData(universityData);
          setUniversityName(universityData.name);
          setUniversityId(universityId);
          setOpen(true); // Open the modal
        }
      })
      .catch((err) => console.log(err));
    // console.log(universityId)
  };

  const handleModalClose = () => {
    setOpen(false);
    setEditUniversityData(null);
    setUniversityName("");
  };

  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Search Universities..." />
        <Button variant="contained" onClick={handleOpen}>
          Add New University
        </Button>
      </StyledFlexBox>

      {/* Modal for Adding New Blog University */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New University</DialogTitle>
        <ModalContent>
          <DialogContentText>
            Enter the name of the new university:
          </DialogContentText>
          <TextField
            label="University Name"
            variant="outlined"
            value={universityName}
            onChange={handleUniversityNameChange}
          />
        </ModalContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <UniversityCustomTable
        setModal={setOpen}
        modalOpen={open}
        columnShape={GetUniversities}
        data={data}
        // onEdit={(universityId: number) => fetchUniversityById(universityId)}
        onEdit={fetchUniversityById}
      />
    </Box>
  );
};

export default Universities;
