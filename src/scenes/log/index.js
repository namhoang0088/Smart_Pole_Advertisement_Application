import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import Header from "../../components/Header";
import { API_BASE_URL } from "../../data/link_api";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import TrafficIcon from '@mui/icons-material/Traffic';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import LogChannel from "../../components/log/LogChannel";
const LogManage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [logchannel,setLogchannel] = useState(false);
    const [logsmartpole,setLogsmartpole] = useState(false); 

    const handleClickChannel = () =>{
      setLogchannel(true);
      console.log("Box clicked!"); 
    }
    
    const handleCloseChannel = () =>{
      setLogchannel(false);
    }

    return(    
    <Box m="20px">
        <Box display="flex">
          <Header title="Log Management" subtitle="Welcome to Log Management" />
          <Box marginLeft="auto" >
          </Box>
        </Box>

        <Box
        display="grid"
        gridTemplateColumns="30% 30% 30%"
        gap="20px"
        alignItems="start"
      > 
{/*1------------begin--------------------------------------- */}
  <Box
    sx={{
      backgroundColor: colors.greenAccent[600],
      borderRadius: '10px',
      padding: '10px',
      height: '300px',
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '20px',
      justifyContent: 'center',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: colors.blueAccent[600],
      }
    }}
  >
              <Typography variant="h2" style={{ color: 'white',  fontWeight: 'bold'}}>
                    Smart Pole
              </Typography>
              <TrafficIcon style={{ fontSize: '100px', color: 'white' }} />
        </Box>

{/*2------------begin----------------------------------------------------------------- */}
        <Box
    sx={{
      backgroundColor: colors.greenAccent[600],
      borderRadius: '10px',
      padding: '10px',
      height: '300px',
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '20px',
      justifyContent: 'center',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: colors.blueAccent[600],
      }
    }}

    onClick = {handleClickChannel}
  >
              <Typography variant="h2" style={{ color: 'white',  fontWeight: 'bold'}}>
                    Channel
              </Typography>
              <SubscriptionsIcon  style={{ fontSize: '100px', color: 'white' }} />
        </Box>
{/*3------------begin------------------------------------------------------------- */}
        <Box
    sx={{
      backgroundColor: colors.greenAccent[600],
      borderRadius: '10px',
      padding: '10px',
      height: '300px',
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '20px',
      justifyContent: 'center',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: colors.blueAccent[600],
      }
    }}
  >
              <Typography variant="h2" style={{ color: 'white',  fontWeight: 'bold'}}>
                    ?
              </Typography>
              <TrafficIcon style={{ fontSize: '100px', color: 'white' }} />
        </Box>


      </Box>

      <LogChannel open = {logchannel} handleClose = {handleCloseChannel}/>
      </Box>)
}; export default LogManage;