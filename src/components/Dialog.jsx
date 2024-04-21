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
export default function CustomDialog({ open, handleClose, selectedVideo }) {
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
  const [lable, setLable] = useState([]); // Khai báo biến dataVideo
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
        const response = await fetch("http://localhost:5000/get/schedule");
        const responseVideo = await fetch("http://localhost:5000/get/video");

        if (!response.ok) {
          throw new Error("Network response video was not ok");
        }
        if (!responseVideo.ok) {
          throw new Error("Network response video was not ok");
        }

        const dataVideo = await responseVideo.json();
        const responseData = await response.json();

        const lable = responseData.Schedule.map((item) => item.lable); // Lấy giá trị của trường "lable"
        const videoname = responseData.Schedule.map((item) => item.video_name);
        const start = responseData.Schedule.map((item) => item.start_time);
        const end = responseData.Schedule.map((item) => item.end_time);
        const duration = responseData.Schedule.map((item) => item.duration);
        const begin = responseData.Schedule.map((item) => item.start_date);
        const until = responseData.Schedule.map((item) => item.until);
        const typetask = responseData.Schedule.map((item) => item.typetask);
        const days = responseData.Schedule.map((item) => item.days);
        // console.log("Labelllllllllllllllllllllllllll:", lable);
        // console.log("Videonamemmmmmmmmmmmmmmmmmmmmmm:", videoname);
        // console.log("Starttttttttttttttttttttttttttt:", start);
        // console.log("Enddddddddddddddddddddddddddddd:", end);
        // console.log("durationnnnnnnnnnnnnnnnnnnnnnnn:", duration);
        // console.log("beginnnnnnnnnnnnnnnnnnnnnnnnnnn:", begin);
        // console.log("untilllllllllllllllllllllllllll:", until);
        // console.log("typeeeeeeeeeeeeeeeeeeeeeeeeeeee:", type);
        // console.log("dayssssssssssssssssssssssssssss:", days);

        setDataVideo(dataVideo);

        setLable(lable); // Cập nhật giá trị cho biến dataVideo
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
  }, []);
  const index = lable.indexOf(selectedVideo);
  const defaultAdvertisementName = index !== -1 ? lable[index] || "" : "";
  const indexes = lable.reduce((acc, curr, index) => {
    if (curr === selectedVideo) {
      acc.push(index);
    }
    return acc;
  }, []);

  // Tạo mảng defaultStart từ các chỉ mục tìm được
  const defaultvideoname = indexes.map((index) => videoname[index]);
  const defaultStart = indexes.map((index) => start[index]);
  const defaultEnd = indexes.map((index) => end[index]);
  const defaultDuration = indexes.map((index) => duration[index]);
  const defaultBegin = indexes.map((index) => begin[index]);
  const defaultUntil = indexes.map((index) => until[index]);
  const defaultType = indexes.map((index) => typetask[index]);
  const defaultDays = indexes.map((index) => days[index]);
  const daysToIndex = {
    mon: 0,
    tue: 1,
    wed: 2,
    thu: 3,
    fri: 4,
    sat: 5,
    sun: 6,
  };
  const defaultDaysIndices = defaultDays.map((days) => {
    return days.map((day) =>
      daysToIndex[day] !== undefined ? daysToIndex[day] : -1,
    );
  });

  // console.log("dayssssssssssssssssssssssssssss", defaultDaysIndices);

  //thêm lịch chiếu-----Daily----------------begin-------------------------------
  const [dayBoxes, setDayBoxes] = useState([]);
  const handleAddDayBox = () => {
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

          <Box marginBottom="20px" display="flex" alignItems="center">
            <EventRepeatIcon sx={{ color: "#4cceac", fontSize: "36px" }} />
            <Typography variant="h5" marginRight="10px" paddingLeft="10px">
              <strong>Chu kỳ lặp</strong>
            </Typography>
            <TextField
              label="Số ngày"
              variant="outlined"
              sx={{ width: "300px" }}
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
  const handleAddWeekBox = () => {
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
  const handleAddOneTimeBox = () => {
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
            onClick={handleClose}
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
