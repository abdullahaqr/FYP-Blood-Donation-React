import { styled } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import FlexBox from "components/FlexBox";
import { useState } from "react";

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
interface FormData {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  dob: string;
  gender: string;
  university_name: string;
  seat_no: string;
  city: string;
  address: string;
}

const Universities: React.FC = () => {
  const initialFormData: FormData = {
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    dob: '',
    gender: '',
    university_name: '',
    seat_no: '',
    city: '',
    address: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const enableFields = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form data submitted:', formData);
    setEditMode(false);
  };

  return (
    <div className="container">
      <form id="myForm" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4 offset-md-4 text-center">
            <label htmlFor="profile_image" className="mt-3">
              Profile Image:
            </label>
            <img
              src="https://via.placeholder.com/150"
              alt="Profile Image"
              className="img-thumbnail mb-3"
            />
            <input
              type="file"
              className="form-control"
              id="profile_image"
              disabled={!editMode}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mt-4">
            <div className="form-group">
              <label htmlFor="first_name">First Name:</label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                placeholder="Enter First Name"
                value={formData.first_name}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
          </div>
          <div className="col-md-6 mt-4">
            <div className="form-group">
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                placeholder="Enter Last Name"
                value={formData.last_name}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="phone_number">Phone Number:</label>
              <input
                type="tel"
                className="form-control"
                id="phone_number"
                placeholder="Enter Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                className="form-control"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select
                className="form-control"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={!editMode}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="university_name">University Name:</label>
              <input
                type="text"
                className="form-control"
                id="university_name"
                placeholder="Enter University Name"
                value={formData.university_name}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="seat_no">Seat Number:</label>
              <input
                type="text"
                className="form-control"
                id="seat_no"
                placeholder="Enter Seat Number"
                value={formData.seat_no}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="Enter City"
                value={formData.city}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <textarea
                className="form-control"
                id="address"
                rows={2}
                placeholder="Enter Address"
                value={formData.address}
                onChange={handleChange}
                disabled={!editMode}
              ></textarea>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={enableFields}
          style={{ display: editMode ? 'none' : 'block' }}
        >
          Edit
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ display: editMode ? 'block' : 'none' }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};


export default Universities;
