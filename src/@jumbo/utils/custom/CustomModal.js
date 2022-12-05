import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@material-ui/core';
import React from 'react';
// const useStyles = makeStyles(theme => ({}));
const CustomModal = ({
  openModal,
  title,
  children,
  handleCloseModal,
  handleSubmitModal,
  submitText,
  fullWidth,
  maxWidth,
}) => {
  return (
    <Dialog open={openModal} fullWidth={fullWidth} maxWidth={maxWidth}>
      <DialogTitle style={{ color: 'black', fontWeight: 'bold' }}>{title}</DialogTitle>
      <Divider />
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button size="small" variant="outlined" color="primary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button size="small" variant="outlined" color="primary" onClick={handleSubmitModal}>
          {submitText ? submitText : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
