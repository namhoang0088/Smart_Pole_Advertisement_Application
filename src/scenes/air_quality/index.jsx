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

  const [smartPoleData, setSmartPoleData] = useState({
    name: "--",
    coordinates: "--",
    location: "--",
    sensors: {
      temperature: "--",
      humidity: "--",
      PM25: "--",
      PM10: "--",
      noise: "--",
      lux: "--",
    },
  });

  // Hàm gọi API từ Flask mỗi 2 giây
  useEffect(() => {
    const fetchSmartPoleData = () => {
      fetch("http://192.168.1.209:5000/get/smartpole")
        .then((response) => response.json())
        .then((data) => {
          setSmartPoleData(data);
        })
        .catch((error) => {
          console.error("Error fetching smart pole data:", error);
        });
    };

    // Gọi API lần đầu
    fetchSmartPoleData();

    // Thiết lập khoảng thời gian gọi API mỗi 2 giây
    const intervalId = setInterval(fetchSmartPoleData, 2000);

    // Xóa khoảng thời gian khi component bị hủy
    return () => clearInterval(intervalId);
  }, []);

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
            {smartPoleData.name}
          </Typography>

          <MyLocationIcon
            sx={{
              color: colors.greenAccent[600],
              fontSize: "26px",
              marginLeft: "50px",
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {smartPoleData.coordinates}
          </Typography>

          <LocationOnIcon
            sx={{
              color: colors.greenAccent[600],
              fontSize: "26px",
              marginLeft: "50px",
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {smartPoleData.location}
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
                {smartPoleData.sensors.temperature}℃{" "}
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
                <HumiProgress
                  variant="determinate"
                  value={smartPoleData.sensors.humidity}
                />
              </Box>
              <Typography variant="h6">
                {smartPoleData.sensors.humidity}%
              </Typography>
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
                  value={getProgressPercentage(smartPoleData.sensors.PM25)}
                />
              </Box>
              <Typography variant="h6">
                {smartPoleData.sensors.PM25} µg/m³
              </Typography>
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
                  value={getProgressPercentage(smartPoleData.sensors.PM10)}
                />
              </Box>
              <Typography variant="h6">
                {smartPoleData.sensors.PM10} µg/m³
              </Typography>
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
                  value={getProgressPercentageNoise(
                    smartPoleData.sensors.noise,
                  )}
                />
              </Box>
              <Typography variant="h6">
                {smartPoleData.sensors.noise} db
              </Typography>
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
                {smartPoleData.sensors.lux} lx
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

      <Accordion
        sx={{ borderRadius: "10px", overflow: "hidden", marginTop: "20px" }} // Thêm borderRadius cho toàn bộ Accordion
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
            Smart Pole 2
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
            BK-CS2
          </Typography>
        </AccordionSummary>
      </Accordion>

      <AirQualityHistory
        open={airqualityhistory}
        handleClose={handleCloserAirqualityhistory}
      />
      <img src="data:image/jpeg;base64,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" height="180" alt="sample" />
     
    </Box>
  );
};
export default AirQuality;
