import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
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

// Hàm đổi màu cho PM2.5 và PM10
const ColorPM = (value) => {
  if (value <= 25) {
    return "green";
  } else if (value <= 50) {
    return "yellow";
  } else if (value <= 75) {
    return "orange";
  } else if (value <= 100) {
    return "red";
  } else {
    return "purple";
  }
};

// Hàm đổi màu cho noise
const ColorNoise = (value) => {
  if (value <= 30) {
    return "green";
  } else if (value <= 60) {
    return "yellow";
  } else if (value <= 85) {
    return "orange";
  } else if (value <= 100) {
    return "red";
  } else {
    return "purple";
  }
};

// Hàm đổi màu cho lux
const ColorLux = (value) => {
  if (value <= 100) {
    return "blue";
  } else if (value <= 500) {
    return "green";
  } else {
    return "yellow";
  }
};

// Hàm đổi màu dựa trên giá trị độ ẩm
const ColorHumi = (value) => {
  if (value <= 30) {
    return "red";
  } else if (value <= 50) {
    return "orange";
  } else if (value <= 80) {
    return "green";
  } else {
    return "blue";
  }
};

// Hàm đổi màu cho nhiệt độ
const ColorTemp = (value) => {
  if (value <= 10) {
    return "blue";
  } else if (value <= 20) {
    return "green";
  } else if (value <= 30) {
    return "yellow";
  } else {
    return "red";
  }
};

// Dữ liệu giả lập
const humidityData = [
  45, 55, 62, 48, 50, 75, 85, 90, 67, 72, 49, 50, 65, 88, 40, 30, 55, 70, 82,
  45, 55, 60, 72, 68,
];
const temperatureData = [
  15, 18, 20, 22, 25, 28, 30, 35, 32, 29, 26, 22, 19, 15, 10, 8, 12, 18, 25, 30,
  35, 32, 27, 20,
];
const PM25Data = [
  10, 20, 35, 40, 60, 75, 80, 50, 25, 30, 45, 55, 65, 70, 40, 35, 50, 60, 75,
  85, 90, 95, 100, 110,
];
const PM10Data = [
  15, 30, 45, 50, 65, 80, 85, 55, 30, 35, 50, 60, 70, 75, 45, 40, 55, 65, 80,
  90, 95, 100, 105, 115,
];
const noiseData = [
  20, 35, 45, 55, 70, 80, 85, 50, 40, 30, 60, 75, 80, 65, 55, 50, 65, 75, 85,
  90, 95, 100, 105, 110,
];
const luxData = [
  50, 100, 200, 300, 400, 500, 600, 300, 200, 100, 250, 350, 450, 550, 300, 200,
  350, 450, 550, 600, 650, 700, 750, 800,
];

export default function AirQualityHistory({ open, handleClose }) {
  const theme = useTheme();

  // Thiết lập dữ liệu biểu đồ
  const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  const humidata = {
    labels,
    datasets: [
      {
        label: "Humidity (%)",
        data: humidityData,
        borderColor: humidityData.map((value) => ColorHumi(value)),
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 3,
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
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 3,
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
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 3,
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
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 3,
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
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 3,
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
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: luxData.map((value) => ColorLux(value)),
      },
    ],
  };

  // Tính toán giá trị tối đa từ mỗi mảng dữ liệu
  const maxHumidity =
    Math.max(...humidityData) + Math.max(...humidityData) * 0.1;
  const maxTemperature =
    Math.max(...temperatureData) + Math.max(...temperatureData) * 0.1;
  const maxPM25 = Math.max(...PM25Data) + Math.max(...PM25Data) * 0.1;
  const maxPM10 = Math.max(...PM10Data) + Math.max(...PM10Data) * 0.1;
  const maxNoise = Math.max(...noiseData) + Math.max(...noiseData) * 0.1;
  const maxLux = Math.max(...luxData) + Math.max(...luxData) * 0.1;

  // Hàm thiết lập options cho biểu đồ
  const createOptions = (maxValue) => ({
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            label +=
              context.raw +
              (context.dataset.label.includes("dB")
                ? " dB"
                : context.dataset.label.includes("lux")
                  ? " lux"
                  : " µg/m³");
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Time (24h)",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Value",
        },
        min: 0,
        max: maxValue, // Sử dụng giá trị tối đa từ dữ liệu
      },
    },
  });

  // Cập nhật các biến options cho các biểu đồ
  const tempOptions = createOptions(maxTemperature);
  const humidOptions = createOptions(maxHumidity);
  const pm25Options = createOptions(maxPM25);
  const pm10Options = createOptions(maxPM10);
  const noiseOptions = createOptions(maxNoise);
  const luxOptions = createOptions(maxLux);

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
          {/*1------------begin--------------------------------------- */}
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

          {/*2------------begin--------------------------------------- */}
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

        {/* Biểu đồ hàng 2 -----------------------------------------------------------------------------*/}
        <Box
          display="grid"
          gridTemplateColumns="50% 50%"
          gap="20px"
          alignItems="start"
          marginTop="20px"
        >
          {/*1------------begin--------------------------------------- */}
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

          {/*2------------begin--------------------------------------- */}
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
        {/* Biểu đồ hàng 3 -------------------------------------------------------------*/}
        <Box
          display="grid"
          gridTemplateColumns="50% 50%"
          gap="20px"
          alignItems="start"
          marginTop="20px"
        >
          {/*1------------begin--------------------------------------- */}
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

          {/*2------------begin--------------------------------------- */}
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