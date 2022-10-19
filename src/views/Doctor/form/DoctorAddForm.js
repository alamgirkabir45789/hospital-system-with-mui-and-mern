import CmtAvatar from '@coremat/CmtAvatar';
import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import GridContainer from '@jumbo/components/GridContainer';
import { Box, Button, Checkbox, FormControlLabel, Grid, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 5,
  },
  textField: {
    margin: theme.spacing(0),
  },
}));
const ddlItem = [
  { title: 'Home', slug: 'home' },
  { title: 'Office', slug: 'office' },
  { title: 'Other', slug: 'other' },
];
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
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [departments, setDepartments] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [department, setDepartment] = useState('');
  const [profile_pic, setProfile_pic] = useState('');

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
    qualificationId: '',
    qualificationName: '',
    specializationId: '',
    specializationName: '',
  });
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setProfile_pic(URL.createObjectURL(acceptedFiles[0]));
    },
  });

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

  const onScheduleChange = e => {
    const selectedSchedule = schedules.find(dp => dp.value === e.target.value);

    setState({
      ...state,
      scheduleId: selectedSchedule.value,
      scheduleName: selectedSchedule.label,
    });
  };
  const getAllDepartment = async () => {
    const res = await axios.get('http://localhost:7000/api/department');
    setDepartments(res.data.map(d => ({ ...d, label: d.name, value: d._id })));
  };
  useEffect(() => {
    getAllDepartment();
  }, []);
  const getAllSchedule = async () => {
    const res = await axios.get('http://localhost:7000/api/schedule');
    setSchedules(res.data.map(d => ({ ...d, label: d.startTime, value: d._id })));
  };
  useEffect(() => {
    getAllSchedule();
  }, []);

  const handleSubmit = () => {
    const payload = {
      name: state.name,
      email: state.email,
      contactNo: state.contactNo,
      bmdcReg: state.bmdcReg,
      message: state.details,
      departmentName: state.departmentName,
      department: state.departmentId,
      schedule: state.scheduleId,
      scheduleName: state.scheduleName,
      qualification: state.qualificationId,
      qualificationName: state.qualificationName,
      specialization: state.specializationId,
      specializationName: state.specializationName,
      photo: '',
    };
    console.log(JSON.stringify(payload, null, 2));
  };

  return (
    <Box className={classes.root}>
      <Paper square elevation={1}>
        <Typography align="center">Create Doctor</Typography>

        <GridContainer style={{ padding: '20px' }}>
          <Grid item xs={12} sm={6} {...getRootProps()}>
            <input {...getInputProps()} />
            <CmtAvatar size={40} src={profile_pic} />
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
              helperText={firstNameError}
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
              helperText={firstNameError}
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
              helperText={firstNameError}
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
              helperText={firstNameError}
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
              select
              className={classes.textField}
              id="Schedule"
              label="Schedule"
              value={state.scheduleId}
              variant="outlined"
              onChange={onScheduleChange}
              size="small">
              <MenuItem value="">NONE</MenuItem>
              {schedules.map(option => (
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

          <Grid item xs={12} sm={6}>
            <AppTextInput
              fullWidth
              variant="outlined"
              label="Description"
              multiline
              value={state.details}
              onChange={e => {
                setState({ ...state, details: e.target.value });
              }}
              helperText={firstNameError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={<Checkbox checked={false} name="checkedB" color="primary" />}
              label="isActive"
              disabled
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button variant="contained" color="primary" size="small" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </GridContainer>
      </Paper>
    </Box>
  );
};

export default DoctorAddForm;
