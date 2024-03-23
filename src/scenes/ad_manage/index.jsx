import {
  Box,
  Button,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItem,
  ListItemText,
  ListItemButton,
  IconButton,
  List,
} from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import TrafficIcon from "@mui/icons-material/Traffic";
import SendIcon from "@mui/icons-material/Send";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import { useTheme } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoIcon from '@mui/icons-material/Info';
import CheckIcon from "@mui/icons-material/Check";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Alert from "@mui/material/Alert";
import MyCalendar from "../../components/Calender";
const Ad_manage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);

  const [selectedTimeRanges, setSelectedTimeRanges] = useState([]); // Danh sách các khoảng thời gian đã chọn
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");

  const [alertOpen, setAlertOpen] = useState(false); // State để kiểm soát việc hiển thị của Alert

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDateChange = (date) => {
    const selectedDate = new Date(date);
    // Kiểm tra xem ngày đã được chọn trước đó chưa
    if (
      selectedDates.find(
        (existingDate) => existingDate.getTime() === selectedDate.getTime(),
      )
    ) {
      setAlertOpen(true); // Mở Alert khi ngày đã tồn tại
      setTimeout(() => {
        setAlertOpen(false); // Đóng Alert sau 2 giây
      }, 2000);
      return; // Không thêm ngày nếu đã tồn tại trong danh sách
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
    // Kiểm tra xem đã nhập đầy đủ thông tin hay chưa
    if (selectedStartTime && selectedEndTime) {
      // Thêm khoảng thời gian mới vào danh sách
      setSelectedTimeRanges((prevSelectedTimeRanges) => [
        ...prevSelectedTimeRanges,
        { startTime: selectedStartTime, endTime: selectedEndTime },
      ]);

      // Xóa các giá trị thời gian đã chọn để chuẩn bị cho lần thiết lập tiếp theo
      setSelectedStartTime("");
      setSelectedEndTime("");
    } else {
      // Hiển thị Alert nếu thông tin chưa được nhập đầy đủ
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
      <Box m="20px">
        <Header
          title="Advertising Management"
          subtitle="Welcome to Advertising Management"
        />
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap="20px">
          <Box
            gridColumn="span 1"
            backgroundColor={colors.primary[400]}
            borderRadius="10px"
            padding="20px"
            height="auto"
            display="flex"
            flexDirection="column"
          >
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

            {/* Dòng thứ hai: "Chọn video" và trường nhập dữ liệu */}
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

            {/* Dòng thứ ba */}

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

          {/* Phần 2 -------------------------------------*/}

          <Box
            gridColumn="span 1"
            backgroundColor={colors.primary[400]}
            borderRadius="10px"
            padding="20px"
            height="auto"
          >
            {/* Các thành phần trong phần 2 --------------------------------------------------------------*/}
            {/*Header----------------------*/}
            <Box marginBottom="20px" display="flex" alignItems="center" marginLeft="30%">
              <InfoIcon
                sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
              />
              <Typography variant="h4" marginRight="10px" paddingLeft="10px">
                <strong>Thông tin Smart Pole</strong>
              </Typography>

            </Box>

            {/*Tên smart pole-------------*/}
            <Box marginBottom="20px" display="flex" alignItems="center">
              <DriveFileRenameOutlineIcon
                sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
              />
              <Typography variant="h4" marginRight="10px" paddingLeft="10px">
                <strong>Tên Smart Pole:</strong>
              </Typography>

              <Typography variant="h4" marginRight="10px" paddingLeft="10px">
                <strong>Smart Pole 1</strong>
              </Typography>
            </Box>

            {/*Vị trí smart pole-------------*/}
            <Box marginBottom="20px" display="flex" alignItems="center">
              <LocationOnIcon
                sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
              />
              <Typography variant="h4" marginRight="10px" paddingLeft="10px">
                <strong>Tọa độ:</strong>
              </Typography>

              <Typography variant="h4" marginRight="10px" paddingLeft="10px">
                <strong>10.876463, 106.805594</strong>
              </Typography>
            </Box>

            {/*lịch chiếu*/}
            <Box marginBottom="20px" display="flex" alignItems="center">
              <CalendarMonthIcon
                sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
              />
              <Typography variant="h4" marginRight="10px" paddingLeft="10px">
                <strong>Lịch chiếu quảng cáo:</strong>
              </Typography>
            </Box>
            <MyCalendar themeColor={colors.primary[400]} /> {/* Sử dụng component MyCalendar */}


          </Box>
           {/* Hết phần 2 ----------------------------- */}

        </Box>
      </Box>
      {/* Hiển thị Alert nếu alertOpen là true */}
      {alertOpen && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="9999"
        >
          <Alert severity="error" onClose={() => setAlertOpen(false)}>
            Thời gian chưa được thiết lập đầy đủ!
          </Alert>
        </Box>
      )}
    </LocalizationProvider>
  );
};

export default Ad_manage;
