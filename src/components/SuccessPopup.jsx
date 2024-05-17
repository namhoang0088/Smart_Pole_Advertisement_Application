import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
export default function SuccessPopup({ open, handleClose}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { width: "30%", maxWidth: "100%" } }}
    >
        <DialogTitle sx={{ fontSize: "24px", fontWeight: "bold",color: "green", display: 'flex', alignItems: 'center'  }}>
          <CheckCircleIcon from sx={{ marginRight: '8px' ,fontSize: '32px' }} /> Success
        </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{ fontSize: '20px' }}>
          Add Scheduler is success
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
