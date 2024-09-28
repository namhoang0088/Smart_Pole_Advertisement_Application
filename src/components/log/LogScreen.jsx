import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import React, { useEffect, useState } from 'react';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import { GaugeComponent } from 'react-gauge-component';
import PercentIcon from '@mui/icons-material/Percent';
import AutofpsSelectIcon from '@mui/icons-material/AutofpsSelect';
import MemoryIcon from '@mui/icons-material/Memory';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import TrafficIcon from '@mui/icons-material/Traffic';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';
import GridViewIcon from '@mui/icons-material/GridView';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import Filter4Icon from '@mui/icons-material/Filter4';
import Filter5Icon from '@mui/icons-material/Filter5';
import Filter6Icon from '@mui/icons-material/Filter6';
export default function LogScreen({ open, handleClose }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const currentHost = window.location.hostname;

  const [performanceData1, setPerformanceData1] = useState({
    cpu: 0,
    bandwidth: 0,
    fps: 0,
  });

  const [performanceData2, setPerformanceData2] = useState({
    cpu: 0,
    bandwidth: 0,
    fps: 0,
  });

  const [performanceData3, setPerformanceData3] = useState({
    cpu: 0,
    bandwidth: 0,
    fps: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${window.location.hostname}:8000/get/stats`);
        const data = await response.json();
        setPerformanceData1({
          cpu: data.stream_1.cpu_usage,
          bandwidth: data.stream_1.memory_usage,
          fps: data.stream_1.active_fps,
        });
        setPerformanceData2({
          cpu: data.stream_2.cpu_usage,
          bandwidth: data.stream_2.memory_usage,
          fps: data.stream_2.active_fps,
        });
        setPerformanceData3({
          cpu: data.stream_3.cpu_usage,
          bandwidth: data.stream_3.memory_usage,
          fps: data.stream_3.active_fps,
        });
      } catch (error) {
        console.error("Error fetching performance data:", error);
      }
    };
    console.log("fngfkjnkdjngkjdngkfngkfdg",performanceData1)
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval); // Clear interval when component unmounts
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { width: "90%", maxWidth: "100%", height:"100%" } }}
    >
      <DialogTitle sx={{ fontSize: "24px", fontWeight: "bold", color: "rgb(116, 165, 138)", display: 'flex', alignItems: 'center' }}>
        <GridViewIcon  sx={{ marginRight: '8px', fontSize: '32px' }} /> Log Screen
      </DialogTitle>

      <DialogContent dividers>

        <Box
        display="grid"
        gridTemplateColumns="32% 32% 32%"
        gap="20px"
        alignItems="start"
      > 
{/*1------------begin--------------------------------------- */}
  <Box
    sx={{
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '10px',
      height: '600px',
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '20px',
      boxShadow: '4px 4px 4px 4px rgba(0, 0, 0, 0.2)',
      '&:hover': {
        backgroundColor: colors.blueAccent[600],
      }
    }}
  >
          <iframe
    src={`https://player.twitch.tv/?channel=gutsssssssss9&parent=${currentHost}`}
    height="35%"
    width="100%"
    allowfullscreen>
</iframe>
<Box display="flex" marginTop="10px">
<SubscriptionsIcon  style={{ fontSize: '30px', color: 'black' }} />
<Typography variant="h3" style={{ color: 'black',  fontWeight: 'bold'}}>
                    Channel:
</Typography>
<Filter1Icon style={{ fontSize: '30px', color: 'black', marginLeft: '10px' }}/>
</Box>

<Box display="flex" marginTop="10px">
<ContentPasteIcon style={{ fontSize: '30px', color: 'black' }} />
<Typography variant="h3" style={{ color: 'black',  fontWeight: 'bold'}}>
                    Nội dung hiện tại:
</Typography>
</Box>

<Box display="flex" alignItems="center" marginTop="10px" >
<PercentIcon style={{ fontSize: '30px', color: 'black' }} />
<Typography variant="h3" style={{ color: 'black',  fontWeight: 'bold'}}>
                    CPU:
</Typography>
  <GaugeComponent
    type="semicircle"
    arc={{
      colorArray: ['#00FF15', '#FF2121'],
      padding: 0.02,
      subArcs: [
        { limit: 10 },
        { limit: 20 },
        { limit: 50 },
        {},
        {},
        {},
        {}
      ],
    }}
    pointer={{ type: "blob", animationDelay: 0 }}
    value={performanceData1.cpu}
    labels={{
      valueLabel: {
        fontSize: 30, // Chỉnh kích thước chữ của giá trị
        formatTextValue: (value) => `${value} %`,
      },
      tickLabels: {
        hideMinMax: true,
        type: "outer",
        valueConfig: {
          formatTextValue: (value) => `${value} %`,
        }
      }
    }}
    maxValue={100}
    style={{ width: '150px', height: '75px' , marginLeft:'110px'}} // Chỉnh kích thước GaugeComponent
  />
</Box>

<Box display="flex" alignItems="center" marginTop="10px">
<MemoryIcon style={{ fontSize: '30px', color: 'black' }} />
<Typography variant="h3" style={{ color: 'black',  fontWeight: 'bold'}}>
Memory Usage:
</Typography>
  <GaugeComponent
    type="semicircle"
    arc={{
      colorArray: ['#0abcfd', '#77ff8a'],
      padding: 0.02,
      subArcs: [
        { limit: 10 },
        { limit: 20 },
        { limit: 50 },
        {},
        {},
        {},
        {}
      ],
    }}
    pointer={{ type: "blob", animationDelay: 0 }}
    value={performanceData1.bandwidth}
    labels={{
      valueLabel: {
        fontSize: 30, // Chỉnh kích thước chữ của giá trị
        formatTextValue: (value) => `${value} Mbps`,
      },
      tickLabels: {
        hideMinMax: true,
        type: "outer",
        valueConfig: {
          formatTextValue: (value) => `${value} Mbps`,
        }
      }
    }}
    maxValue={100}
    style={{ width: '150px', height: '75px' }} // Chỉnh kích thước GaugeComponent
  />
</Box>

<Box display="flex" alignItems="center" marginTop="10px">
<AutofpsSelectIcon style={{ fontSize: '30px', color: 'black' }} />
<Typography variant="h3" style={{ color: 'black',  fontWeight: 'bold'}}>
                    FPS:
</Typography>
  <GaugeComponent
    type="semicircle"
    arc={{
      colorArray: ['#8158d8', '#ff71c6'],
      padding: 0.02,
      subArcs: [
        { limit: 10 },
        { limit: 20 },
        { limit: 50 },
        {},
        {},
        {},
        {}
      ],
    }}
    pointer={{ type: "blob", animationDelay: 0 }}
    value={performanceData1.fps}
    labels={{
      valueLabel: {
        fontSize: 30, // Chỉnh kích thước chữ của giá trị
        formatTextValue: (value) => `${value} FPS`,
      },
      tickLabels: {
        hideMinMax: true,
        type: "outer",
        valueConfig: {
          formatTextValue: (value) => `${value} FPS`,
        }
      }
    }}
    maxValue={100}
    style={{ width: '150px', height: '75px', marginLeft: '118px'}} // Chỉnh kích thước GaugeComponent
  />
</Box>


  </Box>

{/*2------------begin----------------------------------------------------------------- */}
<Box
    sx={{
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '10px',
      height: '600px',
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '20px',
      boxShadow: '4px 4px 4px 4px rgba(0, 0, 0, 0.2)',
      '&:hover': {
        backgroundColor: colors.blueAccent[600],
      }
    }}
  >
          <iframe
    src={`https://player.twitch.tv/?channel=dat_live2&parent=${currentHost}`}
    height="35%"
    width="100%"
    allowfullscreen>
</iframe>
<Box display="flex" marginTop="10px">
<SubscriptionsIcon  style={{ fontSize: '30px', color: 'black' }} />
<Typography variant="h3" style={{ color: 'black',  fontWeight: 'bold'}}>
                    Channel:
</Typography>
<Filter2Icon style={{ fontSize: '30px', color: 'black', marginLeft: '10px' }}/>
</Box>

<Box display="flex" marginTop="10px">
<ContentPasteIcon style={{ fontSize: '30px', color: 'black' }} />
<Typography variant="h3" style={{ color: 'black',  fontWeight: 'bold'}}>
                    Nội dung hiện tại:
</Typography>
</Box>

<Box display="flex" alignItems="center" marginTop="10px">
<PercentIcon style={{ fontSize: '30px', color: 'black' }} />
<Typography variant="h3" style={{ color: 'black',  fontWeight: 'bold'}}>
                    CPU:
</Typography>
  <GaugeComponent
    type="semicircle"
    arc={{
      colorArray: ['#00FF15', '#FF2121'],
      padding: 0.02,
      subArcs: [
        { limit: 10 },
        { limit: 20 },
        { limit: 50 },
        {},
        {},
        {},
        {}
      ],
    }}
    pointer={{ type: "blob", animationDelay: 0 }}
    value={performanceData2.cpu}
    labels={{
      valueLabel: {
        fontSize: 30, // Chỉnh kích thước chữ của giá trị
        formatTextValue: (value) => `${value} %`,
      },
      tickLabels: {
        hideMinMax: true,
        type: "outer",
        valueConfig: {
          formatTextValue: (value) => `${value} %`,
        }
      }
    }}
    maxValue={100}
    style={{ width: '150px', height: '75px' , marginLeft:'110px'}} // Chỉnh kích thước GaugeComponent
  />
</Box>

<Box display="flex" alignItems="center" marginTop="10px">
<MemoryIcon style={{ fontSize: '30px', color: 'black' }} />
<Typography variant="h3" style={{ color: 'black',  fontWeight: 'bold'}}>
Memory Usage:
</Typography>
  <GaugeComponent
    type="semicircle"
    arc={{
      colorArray: ['#0abcfd', '#77ff8a'],
      padding: 0.02,
      subArcs: [
        { limit: 10 },
        { limit: 20 },
        { limit: 50 },
        {},
        {},
        {},
        {}
      ],
    }}
    pointer={{ type: "blob", animationDelay: 0 }}
    value={performanceData2.bandwidth}
    labels={{
      valueLabel: {
        fontSize: 30, // Chỉnh kích thước chữ của giá trị
        formatTextValue: (value) => `${value} Mbps`,
      },
      tickLabels: {
        hideMinMax: true,
        type: "outer",
        valueConfig: {
          formatTextValue: (value) => `${value} Mbps`,
        }
      }
    }}
    maxValue={100}
    style={{ width: '150px', height: '75px' }} // Chỉnh kích thước GaugeComponent
  />
</Box>

<Box display="flex" alignItems="center" marginTop="10px">
<AutofpsSelectIcon style={{ fontSize: '30px', color: 'black' }} />
<Typography variant="h3" style={{ color: 'black',  fontWeight: 'bold'}}>
                    FPS:
</Typography>
  <GaugeComponent
    type="semicircle"
    arc={{
      colorArray: ['#8158d8', '#ff71c6'],
      padding: 0.02,
      subArcs: [
        { limit: 10 },
        { limit: 20 },
        { limit: 50 },
        {},
        {},
        {},
        {}
      ],
    }}
    pointer={{ type: "blob", animationDelay: 0 }}
    value={performanceData2.fps}
    labels={{
      valueLabel: {
        fontSize: 30, // Chỉnh kích thước chữ của giá trị
        formatTextValue: (value) => `${value} FPS`,
      },
      tickLabels: {
        hideMinMax: true,
        type: "outer",
        valueConfig: {
          formatTextValue: (value) => `${value} FPS`,
        }
      }
    }}
    maxValue={100}
    style={{ width: '150px', height: '75px', marginLeft: '118px'}} // Chỉnh kích thước GaugeComponent
  />
</Box>

  </Box>
{/*3------------begin------------------------------------------------------------- */}


<Box
    sx={{
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '10px',
      height: '600px',
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '20px',
      boxShadow: '4px 4px 4px 4px rgba(0, 0, 0, 0.2)',
      '&:hover': {
        backgroundColor: colors.blueAccent[600],
      }
    }}
  >
          <iframe
    src={`https://player.twitch.tv/?channel=dat_live1&parent=${currentHost}`}
    height="35%"
    width="100%"
    allowfullscreen>
</iframe>
<Box display="flex" marginTop="10px">
<SubscriptionsIcon  style={{ fontSize: '30px', color: 'black' }} />
<Typography variant="h3" style={{ color: 'black',  fontWeight: 'bold'}}>
                    Channel:
</Typography>
<Filter3Icon style={{ fontSize: '30px', color: 'black', marginLeft: '10px' }}/>
</Box>

<Box display="flex" marginTop="10px">
<ContentPasteIcon style={{ fontSize: '30px', color: 'black' }} />
<Typography variant="h3" style={{ color: 'black',  fontWeight: 'bold'}}>
                    Nội dung hiện tại:
</Typography>
</Box>

<Box display="flex" alignItems="center" marginTop="10px">
<PercentIcon style={{ fontSize: '30px', color: 'black' }} />
<Typography variant="h3" style={{ color: 'black',  fontWeight: 'bold'}}>
                    CPU:
</Typography>
  <GaugeComponent
    type="semicircle"
    arc={{
      colorArray: ['#00FF15', '#FF2121'],
      padding: 0.02,
      subArcs: [
        { limit: 10 },
        { limit: 20 },
        { limit: 50 },
        {},
        {},
        {},
        {}
      ],
    }}
    pointer={{ type: "blob", animationDelay: 0 }}
    value={performanceData3.cpu}
    labels={{
      valueLabel: {
        fontSize: 30, // Chỉnh kích thước chữ của giá trị
        formatTextValue: (value) => `${value} %`,
      },
      tickLabels: {
        hideMinMax: true,
        type: "outer",
        valueConfig: {
          formatTextValue: (value) => `${value} %`,
        }
      }
    }}
    maxValue={100}
    style={{ width: '150px', height: '75px' , marginLeft:'110px'}} // Chỉnh kích thước GaugeComponent
  />
</Box>

<Box display="flex" alignItems="center" marginTop="10px">
<MemoryIcon style={{ fontSize: '30px', color: 'black' }} />
<Typography variant="h3" style={{ color: 'black',  fontWeight: 'bold'}}>
                    Memory Usage:
</Typography>
  <GaugeComponent
    type="semicircle"
    arc={{
      colorArray: ['#0abcfd', '#77ff8a'],
      padding: 0.02,
      subArcs: [
        { limit: 10 },
        { limit: 20 },
        { limit: 50 },
        {},
        {},
        {},
        {}
      ],
    }}
    pointer={{ type: "blob", animationDelay: 0 }}
    value={performanceData3.bandwidth}
    labels={{
      valueLabel: {
        fontSize: 30, // Chỉnh kích thước chữ của giá trị
        formatTextValue: (value) => `${value} Mbps`,
      },
      tickLabels: {
        hideMinMax: true,
        type: "outer",
        valueConfig: {
          formatTextValue: (value) => `${value} Mbps`,
        }
      }
    }}
    maxValue={100}
    style={{ width: '150px', height: '75px' }} // Chỉnh kích thước GaugeComponent
  />
</Box>

<Box display="flex" alignItems="center" marginTop="10px">
<AutofpsSelectIcon style={{ fontSize: '30px', color: 'black' }} />
<Typography variant="h3" style={{ color: 'black',  fontWeight: 'bold'}}>
                    FPS:
</Typography>
  <GaugeComponent
    type="semicircle"
    arc={{
      colorArray: ['#8158d8', '#ff71c6'],
      padding: 0.02,
      subArcs: [
        { limit: 10 },
        { limit: 20 },
        { limit: 50 },
        {},
        {},
        {},
        {}
      ],
    }}
    pointer={{ type: "blob", animationDelay: 0 }}
    value={performanceData3.fps}
    labels={{
      valueLabel: {
        fontSize: 30, // Chỉnh kích thước chữ của giá trị
        formatTextValue: (value) => `${value} FPS`,
      },
      tickLabels: {
        hideMinMax: true,
        type: "outer",
        valueConfig: {
          formatTextValue: (value) => `${value} FPS`,
        }
      }
    }}
    maxValue={100}
    style={{ width: '150px', height: '75px', marginLeft: '118px'}} // Chỉnh kích thước GaugeComponent
  />
</Box>
  </Box>
      </Box>

      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
