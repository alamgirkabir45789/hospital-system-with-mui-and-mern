import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import GridContainer from '@jumbo/components/GridContainer';
import { notify } from '@jumbo/utils/commonHelper';
import { Box, Button, Grid, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import { Cancel, CloudUpload } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { fetchDoctorById } from '../store/actions';
import '../styles/DoctorForm.css';
const defaultImageSrc = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
const test = 'http://localhost:7000/images/';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 5,
  },
  textField: {
    margin: theme.spacing(0),
  },
}));

const ddlDegree = [
  { label: 'MBBS', value: 'MBBS' },
  { label: 'BDS', value: 'BDS' },
  { label: 'DMF', value: 'DMC' },
];
const ddlSpecialization = [
  { label: 'Medicine', value: 'Medicine' },
  { label: 'Paediatrics', value: 'Paediatrics' },
  { label: 'Eye', value: 'Eye' },
];

const DoctorEditForm = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    doctorReducer: { selectedDoctor },
  } = useSelector(doctorReducer => doctorReducer);
  const doctorId = location.state._id;
  const classes = useStyles();
  // const [firstNameError, setFirstNameError] = useState('');
  const [departments, setDepartments] = useState([]);

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [doctorDetails, setDoctorDetails] = useState();
  const [specialization, setSpecialization] = useState('');
  const [department, setDepartment] = useState('');
  const [degree, setDegree] = useState('');
  const [imageUrl, setImageUrl] = useState({ photo: '' });
  console.log({ file, fileName, doctorDetails });

  const getAllDepartment = async () => {
    const res = await axios.get('http://localhost:7000/api/department');
    setDepartments(res.data.map(d => ({ ...d, label: d.name, value: d._id })));
  };
  useEffect(() => {
    getAllDepartment();
  }, []);

  useEffect(() => {
    if (doctorId) {
      dispatch(fetchDoctorById(doctorId));
    }
  }, [dispatch, doctorId]);
  useEffect(() => {
    if (selectedDoctor) {
      const selectedSpecialization = ddlSpecialization.find(dp => dp.value === selectedDoctor.specialization);
      const selectedDegree = ddlDegree.find(dp => dp.value === selectedDoctor.qualification);
      const dpt = selectedDoctor?.department.toString();
      const selectedDepartment = departments?.find(dp => dp.value === dpt);
      setDegree(selectedDegree?.value);
      setSpecialization(selectedSpecialization?.value);
      setDepartment(selectedDepartment?.value);
      setDoctorDetails(selectedDoctor);
    }
  }, [selectedDoctor]);
  console.log('render');

  const onFileChange = e => {
    setImageUrl({ ...imageUrl, photo: URL.createObjectURL(e.target.files[0]) });
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handlePhotoRemove = () => {
    setDoctorDetails({ ...doctorDetails, photo: '' });
    setImageUrl({ ...imageUrl, photo: '' });
    setFile(null);
    setFileName(null);
  };
  const onChangeDepartment = e => {
    const selectedDepartment = departments.find(dp => dp.value === e.target.value);
    setDepartment(selectedDepartment?.value);
  };
  const onChangeSpecialization = e => {
    const selectedSpecialization = ddlSpecialization.find(dp => dp.value === e.target.value);
    setSpecialization(selectedSpecialization?.value);
  };
  const onDegreeChange = e => {
    const selectedDegree = ddlDegree.find(dp => dp.value === e.target.value);
    setDegree(selectedDegree.value);
  };

  const handleSubmit = async () => {
    const payload = {
      name: doctorDetails?.name,
      email: doctorDetails?.email,
      contactNo: doctorDetails?.contactNo,
      bmdcReg: doctorDetails?.bmdcReg,
      message: doctorDetails?.message,
      department: department,
      qualification: degree,
      specialization: specialization,
    };
    console.log(JSON.stringify(payload, null, 2));

    let form_data = new FormData();
    for (let key in payload) {
      form_data.append(key, payload[key]);
    }
    if (file) {
      form_data.append('photo', file, fileName);
      console.log(Object.fromEntries(form_data));

      const res = await axios.put(`http://localhost:7000/api/doctor/${doctorId}`, payload);
      if (res.status === 200) {
        notify('success');
      }
    }
  };

  return (
    <Box className={classes.root}>
      <Paper square elevation={1}>
        <Typography align="center">Edit Doctor</Typography>
        <form encType="multipart/form-data">
          <GridContainer style={{ padding: '20px' }}>
            <Grid item xs={12} sm={12}>
              {/* <input type="file" name="photo" id="photo" onChange={e => onFileChange(e)} /> */}

              {/* <CmtAvatar size={40} src={profile_pic} /> */}

              <Box display="flex" alignItems="center" justifyContent="center">
                <Box>
                  <div className="main-div">
                    <div className="img-holder">
                      <img
                        src={
                          doctorDetails?.photo
                            ? `${test}${doctorDetails?.photo}`
                            : imageUrl.photo !== ''
                            ? imageUrl.photo
                            : defaultImageSrc
                        }
                        alt="Example"
                        className="image"
                      />
                      {doctorDetails?.photo !== '' ? (
                        <div className="overlay">
                          <div className="text">
                            <label size="sm" id="change-img">
                              <input
                                type="file"
                                name="file"
                                hidden
                                id="change-img"
                                onChange={e => onFileChange(e)}
                                accept="image/*"
                              />
                            </label>
                            <Cancel
                              color="danger"
                              style={{
                                height: '20px',
                                width: '20px',
                                cursor: 'pointer',
                                background: 'red',
                                borderRadius: '50%',
                              }}
                              onClick={() => {
                                handlePhotoRemove();
                              }}
                            />
                          </div>
                        </div>
                      ) : imageUrl?.photo !== '' ? (
                        <div className="overlay">
                          <div className="text">
                            <label size="sm" id="change-img">
                              <input
                                type="file"
                                name="file"
                                hidden
                                id="change-img"
                                onChange={e => onFileChange(e)}
                                accept="image/*"
                              />
                            </label>
                            <Cancel
                              color="danger"
                              style={{
                                height: '20px',
                                width: '20px',
                                cursor: 'pointer',
                                background: 'red',
                                borderRadius: '50%',
                              }}
                              onClick={() => {
                                handlePhotoRemove();
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="overlay">
                          <div className="text">
                            <label id="change-img">
                              {/* <span className="align-middle">Upload</span> */}
                              <CloudUpload color="primary" style={{ height: '25px', width: '25px', cursor: 'pointer' }} />
                              <input
                                type="file"
                                name="file"
                                hidden
                                id="change-img"
                                onChange={e => onFileChange(e)}
                                accept="image/*"
                              />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Name"
                value={doctorDetails?.name}
                onChange={e => {
                  setDoctorDetails({ ...doctorDetails, name: e.target.value });
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Email"
                value={doctorDetails?.email}
                onChange={e => {
                  setDoctorDetails({ ...doctorDetails, email: e.target.value });
                }}
                // helperText={firstNameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Contact No"
                value={doctorDetails?.contactNo}
                onChange={e => {
                  setDoctorDetails({ ...doctorDetails, contactNo: e.target.value });
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="BMDC Reg"
                value={doctorDetails?.bmdcReg}
                onChange={e => {
                  setDoctorDetails({ ...doctorDetails, bmdcReg: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                className={classes.textField}
                id="department"
                select
                label="Department"
                value={department}
                onChange={e => {
                  onChangeDepartment(e);
                }}
                variant="outlined"
                size="small">
                <MenuItem value="">NONE</MenuItem>
                {departments?.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                className={classes.textField}
                id="degree"
                select
                label="Degree"
                value={degree}
                onChange={e => {
                  onDegreeChange(e);
                }}
                variant="outlined"
                size="small">
                <MenuItem value="">NONE</MenuItem>
                {ddlDegree?.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                className={classes.textField}
                id="specialization"
                select
                label="Specialization"
                value={specialization}
                onChange={e => {
                  onChangeSpecialization(e);
                }}
                variant="outlined"
                size="small">
                <MenuItem value="">NONE</MenuItem>
                {ddlSpecialization?.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={12}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Description"
                multiline
                value={doctorDetails?.message}
                onChange={e => {
                  setDoctorDetails({ ...doctorDetails, message: e.target.value });
                }}
              />
            </Grid>

            <Grid item xs={6} sm={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" color="primary" size="small" onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </GridContainer>
        </form>
      </Paper>
    </Box>
  );
};

export default DoctorEditForm;
