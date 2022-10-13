import { Box } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import { AuhMethods } from '../../../../services/auth';
import { CurrentAuthMethod } from '../../../constants/AppConstants';

const useStyles = makeStyles(theme => ({
  profileRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 20,
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 2,
      zIndex: 1,
      height: 35,
      width: 1,
      backgroundColor: alpha(theme.palette.common.dark, 0.15),
    },
  },
}));

const UserDropDown = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const actionsList = [
    {
      icon: <PersonIcon />,
      label: 'Account',
    },
    {
      icon: <ExitToAppIcon />,
      label: authUser ? 'Logout' : 'Login',
    },
  ];
  const onItemClick = item => {
    if (item.label === 'Logout') {
      dispatch(AuhMethods[CurrentAuthMethod].onLogout());
    }
    if (item.label === 'Login') {
      history.push('/signin');
    }
    if (item.label === 'Account') {
      history.push('/signup');
    }
  };

  return (
    <Box className={clsx(classes.profileRoot, 'Cmt-profile-pic')}>
      <CmtDropdownMenu
        onItemClick={onItemClick}
        TriggerComponent={<CmtAvatar size="small" src={'https://via.placeholder.com/150'} />}
        items={actionsList}
      />
    </Box>
  );
};

export default UserDropDown;
