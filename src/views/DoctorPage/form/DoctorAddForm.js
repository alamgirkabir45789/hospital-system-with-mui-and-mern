import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import GridContainer from '@jumbo/components/GridContainer';
import { notify } from '@jumbo/utils/commonHelper';
import { Box, Button, Grid, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import { Cancel, CloudUpload } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/DoctorForm.css';
const defaultImageSrc = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 5,
  },
  textField: {
    margin: theme.spacing(0),
  },
}));
// const ddlItem = [
//   { title: 'Home', slug: 'home' },
//   { title: 'Office', slug: 'office' },
//   { title: 'Other', slug: 'other' },
// ];
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

const DoctorAddForm = () => {
  const classes = useStyles();
  // const [firstNameError, setFirstNameError] = useState('');
  const [departments, setDepartments] = useState([]);
  // const [schedules, setSchedules] = useState([]);
  // const [isAllScheduleCheck, setIsAllScheduleCheck] = useState(false);

  // const [daysDropdown, setDaysDropdown] = useState(ddlDays);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  // const [selectedDaysAndSchedule, setSelectedDaysAndSchedule] = useState([]);
  console.log({ file, fileName });
  const [state, setState] = useState({
    name: '',
    email: '',
    contactNo: '',
    bmdcReg: '',
    details: '',
    departmentName: '',
    departmentId: '',
    scheduleId: '',
    scheduleName: '',
    daysId: '',
    daysName: '',
    schedule: [],
    days: [],
    photo: '',
    qualificationId: '',
    qualificationName: '',
    specializationId: '',
    specializationName: '',
  });
  // const { getRootProps, getInputProps } = useDropzone({
  //   accept: 'image/*',
  //   onDrop: acceptedFiles => {
  //     setProfile_pic(URL.createObjectURL(acceptedFiles[0]));
  //   },
  // });

  const resetInitialState = () => {
    return {
      name: '',
      email: '',
      contactNo: '',
      bmdcReg: '',
      details: '',
      departmentName: '',
      departmentId: '',
      schedule: [],
      days: [],
      photo: '',
      qualificationId: '',
      qualificationName: '',
      specializationId: '',
      specializationName: '',
    };
  };
  const onFileChange = e => {
    setState({ ...state, photo: URL.createObjectURL(e.target.files[0]) });
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handlePhotoRemove = () => {
    setFile(null);
    setFileName(null);
    setState({
      ...state,
      photo: '',
    });
  };
  const onChangeDepartment = e => {
    const selectedDepartment = departments.find(dp => dp.value === e.target.value);
    setState({
      ...state,
      departmentId: selectedDepartment.value,
      departmentName: selectedDepartment.label,
    });
  };
  const onChangeSpecialization = e => {
    const selectedSpecialization = ddlSpecialization.find(dp => dp.value === e.target.value);
    setState({
      ...state,
      specializationId: selectedSpecialization.value,
      specializationName: selectedSpecialization.label,
    });
  };
  const onDegreeChange = e => {
    const selectedDegree = ddlDegree.find(dp => dp.value === e.target.value);
    setState({
      ...state,
      qualificationId: selectedDegree.value,
      qualificationName: selectedDegree.label,
    });
  };

  const getAllDepartment = async () => {
    const res = await axios.get('http://localhost:7000/api/department');
    setDepartments(res.data.map(d => ({ ...d, label: d.name, value: d._id })));
  };
  useEffect(() => {
    getAllDepartment();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      name: state.name,
      email: state.email,
      contactNo: state.contactNo,
      bmdcReg: state.bmdcReg,
      message: state.details,
      departmentName: state.departmentName,
      department: state.departmentId,
      qualification: state.qualificationId,
      qualificationName: state.qualificationName,
      specialization: state.specializationId,
      specializationName: state.specializationName,
    };
    console.log(JSON.stringify(payload, null, 2));

    let form_data = new FormData();
    for (let key in payload) {
      form_data.append(key, payload[key]);
    }

    if (file) {
      form_data.append('photo', file, fileName);
      console.log(Object.fromEntries(form_data));

      const res = await axios.post(`http://localhost:7000/api/doctor`, form_data);
      if (res.status === 200) {
        notify('success');
        resetInitialState();
      }
    }
  };

  return (
    <Box className={classes.root}>
      <Paper square elevation={1}>
        <Typography align="center">Create Doctor</Typography>
        <form encType="multipart/form-data">
          <GridContainer style={{ padding: '20px' }}>
            <Grid item xs={12} sm={12}>
              {/* <input type="file" name="photo" id="photo" onChange={e => onFileChange(e)} /> */}

              {/* <CmtAvatar size={40} src={profile_pic} /> */}

              <Box display="flex" alignItems="center" justifyContent="center">
                <Box>
                  <div className="main-div">
                    <div className="img-holder">
                      <img src={state.photo !== '' ? state.photo : defaultImageSrc} alt="Example" className="image" />
                      {state.photo !== '' ? (
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
                value={state.name}
                onChange={e => {
                  setState({ ...state, name: e.target.value });
                }}
                // helperText={firstNameError}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Email"
                value={state.email}
                onChange={e => {
                  setState({ ...state, email: e.target.value });
                }}
                // helperText={firstNameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Contact No"
                value={state.contactNo}
                onChange={e => {
                  setState({ ...state, contactNo: e.target.value });
                }}
                // helperText={firstNameError}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="BMDC Reg"
                value={state.bmdcReg}
                onChange={e => {
                  setState({ ...state, bmdcReg: e.target.value });
                }}
                // helperText={firstNameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                className={classes.textField}
                id="department"
                select
                label="Department"
                value={state.departmentId}
                onChange={e => {
                  onChangeDepartment(e);
                }}
                variant="outlined"
                size="small">
                <MenuItem value="">NONE</MenuItem>
                {departments.map(option => (
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
                value={state.qualificationId}
                onChange={e => {
                  onDegreeChange(e);
                }}
                variant="outlined"
                size="small">
                <MenuItem value="">NONE</MenuItem>
                {ddlDegree.map(option => (
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
                value={state.specializationId}
                onChange={e => {
                  onChangeSpecialization(e);
                }}
                variant="outlined"
                size="small">
                <MenuItem value="">NONE</MenuItem>
                {ddlSpecialization.map(option => (
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
                value={state.details}
                onChange={e => {
                  setState({ ...state, details: e.target.value });
                }}
                // helperText={firstNameError}
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

export default DoctorAddForm;
