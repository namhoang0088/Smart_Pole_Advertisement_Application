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
import { DatePicker, TimePicker, LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import InfoIcon from '@mui/icons-material/Info';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import SendIcon from "@mui/icons-material/Send";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ReactPlayer from 'react-player'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { MuiColorInput } from "mui-color-input";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import StarBorder from '@mui/icons-material/StarBorder';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/Inbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import dayjs from 'dayjs';
import ToggleDays from "./ToggleDay";
import AddIcon from '@mui/icons-material/Add';


export default function CustomDialog({ open, handleClose }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedFile, setSelectedFile] = useState(null);
  const [color, setColor] = useState('#ffffff');
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

  // chọn ngày trong tuần để lập lịch lặp lại hằng tuần --------------- begin------------------
  const [selectedDays, setSelectedDays] = useState([0, 2, 3]);

  const handleDaysChange = (event, newDays) => {
    setSelectedDays(newDays);
    // Thực hiện bất kỳ xử lý nào khác ở đây (nếu cần)
  };
  // chọn ngày trong tuần để lập lịch lặp lại hằng tuần --------------- end---------------


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Dialog onClose={handleClose} open={open} PaperProps={{ sx: { width: '60%', maxWidth: '80%' } }}>
      <DialogTitle id="customized-dialog-title" sx={{ fontSize: '24px', fontWeight: 'bold' }}>
        Chỉnh sửa lịch phát quảng cáo
      </DialogTitle>
      <DialogContent dividers>
        <Box gridColumn="span 1" backgroundColor="#f2f0f0" borderRadius="10px" padding="20px" height="auto" display="flex" flexDirection="column">
          {/* Dòng 1---------------------------------------------------------- */}
          <Box marginBottom="20px" display="flex" alignItems="center">
            <InfoIcon sx={{ color: '#4cceac', fontSize: "36px" }} />
            <Typography variant="h4" marginRight="10px" paddingLeft="10px">
              <strong>Tên quảng cáo</strong>
            </Typography>
            <TextField label="Đổi tên quảng cáo" variant="outlined" defaultValue="Du lịch" sx={{ width: "300px" }} />
          </Box>

          {/* Dòng thứ hai: "Chọn video" và trường nhập dữ liệu --------------------------------------*/}
          <Box marginBottom="20px" display="flex" alignItems="center">
            <OndemandVideoIcon sx={{ color: '#4cceac', fontSize: "36px" }} />
            <Typography variant="h4" marginRight="10px" paddingLeft="10px">
              <strong>Nội dung</strong>
            </Typography>
            <ReactPlayer
              url={[{ src: '/assets/1080p.mp4', type: 'video/mp4', quality: '1080' }]}
              controls={true}
              width="640px"
              height="360px"
            />
          </Box>

          {/* Dòng thứ ba -------------------------------------------------------------------*/}
          <Box marginBottom="30px" marginTop="20px" display="flex" alignItems="center">
            <ChangeCircleIcon sx={{ color: '#4cceac', fontSize: "36px" }} />
            <Typography variant="h4" marginRight="10px" paddingLeft="10px">
              <strong>Thay đổi nội dung</strong>
            </Typography>
            <TextField id="outlined-basic" label="Video upload" variant="outlined" value={selectedFile ? selectedFile.name : ""} />
            <Button variant="contained" component="label" sx={{ backgroundColor: '#4cceac', color: "#fff", marginLeft: "20px" }} endIcon={<UploadFileIcon />}>
              <Typography variant="body1">Upload here</Typography>
              <input type="file" accept="video/*" hidden onChange={handleFileChange} />
            </Button>
          </Box>

          {/* Dòng thứ tư ----------------------------------------------------*/}
          <Box marginBottom="30px" display="flex" alignItems="center">
            <ColorLensIcon sx={{ color: '#4cceac', fontSize: "36px" }} />
            <Typography variant="h4" marginRight="10px" paddingLeft="10px">
              <strong>Màu hiển thị trên lịch </strong>
            </Typography>
            <MuiColorInput value={color} onChange={handleChange} />
          </Box>

          {/* Dòng thứ năm ------------------------------------------------*/}
          <Box marginBottom="20px" display="flex" alignItems="center">
            <AccessTimeIcon sx={{ color: '#4cceac', fontSize: "36px" }} />
            <Typography variant="h4" marginRight="10px" paddingLeft="10px">
              <strong>Lịch chiếu</strong>
            </Typography>

            {/* Box con--------------begin---------------------*/}
            <Box marginBottom="20px" flexDirection="column" alignItems="center" backgroundColor="#ffffff" borderRadius="10px" flex="1" height="auto" padding="20px">
              {/* lặp lại hằng ngày ------------begin---------------*/}
              <Box marginBottom="20px" flexDirection="column" alignItems="center">
                <ListItemButton onClick={handleClickDay}>
                  <ListItemIcon>
                <img src="/assets/day.png" alt="Day Icon" style={{ width: "36px", height: "36px", marginRight: "10px" }} />
                <Typography variant="h4" marginRight="10px" paddingLeft="10px">
                  <strong>Lặp lại hằng ngày</strong>
                </Typography>
                  </ListItemIcon>
                  {openDay ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openDay} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                  {/*nội dung trogn collapse---------------begin--------------*/}

                  <Box marginBottom="20px" padding="10px" display="flex" alignItems="center" backgroundColor={colors.grey[900]} borderRadius="10px">
                  <TimePicker label="Thời gian bắt đầu" defaultValue={dayjs('2022-04-17T15:30')} />
                  <span style={{ fontSize: '1.5em', margin: '0 10px' }}>-</span>
                  <TimePicker label="Thời gian kết thúc" defaultValue={dayjs('2022-04-17T16:30')} />
                  <Button variant="contained" sx={{ backgroundColor: '#757575', color: "#fff", marginLeft: "20px", display: 'flex', alignItems: 'center', padding : "5px",}}>
                  <DeleteForeverIcon />
                  </Button>          
                  </Box>  

                  <Box marginBottom="20px" padding="10px" display="flex" alignItems="center" backgroundColor={colors.grey[900]} borderRadius="10px">
                  <TimePicker label="Thời gian bắt đầu" defaultValue={dayjs('2022-04-17T9:30')} />
                  <span style={{ fontSize: '1.5em', margin: '0 10px' }}>-</span>
                  <TimePicker label="Thời gian kết thúc" defaultValue={dayjs('2022-04-17T10:30')} />
                  <Button variant="contained" sx={{ backgroundColor: '#757575', color: "#fff", marginLeft: "20px", display: 'flex', alignItems: 'center', padding : "5px",}}>
                  <DeleteForeverIcon />
                  </Button>          
                  </Box>

                  <Button variant="outlined" sx={{marginLeft: "200px",}} startIcon={<AddIcon />}>Thêm lịch chiếu</Button>        

                  {/*nội dung trogn collapse---------------end --------------*/}
                  </List>
                </Collapse>
              </Box>
              {/* lặp lại hằng ngày ------------end---------------*/}

              {/* lặp lại hằng tuần ------------begin---------------*/}
              <Box marginBottom="20px" flexDirection="column" alignItems="center" >
                <ListItemButton onClick={handleClickWeek}>
                  <ListItemIcon>
                <img src="/assets/week.png" alt="Day Icon" style={{ width: "36px", height: "36px", marginRight: "10px" }} />
                <Typography variant="h4" marginRight="10px" paddingLeft="10px">
                  <strong>Lặp lại hằng tuần</strong>
                </Typography>
                  </ListItemIcon>
                  {openWeek? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openWeek} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>

                  <Box marginBottom="20px" padding="10px" flexDirection="column" alignItems="center" backgroundColor={colors.grey[900]} borderRadius="10px">
                  
                  <Box display="flex" alignItems="center">
                  <TimePicker label="Thời gian bắt đầu" defaultValue={dayjs('2022-04-17T15:30')} />
                  <span style={{ fontSize: '1.5em', margin: '0 10px' }}>-</span>
                  <TimePicker label="Thời gian kết thúc" defaultValue={dayjs('2022-04-17T16:30')} />
                  <Button variant="contained" sx={{ backgroundColor: '#757575', color: "#fff", marginLeft: "20px", display: 'flex', alignItems: 'center', padding : "5px",}}>
                  <DeleteForeverIcon />
                  </Button>          
                  </Box>

                  <ToggleDays value={selectedDays} onChange={handleDaysChange} />

                  </Box>
                  <Button variant="outlined" sx={{marginLeft: "200px",}} startIcon={<AddIcon />}>Thêm lịch chiếu</Button>
                  </List>
                </Collapse>
              </Box>
              {/* lặp lại tuần ------------end---------------*/}

              {/* lịch chiếu linh hoạt ------------begin---------------*/}
              <Box marginBottom="20px" flexDirection="column" alignItems="center">
                <ListItemButton onClick={handleClickFlex}>
                  <ListItemIcon>
                <img src="/assets/flex.png" alt="Day Icon" style={{ width: "36px", height: "36px", marginRight: "10px" }} />
                <Typography variant="h4" marginRight="10px" paddingLeft="10px">
                  <strong>Lịch chiếu linh hoạt</strong>
                </Typography>
                  </ListItemIcon>
                  {openFlex ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openFlex} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>

                  <Box marginBottom="20px" padding="10px" display="flex" alignItems="center" backgroundColor={colors.grey[900]} borderRadius="10px">
                  <DateTimePicker label="Thời gian bắt đầu" />
                  <span style={{ fontSize: '1.5em', margin: '0 10px' }}>-</span>
                  <DateTimePicker label="Thời gian kết thúc" />
                  <Button variant="contained" sx={{ backgroundColor: '#757575', color: "#fff", marginLeft: "20px", display: 'flex', alignItems: 'center', padding : "5px",}}>
                  <DeleteForeverIcon />
                  </Button>          
                  </Box>

                  <Button variant="outlined" sx={{marginLeft: "200px",}} startIcon={<AddIcon />}>Thêm lịch chiếu</Button>

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
        <Button autoFocus onClick={handleClose} variant="contained" sx={{ backgroundColor: '#757575', color: "#fff", marginLeft: "20px", marginTop: "20px" }} endIcon={<DeleteForeverIcon />}>
          Xóa quảng cáo
        </Button>
        <Button autoFocus onClick={handleClose} variant="contained" sx={{ backgroundColor: '#e57373', color: "#fff", marginLeft: "20px", marginTop: "20px" }} endIcon={<CancelIcon />}>
          Hủy
        </Button>
        <Button autoFocus onClick={handleClose} variant="contained" sx={{ backgroundColor: '#4cceac', color: "#fff", marginLeft: "20px", marginTop: "20px" }} endIcon={<CheckIcon />}>
          Lưu thay đổi
        </Button>
      </DialogActions>
    </Dialog>
    </LocalizationProvider>
  );
}