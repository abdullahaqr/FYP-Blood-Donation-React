import { PhotoCamera } from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  styled
} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import LightTextField from "components/LightTextField";
import { Small } from "components/Typography";
import { useFormik } from "formik";
import useTitle from "hooks/useTitle";
import { FC, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import apiHelper from "utils/axiosSetup";
import * as Yup from "yup";
import { endpoint, urls } from "../../constants";
import "./datepicker.css";

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

const AddEvent: FC = () => {
  // change navbar title
  useTitle("Add New Event");

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedstartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  let navigate = useNavigate();

  const initialValues = {
    event_name: "",
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
    city: "",
    address: "",
    creator: "1",
    content: "",
    image_url: "",
  };

  const validationSchema = Yup.object().shape({
    event_name: Yup.string().required("Name is Required!"),
    start_time: Yup.string().required("Start Time is Required!"),
    end_time: Yup.string().required("End Time is Required!"),
    city: Yup.string().required("City is Required!"),
    address: Yup.string().required("Address is Required!"),
    content: Yup.string().required("Content is Required!"),
  });

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      const formData = new FormData();
      formData.append("event_name", values.event_name);
      formData.append("start_time", values.start_time + ':00');
      formData.append("end_time", values.end_time + ':00');
      formData.append("city", values.city);
      formData.append("address", values.address);
      formData.append("content", values.content);
      formData.append("creator", "1");

      console.log(formData)
      if (selectedImage) {
        formData.append("image_url", selectedImage);
      }
      if (selectedstartDate) {
        formData.append("start_date", formatDate(selectedstartDate));
      }
      if (selectedEndDate) {
        formData.append("end_date", formatDate(selectedEndDate));
      }

      apiHelper("post", endpoint.getAllEvents, formData)
        .then(res => {
          console.log(res)
          toast.success("New Event Added Successfully !");
          navigate(urls.eventList);
        })
        .catch(err => console.log(err))

    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };
  const handleStartDateChange = (date: Date | null) => {
    setSelectedStartDate(date);
  };
  const handleEndDateChange = (date: Date | null) => {
    setSelectedEndDate(date);
  };
  return (
    <Box pt={2} pb={4}>
      <Card sx={{ padding: 4 }}>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Card sx={{ padding: 3, boxShadow: 2 }}>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Grid item xs={12}>
                  <Card
                    sx={{
                      padding: 3,
                      minHeight: 200,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {/* Display the image preview */}
                    {selectedImage ? (
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Preview"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <ButtonWrapper>
                        <UploadButton>
                          <label htmlFor="image_url">
                            <input
                              accept="image/*"
                              id="image_url"
                              name="image_url"
                              type="file"
                              value=""
                              style={{ display: "none" }}
                              onChange={handleImageChange} // Call the handleImageChange function on file selection
                            />
                            <IconButton component="span">
                              <PhotoCamera sx={{ fontSize: 26, color: "white" }} />
                            </IconButton>
                          </label>
                        </UploadButton>
                      </ButtonWrapper>
                    )}

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
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <LightTextField
                      fullWidth
                      name="event_name"
                      placeholder="Event Name"
                      value={values.event_name}
                      onChange={handleChange}
                      error={Boolean(touched.event_name && errors.event_name)}
                      helperText={touched.event_name && errors.event_name}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <DatePicker
                      selected={selectedstartDate}
                      name="start_date"
                      onChange={handleStartDateChange}
                      dateFormat="yyyy-dd-MM"
                      placeholderText="Start Date"
                      className="custom-datepicker"
                    />

                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <DatePicker
                      selected={selectedEndDate}
                      name="end_date"
                      onChange={handleEndDateChange}
                      dateFormat="yyyy-dd-MM"
                      placeholderText="End Date"
                      className="custom-datepicker"
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="start_time"
                      placeholder="Start Time (e.g 10:00)"
                      value={values.start_time}
                      onChange={handleChange}
                      error={Boolean(touched.start_time && errors.start_time)}
                      helperText={touched.start_time && errors.start_time}
                    />

                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="end_time"
                      placeholder="End Time (e.g 17:00)"
                      value={values.end_time}
                      onChange={handleChange}
                      error={Boolean(touched.end_time && errors.end_time)}
                      helperText={touched.end_time && errors.end_time}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="city"
                      placeholder="City"
                      value={values.city}
                      onChange={handleChange}
                      error={Boolean(touched.city && errors.city)}
                      helperText={touched.city && errors.city}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="address"
                      placeholder="Address"
                      value={values.address}
                      onChange={handleChange}
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <LightTextField
                      multiline
                      fullWidth
                      rows={10}
                      name="content"
                      placeholder="Content"
                      value={values.content}
                      onChange={handleChange}
                      error={Boolean(touched.content && errors.content)}
                      helperText={touched.content && errors.content}
                      sx={{
                        "& .MuiOutlinedInput-root textarea": { padding: 0 },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained">
                      Create Event
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

export default AddEvent;
