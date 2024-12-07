import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Divider } from '@mui/material';
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
import WaitingLivePopup from "./WaitingLivePopup";
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
import { API_BASE_URL } from "../data/link_api";
import SlideshowIcon from "@mui/icons-material/Slideshow";
export default function CustomDialog({
  open,
  handleClose,
  selectedVideo,
  channelStream,
}) {
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
  const [id, setId] = useState([]);
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
  const [inputtype, setInputtype] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/get/schedule?stream=${channelStream}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          },
        );
        const responseVideo = await fetch(`${API_BASE_URL}/get/video`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });

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
        const inputtype = responseData.Schedule.map((item) => item.input_type);
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
        setInputtype(inputtype);
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
  const defaultvideoname = indexes.map(
    (index) => videoname[index] /*.split(',') */,
  );
  const defaultStart = indexes.map((index) => start[index]);
  const defaultEnd = indexes.map((index) => end[index]);
  const defaultDuration = indexes.map((index) => duration[index]);
  const defaultBegin = indexes.map((index) => begin[index]);
  const defaultUntil = indexes.map((index) => until[index]);
  const defaultType = indexes.map((index) => typetask[index]);
  const defaultDays = indexes.map((index) => days[index]);
  const defaultId = indexes.map((index) => id[index]);
  const defaultinputType = indexes.map((index) => inputtype[index]);
  const daysToIndex = {
    mon: 0,
    tue: 1,
    wed: 2,
    thu: 3,
    fri: 4,
    sat: 5,
    sun: 6,
  };
  const defaultDaysIndices = Array.isArray(defaultDays)
    ? defaultDays.map((days) => {
        return Array.isArray(days)
          ? days.map((day) =>
              daysToIndex[day] !== undefined ? daysToIndex[day] : -1,
            )
          : [];
      })
    : [];

  //xóa quảng cáo-----------------------------------begin--------------------------------------
  const handleDeleteAdvertisement = () => {
    // Gửi yêu cầu API đến localhost:5000//schedule/deleteTask
    setOpenpopupwait(true);
    fetch(
      `${API_BASE_URL}/schedule/deleteTask?stream=${channelStream}&label=${selectedVideo}`,
      {
        method: "GET",

        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete advertisement");
        }
        // Xử lý phản hồi thành công nếu cần
      })
      .catch((error) => {
        console.error("Error deleting advertisement:", error);
        // Xử lý lỗi nếu cần
      });

      setTimeout(() => {
        setOpenpopupwait(false);
        window.location.reload();
        handleClose();
      }, 2000);
    handleClose();
  };

  const handleDeleteId = (id) => {
    // Gửi yêu cầu API
    setOpenpopupwait(true);
    fetch(
      `${API_BASE_URL}/schedule/deleteTask?stream=${channelStream}&id=${id}`,
      {
        method: "GET", // Sử dụng phương thức DELETE để xóa
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete task");
        }
        console.log("Task deleted successfully");

        // Xử lý phản hồi thành công nếu cần
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        // Xử lý lỗi nếu cần
      });
      setTimeout(() => {
        setOpenpopupwait(false);
        window.location.reload();
        handleClose();
      }, 2000);
  };
  const [openpopupwait, setOpenpopupwait] = useState(false);

  const handleClickOpenpopupwait = () => {
    setOpenpopupwait(true);
  };

  const handleClosepopupwait = () => {
    setOpenpopupwait(false);
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
          Lịch phát quảng cáo
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
                defaultValue={selectedVideo}
                sx={{ width: "300px" }}
              />
            </Box>

            {/* Dòng thứ hai: "Chọn video" và trường nhập dữ liệu --------------------------------------*/}

            {/* Dòng thứ ba -------------------------------------------------------------------*/}


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
                        src={`${process.env.PUBLIC_URL}/assets/day.png`}
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
                                    <strong>Video</strong>
                                  </Typography>
                                  <Autocomplete
                                    sx={{ width: 300 }}
                                    multiple
                                    id="list-pole-autocomplete"
                                    defaultValue={
    defaultinputType[index] === "video" ? defaultvideoname[index] : [] 
  }
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
                                        label="Nội dung"
                                      />
                                    )}
                                  />

                                  <Button
                                    variant="contained"
                                    onClick={() =>
                                      handleDeleteId(defaultId[index])
                                    }
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



                                <Divider 
        sx={{
          backgroundColor: 'black',
          my: 2
        }}
      />



<Box>
          <section>
              <Box
                display="flex"
                alignItems="center"
                marginBottom="20px"
              >
            <SlideshowIcon sx={{ color: "#4cceac", fontSize: "36px" }} />
            <Typography variant="h5" marginRight="10px" paddingLeft="10px">
              <strong>Slide show</strong>
            </Typography>

              </Box>

              <Box
                sx={{
                  height: "300px", // Chiều cao thanh trượt
                  overflowY: "auto", // Cho phép cuộn dọc
                  border: "1px solid #ccc", // Viền cho thanh trượt (tùy chọn)
                  borderRadius: "10px", // Bo góc thanh trượt
                  padding: "10px", // Padding cho thanh trượt
                  backgroundColor: "#f5f5f5", // Màu nền của thanh trượt
                }}
              >      

{defaultinputType[index] === "image" && (
  <div key={index} id={`displayimage-${index}`}>
    {Array.isArray(defaultvideoname[index]) &&
      defaultvideoname[index].map((imageName, imageIndex) => (
        <div
          key={imageIndex}
          style={{
            padding: "10px",
            borderRadius: "20px",
            backgroundColor: "#FFFFFF",
            marginBottom: "10px",
          }}
        >
          {/* Hiển thị hình ảnh */}
          <img
  src={`${API_BASE_URL}/image/${imageName.trim()}?ngrok-skip-browser-warning=true`} // Thêm query để bỏ qua cảnh báo ngrok
  alt={`image-${imageIndex}`}
  height={180}
  style={{
    borderRadius: "10%",
    objectFit: "cover",
  }}

/>

          {/* Hiển thị tên ảnh */}
          <p
            style={{
              fontSize: "0.9rem",
              fontWeight: "bold",
              color: "#333",
              marginTop: "10px",
            }}
          >
            {imageName.trim()}
          </p>
        </div>
      ))}
  </div>
)}
              </Box>


              
            </section>
            </Box>



                                <Divider 
        sx={{
          backgroundColor: 'black',
          my: 2
        }}
      />

                                <Box display="flex" alignItems="center" marginBottom="15px">
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


                      {/*nội dung trong collapse của lặp lại hằng ngày---------------end --------------*/}
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
                        src={`${process.env.PUBLIC_URL}/assets/week.png`}
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
                                    <strong>Video</strong>
                                  </Typography>
                                  <Autocomplete
                                    sx={{ width: 300 }}
                                    multiple
                                    id="list-pole-autocomplete"
                                    defaultValue={
    defaultinputType[index] === "video" ? defaultvideoname[index] : [] 
  }
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
                                        label="Nội dung"
                                      />
                                    )}
                                  />

                                  <Button
                                    variant="contained"
                                    onClick={() =>
                                      handleDeleteId(defaultId[index])
                                    }
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

                                <Divider 
        sx={{
          backgroundColor: 'black',
          my: 2
        }}
      />



<Box>
          <section>
              <Box
                display="flex"
                alignItems="center"
                marginBottom="20px"
              >
            <SlideshowIcon sx={{ color: "#4cceac", fontSize: "36px" }} />
            <Typography variant="h5" marginRight="10px" paddingLeft="10px">
              <strong>Slide show</strong>
            </Typography>

              </Box>


              <Box
                sx={{
                  height: "300px", // Chiều cao thanh trượt
                  overflowY: "auto", // Cho phép cuộn dọc
                  border: "1px solid #ccc", // Viền cho thanh trượt (tùy chọn)
                  borderRadius: "10px", // Bo góc thanh trượt
                  padding: "10px", // Padding cho thanh trượt
                  backgroundColor: "#f5f5f5", // Màu nền của thanh trượt
                }}
              >      

{defaultinputType[index] === "image" && (
  <div key={index} id={`displayimage-${index}`}>
    {Array.isArray(defaultvideoname[index]) &&
      defaultvideoname[index].map((imageName, imageIndex) => (
        <div
          key={imageIndex}
          style={{
            padding: "10px",
            borderRadius: "20px",
            backgroundColor: "#FFFFFF",
            marginBottom: "10px",
          }}
        >
          {/* Hiển thị hình ảnh */}
          <img
              src={`${API_BASE_URL}/image/${imageName.trim()}?ngrok-skip-browser-warning=true`} 
            alt={`image-${imageIndex}`}
            height={180}
            style={{
              borderRadius: "10%",
              objectFit: "cover",
            }}
          />

          {/* Hiển thị tên ảnh */}
          <p
            style={{
              fontSize: "0.9rem",
              fontWeight: "bold",
              color: "#333",
              marginTop: "10px",
            }}
          >
            {imageName.trim()}
          </p>
        </div>
      ))}
  </div>
)}

              </Box>


              
            </section>
            </Box>



                                <Divider 
        sx={{
          backgroundColor: 'black',
          my: 2
        }}
      />
                                                              <Box display="flex" alignItems="center" marginBottom="15px">
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
                        src={`${process.env.PUBLIC_URL}/assets/flex.png`}
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
                                    <strong>Video</strong>
                                  </Typography>
                                  <Autocomplete
                                    sx={{ width: 300 }}
                                    multiple
                                    id="list-pole-autocomplete"
                                    defaultValue={
    defaultinputType[index] === "video" ? defaultvideoname[index] : [] 
  }
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
                                        label="Nội dung"
                                      />
                                    )}
                                  />

                                  <Button
                                    variant="contained"
                                    onClick={() =>
                                      handleDeleteId(defaultId[index])
                                    }
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

                                <Divider 
        sx={{
          backgroundColor: 'black',
          my: 2
        }}
      />



<Box>
          <section>
              <Box
                display="flex"
                alignItems="center"
                marginBottom="20px"
              >
            <SlideshowIcon sx={{ color: "#4cceac", fontSize: "36px" }} />
            <Typography variant="h5" marginRight="10px" paddingLeft="10px">
              <strong>Slide show</strong>
            </Typography>

              </Box>

              <Box
                sx={{
                  height: "300px", // Chiều cao thanh trượt
                  overflowY: "auto", // Cho phép cuộn dọc
                  border: "1px solid #ccc", // Viền cho thanh trượt (tùy chọn)
                  borderRadius: "10px", // Bo góc thanh trượt
                  padding: "10px", // Padding cho thanh trượt
                  backgroundColor: "#f5f5f5", // Màu nền của thanh trượt
                }}
              >      

{defaultinputType[index] === "image" && (
  <div key={index} id={`displayimage-${index}`}>
    {Array.isArray(defaultvideoname[index]) &&
      defaultvideoname[index].map((imageName, imageIndex) => (
        <div
          key={imageIndex}
          style={{
            padding: "10px",
            borderRadius: "20px",
            backgroundColor: "#FFFFFF",
            marginBottom: "10px",
          }}
        >
          {/* Hiển thị hình ảnh */}
          <img
             src={`${API_BASE_URL}/image/${imageName.trim()}?ngrok-skip-browser-warning=true`}  // Kết hợp base URL với tên ảnh
            alt={`image-${imageIndex}`}
            height={180}
            style={{
              borderRadius: "10%",
              objectFit: "cover",
            }}
          />

          {/* Hiển thị tên ảnh */}
          <p
            style={{
              fontSize: "0.9rem",
              fontWeight: "bold",
              color: "#333",
              marginTop: "10px",
            }}
          >
            {imageName.trim()}
          </p>
        </div>
      ))}
  </div>
)}
              </Box>


              
            </section>
            </Box>



                                <Divider 
        sx={{
          backgroundColor: 'black',
          my: 2
        }}
      />
                                                                 <Box display="flex" alignItems="center" marginBottom="15px">
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
      <WaitingLivePopup
        open={openpopupwait}
        handleClose={handleClosepopupwait}
      />
    </LocalizationProvider>
  );
}
