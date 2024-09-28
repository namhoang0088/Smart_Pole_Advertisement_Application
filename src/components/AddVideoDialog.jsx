import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddBoxIcon from "@mui/icons-material/AddBox";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { tokens } from "../theme";
import { useTheme } from "@mui/material/styles";
import WaitingLivePopup from "./WaitingLivePopup";
import { API_BASE_URL } from "../data/link_api";
import SuccessPopup from "./SuccessPopup";
export default function AddvideoDialog({ open, handleClose }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleClickAddVideo = async () => {
    setOpenpopup(true);
    try {
      if (!selectedFile) {
        console.error("No file selected");
        return;
      }

      const formData = new FormData();
      formData.append("video", selectedFile);

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      handleClosepopup();
      setOpenpopupsuccess(true);
      setTimeout(() => {
        handleClosepopupsuccess();
        handleClose();
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };
  //popup watting-----------------------begin---------------------------
  const [openpopup, setOpenpopup] = useState(false);

  const handleClosepopup = () => {
    setOpenpopup(false);
  };
  //popup watting----------------------end----------------------------

  //popup success---------------------begin-------------------------
  const [openpopupsuccess, setOpenpopupsuccess] = useState(false);

  const handleClosepopupsuccess = () => {
    setOpenpopupsuccess(false);
  };
  //popup success---------------------end---------------------------

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { width: "60%", maxWidth: "100%" } }}
    >
      <DialogTitle
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#70d8bd",
          display: "flex",
          alignItems: "center",
        }}
      >
        <AddBoxIcon sx={{ marginRight: "8px", fontSize: "32px" }} /> Thêm video
      </DialogTitle>
      <DialogContent dividers>
        <Box
          marginBottom="20px"
          marginTop="20px"
          display="flex"
          alignItems="center"
        >
          <OndemandVideoIcon
            sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
          />
          <Typography variant="h4" marginRight="10px" paddingLeft="10px">
            <strong>Chọn video</strong>
          </Typography>
          <TextField
            id="outlined-basic"
            label="Video upload"
            variant="outlined"
            value={selectedFile ? selectedFile.name : ""}
          />
          <Button
            variant="contained"
            component="label"
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: "#fff",
              marginLeft: "20px",
            }}
            endIcon={<UploadFileIcon />}
          >
            <Typography variant="body1">Chọn video ở đây</Typography>
            <input
              type="file"
              accept="video/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          <Button
            variant="contained"
            component="label"
            onClick={handleClickAddVideo}
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: "#fff",
              marginLeft: "20px",
            }}
          >
            <Typography variant="body1">Xác nhận thêm</Typography>
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
      <WaitingLivePopup open={openpopup} handleClose={handleClosepopup} />
      <SuccessPopup
        open={openpopupsuccess}
        handleClose={handleClosepopupsuccess}
      />
    </Dialog>
  );
}
