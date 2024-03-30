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


export default function CustomDialog({ open, handleClose }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const [color, setColor] = React.useState('#ffffff')

  const handleChange = (color) => {
    setColor(color)
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Dialog onClose={handleClose} open={open}   PaperProps={{
    sx: {
      width: '60%', // Thiết lập chiều rộng mong muốn
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
            <InfoIcon
              sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
            />
            <Typography variant="h4" marginRight="10px" paddingLeft="10px">
              <strong>Tên quảng cáo</strong>
            </Typography>
            <TextField label="Đổi tên quảng cáo" variant="outlined" defaultValue="Du lịch"  sx={{ width: "300px" }} /> 
          </Box>

          {/* Dòng thứ hai: "Chọn video" và trường nhập dữ liệu --------------------------------------*/}
          <Box marginBottom="20px" display="flex" alignItems="center">
            <OndemandVideoIcon
              sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
            />
            <Typography variant="h4" marginRight="10px" paddingLeft="10px">
              <strong>Nội dung</strong>
            </Typography>
            <ReactPlayer
  url={[
    { src: '/assets/1080p.mp4', type: 'video/mp4', quality: '1080' }
  ]}
  controls={true}
  width="640px"
  height="360px"
/>
          </Box>

          {/* Dòng thứ ba -------------------------------------------------------------------*/}
          <Box
            marginBottom="30px"
            marginTop="20px"
            display="flex"
            alignItems="center"
          >
            <ChangeCircleIcon
              sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
            />
            <Typography variant="h4" marginRight="10px" paddingLeft="10px">
              <strong>Thay đổi quảng cáo</strong>
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
   
          {/* Dòng thứ tư ----------------------------------------------------*/}
          <Box marginBottom="30px" display="flex" alignItems="center">
              <ColorLensIcon sx={{ color: colors.greenAccent[600], fontSize: "36px" }} />
              <Typography variant="h4" marginRight="10px" paddingLeft="10px">
                <strong>Màu hiển thị trên lịch </strong>
              </Typography>
              <MuiColorInput value={color} onChange={handleChange} />
            </Box>


          {/* Dòng thứ năm ------------------------------------------------*/}
          <Box marginBottom="20px" display="flex" alignItems="center">
              <AccessTimeIcon sx={{ color: colors.greenAccent[600], fontSize: "36px" }} />
              <Typography variant="h4" marginRight="10px" paddingLeft="10px">
                <strong>Lịch chiếu</strong>
              </Typography>

              {/*box con--------------begin---------------------*/}
              <Box marginBottom="20px"  flexDirection="column" alignItems="center" backgroundColor={colors.white[100]} borderRadius="10px" flex="1" height="auto" padding="20px ">
              
              {/* lặp lại hằng ngày ------------begin---------------*/}
              <Box marginBottom="20px"   display="flex"  alignItems="center" >
              <img src="/assets/day.png" alt="Day Icon" style={{ width: "36px", height: "36px", marginRight: "10px" }} />
              <Typography variant="h4" marginRight="10px" paddingLeft="10px">
                <strong>Lặp lại hằng ngày</strong>
              </Typography>
              </Box>
              {/* lặp lại hằng ngày ------------end---------------*/}

              {/* lặp lại hằng tuần ------------begin---------------*/}
              <Box marginBottom="20px"   display="flex"  alignItems="center" >
              <img src="/assets/week.png" alt="Day Icon" style={{ width: "36px", height: "36px", marginRight: "10px" }} />
              <Typography variant="h4" marginRight="10px" paddingLeft="10px">
                <strong>Lặp lại hằng tuần</strong>
              </Typography>
              </Box>
              {/* lặp lại tuần ------------end---------------*/}

              {/* lịch chiếu linh hoạt ------------begin---------------*/}
              <Box marginBottom="20px"   display="flex"  alignItems="center" >
              <img src="/assets/flex.png" alt="Day Icon" style={{ width: "36px", height: "36px", marginRight: "10px" }} />
              <Typography variant="h4" marginRight="10px" paddingLeft="10px">
                <strong>Lịch chiếu linh hoạt</strong>
              </Typography>

              </Box>
              {/* lịch chiếu linh hoạt ------------end---------------*/}


              </Box>
              


              {/*box con--------------end---------------------*/}
            
            </Box>


          
          {/* Dòng thứ sáu -------------------------------------------------*/}
  
        </Box>
      </DialogContent>{/* hết dialog content--------------------------------------------------*/}

      <DialogActions>
        <Button
            autoFocus onClick={handleClose}
            variant="contained"
            sx={{
              backgroundColor: colors.grey[600],
              color: "#fff",
              marginLeft: "20px",
              marginTop: "20px",
            }}
            endIcon={<DeleteForeverIcon />}
          >
            Xóa quảng cáo
          </Button>

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
