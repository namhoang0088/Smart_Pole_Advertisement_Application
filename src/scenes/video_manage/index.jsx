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
import ArticleIcon from "@mui/icons-material/Article";
import Header from "../../components/Header";
import VideoDetailDialog from "../../components/VideoDetailDialog";
import { API_BASE_URL } from "../../data/link_api";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddvideoDialog from "../../components/AddVideoDialog";
const VideoManage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dataVideo, setDataVideo] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseVideo = await fetch(`${API_BASE_URL}/get/video`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (!responseVideo.ok) {
          throw new Error("Network response video was not ok");
        }

        const data = await responseVideo.json();
        if (data && Array.isArray(data["Video name"])) {
          setDataVideo(data["Video name"]);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const mockData = dataVideo.map((videoName, index) => ({
    id: index + 1,
    videoName,
    date: `2024-01-${String(index + 1).padStart(2, '0')}`,
    uploadBy: `User ${String.fromCharCode(65 + index)}`,
  }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDetailButtonClick = (name) => {
    setVideoNameDetail(name);
    setOpenpopup(true);
  };

  // Popup video detail
  const [videoNameDetail, setVideoNameDetail] = useState("");
  const [openpopup, setOpenpopup] = useState(false);

  const handleClosepopup = () => {
    setOpenpopup(false);
  };

  //popup add video 
  const [openpopupaddvideo, setOpenpopupaddvideo] = useState(false);

  const handleClosepopupaddvideo = () => {
    setOpenpopupaddvideo(false);
  };
  const handleClickAddVideo = () => {
    setOpenpopupaddvideo(true);
  }
  return (
    <Box m="20px">
      <Box display="flex">
        <Header title="Video Management" subtitle="Welcome to Video Management" />
        <Box marginLeft="auto" >
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
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiTable-root": {
            border: "none",
          },
          "& .MuiTable-cell": {
            borderBottom: "none",
          },
          "& .MuiTableHead-root": {
            backgroundColor: "#f0f0f0",
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
                    Video Name
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" fontWeight="bold">
                    Date
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" fontWeight="bold">
                    Upload By
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
              {mockData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.videoName}</TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.uploadBy}</TableCell>
                    <TableCell align="center">
                      <Box width="100%" display="flex" justifyContent="center">
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#4cceac",
                            color: "#fff",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "5px",
                          }}
                          onClick={() => handleDetailButtonClick(row.videoName)}
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
          count={mockData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      <VideoDetailDialog open={openpopup} handleClose={handleClosepopup} videoname={videoNameDetail} />
      <AddvideoDialog open={openpopupaddvideo} handleClose={handleClosepopupaddvideo}/>
    </Box>
  );
};

export default VideoManage;
