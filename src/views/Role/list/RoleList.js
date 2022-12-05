import { notify } from '@jumbo/utils/commonHelper';
import Custompagination from '@jumbo/utils/custom/CustomPagination';
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RoleModal from '../form/RoleModal';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 5,
  },
  textField: {
    margin: theme.spacing(0),
  },
}));
const RoleList = () => {
  const classes = useStyles();
  const [roles, setRoles] = useState([]);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [editRole, setEditRole] = useState('');
  const [rowPerPage, setRowPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [sortData, setSortData] = useState(false);
  const [sort, setSort] = useState(true);
  const handleChangePage = (event, pageNumber) => {
    setCurrentPage(pageNumber - 1);
    setRowPerPage(rowPerPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowPerPage(parseInt(event.target.value));
    setCurrentPage(currentPage);
  };
  const handleSearch = event => {
    setSearch(event.target.value);
  };
  const ChangeArrow = event => {
    setSortData(!sortData);
    setSort(!sort);
  };

  const getAllRole = async () => {
    console.log('render');
    const res = await axios.get('http://localhost:7000/api/role', {
      params: { perPage: rowPerPage, page: currentPage, key: search, sort: sort },
    });

    setTotal(res?.data.totalRecords);
    setRoles(res?.data.data);
  };

  useEffect(() => {
    getAllRole();
  }, [rowPerPage, currentPage, search, sort]);
  const handleAddModal = () => {
    setIsOpenAddModal(!isOpenAddModal);
  };
  const handleEditModalOpen = role => {
    setEditRole(role);
    setIsOpenAddModal(!isOpenAddModal);
  };
  const handleDeleteRole = async id => {
    if (id) {
      const res = await axios.delete(`http://localhost:7000/api/role/${id}`);
      if (res.status === 200) {
        notify('success');
        getAllRole();
      }
    }
  };
  return (
    <Box className={classes.root}>
      <Paper square elevation={3} style={{ padding: '15px' }}>
        <Typography align="center" className="mb-5">
          Role List
        </Typography>
        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid item xs={4}>
            <Button variant="contained" color="primary" size="small" className="ml-1 mb-2" onClick={handleAddModal}>
              Add
            </Button>
          </Grid>
          <Grid item xs={5}>
            <TextField
              label="Search"
              fullWidth
              name="roleName"
              value={search}
              onChange={e => handleSearch(e)}
              size="small"
              variant="outlined"
              className={`${classes.textField} mb-2`}
            />
          </Grid>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <span>Name</span>
                  <span className={`cursor-pointer`} onClick={ChangeArrow}>
                    {sortData ? (
                      <ArrowUpward style={{ height: '1rem', paddingLeft: '5px' }} />
                    ) : (
                      <ArrowDownward style={{ height: '1rem', paddingLeft: '5px' }} />
                    )}
                  </span>
                </TableCell>

                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles?.map(ul => (
                <TableRow key={ul._id}>
                  <TableCell>{ul.name}</TableCell>

                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className="mr-2"
                      onClick={() => handleEditModalOpen(ul)}>
                      Edit
                    </Button>

                    <Button variant="contained" color="secondary" size="small" onClick={() => handleDeleteRole(ul._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow></TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <Custompagination
          // colSpan={0}
          count={Number(Math.ceil(total / rowPerPage))}
          rowsPerPage={rowPerPage}
          page={currentPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <RoleModal
          isOpenAddModal={isOpenAddModal}
          setIsOpenAddModal={setIsOpenAddModal}
          getAllRole={getAllRole}
          editRole={editRole}
        />
      </Paper>
    </Box>
  );
};

export default RoleList;
