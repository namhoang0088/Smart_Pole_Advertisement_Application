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
import ReactDOM from "react-dom";
const LogManageee = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Box display="flex">
        <Header
          title="Video Management"
          subtitle="Welcome to Video Management"
        />
        <Box marginLeft="auto">
          <Button
            variant="contained"
            onClick={handleClickAddVideo}
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: "#fff",
              marginLeft: "100px",
              marginTop: "10px",
            }}
            endIcon={<AddBoxIcon />}
          >
            Thêm Video
          </Button>
        </Box>
      </Box>
      <Box></Box>
    </Box>
  );
};
export default LogManageee();
