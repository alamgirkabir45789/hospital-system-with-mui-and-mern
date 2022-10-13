import { Box, Button, Divider } from '@material-ui/core';
import CachedIcon from '@material-ui/icons/Cached';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useHistory } from 'react-router';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  loginSection: {
    display: 'flex',
    alignItems: 'center',
    '& > .MuiDivider-root': {
      height: 14,
      marginLeft: 8,
      marginRight: 8,
      backgroundColor: theme.palette.text.secondary,
    },
  },
}));

const HeaderLogin = () => {
  const history = useHistory();
  const classes = useStyles();
  const handleNavigateToLogin = () => {
    history.push('/signin');
  };
  const handleNavigateToRegister = () => {
    history.push('/signup');
  };
  return (
    <div className={classes.root}>
      <Box display="flex" alignItems="center" color="warning.main">
        <CachedIcon fontSize="small" />
        <div className="ml-3">This is primary alert-check it out!</div>
      </Box>
      <div className={classes.loginSection}>
        <Button className="Cmt-btn" size="small" onClick={handleNavigateToLogin}>
          Login
        </Button>
        <Divider className="Cmt-divider" orientation="vertical" />
        <Button className="Cmt-btn" size="small" onClick={handleNavigateToRegister}>
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default HeaderLogin;
