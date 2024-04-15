import React, { useState, useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from "../../components/Header";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { tokens } from "../../theme";
import AddBoxIcon from '@mui/icons-material/AddBox';
import CustomDialog from "../../components/Dialog";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SettingsIcon from '@mui/icons-material/Settings';
import { SchedulerData } from "../../data/Scheduler"; // Import tệp dữ liệu
import { colors_scheduler } from "../../data/Scheduler";
import AddEvent from "../../components/AddEvent";

const SmartPoleManage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);


  const handleOpenDialog = (namevideo) => {
    setOpenDialog(true);
    setSelectedVideo(namevideo);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedVideo(null);
  };


  const [dataVideo, setDataVideo] = useState([]); // Khai báo biến dataVideo

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseVideo = await fetch("http://localhost:5000/get/schedule");
  
        if (!responseVideo.ok) {
          throw new Error("Network response video was not ok");
        }
  
        const responseData = await responseVideo.json();
        const labels = responseData.Schedule.map(item => item.lable); // Lấy giá trị của trường "lable"
  
        console.log("Labels:", labels); // In các giá trị lable ra console
  
        setDataVideo([...new Set(labels)]); // Cập nhật giá trị cho biến dataVideo
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  const handleEventDrop = (info) => {
    const droppedEvent = info.event;
    const newStart = droppedEvent.start;
    const newEnd = droppedEvent.end;

    droppedEvent.setDates(newStart, newEnd);

    console.log("Dropped event:", droppedEvent);
  };

  const handleEventReceive = (info) => {
    console.log("Received event:", info.event.title);
    console.log("Start:", info.event.start);
    console.log("End:", info.event.end);
  };

  const handleEventResize = (info) => {
    console.log("Resized event:", info.event.title);
    console.log("Start:", info.event.start);
    console.log("End:", info.event.end);
  };

    // add event ------------------------begin--------------------------------
    const [openAddEvent, setOpenAddEvent] = useState(false);
    const handleOpenAddEvent = () => {
      setOpenAddEvent(true);
    };
  
    const handleCloseAddEvent = () => {
      setOpenAddEvent(false);
    };
      // add event ------------------------end--------------------------------

  return (
    <Box m="20px">
      {/* Overlay */}
      {openDialog && <div className="overlay" onClick={handleCloseDialog}></div>}
      {/* Dialog */}
      <CustomDialog open={openDialog} handleClose={handleCloseDialog} selectedVideo={selectedVideo} />
      {/* Overlay */}
      {openAddEvent && <div className="overlay" onClick={handleCloseAddEvent}></div>}
      {/* Dialog */}
      <AddEvent open={openAddEvent} handleClose={handleCloseAddEvent}  />

      <Header
        title="Smart Pole Advertising Management"
        subtitle="Welcome to Smart Pole Advertising Management"
      />
      <Box display="grid" gridTemplateColumns="30% 70%" gap="20px" alignItems="start">
        <Box //phần danh sách quảng cáo
          backgroundColor={colors.primary[400]}
          borderRadius="10px"
          padding="10px"
          height="auto"
          display="flex"
          flexDirection="column"
        >
          <Box display="flex" alignItems="center">
            <OndemandVideoIcon style={{ fontSize: "32px" }} />
            <h2 style={{ marginLeft: "32px", fontSize: "24px", fontWeight: "bold" }}>Danh sách quảng cáo</h2>
          </Box>

          {dataVideo && dataVideo.map((label, index) => {
  return (
    <div
      key={index}
      className="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event badge me-3 my-1"
      style={{
        backgroundColor: colors_scheduler[index],
        width: '380px',
        height: '50px',
        borderRadius: '1px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        cursor: 'pointer',
        marginBottom: '10px',
        borderRadius: '20px',
        padding: '10px',
        '&:hover': {
          backgroundColor: colors_scheduler[index],
        },
      }}
      data-duration=""
      data-background-color=""
      onClick={() => handleOpenDialog(label)}
    >
      <div className="fc-event-main" style={{ fontWeight: 'bold', fontSize: '16px' }}>{label}</div>
      <IconButton aria-label="settings">
        <SettingsIcon />
      </IconButton>
    </div>
  );
})}

          <Box display="flex" alignItems="center">
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.greenAccent[600],
                color: '#fff',
                marginLeft: "100px",
                marginTop: "10px",
              }}
              endIcon={<AddBoxIcon />}
              onClick={handleOpenAddEvent}
            >
              Thêm quảng cáo
            </Button>
          </Box>
        </Box>

        <Box // phận lịch quảng cáo
          backgroundColor={colors.primary[400]}
          borderRadius="10px"
          padding="20px"
          height="auto"
        >
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            // events={formattedEvents} // Sử dụng formattedEvents
            editable={true}
            droppable={true}
            eventDrop={handleEventDrop}
            eventReceive={handleEventReceive} // Xử lý khi sự kiện được thả vào lịch
            eventResize={handleEventResize}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SmartPoleManage;
