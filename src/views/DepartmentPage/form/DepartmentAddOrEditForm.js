import { notify } from '@jumbo/utils/commonHelper';
import CustomModal from '@jumbo/utils/custom/CustomModal';
import { Box, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Axios from 'axios';
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
const DepartmentAddOrEditForm = ({ isOpenAddModal, setIsOpenAddModal, getAllDepartment, editDepartment }) => {
  const classes = useStyles();
  const [departmentName, setDepartmentName] = useState('');
  const handleCloseModal = () => {
    setDepartmentName('');
    setIsOpenAddModal(!isOpenAddModal);
  };
  console.log(editDepartment);
  useEffect(() => {
    if (editDepartment?._id) {
      setDepartmentName(editDepartment?.name);
    }
  }, [editDepartment._id, editDepartment.name]);

  const handleSubmitModal = async () => {
    if (editDepartment._id) {
      const res = await Axios.put(`http://localhost:7000/api/department/${editDepartment?._id}`, { name: departmentName });
      if (res.status === 200) {
        notify('success');
        handleCloseModal();
        getAllDepartment();
      }
    } else {
      const res = await Axios.post(`http://localhost:7000/api/department`, { name: departmentName });
      if (res.status === 200) {
        notify('success');
        handleCloseModal();
        getAllDepartment();
      }
    }
  };
  return (
    <CustomModal
      openModal={isOpenAddModal}
      title="Add Role"
      handleCloseModal={handleCloseModal}
      handleSubmitModal={handleSubmitModal}
      maxWidth="sm"
      fullWidth={true}>
      <Box className={classes.root}>
        <Grid item xs={12} sm={12}>
          <TextField
            label="Department Name"
            fullWidth
            name="departmentName"
            value={departmentName}
            onChange={e => setDepartmentName(e.target.value)}
            size="small"
            variant="outlined"
            className={classes.textField}
          />
        </Grid>
      </Box>
    </CustomModal>
  );
};

export default DepartmentAddOrEditForm;
