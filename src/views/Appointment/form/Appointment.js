import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import GridContainer from '@jumbo/components/GridContainer';
import { Box, Button, Grid, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 5,
  },
}));

const Appointment = () => {
  const classes = useStyles();
  const [firstNameError, setFirstNameError] = useState('');

  const [state, setState] = useState({
    name: '',
    email: '',
    contactNo: '',
    age: '',
    description: '',
    address: '',
    departmentName: '',
    departmentId: '',
    scheduleId: '',
    scheduleName: '',
    doctorId: '',
    doctorName: '',
    appointmentDate: '',
    isCancelled: false,
  });
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const getAllDepartment = async () => {
    const res = await axios.get('http://localhost:7000/api/department');
    setDepartments(res.data.map(d => ({ ...d, label: d.name, value: d._id })));
  };
  useEffect(() => {
    getAllDepartment();
  }, []);
  const getAllDoctorByDepartment = async departmentId => {
    const res = await axios.get(`http://localhost:7000/api/doctor/department/${departmentId}`);
    setDoctors(res.data.map(d => ({ ...d, label: d.name, value: d._id })));
  };

  const onChangeDepartment = e => {
    const selectedDepartment = departments.find(dp => dp.value === e.target.value);
    if (selectedDepartment) {
      getAllDoctorByDepartment(selectedDepartment.value);
      setState({
        ...state,
        departmentId: selectedDepartment.value,
        departmentName: selectedDepartment.label,
      });
    }
  };
  const onDoctorChange = e => {
    const selectedDoctor = doctors.find(dp => dp.value === e.target.value);
    setState({
      ...state,
      doctorId: selectedDoctor.value,
      doctorName: selectedDoctor.label,
    });
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleSubmit = async () => {
    const payload = {
      name: state.name,
      email: state.email,
      contactNo: state.contactNo,
      age: state.age,
      description: state.description,
      address: 'abc',
      departmentName: state.departmentName,
      departmentId: state.departmentId,
      scheduleId: state.scheduleId,
      scheduleName: state.scheduleName,
      doctorId: state.doctorId,
      doctorName: state.doctorName,
      appointmentDate: new Date(),
      isCancelled: false,
    };
    console.log(JSON.stringify(payload, null, 2));
    if (payload.departmentId) {
      const res = await axios.post(`http://localhost:7000/api/appointment`, payload);
      console.log(res.status);
    }
  };
  return (
    <Box className={classes.root}>
      <Paper square elevation={1}>
        <Typography align="center">Make Appointment</Typography>
        <GridContainer style={{ padding: '20px' }}>
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
              id="doctor"
              select
              label="Doctor"
              value={state.doctorId}
              onChange={e => {
                onDoctorChange(e);
              }}
              variant="outlined"
              size="small">
              <MenuItem value="">NONE</MenuItem>
              {doctors.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            <KeyboardDatePicker
              id="date-picker-dialog"
              label="Appointment Date"
              variant="outlined"
              fullWidth
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              fullWidth
              variant="outlined"
              label="Name"
              multiline
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
              label="Age"
              value={state.age}
              onChange={e => {
                setState({ ...state, age: e.target.value });
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
          <Grid item xs={12} sm={12}>
            <AppTextInput
              fullWidth
              variant="outlined"
              label="Description"
              multiline
              value={state.description}
              onChange={e => {
                setState({ ...state, description: e.target.value });
              }}
              helperText={firstNameError}
            />
          </Grid>

          <Grid item>
            <Button variant="contained" color="primary" size="small" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </GridContainer>
      </Paper>
    </Box>
  );
};

export default Appointment;
