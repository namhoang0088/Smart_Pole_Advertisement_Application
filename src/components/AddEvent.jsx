import React, { useState, useEffect, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import TrafficIcon from "@mui/icons-material/Traffic";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

import CancelIcon from "@mui/icons-material/Cancel";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
  DateTimePicker,
} from "@mui/x-date-pickers";
import InfoIcon from "@mui/icons-material/Info";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import SendIcon from "@mui/icons-material/Send";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ReactPlayer from "react-player";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { MuiColorInput } from "mui-color-input";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Collapse from "@mui/material/Collapse";
import ListItemIcon from "@mui/material/ListItemIcon";
import StarBorder from "@mui/icons-material/StarBorder";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InboxIcon from "@mui/icons-material/Inbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import dayjs from "dayjs";
import ToggleDays from "./ToggleDay";
import AddIcon from "@mui/icons-material/Add";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import DateRangeIcon from "@mui/icons-material/DateRange";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";

export default function AddEvent({ open, handleClose }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedFile, setSelectedFile] = useState(null);
  const [color, setColor] = useState("#ffffff");
  const [openDay, setOpenDay] = useState(true);
  const [openWeek, setOpenWeek] = useState(true);
  const [openFlex, setOpenFlex] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleChange = (color) => {
    setColor(color);
  };

  const handleClickWeek = () => {
    setOpenWeek(!openWeek);
  };

  const handleClickDay = () => {
    setOpenDay(!openDay);
  };

  const handleClickFlex = () => {
    setOpenFlex(!openFlex);
  };
//-----------------------------------------------------------------------------------------------------------------------------------------
  const [timeStartDailyArray, setTimeStartDailyArray] = useState([]);
  const [timeEndDailyArray, setTimeEndDailyArray] = useState([]);
  const [contentDailyArray, setContentDailyArray] = useState([]);
  const [timeBeginDailyArray, setTimeBeginDailyArray] = useState([]);
  const [timeUntilDailyArray, setTimeUntilDailyArray] = useState([]);
  const [durationDailyArray, setDurationDailyArray] = useState([]);
  
  const [timeStartWeeklyArray, setTimeStartWeeklyArray] = useState([]);
  const [timeEndWeeklyArray, setTimeEndWeeklyArray] = useState([]);
  const [lableOfScheduler,setLableOfScheduler] =  useState(null); 
  //thêm lịch chiếu-----Daily----------------begin-------------------------------
  const [dayBoxes, setDayBoxes] = useState([]);
  const [boxDailyIdCounter, setBoxDailyIdCounter] = useState(0);
  const handleAddDayBox = () => {
    // Tạo một Box mới
    setBoxDailyIdCounter((prevCounter) => prevCounter + 1);
    console.log(boxDailyIdCounter);
    const newBox = (
      <Box
        key={`daily${boxDailyIdCounter}`}
        marginTop="10px"
        marginBottom="20px"
        padding="20px 10px 10px 10px"
        flexDirection="column"
        alignItems="center"
        backgroundColor={colors.grey[900]}
        borderRadius="10px"
      >
        <Box marginBottom="20px">
          <Box display="flex" alignItems="center">
            <TimePicker
              label="Thời gian bắt đầu"
              onChange={(newTime) => {
                const hours = newTime.$d.getHours().toString().padStart(2, "0");
                const minutes = newTime.$d
                  .getMinutes()
                  .toString()
                  .padStart(2, "0");
                const formattedTime = `${hours}:${minutes}`;
                console.log("Giá trị mới: ", formattedTime);
                onChangeTimeStartDaily(
                  formattedTime,
                  boxDailyIdCounter.toString(),
                );
              }}
            />
            <span
              style={{
                fontSize: "1.5em",
                margin: "0 10px",
              }}
            >
              -
            </span>
            <TimePicker
              label="Thời gian kết thúc"
              onChange={(newTime) => {
                const hours = newTime.$d.getHours().toString().padStart(2, "0");
                const minutes = newTime.$d
                  .getMinutes()
                  .toString()
                  .padStart(2, "0");
                const formattedTime = `${hours}:${minutes}`;
                console.log("Giá trị mới: ", formattedTime);
                onChangeTimeEndDaily(
                  formattedTime,
                  boxDailyIdCounter.toString(),
                );
              }}
            />
          </Box>

          <Box
            marginBottom="30px"
            marginTop="20px"
            display="flex"
            alignItems="center"
          >
            <ChangeCircleIcon sx={{ color: "#4cceac", fontSize: "36px" }} />
            <Typography variant="h5" marginRight="10px" paddingLeft="10px">
              <strong>Thay đổi nội dung</strong>
            </Typography>
            <Autocomplete
              sx={{ width: 300 }}
              multiple
              id="list-pole-autocomplete"
              onChange={(event, newValue) => {
                setSelectedOptions(newValue);
                onChangeContentDaily(newValue, boxDailyIdCounter.toString());
              }}
              options={
                dataVideo && dataVideo["Video name"]
                  ? dataVideo["Video name"]
                  : []
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Chọn nội dung"
                />
              )}
            />

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#757575",
                color: "#fff",
                marginLeft: "20px",
                display: "flex",
                alignItems: "center",
                padding: "5px",
              }}
            >
              <DeleteForeverIcon />
            </Button>
          </Box>

          <Box marginBottom="20px" display="flex" alignItems="center">
            <HourglassEmptyIcon sx={{ color: "#4cceac", fontSize: "36px" }} />
            <Typography variant="h5" marginRight="10px" paddingLeft="10px">
              <strong>Hiệu lực từ</strong>
            </Typography>
            <DatePicker label="Ngày bắt đầy"
  onChange={(newDate) => {
    const month = (newDate.$M + 1).toString().padStart(2, "0"); // Lấy tháng và thêm 1 vì tháng bắt đầu từ 0
    const day = newDate.$D.toString().padStart(2, "0"); // Lấy ngày
    const year = newDate.$y; // Lấy năm
    const formattedDate = `${month}/${day}/${year}`;
    onChangeTimeBeginDaily(formattedDate,boxDailyIdCounter.toString(),);
  }}
      
            />
            <span
              style={{
                fontSize: "1.5em",
                margin: "0 10px",
              }}
            >
              {" "}
              -{" "}
            </span>
            <DatePicker label="Ngày kết thúc" 
                onChange={(newDate) => {
    const month = (newDate.$M + 1).toString().padStart(2, "0"); // Lấy tháng và thêm 1 vì tháng bắt đầu từ 0
    const day = newDate.$D.toString().padStart(2, "0"); // Lấy ngày
    const year = newDate.$y; // Lấy năm
    const formattedDate = `${month}/${day}/${year}`;
    onChangeTimeUntilDaily(formattedDate,boxDailyIdCounter.toString(),);
  }}
            />
          </Box>

          <Box marginBottom="20px" display="flex" alignItems="center">
            <EventRepeatIcon sx={{ color: "#4cceac", fontSize: "36px" }} />
            <Typography variant="h5" marginRight="10px" paddingLeft="10px">
              <strong>Chu kỳ lặp</strong>
            </Typography>
            <TextField
              label="Số ngày"
              variant="outlined"
              sx={{ width: "300px" }}

              onChange={(event) => {
    const newValue = event.target.value;
    onChangeDurationDaily(newValue, boxDailyIdCounter) ;
  }}
            />
          </Box>
        </Box>
      </Box>
    );
    // Thêm Box mới vào danh sách
    setDayBoxes([...dayBoxes, newBox]);
  };
  //thêm lịch chiếu-----Daily------------------end---------------------
  //thêm lịch chiếu-----weekly----------------begin-------------------------------
  const [weekBoxes, setWeekBoxes] = useState([]);
  let boxWeeklyIdCounter = 0;
  const handleAddWeekBox = () => {
    boxWeeklyIdCounter++;
    // Tạo một Box mới
    const newBox = (
      <Box
        key={`weekly${boxWeeklyIdCounter}`}
        marginTop="10px"
        marginBottom="20px"
        padding="20px 10px 10px 10px"
        flexDirection="column"
        alignItems="center"
        backgroundColor={colors.grey[900]}
        borderRadius="10px"
      >
        <Box marginBottom="20px">
          <Box display="flex" alignItems="center">
            <TimePicker label="Thời gian bắt đầu" />
            <span
              style={{
                fontSize: "1.5em",
                margin: "0 10px",
              }}
            >
              -
            </span>
            <TimePicker label="Thời gian kết thúc" />
          </Box>

          <Box
            marginBottom="30px"
            marginTop="20px"
            display="flex"
            alignItems="center"
          >
            <ChangeCircleIcon sx={{ color: "#4cceac", fontSize: "36px" }} />
            <Typography variant="h5" marginRight="10px" paddingLeft="10px">
              <strong>Thay đổi nội dung</strong>
            </Typography>
            <Autocomplete
              sx={{ width: 300 }}
              multiple
              id="list-pole-autocomplete"
              onChange={(event, newValue) => {
                setSelectedOptions(newValue);
              }}
              options={
                dataVideo && dataVideo["Video name"]
                  ? dataVideo["Video name"]
                  : []
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Chọn nội dung"
                />
              )}
            />

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#757575",
                color: "#fff",
                marginLeft: "20px",
                display: "flex",
                alignItems: "center",
                padding: "5px",
              }}
            >
              <DeleteForeverIcon />
            </Button>
          </Box>

          <Box marginBottom="20px" display="flex" alignItems="center">
            <DateRangeIcon sx={{ color: "#4cceac", fontSize: "36px" }} />
            <Typography variant="h5" marginRight="10px" paddingLeft="10px">
              <strong>Các ngày trong tuần</strong>
            </Typography>

            <ToggleDays
              onChange={(newValue) => {
                // Xử lý giá trị mới tại đây nếu cần
                console.log(newValue);
              }}
            />
          </Box>

          <Box marginBottom="20px" display="flex" alignItems="center">
            <HourglassEmptyIcon sx={{ color: "#4cceac", fontSize: "36px" }} />
            <Typography variant="h5" marginRight="10px" paddingLeft="10px">
              <strong>Hiệu lực từ</strong>
            </Typography>
            <DatePicker label="Ngày bắt đầy" />
            <span
              style={{
                fontSize: "1.5em",
                margin: "0 10px",
              }}
            >
              {" "}
              -{" "}
            </span>
            <DatePicker label="Ngày kết thúc" />
          </Box>
        </Box>
      </Box>
    );
    // Thêm Box mới vào danh sách
    setWeekBoxes([...weekBoxes, newBox]);
  };
  //thêm lịch chiếu-----weekly------------------end---------------------
  //thêm lịch chiếu------onetime-----------------begin---------------
  const [oneTimeBoxes, setOneTimeBoxes] = useState([]);
  let boxOnetimeIdCounter = 0;
  const handleAddOneTimeBox = () => {
    boxOnetimeIdCounter++;
    // Tạo một Box mới
    const newBox = (
      <Box
        key={`onetime${boxOnetimeIdCounter}`}
        marginTop="10px"
        marginBottom="20px"
        padding="20px 10px 10px 10px"
        flexDirection="column"
        alignItems="center"
        backgroundColor={colors.grey[900]}
        borderRadius="10px"
      >
        <Box marginBottom="20px">
          <Box display="flex" alignItems="center">
            <TimePicker label="Thời gian bắt đầu" />
            <span
              style={{
                fontSize: "1.5em",
                margin: "0 10px",
              }}
            >
              -
            </span>
            <TimePicker label="Thời gian kết thúc" />
          </Box>

          <Box
            marginBottom="30px"
            marginTop="20px"
            display="flex"
            alignItems="center"
          >
            <ChangeCircleIcon sx={{ color: "#4cceac", fontSize: "36px" }} />
            <Typography variant="h5" marginRight="10px" paddingLeft="10px">
              <strong>Thay đổi nội dung</strong>
            </Typography>
            <Autocomplete
              sx={{ width: 300 }}
              multiple
              id="list-pole-autocomplete"
              onChange={(event, newValue) => {
                setSelectedOptions(newValue);
              }}
              options={
                dataVideo && dataVideo["Video name"]
                  ? dataVideo["Video name"]
                  : []
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Chọn nội dung"
                />
              )}
            />

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#757575",
                color: "#fff",
                marginLeft: "20px",
                display: "flex",
                alignItems: "center",
                padding: "5px",
              }}
            >
              <DeleteForeverIcon />
            </Button>
          </Box>

          <Box marginBottom="20px" display="flex" alignItems="center">
            <HourglassEmptyIcon sx={{ color: "#4cceac", fontSize: "36px" }} />
            <Typography variant="h5" marginRight="10px" paddingLeft="10px">
              <strong>Hiệu lực từ</strong>
            </Typography>
            <DatePicker label="Ngày bắt đầy" />
          </Box>
        </Box>
      </Box>
    );
    // Thêm Box mới vào danh sách
    setOneTimeBoxes([...oneTimeBoxes, newBox]);
  };
  //thêm lịch chiếu--------onetime-----------------end--------------

  // mở danh sách video để thiết lập nội dung cho quảng cáo ---------------end--------------
  const [dataVideo, setDataVideo] = useState([]); // Khai báo biến dataVideo
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseVideo = await fetch("http://localhost:5000/get/video");

        if (!responseVideo.ok) {
          throw new Error("Network response video was not ok");
        }

        const dataVideo = await responseVideo.json();
        // console.log("nammmmmmmmmmmmmmmmmmmmmmmmmmm", dataVideo); // In dữ liệu nhận được ra console

        setDataVideo(dataVideo); // Cập nhật giá trị cho biến dataVideo
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //gửi dữ liệu lập lịch------------------------------------begin--------------------------

  // Hàm lưu giá trị thời gian
  const onChangeTimeStartDaily = (formattedTime, boxDailyIdCounter) => {
    const label = "dailyTimeStart" + boxDailyIdCounter;
    setTimeStartDailyArray((prevArray) => {
      const index = prevArray.findIndex((item) => item.label === label);
      if (index !== -1) {
        // If label exists, update the value
        return prevArray.map((item, idx) =>
          idx === index ? { ...item, value: formattedTime } : item,
        );
      } else {
        // If label doesn't exist, add a new item
        return [...prevArray, { label: label, value: formattedTime }];
      }
    });
  };

  const onChangeTimeEndDaily = (formattedTime, boxDailyIdCounter) => {
    const label = "dailyTimeEnd" + boxDailyIdCounter;
    setTimeEndDailyArray((prevArray) => {
      const index = prevArray.findIndex((item) => item.label === label);
      if (index !== -1) {
        // If label exists, update the value
        return prevArray.map((item, idx) =>
          idx === index ? { ...item, value: formattedTime } : item,
        );
      } else {
        // If label doesn't exist, add a new item
        return [...prevArray, { label: label, value: formattedTime }];
      }
    });
  };

  const onChangeContentDaily = (newValue, boxDailyIdCounter) => {
    const label = "dailyContent" + boxDailyIdCounter;
    setContentDailyArray((prevArray) => {
      const index = prevArray.findIndex((item) => item.label === label);
      if (index !== -1) {
        // Nếu nhãn đã tồn tại, cập nhật giá trị
        return prevArray.map((item, idx) =>
          idx === index ? { ...item, value: newValue } : item,
        );
      } else {
        // Nếu nhãn không tồn tại, thêm một mục mới
        return [...prevArray, { label: label, value: newValue }];
      }
    });
  };

  const onChangeTimeBeginDaily = (newTime, boxDailyIdCounter) => {
    const label = "dailyTimeBegin" + boxDailyIdCounter;
    setTimeBeginDailyArray((prevArray) => {
      const index = prevArray.findIndex((item) => item.label === label);
      if (index !== -1) {
        // Nếu nhãn đã tồn tại, cập nhật giá trị
        return prevArray.map((item, idx) =>
          idx === index ? { ...item, value: newTime } : item
        );
      } else {
        // Nếu nhãn không tồn tại, thêm một mục mới
        return [...prevArray, { label: label, value: newTime }];
      }
    });
  };

  const onChangeTimeUntilDaily = (newTime, boxDailyIdCounter) => {
    const label = "dailyTimeUntil" + boxDailyIdCounter;
    setTimeUntilDailyArray((prevArray) => {
      const index = prevArray.findIndex((item) => item.label === label);
      if (index !== -1) {
        // Nếu nhãn đã tồn tại, cập nhật giá trị
        return prevArray.map((item, idx) =>
          idx === index ? { ...item, value: newTime } : item
        );
      } else {
        // Nếu nhãn không tồn tại, thêm một mục mới
        return [...prevArray, { label: label, value: newTime }];
      }
    });
  };

  const onChangeDurationDaily = (newValue, boxDailyIdCounter) => {
    const label = `dailyDuration${boxDailyIdCounter}`;
    setDurationDailyArray((prevArray) => {
      const index = prevArray.findIndex((item) => item.label === label);
      if (index !== -1) {
        // Nếu nhãn đã tồn tại, cập nhật giá trị
        return prevArray.map((item, idx) =>
          idx === index ? { ...item, value: newValue } : item
        );
      } else {
        // Nếu nhãn không tồn tại, thêm một mục mới
        return [...prevArray, { label: label, value: newValue }];
      }
    });
  };

  const handleSubmit = async () => {
    for (let i = 0; i < timeStartDailyArray.length; i++) {
      const startTime = timeStartDailyArray[i].value; // Thời gian bắt đầu
      const endTime = timeEndDailyArray[i].value; // Thời gian kết thúc
      const list = contentDailyArray[i].value.join(','); // Danh sách nội dung
      const duration = durationDailyArray[i].value; // Độ dài
      const startDateParts = timeBeginDailyArray[i].value.split('/'); // Tách ngày, tháng và năm
      const startDate = `${startDateParts[2]}-${startDateParts[0]}-${startDateParts[1]}`; // Định dạng lại theo yyyy-mm-dd

      const untilParts = timeUntilDailyArray[i].value.split('/'); // Tách ngày, tháng và năm
      const until = `${untilParts[2]}-${untilParts[0]}-${untilParts[1]}`; // Định dạng lại theo yyyy-mm-dd
      const label = lableOfScheduler; // Nhãn
  
      // Tạo đường dẫn API
      const url = `http://localhost:5000//schedule/addTask/daily?list=${list}&duration=${duration}&starttime=${startTime}&endtime=${endTime}&startdate=${startDate}&until=${until}&lable=${label}`;
      console.log(url)
      // Gửi yêu cầu API
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          // body: JSON.stringify(payload) // Nếu cần gửi dữ liệu cụ thể, hãy thêm vào đây
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log('Response data:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleSave = async () => {
    try {
      await handleSubmit(); // Gọi hàm để xử lý việc gửi API
      console.log('API requests sent successfully');
      // Thêm logic xử lý sau khi gửi API thành công nếu cần
    } catch (error) {
      console.error('Error while sending API requests:', error);
      // Thêm logic xử lý khi gặp lỗi khi gửi API nếu cần
    }
    handleClose();
  };

  //gửi dữ liệu lập lịch------------------------------------end--------------------------

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{ sx: { width: "60%", maxWidth: "80%" } }}
      >
        <DialogTitle
          id="customized-dialog-title"
          sx={{ fontSize: "24px", fontWeight: "bold" }}
        >
          Thêm quảng cáo
        </DialogTitle>
        <DialogContent dividers>
          <Box
            gridColumn="span 1"
            backgroundColor="#f2f0f0"
            borderRadius="10px"
            padding="20px"
            height="auto"
            display="flex"
            flexDirection="column"
          >
            {/* Dòng 1---------------------------------------------------------- */}
            <Box marginBottom="20px" display="flex" alignItems="center">
              <InfoIcon sx={{ color: "#4cceac", fontSize: "36px" }} />
              <Typography variant="h4" marginRight="10px" paddingLeft="10px">
                <strong>Tên quảng cáo</strong>
              </Typography>
              <TextField
                label="Đổi tên quảng cáo"
                variant="outlined"
                onChange={(event) => {
        const newValue = event.target.value;
        setLableOfScheduler(newValue); // Cập nhật giá trị của labelOfScheduler
      }}
                sx={{ width: "300px" }} 
              />
            </Box>

            {/* Dòng thứ hai -------------------------------------------------------------------*/}

            {/* Dòng thứ ba ----------------------------------------------------*/}
            <Box marginBottom="30px" display="flex" alignItems="center">
              <ColorLensIcon sx={{ color: "#4cceac", fontSize: "36px" }} />
              <Typography variant="h4" marginRight="10px" paddingLeft="10px">
                <strong>Màu hiển thị trên lịch </strong>
              </Typography>
              <MuiColorInput value={color} onChange={handleChange} />
            </Box>

            {/* Dòng thứ tư ------------------------------------------------*/}
            <Box marginBottom="20px" display="flex" alignItems="center">
              <AccessTimeIcon sx={{ color: "#4cceac", fontSize: "36px" }} />
              <Typography variant="h4" marginRight="10px" paddingLeft="10px">
                <strong>Lịch chiếu</strong>
              </Typography>

              {/* Box con--------------begin---------------------*/}
              <Box
                marginBottom="20px"
                flexDirection="column"
                alignItems="center"
                backgroundColor="#ffffff"
                borderRadius="10px"
                flex="1"
                height="auto"
                padding="20px"
              >
                {/* lặp lại hằng ngày ------------begin---------------*/}
                <Box
                  marginBottom="20px"
                  flexDirection="column"
                  alignItems="center"
                >
                  <ListItemButton onClick={handleClickDay}>
                    <ListItemIcon>
                      <img
                        src="/assets/day.png"
                        alt="Day Icon"
                        style={{
                          width: "36px",
                          height: "36px",
                          marginRight: "10px",
                        }}
                      />
                      <Typography
                        variant="h4"
                        marginRight="10px"
                        paddingLeft="10px"
                      >
                        <strong>Lặp lại hằng ngày</strong>
                      </Typography>
                    </ListItemIcon>
                    {openDay ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openDay} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {/*nội dung trong collapse của lặp lại hằng ngày---------------begin--------------*/}

                      {/* Thêm box để nhập khi click vào thêm lịch chiếu */}
                      {dayBoxes.map((box, index) => (
                        <React.Fragment key={index}>{box}</React.Fragment>
                      ))}

                      {/*nội dung trong collapse của lặp lại hằng ngày---------------end --------------*/}
                      <Button
                        onClick={handleAddDayBox}
                        variant="outlined"
                        sx={{ marginLeft: "200px" }}
                        startIcon={<AddIcon />}
                      >
                        Thêm lịch chiếu
                      </Button>
                    </List>
                  </Collapse>
                </Box>
                {/* lặp lại hằng ngày ------------end---------------*/}

                {/* lặp lại hằng tuần ------------begin---------------*/}
                <Box
                  marginBottom="20px"
                  flexDirection="column"
                  alignItems="center"
                >
                  <ListItemButton onClick={handleClickWeek}>
                    <ListItemIcon>
                      <img
                        src="/assets/week.png"
                        alt="Day Icon"
                        style={{
                          width: "36px",
                          height: "36px",
                          marginRight: "10px",
                        }}
                      />
                      <Typography
                        variant="h4"
                        marginRight="10px"
                        paddingLeft="10px"
                      >
                        <strong>Lặp lại hằng tuần</strong>
                      </Typography>
                    </ListItemIcon>
                    {openWeek ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openWeek} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {weekBoxes.map((box, index) => (
                        <React.Fragment key={index}>{box}</React.Fragment>
                      ))}

                      <Button
                        onClick={handleAddWeekBox}
                        variant="outlined"
                        sx={{ marginLeft: "200px" }}
                        startIcon={<AddIcon />}
                      >
                        Thêm lịch chiếu
                      </Button>
                    </List>
                  </Collapse>
                </Box>
                {/* lặp lại tuần ------------end---------------*/}

                {/* lịch chiếu linh hoạt ------------begin---------------*/}
                <Box
                  marginBottom="20px"
                  flexDirection="column"
                  alignItems="center"
                >
                  <ListItemButton onClick={handleClickFlex}>
                    <ListItemIcon>
                      <img
                        src="/assets/flex.png"
                        alt="Day Icon"
                        style={{
                          width: "36px",
                          height: "36px",
                          marginRight: "10px",
                        }}
                      />
                      <Typography
                        variant="h4"
                        marginRight="10px"
                        paddingLeft="10px"
                      >
                        <strong>Lịch chiếu linh hoạt</strong>
                      </Typography>
                    </ListItemIcon>
                    {openFlex ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openFlex} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {oneTimeBoxes.map((box, index) => (
                        <React.Fragment key={index}>{box}</React.Fragment>
                      ))}

                      <Button
                        onClick={handleAddOneTimeBox}
                        variant="outlined"
                        sx={{ marginLeft: "200px" }}
                        startIcon={<AddIcon />}
                      >
                        Thêm lịch chiếu
                      </Button>
                    </List>
                  </Collapse>
                </Box>
                {/* lịch chiếu linh hoạt ------------end---------------*/}
              </Box>
              {/* Box con--------------end---------------------*/}
            </Box>
            {/* Dòng thứ sáu -------------------------------------------------*/}
          </Box>
        </DialogContent>
        {/* Hết dialog content--------------------------------------------------*/}
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            variant="contained"
            sx={{
              backgroundColor: "#757575",
              color: "#fff",
              marginLeft: "20px",
              marginTop: "20px",
            }}
            endIcon={<DeleteForeverIcon />}
          >
            Xóa quảng cáo
          </Button>
          <Button
            autoFocus
            onClick={handleClose}
            variant="contained"
            sx={{
              backgroundColor: "#e57373",
              color: "#fff",
              marginLeft: "20px",
              marginTop: "20px",
            }}
            endIcon={<CancelIcon />}
          >
            Hủy
          </Button>
          <Button
            autoFocus
            onClick={handleSave}
            variant="contained"
            sx={{
              backgroundColor: "#4cceac",
              color: "#fff",
              marginLeft: "20px",
              marginTop: "20px",
            }}
            endIcon={<CheckIcon />}
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
