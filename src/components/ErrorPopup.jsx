import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ErrorIcon from '@mui/icons-material/Error';
export default function ErrorPopup({ open, handleClose, errorMessage }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { width: "30%", maxWidth: "100%" } }}
    >
        <DialogTitle sx={{ fontSize: "24px", fontWeight: "bold",color: "red", display: 'flex', alignItems: 'center'  }}>
          <ErrorIcon sx={{ marginRight: '8px' ,fontSize: '32px' }} /> Error
        </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{ fontSize: '20px' }}>
          {errorMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
