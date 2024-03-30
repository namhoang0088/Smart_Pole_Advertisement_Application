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
const SmartPoleManage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Xử lý dữ liệu từ SchedulerData để tạo formattedEvents
  const formattedEvents = SchedulerData.flatMap(event => {
    return event.schedule.map(scheduleItem => {
      return {
        id: `${event.id}_${scheduleItem.start}_${scheduleItem.end}`,
        title: event.title,
        start: scheduleItem.start,
        end: scheduleItem.end,
        backgroundColor: event.backgroundColor
      };
    });
  });

  const [events, setEvents] = useState(SchedulerData);

  useEffect(() => {
    const draggableEl = document.getElementById("external-events-list");
    const draggable = new Draggable(draggableEl, {
      itemSelector: '.fc-event',
      eventData: (eventEl) => {
        return {
          title: eventEl.innerText,
          duration: eventEl.dataset.duration,
          backgroundColor: eventEl.dataset.backgroundColor,
        };
      }
    });

    return () => {
      draggable.destroy();
    };
  }, []);

  const handleEventDrop = (info) => {
    const droppedEvent = info.event;
    const newStart = droppedEvent.start;
    const newEnd = droppedEvent.end;

    droppedEvent.setDates(newStart, newEnd);

    console.log("Dropped event:", droppedEvent);
  };

  return (
    <Box m="20px">
      {/* Overlay */}
      {openDialog && <div className="overlay" onClick={handleCloseDialog}></div>}
      {/* Dialog */}
      <CustomDialog open={openDialog} handleClose={handleCloseDialog} />
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

          <div id="external-events-list" className="d-flex flex-wrap">
            {events.map((event) => (
              <div
                key={event.id}
                className="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event badge me-3 my-1"
                style={{
                  backgroundColor: event.backgroundColor,
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
                    backgroundColor: event.backgroundColorDark,
                  },
                }}
                data-duration={event.duration}
                data-background-color={event.backgroundColor}
              >
                
                <div className="fc-event-main" style={{ fontWeight: 'bold', fontSize: '16px' }}>{event.title}</div>
                <IconButton aria-label="settings" onClick={() => handleOpenDialog(event.id)}>
                  <SettingsIcon />
                </IconButton>
              </div>
            ))}
          </div>

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
              onClick={handleOpenDialog}
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
            events={formattedEvents} // Sử dụng formattedEvents
            editable={true}
            droppable={true}
            eventDrop={handleEventDrop}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SmartPoleManage;
