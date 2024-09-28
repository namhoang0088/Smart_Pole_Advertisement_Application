import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { API_BASE_URL } from "../data/link_api";

export default function VideoDetailDialog({ open, handleClose, videoname }) {
  const [videoSrc, setVideoSrc] = React.useState("");

  const videoURL = `${API_BASE_URL}/videocontent/${videoname}`;
  console.log("video url", videoURL);

  const customFetch = async (url, options = {}) => {
    const customHeaders = {
      ...options.headers,
      "ngrok-skip-browser-warning": "true",
    };

    const response = await fetch(url, {
      ...options,
      headers: customHeaders,
    });

    return response;
  };

  const getVideoURL = async () => {
    try {
      const response = await customFetch(videoURL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      return url;
    } catch (error) {
      console.error("Error fetching video:", error);
      return null;
    }
  };

  React.useEffect(() => {
    if (open && videoname) {
      getVideoURL().then((url) => {
        if (url) {
          setVideoSrc(url);
        }
      });
    } else {
      setVideoSrc("");
    }
  }, [open, videoname]);

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
          color: "rgb(124, 189, 249)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <SlideshowIcon sx={{ marginRight: "8px", fontSize: "32px" }} /> Nội dung
        của Video: {videoname}
      </DialogTitle>
      <DialogContent dividers>
        {videoSrc ? (
          <video width="100%" height="400px" controls>
            <source src={videoSrc} type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ thẻ video.
          </video>
        ) : (
          <p>Đang tải video...</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="contained"
          sx={{
            backgroundColor: "#757575",
            color: "#fff",
            marginLeft: "20px",
            marginTop: "20px",
          }}
          endIcon={<DeleteForeverIcon />}
        >
          Xóa video
        </Button>
      </DialogActions>
    </Dialog>
  );
}
