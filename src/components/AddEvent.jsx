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
import { DatePicker, TimePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import SendIcon from "@mui/icons-material/Send";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function AddEvent({ open, handleClose }) {
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
          
          <Box marginBottom="20px" display="flex" alignItems="center">
            <TrafficIcon
              sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
            />
            <Typography variant="h4" marginRight="10px" paddingLeft="10px">
              <strong>Chọn smart pole</strong>
            </Typography>
            <TextField
              label="Smart Pole 1"
              variant="outlined"
              sx={{ width: "300px" }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.greenAccent[600],
                color: "#fff",
                marginLeft: "20px",
              }}
              endIcon={<SendIcon />}
            >
              Chọn
            </Button>
          </Box>

          <Box>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Danh sách các Smart Pole đã chọn</Typography>
              </AccordionSummary>
            </Accordion>
          </Box>

          {/* Dòng thứ hai: "Chọn video" và trường nhập dữ liệu --------------------------------------*/}

          <Box
            marginBottom="20px"
            marginTop="20px"
            display="flex"
            alignItems="center"
          >
            <OndemandVideoIcon
              sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
            />
            <Typography variant="h4" marginRight="10px" paddingLeft="10px">
              <strong>Chọn quảng cáo</strong>
            </Typography>
            <TextField
              id="outlined-basic"
              label="Video upload"
              variant="outlined"
              value={selectedFile ? selectedFile.name : ""}
            />
            <Button
              variant="contained"
              component="label"
              sx={{
                backgroundColor: colors.greenAccent[600],
                color: "#fff",
                marginLeft: "20px",
              }}
              endIcon={<UploadFileIcon />}
            >
              <Typography variant="body1">Upload here</Typography>
              <input
                type="file"
                accept="video/*"
                hidden
                onChange={handleFileChange}
              />
            </Button>
          </Box>

          {/* Dòng thứ ba -------------------------------------------------------------------*/}

          <Box marginBottom="20px" display="flex" alignItems="center">
            <CalendarMonthIcon
              sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
            />
            <Typography variant="h4" marginRight="10px" paddingLeft="10px">
              <strong>Thiết lập ngày</strong>
            </Typography>
            <DatePicker
              sx={{ width: "150px" }}
              onChange={handleDateChange}
              renderInput={(props) => <TextField {...props} />}
            />
          </Box>

          {/* Dòng thứ tư */}

          <Box>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Danh sách các ngày đã chọn</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {selectedDates.map((date) => (
                    <ListItem key={date} disablePadding>
                      <ListItemButton>
                        <ListItemText primary={date.toLocaleDateString()} />
                        <IconButton onClick={() => handleDeleteDate(date)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* Dòng thứ năm */}
          <Box
            marginBottom="20px"
            display="flex"
            alignItems="center"
            marginTop="20px"
          >
            <AccessTimeIcon
              sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
            />
            <Typography variant="h4" marginRight="10px" paddingLeft="10px">
              <strong>Thiết lập giờ</strong>
            </Typography>
            <TimePicker
              label="Thời gian bắt đầu"
              value={selectedStartTime}
              onChange={(newValue) => setSelectedStartTime(newValue)}
              sx={{ marginRight: "20px", width: "150px" }}
            />
            <TimePicker
              label="Thời gian kết thúc"
              value={selectedEndTime}
              onChange={(newValue) => setSelectedEndTime(newValue)}
              sx={{ marginRight: "5px", width: "150px" }}
            />
            <Button
              variant="contained"
              onClick={handleTimeRangeSetup}
              sx={{
                backgroundColor: colors.greenAccent[600],
                color: "#fff",
                marginLeft: "20px",
              }}
              endIcon={<CheckIcon />}
            >
              Thiết lập
            </Button>
          </Box>

          {/* Dòng thứ sáu */}
          <Box>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Danh sách khoảng thời gian đã chọn</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {selectedTimeRanges.map((timeRange, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton>
                        <ListItemText
                          primary={`${timeRange.startTime} - ${timeRange.endTime}`}
                        />
                        <IconButton
                          onClick={() => handleDeleteTimeRange(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* Nút xác nhận */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: "#fff",
              marginLeft: "20px",
              marginTop: "20px",
            }}
            endIcon={<SettingsApplicationsIcon />}
          >
            Xác nhận
          </Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
    </LocalizationProvider>
  );
}
