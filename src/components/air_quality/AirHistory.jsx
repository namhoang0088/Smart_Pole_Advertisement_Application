import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { API_BASE_URL } from "../../data/link_api";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import GridViewIcon from "@mui/icons-material/GridView";
import { useTheme } from "@mui/material/styles";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, Button } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function AirQualityHistory({ open, handleClose, historyId }) {
  const theme = useTheme();
  
  // State để lưu dữ liệu biểu đồ
  const [humidityData, setHumidityData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [PM25Data, setPM25Data] = useState([]);
  const [PM10Data, setPM10Data] = useState([]);
  const [noiseData, setNoiseData] = useState([]);
  const [luxData, setLuxData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!historyId) return; // Kiểm tra nếu historyId không tồn tại thì dừng
  
      try {
        const response = await fetch(`${API_BASE_URL}/get/sensor_value?pole_id=${historyId}`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });
        const data = await response.json();
  
        // Dữ liệu JSON từ API chứa các giá trị `avg_data` và `timestamp`
        const humidity = data.map((item) => item.avg_data.humidity);
        const temperature = data.map((item) => item.avg_data.temperature);
        const pm25 = data.map((item) => item.avg_data.pm2_5);
        const pm10 = data.map((item) => item.avg_data.pm10);
        const noise = data.map((item) => item.avg_data.noise);
        const lux = data.map((item) => item.avg_data.lux);
        const timestamps = data.map((item) => item.timestamp);
  
        // Cập nhật state với dữ liệu từ API
        setHumidityData(humidity);
        setTemperatureData(temperature);
        setPM25Data(pm25);
        setPM10Data(pm10);
        setNoiseData(noise);
        setLuxData(lux);
        setLabels(timestamps);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [historyId]);

  // Hàm đổi màu cho các dữ liệu
  const ColorPM = (value) => {
    if (value <= 25) return "green";
    else if (value <= 50) return "yellow";
    else if (value <= 75) return "orange";
    else if (value <= 100) return "red";
    return "purple";
  };
  const ColorNoise = (value) => (value <= 30 ? "green" : value <= 60 ? "yellow" : value <= 85 ? "orange" : value <= 100 ? "red" : "purple");
  const ColorLux = (value) => (value <= 100 ? "blue" : value <= 500 ? "green" : "yellow");
  const ColorHumi = (value) => (value <= 30 ? "red" : value <= 50 ? "orange" : value <= 80 ? "green" : "blue");
  const ColorTemp = (value) => (value <= 10 ? "blue" : value <= 20 ? "green" : value <= 30 ? "yellow" : "red");

  // Thiết lập dữ liệu biểu đồ
  const humidata = {
    labels,
    datasets: [
      {
        label: "Humidity (%)",
        data: humidityData,
        borderColor: humidityData.map((value) => ColorHumi(value)),
        pointBackgroundColor: humidityData.map((value) => ColorHumi(value)),
      },
    ],
  };

  const tempdata = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatureData,
        borderColor: temperatureData.map((value) => ColorTemp(value)),
        pointBackgroundColor: temperatureData.map((value) => ColorTemp(value)),
      },
    ],
  };

  const pm25data = {
    labels,
    datasets: [
      {
        label: "PM2.5 (µg/m³)",
        data: PM25Data,
        borderColor: PM25Data.map((value) => ColorPM(value)),
        pointBackgroundColor: PM25Data.map((value) => ColorPM(value)),
      },
    ],
  };

  const pm10data = {
    labels,
    datasets: [
      {
        label: "PM10 (µg/m³)",
        data: PM10Data,
        borderColor: PM10Data.map((value) => ColorPM(value)),
        pointBackgroundColor: PM10Data.map((value) => ColorPM(value)),
      },
    ],
  };

  const noiseDataSet = {
    labels,
    datasets: [
      {
        label: "Noise (dB)",
        data: noiseData,
        borderColor: noiseData.map((value) => ColorNoise(value)),
        pointBackgroundColor: noiseData.map((value) => ColorNoise(value)),
      },
    ],
  };

  const luxDataSet = {
    labels,
    datasets: [
      {
        label: "Light (lux)",
        data: luxData,
        borderColor: luxData.map((value) => ColorLux(value)),
        pointBackgroundColor: luxData.map((value) => ColorLux(value)),
      },
    ],
  };

  // Tạo các options cho biểu đồ
  const createOptions = (maxValue) => ({
    responsive: true,
    scales: {
      y: { min: 0, max: maxValue },
    },
  });

  const tempOptions = createOptions(Math.max(...temperatureData) * 1.1);
  const humidOptions = createOptions(Math.max(...humidityData) * 1.1);
  const pm25Options = createOptions(Math.max(...PM25Data) * 1.1);
  const pm10Options = createOptions(Math.max(...PM10Data) * 1.1);
  const noiseOptions = createOptions(Math.max(...noiseData) * 1.1);
  const luxOptions = createOptions(Math.max(...luxData) * 1.1);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { width: "90%", maxWidth: "100%", height: "100%" } }}
    >
      <DialogTitle
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "rgb(116, 165, 138)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <GridViewIcon sx={{ marginRight: "8px", fontSize: "32px" }} />
        Lịch Sử Chất Lượng Không Khí
      </DialogTitle>
  
      <DialogContent dividers>
        {/* Biểu đồ hàng 1 */}
        <Box
          display="grid"
          gridTemplateColumns="50% 50%"
          gap="20px"
          alignItems="start"
        >
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "10px",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Line options={tempOptions} data={tempdata} />
          </Box>
  
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "10px",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              marginLeft: "10px",
              boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Line options={humidOptions} data={humidata} />
          </Box>
        </Box>
  
        {/* Biểu đồ hàng 2 */}
        <Box
          display="grid"
          gridTemplateColumns="50% 50%"
          gap="20px"
          alignItems="start"
          marginTop="20px"
        >
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "10px",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Line options={pm25Options} data={pm25data} />
          </Box>
  
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "10px",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              marginLeft: "10px",
              boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Line options={pm10Options} data={pm10data} />
          </Box>
        </Box>
  
        {/* Biểu đồ hàng 3 */}
        <Box
          display="grid"
          gridTemplateColumns="50% 50%"
          gap="20px"
          alignItems="start"
          marginTop="20px"
        >
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "10px",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Line options={noiseOptions} data={noiseDataSet} />
          </Box>
  
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "10px",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              marginLeft: "10px",
              boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Line options={luxOptions} data={luxDataSet} />
          </Box>
        </Box>
      </DialogContent>
  
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}
