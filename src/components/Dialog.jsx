import React, { useState, useEffect } from "react";
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
import Autocomplete from "@mui/material/Autocomplete";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import DateRangeIcon from "@mui/icons-material/DateRange";
export default function CustomDialog({ open, handleClose, selectedVideo, channelStream }) {
  // console.log("this is video selecttttttttttttttttttt", selectedVideo);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedFile, setSelectedFile] = useState(null);
  const [color, setColor] = useState("#ffffff");
  const [openDay, setOpenDay] = useState(true);
  const [openWeek, setOpenWeek] = useState(true);
  const [openFlex, setOpenFlex] = useState(true);

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

  const [videoname, setVideoname] = useState([]); // Khai báo biến dataVideo
  const [id,setId] = useState([]);
  const [label, setLabel] = useState([]); // Khai báo biến dataVideo
  const [start, setStart] = useState([]);
  const [end, setEnd] = useState([]);
  const [duration, setDuration] = useState([]);
  const [begin, setBegin] = useState([]);
  const [until, setUntil] = useState([]);
  const [typetask, setTypeTask] = useState([]);
  const [days, setDays] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dataVideo, setDataVideo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/get/schedule?stream=${channelStream}`);
        const responseVideo = await fetch("http://localhost:5000/get/video");

        if (!response.ok) {
          throw new Error("Network response video was not ok");
        }
        if (!responseVideo.ok) {
          throw new Error("Network response video was not ok");
        }

        const dataVideo = await responseVideo.json();
        const responseData = await response.json();
        const id = responseData.Schedule.map((item) => item.ID);
        const label = responseData.Schedule.map((item) => item.label); // Lấy giá trị của trường "label"
        const videoname = responseData.Schedule.map((item) => item.video_name);
        const start = responseData.Schedule.map((item) => item.start_time);
        const end = responseData.Schedule.map((item) => item.end_time);
        const duration = responseData.Schedule.map((item) => item.duration);
        const begin = responseData.Schedule.map((item) => item.start_date);
        const until = responseData.Schedule.map((item) => item.until);
        const typetask = responseData.Schedule.map((item) => item.typetask);
        const days = responseData.Schedule.map((item) => item.days);
        // console.log("Labelllllllllllllllllllllllllll:", label);
        //console.log("Videonamemmmmmmmmmmmmmmmmmmmmmm:", videoname);
        // console.log("Starttttttttttttttttttttttttttt:", start);
        // console.log("Enddddddddddddddddddddddddddddd:", end);
        // console.log("durationnnnnnnnnnnnnnnnnnnnnnnn:", duration);
        // console.log("beginnnnnnnnnnnnnnnnnnnnnnnnnnn:", begin);
        // console.log("untilllllllllllllllllllllllllll:", until);
        // console.log("typeeeeeeeeeeeeeeeeeeeeeeeeeeee:", type);
        //console.log("dayssssssssssssssssssssssssssss:", days);

        setDataVideo(dataVideo);

        setId(id);
        setLabel(label); // Cập nhật giá trị cho biến dataVideo
        setVideoname(videoname);
        setStart(start);
        setEnd(end);
        setDuration(duration);
        setBegin(begin);
        setUntil(until);
        setTypeTask(typetask);
        setDays(days);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [channelStream]);


  const index = label.indexOf(selectedVideo);
  const defaultAdvertisementName = index !== -1 ? label[index] || "" : "";



  const indexes = label.reduce((acc, curr, index) => {
    if (curr === selectedVideo) {
      acc.push(index);
    }
    return acc;
  }, []);

  // Tạo mảng defaultStart từ các chỉ mục tìm được
  const defaultvideoname = indexes.map(index => videoname[index]/*.split(',') */);  
  const defaultStart = indexes.map((index) => start[index]);
  const defaultEnd = indexes.map((index) => end[index]);
  const defaultDuration = indexes.map((index) => duration[index]);
  const defaultBegin = indexes.map((index) => begin[index]);
  const defaultUntil = indexes.map((index) => until[index]);
  const defaultType = indexes.map((index) => typetask[index]);
  const defaultDays = indexes.map((index) => days[index]);
  const defaultId = indexes.map((index) => id[index]);
  const daysToIndex = {
    mon: 0,
    tue: 1,
    wed: 2,
    thu: 3,
    fri: 4,
    sat: 5,
    sun: 6,
  };
  const defaultDaysIndices = Array.isArray(defaultDays) ? 
  defaultDays.map((days) => {
    return Array.isArray(days) ? 
      days.map((day) => daysToIndex[day] !== undefined ? daysToIndex[day] : -1) : 
      [];
  }) : 
  [];

  // console.log("dayssssssssssssssssssssssssssss", defaultDaysIndices);
//------thêm lịch chiếu----------------------------------------------beign------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------

const [timeStartDailyArray, setTimeStartDailyArray] = useState([]);
const [timeEndDailyArray, setTimeEndDailyArray] = useState([]);
const [contentDailyArray, setContentDailyArray] = useState([]);
const [timeBeginDailyArray, setTimeBeginDailyArray] = useState([]);
const [timeUntilDailyArray, setTimeUntilDailyArray] = useState([]);
const [durationDailyArray, setDurationDailyArray] = useState([]);

const [timeStartWeeklyArray, setTimeStartWeeklyArray] = useState([]);
const [timeEndWeeklyArray, setTimeEndWeeklyArray] = useState([]);
const [contentWeeklyArray, setContentWeeklyArray] = useState([]);
const [listDayWeeklyArray, setListDayWeeklyArray] = useState([]);
const [timeBeginWeeklyArray, setTimeBeginWeeklyArray] = useState([]);
const [timeUntilWeeklyArray, setTimeUntilWeeklyArray] = useState([]);

const [timeStartOneTimeArray, setTimeStartOneTimeArray] = useState([]);
const [timeEndOneTimeArray, setTimeEndOneTimeArray] = useState([]);
const [contentOneTimeArray, setContentOneTimeArray] = useState([]);
const [timeBeginOneTimeArray, setTimeBeginOneTimeArray] = useState([]);


//thêm lịch chiếu-----Daily----------------begin-------------------------------
const [dayBoxes, setDayBoxes] = useState([]);
const [boxDailyIdCounter, setBoxDailyIdCounter] = useState(0);
const handleAddDayBox = () => {
  // Tạo một Box mới
  setBoxDailyIdCounter((prevCounter) => prevCounter + 1);
  const newBox = (
    <Box
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
const [boxWeeklyIdCounter, setBoxWeeklyIdCounter] = useState(0);
const handleAddWeekBox = () => {
  setBoxWeeklyIdCounter((prevCounter) => prevCounter + 1);
  // Tạo một Box mới
  const newBox = (
    <Box
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
          <TimePicker label="Thời gian bắt đầu" 
                          onChange={(newTime) => {
              const hours = newTime.$d.getHours().toString().padStart(2, "0");
              const minutes = newTime.$d
                .getMinutes()
                .toString()
                .padStart(2, "0");
              const formattedTime = `${hours}:${minutes}`;
              console.log("Giá trị mới: ", formattedTime);
              onChangeTimeStartWeekly(
                formattedTime,
                boxWeeklyIdCounter.toString(),
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
          <TimePicker label="Thời gian kết thúc" 
                          onChange={(newTime) => {
              const hours = newTime.$d.getHours().toString().padStart(2, "0");
              const minutes = newTime.$d
                .getMinutes()
                .toString()
                .padStart(2, "0");
              const formattedTime = `${hours}:${minutes}`;
              console.log("Giá trị mới: ", formattedTime);
              onChangeTimeEndWeekly(
                formattedTime,
                boxWeeklyIdCounter.toString(),
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
              onChangeContentWeekly(newValue, boxWeeklyIdCounter.toString());
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
           onChange={(event, newValue) => onChangePickDayOfWeek(event, newValue, boxWeeklyIdCounter)}
          />
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
  onChangeTimeBeginWeekly(formattedDate,boxWeeklyIdCounter.toString(),);
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
  onChangeTimeUntilWeekly(formattedDate,boxWeeklyIdCounter.toString(),);
}}
          />
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
const [boxOneTimeIdCounter, setBoxOneTimeIdCounter] = useState(0);
const handleAddOneTimeBox = () => {
  setBoxOneTimeIdCounter((prevCounter) => prevCounter + 1);
  // Tạo một Box mới
  const newBox = (
    <Box
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
          <TimePicker label="Thời gian bắt đầu" 
                          onChange={(newTime) => {
              const hours = newTime.$d.getHours().toString().padStart(2, "0");
              const minutes = newTime.$d
                .getMinutes()
                .toString()
                .padStart(2, "0");
              const formattedTime = `${hours}:${minutes}`;
              console.log("Giá trị mới: ", formattedTime);
              onChangeTimeStartOneTime(
                formattedTime,
                boxOneTimeIdCounter.toString(),
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
          <TimePicker label="Thời gian kết thúc" 
                        onChange={(newTime) => {
              const hours = newTime.$d.getHours().toString().padStart(2, "0");
              const minutes = newTime.$d
                .getMinutes()
                .toString()
                .padStart(2, "0");
              const formattedTime = `${hours}:${minutes}`;
              console.log("Giá trị mới: ", formattedTime);
              onChangeTimeEndOneTime(
                formattedTime,
                boxOneTimeIdCounter.toString(),
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
              onChangeContentOneTime(newValue, boxOneTimeIdCounter.toString());
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
  onChangeTimeBeginOneTime(formattedDate,boxOneTimeIdCounter.toString(),);
}}
          />
        </Box>
      </Box>
    </Box>
  );
  // Thêm Box mới vào danh sách
  setOneTimeBoxes([...oneTimeBoxes, newBox]);
};
//thêm lịch chiếu--------onetime-----------------end--------------

//gửi dữ liệu lập lịch------------------------------------begin--------------------------

//daily-----------------------------------------begin-------------------------------------------
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
//daily-----------------------------------------end-------------------------------------------
//weekly-----------------------------------------begin-------------------------------------------

const onChangeTimeStartWeekly = (formattedTime, boxWeeklyIdCounter) => {
const label = "weeklyTimeStart" + boxWeeklyIdCounter;
setTimeStartWeeklyArray((prevArray) => {
  const index = prevArray.findIndex((item) => item.label === label);
  if (index !== -1) {
    // Nếu nhãn đã tồn tại, cập nhật giá trị
    return prevArray.map((item, idx) =>
      idx === index ? { ...item, value: formattedTime } : item,
    );
  } else {
    // Nếu nhãn không tồn tại, thêm một mục mới
    return [...prevArray, { label: label, value: formattedTime }];
  }
});
};

const onChangeTimeEndWeekly = (formattedTime, boxWeeklyIdCounter) => {
const label = "weeklyTimeEnd" + boxWeeklyIdCounter;
setTimeEndWeeklyArray((prevArray) => {
  const index = prevArray.findIndex((item) => item.label === label);
  if (index !== -1) {
    // Nếu nhãn đã tồn tại, cập nhật giá trị
    return prevArray.map((item, idx) =>
      idx === index ? { ...item, value: formattedTime } : item,
    );
  } else {
    // Nếu nhãn không tồn tại, thêm một mục mới
    return [...prevArray, { label: label, value: formattedTime }];
  }
});
};

const onChangeContentWeekly = (newValue, boxWeeklyIdCounter) => {
const label = "weeklyContent" + boxWeeklyIdCounter;
setContentWeeklyArray((prevArray) => {
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

const onChangeTimeBeginWeekly = (newTime, boxWeeklyIdCounter) => {
const label = "weeklyTimeBegin" + boxWeeklyIdCounter;
setTimeBeginWeeklyArray((prevArray) => {
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

const onChangeTimeUntilWeekly = (newTime, boxWeeklyIdCounter) => {
const label = "weeklyTimeUntil" + boxWeeklyIdCounter;
setTimeUntilWeeklyArray((prevArray) => {
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


// Hàm xử lý khi có sự thay đổi trong các ngày được chọn
const onChangePickDayOfWeek = (event, newValue, boxWeeklyIdCounter) => {
const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const selectedDays = newValue.map(index => daysOfWeek[index]);

const label = "weeklyDayOfWeek" + boxWeeklyIdCounter;
setListDayWeeklyArray((prevArray) => {
  const index = prevArray.findIndex((item) => item.label === label);
  if (index !== -1) {
    // Nếu nhãn đã tồn tại, cập nhật giá trị
    return prevArray.map((item, idx) =>
      idx === index ? { ...item, value: selectedDays } : item
    );
  } else {
    // Nếu nhãn không tồn tại, thêm một mục mới
    return [...prevArray, { label: label, value: selectedDays }];
  }
});
};
//weekly-----------------------------------------end-------------------------------------------

//onetime------------------------------------------begin---------------------------------------
const onChangeTimeStartOneTime = (formattedTime, boxOneTimeIdCounter) => {
const label = "onetimeTimeStart" + boxOneTimeIdCounter;
setTimeStartOneTimeArray((prevArray) => {
  const index = prevArray.findIndex((item) => item.label === label);
  if (index !== -1) {
    // Nếu nhãn đã tồn tại, cập nhật giá trị
    return prevArray.map((item, idx) =>
      idx === index ? { ...item, value: formattedTime } : item,
    );
  } else {
    // Nếu nhãn không tồn tại, thêm một mục mới
    return [...prevArray, { label: label, value: formattedTime }];
  }
});
};

const onChangeTimeEndOneTime = (formattedTime, boxOneTimeIdCounter) => {
const label = "onetimeTimeEnd" + boxOneTimeIdCounter;
setTimeEndOneTimeArray((prevArray) => {
  const index = prevArray.findIndex((item) => item.label === label);
  if (index !== -1) {
    // Nếu nhãn đã tồn tại, cập nhật giá trị
    return prevArray.map((item, idx) =>
      idx === index ? { ...item, value: formattedTime } : item,
    );
  } else {
    // Nếu nhãn không tồn tại, thêm một mục mới
    return [...prevArray, { label: label, value: formattedTime }];
  }
});
};

const onChangeContentOneTime = (newValue, boxOneTimeIdCounter) => {
const label = "onetimeContent" + boxOneTimeIdCounter;
setContentOneTimeArray((prevArray) => {
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

const onChangeTimeBeginOneTime = (newTime, boxOneTimeIdCounter) => {
const label = "onetimeTimeBegin" + boxOneTimeIdCounter;
setTimeBeginOneTimeArray((prevArray) => {
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
//onetime----------------------------------------------end-----------------------------------

const handleSubmit = async () => {
//api------daily---------------------begin-------------------------------------------
  for (let i = 0; i < timeStartDailyArray.length; i++) {
    const startTime = timeStartDailyArray[i].value; // Thời gian bắt đầu
    const endTime = timeEndDailyArray[i].value; // Thời gian kết thúc
    const list = contentDailyArray[i].value.join(','); // Danh sách nội dung
    const duration = durationDailyArray[i].value; // Độ dài
    const startDateParts = timeBeginDailyArray[i].value.split('/'); // Tách ngày, tháng và năm
    const startDate = `${startDateParts[2]}-${startDateParts[0]}-${startDateParts[1]}`; // Định dạng lại theo yyyy-mm-dd

    const untilParts = timeUntilDailyArray[i].value.split('/'); // Tách ngày, tháng và năm
    const until = `${untilParts[2]}-${untilParts[0]}-${untilParts[1]}`; // Định dạng lại theo yyyy-mm-dd
    const label = defaultAdvertisementName; // Nhãn

    // Tạo đường dẫn API
    const url = `http://localhost:5000//schedule/addTask/daily?stream=${channelStream}&list=${list}&duration=${duration}&starttime=${startTime}&endtime=${endTime}&startdate=${startDate}&until=${until}&label=${label}`;
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
//api------daily---------------------end-------------------------------------------

//api------weekly---------------------begin-------------------------------------------
  for (let i = 0; i < timeStartWeeklyArray.length; i++) {
    const startTime = timeStartWeeklyArray[i].value; // Thời gian bắt đầu
    const endTime = timeEndWeeklyArray[i].value; // Thời gian kết thúc
    const list = contentWeeklyArray[i].value.join(','); // Danh sách nội dung

    const startDateParts = timeBeginWeeklyArray[i].value.split('/'); // Tách ngày, tháng và năm
    const startDate = `${startDateParts[2]}-${startDateParts[0]}-${startDateParts[1]}`; // Định dạng lại theo yyyy-mm-dd

    const untilParts = timeUntilWeeklyArray[i].value.split('/'); // Tách ngày, tháng và năm
    const until = `${untilParts[2]}-${untilParts[0]}-${untilParts[1]}`; // Định dạng lại theo yyyy-mm-dd
    const label = defaultAdvertisementName; // Nhãn

    const daypick = listDayWeeklyArray[i].value.join(',');



    // Tạo đường dẫn API
    const url = `http://localhost:5000//schedule/addTask/weekly?stream=${channelStream}&list=${list}&starttime=${startTime}&endtime=${endTime}&startdate=${startDate}&until=${until}&label=${label}&days=${daypick}`;
    console.log(url)
    //Gửi yêu cầu API
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
//api------weekly---------------------end-------------------------------------------

//api------onetime---------------------begin-------------------------------------------
  for (let i = 0; i < timeStartOneTimeArray.length; i++) {
    const startTime = timeStartOneTimeArray[i].value; // Thời gian bắt đầu
    const endTime = timeEndOneTimeArray[i].value; // Thời gian kết thúc
    const list = contentOneTimeArray[i].value.join(','); // Danh sách nội dung

    const startDateParts = timeBeginOneTimeArray[i].value.split('/'); // Tách ngày, tháng và năm
    const startDate = `${startDateParts[2]}-${startDateParts[0]}-${startDateParts[1]}`; // Định dạng lại theo yyyy-mm-dd

    const label = defaultAdvertisementName; // Nhãn


    // Tạo đường dẫn API
    const url = `http://localhost:5000//schedule/addTask/onetime?stream=${channelStream}&list=${list}&starttime=${startTime}&endtime=${endTime}&startdate=${startDate}&label=${label}`;
    console.log(url)
    //Gửi yêu cầu API
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
  window.location.reload();
//api------onetime---------------------end-------------------------------------------
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
//xóa quảng cáo-----------------------------------begin--------------------------------------
const handleDeleteAdvertisement = () => {
  // Gửi yêu cầu API đến localhost:5000//schedule/deleteTask
  fetch(`http://localhost:5000/schedule/deleteTask?stream=${channelStream}&label=${defaultAdvertisementName}`, {
    method: 'GET',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete advertisement');
      }
      // Xử lý phản hồi thành công nếu cần

    })
    .catch(error => {
      console.error('Error deleting advertisement:', error);
      // Xử lý lỗi nếu cần
    });
    window.location.reload();
    handleClose();
};


const handleDeleteId = (id) => {
  // Gửi yêu cầu API
  fetch(`http://localhost:5000/schedule/deleteTask?stream=${channelStream}&id=${id}`, {
    method: 'GET' // Sử dụng phương thức DELETE để xóa
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    console.log('Task deleted successfully');

    // Xử lý phản hồi thành công nếu cần
  })
  .catch(error => {
    console.error('Error deleting task:', error);
    // Xử lý lỗi nếu cần
  });
  window.location.reload();
};

//xóa quảng cáo---------------------------------------end-------------------------------------

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
          Chỉnh sửa lịch phát quảng cáo
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
                defaultValue={defaultAdvertisementName}
                sx={{ width: "300px" }}
              />
            </Box>

            {/* Dòng thứ hai: "Chọn video" và trường nhập dữ liệu --------------------------------------*/}

            {/* Dòng thứ ba -------------------------------------------------------------------*/}
            <Box marginBottom="20px" display="flex" alignItems="center">
              <OndemandVideoIcon sx={{ color: "#4cceac", fontSize: "36px" }} />
              <Typography variant="h4" marginRight="10px" paddingLeft="10px">
                <strong>Nội dung</strong>
              </Typography>
              <ReactPlayer
                url={[{ src: "", type: "video/mp4", quality: "1080" }]}
                controls={true}
                width="640px"
                height="360px"
              />
            </Box>

            {/* Dòng thứ tư ----------------------------------------------------*/}
            <Box marginBottom="30px" display="flex" alignItems="center">
              <ColorLensIcon sx={{ color: "#4cceac", fontSize: "36px" }} />
              <Typography variant="h4" marginRight="10px" paddingLeft="10px">
                <strong>Màu hiển thị trên lịch </strong>
              </Typography>
              <MuiColorInput value={color} onChange={handleChange} />
            </Box>

            {/* Dòng thứ năm ------------------------------------------------*/}
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
                      {defaultType.map((type, index) => {
                        if (type === "daily") {
                          return (
                            <Box
                              marginTop="10px"
                              marginBottom="20px"
                              padding="20px 10px 10px 10px"
                              flexDirection="column"
                              alignItems="center"
                              backgroundColor={colors.grey[900]}
                              borderRadius="10px"
                            >
                              <Box key={index} marginBottom="20px">
                                <Box display="flex" alignItems="center">
                                  <TimePicker
                                    label="Thời gian bắt đầu"
                                    defaultValue={dayjs(
                                      `2022-04-17T${defaultStart[index]}`,
                                    )}
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
                                    defaultValue={dayjs(
                                      `2022-04-17T${defaultEnd[index]}`,
                                    )}
                                  />
                                </Box>

                                <Box
                                  marginBottom="30px"
                                  marginTop="20px"
                                  display="flex"
                                  alignItems="center"
                                >
                                  <ChangeCircleIcon
                                    sx={{ color: "#4cceac", fontSize: "36px" }}
                                  />
                                  <Typography
                                    variant="h5"
                                    marginRight="10px"
                                    paddingLeft="10px"
                                  >
                                    <strong>Thay đổi nội dung</strong>
                                  </Typography>
                                  <Autocomplete
                                    sx={{ width: 300 }}
                                    multiple
                                    id="list-pole-autocomplete"
                                    defaultValue={defaultvideoname[index]}
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
                                    onClick={() => handleDeleteId(defaultId[index])}
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

                                <Box
                                  marginBottom="20px"
                                  display="flex"
                                  alignItems="center"
                                >
                                  <HourglassEmptyIcon
                                    sx={{ color: "#4cceac", fontSize: "36px" }}
                                  />
                                  <Typography
                                    variant="h5"
                                    marginRight="10px"
                                    paddingLeft="10px"
                                  >
                                    <strong>Hiệu lực từ</strong>
                                  </Typography>
                                  <DatePicker
                                    label="Ngày bắt đầy"
                                    defaultValue={dayjs(defaultBegin[index])}
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
                                  <DatePicker
                                    label="Ngày kết thúc"
                                    defaultValue={dayjs(defaultUntil[index])}
                                  />
                                </Box>

                                <Box
                                  marginBottom="20px"
                                  display="flex"
                                  alignItems="center"
                                >
                                  <EventRepeatIcon
                                    sx={{ color: "#4cceac", fontSize: "36px" }}
                                  />
                                  <Typography
                                    variant="h5"
                                    marginRight="10px"
                                    paddingLeft="10px"
                                  >
                                    <strong>Chu kỳ lặp</strong>
                                  </Typography>
                                  <TextField
                                    label="Số ngày"
                                    variant="outlined"
                                    defaultValue={defaultDuration[index]}
                                    sx={{ width: "300px" }}
                                  />
                                </Box>
                              </Box>
                            </Box>
                          );
                        }
                      })}

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
                      {defaultType.map((type, index) => {
                        if (type === "weekly") {
                          return (
                            <Box
                              marginTop="10px"
                              marginBottom="20px"
                              padding="20px 10px 10px 10px"
                              flexDirection="column"
                              alignItems="center"
                              backgroundColor={colors.grey[900]}
                              borderRadius="10px"
                            >
                              <Box key={index} marginBottom="20px">
                                <Box display="flex" alignItems="center">
                                  <TimePicker
                                    label="Thời gian bắt đầu"
                                    defaultValue={dayjs(
                                      `2022-04-17T${defaultStart[index]}`,
                                    )}
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
                                    defaultValue={dayjs(
                                      `2022-04-17T${defaultEnd[index]}`,
                                    )}
                                  />
                                </Box>

                                <Box
                                  marginBottom="30px"
                                  marginTop="20px"
                                  display="flex"
                                  alignItems="center"
                                >
                                  <ChangeCircleIcon
                                    sx={{ color: "#4cceac", fontSize: "36px" }}
                                  />
                                  <Typography
                                    variant="h5"
                                    marginRight="10px"
                                    paddingLeft="10px"
                                  >
                                    <strong>Thay đổi nội dung</strong>
                                  </Typography>
                                  <Autocomplete
                                    sx={{ width: 300 }}
                                    multiple
                                    id="list-pole-autocomplete"
                                    defaultValue={defaultvideoname[index]}
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
                                    onClick={() => handleDeleteId(defaultId[index])}
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

                                <Box
                                  marginBottom="20px"
                                  display="flex"
                                  alignItems="center"
                                >
                                  <DateRangeIcon
                                    sx={{ color: "#4cceac", fontSize: "36px" }}
                                  />
                                  <Typography
                                    variant="h5"
                                    marginRight="10px"
                                    paddingLeft="10px"
                                  >
                                    <strong>Các ngày trong tuần</strong>
                                  </Typography>

                                  <ToggleDays
                                    value={defaultDaysIndices[index]}
                                    onChange={(newValue) => {
                                      // Xử lý giá trị mới tại đây nếu cần
                                      console.log(newValue);
                                    }}
                                  />
                                </Box>

                                <Box
                                  marginBottom="20px"
                                  display="flex"
                                  alignItems="center"
                                >
                                  <HourglassEmptyIcon
                                    sx={{ color: "#4cceac", fontSize: "36px" }}
                                  />
                                  <Typography
                                    variant="h5"
                                    marginRight="10px"
                                    paddingLeft="10px"
                                  >
                                    <strong>Hiệu lực từ</strong>
                                  </Typography>
                                  <DatePicker
                                    label="Ngày bắt đầy"
                                    defaultValue={dayjs(defaultBegin[index])}
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
                                  <DatePicker
                                    label="Ngày kết thúc"
                                    defaultValue={dayjs(defaultUntil[index])}
                                  />
                                </Box>
                              </Box>
                            </Box>
                          );
                        }
                      })}

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
                      {/*nội dung trong collapse của lặp lại hằng ngày---------------begin--------------*/}
                      {defaultType.map((type, index) => {
                        if (type === "onetime") {
                          return (
                            <Box
                              marginTop="10px"
                              marginBottom="20px"
                              padding="20px 10px 10px 10px"
                              flexDirection="column"
                              alignItems="center"
                              backgroundColor={colors.grey[900]}
                              borderRadius="10px"
                            >
                              <Box key={index} marginBottom="20px">
                                <Box display="flex" alignItems="center">
                                  <TimePicker
                                    label="Thời gian bắt đầu"
                                    defaultValue={dayjs(
                                      `2022-04-17T${defaultStart[index]}`,
                                    )}
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
                                    defaultValue={dayjs(
                                      `2022-04-17T${defaultEnd[index]}`,
                                    )}
                                  />
                                </Box>

                                <Box
                                  marginBottom="30px"
                                  marginTop="20px"
                                  display="flex"
                                  alignItems="center"
                                >
                                  <ChangeCircleIcon
                                    sx={{ color: "#4cceac", fontSize: "36px" }}
                                  />
                                  <Typography
                                    variant="h5"
                                    marginRight="10px"
                                    paddingLeft="10px"
                                  >
                                    <strong>Thay đổi nội dung</strong>
                                  </Typography>
                                  <Autocomplete
                                    sx={{ width: 300 }}
                                    multiple
                                    id="list-pole-autocomplete"
                                    defaultValue={defaultvideoname[index]}
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
                                    onClick={() => handleDeleteId(defaultId[index])}
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

                                <Box
                                  marginBottom="20px"
                                  display="flex"
                                  alignItems="center"
                                >
                                  <HourglassEmptyIcon
                                    sx={{ color: "#4cceac", fontSize: "36px" }}
                                  />
                                  <Typography
                                    variant="h5"
                                    marginRight="10px"
                                    paddingLeft="10px"
                                  >
                                    <strong>Hiệu lực từ</strong>
                                  </Typography>
                                  <DatePicker
                                    label="Ngày bắt đầy"
                                    defaultValue={dayjs(defaultBegin[index])}
                                  />
                                </Box>
                              </Box>
                            </Box>
                          );
                        }
                      })}

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
            onClick={handleDeleteAdvertisement}
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
            Lưu thay đổi
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
