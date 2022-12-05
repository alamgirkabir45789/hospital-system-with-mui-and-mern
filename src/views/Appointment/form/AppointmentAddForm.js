import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import GridContainer from '@jumbo/components/GridContainer';
import { notify } from '@jumbo/utils/commonHelper';
import { timeDiff } from '@jumbo/utils/dateHelper';
import {
  Box,
  Button,
  Checkbox,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import { DateTimePicker, TimePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchScheduleByDoctorId } from 'views/Schedule/store/actions';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 5,
  },
}));

const AppointmentAddForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    scheduleReducer: { selectedSchedule },
  } = useSelector(scheduleReducer => scheduleReducer);
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
  const [doctorsTime, setDoctorsTime] = useState([]);
  console.log(doctorsSchedule);
  const getAllDepartment = async () => {
    const res = await axios.get('http://localhost:7000/api/department');
    setDepartments(res.data.map(d => ({ ...d, label: d.name, value: d._id })));
  };
  useEffect(() => {
    getAllDepartment();
  }, []);
  useEffect(() => {
    if (selectedSchedule.length > 0) {
      setDoctorsSchedule(selectedSchedule);
    }
  }, [selectedSchedule]);
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
    if (selectedDoctor) {
      dispatch(fetchScheduleByDoctorId(selectedDoctor?._id));
    }

    setState({
      ...state,
      doctorId: selectedDoctor.value,
      doctorName: selectedDoctor.label,
    });
  };
  function checkTime(fromTime, toTime, currentTime) {
    // let fromTime = '06:31 PM';
    // let toTime = '10:00 PM';

    console.log(timeDiff(toTime, fromTime), fromTime, toTime, currentTime);

    if (fromTime <= currentTime && currentTime <= toTime) {
      alert(`Time is between ${fromTime} and ${toTime}`);
    } else {
      alert(`Time is not between ${fromTime} and ${toTime}`);
    }
  }
  const handleDateChange = date => {
    const selectedAppointmentDate = Moment(date).format('yyyy-MM-DD hh:mm A');

    const day = Moment(date).format('dddd');
    const activeDotorSchedule = doctorsSchedule.filter(sc => sc.isActive);
    const filterDays = activeDotorSchedule.filter(sc => sc.day.dayName === day);
    console.log(filterDays);
    setDoctorsTime(filterDays.map(fd => ({ ...fd, isChecked: false })));
    const timeArr = filterDays.map(t => ({
      ...t,
      startTime: Moment(t.startTime).format('hh:mm:ss A'),
      endTime: Moment(t.endTime).format('hh:mm:ss A'),
    }));

    timeArr.forEach((val, idx, arr) => {
      var format = 'hh:mm:ss A';
      const fromTime = Moment(val.startTime, format);
      const endTime = Moment(val.endTime, format);
      const scheduleId = val._id;
      // var time = Moment('09:10:00 AM', format);
      const currentTime = Moment(selectedAppointmentDate).format('hh:mm:ss A');
      const modifiedCurrentTime = Moment(currentTime, format);

      if (
        modifiedCurrentTime.isBetween(fromTime, endTime) ||
        modifiedCurrentTime.isSame(fromTime) ||
        modifiedCurrentTime.isSame(endTime)
      ) {
        setState({ ...state, appointmentDate: selectedAppointmentDate, scheduleId: scheduleId });
        alert(`Time is between ${fromTime} To ${endTime}`);
      }
    });
    // const filterDay = activeDotorSchedule.find(sc => sc.day.dayName === day);

    // if (filterDay) {
    //   const fromTime = Moment(filterDay?.startTime).format('hh:mm A');
    //   const toTime = Moment(filterDay?.endTime).format('hh:mm A');
    //   const currentTime = Moment(selectedAppointmentDate).format('hh:mm A');
    //   checkTime(fromTime, toTime, currentTime);

    //   setState({ ...state, appointmentDate: selectedAppointmentDate, scheduleId: filterDay._id });
    // } else {
    //   alert('Doctor schedule not found!!!');
    // }
  };
  const handleChangeStartTime = (time, index) => {
    const _scheduleDetails = [...doctorsTime];
    const selectedISchedule = _scheduleDetails[index];
    console.log(selectedISchedule);
    var format = 'hh:mm:ss A';
    const fromTime = Moment(selectedISchedule.startTime).format('hh:mm:ss A');
    const endTime = Moment(selectedISchedule.endTime).format('hh:mm:ss A');
    const currentTime = Moment(time).format('hh:mm:ss A');
    const modifiedFTime = Moment(fromTime, format);
    const modifiedETime = Moment(endTime, format);
    const modifiedCurrentTime = Moment(currentTime, format);

    if (
      modifiedCurrentTime.isBetween(modifiedFTime, modifiedETime) ||
      modifiedCurrentTime.isSame(modifiedFTime) ||
      modifiedCurrentTime.isSame(modifiedETime)
    ) {
      const formatTime = Moment(time).format('yyyy-MM-DD hh:mm A');
      selectedISchedule.startTime = formatTime;
      _scheduleDetails[index] = selectedISchedule;
      setDoctorsTime(_scheduleDetails);
    } else {
      alert(`Time is not between ${modifiedFTime} To ${modifiedETime}`);
    }
  };

  const handleChangeEndTime = (time, index) => {
    const _scheduleDetails = [...doctorsTime];
    const selectedISchedule = _scheduleDetails[index];
    const formatTime = Moment(time).format('yyyy-MM-DD hh:mm A');

    selectedISchedule.endTime = formatTime;
    _scheduleDetails[index] = selectedISchedule;
    setDoctorsTime(_scheduleDetails);
  };

  const handleCheckChange = (e, index) => {
    const { checked } = e.target;
    const _scheduleDetails = [...doctorsTime];
    const isCheckedItem = _scheduleDetails.some(f => f.isChecked);
    console.log(checked, isCheckedItem);
    const selectedISchedule = _scheduleDetails[index];
    selectedISchedule.isChecked = !selectedISchedule.isChecked;
    if (!isCheckedItem && checked) {
      _scheduleDetails[index] = selectedISchedule;
      setDoctorsTime(_scheduleDetails);
    } else if (isCheckedItem && !checked) {
      _scheduleDetails[index] = selectedISchedule;
      setDoctorsTime(_scheduleDetails);
    }
  };
  const handleSubmit = async () => {
    const payload = {
      name: state.name,
      email: state.email,
      contactNo: state.contactNo,
      age: state.age,
      description: state.description,
      address: 'abc',
      department: state.departmentId,
      schedule: state.scheduleId,
      doctor: state.doctorId,
      appointmentDate: new Date(),
      isCancel: false,
      isVisited: false,
      isApproved: false,
    };
    console.log(JSON.stringify(payload, null, 2));
    if (payload.department) {
      const res = await axios.post(`http://localhost:7000/api/appointment`, payload);
      if (res.status === 200) {
        notify('success');
        history.goBack();
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
            <DateTimePicker
              fullWidth
              minDate={new Date()}
              size="small"
              format="yyyy-MM-DD hh:mm A"
              label="Appointment Date And Time"
              inputVariant="outlined"
              value={state.appointmentDate}
              onChange={handleDateChange}
            />
          </Grid>
          {doctorsTime?.length > 0 && (
            <Grid item xs={12} sm={12}>
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>From</TableCell>
                      <TableCell>To</TableCell>
                      <TableCell align="center"> Check</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {doctorsTime?.map((dac, index) => (
                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={dac._id}>
                        <TableCell>
                          {
                            <TimePicker
                              className={classes.textField}
                              id={`startTime${dac.startTime}`}
                              size="small"
                              format=" hh:mm A"
                              label="From"
                              inputVariant="outlined"
                              value={dac?.startTime}
                              onChange={time => handleChangeStartTime(time, index)}
                            />
                          }
                        </TableCell>
                        <TableCell>
                          {
                            <TimePicker
                              className={classes.textField}
                              size="small"
                              id="endTime"
                              format=" hh:mm A"
                              label="To"
                              inputVariant="outlined"
                              value={dac?.endTime}
                              disabled
                              onChange={time => handleChangeEndTime(time, index)}
                            />
                          }
                        </TableCell>
                        <TableCell align="center">
                          {
                            <Checkbox
                              variant="outlined"
                              name="isActive"
                              checked={dac?.isChecked}
                              onChange={e => handleCheckChange(e, index)}
                            />
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
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

export default AppointmentAddForm;
