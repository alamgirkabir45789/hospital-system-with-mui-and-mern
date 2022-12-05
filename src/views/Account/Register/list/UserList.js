import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { deleteUser, fetchAllUsers } from '../store/actions/action';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 5,
  },
  textField: {
    margin: theme.spacing(0),
  },
}));
const UserList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    userReducer: { users },
  } = useSelector(userReducer => userReducer);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  useEffect(() => {
    if (users.length > 0) {
      setUserList(users);
    }
  }, [dispatch, users]);

  const handleDeleteUser = user => {
    dispatch(deleteUser(user._id));
  };

  return (
    <Box className={classes.root}>
      <Paper square elevation={3}>
        <Typography align="center" className="mb-5">
          User List
        </Typography>
        <Box>
          <Button variant="contained" color="primary" size="small" className="ml-1 mb-2">
            <NavLink to="/signup" style={{ color: 'white' }}>
              Add
            </NavLink>
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact No</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Permissions</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList?.map(ul => (
                <TableRow key={ul._id}>
                  <TableCell>{ul.name}</TableCell>
                  <TableCell>{ul.email}</TableCell>
                  <TableCell>{ul.contactNo}</TableCell>
                  <TableCell>{ul?.role?.name}</TableCell>
                  <TableCell>Permissions</TableCell>
                  <TableCell>
                    <Link to={{ pathname: '/user/edit-user', state: ul }}>
                      <Button variant="contained" color="primary" size="small" className="mr-2">
                        Edit
                      </Button>
                    </Link>
                    <Button variant="contained" color="secondary" size="small" onClick={() => handleDeleteUser(ul)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default UserList;
