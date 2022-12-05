import { notify } from '@jumbo/utils/commonHelper';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import Moment from 'moment';
import React, { useEffect, useState } from 'react';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 5,
  },
  textField: {
    margin: theme.spacing(0),
  },
}));
const CancelAppointment = () => {
  const classes = useStyles();
  const [patients, setPatients] = useState([]);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [editDepartment, setEditDepartment] = useState('');
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(patients);
  const getAllPatient = async () => {
    const res = await axios.get(`http://localhost:7000/api/appointment`, { params: { isCancel: true } });

    setPatients(res?.data?.result);
  };
  useEffect(() => {
    getAllPatient();
  }, []);

  const handleEditModalOpen = department => {
    setEditDepartment(department);
    setIsOpenAddModal(!isOpenAddModal);
  };
  const handleDeletePatient = async id => {
    if (id) {
      const res = await axios.delete(`http://localhost:7000/api/appointment/${id}`);
      if (res.status === 200) {
        notify('success');
        getAllPatient();
      }
    }
  };
  const handleCheckChange = async (e, patient) => {
    const patientId = patient._id;
    const payload = { ...patient, isCancel: true };
    console.log(payload, patient);

    if (patientId) {
      const res = await axios.delete(`http://localhost:7000/api/appointment/${patientId}`);
      if (res.status === 200) {
        await axios.post(`http://localhost:7000/api/appointment`, payload);
        getAllPatient();
      }
    }
  };
  return (
    <Box className={classes.root}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">SL/No</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Contact No</TableCell>
              <TableCell align="center">Appointment Date</TableCell>
              <TableCell align="center">Doctor</TableCell>
              <TableCell align="center">Department</TableCell>
              <TableCell align="center">Status</TableCell>

              {/* <TableCell align="center">Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {patients?.map((ul, index) => (
              <TableRow key={ul._id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{ul.name}</TableCell>
                <TableCell align="center">{ul.age}</TableCell>
                <TableCell align="center">{ul.email}</TableCell>
                <TableCell align="center">{ul.contactNo}</TableCell>
                <TableCell align="center">{Moment(ul.appointmentDate).format('yyyy-MM-DD hh:mm A')}</TableCell>
                <TableCell align="center">{ul?.doctor?.name}</TableCell>{' '}
                <TableCell align="center">{ul?.department?.name}</TableCell>
                <TableCell align="center" style={{ color: 'red' }}>
                  {ul.isCancel ? 'Reject' : 'Pending'}
                </TableCell>
                {/* <TableCell align="center">
                  {
                    <Checkbox
                      variant="outlined"
                      name="isActive"
                      checked={ul?.isCancel}
                      onChange={e => handleCheckChange(e, ul)}
                    />
                  }
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CancelAppointment;
