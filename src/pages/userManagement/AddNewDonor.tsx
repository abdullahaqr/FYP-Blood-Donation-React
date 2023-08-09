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
  Select
} from "@mui/material";
import LightTextField from "components/LightTextField";
import { useFormik } from "formik";
import useTitle from "hooks/useTitle";
import { FC, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import apiHelper from "utils/axiosSetup";
import * as Yup from "yup";
import { endpoint, urls } from "../../constants";
import "../AddEvent/datepicker.css";

// styled components
// const ButtonWrapper = styled(Box)(({ theme }) => ({
//   width: 100,
//   height: 100,
//   display: "flex",
//   borderRadius: "50%",
//   alignItems: "center",
//   justifyContent: "center",
//   backgroundColor:
//     theme.palette.mode === "light"
//       ? theme.palette.secondary[200]
//       : alpha(theme.palette.primary[100], 0.1),
// }));

// const UploadButton = styled(Box)(({ theme }) => ({
//   width: 50,
//   height: 50,
//   display: "flex",
//   borderRadius: "50%",
//   border: "2px solid",
//   alignItems: "center",
//   justifyContent: "center",
//   borderColor: theme.palette.background.paper,
//   backgroundColor:
//     theme.palette.mode === "light"
//       ? theme.palette.secondary[400]
//       : alpha(theme.palette.background.paper, 0.9),
// }));

// const SwitchWrapper = styled(Box)(() => ({
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   width: "100%",
//   marginTop: 10,
// }));

const AddNewDonor: FC = () => {
  // change navbar title
  const url = window.location.href
  let urlEdit = url.includes(urls.editDonor);
  useTitle(urlEdit ? "Edit Donor Details" : "Add New Donor");

  let navigate = useNavigate();

  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [data, setData] = useState<any>([])
  useEffect(() => {
    apiHelper("get", endpoint.getUniversities, undefined, true).then((res) => {
      if (res?.status === 200) {
        setData(res.data);
      }
    })
  }, [])

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
    role: "3",
    city: "",
    address: "",
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
    // dob: Yup.string().required("Date Of Birth is Required!"),
    gender: Yup.string().required("Gender is Required!"),
    university_name: Yup.string().required("University Name is Required!"),
    seat_no: Yup.string().required("Seat Number is Required!"),
    city: Yup.string().required("City is Required!"),
    address: Yup.string().required("Address is Required!"),
  });

  // const formatDate = (date: any): string => {
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const { values, errors, handleChange, handleSubmit, touched, setFieldValue } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      const formData = new FormData();
      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("phone_number", values.phone_number);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("gender", values.gender);
      formData.append("university_name", values.university_name);
      formData.append("seat_no", values.seat_no);
      formData.append("role", "3");

      if (dateValue) {
        formData.append("dob", formatDate(dateValue));
      }
      if (urlEdit) {
        formData.append("city", values.city);
      }
      if (urlEdit) {
        formData.append("address", values.address);
      }
      // debugger
      console.log(values)
      console.log(formData)
      debugger
      if (urlEdit && id) {
        //put api here
        debugger
        // apiHelper("patch", getApi, formData, true)
        apiHelper("patch", `${endpoint.getDonorById}/${id}/profile`, formData, true)
          .then(res => {
            console.log(res)
            toast.success("Donor Edited Successfully !");
            navigate(urls.donorList);
          })
          .catch(err => console.log("PATCH API", err))
      }
      else {
        apiHelper("post", endpoint.donorSignUp, formData)
          .then(res => {
            console.log(res)
            toast.success("New Donor Added Successfully !");
            navigate(urls.donorList);
          })
          .catch(err => console.log(err))

      }
    }

  });

  const params = useParams();
  const { id } = params;
  let getApi = `${endpoint.getDonorById}/${id}/profile`
  useEffect(() => {
    if (urlEdit && id) {
      apiHelper("get", getApi, {}, true).then((res: any) => {
        if (res?.status == 200) {
          // debugger
          // const {data : any} = res;
          setFieldValue("first_name", res?.data?.first_name)
          setFieldValue("last_name", res?.data?.last_name)
          setFieldValue("phone_number", res?.data?.phone_number)
          setFieldValue("email", res?.data?.email)
          setFieldValue("password", res?.data?.password)
          if (res?.data?.gender == "Male") {
            setFieldValue("gender", "1")
          }
          if (res?.data?.gender == "Female") {
            setFieldValue("gender", "2")
          }
          if (res?.data?.university_name == 'University of Karachi') {
            setFieldValue("university_name", 1)
          }
          if (res?.data?.university_name == 'Habib University') {
            setFieldValue("university_name", 3)
          }
          // setFieldValue("university_name", res?.data?.university_name)
          setFieldValue("seat_no", res?.data?.seat_no)
          setFieldValue("dob", res?.data?.dob)
          setFieldValue("city", res?.data?.city)
          setFieldValue("address", res?.data?.address)
          console.log(res, "!!!!!!!!!!!!!!!!!!")
        }
      })
      console.log(id, "??????")
    }
  }, [])

  // const { values, errors, handleChange, handleSubmit, touched } = useFormik({
  //   initialValues,
  //   validationSchema,
  //   onSubmit: () => {
  //     debugger
  //     console.log(values)
  //     //   let data : any = {
  //     //     first_name:"Abdullah",
  //     //     last_name:"Qadeer",
  //     //     phone_number:"03001234567",
  //     //     email:"abd@gmail.com",
  //     //     password:"abd12345",
  //     //     // dob:"12-November-2000",
  //     //     dob:"1997-10-11",
  //     //     gender:"1",
  //     //     university_name:"1",
  //     //     seat_no:"123456",
  //     //     role:"3"
  //     // }
  //     // apiHelper("post", endpoint.donorSignUp, data)
  //     apiHelper("post", endpoint.donorSignUp, values)
  //       .then(res => console.log(res))
  //       .catch(err => console.log(err))
  //   },
  // });



  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // const [dateValue, setDateValue] = useState("");

  // const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const handleDateChange = (date: Date | null) => {
    setDateValue(date);
  };


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
            {urlEdit &&
              <div style={{ alignSelf: "center" }}>This is</div>
            }
            <Card sx={{ padding: 3, boxShadow: 2 }}>
              {/* <form onSubmit={handleSubmit}> */}
              <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                      id="first_name"
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
                      id="last_name"
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
                      id="email"
                      label="Email"
                      variant="outlined"
                      placeholder="Email Address"
                      value={values.email}
                      onChange={handleChange}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>

                  {!urlEdit &&
                    //  <div style={{ alignSelf: "center" }}>This is</div>
                    <Grid item sm={6} xs={12}>
                      {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" fullWidth> */}
                      <FormControl variant="outlined" fullWidth>
                        {/* color:"#94A4C4" */}
                        <InputLabel htmlFor="outlined-adornment-password" style={{ color: "#ABB7D0", fontWeight: 500, }}>Password</InputLabel>
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
                            borderColor: "#E5EAF2",
                          }}

                        />
                      </FormControl>
                    </Grid>
                  }



                  <Grid item sm={6} xs={12}>
                    {/* <LightTextField
                      fullWidth
                      name="dob"
                      id="dob"
                      label="Date Of Birth"
                      variant="outlined"
                      placeholder="Date Of Birth"
                      value={values.dob}
                      onChange={handleChange}
                      error={Boolean(touched.dob && errors.dob)}
                      helperText={touched.dob && errors.dob}
                    /> */}
                    {/* {urlEdit ? dateValue : values.dob} */}
                    {urlEdit ?
                      <DatePicker
                        selected={dateValue}
                        // selected={urlEdit ? dateValue : values.dob}
                        // selected={urlEdit ? values.dob : dateValue}
                        name="dob"
                        // id="dob"
                        // variant="outlined"
                        // label="Date Of Birth"
                        onChange={handleDateChange}
                        // {urlEdit &&  value={values.dob} }
                        value={values.dob}
                        // value={urlEdit ? values.dob : dateValue}
                        // value={urlEdit ? formatDate(dateValue) : values.dob}
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="yyyy-dd-MM"
                        placeholderText="Date Of Birth"
                        className="custom-datepicker"
                      /> :
                      <DatePicker
                        selected={dateValue}
                        // selected={urlEdit ? dateValue : values.dob}
                        // selected={urlEdit ? values.dob : dateValue}
                        name="dob"
                        // id="dob"
                        // variant="outlined"
                        // label="Date Of Birth"
                        onChange={handleDateChange}
                        // {urlEdit &&  value={values.dob} }
                        // value={values.dob}
                        // value={urlEdit ? values.dob : dateValue}
                        // value={urlEdit ? formatDate(dateValue) : values.dob}
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="yyyy-dd-MM"
                        placeholderText="Date Of Birth"
                        className="custom-datepicker"
                      />
                    }

                    {/* <DatePicker
                      selected={dateValue}
                      // selected={urlEdit ? dateValue : values.dob}
                      // selected={urlEdit ? values.dob : dateValue}
                      name="dob"
                      // id="dob"
                      // variant="outlined"
                      // label="Date Of Birth"
                      onChange={handleDateChange}
                      // {urlEdit &&  value={values.dob} }
                      // value={values.dob}
                      // value={urlEdit ? values.dob : dateValue}
                      // value={urlEdit ? formatDate(dateValue) : values.dob}
                      showYearDropdown
                      dropdownMode="select"
                      dateFormat="yyyy-dd-MM"
                      placeholderText="Date Of Birth"
                      className="custom-datepicker"
                    /> */}

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
                        id="gender-label"
                        style={{
                          color: "#94A4C4",
                          fontWeight: 500,
                        }}
                      >Gender
                      </InputLabel>
                      <Select
                        name="gender"
                        labelId="gender-label"
                        id="gender"
                        value={values.gender}
                        // value={"1"}
                        label="gender"
                        onChange={handleChange}
                        style={{
                          borderRadius: "8px",
                          // border: "2px solid #E5EAF2",
                          borderColor: "#E5EAF2"
                        }}
                      >
                        <MenuItem value={"1"} style={{ border: "2px", borderColor: "#E5EAF2" }}>Male</MenuItem>
                        <MenuItem value={"2"} style={{ border: "2px", borderColor: "#E5EAF2" }}>Female</MenuItem>
                        {/* <MenuItem value={"Male"} style={{ border: "2px", borderColor: "#E5EAF2" }}>Male</MenuItem>
                        <MenuItem value={"Female"} style={{ border: "2px", borderColor: "#E5EAF2" }}>Female</MenuItem> */}
                      </Select>

                    </FormControl>
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel
                        id="university-label"
                        style={{
                          color: "#94A4C4",
                          fontWeight: 500,
                        }}
                      >
                        University
                      </InputLabel>
                      <Select
                        name="university_name"
                        labelId="university_name"
                        id="university_name"
                        value={values.university_name} // Use the correct state variable here
                        label="University"
                        onChange={handleChange}
                        style={{
                          borderRadius: "8px",
                          borderColor: "#E5EAF2"
                        }}
                      >
                        {data.map((university: any) => (
                          // <MenuItem key={university.id} value={university.id.toString()}>
                          <MenuItem key={university.id} value={university.id}>
                            {university.name}
                          </MenuItem>
                          // <MenuItem key={university.id} value={university.name}>
                          //   {university.name}
                          // </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="seat_no"
                      id="seat_no"
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
                      name="phone_number"
                      id="phone_number"
                      label="Phone"
                      variant="outlined"
                      placeholder="Phone Number"
                      value={values.phone_number}
                      onChange={handleChange}
                      error={Boolean(touched.phone_number && errors.phone_number)}
                      helperText={touched.phone_number && errors.phone_number}
                    />
                  </Grid>

                  {urlEdit &&
                    <Grid item sm={6} xs={12}>
                      <LightTextField
                        fullWidth
                        name="city"
                        id="city"
                        label="City"
                        variant="outlined"
                        placeholder="City"
                        value={values.city}
                        onChange={handleChange}
                        error={Boolean(touched.city && errors.city)}
                        helperText={touched.city && errors.city}
                      />
                    </Grid>
                  }

                  {urlEdit &&
                    <Grid item sm={6} xs={12}>
                      <LightTextField
                        fullWidth
                        name="address"
                        id="address"
                        label="Address"
                        variant="outlined"
                        placeholder="Address"
                        value={values.address}
                        onChange={handleChange}
                        error={Boolean(touched.address && errors.address)}
                        helperText={touched.address && errors.address}
                      />
                    </Grid>
                  }



                  <Grid item container xs={12} justifyContent="flex-end">
                    <Button type="submit" variant="contained">
                      {urlEdit ? "Edit Donor" : "Create Donor"}
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
