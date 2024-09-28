import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import Header from "../../components/Header";
import { API_BASE_URL } from "../../data/link_api";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TrafficIcon from "@mui/icons-material/Traffic";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import OpacityIcon from "@mui/icons-material/Opacity";
import AirIcon from "@mui/icons-material/Air";
import GrainIcon from "@mui/icons-material/Grain";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import NoiseControlOffIcon from "@mui/icons-material/NoiseControlOff";
import LightModeIcon from "@mui/icons-material/LightMode";
import HistoryIcon from "@mui/icons-material/History";
import AirQualityHistory from "../../components/air_quality/AirHistory";
const getProgressColorHumi = (value) => {
  if (value <= 30) {
    return "red"; // 0-30: Đỏ
  } else if (value <= 50) {
    return "orange"; // 30-50: Cam
  } else if (value <= 80) {
    return "green"; // 50-80: Xanh lá
  } else {
    return "blue"; // 80-100: Xanh dương
  }
};

// Hàm tính màu sắc nhạt hơn dựa trên giá trị phần trăm cho Humi
const getLightColorHumi = (value) => {
  const baseColor = getProgressColorHumi(value);
  // Sử dụng độ trong suốt để tạo màu nhạt hơn
  switch (baseColor) {
    case "red":
      return "rgba(255, 0, 0, 0.3)";
    case "orange":
      return "rgba(255, 165, 0, 0.3)"; // Cam nhạt
    case "green":
      return "rgba(0, 255, 0, 0.3)";
    case "blue":
      return "rgba(0, 0, 255, 0.3)";
    default:
      return "rgba(0, 0, 0, 0.3)";
  }
};

// Tạo component HumiProgress
const HumiProgress = styled(LinearProgress)(({ theme, value }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: getLightColorHumi(value), // Màu nền nhạt hơn
    ...theme.applyStyles("dark", {
      backgroundColor: getLightColorHumi(value),
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: getProgressColorHumi(value), // Màu của thanh progress
    ...theme.applyStyles("dark", {
      backgroundColor: getProgressColorHumi(value),
    }),
  },
}));
{
  /* //------------------------------------------------------------------------------------------------------*/
}
const getProgressColorPM25 = (value) => {
  if (value <= 25) {
    return "green"; // 0-50: Xanh lá (Good)
  } else if (value <= 50) {
    return "yellow"; // 51-100: Vàng (Moderate)
  } else if (value <= 75) {
    return "orange"; // 101-150: Cam (Unhealthy for Sensitive Groups)
  } else if (value <= 100) {
    return "red"; // 151-200: Đỏ (Unhealthy)
  } else {
    return "purple"; // Trên 200: Tím (Very Unhealthy) nếu vượt quá giá trị max
  }
};

// Hàm tính màu nhạt hơn cho nồng độ PM2.5
const getLightColorPM25 = (value) => {
  const baseColor = getProgressColorPM25(value);
  // Sử dụng độ trong suốt để tạo màu nhạt hơn
  switch (baseColor) {
    case "green":
      return "rgba(0, 255, 0, 0.3)";
    case "yellow":
      return "rgba(255, 255, 0, 0.3)";
    case "orange":
      return "rgba(255, 165, 0, 0.3)";
    case "red":
      return "rgba(255, 0, 0, 0.3)";
    case "purple":
      return "rgba(128, 0, 128, 0.3)";
    default:
      return "rgba(0, 0, 0, 0.3)";
  }
};

const getProgressPercentage = (value) => {
  return (value / 200) * 100;
};

// Tạo component PM25Progress
const PM25Progress = styled(LinearProgress)(({ theme, value }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: getLightColorPM25(value), // Màu nền nhạt hơn
    ...theme.applyStyles("dark", {
      backgroundColor: getLightColorPM25(value),
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: getProgressColorPM25(value), // Màu của thanh progress
    ...theme.applyStyles("dark", {
      backgroundColor: getProgressColorPM25(value),
    }),
  },
}));
{
  /* //------------------------------------------------------------------------------------------------------*/
}
const getProgressColorNoise = (value) => {
  if (value <= 30) {
    return "green"; // 0-30: Xanh lá (Tốt)
  } else if (value <= 60) {
    return "yellow"; // 31-60: Vàng (Trung bình)
  } else if (value <= 85) {
    return "orange"; // 61-85: Cam (Nhóm nhạy cảm)
  } else if (value <= 100) {
    return "red"; // 86-100: Đỏ (Không lành mạnh)
  } else {
    return "purple"; // Trên 100: Tím (Rất không lành mạnh)
  }
};

// Hàm tính màu nhạt hơn cho nồng độ tiếng ồn
const getLightColorNoise = (value) => {
  const baseColor = getProgressColorNoise(value);
  switch (baseColor) {
    case "green":
      return "rgba(0, 255, 0, 0.3)";
    case "yellow":
      return "rgba(255, 255, 0, 0.3)";
    case "orange":
      return "rgba(255, 165, 0, 0.3)";
    case "red":
      return "rgba(255, 0, 0, 0.3)";
    case "purple":
      return "rgba(128, 0, 128, 0.3)";
    default:
      return "rgba(0, 0, 0, 0.3)";
  }
};

// Hàm chuyển đổi giá trị tiếng ồn (0-120 dB) thành phần trăm (0-100)
const getProgressPercentageNoise = (value) => {
  return Math.min((value / 120) * 100, 100); // Giới hạn giá trị ở mức tối đa 100%
};

// Tạo component NoiseProgress
const NoiseProgress = styled(LinearProgress)(({ theme, value }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: getLightColorNoise(value), // Màu nền nhạt hơn
    ...theme.applyStyles("dark", {
      backgroundColor: getLightColorNoise(value),
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: getProgressColorNoise(value), // Màu của thanh progress
    ...theme.applyStyles("dark", {
      backgroundColor: getProgressColorNoise(value),
    }),
  },
}));
{
  /* //------------------------------------------------------------------------------------------------------*/
}
const AirQuality = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [airqualityhistory, setAirqualityhistory] = useState(false);
  const handleClickAirqualityhistory = () => {
    setAirqualityhistory(true);
  };
  const handleCloserAirqualityhistory = () => {
    setAirqualityhistory(false);
  };

  return (
    <Box m="20px">
      <Box display="flex">
        <Header title="Air quality" subtitle="Welcome to Air quality" />
        <Box marginLeft="auto"></Box>
      </Box>

      <Accordion
        sx={{ borderRadius: "10px", overflow: "hidden" }} // Thêm borderRadius cho toàn bộ Accordion
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            backgroundColor: "#ebecf0",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center", // Căn chỉnh theo chiều
            justifyContent: "center",
            gap: 1, // Khoảng cách giữa icon và text
          }}
        >
          <TrafficIcon
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Smart pole 1
          </Typography>

          <MyLocationIcon
            sx={{
              color: colors.greenAccent[600],
              fontSize: "26px",
              marginLeft: "50px",
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            10.880415:106.805633
          </Typography>

          <LocationOnIcon
            sx={{
              color: colors.greenAccent[600],
              fontSize: "26px",
              marginLeft: "50px",
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Dĩ an
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {/* //------------------------------------------------------------------------------------------------------*/}
            <ListItem>
              <DeviceThermostatIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
              <Typography variant="h6" sx={{ marginRight: "10px" }}>
                Nhiệt độ
              </Typography>
              <Typography
                variant="h6"
                sx={{ marginRight: "10px", fontWeight: "bold" }}
              >
                30℃{" "}
              </Typography>
            </ListItem>
            {/* //------------------------------------------------------------------------------------------------------*/}
            <ListItem
              sx={{ height: "50px", display: "flex", alignItems: "center" }}
            >
              <OpacityIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
              <Typography variant="h6">Độ ẩm</Typography>
              <Box
                sx={{ width: "70%", marginLeft: "31px", marginRight: "10px" }}
              >
                <HumiProgress variant="determinate" value={90} />
              </Box>
              <Typography variant="h6">90%</Typography>
            </ListItem>
            {/* //------------------------------------------------------------------------------------------------------*/}
            <ListItem>
              <AirIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
              <Typography variant="h6">PM2.5</Typography>
              <Box
                sx={{ width: "70%", marginLeft: "34px", marginRight: "10px" }}
              >
                <PM25Progress
                  variant="determinate"
                  value={getProgressPercentage(100)}
                />
              </Box>
              <Typography variant="h6">100 µg/m³</Typography>
            </ListItem>
            {/* //------------------------------------------------------------------------------------------------------*/}
            <ListItem>
              <GrainIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
              <Typography variant="h6">PM10</Typography>
              <Box
                sx={{ width: "70%", marginLeft: "38px", marginRight: "10px" }}
              >
                <PM25Progress
                  variant="determinate"
                  value={getProgressPercentage(150)}
                />
              </Box>
              <Typography variant="h6">150 µg/m³</Typography>
            </ListItem>
            {/* //------------------------------------------------------------------------------------------------------*/}
            <ListItem>
              <NoiseControlOffIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
              <Typography variant="h6" sx={{ marginRight: "10px" }}>
                Tiếng ồn
              </Typography>
              <Box
                sx={{ width: "70%", marginLeft: "10px", marginRight: "10px" }}
              >
                <NoiseProgress
                  variant="determinate"
                  value={getProgressPercentageNoise(110)}
                />
              </Box>
              <Typography variant="h6">110 db</Typography>
            </ListItem>
            {/* //------------------------------------------------------------------------------------------------------*/}
            <ListItem>
              <LightModeIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
              <Typography variant="h6" sx={{ marginRight: "10px" }}>
                Cường độ ánh sáng
              </Typography>
              <Typography
                variant="h6"
                sx={{ marginRight: "10px", fontWeight: "bold" }}
              >
                1000 lx
              </Typography>
            </ListItem>
            {/* //------------------------------------------------------------------------------------------------------*/}
            <ListItem>
              <Button
                sx={{
                  backgroundColor: colors.greenAccent[600],
                  color: "text.primary",
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  transition: "background-color 0.3s, color 0.3s",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
                onClick={handleClickAirqualityhistory}
              >
                <HistoryIcon sx={{ color: "white", fontSize: "26px" }} />
                <Typography
                  variant="h6"
                  sx={{ marginLeft: "10px", color: "white" }}
                >
                  Lịch sử
                </Typography>
              </Button>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      <AirQualityHistory
        open={airqualityhistory}
        handleClose={handleCloserAirqualityhistory}
      />
    </Box>
  );
};
export default AirQuality;
