import CmtAvatar from '@coremat/CmtAvatar';
import { notify } from '@jumbo/utils/commonHelper';
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
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { fetchAllDoctors } from '../store/actions';
const test = 'http://localhost:7000/images/';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 5,
  },
  textField: {
    margin: theme.spacing(0),
  },
  avator: {
    border: 'solid 2px',
    borderColor: '#C6C6C6',
  },
}));
const DoctorsListPage = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const {
    doctorReducer: { doctors },
  } = useSelector(doctorReducer => doctorReducer);
  const [doctorList, setDoctorList] = useState([]);
  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, [dispatch]);
  useEffect(() => {
    if (doctors.length > 0) {
      setDoctorList(doctors);
    }
  }, [dispatch, doctors]);

  const handleDeleteDoctor = async doctor => {
    const res = await Axios.delete(`http://localhost:7000/api/doctor/${doctor._id}`);
    if (res.status === 200) {
      notify('success');
      dispatch(fetchAllDoctors());
    }
  };
  return (
    <Box className={classes.root}>
      <Paper square elevation={3}>
        <Typography align="center" className="mb-5">
          User List
        </Typography>
        <Box>
          <Button variant="contained" color="primary" size="small" className="ml-1 mb-2">
            <NavLink to="/doctor/new-doctor" style={{ color: 'white' }}>
              Add
            </NavLink>
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Picture</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact No</TableCell>
                <TableCell>BMDC Reg</TableCell>
                <TableCell>Qualification</TableCell>

                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctorList?.map(dc => (
                <TableRow key={dc._id}>
                  <TableCell>
                    <CmtAvatar className={classes.avator} size={50} src={`${test}${dc?.photo}`} />
                  </TableCell>
                  <TableCell>{dc.name}</TableCell>
                  <TableCell>{dc.email}</TableCell>
                  <TableCell>{dc.contactNo}</TableCell>
                  <TableCell>{dc.bmdcReg}</TableCell>
                  <TableCell>{dc.qualification}</TableCell>

                  <TableCell>
                    <Link to={{ pathname: '/doctor/edit-doctor', state: dc }}>
                      <Button variant="contained" color="primary" size="small" className="mr-2">
                        Edit
                      </Button>
                    </Link>
                    <Button variant="contained" color="secondary" size="small" onClick={() => handleDeleteDoctor(dc)}>
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

export default DoctorsListPage;
