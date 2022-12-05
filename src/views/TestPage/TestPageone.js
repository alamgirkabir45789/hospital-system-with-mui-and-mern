import GridContainer from '@jumbo/components/GridContainer';
import { notify } from '@jumbo/utils/commonHelper';
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { TimePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import Axios from 'axios';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

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
  const scheduleInfo = history.location.state;
  const scheduleId = history.location.state._id;

  const [scheduleDetails, setScheduleDetails] = useState(null);
  console.log(scheduleDetails);

  const getScheduleByDoctorId = useCallback(async () => {
    const res = await Axios.get(`http://localhost:7000/api/schedule/${scheduleId}`);
    console.log(res.data);
    setScheduleDetails(res.data);
  }, [scheduleId]);
  // const getScheduleByDoctorId = useCallback(async () => {
  //   const res = await Axios.get(`http://localhost:7000/api/schedule/doctor/${doctorId}`);
  //   setScheduleDetails(res.data);
  // }, [doctorId]);

  useEffect(() => {
    getScheduleByDoctorId();
  }, [getScheduleByDoctorId]);

  const handleCheckChange = e => {
    const _scheduleDetails = { ...scheduleDetails };
    _scheduleDetails.isActive = !_scheduleDetails.isActive;
    setScheduleDetails(_scheduleDetails);
  };
  const handleChangeEndTime = time => {
    const _scheduleDetails = { ...scheduleDetails };
    _scheduleDetails.isActive = !_scheduleDetails.isActive;
    const formatTime = moment(time).format('DD-MM-yyyy hh:mm A');
    _scheduleDetails.endTime = formatTime;
    setScheduleDetails(_scheduleDetails);
  };
  const handleChangeStartTime = time => {
    const _scheduleDetails = { ...scheduleDetails };
    _scheduleDetails.isActive = !_scheduleDetails.isActive;
    const formatTime = moment(time).format('DD-MM-yyyy hh:mm A');
    _scheduleDetails.startTime = formatTime;
    setScheduleDetails(_scheduleDetails);
  };

  const handleSubmitSchedule = async e => {
    e.preventDefault();
    if (scheduleDetails.startTime && scheduleDetails.endTime) {
      console.log(JSON.stringify(scheduleDetails, null, 2));

      const res = await Axios.put(`http://localhost:7000/api/schedule/${scheduleId}`, scheduleDetails);
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
        <Typography align="center">Edit Schedule</Typography>
        <GridContainer style={{ padding: '20px' }}>
          <Grid item xs={12} sm={6}>
            <Typography className="mb-1">Doctor:{scheduleInfo?.doctor?.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography className="mb-1">Day:{scheduleInfo?.day?.dayName}</Typography>
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
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{scheduleDetails?.day?.dayName}</TableCell>
                    {/* <TableCell>{dac?.doctorName}</TableCell> */}
                    <TableCell>
                      {
                        <TimePicker
                          className={classes.textField}
                          size="small"
                          format=" hh:mm A"
                          label="From"
                          inputVariant="outlined"
                          value={scheduleDetails?.startTime}
                          onChange={time => handleChangeStartTime(time)}
                        />
                      }
                    </TableCell>
                    <TableCell>
                      {
                        <TimePicker
                          className={classes.textField}
                          size="small"
                          format=" hh:mm A"
                          label="To"
                          inputVariant="outlined"
                          value={scheduleDetails?.endTime}
                          onChange={time => handleChangeEndTime(time)}
                        />
                      }
                    </TableCell>
                    <TableCell align="center">
                      {
                        <Checkbox
                          variant="outlined"
                          name="isActive"
                          checked={scheduleDetails?.isActive ? true : false}
                          onChange={e => handleCheckChange(e)}
                        />
                      }
                    </TableCell>
                  </TableRow>
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
