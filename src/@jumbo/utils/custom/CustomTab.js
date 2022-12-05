import GridContainer from '@jumbo/components/GridContainer';
import { Grid, Paper, Tab, Tabs } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import DoctorList from 'views/DoctorPage/list/DoctorList';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3} textAlign="justify">
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 5,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    minHeight: 250,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    minWidth: '200px',
  },
  tabpanel: {
    minHeight: '250px',
    width: '100%',
    overflow: 'auto',
  },
}));

const CustomTab = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper className={classes.root} square elevation={5}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}>
        <Tab label="Medicine" {...a11yProps(0)} />
        <Tab label="Surgery" {...a11yProps(1)} />
        <Tab label="Gynaecology" {...a11yProps(2)} />
        <Tab label="Paediatrics" {...a11yProps(3)} />
        <Tab label="OrthoPaedics" {...a11yProps(4)} />
        <Tab label="ENT" {...a11yProps(5)} />
        <Tab label="Eye" {...a11yProps(6)} />
      </Tabs>

      <TabPanel value={value} index={0} className={classes.tabpanel}>
        <GridContainer>
          <Grid item className="bg-dark border-1" xs={12}>
            <DoctorList value={value} />
          </Grid>
        </GridContainer>
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tabpanel}>
        <DoctorList value={value} />
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.tabpanel}>
        <DoctorList value={value} />
      </TabPanel>
      <TabPanel value={value} index={3} className={classes.tabpanel}>
        <DoctorList value={value} />
      </TabPanel>
      <TabPanel value={value} index={4} className={classes.tabpanel}>
        <DoctorList value={value} />
      </TabPanel>
      <TabPanel value={value} index={5} className={classes.tabpanel}>
        <DoctorList value={value} />
      </TabPanel>
    </Paper>
  );
};

export default CustomTab;
