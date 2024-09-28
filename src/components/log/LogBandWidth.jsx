import React, { useEffect, useState } from 'react';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import { GaugeComponent } from 'react-gauge-component';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';

export default function LogBandWidth({ open, handleClose }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [performanceData, setPerformanceData] = useState({
    cpu: 0,
    bandwidth: 0,
    fps: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${window.location.hostname}:5000/get/performance`);
        const data = await response.json();
        setPerformanceData(data);
      } catch (error) {
        console.error("Error fetching performance data:", error);
      }
    };

    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval); // Clear interval when component unmounts
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { width: "90%", maxWidth: "100%", height: "60%" } }}
    >
      <DialogTitle sx={{ fontSize: "24px", fontWeight: "bold", color: "rgb(116, 165, 138)", display: 'flex', alignItems: 'center' }}>
        <GridViewIcon sx={{ marginRight: '8px', fontSize: '32px' }} /> Performance
      </DialogTitle>

      <DialogContent dividers>
        <Box
          display="grid"
          gridTemplateColumns="30% 30% 30%"
          gap="20px"
          alignItems="start"
        >
          {/* CPU Box */}
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: '100px',
              padding: '10px',
              height: '200px',
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '20px',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '4px 4px 4px 4px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: colors.blueAccent[600],
              }
            }}
          >
            <Typography variant="h2" style={{ color: 'black', fontWeight: 'bold' }}>
              CPU
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
              value={performanceData.cpu}
              labels={{
                valueLabel: {
                  fontSize: 40,
                  formatTextValue: (value) => `${value} %`,
                },
                tickLabels: {
                  type: "outer",
                  valueConfig: {
                    formatTextValue: (value) => `${value} %`,
                  }
                }
              }}
              maxValue={100}
            />
          </Box>

          {/* Bandwidth Box */}
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: '100px',
              padding: '10px',
              height: '200px',
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '20px',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '4px 4px 4px 4px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: colors.blueAccent[600],
              }
            }}
          >
            <Typography variant="h2" style={{ color: 'black', fontWeight: 'bold' }}>
              BandWidth
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
              value={performanceData.bandwidth}
              labels={{
                valueLabel: {
                  fontSize: 40,
                  formatTextValue: (value) => `${value} Mbps`,
                },
                tickLabels: {
                  type: "outer",
                  valueConfig: {
                    formatTextValue: (value) => `${value} Mbps`,
                  }
                }
              }}
              maxValue={100}
            />
          </Box>

          {/* FPS Box */}
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: '100px',
              padding: '10px',
              height: '200px',
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '20px',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '4px 4px 4px 4px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: colors.blueAccent[600],
              }
            }}
          >
            <Typography variant="h2" style={{ color: 'black', fontWeight: 'bold' }}>
              FPS
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
              value={performanceData.fps}
              labels={{
                valueLabel: {
                  fontSize: 40,
                  formatTextValue: (value) => `${value} FPS`,
                },
                tickLabels: {
                  type: "outer",
                  valueConfig: {
                    formatTextValue: (value) => `${value} FPS`,
                  }
                }
              }}
              maxValue={100}
            />
          </Box>

        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
