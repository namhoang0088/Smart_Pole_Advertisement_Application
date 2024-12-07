import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import React, { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";

function SmartPoleModel() {
  const model = useGLTF(`${process.env.PUBLIC_URL}/smart_pole_3d.glb`);
  const ref = useRef();

  // Rotate the model slowly
  useFrame(() => {
    ref.current.rotation.y += 0.01; // Adjust rotation speed as needed
  });

  return <primitive object={model.scene} ref={ref} />;
}
function SensorModel() {
  const model = useGLTF(`${process.env.PUBLIC_URL}/sensor_3d.glb`);
  const ref = useRef();

  // Rotate the model slowly
  useFrame(() => {
    ref.current.rotation.y += 0.01; // Adjust rotation speed as needed
  });

  return <primitive object={model.scene} ref={ref} />;
}
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >

        {/* 3D Model Section */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          p="30px"
          borderRadius="20px"
          height = "500px"
        >
          <Canvas>
            <ambientLight intensity={3} />
            <directionalLight position={[5, 5, 5]} intensity={0.5} />
            <Suspense fallback={null}>
              <group scale={[6, 6, 6]}>
                <SmartPoleModel />
              </group>
            </Suspense>
            <OrbitControls />
          </Canvas>
        </Box>
        
        <Box gridColumn="span 9" >
        <Box display="flex">
        <Box
          backgroundColor={colors.primary[400]}
          p="10px"
          borderRadius="20px"
          height = "150px"
          width = "200px"
        > 
                  <Canvas>
            <ambientLight intensity={2} />
            <directionalLight position={[5, 5, 5]} intensity={0.5} />
            <Suspense fallback={null}>
              <group scale={[5, 5, 5]}>
                <SensorModel />
              </group>
            </Suspense>
            <OrbitControls />
          </Canvas>
        </Box>

        <Box
  backgroundColor={colors.greenAccent[600]}
  p="10px"
  borderRadius="20px"
  height="150px"
  width="800px"
  marginLeft="20px"
  padding="20px"
  style={{
    color: "white", // Màu chữ trắng
    fontSize: "20px", // Kích thước chữ (tuỳ chỉnh theo ý muốn)
    lineHeight: "1.5", // Khoảng cách giữa các dòng
    overflowWrap: "break-word", // Tự động xuống dòng nếu nội dung quá dài
    textAlign: "left", // Canh trái nội dung (tuỳ chỉnh)
  }}
>
  Cảm biến giám sát các môi trường ngoài trời (Sensor Outdoor) với đa dạng các loại cảm 
  biến: như nhiệt độ và độ ẩm, ánh sáng, CO2, Bụi PM2.5/PM10, tiếng ồn,.... Có khả năng 
  hoạt động trong các thời tiết xấu, có độ nhạy và chính xác cao, độ tuyến tính tốt, dễ dàng lắp 
  đặt và sử dụng. Có khả năng truyền xa bằng giao tiếp RS485 Modbus RTU.
</Box>





        </Box>





        </Box>

      


      </Box>
    </Box>
  );
};

export default Dashboard;
