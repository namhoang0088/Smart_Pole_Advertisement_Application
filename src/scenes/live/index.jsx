import React, { useState } from "react";
import {
  Box,
  ListItemButton,
  ListItemIcon,
  Typography,
  Collapse,
  List,
  Button,
  Checkbox,
} from "@mui/material";
import Header from "../../components/Header";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";

const LiveAd = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openListPole, setOpenListPole] = useState(true);
  const [isMicOn, setIsMicOn] = useState(false); // Trạng thái của mic, mặc định là tắt
  const [isCameraOn, setIsCameraOn] = useState(false); // Trạng thái của camera, mặc định là tắt
  const [micStream, setMicStream] = useState(null); // Lưu trữ stream từ microphone
  const [cameraStream, setCameraStream] = useState(null); // Lưu trữ stream từ camera

  const handleClickListPole = () => {
    setOpenListPole(!openListPole);
  };

  const handleMicToggle = () => {
    setIsMicOn(!isMicOn); // Đảo ngược trạng thái mic

    if (!isMicOn) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          setMicStream(stream);
        })
        .catch((error) => {
          console.error("Lỗi khi truy cập microphone:", error);
        });
    } else {
      // Tắt microphone
      micStream.getAudioTracks().forEach((track) => track.stop());
      setMicStream(null);
    }
  };

  const handleCameraToggle = () => {
    setIsCameraOn(!isCameraOn); // Đảo ngược trạng thái camera

    if (!isCameraOn) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          setCameraStream(stream);
          const videoElement = document.getElementById("liveVideo");
          if (videoElement) {
            videoElement.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error("Lỗi khi truy cập camera:", error);
        });
    } else {
      // Tắt camera
      cameraStream.getVideoTracks().forEach((track) => track.stop());
      setCameraStream(null);
      const videoElement = document.getElementById("liveVideo");
      if (videoElement) {
        videoElement.srcObject = null;
      }
    }
  };

  return (
    <Box m="20px">
      <Header title="Live Stream" subtitle="Welcome to Live Stream" />
      <Box
        display="grid"
        gridTemplateColumns="70% 30%"
        gap="20px"
        alignItems="start"
      >
        <Box //phần live
          backgroundColor={colors.primary[400]}
          borderRadius="10px"
          padding="10px"
          height="500px"
          display="flex"
          flexDirection="column"
          justifyContent="center" // căn video theo chiều dọc
          alignItems="center" // căn video theo chiều ngang
          style={{ overflow: "hidden", position: "relative" }}
        >
          <video
            id="liveVideo"
            autoPlay
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
              objectFit: "contain",
            }}
          ></video>
        </Box>

        <Box // phần chọn smart pole
          backgroundColor={colors.primary[400]}
          borderRadius="10px"
          padding="20px"
          height="auto"
        >
          <Box marginBottom="20px" flexDirection="column" alignItems="center">
            <ListItemButton onClick={handleClickListPole}>
              <ListItemIcon>
                <img
                  src="/assets/smart_pole.webp"
                  alt="Day Icon"
                  style={{ width: "36px", height: "36px", marginRight: "10px" }}
                />
                <Typography variant="h4" marginRight="10px" paddingLeft="10px">
                  <strong>Danh sách khu vực Smart Pole</strong>
                </Typography>
              </ListItemIcon>
              {openListPole ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openListPole} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Box
                  marginBottom="10px"
                  padding="5px"
                  display="flex"
                  alignItems="center"
                  backgroundColor="#ffffff"
                  borderRadius="10px"
                >
                  <Typography
                    variant="h6"
                    marginRight="10px"
                    paddingLeft="10px"
                  >
                    <strong>Hồ Chí Minh</strong>
                  </Typography>
                  <Checkbox color="primary" style={{ marginLeft: "auto" }} />
                </Box>

                <Box
                  marginBottom="10px"
                  padding="5px"
                  display="flex"
                  alignItems="center"
                  backgroundColor="#ffffff"
                  borderRadius="10px"
                >
                  <Typography
                    variant="h6"
                    marginRight="10px"
                    paddingLeft="10px"
                  >
                    <strong>Hà Nội</strong>
                  </Typography>
                  <Checkbox color="primary" style={{ marginLeft: "auto" }} />
                </Box>

                <Box
                  marginBottom="10px"
                  padding="5px"
                  display="flex"
                  alignItems="center"
                  backgroundColor="#ffffff"
                  borderRadius="10px"
                >
                  <Typography
                    variant="h6"
                    marginRight="10px"
                    paddingLeft="10px"
                  >
                    <strong>Đà Nẵng</strong>
                  </Typography>
                  <Checkbox color="primary" style={{ marginLeft: "auto" }} />
                </Box>
              </List>
            </Collapse>
          </Box>

          <Box display="flex" alignItems="center" marginLeft="50px">
            <Button
              variant="contained"
              sx={{
                backgroundColor: isMicOn ? "#007FFF" : "#757575",
                color: "#fff",
                marginLeft: "20px",
                display: "flex",
                alignItems: "center",
                padding: "5px",
              }}
              onClick={handleMicToggle}
            >
              {isMicOn ? (
                <MicIcon fontSize="large" />
              ) : (
                <MicOffIcon fontSize="large" />
              )}
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: isCameraOn ? "#007FFF" : "#757575",
                color: "#fff",
                marginLeft: "20px",
                display: "flex",
                alignItems: "center",
                padding: "5px",
              }}
              onClick={handleCameraToggle}
            >
              {isCameraOn ? (
                <VideocamIcon fontSize="large" />
              ) : (
                <VideocamOffIcon fontSize="large" />
              )}
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FF0000",
                color: "#fff",
                marginLeft: "20px",
                display: "flex",
                alignItems: "center",
                padding: "5px",
              }}
            >
              <PhoneDisabledIcon fontSize="large" />
            </Button>
          </Box>

          <Box display="flex" alignItems="center" marginLeft="50px">
            <Button
              variant="outlined"
              sx={{
                color: "#007FFF", // Màu chữ là màu xanh lấp biển
                borderColor: "#007FFF", // Màu viền là màu xanh lấp biển
                backgroundColor: "#FFFFFF", // Màu nền là màu trắng
                marginTop: "20px",
                marginLeft: "60px",
                fontSize: "1.2rem", // kích thước chữ
                fontWeight: "bold", // in đậm chữ
                padding: "15px 20px", // padding để tạo button lớn hơn
                borderRadius: "10px", // bo tròn góc
                "&:hover": {
                  // thêm hiệu ứng hover khi di chuột qua button
                  backgroundColor: "#007FFF", // Màu nền khi hover là màu xanh lấp biển
                  color: "#FFFFFF", // Màu chữ là màu trắng khi hover
                },
              }}
            >
              Go Live Here!
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LiveAd;
