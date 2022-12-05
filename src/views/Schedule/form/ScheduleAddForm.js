import GridContainer from '@jumbo/components/GridContainer';
import { notify } from '@jumbo/utils/commonHelper';
import { ddlDays } from '@jumbo/utils/enums';
import {
  Box,
  Button,
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
import { TimePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import Axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 5,
  },
  textField: {
    margin: theme.spacing(0),
    width: '100%',
  },
}));
const ScheduleAddForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [daysDropdown, setDaysDropdown] = useState(ddlDays);
  const [day, setDay] = useState(null);
  const [scheduleDetails, setScheduleDetails] = useState([]);
  const getAllDoctors = async () => {
    const res = await Axios.get('http://localhost:7000/api/doctor');
    setDoctors(res.data.map(d => ({ ...d, label: d.name, value: d._id })));
  };
  useEffect(() => {
    getAllDoctors();
  }, []);
  const handleChangeStartTime = time => {
    const formatTime = moment(time).format('yyyy-MM-DD hh:mm A');
    setStartTime(formatTime);
  };
  const handleChangeEndTime = time => {
    const formatTime = moment(time).format('yyyy-MM-DD hh:mm A');
    setEndTime(formatTime);
  };
  const handleChangeDoctor = e => {
    const selectedDoctor = doctors.find(dt => dt.value === e.target.value);
    setDoctor({
      ...doctor,
      doctorId: selectedDoctor.value,
      doctorName: selectedDoctor.label,
    });
  };
  const handleChangeDays = e => {
    const selectedDay = daysDropdown.find(dt => dt.value === e.target.value);
    setDay({
      ...day,
      dayId: selectedDay.value,
      dayName: selectedDay.label,
    });
  };
  const addSchedule = e => {
    e.preventDefault();
    const payload = {
      rowId: uuid,
      doctor: doctor?.doctorId,
      doctorName: doctor?.doctorName,
      day: {
        dayId: day?.dayId,
        dayName: day?.dayName,
      },
      startTime: startTime,
      endTime: endTime,
      isActive: false,
    };
    if (payload.doctor && payload.day.dayId && payload.startTime && payload.endTime) {
      setScheduleDetails([...scheduleDetails, payload]);
    }
  };

  const removeSchedule = schedule => {
    const _scheduleDetails = [...scheduleDetails];
    _scheduleDetails.splice(
      _scheduleDetails.findIndex(value => value.rowId === schedule.rowId),
      1,
    );
    setScheduleDetails(_scheduleDetails);
  };

  const handleSubmitSchedule = async e => {
    e.preventDefault();
    if (scheduleDetails.length > 0) {
      console.log(JSON.stringify(scheduleDetails, null, 2));

      const res = await Axios.post('http://localhost:7000/api/schedule', scheduleDetails);
      if (res.status === 200) {
        notify('success');
        handleCancel();
      }
    }
  };
  const handleCancel = () => {
    history.goBack();
  };
  return (
    <Box className={classes.root}>
      <Paper square elevation={1}>
        <Typography align="center">Add Schedule</Typography>
        <GridContainer style={{ padding: '20px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              className={classes.textField}
              id="doctorId"
              select
              label="Doctor"
              value={doctor?.doctorId}
              onChange={handleChangeDoctor}
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              className={classes.textField}
              id="dayId"
              select
              label="Days"
              value={day?.dayId}
              onChange={handleChangeDays}
              variant="outlined"
              size="small">
              <MenuItem value="">NONE</MenuItem>
              {daysDropdown.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TimePicker
              className={classes.textField}
              size="small"
              id="startTime"
              name="startTime"
              format="yyyy-MM-DD hh:mm A"
              label="From"
              inputVariant="outlined"
              value={startTime}
              onChange={handleChangeStartTime}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TimePicker
              className={classes.textField}
              size="small"
              format="yyyy-MM-DD hh:mm A"
              label="To"
              inputVariant="outlined"
              value={endTime}
              onChange={handleChangeEndTime}
            />
          </Grid>
          <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              variant="contained"
              color="primary"
              className="mr-1"
              type="submit"
              size="small"
              onClick={e => addSchedule(e)}>
              Add
            </Button>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Day</TableCell>
                    <TableCell>Doctor</TableCell>
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scheduleDetails?.map((dac, index) => (
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={index}>
                      <TableCell>{dac?.day?.dayName}</TableCell>
                      <TableCell>{dac?.doctorName}</TableCell>
                      <TableCell>{moment(dac?.startTime).format('hh:mm A')}</TableCell>
                      <TableCell>{moment(dac?.endTime).format('hh:mm A')}</TableCell>
                      {/* <TableCell>{dac?.endTime}</TableCell> */}
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          className="mr-1"
                          size="small"
                          onClick={() => removeSchedule(dac)}>
                          Delete
                        </Button>
                        {/* <Button variant="contained" color="secondary" size="small" onClick={() => {}}>
                          Cancel
                        </Button> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <DateTimePicker
              disablePast
              className={classes.textField}
              size="small"
              format="DD-MM-yyyy HH:mm A"
              label="To"
              inputVariant="outlined"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </Grid> */}
          {/* <Grid item xs={12} sm={6}>
            <TextField
              label={<IntlMessages id="appModule.name" />}
              fullWidth
              name="name"
              onChange={() => {}}
              value=""
              size="small"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={<IntlMessages id="appModule.email" />}
              fullWidth
              name="email"
              onChange={() => {}}
              value=""
              size="small"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              label="Contact No"
              fullWidth
              name="contactNo"
              onChange={() => {}}
              value=""
              size="small"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Grid> */}

          <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'end' }}>
            <Button variant="contained" color="primary" className="mr-1" size="small" onClick={handleSubmitSchedule}>
              Submit
            </Button>
            <Button variant="contained" color="secondary" size="small" onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
        </GridContainer>
      </Paper>
    </Box>
  );
};

export default ScheduleAddForm;
