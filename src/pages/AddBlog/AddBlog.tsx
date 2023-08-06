import { PhotoCamera } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  alpha,
  styled
} from "@mui/material";
import LightTextField from "components/LightTextField";
import { Small } from "components/Typography";
import { useFormik } from "formik";
import useTitle from "hooks/useTitle";
import { FC, useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
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

const AddBlog: FC = () => {
  // change navbar title
  useTitle("Add New Blog");
  const [data, setData] = useState<any>([])
  useEffect(() => {
    apiHelper("get", endpoint.getCategories, undefined, true).then((res) => {
      if (res?.status == 200) {
        setData(res.data);
      }
    })
  }, [])



  const initialValues = {
    image_url: "",
    title: "",
    slug: "",
    author: "1",
    category: "",
    content: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is Required!"),
    category: Yup.string().email().required("Please Select Category"),
    content: Yup.number().min(8).required("Content is Required!"),
  });

  // const [content, setContent] = useState('');

  // const posthandleChange = (contentvalue) => {
  //   setContent(contentvalue);
  // };

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {

      console.log(values)
      apiHelper("post", endpoint.blogPost, values)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
  });

  const slugify = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .trim();
  };

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setSlug(slugify(event.target.value));
  };
  const handleBothChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event);
    handleTitleChange(event);
  };

  return (
    <Box pt={2} pb={4}>
      <Card sx={{ padding: 4 }}>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Card sx={{ padding: 3, boxShadow: 2 }}>
              <form onSubmit={handleSubmit}>
                <Grid item xs={12}>
                  <Card
                    sx={{
                      padding: 1,
                      minHeight: 150,
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: 2,
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
                            value={values.image_url}
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
                      maxWidth={400}
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
                      name="title"
                      placeholder="Title"
                      value={values.title}
                      onChange={handleChange}
                      error={Boolean(touched.title && errors.title)}
                      helperText={touched.title && errors.title}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel
                        id="category"
                        style={{
                          color: "#94A4C4",
                          fontWeight: 500,
                        }}
                      >
                        Category
                      </InputLabel>
                      <Select
                        name="category"
                        labelId="category"
                        id="category_name"
                        value={values.category} // Use the correct state variable here
                        label="Category"
                        onChange={handleChange}
                        style={{
                          borderRadius: "8px",
                          borderColor: "#E5EAF2"
                        }}
                      >
                        {data.map((category: any) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth >
                      <FormLabel>Rich Text Editor</FormLabel>
                      <ReactQuill value={values.content} onChange={handleChange}
                        style={{ height: '300px' }} />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" style={{ marginTop: '25px' }} >
                      Add Blog
                    </Button>
                  </Grid>

                </Grid >
              </form >
            </Card >
          </Grid >
        </Grid >
      </Card >
    </Box >
  );
};

export default AddBlog;
