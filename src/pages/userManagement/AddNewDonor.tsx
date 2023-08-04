import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  alpha,
  styled
} from "@mui/material";
import LightTextField from "components/LightTextField";
import { useFormik } from "formik";
import useTitle from "hooks/useTitle";
import { FC, useState } from "react";
import apiHelper from "utils/axiosSetup";
import * as Yup from "yup";
import { endpoint } from "../../constants";

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
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    university_name: "",
    seat_no: "",
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
    first_name: Yup.string().required("First Name is Required!"),
    last_name: Yup.string().required("Last Name is Required!"),
    phone_number: Yup.number().min(8).required("Phone is Required!"),
    email: Yup.string().email().required("Email is Required!"),
    password: Yup.string().required("Password is Required!"),
    dob: Yup.string().required("Date Of Birth is Required!"),
    gender: Yup.string().required("Gender is Required!"),
    university_name: Yup.string().required("University Name is Required!"),
    seat_no: Yup.string().required("Seat Number is Required!"),
  });

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      debugger
      console.log(values)
    //   let data : any = {
    //     first_name:"Abdullah",
    //     last_name:"Qadeer",
    //     phone_number:"03001234567",
    //     email:"abd@gmail.com",
    //     password:"abd12345",
    //     // dob:"12-November-2000",
    //     dob:"1997-10-11",
    //     gender:"1",
    //     university_name:"1",
    //     seat_no:"123456",
    //     role:"3"
    // }
    // apiHelper("post", endpoint.donorSignUp, data)
    apiHelper("post", endpoint.donorSignUp, values)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [dateValue, setDateValue] = useState("");

  return (
    <Box pt={2} pb={4}>
      <Card sx={{ padding: 4 }}>
        {/* <Grid container spacing={3}> */}
        <Grid container xs={12}>
          {/* <Grid item md={4} xs={12}>
            <Card
              sx={{
                padding: 3,
                boxShadow: 2,
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
            </Card>
          </Grid> */}
          {/* <Grid item md={8} xs={12}> */}
          <Grid item xs={12}>
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
                      name="first_name"
                      id="outlined-basic"
                      label="First Name"
                      variant="outlined"
                      placeholder="First Name"
                      value={values.first_name}
                      onChange={handleChange}
                      error={Boolean(touched.first_name && errors.first_name)}
                      helperText={touched.first_name && errors.first_name}
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
                      name="last_name"
                      id="outlined-basic"
                      label="Last Name"
                      variant="outlined"
                      placeholder="Last Name"
                      value={values.last_name}
                      onChange={handleChange}
                      error={Boolean(touched.last_name && errors.last_name)}
                      helperText={touched.last_name && errors.last_name}
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
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      placeholder="Email Address"
                      value={values.email}
                      onChange={handleChange}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    {/* <LightTextField
                      fullWidth
                      name="password"
                      id="outlined-adornment-password"
                      type="password"
                      autoComplete="current-password"
                      label="Password"
                      variant="outlined"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                    /> */}

                    {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" fullWidth> */}
                    <FormControl variant="outlined" fullWidth>
                    {/* color:"#94A4C4" */}
                    <InputLabel htmlFor="outlined-adornment-password" style={{color:"#ABB7D0", fontWeight: 500,}}>Password</InputLabel> 
                    <OutlinedInput
                      name="password"
                      id="outlined-adornment-password"
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      error={Boolean(touched.password && errors.password)}
                      // helperText={touched.password && errors.password}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      
                      style={{
                        borderRadius: "8px",
                        // border: "2px solid #E5EAF2",
                        borderColor:"#E5EAF2",
                      }}
                      
                    />
                  </FormControl>
                  </Grid>


                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="dob"
                      id="outlined-basic"
                      label="Date Of Birth"
                      variant="outlined"
                      placeholder="Date Of Birth"
                      value={values.dob}
                      onChange={handleChange}
                      error={Boolean(touched.dob && errors.dob)}
                      helperText={touched.dob && errors.dob}
                    />

                    {/* <DatePicker label="Uncontrolled picker" />
                    <DatePicker
                      label="Controlled picker"
                      value={dateValue}
                      onChange={(newValue: string) => setDateValue(newValue)}
                    /> */}

                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />
                        <DatePicker
                          label="Controlled picker"
                          value={value}
                          onChange={(newValue) => setValue(newValue)}
                        />
                      </DemoContainer>
                    </LocalizationProvider> */}

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
                    {/* <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                      <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values.gender}
                      label="Gender"
                      onChange={handleChange}
                      style={{width : "100%"}}
                      >
                      <MenuItem key={0} value={"Male"}>Male</MenuItem>
                      <MenuItem key={1} value={"Female"}>Female</MenuItem>
                    </Select> */}
                      <FormControl fullWidth 
                      // style={{
                      //   borderRadius: "8px",
                      //   border: "2px solid #E5EAF2",
                      //   borderColor:"#E5EAF2"
                      // }}
                      >
                      <InputLabel
                        id="demo-simple-select-label" 
                        style={{
                          color:"#94A4C4",
                          fontWeight: 500,
                        }}
                      >Gender
                      </InputLabel>
                      <Select
                        name="gender"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.gender}
                        label="Age"
                        onChange={handleChange}
                        style={{
                          borderRadius: "8px",
                          // border: "2px solid #E5EAF2",
                          borderColor:"#E5EAF2"
                        }}
                      >
                        <MenuItem value={"Male"} style={{border: "2px", borderColor:"#E5EAF2"}}>Male</MenuItem>
                        <MenuItem value={"Female"} style={{border: "2px", borderColor:"#E5EAF2"}}>Female</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="seat_no"
                      id="outlined-basic"
                      label="Seat Number"
                      variant="outlined"
                      placeholder="Seat Number"
                      value={values.seat_no}
                      onChange={handleChange}
                      error={Boolean(touched.seat_no && errors.seat_no)}
                      helperText={touched.seat_no && errors.seat_no}
                    />
                  </Grid>
                  
                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="university_name"
                      id="outlined-basic"
                      label="University"
                      variant="outlined"
                      placeholder="University Name"
                      value={values.university_name}
                      onChange={handleChange}
                      error={Boolean(touched.university_name && errors.university_name)}
                      helperText={touched.university_name && errors.university_name}
                      sx={{
                        "& .MuiOutlinedInput-root textarea": { padding: 0 },
                      }}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="phone_number"
                      id="outlined-basic"
                      label="Phone"
                      variant="outlined"
                      placeholder="Phone Number"
                      value={values.phone_number}
                      onChange={handleChange}
                      error={Boolean(touched.phone_number && errors.phone_number)}
                      helperText={touched.phone_number && errors.phone_number}
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
