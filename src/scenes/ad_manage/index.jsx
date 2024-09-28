import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataAdvertisements } from "../../data/mockData";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import Header from "../../components/Header";
import CustomDialog from "../../components/Dialog";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ArticleIcon from "@mui/icons-material/Article";
import { API_BASE_URL } from "../../data/link_api";
const AdManage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [channel, setChannel] = useState(""); // State để lưu giá trị channel
  const [coordinates, setCoordinates] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ids, setIds] = useState([]);
  const [channels, setChannels] = useState([]); // Define channels state and setChannels function
  const [filterArea, setFilterArea] = useState("All"); // State để lưu giá trị của filter area

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/get/pole`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });
        if (!response.ok) {
          throw new Error("Network response video was not ok");
        }

        const responseData = await response.json();

        if (!Array.isArray(responseData["Pole infomation"])) {
          // Corrected key name
          throw new Error("Response data is not in the expected format");
        }

        const poleInfo = responseData["Pole infomation"]; // Corrected key name
        const idList = poleInfo.map((item) => item.ID.toString());
        const areaList = poleInfo.map((item) => item.area.toString());
        const coorList = poleInfo.map((item) => item.location.toString());
        const channelList = poleInfo.map((item) => item.channel.toString());
        setCoordinates(coorList);
        setAreas(areaList);
        setIds(idList);
        setChannels(channelList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Gọi hàm fetchData khi giá trị của channel thay đổi
    // Mặc định các giá trị ban đầu của mỗi smart pole
  }, []);
  const channelOptions = [
    { value: "1", label: "Channel 1" },
    { value: "2", label: "Channel 2" },
  ];

  const handleChannelChange = async (event, index, id) => {
    const newChannels = [...channels];
    newChannels[index] = event.target.value;
    setChannel(event.target.value); // Cập nhật giá trị channel khi người dùng thay đổi
    setChannels(newChannels);
    const url = `${API_BASE_URL}/set/poleStream/ID?ID=${id}&stream=${event.target.value}`;
    console.log("url name smart pole", url);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        // body: JSON.stringify(payload) // Nếu cần gửi dữ liệu cụ thể, hãy thêm vào đây
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAreaChange = (event) => {
    setFilterArea(event.target.value);
  };

  const createRows = (coordinates, channels, areas, ids) => {
    return ids.map((id, index) => ({
      coordinates: coordinates[index],
      channel: channels[index],
      area: areas[index],
      id: id,
    }));
  };

  const rows = createRows(coordinates, channels, areas, ids);

  const filteredRows =
    filterArea === "All" ? rows : rows.filter((row) => row.area === filterArea);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //hiển thị chi tiết nội dung smartpole
  const [openDialog, setOpenDialog] = useState(false);

  const handleDetailButtonClick = (id) => {
    console.log("dialoggggggg", id);
  };
  //
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
              <MenuItem key={index} value={area}>
                {area}
              </MenuItem>
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
                <TableCell align="center">
                  <Typography variant="h6" fontWeight="bold">
                    ID
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" fontWeight="bold">
                    Coordinates
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" fontWeight="bold">
                    Area
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" fontWeight="bold">
                    Channel
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" fontWeight="bold">
                    Detail
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.coordinates}</TableCell>
                    <TableCell align="center">{row.area}</TableCell>
                    <TableCell align="center">
                      {" "}
                      {/* Căn giữa nội dung của cột "Channel" */}
                      <Box width="100%" display="flex" justifyContent="center">
                        <TextField
                          select
                          label="Kênh"
                          value={channels[index]} // Lấy giá trị channel từ mảng channels tương ứng với index
                          onChange={(event) =>
                            handleChannelChange(event, index, row.id)
                          }
                          variant="outlined"
                        >
                          {channelOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              <Box display="flex" alignItems="center">
                                {" "}
                                {/* Sử dụng Flexbox để căn chỉnh các phần tử ngang nhau */}
                                <SubscriptionsIcon sx={{ marginRight: 1 }} />{" "}
                                {/* Icon Subscriptions */}
                                {option.label}
                              </Box>
                            </MenuItem>
                          ))}
                        </TextField>
                      </Box>
                    </TableCell>

                    <TableCell align="center">
                      {" "}
                      {/* Thêm nút Detail */}
                      <Box width="100%" display="flex" justifyContent="center">
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#4cceac",
                            color: "#fff",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center", // Căn giữa theo chiều dọc
                            padding: "5px",
                          }}
                          onClick={() => handleDetailButtonClick(row.id)}
                        >
                          <ArticleIcon />
                        </Button>
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
