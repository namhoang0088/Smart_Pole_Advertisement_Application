import React, { useState, useEffect, useRef } from "react";
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
import CancelIcon from "@mui/icons-material/Cancel";
import MenuItem from "@mui/material/MenuItem";
import TransformIcon from '@mui/icons-material/Transform';
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
import { API_BASE_URL } from "../data/link_api";
import ErrorPopup from "./ErrorPopup";
import SuccessPopup from "./SuccessPopup";
import SlideshowIcon from "@mui/icons-material/Slideshow";
export default function AddEvent({ open, handleClose, channelStream }) {
  // console.log("adđ event channel stream", channelStream)
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
  const [labelOfScheduler, setLabelOfScheduler] = useState(null);

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

  const transitionOptions = [
    { value: 1, label: "cut" },
    { value: 2, label: "fade" },
    { value: 3, label: "swipe" },
    { value: 4, label: "slide" },
  ];
  //thêm lịch chiếu-----Daily----------------begin------------------------------------------------------------------------------
  const [dayBoxes, setDayBoxes] = useState([]);
  const [boxDailyIdCounter, setBoxDailyIdCounter] = useState(0);

  const [selectedImages, setSelectedImages] = useState({});

  const onSelectFile = (event, boxId) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
  
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
  
    // Cập nhật hình ảnh cho box tương ứng
    setSelectedImages((prevImages) => ({
      ...prevImages,
      [boxId]: prevImages[boxId] ? prevImages[boxId].concat(imagesArray) : imagesArray,
    }));
  
    // Để xử lý lỗi trong Chrome
    event.target.value = "";
  };
  
  function deleteHandler(image) {
    setSelectedImages((previousImages) => {
      const newImages = previousImages.filter((e) => e !== image);
      URL.revokeObjectURL(image); // Giải phóng URL
      return newImages; // Trả về mảng mới
    });
  }


  const handleAddDayBox = () => {
    setBoxDailyIdCounter((prevCounter) => prevCounter + 1);
    
    console.log("iddddd",boxDailyIdCounter )
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

          {/* slide show ------------------------------------------------------------------------------------*/}
          <Divider 
        sx={{
          backgroundColor: 'black',
          my: 2
        }}
      />
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

                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    color: "#4CAF50", // Màu chữ là màu xanh lá cây
                    borderColor: "#4CAF50", // Màu viền là màu xanh lá cây
                    backgroundColor: "#FFFFFF", // Màu nền là màu trắng
                    marginRight: "10px", // Thêm khoảng cách bên phải
                    fontSize: "1.2rem", // Kích thước chữ
                    fontWeight: "bold", // In đậm chữ
                    padding: "5px 10px", // Padding để tạo button lớn hơn
                    borderRadius: "10px", // Bo tròn góc
                    "&:hover": {
                      // Thêm hiệu ứng hover khi di chuột qua button
                      backgroundColor: "#4CAF50", // Màu nền khi hover là màu xanh lá cây
                      color: "#FFFFFF", // Màu chữ là màu trắng khi hover
                    },
                  }}
                >
                  Add Images
                  <input
                    type="file"
                    name="images"
                    onChange={(event) => onSelectFile(event, boxDailyIdCounter)}
                    hidden
                    multiple
                  />
                </Button>
              </Box>


              <Box display="flex" alignItems="center" gap={2} marginBottom="20px">
              <Box width="150px">
                <TextField
                  select
                  label="Transition"
                  variant="outlined"
                  // onChange={handleTransitionChange}
                  
                  fullWidth
                >
                  {transitionOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Box display="flex" alignItems="center">
                        {" "}
                        {/* Sử dụng Flexbox để căn chỉnh các phần tử ngang nhau */}
                        <TransformIcon sx={{ marginRight: 1 }} />{" "}
                        {/* Icon Subscriptions */}
                        {option.label}
                      </Box>
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <TextField
                label="Transition Speed"
                // onChange={(event) => {
                //   const newValue = event.target.value;
                //   onChangeTransitionSpeed(newValue);
                // }}
                variant="outlined"
                sx={{ width: "300px" }}
              />
            </Box>


            <Box display="flex" alignItems="center" gap={2} marginBottom="20px">
              <TextField
                label="Time Between Slides"
                variant="outlined"
                // onChange={(event) => {
                //   const newValue = event.target.value;
                //   onChangeTimeBetweenSpeed(newValue);
                // }}
                sx={{ width: "200px" }}
              />

<Autocomplete
        sx={{ width: 200 }}
        multiple
        id="list-pole-autocomplete"
        // onChange={(event, newValue) => {
        //   setSelectedOptionsIMG(newValue);
        //   // Xử lý sự thay đổi giá trị được chọn
        // }}
        options={dataIMG.map((img) => img.name)} // Dùng trường "name" từ dữ liệu ảnh
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Chọn hình ảnh có sẵn"
          />
        )}
      />
            </Box>




              <Box
               id={`displaypicture-${boxDailyIdCounter}`}
                sx={{
                  height: "300px", // Chiều cao thanh trượt
                  overflowY: "auto", // Cho phép cuộn dọc
                  border: "1px solid #ccc", // Viền cho thanh trượt (tùy chọn)
                  borderRadius: "10px", // Bo góc thanh trượt
                  padding: "10px", // Padding cho thanh trượt
                  backgroundColor: "#f5f5f5", // Màu nền của thanh trượt
                }}
              >      

              </Box>
            </section>

            <Divider 
        sx={{
          backgroundColor: 'black',
          my: 2
        }}
      />
          {/* slide showw -----------------------------------------------------------------------------*/}
          <Box marginBottom="20px" display="flex" alignItems="center" marginTop="20px">
            <HourglassEmptyIcon sx={{ color: "#4cceac", fontSize: "36px" }} />
            <Typography variant="h5" marginRight="10px" paddingLeft="10px">
              <strong>Hiệu lực từ</strong>
            </Typography>
            <DatePicker
              label="Ngày bắt đầy"
              onChange={(newDate) => {
                const month = (newDate.$M + 1).toString().padStart(2, "0"); // Lấy tháng và thêm 1 vì tháng bắt đầu từ 0
                const day = newDate.$D.toString().padStart(2, "0"); // Lấy ngày
                const year = newDate.$y; // Lấy năm
                const formattedDate = `${month}/${day}/${year}`;
                onChangeTimeBeginDaily(
                  formattedDate,
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
              {" "}
              -{" "}
            </span>
            <DatePicker
              label="Ngày kết thúc"
              onChange={(newDate) => {
                const month = (newDate.$M + 1).toString().padStart(2, "0"); // Lấy tháng và thêm 1 vì tháng bắt đầu từ 0
                const day = newDate.$D.toString().padStart(2, "0"); // Lấy ngày
                const year = newDate.$y; // Lấy năm
                const formattedDate = `${month}/${day}/${year}`;
                onChangeTimeUntilDaily(
                  formattedDate,
                  boxDailyIdCounter.toString(),
                );
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
                onChangeDurationDaily(newValue, boxDailyIdCounter);
              }}
            />
          </Box>
        </Box>
      </Box>
    );
    // Thêm Box mới vào danh sách
    setDayBoxes([...dayBoxes, newBox]);
  };

  useEffect(() => {
    dayBoxes.forEach((box) => {
      const boxId = box.key.split('daily')[1]; // Lấy ID từ key
  
      // Gọi hàm render hoặc cập nhật DOM cho box này
      const boxElement = document.getElementById(`displaypicture-${boxId}`);
      if (boxElement) {
        // Xóa nội dung hiện tại
        boxElement.innerHTML = '';
  
        // Nếu có hình ảnh được chọn cho box này
        if (selectedImages[boxId] && selectedImages[boxId].length > 0) {
          selectedImages[boxId].forEach((image, index) => {
            // Tạo thẻ Box (dùng div thay thế)
            const boxDiv = document.createElement('div');
            boxDiv.style.padding = '10px';
            boxDiv.style.borderRadius = '20px';
            boxDiv.style.backgroundColor = '#FFFFFF';
            boxDiv.style.marginBottom = '10px';
  
            // Tạo thẻ img
            const imgElement = document.createElement('img');
            imgElement.src = image;
            imgElement.height = 180;
            imgElement.style.borderRadius = '10%';
            imgElement.style.objectFit = 'cover';
            imgElement.alt = `upload-${index}`;
            boxDiv.appendChild(imgElement);
  
            // Tạo thẻ chứa các nút
            const buttonContainer = document.createElement('div');
            buttonContainer.style.display = 'flex';
            buttonContainer.style.justifyContent = 'space-between';
            buttonContainer.style.alignItems = 'center';
            boxDiv.appendChild(buttonContainer);
  
            // Nút Picture
            const pictureButton = document.createElement('button');
            pictureButton.innerHTML = `Picture: ${index + 1}`;
            pictureButton.style.color = '#4CAF50';
            pictureButton.style.border = '1px solid #4CAF50';
            pictureButton.style.backgroundColor = '#FFFFFF';
            pictureButton.style.fontSize = '0.8rem';
            pictureButton.style.fontWeight = 'bold';
            pictureButton.style.padding = '5px 5px';
            pictureButton.style.borderRadius = '10px';
            pictureButton.style.marginLeft = '10px';
            pictureButton.onmouseover = function () {
              pictureButton.style.backgroundColor = '#4CAF50';
              pictureButton.style.color = '#FFFFFF';
            };
            pictureButton.onmouseout = function () {
              pictureButton.style.backgroundColor = '#FFFFFF';
              pictureButton.style.color = '#4CAF50';
            };
            buttonContainer.appendChild(pictureButton);
  
            // Nút Delete
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'Delete';
            deleteButton.style.color = '#FF0000';
            deleteButton.style.border = '1px solid #FF0000';
            deleteButton.style.backgroundColor = '#FFFFFF';
            deleteButton.style.fontSize = '0.8rem';
            deleteButton.style.fontWeight = 'bold';
            deleteButton.style.padding = '5px 5px';
            deleteButton.style.borderRadius = '10px';
            deleteButton.style.marginLeft = '10px';
            deleteButton.onmouseover = function () {
              deleteButton.style.backgroundColor = '#FF0000';
              deleteButton.style.color = '#FFFFFF';
            };
            deleteButton.onmouseout = function () {
              deleteButton.style.backgroundColor = '#FFFFFF';
              deleteButton.style.color = '#FF0000';
            };
  
            // Gán sự kiện xóa ảnh
            deleteButton.onclick = function () {
              deleteHandler(image);
            };
  
            // Thêm nút Delete vào container nút
            buttonContainer.appendChild(deleteButton);
  
            // Thêm boxDiv vào phần tử DOM
            boxElement.appendChild(boxDiv);
          });
        }
      }
    });
  }, [selectedImages, dayBoxes, deleteHandler]);
  
  
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
              onChange={(event, newValue) =>
                onChangePickDayOfWeek(event, newValue, boxWeeklyIdCounter)
              }
            />
          </Box>

          <Box marginBottom="20px" display="flex" alignItems="center">
            <HourglassEmptyIcon sx={{ color: "#4cceac", fontSize: "36px" }} />
            <Typography variant="h5" marginRight="10px" paddingLeft="10px">
              <strong>Hiệu lực từ</strong>
            </Typography>
            <DatePicker
              label="Ngày bắt đầy"
              onChange={(newDate) => {
                const month = (newDate.$M + 1).toString().padStart(2, "0"); // Lấy tháng và thêm 1 vì tháng bắt đầu từ 0
                const day = newDate.$D.toString().padStart(2, "0"); // Lấy ngày
                const year = newDate.$y; // Lấy năm
                const formattedDate = `${month}/${day}/${year}`;
                onChangeTimeBeginWeekly(
                  formattedDate,
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
              {" "}
              -{" "}
            </span>
            <DatePicker
              label="Ngày kết thúc"
              onChange={(newDate) => {
                const month = (newDate.$M + 1).toString().padStart(2, "0"); // Lấy tháng và thêm 1 vì tháng bắt đầu từ 0
                const day = newDate.$D.toString().padStart(2, "0"); // Lấy ngày
                const year = newDate.$y; // Lấy năm
                const formattedDate = `${month}/${day}/${year}`;
                onChangeTimeUntilWeekly(
                  formattedDate,
                  boxWeeklyIdCounter.toString(),
                );
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
                onChangeContentOneTime(
                  newValue,
                  boxOneTimeIdCounter.toString(),
                );
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
            <DatePicker
              label="Ngày bắt đầy"
              onChange={(newDate) => {
                const month = (newDate.$M + 1).toString().padStart(2, "0"); // Lấy tháng và thêm 1 vì tháng bắt đầu từ 0
                const day = newDate.$D.toString().padStart(2, "0"); // Lấy ngày
                const year = newDate.$y; // Lấy năm
                const formattedDate = `${month}/${day}/${year}`;
                onChangeTimeBeginOneTime(
                  formattedDate,
                  boxOneTimeIdCounter.toString(),
                );
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

  // mở danh sách video để thiết lập nội dung cho quảng cáo ---------------end--------------
  const [dataVideo, setDataVideo] = useState([]); // Khai báo biến dataVideo
  const [dataIMG, setDataIMG] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseVideo = await fetch(`${API_BASE_URL}/get/video`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (!responseVideo.ok) {
          throw new Error("Network response video was not ok");
        }

        const dataVideo = await responseVideo.json();
        // console.log("nammmmmmmmmmmmmmmmmmmmmmmmmmm", dataVideo); // In dữ liệu nhận được ra console

        setDataVideo(dataVideo); // Cập nhật giá trị cho biến dataVideo

        const responseIMG = await fetch(`${API_BASE_URL}/get/images`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (!responseIMG.ok) {
          throw new Error("Network response image was not ok");
        }

        const dataIMG = await responseIMG.json();
        setDataIMG(dataIMG.images); // Cập nhật giá trị cho biến dataIMG

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
          idx === index ? { ...item, value: newTime } : item,
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
          idx === index ? { ...item, value: newTime } : item,
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
          idx === index ? { ...item, value: newValue } : item,
        );
      } else {
        // Nếu nhãn không tồn tại, thêm một mục mới
        return [...prevArray, { label: label, value: newValue }];
      }
    });
    console.log("success popup", successsubmit);
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
          idx === index ? { ...item, value: newTime } : item,
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
          idx === index ? { ...item, value: newTime } : item,
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
    const selectedDays = newValue.map((index) => daysOfWeek[index]);

    const label = "weeklyDayOfWeek" + boxWeeklyIdCounter;
    setListDayWeeklyArray((prevArray) => {
      const index = prevArray.findIndex((item) => item.label === label);
      if (index !== -1) {
        // Nếu nhãn đã tồn tại, cập nhật giá trị
        return prevArray.map((item, idx) =>
          idx === index ? { ...item, value: selectedDays } : item,
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
          idx === index ? { ...item, value: newTime } : item,
        );
      } else {
        // Nếu nhãn không tồn tại, thêm một mục mới
        return [...prevArray, { label: label, value: newTime }];
      }
    });
  };
  //onetime----------------------------------------------end-----------------------------------
  // biến để check có error nào hay không
  const [successsubmit, setSuccesssubmit] = useState(true);
  const handleSubmit = async () => {
    //api------daily---------------------begin-------------------------------------------
    for (let i = 0; i < timeStartDailyArray.length; i++) {
      const startTime = timeStartDailyArray[i].value; // Thời gian bắt đầu
      const endTime = timeEndDailyArray[i].value; // Thời gian kết thúc
      const list = contentDailyArray[i].value.join(","); // Danh sách nội dung
      const duration = durationDailyArray[i].value; // Độ dài
      const startDateParts = timeBeginDailyArray[i].value.split("/"); // Tách ngày, tháng và năm
      const startDate = `${startDateParts[2]}-${startDateParts[0]}-${startDateParts[1]}`; // Định dạng lại theo yyyy-mm-dd

      const untilParts = timeUntilDailyArray[i].value.split("/"); // Tách ngày, tháng và năm
      const until = `${untilParts[2]}-${untilParts[0]}-${untilParts[1]}`; // Định dạng lại theo yyyy-mm-dd
      const label = labelOfScheduler; // Nhãn

      // Tạo đường dẫn API
      const url = `${API_BASE_URL}//schedule/addTask/daily?stream=${channelStream}&list=${list}&duration=${duration}&starttime=${startTime}&endtime=${endTime}&startdate=${startDate}&until=${until}&label=${label}`;
      console.log(url);
      // Gửi yêu cầu API
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          // body: JSON.stringify(payload) // Nếu cần gửi dữ liệu cụ thể, hãy thêm vào đây
        });
        if (!response.ok) {
          const errorData = await response.json(); // Nhận dữ liệu lỗi dưới dạng JSON
          setErrorMessage(errorData.error);
          setSuccesssubmit(false);
          setOpenpopup(true);
          console.error("Errorrrrrrrrrrrrrrrrrrrrrr:", errorData.error); // Log dữ liệu lỗi
          // Xử lý lỗi ở đây (nếu cần)
        }
        const data = await response.json();
        console.log("Response data:", data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    //api------daily---------------------end-------------------------------------------

    //api------weekly---------------------begin-------------------------------------------
    for (let i = 0; i < timeStartWeeklyArray.length; i++) {
      const startTime = timeStartWeeklyArray[i].value; // Thời gian bắt đầu
      const endTime = timeEndWeeklyArray[i].value; // Thời gian kết thúc
      const list = contentWeeklyArray[i].value.join(","); // Danh sách nội dung

      const startDateParts = timeBeginWeeklyArray[i].value.split("/"); // Tách ngày, tháng và năm
      const startDate = `${startDateParts[2]}-${startDateParts[0]}-${startDateParts[1]}`; // Định dạng lại theo yyyy-mm-dd

      const untilParts = timeUntilWeeklyArray[i].value.split("/"); // Tách ngày, tháng và năm
      const until = `${untilParts[2]}-${untilParts[0]}-${untilParts[1]}`; // Định dạng lại theo yyyy-mm-dd
      const label = labelOfScheduler; // Nhãn

      const daypick = listDayWeeklyArray[i].value.join(",");

      // Tạo đường dẫn API
      const url = `${API_BASE_URL}//schedule/addTask/weekly?stream=${channelStream}&list=${list}&starttime=${startTime}&endtime=${endTime}&startdate=${startDate}&until=${until}&label=${label}&days=${daypick}`;
      //console.log(url);
      //Gửi yêu cầu API
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          // body: JSON.stringify(payload) // Nếu cần gửi dữ liệu cụ thể, hãy thêm vào đây
        });

        if (!response.ok) {
          const errorData = await response.json(); // Nhận dữ liệu lỗi dưới dạng JSON
          setErrorMessage(errorData.error);
          setSuccesssubmit(false);
          setOpenpopup(true);
        }

        const data = await response.json();
        console.log("Response data:", data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    //api------weekly---------------------end-------------------------------------------

    //api------onetime---------------------begin-------------------------------------------
    for (let i = 0; i < timeStartOneTimeArray.length; i++) {
      const startTime = timeStartOneTimeArray[i].value; // Thời gian bắt đầu
      const endTime = timeEndOneTimeArray[i].value; // Thời gian kết thúc
      const list = contentOneTimeArray[i].value.join(","); // Danh sách nội dung

      const startDateParts = timeBeginOneTimeArray[i].value.split("/"); // Tách ngày, tháng và năm
      const startDate = `${startDateParts[2]}-${startDateParts[0]}-${startDateParts[1]}`; // Định dạng lại theo yyyy-mm-dd

      const label = labelOfScheduler; // Nhãn

      // Tạo đường dẫn API
      const url = `${API_BASE_URL}//schedule/addTask/onetime?stream=${channelStream}&list=${list}&starttime=${startTime}&endtime=${endTime}&startdate=${startDate}&label=${label}`;
      //console.log(url);
      //Gửi yêu cầu API
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          // body: JSON.stringify(payload) // Nếu cần gửi dữ liệu cụ thể, hãy thêm vào đây
        });

        if (!response.ok) {
          const errorData = await response.json(); // Nhận dữ liệu lỗi dưới dạng JSON
          setErrorMessage(errorData.error);
          setSuccesssubmit(false);
          setOpenpopup(true);
        }

        const data = await response.json();
        console.log("Response data:", data);
      } catch (error) {
        console.error("Error:", error);
        setSuccesssubmit(false);
      }
    }
    //api------onetime---------------------end-------------------------------------------
    //window.location.reload();
  };

  const handleSave = async () => {
    try {
      setSuccesssubmit(true);
      await handleSubmit(); // Gọi hàm để xử lý việc gửi API
      setSuccesssubmit((prevSuccess) => {
        if (prevSuccess) {
          setOpenpopupsuccess(1);
          // Thực hiện các hành động khác sau khi tất cả các yêu cầu API hoàn thành
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        return prevSuccess;
      });
    } catch (error) {
      console.error("Error while sending API requests:", error);
      // Thêm logic xử lý khi gặp lỗi khi gửi API nếu cần
    }
  };
  //gửi dữ liệu lập lịch------------------------------------end--------------------------

  //hiện popup lỗi-----------------------------------begin---------------------------------
  const [openpopup, setOpenpopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickOpenpopup = () => {
    setOpenpopup(true);
  };

  const handleClosepopup = () => {
    setOpenpopup(false);
  };
  //hiện popup lỗi -----------------------------------------end------------------------------
  //hiện popup thành công---------------------------------begin------------------------------
  const [openpopupsuccess, setOpenpopupsuccess] = useState(false);

  const handleClickOpenpopupsuccess = () => {
    setOpenpopupsuccess(true);
  };

  const handleClosepopupsuccess = () => {
    setOpenpopupsuccess(false);
  };
  //hiện popup thành công---------------------------------end--------------------------------
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{ sx: { width: "60%", maxWidth: "100%" } }}
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
                  setLabelOfScheduler(newValue); // Cập nhật giá trị của labelOfScheduler
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
      <ErrorPopup
        open={openpopup}
        handleClose={handleClosepopup}
        errorMessage={errorMessage}
      />
      <SuccessPopup
        open={openpopupsuccess}
        handleClose={handleClosepopupsuccess}
      />
    </LocalizationProvider>
  );
}
