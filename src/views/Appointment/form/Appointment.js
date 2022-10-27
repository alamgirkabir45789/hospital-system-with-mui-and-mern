import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import GridContainer from '@jumbo/components/GridContainer';
import { notify } from '@jumbo/utils/commonHelper';
import { Box, Button, Checkbox, FormControlLabel, Grid, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import Moment from 'moment';
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
    appointmentDate: Moment(new Date()).format('yyyy-MM-DD'),
    isCancelled: false,
  });
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctorsSchedule, setDoctorsSchedule] = useState([]);
  const [doctorsDay, setDoctorsDay] = useState(null);
  const [doctorsDayWiseSchedule, setDoctorsDayWiseSchedule] = useState([]);
  console.log(doctorsDayWiseSchedule);
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
    // console.log(selectedDoctor.day.map(i => JSON.parse(i)));
    setDoctorsSchedule(selectedDoctor.schedule);
    setDoctorsDay(selectedDoctor?.day?.map(d => JSON.parse(d)));
    setState({
      ...state,
      doctorId: selectedDoctor.value,
      doctorName: selectedDoctor.label,
    });
  };

  const handleDateChange = date => {
    const selectedAppointmentDate = Moment(date).format('yyyy-MM-DD');
    const day = Moment(date).format('dddd');

    const isDaysExist = doctorsDay?.find(dd => dd.daysName === day);
    if (isDaysExist) {
      const listedSchedule = isDaysExist?.schedule?.map(sc => ({ ...sc, isChecked: false }));
      setDoctorsDayWiseSchedule(listedSchedule);
    } else {
      notify('warning');
    }
    setState({ ...state, appointmentDate: selectedAppointmentDate });
  };
  const onScheduleChange = (e, sc) => {
    const { checked } = e.target;
    let schedule = sc;
    schedule.isChecked = checked;
    console.log(schedule);
    const isCheckedSchedule = doctorsDayWiseSchedule.every(e => e.isChecked);
    if (isCheckedSchedule) {
      schedule.isChecked = !checked;
    }
    const modifiedDoctorsDayWiseSchedule = doctorsDayWiseSchedule.map(m => ({ ...m, schedule }));
    setDoctorsDayWiseSchedule(modifiedDoctorsDayWiseSchedule);
    setState({ ...state, scheduleId: schedule.scheduleId, scheduleName: schedule.scheduleName });
    // const _doctorsDayWiseSchedule = [...doctorsDayWiseSchedule];
    // const selectedSchedule = _doctorsDayWiseSchedule[index];
    // selectedSchedule.isChecked = checked;
    // // selectedSchedule[index] = selectedSchedule;
    // const dt = _doctorsDayWiseSchedule.find(f => f.isChecked);
    // _doctorsDayWiseSchedule.map(m => ({ ...m, dt }));
    // setDoctorsDayWiseSchedule(_doctorsDayWiseSchedule);
  };
  const handleSubmit = async () => {
    const scheduleObj = {
      scheduleId: state.scheduleId,
      scheduleName: state.scheduleName,
    };
    const payload = {
      name: state.name,
      email: state.email,
      contactNo: state.contactNo,
      age: state.age,
      description: state.description,
      address: 'abc',
      departmentName: state.departmentName,
      departmentId: state.departmentId,
      // scheduleId: state.scheduleId,
      // scheduleName: state.scheduleName,
      schedule: Object.assign({}, scheduleObj),
      doctorId: state.doctorId,
      doctorName: state.doctorName,
      appointmentDate: new Date(),
      isCancelled: false,
    };
    console.log(JSON.stringify(payload, null, 2));
    if (payload.departmentId) {
      const res = await axios.post(`http://localhost:7000/api/appointment`, payload);
      if (res.status === 200) {
        notify('success');
      }
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
              value={state.appointmentDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
          {doctorsDayWiseSchedule.length > 0 && (
            <>
              <Typography component="h6">Available Schedule</Typography>

              <Grid item xs={12} sm={12} container direction="row" justifyContent="flex-start" alignItems="center">
                {doctorsDayWiseSchedule?.map(sc => (
                  <FormControlLabel
                    key={sc.scheduleId}
                    control={
                      <Checkbox
                        checked={sc.isChecked}
                        name="checkedB"
                        color="primary"
                        onChange={e => onScheduleChange(e, sc)}
                      />
                    }
                    style={{ display: 'block' }}
                    label={`${sc.scheduleName}`}
                  />
                ))}
              </Grid>
            </>
          )}
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
