import React, { useState, useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from "../../components/Header";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { tokens } from "../../theme";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CustomDialog from "../../components/Dialog";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import SettingsIcon from "@mui/icons-material/Settings";
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

  //api----------------------------------begin--------------------------------
  const [videoname, setVideoname] = useState([]); // Khai báo biến dataVideo
  const [label, setlabel] = useState([]); // Khai báo biến dataVideo
  const [start, setStart] = useState([]);
  const [end, setEnd] = useState([]);
  const [duration, setDuration] = useState([]);
  const [begin, setBegin] = useState([]);
  const [until, setUntil] = useState([]);
  const [typetask, setTypeTask] = useState([]);
  const [days, setDays] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseVideo = await fetch("http://localhost:5000/get/schedule");

        if (!responseVideo.ok) {
          throw new Error("Network response video was not ok");
        }

        const responseData = await responseVideo.json();
        const labels = responseData.Schedule.map((item) => item.label); // Lấy giá trị của trường "label"

        const label = responseData.Schedule.map((item) => item.label); // Lấy giá trị của trường "label"
        const start = responseData.Schedule.map((item) => item.start_time);
        const end = responseData.Schedule.map((item) => item.end_time);
        const begin = responseData.Schedule.map((item) => item.start_date);
        const until = responseData.Schedule.map((item) => item.until);
        const duration = responseData.Schedule.map((item) => item.duration);
        const typetask = responseData.Schedule.map((item) => item.typetask);
        const days = responseData.Schedule.map((item) => item.days);

        setlabel(label); // Cập nhật giá trị cho biến dataVideo
        setStart(start);
        setEnd(end);
        setDuration(duration);
        setBegin(begin);
        setUntil(until);
        setTypeTask(typetask);
        setDays(days);
        setDataVideo([...new Set(labels)]); // Cập nhật giá trị cho biến dataVideo
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //api-----------------------------------------------end----------------------------------------
  const formattedEvents = [];

  label.forEach((labelItem, index) => {
    if (typetask[index] === "daily") {
      const beginDate = new Date(begin[index]);
      const untilDate = new Date(until[index]);

      // Tính toán số ngày giữa begin và until
      const dayReplay =
        Math.floor(untilDate.getTime() - beginDate.getTime()) /
        (1000 * 60 * 60 * 24) /
        duration[index];
      for (let i = 0; i <= dayReplay; i++) {
        const BeginTime = new Date(
          beginDate.getTime() + i * duration[index] * 24 * 60 * 60 * 1000,
        );
        const UntilTime = new Date(
          beginDate.getTime() + i * duration[index] * 24 * 60 * 60 * 1000,
        );

        const [startHour, startMinute] = start[index].split(":").map(Number); // Chuyển đổi giờ và phút thành số
        const [endHour, endMinute] = end[index].split(":").map(Number);

        BeginTime.setHours(startHour);
        BeginTime.setMinutes(startMinute);

        UntilTime.setHours(endHour);
        UntilTime.setMinutes(endMinute);

        const startDateObj = new Date(BeginTime);
        const startYear = startDateObj.getFullYear();
        const startMonth = ("0" + (startDateObj.getMonth() + 1)).slice(-2);
        const startDay = ("0" + startDateObj.getDate()).slice(-2);
        const startHours = ("0" + startDateObj.getHours()).slice(-2);
        const startMinutes = ("0" + startDateObj.getMinutes()).slice(-2);
        const startSeconds = ("0" + startDateObj.getSeconds()).slice(-2);
        const startEvent = `${startYear}-${startMonth}-${startDay}T${startHours}:${startMinutes}:${startSeconds}`;

        // Chuyển đổi định dạng của thời gian kết thúc sự kiện
        const endDateObj = new Date(UntilTime);
        const endYear = endDateObj.getFullYear();
        const endMonth = ("0" + (endDateObj.getMonth() + 1)).slice(-2);
        const endDay = ("0" + endDateObj.getDate()).slice(-2);
        const endHours = ("0" + endDateObj.getHours()).slice(-2);
        const endMinutes = ("0" + endDateObj.getMinutes()).slice(-2);
        const endSeconds = ("0" + endDateObj.getSeconds()).slice(-2);
        const endEvent = `${endYear}-${endMonth}-${endDay}T${endHours}:${endMinutes}:${endSeconds}`;
        const event = {
          id: `${startEvent}_${endEvent}`,
          title: labelItem,
          start: startEvent,
          end: endEvent,
          backgroundColor: "#4cceac",
        };
        formattedEvents.push(event);
        // console.log("Begin:", startEvent);
        // console.log("Until:", endEvent);
      }
    }

    if (typetask[index] === "weekly") {
      const beginDate = new Date(begin[index]);
      const untilDate = new Date(until[index]);

      // Tính toán số ngày giữa begin và until
      const dayReplay =
        Math.floor(untilDate.getTime() - beginDate.getTime()) /
        (1000 * 60 * 60 * 24);
      // console.log("day replayyyyyyyyyyyyyyyyyyyyy",dayReplay);
      for (let i = 0; i <= dayReplay; i++) {
        const BeginTime = new Date(
          beginDate.getTime() + i * 24 * 60 * 60 * 1000,
        );
        const UntilTime = new Date(
          beginDate.getTime() + i * 24 * 60 * 60 * 1000,
        );
        if (
          days[index].includes(
            BeginTime.toLocaleString("en-US", {
              weekday: "short",
            }).toLowerCase(),
          )
        ) {
          const [startHour, startMinute] = start[index].split(":").map(Number); // Chuyển đổi giờ và phút thành số
          const [endHour, endMinute] = end[index].split(":").map(Number);
          BeginTime.setHours(startHour);
          BeginTime.setMinutes(startMinute);

          UntilTime.setHours(endHour);
          UntilTime.setMinutes(endMinute);

          const startDateObj = new Date(BeginTime);
          const startYear = startDateObj.getFullYear();
          const startMonth = ("0" + (startDateObj.getMonth() + 1)).slice(-2);
          const startDay = ("0" + startDateObj.getDate()).slice(-2);
          const startHours = ("0" + startDateObj.getHours()).slice(-2);
          const startMinutes = ("0" + startDateObj.getMinutes()).slice(-2);
          const startSeconds = ("0" + startDateObj.getSeconds()).slice(-2);
          const startEvent = `${startYear}-${startMonth}-${startDay}T${startHours}:${startMinutes}:${startSeconds}`;

          // Chuyển đổi định dạng của thời gian kết thúc sự kiện
          const endDateObj = new Date(UntilTime);
          const endYear = endDateObj.getFullYear();
          const endMonth = ("0" + (endDateObj.getMonth() + 1)).slice(-2);
          const endDay = ("0" + endDateObj.getDate()).slice(-2);
          const endHours = ("0" + endDateObj.getHours()).slice(-2);
          const endMinutes = ("0" + endDateObj.getMinutes()).slice(-2);
          const endSeconds = ("0" + endDateObj.getSeconds()).slice(-2);
          const endEvent = `${endYear}-${endMonth}-${endDay}T${endHours}:${endMinutes}:${endSeconds}`;

          // console.log("Begin:", startEvent);
          // console.log("Until:", endEvent);
          const event = {
            id: `${startEvent}_${endEvent}`,
            title: labelItem,
            start: startEvent,
            end: endEvent,
            backgroundColor: "#FF0000",
          };
          formattedEvents.push(event);
        }
      }
    }

    if (typetask[index] === "onetime") {
      const beginDate = new Date(begin[index]);
      const BeginTime = new Date(beginDate.getTime());
      const UntilTime = new Date(beginDate.getTime());

      const [startHour, startMinute] = start[index].split(":").map(Number); // Chuyển đổi giờ và phút thành số
      const [endHour, endMinute] = end[index].split(":").map(Number);
      BeginTime.setHours(startHour);
      BeginTime.setMinutes(startMinute);

      UntilTime.setHours(endHour);
      UntilTime.setMinutes(endMinute);

      const startDateObj = new Date(BeginTime);
      const startYear = startDateObj.getFullYear();
      const startMonth = ("0" + (startDateObj.getMonth() + 1)).slice(-2);
      const startDay = ("0" + startDateObj.getDate()).slice(-2);
      const startHours = ("0" + startDateObj.getHours()).slice(-2);
      const startMinutes = ("0" + startDateObj.getMinutes()).slice(-2);
      const startSeconds = ("0" + startDateObj.getSeconds()).slice(-2);
      const startEvent = `${startYear}-${startMonth}-${startDay}T${startHours}:${startMinutes}:${startSeconds}`;

      // Chuyển đổi định dạng của thời gian kết thúc sự kiện
      const endDateObj = new Date(UntilTime);
      const endYear = endDateObj.getFullYear();
      const endMonth = ("0" + (endDateObj.getMonth() + 1)).slice(-2);
      const endDay = ("0" + endDateObj.getDate()).slice(-2);
      const endHours = ("0" + endDateObj.getHours()).slice(-2);
      const endMinutes = ("0" + endDateObj.getMinutes()).slice(-2);
      const endSeconds = ("0" + endDateObj.getSeconds()).slice(-2);
      const endEvent = `${endYear}-${endMonth}-${endDay}T${endHours}:${endMinutes}:${endSeconds}`;

      // console.log("Begin:", startEvent);
      // console.log("Until:", endEvent);
      const event = {
        id: `${startEvent}_${endEvent}`,
        title: labelItem,
        start: startEvent,
        end: endEvent,
        backgroundColor: "#000000",
      };
      formattedEvents.push(event);
    }
    return {};
  });

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
      {openDialog && (
        <div className="overlay" onClick={handleCloseDialog}></div>
      )}
      {/* Dialog */}
      <CustomDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        selectedVideo={selectedVideo}
      />
      {/* Overlay */}
      {openAddEvent && (
        <div className="overlay" onClick={handleCloseAddEvent}></div>
      )}
      {/* Dialog */}
      <AddEvent open={openAddEvent} handleClose={handleCloseAddEvent} />

      <Header
        title="Smart Pole Advertising Management"
        subtitle="Welcome to Smart Pole Advertising Management"
      />
      <Box
        display="grid"
        gridTemplateColumns="30% 70%"
        gap="20px"
        alignItems="start"
      >
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
            <h2
              style={{
                marginLeft: "32px",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Danh sách quảng cáo
            </h2>
          </Box>

          {dataVideo &&
            dataVideo.map((label, index) => {
              return (
                <div
                  key={index}
                  className="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event badge me-3 my-1"
                  style={{
                    backgroundColor: colors_scheduler[index],
                    width: "100%",
                    height: "50px",
                    borderRadius: "1px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "white",
                    cursor: "pointer",
                    marginBottom: "10px",
                    borderRadius: "20px",
                    padding: "10px",
                    "&:hover": {
                      backgroundColor: colors_scheduler[index],
                    },
                  }}
                  data-duration=""
                  data-background-color=""
                  onClick={() => handleOpenDialog(label)}
                >
                  <div
                    className="fc-event-main"
                    style={{ fontWeight: "bold", fontSize: "16px" }}
                  >
                    {label}
                  </div>
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
                color: "#fff",
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
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin,
            ]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            events={formattedEvents} // Sử dụng formattedEvents
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
