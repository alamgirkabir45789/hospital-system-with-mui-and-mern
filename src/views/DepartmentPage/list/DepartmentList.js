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
import React, { useEffect, useState } from 'react';
import DepartmentAddOrEditForm from '../form/DepartmentAddOrEditForm';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 5,
  },
  textField: {
    margin: theme.spacing(0),
  },
}));
const DepartmentList = () => {
  const classes = useStyles();
  const [departments, setDepartments] = useState([]);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [editDepartment, setEditDepartment] = useState('');
  const getAllDepartment = async () => {
    const res = await axios.get('http://localhost:7000/api/department');

    setDepartments(res?.data);
  };
  useEffect(() => {
    getAllDepartment();
  }, []);
  const handleAddModal = () => {
    setIsOpenAddModal(!isOpenAddModal);
  };
  const handleEditModalOpen = department => {
    setEditDepartment(department);
    setIsOpenAddModal(!isOpenAddModal);
  };
  const handleDeleteDepartment = async id => {
    if (id) {
      const res = await axios.delete(`http://localhost:7000/api/department/${id}`);
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
          Department List
        </Typography>
        <Box>
          <Button variant="contained" color="primary" size="small" className="ml-1 mb-2" onClick={handleAddModal}>
            Add
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">SL/No</TableCell>
                <TableCell align="center">Name</TableCell>

                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments?.map((ul, index) => (
                <TableRow key={ul._id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{ul.name}</TableCell>

                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className="mr-2"
                      onClick={() => handleEditModalOpen(ul)}>
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleDeleteDepartment(ul._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <DepartmentAddOrEditForm
          isOpenAddModal={isOpenAddModal}
          setIsOpenAddModal={setIsOpenAddModal}
          getAllDepartment={getAllDepartment}
          editDepartment={editDepartment}
        />
      </Paper>
    </Box>
  );
};

export default DepartmentList;
