import { PhotoCamera } from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  styled
} from "@mui/material";
import LightTextField from "components/LightTextField";
import { Small } from "components/Typography";
import { useFormik } from "formik";
import useTitle from "hooks/useTitle";
import { FC } from "react";
import * as Yup from "yup";

// styled components
const ButtonWrapper = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[200]
      : alpha(theme.palette.primary[100], 0.1),
}));

const UploadButton = styled(Box)(({ theme }) => ({
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  border: "2px solid",
  alignItems: "center",
  justifyContent: "center",
  borderColor: theme.palette.background.paper,
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[400]
      : alpha(theme.palette.background.paper, 0.9),
}));

const SwitchWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginTop: 10,
}));

const AddNewDonor: FC = () => {
  // change navbar title
  useTitle("Add New Donor");

  const initialValues = {
    // fullName: "",
    // email: "",
    // phone: "",
    // country: "",
    // state: "",
    // city: "",
    // address: "",
    // zip: "",
    // about: "",
    // ---------------------------------------
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    universityName: "",
    seatNumber: "",
  };

  const validationSchema = Yup.object().shape({
    // fullName: Yup.string().required("Name is Required!"),
    // email: Yup.string().email().required("Email is Required!"),
    // phone: Yup.number().min(8).required("Phone is Required!"),
    // country: Yup.string().required("Country is Required!"),
    // state: Yup.string().required("State is Required!"),
    // city: Yup.string().required("City is Required!"),
    // address: Yup.string().required("Address is Required!"),
    // zip: Yup.string().required("Zip is Required!"),
    // about: Yup.string().required("About is Required!"),
    // ------------------------------------------------------
    firstName: Yup.string().required("First Name is Required!"),
    lastName: Yup.string().required("Last Name is Required!"),
    phoneNumber: Yup.number().min(8).required("Phone is Required!"),
    email: Yup.string().email().required("Email is Required!"),
    password: Yup.string().required("Password is Required!"),
    dob: Yup.string().required("Date Of Birth is Required!"),
    gender: Yup.string().required("Gender is Required!"),
    universityName: Yup.string().required("University Name is Required!"),
    seatNumber: Yup.string().required("Seat Number is Required!"),
  });

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {},
  });

  return (
    <Box pt={2} pb={4}>
      <Card sx={{ padding: 4 }}>
        <Grid container spacing={3}>
        {/* <Grid container > */}
          <Grid item md={4} xs={12}>
            <Card
              sx={{
                padding: 3,
                boxShadow: 2,
                // minHeight: 400,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ButtonWrapper>
                <UploadButton>
                  <label htmlFor="upload-btn">
                    <input
                      accept="image/*"
                      id="upload-btn"
                      type="file"
                      style={{ display: "none" }}
                    />
                    <IconButton component="span">
                      <PhotoCamera sx={{ fontSize: 26, color: "white" }} />
                    </IconButton>
                  </label>
                </UploadButton>
              </ButtonWrapper>

              <Small
                marginTop={2}
                maxWidth={200}
                lineHeight={1.9}
                display="block"
                textAlign="center"
                color="text.disabled"
              >
                Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
              </Small>

              {/* <Box maxWidth={250} marginTop={5} marginBottom={1}>
                <SwitchWrapper>
                  <Small display="block" fontWeight={600}>
                    Public Profile
                  </Small>
                  <Switch defaultChecked />
                </SwitchWrapper>

                <SwitchWrapper>
                  <Small display="block" fontWeight={600}>
                    Banned
                  </Small>
                  <Switch defaultChecked />
                </SwitchWrapper>
                <Tiny display="block" color="text.disabled" fontWeight={500}>
                  Apply disable account
                </Tiny>

                <SwitchWrapper>
                  <Small display="block" fontWeight={600}>
                    Email Verified
                  </Small>
                  <Switch defaultChecked />
                </SwitchWrapper>
                <Tiny display="block" color="text.disabled" fontWeight={500}>
                  Disabling this will automatically send the user a verification
                  email
                </Tiny>
              </Box> */}
            </Card>
          </Grid>
          <Grid item md={8} xs={12}>
          {/* <Grid item xs={12}> */}
            <Card sx={{ padding: 3, boxShadow: 2 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item sm={6} xs={12}>
                    {/* <LightTextField
                      fullWidth
                      name="fullName"
                      placeholder="Full Name"
                      value={values.fullName}
                      onChange={handleChange}
                      error={Boolean(touched.fullName && errors.fullName)}
                      helperText={touched.fullName && errors.fullName}
                    /> */}
                    <LightTextField
                      fullWidth
                      name="firstName"
                      placeholder="First Name"
                      value={values.firstName}
                      onChange={handleChange}
                      error={Boolean(touched.firstName && errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    {/* <LightTextField
                      fullWidth
                      name="country"
                      placeholder="Country"
                      value={values.country}
                      onChange={handleChange}
                      error={Boolean(touched.country && errors.country)}
                      helperText={touched.country && errors.country}
                    /> */}
                    <LightTextField
                      fullWidth
                      name="lastName"
                      placeholder="Last Name"
                      value={values.lastName}
                      onChange={handleChange}
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    {/* <LightTextField
                      fullWidth
                      name="email"
                      placeholder="Email Address"
                      value={values.email}
                      onChange={handleChange}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    /> */}
                    <LightTextField
                      fullWidth
                      name="email"
                      placeholder="Email Address"
                      value={values.email}
                      onChange={handleChange}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="seatNumber"
                      placeholder="Seat Number"
                      value={values.seatNumber}
                      onChange={handleChange}
                      error={Boolean(touched.seatNumber && errors.seatNumber)}
                      helperText={touched.seatNumber && errors.seatNumber}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    {/* <LightTextField
                      fullWidth
                      name="gender"
                      placeholder="Gender"
                      value={values.gender}
                      onChange={handleChange}
                      error={Boolean(touched.gender && errors.gender)}
                      helperText={touched.gender && errors.gender}
                    /> */}
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                      <Select autoWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.gender}
                        label="Gender"
                        onChange={handleChange}
                      >
                        <MenuItem value={10}>Male</MenuItem>
                        <MenuItem value={20}>Female</MenuItem>
                        {/* <MenuItem value={30}>Thirty</MenuItem> */}
                      </Select>
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="dob"
                      placeholder="Date Of Birth"
                      value={values.dob}
                      onChange={handleChange}
                      error={Boolean(touched.dob && errors.dob)}
                      helperText={touched.dob && errors.dob}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="universityName"
                      placeholder="University Name"
                      value={values.universityName}
                      onChange={handleChange}
                      error={Boolean(touched.universityName && errors.universityName)}
                      helperText={touched.universityName && errors.universityName}
                      sx={{
                        "& .MuiOutlinedInput-root textarea": { padding: 0 },
                      }}
                    />
                  </Grid>
                  
                  <Grid item container xs={12} justifyContent="flex-end">
                    <Button type="submit" variant="contained">
                      Create Donor
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default AddNewDonor;
