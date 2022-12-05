import GridContainer from '@jumbo/components/GridContainer';
import { notify } from '@jumbo/utils/commonHelper';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { Box, Button, Grid, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 5,
  },
}));
const UserEditForm = () => {
  const history = useHistory();
  const location = useLocation();
  const userId = location?.state?._id;
  const classes = useStyles();

  const [user, setUser] = useState();
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState();
  console.log(location);
  const getAllRole = async () => {
    const res = await axios.get('http://localhost:7000/api/role');

    const modifiedRoles = res?.data?.map(r => ({ ...r, value: r._id, label: r.name }));
    // const userRole = modifiedRoles?.find(ur => ur._id === roleId);
    // console.log(userRole);
    // setSelectedRole(userRole?.value);
    setRoles(modifiedRoles);
  };

  const getUserById = useCallback(async () => {
    if (userId) {
      const res = await axios.get(`http://localhost:7000/api/user/${userId}`);
      setUser(res.data);
    }
  }, [userId]);

  useEffect(() => {
    getAllRole();
  }, []);

  useEffect(() => {
    getUserById();
  }, [getUserById]);

  const onChangeRole = e => {
    const selectedRole = roles?.find(dp => dp?.value === e.target.value);
    setSelectedRole(selectedRole?.value);
  };
  const handleChangeUser = e => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async () => {
    const payload = {
      name: user?.name,
      email: user?.email,
      contactNo: user?.contactNo,
      role: selectedRole,
      // password:user?.password
    };
    console.log(JSON.stringify(payload, null, 2));
    if (payload.contactNo !== null && payload.email !== null && payload.role !== null) {
      const res = await axios.put(`http://localhost:7000/api/user/${userId}`, payload);
      if (res.status === 200) {
        notify('success');
        getUserById();
      }
    }
  };
  const handleCancel = () => {
    history.goBack();
  };
  return (
    <Box className={classes.root}>
      <Paper square elevation={1}>
        <Typography align="center">Edit User</Typography>
        <GridContainer style={{ padding: '20px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label={<IntlMessages id="appModule.name" />}
              fullWidth
              name="name"
              onChange={handleChangeUser}
              value={user?.name}
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
              onChange={handleChangeUser}
              value={user?.email}
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
              onChange={handleChangeUser}
              value={user?.contactNo}
              size="small"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              className={classes.textField}
              id="role"
              select
              label="Role"
              name="role"
              value={selectedRole}
              onChange={e => onChangeRole(e)}
              variant="outlined"
              size="small">
              <MenuItem value="">NONE</MenuItem>
              {roles?.map(option => (
                <MenuItem key={option?.value} value={option?.value}>
                  {option?.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* <Grid item xs={6} sm={6}>
            <FormControlLabel
              control={<Checkbox checked={false} name="checkedB" color="primary" onChange={() => {}} />}
              style={{ display: 'block' }}
              label="Permission"
            />
          </Grid> */}

          {/* <Grid item xs={12} sm={6}>
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
          </Grid> */}

          {/* <Grid item xs={12} sm={12}>
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
          </Grid> */}

          <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'end' }}>
            <Button variant="contained" color="primary" className="mr-1" size="small" onClick={handleSubmit}>
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

export default UserEditForm;
