import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import TrafficIcon from '@mui/icons-material/Traffic';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckIcon from '@mui/icons-material/Check';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import CancelIcon from '@mui/icons-material/Cancel';
import { DatePicker, TimePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import SendIcon from "@mui/icons-material/Send";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function CustomDialog({ open, handleClose }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTimeRanges, setSelectedTimeRanges] = useState([]); 
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDateChange = (date) => {
    const selectedDate = new Date(date);
    if (
      selectedDates.find(
        (existingDate) => existingDate.getTime() === selectedDate.getTime(),
      )
    ) {
      setAlertOpen(true);
      setTimeout(() => {
        setAlertOpen(false);
      }, 2000);
      return;
    }
    setSelectedDates((prevSelectedDates) => [
      ...prevSelectedDates,
      selectedDate,
    ]);
  };

  const handleDeleteDate = (dateToDelete) => {
    setSelectedDates((prevSelectedDates) =>
      prevSelectedDates.filter((date) => date !== dateToDelete),
    );
  };

  const handleTimeRangeSetup = () => {
    if (selectedStartTime && selectedEndTime) {
      setSelectedTimeRanges((prevSelectedTimeRanges) => [
        ...prevSelectedTimeRanges,
        { startTime: selectedStartTime, endTime: selectedEndTime },
      ]);
      setSelectedStartTime("");
      setSelectedEndTime("");
    } else {
      setAlertOpen(true);
      setTimeout(() => {
        setAlertOpen(false);
      }, 2000);
    }
  };

  const handleDeleteTimeRange = (index) => {
    setSelectedTimeRanges((prevSelectedTimeRanges) =>
      prevSelectedTimeRanges.filter((_, i) => i !== index),
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Dialog onClose={handleClose} open={open}   PaperProps={{
    sx: {
      width: '80%', // Thiết lập chiều rộng mong muốn
      maxWidth: '80%' // Giới hạn chiều rộng tối đa nếu cần
    }
  }}>
      <DialogTitle id="customized-dialog-title" sx={{ fontSize: '24px', fontWeight: 'bold' }}>
        Chỉnh sửa lịch phát quảng cáo
      </DialogTitle>

      <DialogContent dividers>
        <Box
          gridColumn="span 1"
          backgroundColor={colors.primary[400]}
          borderRadius="10px"
          padding="20px"
          height="auto"
          display="flex"
          flexDirection="column"
        >
          {/* Dòng 1---------------------------------------------------------- */}
          
 

          {/* Dòng thứ hai: "Chọn video" và trường nhập dữ liệu --------------------------------------*/}


          {/* Dòng thứ ba -------------------------------------------------------------------*/}

   
          {/* Dòng thứ tư ----------------------------------------------------*/}

          {/* Dòng thứ năm ------------------------------------------------*/}


          {/* Dòng thứ sáu -------------------------------------------------*/}
  
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
            autoFocus onClick={handleClose}
            variant="contained"
            sx={{
              backgroundColor: colors.redAccent[600],
              color: "#fff",
              marginLeft: "20px",
              marginTop: "20px",
            }}
            endIcon={<CancelIcon />}
          >
            Hủy
          </Button>

          <Button
            autoFocus onClick={handleClose}
            variant="contained"
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: "#fff",
              marginLeft: "20px",
              marginTop: "20px",
            }}
            endIcon={<CheckIcon />}
          >
            Lưu thay đổi
          </Button>
          
      </DialogActions>
    </Dialog>
    </LocalizationProvider>
  );
}
