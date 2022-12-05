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
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 5,
  },
  textField: {
    margin: theme.spacing(0),
  },
}));
const ScheduleList = () => {
  const classes = useStyles();
  const [schedule, setSchedule] = useState([]);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  const getAllDepartment = async () => {
    const res = await axios.get('http://localhost:7000/api/schedule');
    setSchedule(res?.data?.result);
  };
  useEffect(() => {
    getAllDepartment();
  }, []);
  const handleAddModal = () => {
    setIsOpenAddModal(!isOpenAddModal);
  };

  const handleDeleteSchedule = async id => {
    if (id) {
      const res = await axios.delete(`http://localhost:7000/api/schedule/${id}`);
      if (res.status === 200) {
        notify('success');
        getAllDepartment();
      }
    }
  };
  return (
    <Box className={classes.root}>
      <Paper square elevation={3}>
        <Typography align="center" className="mb-5">
          Schedule List
        </Typography>
        <Box>
          <Button variant="contained" color="primary" size="small" className="ml-1 mb-2" onClick={handleAddModal}>
            <Link to={{ pathname: '/schedule/new-schedule' }} style={{ color: 'white' }}>
              Add
            </Link>
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">SL/No</TableCell>
                <TableCell align="center">Doctor</TableCell>
                <TableCell align="center">Day</TableCell>
                <TableCell align="center">Start Time</TableCell>
                <TableCell align="center">End Time</TableCell>
                <TableCell align="center">Is Active</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule?.map((ul, index) => (
                <TableRow key={ul._id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{ul?.doctor?.name}</TableCell>
                  <TableCell align="center">{ul?.day?.dayName}</TableCell>
                  <TableCell align="center">{moment(ul?.startTime).format('hh:mm A')}</TableCell>
                  <TableCell align="center">{moment(ul?.endTime).format('hh:mm A')}</TableCell>
                  <TableCell align="center">{ul?.isActive ? 'Active' : 'InActive'}</TableCell>

                  <TableCell align="center">
                    <Link to={{ pathname: '/schedule/edit-schedule', state: ul }} style={{ color: 'white' }}>
                      <Button variant="contained" color="primary" size="small">
                        Edit
                      </Button>
                    </Link>

                    <Button variant="contained" color="secondary" size="small" onClick={() => handleDeleteSchedule(ul?._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <DepartmentAddOrEditForm
          isOpenAddModal={isOpenAddModal}
          setIsOpenAddModal={setIsOpenAddModal}
          getAllDepartment={getAllDepartment}
          editDepartment={editDepartment}
        /> */}
      </Paper>
    </Box>
  );
};

export default ScheduleList;
