import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, MenuItem, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataAdvertisements } from "../../data/mockData";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import Header from "../../components/Header";
import CustomDialog from "../../components/Dialog";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const AdManage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openDialog, setOpenDialog] = useState(false);
  const [channel, setChannel] = useState(""); // State để lưu giá trị channel
  const [smartPoles, setSmartPoles] = useState(["Smart Pole 1", "Smart Pole 2", "Smart Pole 3", "Smart Pole 4", "Smart Pole 5", "Smart Pole 6", "Smart Pole 7", "Smart Pole 8", "Smart Pole 9", "Smart Pole 10"]);
  const [coordinates, setCoordinates] = useState(["131:22","203:235","954:23","562:214","578:231","452:331","55:22","124:365","467:356","365:694"]);
  const [areas, setAreas] = useState(["HCM","HN","HP","HCM","HN","HP","HCM","HN","HP","HCM"]);
  const [ids, setIds] = useState(["1", "2", "3", "4", "5", "6","7","8","9","10"]);
  const [channels, setChannels] = useState(["1","2","2","2","1","1","2","1","2","2"]); // Define channels state and setChannels function
  const [filterArea, setFilterArea] = useState("All"); // State để lưu giá trị của filter area
  
  const channelOptions = [
    { value: "1", label: 'Channel 1' },
    { value: "2", label: 'Channel 2' }
  ];

  const handleChannelChange = (event, index) => {
    const newChannels = [...channels];
    newChannels[index] = event.target.value;
    setChannel(event.target.value); // Cập nhật giá trị channel khi người dùng thay đổi
    setChannels(newChannels);
  };

  useEffect(() => {
    // Mặc định các giá trị ban đầu của mỗi smart pole
    setChannels(["1","2","2","2","1","1","2","1","2","2"]);
  }, []);

  const handleAreaChange = (event) => {
    setFilterArea(event.target.value);
  };

  const createRows = (smartPoles, coordinates, channels, areas, ids) => {
    return ids.map((id, index) => ({
      smartPole: smartPoles[index],
      coordinates: coordinates[index],
      channel: channels[index],
      area: areas[index],
      id: id
    }));
  };

  const rows = createRows(smartPoles, coordinates, channels, areas, ids);

  const filteredRows = filterArea === "All" ? rows : rows.filter(row => row.area === filterArea);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Box m="20px">
      <Box>
        <Header
          title="Smart pole content management"
          subtitle="Welcome to Smart pole content management"
        />
        <Box marginLeft="auto" width="300px">
          <TextField
            select
            label="Filter by Area"
            value={filterArea}
            onChange={handleAreaChange}
            fullWidth
          >
            <MenuItem value="All">All</MenuItem>
            {Array.from(new Set(areas)).map((area, index) => (
              <MenuItem key={index} value={area}>{area}</MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .company-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center"><Typography variant="h6" fontWeight="bold">ID</Typography></TableCell>
                <TableCell align="center"><Typography variant="h6" fontWeight="bold">Smart Pole</Typography></TableCell>
                <TableCell align="center"><Typography variant="h6" fontWeight="bold">Coordinates</Typography></TableCell>
                <TableCell align="center"><Typography variant="h6" fontWeight="bold">Area</Typography></TableCell>
                <TableCell align="center"><Typography variant="h6" fontWeight="bold">Channel</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.smartPole}</TableCell>
                    <TableCell align="center">{row.coordinates}</TableCell>
                    <TableCell align="center">{row.area}</TableCell>
                    <TableCell align="center"> {/* Căn giữa nội dung của cột "Channel" */}
                      <Box width="100%" display="flex" justifyContent="center">
                        <TextField
                          select
                          label="Kênh"
                          value={channels[index]} // Lấy giá trị channel từ mảng channels tương ứng với index
                          onChange={(event) => handleChannelChange(event, index)}
                          variant="outlined"
                          fullWidth
                        >
                          {channelOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              <Box display="flex" alignItems="center"> {/* Sử dụng Flexbox để căn chỉnh các phần tử ngang nhau */}
                                <SubscriptionsIcon sx={{ marginRight: 1 }} /> {/* Icon Subscriptions */}
                                {option.label}
                              </Box>
                            </MenuItem>
                          ))}
                        </TextField>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default AdManage;
