import AppSelectBox from '@jumbo/components/Common/formElements/AppSelectBox';
import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import GridContainer from '@jumbo/components/GridContainer';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 5,
  },
}));
const ddlItem = [
  { title: 'Home', slug: 'home' },
  { title: 'Office', slug: 'office' },
  { title: 'Other', slug: 'other' },
];
const Appointment = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [department, setDepartment] = useState('');
  const onChangeDepartment = e => {
    setDepartment(e.target.value);
  };
  return (
    <Box className={classes.root}>
      <Paper square elevation={1}>
        <Typography align="center">Make Appointment</Typography>
        <GridContainer style={{ padding: '20px' }}>
          <Grid item xs={12} sm={6}>
            <AppSelectBox
              fullWidth
              data={ddlItem}
              label="Department"
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
              label="Doctor"
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
              label="Age"
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
          <Grid item xs={12} sm={12}>
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
          <Grid item alignItems="center">
            <Button variant="contained" color="primary" size="small">
              Submit
            </Button>
          </Grid>
        </GridContainer>
      </Paper>
    </Box>
  );
};

export default Appointment;
