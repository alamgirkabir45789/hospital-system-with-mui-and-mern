import GridContainer from '@jumbo/components/GridContainer';
import { notify } from '@jumbo/utils/commonHelper';
import { ddlDays } from '@jumbo/utils/enums';
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
import { TimePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import Axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { v4 as uuid } from 'uuid';
import { fetchScheduleByDoctorId } from '../store/actions';
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
const ScheduleEditForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const scheduleInfo = history.location.state;
  const doctorId = history.location.state?.doctor?._id;
  const {
    scheduleReducer: { selectedSchedule },
  } = useSelector(scheduleReducer => scheduleReducer);
  const [scheduleDetails, setScheduleDetails] = useState([]);
  const [daysDropdown, setDaysDropdown] = useState(ddlDays);
  const [day, setDay] = useState(null);
  console.log(scheduleDetails);

  useEffect(() => {
    if (doctorId) {
      dispatch(fetchScheduleByDoctorId(doctorId));
    }
  }, [dispatch, doctorId]);
  useEffect(() => {
    if (selectedSchedule.length > 0) {
      setScheduleDetails(selectedSchedule);
    }
  }, [selectedSchedule]);

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
      doctor: doctorId,
      day: {
        dayId: day?.dayId,
        dayName: day?.dayName,
      },
      startTime: new Date(),
      endTime: new Date(),
      isActive: false,
    };
    if (payload.doctor && payload.day.dayId && payload.startTime && payload.endTime) {
      setScheduleDetails([...scheduleDetails, payload]);
    }
  };

  const handleCheckChange = (e, index) => {
    const _scheduleDetails = [...scheduleDetails];
    const selectedISchedule = _scheduleDetails[index];
    selectedISchedule.isActive = !selectedISchedule.isActive;
    _scheduleDetails[index] = selectedISchedule;
    setScheduleDetails(_scheduleDetails);
  };

  const handleChangeStartTime = (time, index) => {
    const _scheduleDetails = [...scheduleDetails];
    const selectedISchedule = _scheduleDetails[index];
    const formatTime = moment(time).format('yyyy-MM-DD hh:mm A');
    selectedISchedule.startTime = formatTime;
    _scheduleDetails[index] = selectedISchedule;

    setScheduleDetails(_scheduleDetails);
  };

  const handleChangeEndTime = (time, index) => {
    const _scheduleDetails = [...scheduleDetails];
    const selectedISchedule = _scheduleDetails[index];
    const formatTime = moment(time).format('yyyy-MM-DD hh:mm A');

    selectedISchedule.endTime = formatTime;
    _scheduleDetails[index] = selectedISchedule;
    setScheduleDetails(_scheduleDetails);
  };

  const handleSubmitSchedule = async e => {
    e.preventDefault();
    if (scheduleDetails.length > 0) {
      console.log(JSON.stringify(scheduleDetails, null, 2));

      const res = await Axios.delete(`http://localhost:7000/api/schedule/doctors/${doctorId}`);
      if (res.status === 200) {
        const res = await Axios.post(`http://localhost:7000/api/schedule`, scheduleDetails);
        if (res.status === 200) {
          notify('success');
          handleCancel();
        }
      }
    }
  };
  const handleCancel = () => {
    history.goBack();
  };
  return (
    <Box className={classes.root}>
      <Paper square elevation={1}>
        <Typography align="center">Edit Schedule</Typography>
        <GridContainer style={{ padding: '20px' }}>
          <Grid item xs={5} sm={5}>
            <Typography className="">Doctor:{scheduleInfo?.doctor?.name}</Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
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
          <Grid item xs={1} sm={1}>
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
                    {/* <TableCell>Doctor</TableCell> */}
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                    <TableCell align="center">Is Active</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scheduleDetails?.map((dac, index) => (
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={dac._id}>
                      <TableCell>{dac?.day?.dayName}</TableCell>

                      <TableCell>
                        {
                          <TimePicker
                            className={classes.textField}
                            id={`startTime${dac.startTime}`}
                            size="small"
                            format="yyyy-MM-DD hh:mm A"
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
                            format="yyyy-MM-DD hh:mm A"
                            label="To"
                            inputVariant="outlined"
                            value={dac?.endTime}
                            onChange={time => handleChangeEndTime(time, index)}
                          />
                        }
                      </TableCell>
                      <TableCell align="center">
                        {
                          <Checkbox
                            variant="outlined"
                            name="isActive"
                            checked={dac?.isActive}
                            onChange={e => handleCheckChange(e, index)}
                            // onChange={e => {
                            //   setRepresentative({ ...representative, isActive: e.target.checked });
                            // }}
                          />
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

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

export default ScheduleEditForm;
