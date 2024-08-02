import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircularProgress from '@mui/material/CircularProgress';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import {
    Box,
    Typography,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
  } from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
export default function  LogChannel({ open, handleClose}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { width: "90%", maxWidth: "100%", height:"90%" } }}
    >
        <DialogTitle sx={{ fontSize: "24px", fontWeight: "bold",color: "rgb(116, 165, 138)", display: 'flex', alignItems: 'center'  }}>
          <EditNoteIcon from sx={{ marginRight: '8px' ,fontSize: '32px' }} /> Log Channel
        </DialogTitle>

      <DialogContent  dividers>


      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}