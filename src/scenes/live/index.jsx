import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Box,
  ListItemButton,
  ListItemIcon,
  Typography,
  Collapse,
  List,
  Button,
  Checkbox,
} from "@mui/material";
import Header from "../../components/Header";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import SettingsInputAntennaIcon from "@mui/icons-material/SettingsInputAntenna";
import AddLinkIcon from "@mui/icons-material/AddLink";
import { API_BASE_URL } from "../../data/link_api";
import DvrIcon from "@mui/icons-material/Dvr";
import SuccessPopup from "../../components/SuccessPopup";
import ErrorPopup from "../../components/ErrorPopup";
import WaitingLivePopup from "../../components/WaitingLivePopup";
import WaitingStopPopup from "../../components/WaitingStopPopup";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import Autocomplete from "@mui/material/Autocomplete";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import DeleteIcon from "@mui/icons-material/Delete";
import TransformIcon from '@mui/icons-material/Transform';
const LiveAd = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openListPole, setOpenListPole] = useState(true);
  const [isMicOn, setIsMicOn] = useState(false); // Trạng thái của mic, mặc định là tắt
  const [isCameraOn, setIsCameraOn] = useState(false); // Trạng thái của camera, mặc định là tắt
  const [micStream, setMicStream] = useState(null); // Lưu trữ stream từ microphone
  const [cameraStream, setCameraStream] = useState(null); // Lưu trữ stream từ camera
  const currentHost = window.location.hostname;

  const handleClickListPole = () => {
    setOpenListPole(!openListPole);
  };

  const handleMicToggle = () => {
    setIsMicOn(!isMicOn); // Đảo ngược trạng thái mic

    if (!isMicOn) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          setMicStream(stream);
        })
        .catch((error) => {
          console.error("Lỗi khi truy cập microphone:", error);
        });
    } else {
      // Tắt microphone
      micStream.getAudioTracks().forEach((track) => track.stop());
      setMicStream(null);
    }
  };

  const handleCameraToggle = () => {
    setIsCameraOn(!isCameraOn); // Đảo ngược trạng thái camera

    if (!isCameraOn) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          setCameraStream(stream);
          const videoElement = document.getElementById("liveVideo");
          if (videoElement) {
            videoElement.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error("Lỗi khi truy cập camera:", error);
        });
    } else {
      // Tắt camera
      cameraStream.getVideoTracks().forEach((track) => track.stop());
      setCameraStream(null);
      const videoElement = document.getElementById("liveVideo");
      if (videoElement) {
        videoElement.srcObject = null;
      }
    }
  };

  //lựa chọn kênh live------------------------begin-----------------------------
  const channelOptions = [
    { value: 1, label: "Kênh 1" },
    { value: 2, label: "Kênh 2" },
    { value: 3, label: "Kênh 3" },
    { value: 4, label: "Kênh 4" },
    { value: 5, label: "Kênh 5" },
  ];


  const [channel, setChannel] = React.useState(1);
  const [tvChannel, setTvChannel] = useState("");
  const [tvChannelOption, setTvChannelOption] = useState([]);
  const [nameTwitch, setNameTwitch] = useState("");
  const [selectTvChannel, setSelectTvChannel] = React.useState(1);

  const handleChannelChange = (event) => {
    const newChannel = event.target.value;
    setChannel(newChannel);
  };

  // xử lý đổi tvchannel
  const handleTvChannelChange = (event) => {
    const newIndex = event.target.value; // Lấy index mới được chọn từ dropdown menu
    setSelectTvChannel(newIndex); // Cập nhật giá trị mới dựa trên index
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetch(
          `${API_BASE_URL}/get/namestream?stream=${channel}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          },
        );
        if (!responseData.ok) {
          throw new Error("Network response video was not ok");
        }

        const responseTVChanel = await fetch(`${API_BASE_URL}/get/TVchannel`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });
        if (!responseTVChanel.ok) {
          throw new Error("Network response video was not ok");
        }
        const responseDataTVChanel = await responseTVChanel.json();
        const response = await responseData.json();
        setNameTwitch(response["name twitch"]);
        setTvChannel(responseDataTVChanel["TV channel"]);

        const formattedChannels = responseDataTVChanel["TV channel"]
          .replace(/[\[\]']+/g, "")
          .split(", ");
        const options = formattedChannels.map((channel, index) => ({
          value: index + 1,
          label: `${channel}`,
        }));
        setTvChannelOption(options);

        // Xử lý dữ liệu responseVideo ở đây
      } catch (error) {
        console.error("Error fetching video schedule:", error);
      }
    };

    fetchData(); // Gọi hàm fetchData khi giá trị của channel thay đổi
  }, [channel]);

  //lựa chọn kênh live-------------------end-----------------------------------
  const [liveLink, setLiveLink] = useState(null);
  const onChangeLink = (newValue) => {
    setLiveLink(newValue);
  };
  const handleClickLive = async () => {
    setLoading(true);
    const url = `${API_BASE_URL}//live?stream=${channel}&link=${liveLink}`;
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
        setLoading(false);
        const errorData = await response.json(); // Nhận dữ liệu lỗi dưới dạng JSON
        setErrorMessage(errorData.error);
        setOpenpopup(true);
      } else {
        setLoading(false);
        setOpenpopupsuccess(1);
        setTimeout(() => {
          setOpenpopupsuccess(0);
        }, 1000);
      }

      const data = await response.json();
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickStop = async () => {
    setLoadingStop(true);

    const url = `${API_BASE_URL}//stoplive?stream=${channel}`;
    console.log(url);
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
        setTimeout(() => {
          setLoadingStop(false);
        }, 1000);
        throw new Error("Network response was not ok");
      } else {
        setTimeout(() => {
          setLoadingStop(false);
        }, 1000);
      }

      const data = await response.json();
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // live bằng kênh truyền hình có sẵn-----------------------------begin----------------------------------------
  const handleClickLiveTvChannel = async () => {
    setLoading(true);
    const url = `${API_BASE_URL}//live/TVchannel?stream=${channel}&tvchannel=${tvChannelOption[selectTvChannel - 1].label}`;
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
        setLoading(false);
        throw new Error("Network response was not ok");
      } else {
        setLoading(false);
        setOpenpopupsuccess(1);
        setTimeout(() => {
          setOpenpopupsuccess(0);
        }, 1000);
      }

      const data = await response.json();
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickStopTvChannel = async () => {
    setLoadingStop(true);
    const url = `${API_BASE_URL}//stoplive?stream=${channel}`;
    console.log(url);
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
        setTimeout(() => {
          setLoadingStop(false);
        }, 1000);
        throw new Error("Network response was not ok");
      } else {
        setTimeout(() => {
          setLoadingStop(false);
        }, 1000);
      }

      const data = await response.json();
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // live bằng video có sẵn-----------------------------begin----------------------------------------
  const handleClickLiveVideo = async () => {
    setLoading(true);
    const list = selectedOptions.join(",");
    const url = `${API_BASE_URL}//live/video?stream=${channel}&list=${list}`;
    console.log("urllllllllll", url);
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
        setLoading(false);
        throw new Error("Network response was not ok");
      } else {
        setLoading(false);
        setOpenpopupsuccess(1);
        setTimeout(() => {
          setOpenpopupsuccess(0);
        }, 1000);
      }

      const data = await response.json();
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickStopVideo = async () => {
    setLoadingStop(true);
    const url = `${API_BASE_URL}//stoplive?stream=${channel}`;
    console.log(url);
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
        setTimeout(() => {
          setLoadingStop(false);
        }, 1000);
        throw new Error("Network response was not ok");
      } else {
        setTimeout(() => {
          setLoadingStop(false);
        }, 1000);
      }

      const data = await response.json();
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // live bằng ảnh có sẵn-----------------------------begin----------------------------------------
  const transitionOptions = [
    { value: 1, label: "cut" },
    { value: 2, label: "fade" },
    { value: 3, label: "swipe" },
    { value: 4, label: "slide" },
  ];
  const [transitionOption, setTransitionOption] = useState([]);
  const [transitionSpeed, setTransitionSpeed] = useState(null); // ví dụ 300ms
  const [timeBetweenSpeed, setTimeBetweenSpeed] = useState(null); // ví dụ 1000ms
  const handleTransitionChange = (event) => {
    const newValue = event.target.value; // Lấy giá trị mới được chọn từ dropdown menu
  
    // Tìm object trong transitionOptions với value tương ứng và lấy label
    const selectedOption = transitionOptions.find(option => option.value === parseInt(newValue));
  
    // Cập nhật giá trị mới dựa trên label
      setTransitionOption(selectedOption.label);
      console.log("trasition", selectedOptionsIMG)
  };
  const onChangeTransitionSpeed = (newValue) => {
    setTransitionSpeed(newValue);
  };
  const onChangeTimeBetweenSpeed = (newValue) => {
    setTimeBetweenSpeed(newValue);
  };


  // const handleClickLiveIMG = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData();

  //   // Đính kèm các tệp thực tế vào formData
  //   selectedFiles.forEach((file) => {
  //     formData.append('upload_images', file); // Đính kèm tệp thực tế
  //   });

  //   // Thêm các thông tin khác vào formData
  //   formData.append('stream', channel);
  //   formData.append('transition', transitionOption);
  //   formData.append('slide_time', timeBetweenSpeed);
  //   formData.append('transition_speed', transitionSpeed);
  //   formData.append('image_list', imageURLs.map((url) => url.split('/').pop()).join(',')); // Lấy tên file từ URL

  //   try {
  //     const response = await axios.post(`${API_BASE_URL}/live/slide`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     console.log('Success:', response.data);
  //   } catch (error) {
  //     console.error('Error uploading images:', error.response?.data || error.message);
  //   }
  // };

  const handleClickLiveIMG = async (event) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData();

    // Đính kèm các tệp thực tế vào formData
    selectedFiles.forEach((file) => {
      console.log("fileeee",file)
      formData.append('upload_images', file); // Đính kèm tệp thực tế
    });

    // Thêm các thông tin khác vào formData
    formData.append('stream', channel);
    formData.append('transition', transitionOption);
    formData.append('slide_time', timeBetweenSpeed);
    formData.append('transition_speed', transitionSpeed);
    formData.append('image_list', selectedOptionsIMG);
    // Gửi yêu cầu API với danh sách tên hình ảnh trong query string
    try {
      const response = await axios.post(`${API_BASE_URL}/live/slide`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTimeout(() => {
        setLoading(false); // Tắt trạng thái loading sau 1 giây
    
        // Sau khi tắt loading, mở popup thành công
        setOpenpopupsuccess(1);
    
        // Tắt popup sau 1 giây
        setTimeout(() => {
            setOpenpopupsuccess(0); // Tắt popup sau 1 giây
        }, 1500);
    
    }, 1500);
 
    } catch (error) {
      console.error('Error uploading images:', error.response?.data || error.message);
    }
  };
  //hiện popup lỗi-----------------------------------begin---------------------------------
  const [loading, setLoading] = useState(false);
  const [loadingStop, setLoadingStop] = useState(false);

  const [openpopup, setOpenpopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickOpenpopup = () => {
    setOpenpopup(true);
  };

  const handleClosepopup = () => {
    setOpenpopup(false);
  };
  //hiện popup lỗi -----------------------------------------end------------------------------
  //hiện popup thành công---------------------------------begin------------------------------
  const [openpopupsuccess, setOpenpopupsuccess] = useState(false);

  const handleClickOpenpopupsuccess = () => {
    setOpenpopupsuccess(true);
  };

  const handleClosepopupsuccess = () => {
    setOpenpopupsuccess(false);
  };

  const handleClosepopupLoadingLive = () => {
    setLoading(false);
  };

  const handleClosepopupLoadingStop = () => {
    setLoadingStop(false);
  };

  // mở danh sách video để thiết lập nội dung cho quảng cáo ---------------end--------------
  const [dataVideo, setDataVideo] = useState([]); // Khai báo biến dataVideo
  const [dataIMG, setDataIMG] = useState([]); // Khai báo biến dataVideo

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch video data
        const responseVideo = await fetch(`${API_BASE_URL}/get/video`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (!responseVideo.ok) {
          throw new Error("Network response video was not ok");
        }

        const dataVideo = await responseVideo.json();
        setDataVideo(dataVideo); // Cập nhật giá trị cho biến dataVideo

        // Fetch image data
        const responseIMG = await fetch(`${API_BASE_URL}/get/images`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (!responseIMG.ok) {
          throw new Error("Network response image was not ok");
        }

        const dataIMG = await responseIMG.json();
        setDataIMG(dataIMG.images); // Cập nhật giá trị cho biến dataIMG
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptionsIMG, setSelectedOptionsIMG] = useState([]);
  //hiện popup thành công---------------------------------end--------------------------------

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageURLs, setImageURLs] = useState([]); // URL blob để hiển thị

  
  const onSelectFile = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);

    // Lưu các tệp thực tế
    setSelectedFiles(prevFiles => [...prevFiles, ...filesArray]);

    // Tạo URL blob để hiển thị
    const newImageURLs = filesArray.map(file => URL.createObjectURL(file));
    setImageURLs(prevURLs => [...prevURLs, ...newImageURLs]);

    event.target.value = ""; // Reset input
    console.log("picture",selectedFiles)
  };

  const deleteHandler = (image, index) => {
    setImageURLs(imageURLs.filter((_, i) => i !== index));
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    setSelectedOptionsIMG(selectedOptionsIMG.filter((_, i) => i !== index)); // Xóa tên ảnh tương ứng
    URL.revokeObjectURL(image); // Giải phóng tài nguyên
    console.log("picture", imageURLs)
  };


  return (
    <Box m="20px">
      <Header title="Live Stream" subtitle="Welcome to Live Stream" />
      <Box
        display="grid"
        gridTemplateColumns="70% 30%"
        gap="20px"
        alignItems="start"
      >
        <Box //phần live
          backgroundColor={colors.primary[400]}
          borderRadius="10px"
          padding="10px"
          height="500px"
          display="flex"
          flexDirection="column"
          justifyContent="center" // căn video theo chiều dọc
          alignItems="center" // căn video theo chiều ngang
          style={{ overflow: "hidden", position: "relative" }}
        >
          {/* <video
            id="liveVideo"
            autoPlay
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
              objectFit: "contain",
            }}
          ></video> */}

          <iframe
            src={`https://player.twitch.tv/?channel=${nameTwitch}&parent=${currentHost}`}
            height="100%"
            width="100%"
            allowfullscreen
          ></iframe>
        </Box>

        <Box // phần chọn smart pole
          backgroundColor="white"
          borderRadius="10px"
          sx={{
            height: "500px", // Chiều cao thanh trượt
            overflowY: "auto",
            width: "410px", // Cho phép cuộn dọc
          }}
        >
          <Box
            backgroundColor={colors.primary[400]}
            borderRadius="20px"
            width="390px"
            height="auto"
            padding="10px"
            marginBottom="10px"
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <SubscriptionsIcon />
              <Typography
                variant="h4"
                style={{ marginRight: "10px", paddingLeft: "10px" }}
              >
                <strong>Danh sách các kênh chiếu</strong>
              </Typography>
            </Box>

            <Box width="300px" marginBottom="20px">
              <TextField
                select
                label="Kênh"
                value={channel}
                onChange={handleChannelChange}
                variant="outlined"
                fullWidth
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
          </Box>
          {/* phần live stream bằng link------------begin--------------------------------------- */}
          <Box
            backgroundColor={colors.primary[400]}
            borderRadius="20px"
            width="390px"
            height="auto"
            padding="10px"
            marginBottom="10px"
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <AddLinkIcon />
              <Typography
                variant="h4"
                style={{ marginRight: "10px", paddingLeft: "10px" }}
              >
                <strong>LiveStream bằng link</strong>
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2} marginBottom="20px">
              <TextField
                label="Đường link"
                variant="outlined"
                sx={{ flex: 1 }}
                onChange={(event) => {
                  const newValue = event.target.value;
                  onChangeLink(newValue);
                }}
              />
              <Button
                variant="outlined"
                onClick={handleClickLive}
                sx={{
                  color: "#007FFF",
                  borderColor: "#007FFF",
                  backgroundColor: "#FFFFFF",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  padding: "15px 20px",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#007FFF",
                    color: "#FFFFFF",
                  },
                }}
              >
                Live
              </Button>

              <Button
                variant="outlined"
                onClick={handleClickStop}
                sx={{
                  color: "#FF0000", // Đổi màu chữ thành đỏ
                  borderColor: "#FF0000", // Đổi màu viền thành đỏ
                  backgroundColor: "#FFFFFF",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  padding: "15px 20px",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#FF0000", // Màu nền khi hover là màu đỏ
                    color: "#FFFFFF", // Màu chữ là màu trắng khi hover
                  },
                }}
              >
                Stop
              </Button>
            </Box>
          </Box>
          {/* phần live stream bằng link------------end--------------------------------------- */}

          {/* phần live stream bằng kênh có sẵn------------begin--------------------------------------- */}
          <Box
            backgroundColor={colors.primary[400]}
            borderRadius="20px"
            width="390px"
            height="auto"
            padding="10px"
            marginBottom="10px"
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <DvrIcon />
              <Typography
                variant="h4"
                style={{ marginRight: "10px", paddingLeft: "10px" }}
              >
                <strong>LiveStream Đài truyền hình</strong>
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2} marginBottom="20px">
              <Box variant="outlined" sx={{ flex: 1 }}>
                <TextField
                  select
                  label="Đài truyền hình"
                  value={selectTvChannel}
                  onChange={handleTvChannelChange}
                  variant="outlined"
                  fullWidth
                >
                  {tvChannelOption.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Box display="flex" alignItems="center">
                        {" "}
                        {/* Sử dụng Flexbox để căn chỉnh các phần tử ngang nhau */}
                        <DvrIcon sx={{ marginRight: 1 }} />{" "}
                        {/* Icon Subscriptions */}
                        {option.label}
                      </Box>
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Button
                variant="outlined"
                onClick={handleClickLiveTvChannel}
                sx={{
                  color: "#007FFF",
                  borderColor: "#007FFF",
                  backgroundColor: "#FFFFFF",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  padding: "15px 20px",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#007FFF",
                    color: "#FFFFFF",
                  },
                }}
              >
                Live
              </Button>

              <Button
                variant="outlined"
                onClick={handleClickStopTvChannel}
                sx={{
                  color: "#FF0000", // Đổi màu chữ thành đỏ
                  borderColor: "#FF0000", // Đổi màu viền thành đỏ
                  backgroundColor: "#FFFFFF",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  padding: "15px 20px",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#FF0000", // Màu nền khi hover là màu đỏ
                    color: "#FFFFFF", // Màu chữ là màu trắng khi hover
                  },
                }}
              >
                Stop
              </Button>
            </Box>
          </Box>
          {/* phần live stream bằng kênh có sẵn------------end--------------------------------------- */}

          {/* phần live stream bằng camera------------begin--------------------------------------- */}
          <Box
            backgroundColor={colors.primary[400]}
            borderRadius="20px"
            width="390px"
            height="auto"
            padding="10px"
            marginBottom="10px"
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <SettingsInputAntennaIcon />
              <Typography
                variant="h4"
                style={{ marginRight: "10px", paddingLeft: "10px" }}
              >
                <strong>LiveStream video</strong>
              </Typography>
            </Box>

            {/* <Box display="flex" alignItems="center" marginLeft="50px"> */}
            {/* <Button
              variant="contained"
              sx={{
                backgroundColor: isMicOn ? "#007FFF" : "#757575",
                color: "#fff",
                marginLeft: "20px",
                display: "flex",
                alignItems: "center",
                padding: "5px",
              }}
              onClick={handleMicToggle}
            >
              {isMicOn ? (
                <MicIcon fontSize="large" />
              ) : (
                <MicOffIcon fontSize="large" />
              )}
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: isCameraOn ? "#007FFF" : "#757575",
                color: "#fff",
                marginLeft: "20px",
                display: "flex",
                alignItems: "center",
                padding: "5px",
              }}
              onClick={handleCameraToggle}
            >
              {isCameraOn ? (
                <VideocamIcon fontSize="large" />
              ) : (
                <VideocamOffIcon fontSize="large" />
              )}
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FF0000",
                color: "#fff",
                marginLeft: "20px",
                display: "flex",
                alignItems: "center",
                padding: "5px",
              }}
            >
              <PhoneDisabledIcon fontSize="large" />
            </Button> */}
            <Box display="flex" alignItems="center" gap={2} marginBottom="20px">
              <Autocomplete
                sx={{ width: 300 }}
                multiple
                id="list-pole-autocomplete"
                onChange={(event, newValue) => {
                  setSelectedOptions(newValue);
                  // onChangeContentDaily(newValue, boxDailyIdCounter.toString());
                }}
                options={
                  dataVideo && dataVideo["Video name"]
                    ? dataVideo["Video name"]
                    : []
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Chọn nội dung"
                  />
                )}
              />
              <Button
                variant="outlined"
                onClick={handleClickLiveVideo}
                sx={{
                  color: "#007FFF",
                  borderColor: "#007FFF",
                  backgroundColor: "#FFFFFF",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  padding: "15px 20px",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#007FFF",
                    color: "#FFFFFF",
                  },
                }}
              >
                Live
              </Button>

              <Button
                variant="outlined"
                onClick={handleClickStopVideo}
                sx={{
                  color: "#FF0000", // Đổi màu chữ thành đỏ
                  borderColor: "#FF0000", // Đổi màu viền thành đỏ
                  backgroundColor: "#FFFFFF",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  padding: "15px 20px",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#FF0000", // Màu nền khi hover là màu đỏ
                    color: "#FFFFFF", // Màu chữ là màu trắng khi hover
                  },
                }}
              >
                Stop
              </Button>
            </Box>
            {/* 
          </Box> */}
          </Box>
          {/* phần live stream bằng slide------------begin--------------------------------------- */}
          <Box
            backgroundColor={colors.primary[400]}
            borderRadius="20px"
            width="390px"
            height="auto"
            padding="10px"
            marginBottom="10px"
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <SlideshowIcon />
              <Typography
                variant="h4"
                style={{ marginRight: "10px", paddingLeft: "10px" }}
              >
                <strong>LiveStream Slide</strong>
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={2} marginBottom="20px">
              <Box width="150px">
                <TextField
                  select
                  label="Transition"
                  variant="outlined"
                  onChange={handleTransitionChange}
                  
                  fullWidth
                >
                  {transitionOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Box display="flex" alignItems="center">
                        {" "}
                        {/* Sử dụng Flexbox để căn chỉnh các phần tử ngang nhau */}
                        <TransformIcon sx={{ marginRight: 1 }} />{" "}
                        {/* Icon Subscriptions */}
                        {option.label}
                      </Box>
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <TextField
                label="Transition Speed"
                onChange={(event) => {
                  const newValue = event.target.value;
                  onChangeTransitionSpeed(newValue);
                }}
                variant="outlined"
                sx={{ width: "300px" }}
              />
            </Box>

            <Box display="flex" alignItems="center" gap={2} marginBottom="20px">
              <TextField
                label="Time Between Slides"
                variant="outlined"
                onChange={(event) => {
                  const newValue = event.target.value;
                  onChangeTimeBetweenSpeed(newValue);
                }}
                sx={{ width: "200px" }}
              />

<Autocomplete
        sx={{ width: 200 }}
        multiple
        id="list-pole-autocomplete"
        onChange={(event, newValue) => {
          setSelectedOptionsIMG(newValue);
          // Xử lý sự thay đổi giá trị được chọn
        }}
        options={dataIMG.map((img) => img.name)} // Dùng trường "name" từ dữ liệu ảnh
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Chọn hình ảnh"
          />
        )}
      />
            </Box>

            <section>
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                marginBottom="20px"
              >
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    color: "#4CAF50", // Màu chữ là màu xanh lá cây
                    borderColor: "#4CAF50", // Màu viền là màu xanh lá cây
                    backgroundColor: "#FFFFFF", // Màu nền là màu trắng
                    marginRight: "10px", // Thêm khoảng cách bên phải
                    fontSize: "1.2rem", // Kích thước chữ
                    fontWeight: "bold", // In đậm chữ
                    padding: "15px 20px", // Padding để tạo button lớn hơn
                    borderRadius: "10px", // Bo tròn góc
                    "&:hover": {
                      // Thêm hiệu ứng hover khi di chuột qua button
                      backgroundColor: "#4CAF50", // Màu nền khi hover là màu xanh lá cây
                      color: "#FFFFFF", // Màu chữ là màu trắng khi hover
                    },
                  }}
                >
                  Add Images
                  <input
                    type="file"
                    name="images"
                    onChange={onSelectFile}
                    hidden
                    multiple
                  />
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleClickLiveIMG}
                  sx={{
                    color: "#007FFF",
                    borderColor: "#007FFF",
                    backgroundColor: "#FFFFFF",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    padding: "15px 20px",
                    borderRadius: "10px",
                    marginRight: "10px", // Thêm khoảng cách bên phải
                    "&:hover": {
                      backgroundColor: "#007FFF",
                      color: "#FFFFFF",
                    },
                  }}
                >
                  Live
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleClickStopVideo}
                  sx={{
                    color: "#FF0000", // Đổi màu chữ thành đỏ
                    borderColor: "#FF0000", // Đổi màu viền thành đỏ
                    backgroundColor: "#FFFFFF",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    padding: "15px 20px",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#FF0000", // Màu nền khi hover là màu đỏ
                      color: "#FFFFFF", // Màu chữ là màu trắng khi hover
                    },
                  }}
                >
                  Stop
                </Button>
              </Box>

              <Box
                className="images"
                sx={{
                  height: "300px", // Chiều cao thanh trượt
                  overflowY: "auto", // Cho phép cuộn dọc
                  border: "1px solid #ccc", // Viền cho thanh trượt (tùy chọn)
                  borderRadius: "10px", // Bo góc thanh trượt
                  padding: "10px", // Padding cho thanh trượt
                  backgroundColor: "#f5f5f5", // Màu nền của thanh trượt
                }}
              >
                {imageURLs &&
                  imageURLs .map((image, index) => {
                    return (
                      <Box
                        key={image}
                        className="image"
                        marginBottom="10px"
                        sx={{
                          padding: "10px", // Padding 10px
                          borderRadius: "20px", // Bo góc 20px
                          backgroundColor: "#FFFFFF", // Màu nền trắng
                        }}
                      >
                        <img
                          src={image}
                          height="180"
                          alt="upload"
                          style={{
                            borderRadius: "10%", // Bo tròn ảnh
                            objectFit: "cover", // Đảm bảo ảnh không bị méo
                          }}
                        />
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Button
                            variant="outlined"
                            sx={{
                              color: "#4CAF50", // Đổi màu chữ thành xanh lá cây
                              borderColor: "#4CAF50", // Đổi màu viền thành xanh lá cây
                              backgroundColor: "#FFFFFF", // Màu nền vẫn là trắng
                              fontSize: "0.8rem",
                              fontWeight: "bold",
                              padding: "5px 5px",
                              borderRadius: "10px",
                              "&:hover": {
                                backgroundColor: "#4CAF50", // Màu nền khi hover là xanh lá cây
                                color: "#FFFFFF", // Màu chữ là màu trắng khi hover
                              },
                              marginLeft: "10px", // Thêm khoảng cách bên trái nếu cần
                            }}
                          >
                            <span>Picture: {index + 1}</span>
                          </Button>

                          <Button
    key={index} // Thêm key cho mỗi item trong list
    variant="outlined"
    onClick={() => deleteHandler(image, index)} // Truyền cả image và index
    sx={{
      color: "#FF0000", // Đổi màu chữ thành đỏ
      borderColor: "#FF0000", // Đổi màu viền thành đỏ
      backgroundColor: "#FFFFFF",
      fontSize: "0.8rem",
      fontWeight: "bold",
      padding: "5px 5px",
      borderRadius: "10px",
      "&:hover": {
        backgroundColor: "#FF0000", // Màu nền khi hover là màu đỏ
        color: "#FFFFFF", // Màu chữ là màu trắng khi hover
      },
      marginLeft: "10px", // Thêm khoảng cách bên trái nếu cần
    }}
  >
    <DeleteIcon
      sx={{
        color: "#FF0000", // Màu biểu tượng mặc định
        marginRight: "5px",
        "&:hover": {
          color: "#FFFFFF", // Màu biểu tượng khi hover
        },
      }}
    />{" "}
    {/* Thêm biểu tượng Delete */}
  </Button>
                        </Box>
                      </Box>
                    );
                  })}
              </Box>
            </section>
          </Box>
          {/* phần live stream bằng slide------------end--------------------------------------- */}
        </Box>
      </Box>
      <ErrorPopup
        open={openpopup}
        handleClose={handleClosepopup}
        errorMessage={errorMessage}
      />
      <SuccessPopup
        open={openpopupsuccess}
        handleClose={handleClosepopupsuccess}
      />
      <WaitingLivePopup
        open={loading}
        handleClose={handleClosepopupLoadingLive}
      />
      <WaitingStopPopup
        open={loadingStop}
        handleClose={handleClosepopupLoadingStop}
      />
    </Box>
  );
};

export default LiveAd;
