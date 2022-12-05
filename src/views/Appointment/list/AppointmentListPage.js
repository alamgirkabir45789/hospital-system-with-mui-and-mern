import { notify } from '@jumbo/utils/commonHelper';
import { AppBar, Box, Button, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ApprovedAppointList from './ApprovedAppointList';
import CancelAppointment from './CancelAppointment';
import TestList from './TestList';
import VisitedPatientListPage from './VisitedPatientListPage';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 5,
  },
  textField: {
    margin: theme.spacing(0),
  },
}));
const AppointmentListPage = () => {
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
    const res = await axios.get('http://localhost:7000/api/appointment');

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
  return (
    <Box className={classes.root}>
      <Paper square elevation={3}>
        <Typography align="center" className="mb-5">
          Patient List
        </Typography>
        <Box>
          <Button variant="contained" color="primary" size="small" className="ml-1 mb-2">
            <NavLink to="/appointment/new-appointment" style={{ color: 'white' }}>
              Add
            </NavLink>
          </Button>
        </Box>
        <Box>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Pending" {...a11yProps(0)} />
              <Tab label="Approved" {...a11yProps(1)} />
              <Tab label="Visited" {...a11yProps(2)} />
              <Tab label="Rejected" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <TestList />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ApprovedAppointList />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <VisitedPatientListPage />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <CancelAppointment />
          </TabPanel>
        </Box>
      </Paper>
    </Box>
  );
};

export default AppointmentListPage;
