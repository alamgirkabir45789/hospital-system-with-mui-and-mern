import GridContainer from '@jumbo/components/GridContainer';
import { FormControl, Grid, MenuItem, Select, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
const useStyles = makeStyles(theme => ({
  formControl: {
    marginRight: theme.spacing(2),
    minWidth: 120,
    fontWeight: 50,
  },
}));
const CustomPagination = ({ count, handleChangePage, rowsPerPage, handleChangeRowsPerPage }) => {
  const classes = useStyles();
  return (
    <GridContainer style={{ marginTop: '2px' }}>
      <Grid container item xs={4} sm={4} md={4} lg={4} justify="flex-start">
        <FormControl className={classes.formControl}>
          <Typography> Row Per Page : </Typography>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Select id="select-label-row" value={rowsPerPage} onChange={handleChangeRowsPerPage}>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid container item xs={8} sm={8} md={8} lg={8} justify="flex-end">
        <Pagination
          count={count}
          variant="outlined"
          color="primary"
          onChange={handleChangePage}
          showFirstButton
          showLastButton
        />
      </Grid>
    </GridContainer>
  );
};

export default CustomPagination;
