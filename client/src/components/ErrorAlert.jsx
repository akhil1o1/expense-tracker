import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle  } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

function ErrorAlert({showAlert, handleClose}) {
 
  return (
    <div>
      <Dialog
        open={showAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {<ErrorIcon className="error-icon"/>}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please fill the Expense details before Adding.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default ErrorAlert;