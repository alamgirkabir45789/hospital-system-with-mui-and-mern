import CmtAvatar from '@coremat/CmtAvatar';
import AppSelectBox from '@jumbo/components/Common/formElements/AppSelectBox';
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
const DoctorAddForm = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [departments, setDepartments] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [department, setDepartment] = useState('');
  const [profile_pic, setProfile_pic] = useState('');

  const [state, setState] = useState({
    departmentName: '',
    departmentId: '',
    scheduleId: [],
    scheduleName: [],
  });
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setProfile_pic(URL.createObjectURL(acceptedFiles[0]));
    },
  });
  console.log(state);

  const onChangeDepartment = e => {
    const selectedDepartment = departments.find(dp => dp.value === e.target.value);
    setState({
      ...state,
      departmentId: selectedDepartment.value,
      departmentName: selectedDepartment.label,
    });
  };

  const onScheduleChange = e => {
    // const selectedSchedule = schedules.find(dp => dp.value === e.target.value);

    const targetValue = e.target.value;
    console.log(targetValue);
    // console.log(selectedSchedule);
    setState({
      ...state,
      scheduleId: targetValue.value,
      scheduleName: targetValue.label,
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
              value={firstName}
              onChange={e => {
                setFirstName(e.target.value);
                setFirstNameError('');
              }}
              helperText={firstNameError}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <AppTextInput
              fullWidth
              variant="outlined"
              label="Email"
              value={firstName}
              onChange={e => {
                setFirstName(e.target.value);
                setFirstNameError('');
              }}
              helperText={firstNameError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              fullWidth
              variant="outlined"
              label="Contact No"
              value={firstName}
              onChange={e => {
                setFirstName(e.target.value);
                setFirstNameError('');
              }}
              helperText={firstNameError}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <AppTextInput
              fullWidth
              variant="outlined"
              label="BMDC Reg"
              value={firstName}
              onChange={e => {
                setFirstName(e.target.value);
                setFirstNameError('');
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
              SelectProps={{
                multiple: true,
                value: [],
                onChange: onScheduleChange,
              }}
              variant="outlined"
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
            <AppSelectBox
              fullWidth
              data={ddlItem}
              label="Degree"
              valueKey="slug"
              variant="outlined"
              labelKey="title"
              value={department}
              onChange={e => onChangeDepartment(e)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppSelectBox
              fullWidth
              data={ddlItem}
              label="Specialization"
              valueKey="slug"
              variant="outlined"
              labelKey="title"
              value={department}
              onChange={e => onChangeDepartment(e)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <AppTextInput
              fullWidth
              variant="outlined"
              label="Description"
              multiline
              value={firstName}
              onChange={e => {
                setFirstName(e.target.value);
                setFirstNameError('');
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
            <Button variant="contained" color="primary" size="small">
              Submit
            </Button>
          </Grid>
        </GridContainer>
      </Paper>
    </Box>
  );
};

export default DoctorAddForm;
