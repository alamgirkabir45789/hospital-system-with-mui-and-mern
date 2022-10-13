import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles(theme => ({
  appHeader: {
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    backgroundColor: 'black',
    color: theme.palette.text.primary,
    boxShadow: '0 1px 8px -1px rgba(0,0,0,.2)',
    position: 'relative',
    zIndex: 99,
  },
}));

const CmtHeader = props => {
  const { children, className } = props;

  const classes = useStyles();

  return <div className={clsx(classes.appHeader, className, 'Cmt-header')}>{children}</div>;
};

export default CmtHeader;

CmtHeader.defaultProps = {
  name: 'Header',
};
