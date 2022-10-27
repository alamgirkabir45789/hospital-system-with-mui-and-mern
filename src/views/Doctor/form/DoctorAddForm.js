import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import GridContainer from '@jumbo/components/GridContainer';
import { notify } from '@jumbo/utils/commonHelper';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
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
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
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

const ddlDays = [
  { label: 'Saterday', value: 'Saterday', isChecked: false },
  { label: 'Sunday', value: 'Sunday', isChecked: false },
  { label: 'Monday', value: 'Monday', isChecked: false },
  { label: 'Tuesday', value: 'Tuesday', isChecked: false },
  { label: 'Wednesday', value: 'Wednesday', isChecked: false },
  { label: 'Thusday', value: 'Thusday', isChecked: false },
  { label: 'Friday', value: 'Friday', isChecked: false },
];
const DoctorAddForm = () => {
  const classes = useStyles();
  const [firstNameError, setFirstNameError] = useState('');
  const [departments, setDepartments] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [isAllScheduleCheck, setIsAllScheduleCheck] = useState(false);

  const [daysDropdown, setDaysDropdown] = useState(ddlDays);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [selectedDaysAndSchedule, setSelectedDaysAndSchedule] = useState([]);

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
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
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
  const onChangeDays = e => {
    const selectedDays = ddlDays.find(dp => dp.value === e.target.value);
    setState({
      ...state,
      daysId: selectedDays.value,
      daysName: selectedDays.label,
    });
  };

  const onChangeAllScheduleCheck = e => {
    const { checked } = e.target;
    const _schedules = [...schedules];
    if (checked) {
      const checkAllSchedule = _schedules.map(sc => ({ ...sc, isChecked: checked }));
      setIsAllScheduleCheck(!isAllScheduleCheck);
      setSchedules(checkAllSchedule);
      const filteredData = checkAllSchedule.filter(f => f.isChecked);
      const selectedScheduleData = filteredData.map(sc => ({ scheduleId: sc._id, scheduleName: sc.startTime }));
      setState({
        ...state,
        schedule: selectedScheduleData,
      });
    } else if (!checked) {
      const unCheckedAll = _schedules.map(sc => ({ ...sc, isChecked: false }));
      setIsAllScheduleCheck(!isAllScheduleCheck);
      setSchedules(unCheckedAll);
      setState({
        ...state,
        schedule: [],
      });
    }
  };
  const handleAddDaysAndSchedule = e => {
    e.preventDefault();
    const payload = {
      daysId: state.daysId,
      daysName: state.daysName,
      schedule: state.schedule,
    };
    setSelectedDaysAndSchedule([...selectedDaysAndSchedule, payload]);
  };
  const onScheduleChange = (e, index) => {
    const { checked } = e.target;
    const _schedules = [...schedules];
    const checkedItem = _schedules[index];
    checkedItem.isChecked = checked;
    _schedules[index] = checkedItem;
    const isAllItemChecked = _schedules.every(e => e.isChecked);
    if (isAllItemChecked) {
      setIsAllScheduleCheck(!isAllScheduleCheck);
    } else {
      setIsAllScheduleCheck(false);
    }
    const checkedFilteredSchedule = _schedules.filter(sc => sc.isChecked);
    const selectedSchedule = checkedFilteredSchedule.map(i => ({ scheduleId: i._id, scheduleName: i.startTime }));
    setSchedules(_schedules);
    setState({
      ...state,
      schedule: selectedSchedule,
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
    setSchedules(res.data.map(d => ({ ...d, label: d.startTime, value: d._id, isChecked: false })));
  };
  useEffect(() => {
    getAllSchedule();
  }, []);
  const handleCheckSchedule = (e, index) => {
    console.log({ e, index });
  };
  const handleSubmit = async () => {
    const payload = {
      name: state.name,
      email: state.email,
      contactNo: state.contactNo,
      bmdcReg: state.bmdcReg,
      message: state.details,
      departmentName: state.departmentName,
      department: state.departmentId,
      //schedule: state.schedule,
      // days: state.days,
      // photo: state.photo,
      qualification: state.qualificationId,
      qualificationName: state.qualificationName,
      specialization: state.specializationId,
      specializationName: state.specializationName,
    };
    console.log(JSON.stringify(payload, null, 2));
    const flattenedSelectedDayAndSchedule = selectedDaysAndSchedule?.flat();
    const dayList = flattenedSelectedDayAndSchedule?.map(d => ({
      daysId: d.daysId,
      daysName: d.daysName,
      schedule: d.schedule.map(sc => ({ scheduleId: sc.scheduleId, scheduleName: sc.scheduleName })),
    }));
    const scheduleList = flattenedSelectedDayAndSchedule?.map(s =>
      s.schedule.map(s => ({
        scheduleId: s.scheduleId,
        scheduleName: s.scheduleName,
      })),
    );

    let form_data = new FormData();
    for (let key in payload) {
      form_data.append(key, payload[key]);
    }

    scheduleList.forEach((val, idx, arr) => {
      form_data.append('schedule[]', JSON.stringify(arr[idx]));
    });
    dayList.forEach((val, idx, arr) => {
      form_data.append('day[]', JSON.stringify(arr[idx]));
    });

    if (file) {
      form_data.append('photo', file, fileName);

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
            <Grid item xs={12} sm={6}>
              <input type="file" name="photo" id="photo" onChange={e => onFileChange(e)} />
              {/* <CmtAvatar size={40} src={profile_pic} /> */}
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
            {/* <Grid item xs={12} sm={6}>
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
          </Grid> */}
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
                helperText={firstNameError}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                className={classes.textField}
                id="specialization"
                select
                label="Days"
                value={state.daysId}
                onChange={e => {
                  onChangeDays(e);
                }}
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
            <Grid item xs={12} sm={12} container direction="row" justifyContent="flex-start" alignItems="center">
              {/* <Typography>Select Schedule</Typography> */}
              <FormControlLabel
                key="schedule"
                control={
                  <Checkbox
                    checked={isAllScheduleCheck}
                    name="checkedB"
                    color="primary"
                    onChange={e => onChangeAllScheduleCheck(e)}
                  />
                }
                label="Select All"
              />

              {schedules?.map((sc, index) => (
                <FormControlLabel
                  key={sc._id}
                  control={
                    <Checkbox
                      checked={sc.isChecked}
                      name="checkedB"
                      color="primary"
                      onChange={e => onScheduleChange(e, index)}
                    />
                  }
                  style={{ display: 'block' }}
                  label={`${sc.startTime}-${sc.endTime}`}
                />
              ))}
            </Grid>
            <Grid container direction="row" justifyContent="flex-end" alignItems="center">
              <Button variant="contained" color="primary" size="small" onClick={e => handleAddDaysAndSchedule(e)}>
                Add
              </Button>
            </Grid>

            <Grid item xs={12} sm={12}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Day</TableCell>
                      <TableCell>Schedule</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedDaysAndSchedule?.map((dac, index) => (
                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={index}>
                        <TableCell>{dac.daysName}</TableCell>
                        <TableCell>
                          {dac.schedule.map(sc => (
                            <Fragment key={sc.scheduleId}>
                              <span>{sc.scheduleName}</span>
                              <br></br>
                            </Fragment>
                          ))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={false} name="checkedB" color="primary" />}
                label="isActive"
                disabled
              />
            </Grid>
            <Grid item xs={6} sm={6}>
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
