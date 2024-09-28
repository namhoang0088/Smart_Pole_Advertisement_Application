import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import Filter1Icon from "@mui/icons-material/Filter1";
import Filter2Icon from "@mui/icons-material/Filter2";
import Filter3Icon from "@mui/icons-material/Filter3";
import Filter4Icon from "@mui/icons-material/Filter4";
import Filter5Icon from "@mui/icons-material/Filter5";
import Filter6Icon from "@mui/icons-material/Filter6";
import Filter7Icon from "@mui/icons-material/Filter7";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

const getStatusBackgroundColor = (status) => {
  switch (status) {
    case "idle":
      return "purple"; // Màu tím
    case "scheduler":
      return "green"; // Màu xanh lá cây
    case "live":
      return "blue"; // Màu xanh dương
    case "unknown":
      return "red"; // Màu vàng
    default:
      return "black"; // Mặc định màu nền nếu trạng thái không xác định
  }
};
const channelData = [
  {
    id: 1,
    name: "Channel 1",
    status: "scheduler",
    content: "Content 1",
    date: "2024-08-01",
    time: "10:00",
  },
  {
    id: 2,
    name: "Channel 2",
    status: "live",
    content: "Content 2",
    date: "2024-08-01",
    time: "11:00",
  },
  {
    id: 3,
    name: "Channel 3",
    status: "idle",
    content: "Content 3",
    date: "2024-08-01",
    time: "12:00",
  },
  {
    id: 4,
    name: "Channel 4",
    status: "unknown",
    content: "Content 4",
    date: "2024-08-01",
    time: "13:00",
  },
  {
    id: 5,
    name: "Channel 5",
    status: "unknown",
    content: "Content 4",
    date: "2024-08-01",
    time: "14:00",
  },
  {
    id: 6,
    name: "Channel 6",
    status: "unknown",
    content: "Content 4",
    date: "2024-08-01",
    time: "15:00",
  },
  {
    id: 7,
    name: "Channel 7",
    status: "unknown",
    content: "Content 4",
    date: "2024-08-01",
    time: "16:00",
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: "center", // căn giữa nội dung theo chiều ngang
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center", // căn giữa nội dung theo chiều ngang
    verticalAlign: "middle", // căn giữa nội dung theo chiều dọc
  },
}));

const StatusTableCell = styled(StyledTableCell)(({ status, theme }) => ({
  position: "relative",
  overflow: "hidden",
  color: "white",
  fontWeight: "bold",
  padding: "10px", // Thay đổi padding để tạo khoảng trống cho nền
  textAlign: "center",
  verticalAlign: "middle",
  backgroundColor: getStatusBackgroundColor(status), // Sử dụng màu nền dựa trên trạng thái
  borderRadius: "50px",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "white", // Đặt màu nền trắng cho các dòng lẻ
  },
  "&:nth-of-type(even)": {
    backgroundColor: "white", // Đặt màu nền trắng cho các dòng chẵn
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ScrollableTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: "375px", // Set the max height for the table container
  overflowY: "auto", // Enable vertical scrollbar if content overflows
}));

export default function LogChannel({ open, handleClose }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { width: "90%", maxWidth: "100%", height: "90%" } }}
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
        <SubscriptionsIcon sx={{ marginRight: "8px", fontSize: "32px" }} /> Log
        Channel
      </DialogTitle>

      <DialogContent dividers>
        <Box>
          {/* Chọn kênh */}
          <Box
            display="grid"
            gridTemplateColumns="15% 10% 10% 10% 10% 10% 10% 10%"
            gap="20px"
            alignItems="start"
          >
            {/*1*/}
            <Box
              sx={{
                backgroundColor: colors.greenAccent[600],
                borderRadius: "100px",
                padding: "10px",
                height: "100px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "20px",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor: colors.blueAccent[600],
                },
              }}
            >
              <Typography
                sx={{ color: "white", fontWeight: "bold", fontSize: "20px" }}
              >
                List Channel
              </Typography>
              <SubscriptionsIcon sx={{ fontSize: "50px", color: "white" }} />
            </Box>

            {/*2*/}
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "10px",
                height: "100px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "20px",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor: colors.blueAccent[600],
                },
              }}
            >
              <Filter1Icon sx={{ fontSize: "100px", color: "black" }} />
            </Box>

            {/*3*/}
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "10px",
                height: "100px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "20px",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor: colors.blueAccent[600],
                },
              }}
            >
              <Filter2Icon sx={{ fontSize: "100px", color: "black" }} />
            </Box>

            {/*4*/}
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "10px",
                height: "100px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "20px",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor: colors.blueAccent[600],
                },
              }}
            >
              <Filter3Icon sx={{ fontSize: "100px", color: "black" }} />
            </Box>

            {/*5*/}
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "10px",
                height: "100px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "20px",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor: colors.blueAccent[600],
                },
              }}
            >
              <Filter4Icon sx={{ fontSize: "100px", color: "black" }} />
            </Box>

            {/*6*/}
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "10px",
                height: "100px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "20px",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor: colors.blueAccent[600],
                },
              }}
            >
              <Filter5Icon sx={{ fontSize: "100px", color: "black" }} />
            </Box>

            {/*7*/}
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "10px",
                height: "100px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "20px",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor: colors.blueAccent[600],
                },
              }}
            >
              <Filter6Icon sx={{ fontSize: "100px", color: "black" }} />
            </Box>

            {/*8*/}
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "10px",
                height: "100px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "20px",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor: colors.blueAccent[600],
                },
              }}
            >
              <Filter7Icon sx={{ fontSize: "100px", color: "black" }} />
            </Box>
          </Box>

          <Box marginTop="50px">
            <ScrollableTableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell>Tên</StyledTableCell>
                    <StyledTableCell>Trạng thái</StyledTableCell>
                    <StyledTableCell>Nội dung</StyledTableCell>
                    <StyledTableCell>Ngày</StyledTableCell>
                    <StyledTableCell>Giờ</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {channelData.map((channel) => (
                    <StyledTableRow key={channel.id}>
                      <StyledTableCell component="th" scope="row">
                        {channel.id}
                      </StyledTableCell>
                      <StyledTableCell>{channel.name}</StyledTableCell>
                      <StatusTableCell status={channel.status}>
                        {channel.status}
                      </StatusTableCell>
                      <StyledTableCell>{channel.content}</StyledTableCell>
                      <StyledTableCell>{channel.date}</StyledTableCell>
                      <StyledTableCell>{channel.time}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollableTableContainer>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
