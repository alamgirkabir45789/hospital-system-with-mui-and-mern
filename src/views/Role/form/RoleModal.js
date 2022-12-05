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
const RoleModal = ({ isOpenAddModal, setIsOpenAddModal, getAllRole, editRole }) => {
  const classes = useStyles();
  const [roleName, setRoleName] = useState('');
  const handleCloseModal = () => {
    setRoleName('');
    setIsOpenAddModal(!isOpenAddModal);
  };
  useEffect(() => {
    if (editRole?._id) {
      setRoleName(editRole.name);
    }
  }, [editRole._id, editRole.name]);

  const handleSubmitModal = async () => {
    if (editRole._id) {
      const res = await Axios.put(`http://localhost:7000/api/role/${editRole._id}`, { name: roleName });
      if (res.status === 200) {
        notify('success');
        handleCloseModal();
        getAllRole();
      }
    } else {
      const res = await Axios.post(`http://localhost:7000/api/role`, { name: roleName });
      if (res.status === 200) {
        notify('success');
        handleCloseModal();
        getAllRole();
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
            label="Role Name"
            fullWidth
            name="roleName"
            value={roleName}
            onChange={e => setRoleName(e.target.value)}
            size="small"
            variant="outlined"
            className={classes.textField}
          />
        </Grid>
      </Box>
    </CustomModal>
  );
};

export default RoleModal;
