import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

class MyCalendar extends React.Component {
  render() {
    // Tạo dữ liệu sự kiện
    const events = [
      {
        id: 1,
        title: "KFC",
        start: new Date(2024, 2, 25, 10, 0),
        end: new Date(2024, 2, 25, 12, 0),
        color: "#ff0000", // Đỏ
      },
      {
        id: 1,
        title: "KFC",
        start: new Date(2024, 2, 11, 10, 0),
        end: new Date(2024, 2, 13, 12, 0),
        color: "#ff0000", // Đỏ
      },

      {
        id: 2,
        title: "Sony",
        start: new Date(2024, 2, 27, 14, 0),
        end: new Date(2024, 2, 27, 16, 0),
        color: "#00ff00", // Xanh lá cây
      },
      {
        id: 3,
        title: "Sting",
        start: new Date(2024, 2, 29, 8, 0),
        end: new Date(2024, 2, 29, 10, 0),
        color: "#0000ff", // Xanh dương
      },
      {
        id: 4,
        title: "Honda",
        start: new Date(2024, 2, 25, 14, 0),
        end: new Date(2024, 2, 25, 16, 0),
        color: "#ff00ff", // Hồng
      },
      {
        id: 5,
        title: "Samsung",
        start: new Date(2024, 2, 25, 8, 0),
        end: new Date(2024, 2, 25, 10, 0),
        color: "#008000", // Vàng
      },
      {
        id: 5,
        title: "Samsung",
        start: new Date(2024, 2, 15, 8, 0),
        end: new Date(2024, 2, 16, 10, 0),
        color: "#008000", // Vàng
      },
      {
        id: 4,
        title: "Honda",
        start: new Date(2024, 2, 15, 14, 0),
        end: new Date(2024, 2, 16, 16, 0),
        color: "#ff00ff", // Hồng
      },
      {
        id: 3,
        title: "Sting",
        start: new Date(2024, 2, 3, 8, 0),
        end: new Date(2024, 2, 9, 10, 0),
        color: "#0000ff", // Xanh dương
      },
      // Thêm các sự kiện khác nếu cần
    ];

    const calendarStyle = {
      height: 500,
      border: "1px solid #ccc",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    };

    return (
      <div style={{ ...calendarStyle }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={(event, start, end, isSelected) => {
            const backgroundColor = event.color;
            return { style: { backgroundColor } };
          }}
          style={
            {
              /* Thêm các thuộc tính style tùy chỉnh nếu cần */
            }
          }
        />
      </div>
    );
  }
}

export default MyCalendar;
